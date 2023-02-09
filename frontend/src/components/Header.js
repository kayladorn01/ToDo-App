import React from 'react';
import Signup from './SignUp.js';
import Login from './Login.js';
import '../css/Header.css';

/**
 * Created a class component "Header" containing a state.
 * This will help us to check if the user want to log in to their account or sign up for a new one.
 * We use setState which will help to preserve the login or sign up choice of the user.
 * The bind method is used which is set to the designated form choice of the user.
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: '',
    };
    this.form = this.form.bind(this);
  }

  form(e) {
    e.preventDefault();

    this.setState({
      form: e.target.name,
    });
  }

  // The login features (login and sign up button) will be displayed next to the "To Do App!" title.
  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header-title">To Do App!</h1>
          <div className="login-details">
            <button onClick={this.form} name="login" className="login-btn">
              Login
            </button>
            <button onClick={this.form} name="sign" className="signup-btn">
              Sign Up
            </button>
          </div>
        </header>
        <hr />
        <main>
          <section>
            {this.state.form === 'sign' ? (
              <Signup />
            ) : this.state.form === 'login' ? (
              <Login />
            ) : null}
          </section>
        </main>
      </div>
    );
  }
}

// We export the 'Header' component in order to display this code in App.js.
export default Header;