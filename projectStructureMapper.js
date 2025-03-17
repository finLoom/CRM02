// projectStructureMapper.js
// A utility script to map your project's file structure

const fs = require('fs');
const path = require('path');

/**
 * Maps a directory structure to a JSON object
 * @param {string} startPath - The starting directory path
 * @param {Array} ignoreDirs - Directories to ignore (e.g., node_modules)
 * @param {Array} ignoreFiles - File patterns to ignore
 * @param {number} maxDepth - Maximum depth to traverse
 * @param {number} currentDepth - Current traversal depth
 * @returns {Object} - JSON representation of the directory structure
 */
function mapDirectoryStructure(startPath, ignoreDirs = [], ignoreFiles = [], maxDepth = 10, currentDepth = 0) {
  if (!fs.existsSync(startPath)) {
    return { error: `Directory ${startPath} not found` };
  }

  if (currentDepth >= maxDepth) {
    return { info: 'Max depth reached' };
  }

  const result = {};

  try {
    const files = fs.readdirSync(startPath);

    files.forEach(file => {
      const filePath = path.join(startPath, file);
      const relativePath = path.relative(process.cwd(), filePath);
      const stat = fs.statSync(filePath);

      // Skip ignored directories
      if (stat.isDirectory() && ignoreDirs.some(dir => file === dir || filePath.includes(dir))) {
        return;
      }

      // Skip ignored files
      if (!stat.isDirectory() && ignoreFiles.some(pattern => file.match(pattern))) {
        return;
      }

      if (stat.isDirectory()) {
        result[file] = mapDirectoryStructure(filePath, ignoreDirs, ignoreFiles, maxDepth, currentDepth + 1);
      } else {
        // For files, just store the name and size
        result[file] = {
          size: stat.size,
          type: path.extname(file) || 'unknown'
        };
      }
    });
  } catch (error) {
    result.error = error.message;
  }

  return result;
}

/**
 * Creates a markdown representation of the directory structure
 * @param {Object} structure - Directory structure object
 * @param {number} depth - Current depth for indentation
 * @returns {string} - Markdown representation
 */
function createMarkdownStructure(structure, depth = 0) {
  if (!structure || typeof structure !== 'object') return '';

  let markdown = '';
  const indent = '  '.repeat(depth);

  Object.entries(structure).forEach(([key, value]) => {
    if (key === 'error' || key === 'info') {
      markdown += `${indent}- *${key}: ${value}*\n`;
      return;
    }

    if (value.size !== undefined) {
      // This is a file
      markdown += `${indent}- ${key}\n`;
    } else {
      // This is a directory
      markdown += `${indent}- **${key}/**\n`;
      markdown += createMarkdownStructure(value, depth + 1);
    }
  });

  return markdown;
}

/**
 * Write structure to files
 * @param {Object} structure - Directory structure object
 * @param {string} outputPath - Path to save output files
 */
function writeOutput(structure, outputPath) {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // Write JSON structure
  fs.writeFileSync(
    path.join(outputPath, 'project-structure.json'),
    JSON.stringify(structure, null, 2)
  );

  // Write Markdown structure
  fs.writeFileSync(
    path.join(outputPath, 'project-structure.md'),
    `# Project Structure\n\n${createMarkdownStructure(structure)}`
  );

  console.log(`Project structure saved to ${outputPath}`);
}

/**
 * Main function
 */
function main() {
  // Configuration
  const startPath = process.argv[2] || '.';
  const outputPath = process.argv[3] || './project-structure';

  const ignoreDirs = [
    'node_modules',
    '.git',
    'build',
    'dist',
    'coverage'
  ];

  const ignoreFiles = [
    /\.DS_Store$/,
    /\.env/,
    /\.log$/
  ];

  console.log(`Mapping project structure from ${startPath}...`);

  const structure = mapDirectoryStructure(startPath, ignoreDirs, ignoreFiles);
  writeOutput(structure, outputPath);
}

// Run the script
main();