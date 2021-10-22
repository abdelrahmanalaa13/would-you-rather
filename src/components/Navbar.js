import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(null));
  };

  render() {
    const { users, authedUser } = this.props;
    const user = authedUser ? users[authedUser] : null;

    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/new" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leader Board
            </NavLink>
          </li>
        </ul>

        {user ? (
          <div className="user-details">
            Hello, {user.name}
            <img
              src={user.avatarURL}
              alt={`Avatar of ${user.name}`}
              className="avatar"
            />
            <Button
              color="green"
              size="tiny"
              positive
              content="Logout"
              onClick={this.handleLogout}
            />
          </div>
        ) : null}
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    users,
    authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
