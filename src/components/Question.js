import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";

class Question extends Component {
  render() {
    const { question, user, isAnswered } = this.props;
    if (!question) {
      return <p>Couldn't find the question</p>;
    }
    const { timestamp, optionOne, id } = question;
    const { name, avatarURL } = user;

    return (
      <Link to={`/questions/${id}`}>
        <div className="question">
          <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
          <div className="question-info">
            <div>
              <h2>{name}</h2>
              <div>
                <small>{formatDate(timestamp)}</small>
              </div>
              <div className="center">
                <p>Would you rather...?</p>
                <p>_{optionOne.text}_</p>

                <button className="btn viewBtn">View Poll Details</button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ users, questions }, { id, isAnswered }) {
  const question = questions[id];
  return {
    user: users[question.author],
    question: question,
    isAnswered,
  };
}

export default connect(mapStateToProps)(Question);
