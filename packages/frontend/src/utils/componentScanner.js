// componentScanner.js - A utility to scan for missing components in your project
const fs = require('fs');
const path = require('path');

/**
 * Scans the project for imports and checks if the corresponding files exist
 *
 * @param {string} startDir - The directory to start scanning from
 * @param {string} baseDir - The base directory of your project (usually 'src')
 * @returns {Object} - Object with lists of missing files and import references
 */
function scanForMissingComponents(startDir, baseDir) {
  const missingComponents = [];
  const importReferences = new Map();

  // Regular expressions to find import statements
  const importRegex = /import\s+.*?from\s+['"](.+?)['"]/g;
  const lazyImportRegex = /React\.lazy\s*\(\s*\(\)\s*=>\s*import\s*\(['"](.+?)['"]\)\s*\)/g;

  // Function to extract relative imports from a file
  function extractImportsFromFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = [];

      // Extract regular imports
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        // Only process relative imports (not npm packages)
        if (importPath.startsWith('./') || importPath.startsWith('../')) {
          imports.push(importPath);
        }
      }

      // Reset regex state
      importRegex.lastIndex = 0;

      // Extract lazy imports
      while ((match = lazyImportRegex.exec(content)) !== null) {
        const importPath = match[1];
        imports.push(importPath);
      }

      return imports;
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error.message);
      return [];
    }
  }

  // Function to resolve an import path to an absolute file path
  function resolveImportPath(importPath, currentDir) {
    // Handle import without extension
    let resolvedPath = path.resolve(currentDir, importPath);

    // Check for common extensions if the import doesn't have one
    if (!path.extname(resolvedPath)) {
      for (const ext of ['.js', '.jsx', '.ts', '.tsx']) {
        const pathWithExt = `${resolvedPath}${ext}`;
        if (fs.existsSync(pathWithExt)) {
          return pathWithExt;
        }
      }

      // Check for index files in directories
      for (const ext of ['.js', '.jsx', '.ts', '.tsx']) {
        const indexPath = path.join(resolvedPath, `index${ext}`);
        if (fs.existsSync(indexPath)) {
          return indexPath;
        }
      }
    }

    return resolvedPath;
  }

  // Recursively scan directory for files
  function scanDirectory(dir) {
    try {
      const files = fs.readdirSync(dir, { withFileTypes: true });

      for (const file of files) {
        const filePath = path.join(dir, file.name);

        if (file.isDirectory()) {
          // Skip node_modules and other non-source directories
          if (file.name !== 'node_modules' && file.name !== 'build' && file.name !== 'dist' && !file.name.startsWith('.')) {
            scanDirectory(filePath);
          }
        } else if (/\.(js|jsx|ts|tsx)$/.test(file.name)) {
          // Process JavaScript/TypeScript files
          const imports = extractImportsFromFile(filePath);

          for (const importPath of imports) {
            // Resolve the import to an absolute path
            const resolvedPath = resolveImportPath(importPath, path.dirname(filePath));

            // Check if the imported file exists
            if (!fs.existsSync(resolvedPath)) {
              missingComponents.push({
                importPath,
                sourceFile: path.relative(baseDir, filePath),
                resolvedPath: path.relative(baseDir, resolvedPath)
              });

              // Track where each missing component is referenced
              if (!importReferences.has(resolvedPath)) {
                importReferences.set(resolvedPath, []);
              }
              importReferences.get(resolvedPath).push(filePath);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error.message);
    }
  }

  // Start the scan
  scanDirectory(startDir);

  // Group missing components by module
  const missingByModule = missingComponents.reduce((acc, component) => {
    const modulePath = component.resolvedPath.split(path.sep)[0]; // First directory in path
    if (!acc[modulePath]) {
      acc[modulePath] = [];
    }
    acc[modulePath].push(component);
    return acc;
  }, {});

  return {
    missing: missingComponents,
    byModule: missingByModule,
    references: importReferences
  };
}

// Generate placeholder component template
function generatePlaceholderComponent(componentPath, componentName) {
  const isPage = componentPath.includes('/pages/');
  const template = isPage ?
  `import React from 'react';
import { Stack, Text, MessageBar, MessageBarType } from '@fluentui/react';

/**
 * ${componentName} - Placeholder Component
 */
const ${componentName} = () => {
  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Text variant="xxLarge">${componentName}</Text>

      <MessageBar messageBarType={MessageBarType.info}>
        This is a placeholder component for ${componentName}. Replace with actual implementation.
      </MessageBar>

      <Stack tokens={{ childrenGap: 8 }}>
        <Text variant="large">Placeholder Content</Text>
        <Text>This component needs to be implemented.</Text>
      </Stack>
    </Stack>
  );
};

export default ${componentName};
` :
  `import React from 'react';
import { Stack, Text } from '@fluentui/react';

/**
 * ${componentName} Component
 */
const ${componentName} = (props) => {
  return (
    <Stack>
      <Text>Placeholder for ${componentName} component</Text>
    </Stack>
  );
};

export default ${componentName};
`;

  return template;
}

// Create a placeholder file for a missing component
function createPlaceholderComponent(resolvedPath, componentName) {
  try {
    // Ensure the directory exists
    const dir = path.dirname(resolvedPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Generate and write the placeholder component
    const template = generatePlaceholderComponent(resolvedPath, componentName);
    fs.writeFileSync(resolvedPath, template, 'utf8');

    return resolvedPath;
  } catch (error) {
    console.error(`Error creating placeholder for ${resolvedPath}:`, error.message);
    return null;
  }
}

// Auto-generate placeholder components for missing files
function generatePlaceholders(results, baseDir) {
  const generated = [];

  for (const missingComponent of results.missing) {
    const fullPath = path.resolve(baseDir, missingComponent.resolvedPath);

    // Extract component name from path
    const fileName = path.basename(fullPath, path.extname(fullPath));
    const componentName = fileName;

    // Create placeholder component
    const createdPath = createPlaceholderComponent(fullPath, componentName);
    if (createdPath) {
      generated.push(fullPath);
    }
  }

  return generated;
}

// Export functions for usage in other scripts
module.exports = {
  scanForMissingComponents,
  createPlaceholderComponent,
  generatePlaceholders
};

// Run the script directly
if (require.main === module) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const generateFlag = args.includes('--generate');

  // Determine project root and src directory
  // Use current working directory as base
  const projectRoot = process.cwd();
  // Go up to find src directory
  let srcDir = projectRoot;

  // If we're in utils directory or similar, go up one level
  if (path.basename(srcDir) === 'utils' || path.basename(srcDir) === 'scripts') {
    srcDir = path.dirname(srcDir);
  }

  // If we're not in src directory, go up more to find it
  if (path.basename(srcDir) !== 'src') {
    // First try to find src in parent directory
    const possibleSrc = path.join(srcDir, 'src');
    if (fs.existsSync(possibleSrc)) {
      srcDir = possibleSrc;
    } else {
      // If not found, go up another level and try again
      const parentDir = path.dirname(srcDir);
      const parentSrc = path.join(parentDir, 'src');
      if (fs.existsSync(parentSrc)) {
        srcDir = parentSrc;
      }
    }
  }

  // Check if the src directory exists
  if (!fs.existsSync(srcDir)) {
    console.error(`Could not find src directory from ${projectRoot}`);
    console.error('Please run this script from your project root or specify the src directory path');
    process.exit(1);
  }

  console.log(`Scanning for missing components in ${srcDir}...`);
  const results = scanForMissingComponents(srcDir, srcDir);

  console.log(`Found ${results.missing.length} missing components!\n`);

  // Display missing components by module
  console.log('Missing components by module:');
  for (const [module, components] of Object.entries(results.byModule)) {
    console.log(`\n${module} (${components.length}):`);
    components.forEach(component => {
      console.log(`  - ${component.resolvedPath} (imported in ${component.sourceFile})`);
    });
  }

  // Generate placeholder components if flag is provided
  if (generateFlag) {
    console.log('\nGenerating placeholder components...');
    const generated = generatePlaceholders(results, srcDir);
    console.log(`Generated ${generated.length} placeholder components!`);

    generated.forEach(file => {
      console.log(`  - ${path.relative(projectRoot, file)}`);
    });
  } else {
    console.log('\nTip: Run with --generate flag to create placeholder components:');
    console.log('  node componentScanner.js --generate');
  }
}