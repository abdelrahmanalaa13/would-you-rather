import { saveQuestionAnswer } from "../utils/api";
import { answerQuestion } from "./questions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

const addUserAnswer = (authedUser, qid, answer) => {
  return {
    type: ADD_USER_ANSWER,
    authedUser,
    qid,
    answer,
  };
};

export const handleAddAnswer = (authedUser, qid, answer) => {
  return (dispatch) => {
    dispatch(answerQuestion(authedUser, qid, answer));
    dispatch(addUserAnswer(authedUser, qid, answer));

    return saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    }).catch((e) => {
      console.warn("Error in handleAddAnswer: ", e);
      alert("The was an error adding the Answer. Try again.");
    });
  };
};

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author,
  };
}
