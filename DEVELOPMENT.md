# FoodFusionAI Development Guidelines

(Development guide for the backend can be found
[here](https://github.com/FrameworkV/FoodFusionAI))

Welcome to FoodFusionAI! This guide will help you get started with contributing
to our project.

> *Note: The entire backend and frontend of FoodFusionAI is hosted on **Azure**
> in production.\
> To enable local development and allow open-source contributors to work without
> API keys, the project is designed to support switching between **dev** and
> **prod** modes via a central configuration file (production_config.yaml, more
> below).\
> By default, it runs in development mode (status: "dev"), so you can get
> started immediately.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter

### Initial Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/FoodFusionAI-Web.git
   cd FoodFusionAI-Web
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

The project includes a sample `.env` file in the root directory. Update the
`VITE_PYTHON_ENDPOINT` variable as needed:

- **For the hosted backend:**
  ```env
  VITE_PYTHON_ENDPOINT="https://foodfusion.azurewebsites.net/v1"
  ```

- **For local development:**
  ```env
  VITE_PYTHON_ENDPOINT="https://localhost:8000/v1"
  ```

  For more details on backend setup, see the
  [FoodFusionAI (Backend)](https://github.com/FrameworkV/FoodFusionAI)
  repository.

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Architecture

### Frontend Structure

```
/src
  /_auth
  /_root
  /assets
  /components
  /context
  /hooks
  /lib
  /types
  /utils
/public
```

- **/src**: Contains all the source code for the frontend application.
  - **/components**: Reusable React components.
  - **/_auth**: Authentication-related components and logic.
  - **/_root_**: Root application components and layout.
  - **/utils**: Utility functions and helpers.
  - **/hooks**: Custom React hooks.
  - **/context**: React Context API for state management.
  - **/types**: TypeScript type definitions.
  - **/assets**: Static assets like images and fonts.
- **/public**: Publicly accessible files and folders.

