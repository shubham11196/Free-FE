import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [logdata, setData] = useState({
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setData(() => {
      return {
        ...logdata,
        [name]: value
      }
    }) 
  }

  const onSubmit = async () => {
      const res = await axios.post(`https://admin-backend-fjzy.onrender.com/api/users/register`, logdata);
      console.log(res);
      toast("User Registered Successfully");
      // history.push('/orders')
  
  }
  return (
    <Form
    // onSubmit={this.handleSubmit}
    >
      {/* {showLogo && ( */}
      <div className="text-center pb-4">
        <img
          src={logo200Image}
          className="rounded"
          style={{ width: 60, height: 60, cursor: 'pointer' }}
          alt="logo"
        // onClick={onLogoClick}
        />
      </div>
      {/* )} */}
      <FormGroup>
        <Label for="email">Enter Email Address</Label>
        <Input name="email" value={logdata.email} onChange={handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="password">Enter Password</Label>
        <Input name="password" value={logdata.password} onChange={handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="deliveryTime">User Role</Label>
        <br />
        <select
          value={logdata.role}
          name="role"
          style={{ width: "100%", height: "40px" }}
          onChange={handleChange}
        >
          <option>Select User Role</option>
          <option>Super Admin</option>
          <option>Admin</option>
          <option>Broker</option>
          <option>Supplier</option>
          <option>Seller</option>


        </select>
      </FormGroup>

      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          {/* {this.isSignup ?  */}
          Agree the terms and policy
          {/* : */}
          {/* 'Remember me'} */}
        </Label>
      </FormGroup>
      <hr />
      <Button
        size="lg"
        className="bg-gradient-theme-left border-0"
        block
      onClick={onSubmit}
      >
        Submit
        {/* {this.renderButtonText()} */}
      </Button>

      <div className="text-center pt-1">
        <h6>or</h6>
        <h6>
          {/* {this.isSignup ? ( */}
          <a href="#login">
            Login
          </a>
          {/* ) : ( */}
          {/* <a href="#signup">
                Signup
              </a> */}
          {/* )} */}
        </h6>
      </div>
      <ToastContainer />

    </Form>
  );
  // }
}
export default LoginForm;
