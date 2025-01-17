import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import SignInForm from "../../components/itapComponents copy/SignInForm/SignInForm";
import './SignInPage.css';

const SignInPage = () => {
    const userSession = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    const [error, setError] = useState("")

    useEffect(() => {
        const a = userSession ? navigate('/') : ""
    })

    useEffect(() => {
        if (error != "") {
            const timer = setTimeout(() => {
                setError("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error])

    return (
        <>
            <div className="signInBlock">
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
                    <video autoPlay muted loop style={{
                        // position: 'absolute',
                        zIndex: -2,
                        top: 0,
                        left: 0,
                        width: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(100%)'
                    }}>
                        <source src={`${process.env.PUBLIC_URL}/backgroundVideo.mp4`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
            </div>
            {userSession ? navigate('/') : <></>}
            <div className="error-block" style={{left: error != "" ? '20px' : '-500px'}}>
                    <a>{error}</a>
            </div>
            <div className="signInPageSection">
                
                <div className="title">
                    <div>ДОСЬЕ</div>
                    </div>


                <SignInForm setError={setError}></SignInForm>

            </div>
        </div>
        </>
        )
}

export default SignInPage;