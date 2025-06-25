import { Route, Routes } from 'react-router-dom'
import AuthLayout from './_auth/_layout'
import { SignIn, SignUp } from './_auth'
import RootLayout from './_root/_layout'
import { Home, Storage, GenerateRecipe, Recipes, Recipe } from './_root/pages'
import RootSidebar from './_root/_app-sidebar'
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() { 
  return (
    <QueryClientProvider client={new QueryClient()}>
    <Routes>
      {/* Login Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      {/* Protected Routes */}
      <Route element={<RootLayout />}>
        <Route element={<RootSidebar />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:recipeId" element={<Recipe />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/generate-recipe/*" element={<GenerateRecipe />} />
        </Route>
      </Route>
    </Routes>
    </QueryClientProvider>
  )
}

export default App
