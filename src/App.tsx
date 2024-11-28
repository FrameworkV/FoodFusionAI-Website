import { Route, Routes } from 'react-router-dom'
import AuthLayout from './_auth/_layout'
import { SignIn, SignUp } from './_auth'
import RootLayout from './_root/_layout'
import { Home } from './_root/pages'

function App() {

  return (
    <Routes>
      {/* Login Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      {/* Protected Routes */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
