import React from "react";
// TODO: import useFormik from formik library
import {useFormik} from 'formik';

function App() {

   // TODO: add a const called formik assigned to useFormik()
  const formik = useFormik({
    initialValues: {
      email:'',
      password:''
    },
    onSubmit: values=>{
      console.log('form', values)
      alert('Login successful');
    },
    validate: values=> {
      let errors = {};
      if(!values.email) errors.email = 'Email is required';
      else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          console.log('email invalid');
          errors.email = 'Email should be in the proper format';
        }

      if(!values.password) errors.password = 'Password is required';
      
      return errors;
    }
  })
 

  return (
    <div>
      
      <form onSubmit={formik.handleSubmit}>
        <div>Email</div>
        <input type="text" id="emailField" name="email" value={formik.email} onChange={formik.handleChange}/>
        {formik.errors.email?<div id="emailError" style={{color:'red'}}> {formik.errors.email} </div>: null}
        <div>Password</div>
        <input type="text" id="pswField" name="password" value={formik.password} onChange={formik.handleChange}/>
        {formik.errors.password?<div id="pswError" style={{color:'red'}}> {formik.errors.password} </div>: null}
        <button id="submitBtn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
