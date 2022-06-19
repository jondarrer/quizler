const contains = require('./contains');

/**
 *
 * @param {import('./types').Question} question
 * @param {Array<string>} answers
 * @returns true if the answers match the question criteria, false otherwise
 */
const isCorrect = ({ type, choices }, answers) => {
  const correctAnswers = contains(choices, answers);

  switch (type) {
    case 'OneOf':
      return correctAnswers.length === 1;
    case 'AtLeastOneOf':
      return correctAnswers.length >= 1;
    case 'TwoOf':
      return correctAnswers.length === 2;
    case 'ThreeOf':
      return correctAnswers.length === 3;
    case 'AllOf':
      return correctAnswers.length === choices.length;
  }
};

module.exports = isCorrect;
