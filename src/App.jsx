import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponent/LoginPage";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenu from "./Components/LoginComponent/StudentMenu";
import SigninPage from "./Components/LoginComponent/SignupPage";
import SingleStudentDetails from "./Components/LoginComponent/SingleStudentDetails";
import LostItemSubmit from "./Components/ItemComponent/LostItemSubmit";
import "./App.css";
import LostItemReport from "./Components/ItemComponent/LostItemReport";
import FoundItemSubmission from "./Components/ItemComponent/FoundItemSubmission";
import FoundItemReport from "./Components/ItemComponent/FoundItemReport";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<SigninPage />} />
          <Route path="/AdminMenu" element={<AdminMenu />} />
          {/* <Route path="/StudentMenu" element={<StudentMenuNewGoodUI />} /> */}
          {/* <Route path="/StudentMenu" element={<StudentMenuu />} /> */}
          <Route path="/StudentMenu" element={<StudentMenu />} />
          <Route
            path="/SingleStudentDetail"
            element={<SingleStudentDetails />}
          />
          <Route path="/LostSubmit" element={<LostItemSubmit />} />
          <Route path="/LostReport" element={<LostItemReport />} />
          <Route path="/Found-Submit/:id" element={<FoundItemSubmission />} />
          <Route path="/FoundReport" element={<FoundItemReport />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;