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
import TransactionForm from "./components/Transactions/TransactionForm"
import Dashboard from "./components/Users/Dashboard"
import UserProfile from "./components/Users/UserProfile"
// import AuthRoutes from "./components/Auth/AuthRoutes"


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
        {/* <Route path="/add-category" element={<AddCategory />} />
        <Route path="/add-transaction" element={<TransactionForm />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route
          path="/profile" 
          element={
            <AuthRoutes>
              <UserProfile />
            </AuthRoutes>
          } 
        />

        <Route
          path="/update-category/:id" 
          element={
            <AuthRoutes>
              <UpdateCategory />
            </AuthRoutes>
          } 
        /> */}


        <Route path="/add-category" element={user ? <AddCategory /> : <Navigate to="/" />} />
        <Route path="/add-transaction" element={user ? <TransactionForm /> : <Navigate to="/" />} />
        <Route path="/categories" element={user ? <CategoriesList /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/" />} />
        <Route path="/update-category/:id" element={user ? <UpdateCategory /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
