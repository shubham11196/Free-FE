import React, {useState} from "react"
// import './signup.css';
import './signin.css';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const navigate = useNavigate();
    const [logdata, setData] = useState({
        email: "",
        password: ""
    });
    const adddata = (e) => {
    const {name,value} = e.target;

     setData(()=>{
        return{
            ...logdata,
            [name]:value

        } 
     })
    }

    const senddata = async(e) => {
        e.preventDefault();
        const {email, password } = logdata;
        const res = await fetch("https://admin-backend-fjzy.onrender.com/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();

        const {userlogin } = data;
        console.log("Login Data", userlogin.fname);

        if(res.status == 400 || !data){
            console.log("Invalid details");
            toast.warn("Username or password is incorrect")
        }
        else{
            console.log("Data valid");
            toast.success("Login successfull")
            setData({...logdata, email:"", password:""})
            localStorage.setItem('email', email);
            localStorage.setItem('fname', userlogin.fname);
            localStorage.setItem('mobile', userlogin.mobile);

            navigate('/')

        }
    }

    return (
        <>
            <div className="forny-container">
                <div className="forny-inner">
                    <div className="forny-form">
                        <div className="mb-8 text-center forny-logo">
                            <img width="150px" style={{ marginBottom: "25px" }} src="./AsmiBoutique.png" alt="amazonlogo" />
                        </div>
                        <div className="text-center">
                            <h4 className="login-title">Sign-In</h4>
                            <p class="mb-10">Use your credentials to access your account.</p>
                        </div>
                        <form method="POST">
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <MailOutlineIcon id="icon" />

                                        </span>
                                    </div>
                                    <input type="text" name="email" id="email" className="form-control"
                                        onChange={adddata}
                                        value={logdata.email} placeholder="Email Address" />

                                </div>
                            </div>
                            <div className="form-group password-field">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <LockOpenIcon id="icon" />

                                        </span>
                                    </div>

                                    <input type="password" name="password" className="form-control" id="password" placeholder="At least 6 Char Password"
                                        value={logdata.password} onChange={adddata} />


                                    <div className="input-group-append cursor-pointer">
                                        <span className="input-group-text">
                                            <RemoveRedEyeIcon id="icon" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-6 mb-6">
                                <div className="col-6 d-flex align-items-center">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="cb1" />
                                        <label className="custom-control-label" for="cb1">Remember me
                                        </label>
                                    </div>
                                </div>
                                <div className="col-6 text-right">
                                    <a href="03_reset.html">Forgot password?</a>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary btn-block" onClick={senddata}>Continue</button>
                            </div>
                            <div className="mt-10 mb-6 text-center">
                                <span>or login with</span>
                            </div>
                            <div className="text-center">
                                <div className="d-inline-block mr-1">
                                    <button className="btn btn-icon btn-flat text-facebook soi-icon" >
                                        <FacebookIcon id="icon" />
                                    </button>
                                </div>
                                <div className="d-inline-block mr-1">
                                    <button className="btn btn-icon btn-flat text-google soi-icon">
                                        <GoogleIcon id="icon" />
                                    </button>
                                </div>
                                <div className="d-inline-block">
                                    <button className="btn btn-icon btn-flat text-twitter soi-icon">
                                        <TwitterIcon id="icon" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-center mt-10">
                                Don't have an account?
                                <NavLink to="/register"> Create Your Account  </NavLink>

                            </div>
                            <ToastContainer />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login