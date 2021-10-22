import { hideLoading, showLoading } from "react-redux-loading";
import { saveQuestion } from "../utils/api";
import { addQuestionToUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export const answerQuestion = (authedUser, qid, answer) => {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
};
function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        console.log(question);
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
        dispatch(hideLoading());
      }
    );
  };
}
