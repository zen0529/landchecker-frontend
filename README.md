# Landchecker Frontend

A modern, high-performance frontend application built with React 19 and Vite, designed to provide a seamless user experience for the Landchecker platform.

## 🚀 Technologies Used

- **Core:** [React 19](https://react.dev/) & [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **State Management & Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Real-time Communication:** [@rails/actioncable](https://github.com/rails/rails/tree/main/actioncable)
- **Theming:** [Next Themes](https://github.com/pacocoursey/next-themes)

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd landchecker-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and configure your backend URLs:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_WS_URL=ws://localhost:3000
   ```

## 💻 Development

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Available Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm run lint` - Runs ESLint to check for code quality issues.
- `npm run preview` - Locally previews the production build.

## 📂 Project Structure

```text
src/
├── api/          # API services and axios configuration
├── components/   # Reusable UI components
├── context/      # React context providers
├── features/     # Feature-based logic and components
├── hooks/        # Custom React hooks
├── pages/        # Main page components/routes
├── utils/        # Utility functions
└── App.jsx       # Main application entry point
```

## 🧪 Linting

To ensure code consistency, we use ESLint. You can run the linter using:

```bash
npm run lint
```
