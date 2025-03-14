# CRM01 Monorepo

This repository contains the full-stack CRM application with React frontend and Express backend.

## Repository Structure

`
CRM01/
├── packages/
│   ├── frontend/       # React UI application
│   ├── backend/        # Express API server
│   └── common/         # Shared code and utilities
└── package.json        # Root workspace configuration
`

## Getting Started

1. Install dependencies:
`ash
npm install
`

2. Start development servers:
`ash
# Start frontend and backend concurrently
npm start

# Start only frontend
npm run start:frontend

# Start only backend
npm run start:backend
`

3. Build for production:
`ash
npm run build
`

## Technologies

- **Frontend**: React, Fluent UI, React Router, Chart.js
- **Backend**: Express, MongoDB, JWT Authentication
- **Common**: Shared utilities and type definitions

## Features

- Modern, responsive UI built with Microsoft Fluent UI
- Dashboard with KPIs and visualizations
- Contact management
- Lead tracking and management
- Opportunity pipeline
- Task management
- Advanced reporting
- User settings and preferences

## Development

This project uses a monorepo structure with npm workspaces for package management.
