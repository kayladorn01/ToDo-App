

import React from 'react';
import axios from 'axios';
import '../css/TodoList.css';

/* Within our TodoList component, we will begin by creating some states to store our data (new todo items, 
  user details, existing todo items) for this application. The states of the inital values will be empty 
  since the values will always be changing. The bind this method is used which is set to the provided values.*/
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new: '',
      user: {},
      todo: [],
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.delete = this.delete.bind(this);
  }

  /* After all page elements have been rendered correctly, we get the user's details using the token. This data
  will now be saved to state */
  async componentDidMount() {
    const token = await JSON.parse(localStorage.getItem('token'));
    axios
      .get('http://localhost:8080/user/todo', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) =>
        this.setState({ user: response.data, todo: response.data.todo })
      )
      .catch((err) => console.log(err));
  }

  // We use setState which will help to preserve the values of the user for creating a new to do form.
  change(e) {
    this.setState({
      new: e.target.value,
    });
  }

  /* Used a submit function in order to add new todo items. we get the items using the token from local storage. 
  This data will now be updated and saved to state */
  async submit(e) {
    e.preventDefault();

    const newTodo = {
      item: this.state.new,
      user: this.state.user._id,
    };

    const token = await JSON.parse(localStorage.getItem('token'));
    await axios
      .post('http://localhost:8080/todo/add', newTodo, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        axios
          .get('http://localhost:8080/user/todo', {
            headers: {
              Authorization: token,
            },
          })
          .then((response) =>
            this.setState({ user: response.data, todo: response.data.todo })
          )
          .catch((err) => console.log(err));
        this.setState({ new: '' });
      })

      .catch((err) => console.log(err));

    console.log(this.state.user);
    console.log(this.state.todo);
  }

  // Used a delete function in order to delete the users todo items from the database and array in the state.
  async delete(e) {
    e.preventDefault();

    const newDelete = {
      id: e.target.name,
    };

    const token = await JSON.parse(localStorage.getItem('token'));

    axios
      .post('http://localhost:8080/todo/delete', newDelete, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        const newArray = this.state.todo.filter(
          (item) => item._id !== e.target.name
        );

        this.setState({
          todo: newArray,
        });
      })
      .catch((err) => console.log(err));
  }

/* Once the user is logged into the todo app, a "Welcome" greeting will be displayed together with their 
username. Next to this greeting will be a logout button for the user to sign out of his/her account.
Users will be able to add and delete task items from their list by clicking the respective buttons.*/
  render() {
    return (
      <div>
        <header className="header">
          <h1 className="loggeduser">Welcome, {this.state.user.firstName}</h1>
          <button className="logout-btn">
            <a href="/">Logout</a>
          </button>
        </header>
        <div className="d-flex justify-content-around">
          <div>
            <div>
              <div className="list-heading">Things To Do:</div>
              <hr />
              <ul>
                {this.state.todo.map((todo) => {
                  return (
                    <li
                      className="d-flex justify-content-center"
                      key={todo._id}
                    >
                      <div className="item-name">{todo.item} </div>
                      <button
                        type="button"
                        name={todo._id}
                        onClick={this.delete}
                        className="remove-btn"
                      >
                        Delete Task
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <div className="add-title">Add Item:</div>
            <hr />
            <form onSubmit={this.submit}>
              <input
                className="form-control"
                type="text"
                placeholder="I need to..."
                value={this.state.new}
                onChange={this.change}
              />
              <br />
              <button className="add-btn" type="submit">
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

/* We export the 'TodoList' component in order to display this code in App.js. */
export default TodoList;