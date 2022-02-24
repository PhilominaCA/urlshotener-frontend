import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './Components/Dashboard';
import SignUp from './Components/SignUp';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import UrlRedirect from './Components/UrlRedirect';
import SignUpStatus from './Components/SignUpStatus'
import Button from 'react-bootstrap/Button';
import { RiHome4Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Success from './Components/Success';
import AccountActivation from './Components/AccountActivation';
import AllUrls from './Components/AllUrls';

// export const baseUrl = 'http://localhost:4000/users';
// export const baseUrlshorten = 'http://localhost:4000/short-url';
export const baseUrl = 'https://urlshotener-backend.herokuapp.com/users';
export const baseUrlshorten = 'https://urlshotener-backend.herokuapp.com/short-url';



function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <header>
          <h2 style={{ fontFamily: "cursive" }}>Url Shortener </h2>
          <span> <Link to="/"><Button variant="outline-dark">Home <RiHome4Fill /></Button> </Link>
          </span>
        </header>
        <Routes>
          <Route path="/success" element={< Success />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up-status/:id" element={<SignUpStatus />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/account-activation/:token" element={<AccountActivation />} />
          <Route path="/all-urls" element={<AllUrls />} />
          <Route path="/:id" element={<UrlRedirect />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
