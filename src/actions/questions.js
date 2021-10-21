export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export const answerQuestion = (authUser, questionId, answer) => {
  return {
    type: ANSWER_QUESTION,
    authUser,
    questionId,
    answer
  };
}