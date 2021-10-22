import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  handleLogIn = (e, { value }) => {
    e.preventDefault();
    console.log(value);
    this.props.dispatch(setAuthedUser(value));
  };

  render() {
    const { usersList } = this.props;

    return (
      <div className="login-box">
        <h2>Sign In</h2>
        <Dropdown
          onChange={this.handleLogIn}
          placeholder="Select User"
          fluid
          selection
          options={usersList}
        />
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const usersList = Object.values(users).map((user) => {
    return {
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL },
    };
  });
  return {
    usersList,
  };
}

export default connect(mapStateToProps)(Login);
