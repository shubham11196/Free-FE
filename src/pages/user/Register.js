import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const Register = () => {
    const dispatch = useDispatch();
    const [udata, setData] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });
    // const  {users } = useSelector((state) => state.allUsers);
    const adddata = (e) => {
        const { name, value } = e.target;

        setData(() => {
            return {
                ...udata,
                [name]: value

            }
        })
    }

    const senddata = async (e) => {
        e.preventDefault();

        const { fname, email, mobile, password, cpassword } = udata;
        const res = await fetch("https://admin-backend-fjzy.onrender.com/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, email, mobile, password, cpassword
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status == 201) {
            toast.success('User Registered Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (res.status == 500) {
            toast.error('Please fill values properly', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    useEffect(() => {
        // dispatch(registerUser())
    }, [])

    return (
        <div className="forny-container">
            <div className="forny-inner">
                <div className="forny-form">
                    <div className="mb-8 text-center forny-logo">
                        <img
                            width="150px"
                            style={{ marginBottom: "25px" }}
                            src="./AsmiBoutique.png"
                            alt="amazonlogo"
                        />
                    </div>
                    <div className="text-center">
                        <h4 className="login-title">Create an account</h4>
                        <p class="mb-10">Setup a new account in a minute.</p>
                    </div>
                    <form method="POST">
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <PersonOutlineIcon id="icon" />
                                    </span>
                                </div>

                                <input type="text" name="fname" id="fname" onChange={adddata} value={udata.fname} className="form-control"
                                    placeholder="Your Name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <MailOutlineIcon id="icon" />
                                    </span>
                                </div>

                                <input type="text"
                                    name="email"
                                    id="email"
                                    onChange={adddata}
                                    value={udata.email}
                                    className="form-control"
                                    placeholder="Email Address" />
                            </div>
                        </div>
                        <div className="form-group password-field">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <LockOpenIcon id="icon" />
                                    </span>
                                </div>


                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="At least 6 Char"
                                    onChange={adddata}
                                    value={udata.password}
                                />
                                <div className="input-group-append cursor-pointer">
                                    <span className="input-group-text">
                                        <RemoveRedEyeIcon id="icon" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group password-field">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <LockOpenIcon id="icon" />
                                    </span>
                                </div>

                                
                                <input type="password"
                                    name="cpassword" id="password"
                                    onChange={adddata}
                                    value={udata.cpassword}
                                    className="form-control"

                                />
                                <div className="input-group-append cursor-pointer">
                                    <span className="input-group-text">
                                        <RemoveRedEyeIcon id="icon" />
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div>
                            <button className="btn btn-primary btn-block" onClick={senddata}>Continue</button>
                        </div>


                        <div className="text-center mt-10">
                            Already have an account?
                            <NavLink to="/login"> Login here </NavLink>
                        </div>
                        <ToastContainer />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register