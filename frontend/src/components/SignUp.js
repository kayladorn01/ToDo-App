import React from 'react';
import axios from 'axios';
import '../css/SignUp.css';
import { Form, FormControl } from 'react-bootstrap';

/**
 * Created a class component "Signup" containing states which holds the input values to create the user account.
 * We use setState which will help to preserve the signup values of the user.
 * The bind this method is used which is set to the provided values of the signup form.
 */
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  /**
   * The "this" keyword is used to target the form object to create the users account.
   * A new user account is created when the signup form is submitted.
   * We make a post request to handle the new user registration.
   * The user will now be redirected to the home page where they must now login.
   */
  submit(e) {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post('http://localhost:8080/user/add', newUser)
      .then(() =>
        alert(
          'You have signed up! Now, click the "Login" button and fill in your details to access your account.'
        )
      )
      .catch((err) => alert(err));

    window.location = '/';
  }

  // We display the signup form when the user clicks on the signup button found in the header.
  render() {
    return (
      <section>
        <div className="col-lg-6 offset-lg-3">
          <div className="row justify-content-center">
            <h5 className="signup-form-heading">
              Fill in your details to Sign Up
            </h5>
            <Form onSubmit={this.submit}>
              <hr />
              <FormControl
                type="text"
                className="form-control"
                name="firstName"
                placeholder="Enter First Name"
                value={this.state.firstName}
                onChange={this.change}
                required
                autocomplete="off"
              />
              <hr />
              <FormControl
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Enter Last Name"
                value={this.state.lastName}
                onChange={this.change}
                required
                autocomplete="off"
              />
              <hr />
              <FormControl
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={this.change}
                required
                autocomplete="off"
              />
              <hr />
              <FormControl
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.change}
                required
                autocomplete="off"
              />
              <hr />
              <button className="signup-form-btn" type="submit">
                Sign Up
              </button>
            </Form>
          </div>
        </div>
      </section>
    );
  }
}

/* We export the 'Signup' component in order to display this code in App.js. */
export default Signup;