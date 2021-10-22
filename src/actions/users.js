import { saveQuestionAnswer } from "../utils/api";
import { answerQuestion } from "./questions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

const addUserAnswer = (authUser, questionId, answer) => {
  return {
    type: ADD_USER_ANSWER,
    authUser,
    questionId,
    answer,
  };
};

export const handleAddAnswer = (authUser, questionId, answer) => {
  return (dispatch) => {
    dispatch(addUserAnswer(authUser, questionId, answer));
    dispatch(answerQuestion(authUser, questionId, answer));

    return saveQuestionAnswer({
      authedUser: authUser,
      qid: questionId,
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
