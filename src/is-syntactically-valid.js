const { Type } = require('./types');

/**
 *
 * @param {import('./types').Question} question
 * @param {Array<string>} answers
 * @returns true if the number of answers matches the question criteria, false otherwise
 */
const isSyntacticallyValid = ({ type, choices }, answers) => {
  switch (type) {
    case Type.OneOf:
      return answers.length === 1;
    case Type.TwoOf:
      return answers.length === 2;
    case Type.ThreeOf:
      return answers.length === 3;
    case Type.AllOf:
      return answers.length === choices.length;
    case Type.MultipleChoice:
      return answers.length === 1;
    default:
      return true;
  }
};

module.exports = isSyntacticallyValid;
