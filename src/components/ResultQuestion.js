import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { Progress } from "semantic-ui-react";
import { Redirect } from "react-router";
class ResultQuestion extends Component {
  state = {
    chosenAns: "",
  };
  handleChoose = (e, { value }) => this.setState({ chosenAns: value });
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.chosenAns !== "") {
      const { authedUser, question, handleAddAnswer } = this.props;
      handleAddAnswer(authedUser, question.id, this.state.chosenAns);
    }
  };
  render() {
    const { authedUser, question, users } = this.props;
    if (!question || !users[question.author]) {
      return <Redirect to="/not-found" />;
    }
    const { timestamp, optionOne, optionTwo, id } = question;
    const { name, avatarURL } = users[question.author];
    const { answers } = users[authedUser];
    const optionOneVotes = optionOne.votes.length;
    const optionTwoVotes = optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = answers[id];
    return (
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

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const question = questions[id];
  return {
    users,
    question,
    authedUser,
  };
}

export default connect(mapStateToProps)(ResultQuestion);
