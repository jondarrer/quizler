const contains = require('./contains');
const { Type } = require('./types');

/**
 *
 * @param {import('./types').Question} question
 * @param {Array<string>} answers
 * @returns true if the answers match the question criteria, false otherwise
 */
const isCorrect = ({ type, choices, correctIndex }, answers) => {
  let correctAnswers;
  if (type === Type.MultipleChoice) {
    correctAnswers = answers[0] === choices[correctIndex] ? [answers[0]] : [];
  } else {
    correctAnswers = contains(choices, answers);
  }

  switch (type) {
    case Type.OneOf:
      return correctAnswers.length === 1;
    case Type.AtLeastOneOf:
      return correctAnswers.length >= 1;
    case Type.TwoOf:
      return correctAnswers.length === 2;
    case Type.ThreeOf:
      return correctAnswers.length === 3;
    case Type.AllOf:
      return correctAnswers.length === choices.length;
    case Type.MultipleChoice:
      return correctAnswers.length === 1;
  }
};

module.exports = isCorrect;
