import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { RiArrowRightLine, RiLoginCircleLine } from "react-icons/ri";
import { baseUrl, baseUrlshorten } from '../App'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const token = localStorage.getItem("validLogin")

  const navigate = useNavigate();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [msg, setMsg] = useState('');

  let handleSubmit = async () => {
    const loginData = {
      email,
      password
    }
    let res = await axios.post(`${baseUrl}/login`, loginData)
    if (res.data.statusCode === 200) {
      console.log(res.data)
      localStorage.setItem("validLogin", res.data.token)
      navigate('/success');
    }
    else {
      console.log(res.data.message);
      setMsg(res.data.message)
    }
  }
  const [totalURL, setTotal] = useState();
  const getData = async () => {
    let res = await axios.get(`${baseUrlshorten}/all-urls`);
    if (res.data.statusCode === 200) {
      setTotal(res.data.body.length);
    }
    else {
      console.log(res.data.message);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <p
        style={{ padding: "1vw", backgroundColor: "rgb(245, 300, 221)", fontFamily: "sans-serif", fontWeight: "bold", textAlign: "center" }}>
        Total number of URLs created till now : &emsp; <span style={{ color: "red" }}>{totalURL}</span> </p>
      {!token ?
        <div className='dasboard-div'>
          <div className='left-div'>
            <h3>Login</h3><hr />
            <p style={{ color: "red" }}>{msg}</p>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Link to="/forgot-password">Forgot Password?</Link><br /><br />
              <Button variant="outline-dark" style={{ width: "100%" }} onClick={() => handleSubmit()}>
                Login <RiArrowRightLine />
              </Button>
            </Form>
          </div>
          <div className='right-div'>
            <h3>Welcome !</h3>
            <h3>Don't have an account?</h3>  <br />
            <Link to="/sign-up"> <Button variant="outline-dark" style={{ width: "10vw" }}>SignUp <RiLoginCircleLine /></Button> </Link>
          </div>
        </div> : <div className='dasboard-div'><p>  <h3>Welcome! </h3>
          <h3>Shorten your URLs here</h3><br />
          <Button variant="outline-dark" style={{ width: "60%" }} onClick={() => navigate('/success')}>
            Shortern a URL  <RiArrowRightLine />
          </Button> &emsp;  <span> <Link to="/all-urls"><Button variant="outline-dark">All Urls </Button> </Link>
          </span></p>
        </div>}
    </div>
  )
}

export default Dashboard