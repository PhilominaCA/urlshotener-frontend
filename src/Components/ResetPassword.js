import React,{useEffect,useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import {baseUrl} from '../App'
import {useParams} from 'react-router-dom';

function ResetPassword() {
let {token} = useParams();
    const [password,setPassword]  = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
const [passwordMatch ,setMatch] = useState(false);
const [ack,setAck] = useState('');
const [errorMsg,setErrorMsg] = useState('');

    const handleSubmit = async()=>{
        if(!passwordMatch && password.length>=8){
        const newPassword ={ password }
        let res = await axios.post(`${baseUrl}/reset-password/${token}`,newPassword)
        console.log(token);
        if(res.data.statusCode===200)
          setAck(res.data.message);
        else
        {
          console.log(res.data.message);
          setAck(res.data.message)
        }
    }
      }

      useEffect(() => {
          if(password.length<8)
          {
setErrorMsg('Required minimum of 8 characters');
          }
          else{
            setErrorMsg('');
          }
        if (password === confirmPassword)
          setMatch(false)
        else
          setMatch(true)
      }, [confirmPassword,password])

  return (
    <div className='signup-page'> <h5>Reset Password</h5><hr/>
    <p style={{color:"red"}}>{ack}</p>
    <Form>
    <Form.Group>
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
    <p style={{color:"grey"}}>{errorMsg}</p>
  </Form.Group>
  <Form.Group>
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
  </Form.Group>

{passwordMatch?<p style={{color:"red"}}>Re-enter the same password in this field</p>:""}
<br/><Button variant="outline-dark" style={{width:"100%"}} onClick={()=>handleSubmit()}>Submit </Button> 
</Form>
</div>  
)
}

export default ResetPassword