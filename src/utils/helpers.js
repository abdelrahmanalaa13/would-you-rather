export const formatDate = (timestamp) => {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export const formatQuestion = (question, author, authedUser) => {
  const { id, likes, replies, optionOne, optionTwo, timestamp } = question;
  const { name, avatarURL } = author;

  return {
    name,
    id,
    timestamp,
    optionOne,
    optionTwo,
    avatar: avatarURL,
    optionsOne: likes.length,
    optionsTwo: replies.length,
    hasAnswered: likes.includes(authedUser),
  };
}
