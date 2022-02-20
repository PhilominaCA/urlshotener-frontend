import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import {baseUrl} from '../App'
import axios from 'axios';

function Success() {

  const navigate = useNavigate();
  const [loginValidation,setLoginValidation] = useState('')
  const loginVerification = async()=>{
    const token = localStorage.getItem("validLogin")
    let res = await axios.post(`${baseUrl}/verify-login/${token}`)
    if(res.data.statusCode===200)
    {
      console.log(res.data)
      setLoginValidation('Valid');
    }
    else
    {
      localStorage.removeItem('validLogin');
      console.log(res.data.message);
      setLoginValidation('Invalid');
    }
  }

  useEffect(()=>{
    loginVerification()
  },[])

  return <div className='page-div'>
   {loginValidation == 'Valid' ? <div><h2><i>You have successfully logged in !</i></h2> 
 
    <object data="https://media2.giphy.com/media/McWTxnpVZp6lG/giphy.gif" type="image/gif" /><br/>
    <Button  variant="outline-dark" style={{width:"10vw",float:"left"}} onClick={()=>{
                localStorage.removeItem('validLogin'); navigate('/');}
}>Logout</Button> <br/>
    </div>
    : <p></p>}
   {loginValidation == 'Invalid'? <h1>Invalid Login !!</h1>:<p></p>}
    
  </div>

}

export default Success