import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { baseUrl, baseUrlshorten } from '../App'
import Button from 'react-bootstrap/Button';
import { DataGrid } from '@mui/x-data-grid';

function AllUrls() {
  const navigate = useNavigate();
  const [loginValidation, setLoginValidation] = useState('')
  const [rows, setrows] = useState();
  const columns = [
    { field: 'id', headerName: 'ID', width: 40, sortable: false },
    { field: 'longUrl', headerName: 'Long Url', width: 600, sortable: false },
    { field: 'shortUrl', headerName: 'Short Url', width: 370, sortable: false },
    { field: 'clicks', headerName: 'Clicks', width: 100, sortable: false }

  ];
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

  const getData = async () => {
    let res = await axios.get(`${baseUrlshorten}/all-urls`);
    if (res.data.statusCode === 200) {
      const rowData = res.data.body.map(({ longUrl, shortUrl, clicks }, index) => ({ id: index + 1, longUrl, shortUrl, clicks }))
      setrows(rowData);
      console.log(rows);
    } else {
      console.log(res.data.message);
    }
  }

  useEffect(() => {
    loginVerification()
    getData()
  }, [])

  return (
    <div> {loginValidation == 'Valid' ? <div style={{ padding: "2vw", fontFamily: "cursive" }}>
      <h2><i>All Urls shortened so far!! &emsp;  <Button variant="outline-dark" style={{ width: "15%" }} onClick={() => navigate('/success')}>
        Shortern a URL
      </Button> &emsp;
        <Button variant="outline-dark" style={{ width: "10vw", float: "right" }} onClick={() => {
          localStorage.removeItem('validLogin'); navigate('/');
        }
        }>Logout</Button> </i></h2> <hr />

      {rows ?
        <div className='table-div'
          style={{ height: 400, width: '100%', padding: "2vw", backgroundColor: "rgb(100, 100, 100)" }}>
          <DataGrid style={{ fontFamily: "cursive", color: "white" }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div> : <div> No Urls shoterned yet!!</div>}
    </div>

      : <p></p>}
      {loginValidation == 'Invalid' ? <h1>Invalid Login !! </h1> : <p></p>}
    </div>
  )
}

export default AllUrls