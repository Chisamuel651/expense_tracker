/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HeroSection from "./components/Home/HomePage"
import PublicNavbar from "./components/Navbar/PublicNavbar"
import LoginForm from "./components/Users/Login"
import { useSelector } from "react-redux"
import RegistrationForm from "./components/Users/Register"
import PrivateNavbar from "./components/Navbar/PrivateNavbar"


function App() {
  // get the token
  const user = useSelector((state) => state?.auth?.user);

  return (
    <BrowserRouter>
    {/* display navbar */}
    {user? <PrivateNavbar />: <PublicNavbar />}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
