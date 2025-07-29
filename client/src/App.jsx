import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AllProjects from "./pages/AllProjects";
import AllUsers from "./pages/AllUsers";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import Home from "./pages/Home";
import MyProjects from "./pages/MyProjects";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 overflow-x-hidden min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/my-projects" element={<MyProjects />} />
          <Route path="/edit-project" element={<EditProject />} />

          <Route path="/all-projects" element={<AllProjects />} />
          <Route path="/all-users" element={<AllUsers />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
