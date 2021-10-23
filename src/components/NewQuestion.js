import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Button, Form, Input } from "semantic-ui-react";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    OptionOne: "",
    OptionTwo: "",
    toHome: false,
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
  handleSubmit = (e) => {
    e.preventDefault();
    const { authedUser, dispatch } = this.props;
    const { OptionOne, OptionTwo } = this.state;
    if (OptionOne && OptionTwo) {
      dispatch(handleAddQuestion(OptionOne, OptionTwo, authedUser));
      this.setState(() => ({
        OptionOne: "",
        OptionTwo: "",
        toHome: true,
      }));
    }
  };
  render() {
    if (this.state.toHome === true) {
      return <Redirect to={`/`} />;
    }
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
                disabled={!this.state.OptionOne || !this.state.OptionTwo}
                content="Submit"
              />
            </Form.Field>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
