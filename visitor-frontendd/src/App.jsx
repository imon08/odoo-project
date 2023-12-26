import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import { Toaster } from "react-hot-toast";
import VisitingDetails from "./pages/visiting-details";
import Header from "./components/header/header";
import DrinkDetails from "./pages/drink-details";
import ThanksPage from "./pages/thanks";

function App() {
  return (
    <div className="max-w-lg mx-auto">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/visiting"
            element={
              <AuthenticatedRoute>
                <VisitingDetails />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/drink"
            element={
              <AuthenticatedRoute>
                <DrinkDetails />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/thanks"
            element={
              <AuthenticatedRoute>
                <ThanksPage />
              </AuthenticatedRoute>
            }
          />

          <Route
            path="*"
            element={
              <div className="flex justify-center items-center h-screen text-xl font-bold">
                Not Found
              </div>
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;

const AuthenticatedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("access_token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};
