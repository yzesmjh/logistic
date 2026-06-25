import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import MyDashboard from "./Pages/MyDashboard";
import ViewUsers from "./Pages/ViewUsers";
import ViewSingleUsers from "./Pages/ViewSingleUsers";
import Profile from "./Pages/Profile";
import Notification from "./Pages/Notification";
import Home from "./Components/Home";
import Package from "./Pages/Package";
import Track from "./Pages/Track";

const isAuthenticated = () => {
  // You can extend this to check the JWT token or session expiration if needed
  return sessionStorage.getItem("user") !== null;
};

const ProtectedRoutes = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  } else {
    return <Navigate to="/" replace={true} />;
  }
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/track/:id" element={<Track />} />
      <Route
        path="/login"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace={true} />
          ) : (
            <Login />
          )
        }
      />
      <Route path="/logout" element={<Logout />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <MyDashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/notification"
        element={
          <ProtectedRoutes>
            <Notification />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoutes>
            <ViewUsers />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/users/:id"
        element={
          <ProtectedRoutes>
            <ViewSingleUsers />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/package"
        element={
          <ProtectedRoutes>
            <Package />
          </ProtectedRoutes>
        }
      />

      {/* Error Page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
