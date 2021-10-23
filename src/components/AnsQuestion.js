import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { Radio, Button, Form } from "semantic-ui-react";
import { handleAddAnswer } from "../actions/users";
import { Redirect } from "react-router";
class AnsQuestion extends Component {
  state = {
    chosenAns: "",
    toResult: false,
  };
  handleChoose = (e, { value }) => this.setState({ chosenAns: value });
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.chosenAns !== "") {
      const { authedUser, question, handleAddAnswer } = this.props;
      handleAddAnswer(authedUser, question.id, this.state.chosenAns);
      this.setState(() => ({
        chosenAns: "",
        toResult: true,
      }));
    }
  };
  render() {
    const { question, users } = this.props;
    const { chosenAns, toResult } = this.state;
    if (toResult === true) {
      return <Redirect to={`/result-question/${question.id}`} />;
    }

    if (!question || !users[question.author]) {
      return <Redirect to="/not-found" />;
    }
    const { timestamp, optionOne, optionTwo } = question;
    const { name, avatarURL } = users[question.author];

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
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Radio
                    label={optionOne.text}
                    name="radioGroup"
                    value="optionOne"
                    checked={chosenAns === "optionOne"}
                    onChange={this.handleChoose}
                  />
                  <br />
                  <Radio
                    label={optionTwo.text}
                    name="radioGroup"
                    value="optionTwo"
                    checked={chosenAns === "optionTwo"}
                    onChange={this.handleChoose}
                  />
                </Form.Field>
                <Form.Field>
                  <Button
                    color="green"
                    size="tiny"
                    fluid
                    positive
                    disabled={!this.state.chosenAns}
                    content="Submit"
                  />
                </Form.Field>
              </Form>
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
    users,
    question,
  };
}

export default connect(mapStateToProps, { handleAddAnswer })(AnsQuestion);
