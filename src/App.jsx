import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponent/LoginPage";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenu from "./Components/LoginComponent/StudentMenu";
import SigninPage from "./Components/LoginComponent/SignupPage";
import SingleStudentDetails from "./Components/LoginComponent/SingleStudentDetails";
import LostItemSubmit from "./Components/ItemComponent/LostItemSubmit";
import LostItemReport from "./Components/ItemComponent/LostItemReport";
import FoundItemSubmission from "./Components/ItemComponent/FoundItemSubmission";
import FoundItemReport from "./Components/ItemComponent/FoundItemReport";
import Personal from "./Components/LoginComponent/Personal";

import DeleteStudentList from "./Components/LoginComponent/DeleteStudentList";
import LostItemTrack from "./Components/ItemComponent/LostItemTrack";
import MarkAsFound from "./Components/ItemComponent/MarkAsFound";
import "./App.css";
import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import NotFoundPage from "./Components/Pages/NotFoundPage";

const AppRoutes = () => {
  const { currentUser, isLoading } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes - Outside Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Register" element={<SigninPage />} />

        {/* Main App Routes - Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard routes based on user role */}
          <Route
            index
            element={
              isLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-lg">Loading...</div>
                </div>
              ) : (
                (() => {
                  console.log(
                    "App.jsx - Rendering route. Current user:",
                    currentUser
                  );
                  console.log("App.jsx - User role:", currentUser?.role);
                  return currentUser?.role === "Admin" ? (
                    <AdminMenu />
                  ) : (
                    <StudentMenu />
                  );
                })()
              )
            }
          />

          {/* Student Management */}
          <Route
            path="/SingleStudentDetail"
            element={<SingleStudentDetails />}
          />
          <Route path="/DeleteStudentList" element={<DeleteStudentList />} />

          {/* Lost Item Routes */}
          <Route path="/LostSubmit" element={<LostItemSubmit />} />
          <Route path="/LostReport" element={<LostItemReport />} />
          <Route path="/LostItemTrack" element={<LostItemTrack />} />

          {/* Found Item Routes */}
          <Route path="/FoundSubmit" element={<FoundItemSubmission />} />
          <Route path="/FoundReport" element={<FoundItemReport />} />

          {/* Mark as Found Route */}
          <Route path="/mark-found/:id" element={<MarkAsFound />} />

          {/* Personal Info */}
          <Route path="/Personal" element={<Personal />} />
        </Route>
        {/* Catch-all route for unknown URLs */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
