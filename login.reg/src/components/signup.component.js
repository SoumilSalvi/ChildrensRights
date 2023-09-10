import React, { Component } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';


export default class SignUp extends Component {
  constructor(props){
    super (props);
    this.state={
      fname:"",
      lname:"",
      email:"",
      password:"",
    };
    this.handlesubmit=this.handlesubmit.bind(this);
  }
  handlesubmit(e){
    e.preventDefault();
    const{fname,lname,email,password}=this.state;
    console.log(fname,lname,email,password);
    fetch("http://localhost:5000/register",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        fname,
        lname,
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
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e)=>this.setState({fname: e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" 
          onChange={(e)=>this.setState({lname: e.target.value})}
          />
        </div>

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

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" >
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
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
