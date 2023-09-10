import React, { Component } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';


export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      email:"",
      password:"",
    };
    this.handlesubmit=this.handlesubmit.bind(this);
  }
  handlesubmit(e){
    e.preventDefault();
    const {email,password}=this.state;
    console.log(email,password);
    fetch("http://localhost:5000/login-user",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        email,
        password,
      }),
    }).then((res)=>res.json())
    .then((data)=>{
      console.log(data,"userRegister");
    });
  }
  render() {
    return (
      <form onSubmit={this.handlesubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=>this.setState({email: e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=>this.setState({password: e.target.value})}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" >
           Submit 
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
        <br></br>
        <h3>------------OR------------</h3>
        
        <div className='g-signin'>
        <GoogleOAuthProvider clientId="442144624399-ia3okvaklbjhnr1pukvu1l927gqn5m8f.apps.googleusercontent.com">
        <GoogleLogin
        onSuccess={credentialResponse => {
        console.log(credentialResponse);
         }}
         onError={() => {
         console.log('Login Failed');
         }}
         />
          </GoogleOAuthProvider>
          </div>

      </form>
    )
  }
}
