#!/usr/bin/env python3
# Python script to create folder and file structure for React Vite TypeScript project
# Save this as setup_project.py

import os
import sys
from pathlib import Path
import json

# ANSI color codes for terminal output
class Colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'
    ENDC = '\033[0m'

def print_colored(text, color):
    """Print text with color"""
    print(f"{color}{text}{Colors.ENDC}")

def ensure_directory(directory_path):
    """Create directory if it doesn't exist"""
    path = Path(directory_path)
    if not path.exists():
        path.mkdir(parents=True)
        print_colored(f"Created directory: {directory_path}", Colors.GREEN)
    else:
        print_colored(f"Directory already exists: {directory_path}", Colors.YELLOW)

def create_empty_file(file_path, default_content=""):
    """Create an empty file if it doesn't exist"""
    path = Path(file_path)
    if not path.exists():
        # Create parent directories if they don't exist
        path.parent.mkdir(parents=True, exist_ok=True)
        # Write content to file
        with open(path, "w", encoding="utf-8") as f:
            f.write(default_content)
        print_colored(f"Created file: {file_path}", Colors.GREEN)
    else:
        print_colored(f"File already exists: {file_path}", Colors.YELLOW)

def setup_project():
    """Set up the project structure"""
    # Base directory for the project (current directory by default)
    project_root = os.getcwd()

    # Main directory structure
    directories = [
        "src",
        "src/app",
        "src/app/layouts",
        "src/app/providers",
        "src/modules",
        "src/modules/overview",
        "src/modules/overview/components",
        "src/modules/overview/hooks",
        "src/modules/overview/pages",
        "src/modules/overview/services",
        "src/modules/overview/types",
        "src/modules/boards",
        "src/modules/boards/components",
        "src/modules/boards/hooks",
        "src/modules/boards/pages",
        "src/modules/boards/services",
        "src/modules/boards/types",
        "src/modules/repos",
        "src/modules/repos/components",
        "src/modules/repos/hooks",
        "src/modules/repos/pages",
        "src/modules/repos/services",
        "src/modules/repos/types",
        "src/modules/pipelines",
        "src/modules/pipelines/components",
        "src/modules/pipelines/hooks",
        "src/modules/pipelines/pages",
        "src/modules/pipelines/services",
        "src/modules/pipelines/types",
        "src/modules/testplans",
        "src/modules/testplans/components",
        "src/modules/testplans/hooks",
        "src/modules/testplans/pages",
        "src/modules/testplans/services",
        "src/modules/testplans/types",
        "src/modules/analytics",
        "src/modules/analytics/components",
        "src/modules/analytics/hooks",
        "src/modules/analytics/pages",
        "src/modules/analytics/services",
        "src/modules/analytics/types",
        "src/shared",
        "src/shared/components",
        "src/shared/components/navigation",
        "src/shared/components/ui",
        "src/shared/hooks",
        "src/shared/services",
        "src/shared/types",
        "src/shared/utils",
        "src/assets",
        "src/assets/images",
        "src/styles"
    ]

    # Files to create with their default content
    files = {
        "src/main.tsx": """import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);""",
        "src/index.css": """* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}""",
        "src/app/App.tsx": """import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import AppProviders from './providers/AppProviders';

const App = () => {
  return (
    <BrowserRouter>
      <FluentProvider theme={webLightTheme}>
        <AppProviders>
          <AppRouter />
        </AppProviders>
      </FluentProvider>
    </BrowserRouter>
  );
};

export default App;""",
        "src/app/AppRouter.tsx": "",
        "src/app/routes.ts": "",
        "src/app/layouts/MainLayout.tsx": "",
        "src/app/providers/AppProviders.tsx": "",
        "src/shared/types/navigation.ts": "",
        "src/shared/services/navigationService.ts": "",
        "src/shared/hooks/useNavigation.ts": "",
        "src/shared/components/navigation/Sidebar.tsx": "",
        "src/shared/components/navigation/TopBar.tsx": "",
        "src/modules/overview/pages/OverviewPage.tsx": "",
        "src/modules/boards/pages/BoardsPage.tsx": "",
        "src/modules/repos/pages/ReposPage.tsx": "",
        "src/modules/pipelines/pages/PipelinesPage.tsx": "",
        "src/modules/testplans/pages/TestPlansPage.tsx": "",
        "src/modules/analytics/pages/AnalyticsPage.tsx": "",
        "vite.config.ts": """import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});"""
    }

    # Create directories
    print_colored("Creating directory structure...", Colors.CYAN)
    for directory in directories:
        ensure_directory(os.path.join(project_root, directory))

    # Create files
    print_colored("Creating files...", Colors.CYAN)
    for file_path, content in files.items():
        create_empty_file(os.path.join(project_root, file_path), content)

    # Print next steps
    print_colored("Project structure setup complete!", Colors.GREEN)
    print_colored("Next steps:", Colors.CYAN)
    print_colored("1. Run 'npm install'", Colors.WHITE)
    print_colored("2. Run 'npm install @fluentui/react-components @fluentui/react-icons react-router-dom'", Colors.WHITE)
    print_colored("3. Run 'npm install -D @types/node'", Colors.WHITE)
    print_colored("4. Run 'npm run dev' to start the development server", Colors.WHITE)

if __name__ == "__main__":
    setup_project()