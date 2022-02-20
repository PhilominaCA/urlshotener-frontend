import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './Components/Dashboard';
import SignUp from './Components/SignUp';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Button from 'react-bootstrap/Button';
import { RiHome4Fill,RiLoginCircleLine,RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Success from './Components/Success';

// export const baseUrl = 'http://localhost:4000/users';
export const baseUrl = 'https://password-reset-flow.herokuapp.com/users';


function App() {

  return (
    <div className='App'>    
    <BrowserRouter>
    <header>
    <h2>Password Reset Demo <RiLockPasswordLine/></h2> 
   {/* <span> <Button variant="outline-info">Login</Button>&emsp;<span>or</span> &emsp; */}
   <span> <Link to="/"><Button variant="outline-dark">Home <RiHome4Fill /></Button> </Link>
   &emsp;
   <Link to="/sign-up"> <Button variant="outline-dark">SignUp <RiLoginCircleLine /></Button>  </Link>
    </span>
     </header>
    <Routes>
        <Route path="/success" element={< Success/>} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<Dashboard />}/>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
