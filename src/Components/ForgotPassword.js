import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import {baseUrl} from '../App';

function ForgotPassword() {

    const [email,setemail]  = useState('');
    const [ack,setAck] = useState('');


    const handleSubmit = async()=>{
        const emailId ={email}
        let res = await axios.post(`${baseUrl}/forgot-password`,emailId)
        if(res.data.statusCode===200)
          setAck(res.data.message);
        else
        {
          console.log(res.data.message);
          setAck(res.data.message)
        }
      }

  return (
       <div className='signup-page'> <h5>Forgot your password?</h5>
       <Form.Text className="text-muted">
No worries! Please enter your email address to recieve password reset link </Form.Text><hr/>
      <Form>
      <p style={{color:"red"}}>{ack}</p>
      <Form.Group>
    <Form.Label><b>Email address</b></Form.Label>
    <Form.Control type="email" placeholder="Enter your email" onChange={(e)=>{setemail(e.target.value)}}/>
  </Form.Group><br/>
  <p> Note:  You will be receiving an email with password reset link, kindly click on the link and reset your password
   </p>
 <br/>
  <Button variant="outline-dark" style={{width:"100%"}} onClick={()=>handleSubmit()}>Submit </Button> 
</Form>
</div>
  )
}

export default ForgotPassword