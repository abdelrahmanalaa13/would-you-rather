import React, { Component } from "react";
import { connect } from "react-redux";
// import Question from "./Question.js";
import AnsQuestion from "./AnsQuestion.js";
import { Tab } from "semantic-ui-react";
import ResultQuestion from "./ResultQuestion.js";

class Dashboard extends Component {
  state = {
    isQuestions: false,
  };

  render() {
    return (
      <ul className="dashboard-list">
        <Tab panes={tabs(this.props)} className="tabs" />
      </ul>
    );
  }
}

const tabs = (props) => {
  return [
    {
      menuItem: "Un-Answered",
      render: () => (
        <Tab.Pane>
          {props.unAnsQuestions.map((question) => (
            <li key={question.id}>
              <AnsQuestion key={question.id} id={question.id} isQuestion={false} />
            </li>
          ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Answered",
      render: () => (
        <Tab.Pane>
          {props.ansQuestions.map((question) => (
            <li key={question.id}>
              <ResultQuestion key={question.id} question={question} isQuestion={true} />
            </li>
          ))}
        </Tab.Pane>
      ),
    },
  ];
};

function mapStateToProps({ authedUser, users, questions }) {
  const userAnsweredIds = Object.keys(users[authedUser].answers);

  const ansQuestions = Object.values(questions)
    .filter((question) => userAnsweredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
    console.log('ans', ansQuestions);
  const unAnsQuestions = Object.values(questions)
    .filter((question) => !userAnsweredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
    console.log('UNans', unAnsQuestions);
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    ansQuestions,
    unAnsQuestions,
  };
}

export default connect(mapStateToProps)(Dashboard);
