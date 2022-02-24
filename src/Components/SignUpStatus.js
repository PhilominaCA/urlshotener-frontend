import React from 'react'
import { useParams } from 'react-router-dom';

function SignUpStatus() {
    const { id } = useParams();

    return <>
        {id ? <div style={{ color: "blue", fontFamily: "cursive", margin: "10vw", padding: "2vw", backgroundColor: "rgb(183, 250, 228)", width: "50vw" }}>
            Great!, You will receive an account activation link via email
            Kindly check and activate your account  (please check your spam folder, if not found in inbox)
        </div> : <div>Oops! There is a Problem, please try again later</div>
        }
    </>
}

export default SignUpStatus