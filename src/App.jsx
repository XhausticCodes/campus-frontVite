import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from "./Components/LoginComponent/RegisterUser";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenu from "./Components/LoginComponent/StudentMenu";
import StudentMenuNewGoodUI from "./Components/LoginComponent/StudentMenuGoodUI";
import SigninPage from "./Components/LoginComponent/SignupPage";
import StudentMenuMid from "./Components/LoginComponent/StudentMenuMid";
import SingleStudentDetails from "./Components/LoginComponent/SingleStudentDetails";
import LostItemSubmit from "./Components/ItemComponent/LostItemSubmit";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<SigninPage />} />
          <Route path="/AdminMenu" element={<AdminMenu />} />
          {/* <Route path="/StudentMenu" element={<StudentMenu />} /> */}
          {/* <Route path="/StudentMenu" element={<StudentMenuNewGoodUI />} /> */}
          <Route path="/StudentMenu" element={<StudentMenuMid />} />
          <Route path="/SingleStudentDetail" element={<SingleStudentDetails />} />
          <Route path="/Items" element={<LostItemSubmit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
