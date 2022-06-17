/**
 *
 * @param {import('./types').Question} question
 * @param {Array<string>} answers
 * @returns true if the number of answers matches the question criteria, false otherwise
 */
const isSyntacticallyValid = ({ type, choices }, answers) => {
  switch (type) {
    case 'OneOf':
      return answers.length === 1;
    case 'TwoOf':
      return answers.length === 2;
    case 'ThreeOf':
      return answers.length === 3;
    case 'AllOf':
      return answers.length === choices.length;
  }
};

module.exports = isSyntacticallyValid;
