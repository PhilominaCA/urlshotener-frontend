import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import { baseUrl, baseUrlshorten } from '../App'
import axios from 'axios';

function Success() {

  const navigate = useNavigate();
  const [loginValidation, setLoginValidation] = useState('')
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');

  const loginVerification = async () => {
    const token = localStorage.getItem("validLogin")
    let res = await axios.post(`${baseUrl}/verify-login/${token}`)
    if (res.data.statusCode === 200) {
      console.log(res.data)
      setLoginValidation('Valid');
    }
    else {
      localStorage.removeItem('validLogin');
      console.log(res.data.message);
      setLoginValidation('Invalid');
    }
  }

  useEffect(() => {
    loginVerification()
  }, [])

  const getShortURL = async () => {
    const longUrl = { longURL }

    let res = await axios.post(`${baseUrlshorten}/url-shorten`, longUrl);
    if (res.data.statusCode === 200)
      setShortURL(res.data.body);
    else {
      console.log(res.data.message);
    }
  }

  return <div className='page-div'>
    {loginValidation == 'Valid' ? <div><h2><i>Shorten your URL here! &emsp;
      <span> <Link to="/all-urls"><Button variant="outline-dark"> View all URLs </Button> </Link>
      </span>
      <Button variant="outline-dark" style={{ width: "10vw", float: "right" }} onClick={() => {
        localStorage.removeItem('validLogin'); navigate('/');
      }
      }>Logout</Button> </i></h2> <hr />
      <div className='url-form-div' style={{ fontFamily: "cursive" }}>
        <Form>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label >Please paste your long URL here</Form.Label><br /><br />
            <Form.Control type="text" onChange={(e) => setLongURL(e.target.value)} />
          </Form.Group>
        </Form>
        <Button variant="outline-dark" style={{ width: "20vw" }} onClick={() => { getShortURL() }}>
          Shorten my URL </Button><br /><br />
        {shortURL ? <p>Please find the short URL : <a href={shortURL} target="_blank">{shortURL}</a></p> : <p></p>}

      </div>

    </div>
      : <p></p>}
    {loginValidation == 'Invalid' ? <h1>Invalid Login !!</h1> : <p></p>}

  </div>

}

export default Success