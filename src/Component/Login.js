import React, { useContext, useState } from 'react'
import LoginInfoContext from '../Context/LoginContext'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [Password, setPassword] = useState("")
    const { email, setEmail } = useContext(LoginInfoContext)
    const [currEmail, setCurrEmail] = useState("")
    const navigate = useNavigate()

    const checkRequirement = () => {
        if (!currEmail || !Password) {
            alert("Missing Required Entries")
            console.log(currEmail)
            console.log(Password)
            return false
        }
        return true
    }

    const LogIn = async () => {
        try {
            if(!checkRequirement)
                return
            const response =await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON"
                },
                body: JSON.stringify({ email: currEmail, password: Password })
            })
            if(response.status==200)
            {
                setEmail(currEmail)
                navigate('/')
            }
            else
                alert(response.statusText)
        } catch (error) {
            alert(error)
        }

    }
    const SignIn = async () => {
        try {
            if(!checkRequirement)
                return 
            const response = await fetch("http://localhost:4000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON"
                },
                body: JSON.stringify({ email: currEmail, password: Password })
            })
            if(response.status==200)
            {
                setEmail(currEmail)
                navigate('/')
            }
            else
                alert(response.statusText)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                        <div className="form-outline form-white mb-4">
                                            <input type="email" id="typeEmailX" className="form-control form-control-lg" onChange={(e) => { setCurrEmail(e.target.value) }} />
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={(e) => { setPassword(e.target.value) }} />
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        </div>
                                        <div>
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={LogIn}>Login</button>
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={SignIn}>Sign In</button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
