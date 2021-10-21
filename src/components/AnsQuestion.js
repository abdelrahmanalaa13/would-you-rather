import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { Radio, Button, Form } from "semantic-ui-react";
import { handleAddAnswer } from "../actions/users";
class AnsQuestion extends Component {
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
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Radio
                    label={optionOne.text}
                    name="radioGroup"
                    value="optionOne"
                    checked={this.state.chosenAns === "optionOne"}
                    onChange={this.handleChoose}
                  />
                  <br />
                  <Radio
                    label={optionTwo.text}
                    name="radioGroup"
                    value="optionTwo"
                    checked={this.state.chosenAns === "optionTwo"}
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
    question: formatQuestion(question, users[question.author]),
  };
}

export default connect(mapStateToProps, { handleAddAnswer })(AnsQuestion);
