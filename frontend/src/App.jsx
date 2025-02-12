import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Blog from "./pages/Blog";
import BlogId from "./components/BlogContent/Article/Article";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import RegisterPage from "./pages/Auth/Register";
import LoginPage from "./pages/Auth/Login";
import Settings from "./pages/Auth/Settings";
import ProductSearch from "./components/Product/ProductSearch";
import MyCitiesList from "./pages/Auth/MyCitiesList";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogId />} />
          <Route path="/weather" element={<ProductSearch />} />
          <Route
            path="/my-cities"
            element={
              <PrivateRoute>
                <MyCitiesList />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}
