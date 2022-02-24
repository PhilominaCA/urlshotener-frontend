import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { baseUrlshorten } from '../App'

function UrlRedirect() {

  const { id } = useParams();
  const getData = async () => {
    let res = await axios.get(`${baseUrlshorten}/all-urls/${id}`);
    const longUrl = res.data.body
    console.log(longUrl);
    if (longUrl) {
      window.location.replace(longUrl);
    }
    else {
      console.log(res.data.message);
    }
  }

  useEffect(() => {
    getData()

  }, [])

  return (
    <div><h1>Loading...</h1></div>
  )
}

export default UrlRedirect