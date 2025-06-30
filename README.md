# 🍳 FoodFusionAI

<div align="center">
  <img src="src/assets/logo.png" alt="FoodFusionAI Logo" width="120" height="120">
  
  <p>
    <strong>AI-Powered Recipe Generation & Food Management Platform</strong>
  </p>
  
  <p>
    Transform your cooking experience with intelligent recipe suggestions and smart food storage management.
  </p>

  ![React](https://img.shields.io/badge/React-18.x-blue?style=flat-square&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=flat-square&logo=tailwindcss)
  ![Vite](https://img.shields.io/badge/Vite-Latest-blue?style=flat-square&logo=vite)
</div>

---

## 🌟 Features

### 🤖 AI Recipe Generation
- **Smart Recipe Creation**: Generate personalized recipes based on available ingredients
- **Dietary Preferences**: Customize recipes for specific dietary needs and restrictions
- **Cooking Skill Adaptation**: Recipes tailored to your cooking experience level
- **Real-time Chat Interface**: Interactive recipe generation with AI assistance

### 📦 Food Storage Management
- **Inventory Tracking**: Keep track of ingredients and their expiration dates
- **Smart Notifications**: Get alerts before food items expire
- **Waste Reduction**: Minimize food waste with intelligent usage suggestions

### 📚 Recipe Management
- **Personal Recipe Collection**: Save and organize your favorite recipes
- **Recipe Categorization**: Sort recipes by cuisine, meal type, difficulty, and more
- **Cooking History**: Track your cooking journey and favorite dishes
- **Recipe Sharing**: Share your culinary creations with the community

### 🎨 Modern UI/UX
- **Responsive Design**: Seamless experience across all devices
- **Intuitive Navigation**: Easy-to-use interface with smart sidebar navigation
- **Real-time Updates**: Live recipe generation with streaming responses

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/FoodFusionAI-Web.git
   cd FoodFusionAI-Web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

  The project includes a sample `.env` file in the root directory. Update the `VITE_PYTHON_ENDPOINT` variable as needed:

  - **For the hosted backend:**
    ```env
    VITE_PYTHON_ENDPOINT="https://foodfusion.azurewebsites.net/v1"
    ```

  - **For local development:**
    ```env
    VITE_PYTHON_ENDPOINT="https://localhost:8000/v1"
    ```

  For more details on backend setup, see the [FoodFusionAI (Backend)](https://github.com/FrameworkV/FoodFusionAI) repository.

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful and accessible UI components

### State Management & Routing
- **React Router** - Client-side routing
- **Context API** - Global state management
- **React Hooks** - Local state and side effects

### AI Integration
- **Streaming Responses** - Real-time AI response handling
- **Markdown Rendering** - Rich text recipe formatting

---

## 🔗 Backend Repository
For more information about the backend please visit the backend repository: [FoodFusionAI (Backend)](https://github.com/FrameworkV/FoodFusionAI)

### For developers
If you want to contribute, follow [this](DEVELOPMENT.md) guide.