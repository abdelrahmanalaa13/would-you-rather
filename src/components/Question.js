import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";

class Question extends Component {
  render() {
    const { question } = this.props;
    if (!question) {
      return <p>Couldn't find the question</p>;
    }
    const {
      name,
      avatar,
      id,
      timestamp,
      optionOne,
      optionTwo,
      // optionsOne,
      // optionsTwo,
      // hasAnswered,
    } = question;

    return (
      <div className="question">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          <div>
            <h2>{name}</h2>
            <div>
              <small>{formatDate(timestamp)}</small>
            </div>
            <div className="center">
              <p>Would you rather...?</p>
              <p>_{question.optionOne.text}_</p>
              <button className="btn viewBtn">View Poll</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    question: formatQuestion(question, users[question.author]),
  };
}

export default connect(mapStateToProps)(Question);
