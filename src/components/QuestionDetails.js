import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import ResultQuestion from "./ResultQuestion";
import AnsQuestion from "./AnsQuestion";
class QuestionDetails extends Component {
  render() {
    const { question, isAnswered } = this.props;

    if (!question) {
      return <Redirect to="/not-found" />;
    }

    return (
      <Fragment>
        {isAnswered ? (
          <ResultQuestion id={question.id} />
        ) : (
          <AnsQuestion id={question.id} />
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;
  const userAnsweredIds = Object.keys(users[authedUser].answers);
  const isAnswered = userAnsweredIds.includes(id);
  const question = questions[id];
  isAnswered;
  return {
    isAnswered,
    question,
  };
}

export default connect(mapStateToProps)(QuestionDetails);
