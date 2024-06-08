import { BrowserRouter,Route, Routes} from "react-router-dom";
import Home from "./components/pages/Home";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import Policy from "./components/pages/Policy";
import Dashboard from "./components/pages/Dashboard"
import ForgotPassword from "./components/pages/ForgotPassword"
import ResetPassword from "./components/pages/ResetPassword"
import AdminLayout from "./components/layouts/AdminLayout";
import {AdminUser} from "./components/pages/AdminUser";
import AdminEvent from "./components/pages/AdminEvent";
import UploadEvents from "./components/pages/UploadEvents";
import AllEvents from "./components/pages/AllEvents";
import AdminLogin from "./components/pages/AdminLogin";

require('dotenv').config();
// import AdminSignup from "./components/pages/AdminSignup";


function App() {

 

   // const user = localStorage.getItem("token")

  return (
   <>
      <BrowserRouter>
          <Routes>
             <Route path="/login" element={<LoginPage/>}> </Route>
             <Route path="/signup" element={<SignupPage/>}> </Route>
             <Route path="/" exact element = {<Home/>}> </Route>
             <Route path="/policy" element={<Policy/>}> </Route>
             <Route path="/dashboard" element={<Dashboard/>}> </Route>
             <Route path="/forgotpassword" element={<ForgotPassword/>}> </Route>
             <Route path="/resetpassword/:token" element={<ResetPassword/>}> </Route>

             {/* Admin */}

             {/* <Route path="/adminsignup" element={<AdminSignup/>}> </Route> */}
             <Route path="/admin" element={<AdminLogin/>}> </Route>

             <Route path="/adminpanel" element={<AdminLayout/>} >
                  <Route path = "users" element = {<AdminUser/>} />
                  <Route path = "events" element = {<AdminEvent/>} />
                  <Route path = "uploadevents" element = {<UploadEvents/>} />
             </Route>  
             <Route path="/allevents" element={<AllEvents/>}> </Route> 
          </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
