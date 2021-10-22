import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "semantic-ui-react";
import { formatQuestion, formatDate } from "../utils/helpers";

class NewQuestion extends Component {
  state = {
    OptionOne: "",
    OptionTwo: "",
  };
  handleOptionOne = (e) => {
    const OptionOne = e.target.value;

    this.setState(() => ({
      OptionOne,
    }));
  };
  handleOptionTwo = (e) => {
    const OptionTwo = e.target.value;

    this.setState(() => ({
      OptionTwo,
    }));
  };
  render() {
    return (
      <div className="question">
        <div className="center inherit-width">
          <p>Would you rather...?</p>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Input
                placeholder="Option One"
                name="OptionOne"
                onChange={this.handleOptionOne}
              />
              <br />
              <br />
              OR
              <br />
              <br />
              <Input
                placeholder="Option Two"
                name="OptionTwo"
                onChange={this.handleOptionTwo}
              />
            </Form.Field>
            <Form.Field>
              <Button
                color="green"
                size="tiny"
                fluid
                positive
                content="Submit"
              />
            </Form.Field>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  //   const question = questions[id];
  return {
    authedUser,
    // question: formatQuestion(question, users[question.author]),
  };
}

export default connect(mapStateToProps)(NewQuestion);
