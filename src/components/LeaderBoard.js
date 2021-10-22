import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Grid,
  Header,
  Image,
  Label,
  Divider,
} from "semantic-ui-react";
class LeaderBoard extends Component {
  render() {
    const { leaders } = this.props;
    const leadersColors = ['yellow', 'green', 'black']
    return (
      <Fragment>
        {leaders.map((leader, placeId) => (
          <div className="question text-bold d-block">
            <Segment.Group key={leader.id}>
              <Label corner="left" icon="trophy" color={leadersColors[placeId]} />
              <Grid divided padded>
                <Grid.Row>
                  <Grid.Column width={4} verticalAlign="middle">
                    <Image src={leader.avatarURL} />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Header as="h3" textAlign="left">
                      {leader.name}
                    </Header>
                    <Grid>
                      <Grid.Column width={12}>Answered questions</Grid.Column>
                      <Grid.Column width={4}>{leader.numOfAnswers}</Grid.Column>
                    </Grid>
                    <Divider />
                    <Grid>
                      <Grid.Column width={12}>Created questions</Grid.Column>
                      <Grid.Column width={4}>
                        {leader.numOfQuestions}
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="center">
                    <Segment.Group>
                      <Header as="h5" block attached="top" content="Score" />
                      <Segment>
                        <Label circular color="teal" size="big">
                          {leader.totalScore}
                        </Label>
                      </Segment>
                    </Segment.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment.Group>
          </div>
        ))}
      </Fragment>
    );
  }
}

function mapStateToProps({ users }) {
  const leaders = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      numOfAnswers: Object.values(user.answers).length,
      numOfQuestions: user.questions.length,
      totalScore: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((b, a) => a.totalScore - b.totalScore)
    .slice(0, 3);
  return {
    leaders,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
