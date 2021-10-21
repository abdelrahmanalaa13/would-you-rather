import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { Radio, Button, Form, Progress } from "semantic-ui-react";
import { handleAddAnswer } from "../actions/users";
class ResultQuestion extends Component {
  state = {
    chosenAns: "",
  };
  handleChoose = (e, { value }) => this.setState({ chosenAns: value });
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.chosenAns !== "") {
      const { authedUser, question, handleAddAnswer } = this.props;
      console.log(this.state.chosenAns);
      handleAddAnswer(authedUser, question.id, this.state.chosenAns);
    }
  };
  render() {
    const { question, users } = this.props;
    const currentUser = users[question.author]
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = currentUser.answers[question.id];
    console.log(userVote);
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
    if (!question) {
      return <p>Couldn't find the question</p>;
    }

    return (
      <div className="question">
        <img
          src={currentUser.avatarURL}
          alt={`Avatar of ${currentUser.name}`}
          className="avatar"
        />
        <div className="question-info">
          <div>
            <h2>{currentUser.name}</h2>
            <div>
              <small>{formatDate(timestamp)}</small>
            </div>
            <div className="center">
              <p>Would you rather...?</p>
              <Progress
                percent={((optionOneVotes / votesTotal) * 100).toFixed(2)}
                progress
                color={userVote === "optionOne" ? "green" : "blue"}
              >
                <p>
                  {optionOne.text} ({optionOneVotes})
                </p>
              </Progress>
              <Progress
                percent={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
                progress
                color={userVote === "optionTwo" ? "green" : "blue"}
              >
                <p>
                  {optionTwo.text} ({optionTwoVotes})
                </p>
              </Progress>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(ResultQuestion);
