import axios from 'axios';
import React from 'react';
import '../css/Login.css';
import { Form, FormControl } from 'react-bootstrap';

/**
 * Created a class component "Login" containing a state which holds the input values for the form.
 * We use setState which will help to preserve the login values of the user.
 * The bind this method is used which is set to the provided values of the login form.
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
   * We use async/await to make a post request to handle the user login.
   * A token is created and then saved in the local storage.
   * The user will now be redirected to the page which stores their todo list items.
   */
  async submit(e) {
    e.preventDefault();

    const newLogin = {
      email: this.state.email,
      password: this.state.password,
    };

    await axios
      .post('http://localhost:8080/login', newLogin)
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.data));
        window.location = '/user';
      })
      .catch(() =>
        alert(
          'The login details are invalid. Please make sure you have signed up first!'
        )
      );
  }

  // We display the login form when the user clicks on the login button found in the header.
  render() {
    return (
      <section>
        <div className="col-lg-6 offset-lg-3">
          <div className="row justify-content-center">
            <h5 className="login-form-heading">
              Fill in your details to Login
            </h5>
            <Form onSubmit={this.submit}>
              <hr />
              <FormControl
                autocomplete="off"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={this.change}
                required
              />
              <hr />
              <FormControl
                autocomplete="off"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.change}
                required
              />
              <hr />
              <button className="login-form-btn" type="submit">
                Login
              </button>
            </Form>
          </div>
        </div>
      </section>
    );
  }
}
/* We export the 'Login' component in order to display this code in App.js. */
export default Login;