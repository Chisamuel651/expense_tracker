/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HeroSection from "./components/Home/HomePage"
import PublicNavbar from "./components/Navbar/PublicNavbar"
import LoginForm from "./components/Users/Login"
import { useSelector } from "react-redux"
import RegistrationForm from "./components/Users/Register"
import PrivateNavbar from "./components/Navbar/PrivateNavbar"
import AddCategory from "./components/Category/AddCategory"
import CategoriesList from "./components/Category/CategoriesList"
import UpdateCategory from "./components/Category/UpdateCategory"


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
        <Route path="/add-category" element={user ? <AddCategory /> : <Navigate to="/" />} />
        <Route path="/categories" element={user ? <CategoriesList /> : <Navigate to="/" />} />
        <Route path="/update-category/:id" element={user ? <UpdateCategory /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
