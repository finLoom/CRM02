// routingChecker.js
// A specialized utility for checking routing structure and imports

const fs = require('fs');
const path = require('path');

/**
 * Analyzes router files to identify issues
 * @param {string} routerPath - Path to the router directory
 * @returns {Object} - Analysis results
 */
function analyzeRouterStructure(routerPath) {
  const results = {
    routeFiles: [],
    importIssues: [],
    structureIssues: [],
    recommendedFixes: []
  };
  
  // Check if router directory exists
  if (!fs.existsSync(routerPath)) {
    results.structureIssues.push(`Router directory not found at: ${routerPath}`);
    return results;
  }
  
  // Look for main routes.js file
  const routesJsPath = path.join(routerPath, 'routes.js');
  if (!fs.existsSync(routesJsPath)) {
    results.structureIssues.push('Main routes.js file not found');
  } else {
    results.routeFiles.push({
      name: 'routes.js',
      path: routesJsPath,
      type: 'main'
    });
    
    // Analyze imports in routes.js
    analyzeImports(routesJsPath, routerPath, results);
  }
  
  // Check for routeConfig directory
  const routeConfigPath = path.join(routerPath, 'routeConfig');
  if (fs.existsSync(routeConfigPath)) {
    results.routeFiles.push({
      name: 'routeConfig',
      path: routeConfigPath,
      type: 'directory'
    });
    
    // Look for route files in routeConfig
    const routeConfigFiles = fs.readdirSync(routeConfigPath)
      .filter(file => file.endsWith('.js'));
    
    routeConfigFiles.forEach(file => {
      const filePath = path.join(routeConfigPath, file);
      
      results.routeFiles.push({
        name: file,
        path: filePath,
        type: 'routeConfig'
      });
      
      // Analyze imports in each route file
      analyzeImports(filePath, routerPath, results);
    });
  } else {
    results.structureIssues.push('routeConfig directory not found');
  }
  
  // Check for routes directory (which shouldn't exist alongside routeConfig)
  const routesPath = path.join(routerPath, 'routes');
  if (fs.existsSync(routesPath)) {
    results.routeFiles.push({
      name: 'routes',
      path: routesPath,
      type: 'directory'
    });
    
    results.structureIssues.push('Both routeConfig and routes directories exist, which can cause confusion');
    
    // Look for route files in routes directory
    const routesFiles = fs.readdirSync(routesPath)
      .filter(file => file.endsWith('.js'));
    
    routesFiles.forEach(file => {
      const filePath = path.join(routesPath, file);
      
      results.routeFiles.push({
        name: file,
        path: filePath,
        type: 'routes'
      });
      
      // Analyze imports in each route file
      analyzeImports(filePath, routerPath, results);
    });
    
    // Recommend moving files to routeConfig
    results.recommendedFixes.push(
      'Move all files from router/routes/ to router/routeConfig/ for consistency'
    );
  }
  
  // Generate recommendations based on issues
  if (results.importIssues.length > 0) {
    results.recommendedFixes.push(
      'Fix import paths in route files to point to correct locations'
    );
  }
  
  return results;
}

/**
 * Analyze imports in a JavaScript file
 * @param {string} filePath - Path to JavaScript file
 * @param {string} routerPath - Path to router directory
 * @param {Object} results - Results object to populate
 */
function analyzeImports(filePath, routerPath, results) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const baseDir = path.dirname(filePath);
    
    // Regular expressions to find import statements
    const importRegex = /import\s+.*?from\s+['"](.+?)['"]/g;
    
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      
      // Only analyze relative imports
      if (importPath.startsWith('./') || importPath.startsWith('../')) {
        // Resolve the import path relative to the file location
        const resolvedPath = path.resolve(baseDir, importPath);
        const relativeToRouter = path.relative(routerPath, resolvedPath);
        
        // Check if the import exists
        if (!fs.existsSync(resolvedPath) && !fs.existsSync(resolvedPath + '.js') && !fs.existsSync(resolvedPath + '.jsx')) {
          results.importIssues.push({
            file: path.relative(routerPath, filePath),
            importPath,
            resolvedPath: relativeToRouter,
            issue: 'Import path does not exist',
            
            // Check if this might be a case of routes vs routeConfig confusion
            possibleFix: checkForRoutesDirConfusion(importPath, filePath, routerPath)
          });
        }
        
        // Check for imports pointing outside of src directory
        if (relativeToRouter.startsWith('..') && relativeToRouter.split(path.sep).length > 2) {
          results.importIssues.push({
            file: path.relative(routerPath, filePath),
            importPath,
            resolvedPath: relativeToRouter,
            issue: 'Import path points outside of src directory',
            possibleFix: suggestFixForOutsideSrcImport(importPath, filePath, routerPath)
          });
        }
        
        // Special check for dashboard routes
        if (importPath.includes('components/dashboard') && filePath.includes('routeConfig/dashboardRoutes')) {
          results.importIssues.push({
            file: path.relative(routerPath, filePath),
            importPath,
            issue: 'Dashboard routes import from components/dashboard instead of modules/dashboard',
            possibleFix: importPath.replace('components/dashboard', 'modules/dashboard')
          });
        }
      }
    }
  } catch (error) {
    results.importIssues.push({
      file: path.relative(routerPath, filePath),
      issue: `Error analyzing file: ${error.message}`
    });
  }
}

/**
 * Check if the import issue might be due to routes vs routeConfig confusion
 * @param {string} importPath - The import path string
 * @param {string} filePath - Path to the file with the import
 * @param {string} routerPath - Path to the router directory
 * @returns {string|null} - Possible fix or null
 */
function checkForRoutesDirConfusion(importPath, filePath, routerPath) {
  // Check if this is an import from routeConfig but file is in routes
  if (importPath.includes('./routeConfig/') && filePath.includes('/routes/')) {
    return importPath.replace('./routeConfig/', '../routeConfig/');
  }
  
  // Check if this is an import from routes but file is in routeConfig
  if (importPath.includes('./routes/') && filePath.includes('/routeConfig/')) {
    return importPath.replace('./routes/', '../routes/');
  }
  
  return null;
}

/**
 * Suggest a fix for imports pointing outside the src directory
 * @param {string} importPath - The import path string
 * @param {string} filePath - Path to the file with the import
 * @param {string} routerPath - Path to the router directory
 * @returns {string} - Suggested fix
 */
function suggestFixForOutsideSrcImport(importPath, filePath, routerPath) {
  // Most common case: trying to import from components/ instead of modules/
  if (importPath.includes('components/')) {
    return importPath.replace('components/', 'modules/');
  }
  
  return "Move this component into src/ directory or adjust import to use a path within src/";
}

/**
 * Generate a Markdown report from the analysis results
 * @param {Object} results - Analysis results
 * @returns {string} - Markdown report
 */
function generateMarkdownReport(results) {
  let markdown = '# Router Structure Analysis\n\n';
  
  // Structure issues
  if (results.structureIssues.length > 0) {
    markdown += '## Structure Issues\n\n';
    results.structureIssues.forEach(issue => {
      markdown += `- ${issue}\n`;
    });
    markdown += '\n';
  }
  
  // Route files found
  markdown += '## Route Files Found\n\n';
  if (results.routeFiles.length === 0) {
    markdown += 'No route files found.\n\n';
  } else {
    const groupedFiles = results.routeFiles.reduce((acc, file) => {
      if (!acc[file.type]) acc[file.type] = [];
      acc[file.type].push(file);
      return acc;
    }, {});
    
    Object.entries(groupedFiles).forEach(([type, files]) => {
      markdown += `### ${type}\n\n`;
      files.forEach(file => {
        markdown += `- \`${file.name}\`\n`;
      });
      markdown += '\n';
    });
  }
  
  // Import issues
  if (results.importIssues.length > 0) {
    markdown += '## Import Issues\n\n';
    results.importIssues.forEach(issue => {
      markdown += `### In file: \`${issue.file}\`\n\n`;
      
      if (issue.importPath) {
        markdown += `- Import: \`${issue.importPath}\`\n`;
      }
      
      markdown += `- Issue: ${issue.issue}\n`;
      
      if (issue.resolvedPath) {
        markdown += `- Resolved path: \`${issue.resolvedPath}\`\n`;
      }
      
      if (issue.possibleFix) {
        markdown += `- Possible fix: Change to \`${issue.possibleFix}\`\n`;
      }
      
      markdown += '\n';
    });
  }
  
  // Recommended fixes
  if (results.recommendedFixes.length > 0) {
    markdown += '## Recommended Fixes\n\n';
    results.recommendedFixes.forEach((fix, index) => {
      markdown += `${index + 1}. ${fix}\n`;
    });
    markdown += '\n';
  }
  
  // Summary
  markdown += '## Summary\n\n';
  markdown += `- Found ${results.routeFiles.length} route-related files\n`;
  markdown += `- Found ${results.structureIssues.length} structure issues\n`;
  markdown += `- Found ${results.importIssues.length} import issues\n`;
  markdown += `- Suggested ${results.recommendedFixes.length} fixes\n`;
  
  return markdown;
}

/**
 * Ensure directory exists
 * @param {string} dirPath - Directory path
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Main function
 */
function main() {
  // Hardcoded path to your frontend router
  const routerPath = path.resolve('./packages/frontend/src/router');
  
  // Output directory
  const outputDir = path.resolve('./project-structure');
  
  console.log(`Analyzing router structure in: ${routerPath}`);
  console.log(`Output will be saved to: ${outputDir}`);
  
  // Ensure output directory exists
  ensureDirectoryExists(outputDir);
  
  // Analyze the router structure
  const results = analyzeRouterStructure(routerPath);
  
  // Generate markdown report
  const report = generateMarkdownReport(results);
  
  // Write report to file
  const outputPath = path.join(outputDir, 'router-analysis.md');
  fs.writeFileSync(outputPath, report);
  
  console.log(`Analysis complete. Report saved to: ${outputPath}`);
  
  // Also show summary in console
  console.log('\nSummary:');
  console.log(`- Found ${results.routeFiles.length} route-related files`);
  console.log(`- Found ${results.structureIssues.length} structure issues`);
  console.log(`- Found ${results.importIssues.length} import issues`);
  console.log(`- Suggested ${results.recommendedFixes.length} fixes`);
}

// Run the script
main();