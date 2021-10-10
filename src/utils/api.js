import * as Data from "./_DATA.js";

export function getInitialData () {
  return Promise.all([
    Data._getUsers(),
    Data._getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export const saveQuestion = (question) => {
  return Data._saveQuestion(question);
};

export const saveQuestionAnswer = ({ authedUser, qid, answer }) => {
  return Data._saveQuestionAnswer({ authedUser, qid, answer });
};
