import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button'


function SignUp() {

  const navigation = useNavigate('');
  const [passwordMatch, setMatch] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dataValidation = Yup.object({

    firstName: Yup.string().min(3, "Required minimum 3 characters)")
      .required("Required valid First name"),
    lastName: Yup.string().required("Required valid Last name"),
    email: Yup.string().email('Invalid email').required('Required'),
    mobile: Yup.string().min(10, "Required valid Mobile Number")
      .required("Mobile number required"),
    password: Yup.string().min(8, "Required longer Password (min 8 characters)")
      .required("Please enter the password"),
    confirmPassword: Yup.string().required("Please re-enter the password")
      .matches(password, "Passwords should match"),

  });

  let { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: password,
      confirmPassword: ""
    },
    validationSchema: dataValidation,
    onSubmit: (vals) => {
      if (!passwordMatch)
        addUser(vals);
      else {
        console.log("Password should match")
      }
    }
  });

  useEffect(() => {
    values.password = password
    values.confirmPassword = confirmPassword
    if (password === confirmPassword)
      setMatch(false)
    else
      setMatch(true)
  }, [confirmPassword, password])

  const addUser = async (userObj) => {
    try {
      let res = await axios.post(`${baseUrl}/sign-up`, userObj)
      console.log(res);
      if (res.data.statusCode == 200) {
        let response = await axios.post(`${baseUrl}/activation-email/${values.email}`)
        console.log(response);
        if (response.data.statusCode == 200) {
          navigation("/sign-up-status/1");
        }
      }
    }
    catch (err) {
      alert('There is a problem, please view error in console');
      console.log(err);
      navigation("/sign-up-status/0");
    }
  }

  return (
    <div className='signup-page'> <h3> SignUp Here!</h3><hr />
      <form onSubmit={handleSubmit} className="form-div">
        <TextField id="firstName" style={{ width: "100%" }}
          name="firstName"
          label="First Name"
          variant="filled"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          error={errors.firstName && touched.firstName}
          helperText={errors.firstName && touched.firstName ? errors.firstName : ""} /><br /><br />
        <TextField id="lastName" style={{ width: "100%" }}
          name="lastName"
          label="Last Name"
          variant="filled"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          error={errors.lastName && touched.lastName}
          helperText={errors.lastName && touched.lastName ? errors.lastName : ""} /><br /><br />
        <TextField id="email" style={{ width: "100%" }}
          name="email"
          label="Email"
          variant="filled"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={errors.email && touched.email}
          helperText={errors.email && touched.email ? errors.email : ""} /><br /><br />
        <TextField id="mobile" style={{ width: "100%" }}
          name="mobile"
          label="Mobile"
          variant="filled"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mobile}
          error={errors.mobile && touched.mobile}
          helperText={errors.mobile && touched.mobile ? errors.mobile : ""} /><br /><br />
        <TextField
          id="filled-password-input" style={{ width: "100%" }}
          name="password"
          label="Password"
          type="password"
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleBlur}
          value={password}
          error={errors.password && touched.password}
          helperText={errors.password && touched.password ? errors.password : ""}
        /><br /><br />
        <TextField
          id="filled-cnfrmpassword-input" style={{ width: "100%" }}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="filled"
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handleBlur}
          value={confirmPassword}
          error={errors.confirmPassword && touched.confirmPassword}
          helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword :
            (passwordMatch ? <p style={{ color: "red" }}>Password re-enter the same password</p> : <></>)}
        /><br /><br />
        <Button variant="outline-dark" style={{ width: "100%" }} type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default SignUp
