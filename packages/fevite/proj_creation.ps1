# PowerShell script to create folder and file structure for React Vite TypeScript project
# Save this as setup-project.ps1

# Base directory for the project (current directory by default)
$ProjectRoot = Get-Location

# Check if directory already exists, if not create it
function EnsureDirectory {
    param (
        [string]$DirectoryPath
    )
    
    if (-not (Test-Path $DirectoryPath)) {
        New-Item -ItemType Directory -Path $DirectoryPath -Force | Out-Null
        Write-Host "Created directory: $DirectoryPath" -ForegroundColor Green
    } else {
        Write-Host "Directory already exists: $DirectoryPath" -ForegroundColor Yellow
    }
}

# Create an empty file if it doesn't exist
function CreateEmptyFile {
    param (
        [string]$FilePath,
        [string]$DefaultContent = ""
    )
    
    if (-not (Test-Path $FilePath)) {
        New-Item -ItemType File -Path $FilePath -Force | Out-Null
        if ($DefaultContent -ne "") {
            Set-Content -Path $FilePath -Value $DefaultContent
        }
        Write-Host "Created file: $FilePath" -ForegroundColor Green
    } else {
        Write-Host "File already exists: $FilePath" -ForegroundColor Yellow
    }
}

# Main directory structure
$Directories = @(
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
)

# Files to create
$Files = @{
    "src/main.tsx" = "import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);"
    "src/index.css" = "* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}"
    "src/app/App.tsx" = "import { FluentProvider, webLightTheme } from '@fluentui/react-components';
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

export default App;"
    "src/app/AppRouter.tsx" = ""
    "src/app/routes.ts" = ""
    "src/app/layouts/MainLayout.tsx" = ""
    "src/app/providers/AppProviders.tsx" = ""
    "src/shared/types/navigation.ts" = ""
    "src/shared/services/navigationService.ts" = ""
    "src/shared/hooks/useNavigation.ts" = ""
    "src/shared/components/navigation/Sidebar.tsx" = ""
    "src/shared/components/navigation/TopBar.tsx" = ""
    "src/modules/overview/pages/OverviewPage.tsx" = ""
    "src/modules/boards/pages/BoardsPage.tsx" = ""
    "src/modules/repos/pages/ReposPage.tsx" = ""
    "src/modules/pipelines/pages/PipelinesPage.tsx" = ""
    "src/modules/testplans/pages/TestPlansPage.tsx" = ""
    "src/modules/analytics/pages/AnalyticsPage.tsx" = ""
    "vite.config.ts" = "import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});"
}

# Create directories
Write-Host "Creating directory structure..." -ForegroundColor Cyan
foreach ($Directory in $Directories) {
    EnsureDirectory "$ProjectRoot\$Directory"
}

# Create files
Write-Host "Creating files..." -ForegroundColor Cyan
foreach ($FilePath in $Files.Keys) {
    CreateEmptyFile "$ProjectRoot\$FilePath" $Files[$FilePath]
}

Write-Host "Project structure setup complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run 'npm install'" -ForegroundColor White
Write-Host "2. Run 'npm install @fluentui/react-components @fluentui/react-icons react-router-dom'" -ForegroundColor White
Write-Host "3. Run 'npm install -D @types/node'" -ForegroundColor White
Write-Host "4. Run 'npm run dev' to start the development server" -ForegroundColor White