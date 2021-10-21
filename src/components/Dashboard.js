import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question.js";
import { Tab } from "semantic-ui-react";

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
          {props.ansQuestions.map((question) => (
            <li key={question.id}>
              <Question key={question.id} id={question.id} isQuestion={false} />
            </li>
          ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Answered",
      render: () => (
        <Tab.Pane>
          {props.unAnsQuestions.map((question) => (
            <li key={question.id}>
              <Question key={question.id} id={question.id} isQuestion={true} />
            </li>
          ))}
        </Tab.Pane>
      ),
    },
  ];
};

function mapStateToProps({ questions }) {
  const ansQuestions = Object.values(questions)
    .filter((question) => question.hasAnswered)
    .sort((a, b) => b.timestamp - a.timestamp);
  const unAnsQuestions = Object.values(questions)
    .filter((question) => !question.hasAnswered)
    .sort((a, b) => b.timestamp - a.timestamp);
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    ansQuestions,
    unAnsQuestions,
  };
}

export default connect(mapStateToProps)(Dashboard);
