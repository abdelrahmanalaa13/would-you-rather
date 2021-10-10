import { getInitialData } from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";

export const handelInitialData = () => (dispatch) =>
  getInitialData().then((users, questions) => {
    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
  });
