const { Type } = require('./types');

/**
 * Marks each part of the answer based on the question
 *
 * @param {import('./types').Question} question The question
 * @param {import('./types').AnswerParts} answerParts The parts of the answer
 */
const markAnswerParts = ({ type, choices, correctIndex }, { parts }) => {
  for (let i = 0; i < choices.length; i++) {
    const choice = typeof choices[i] === 'string' ? [choices[i]] : choices[i];
    for (let j = 0; j < parts.length; j++) {
      if (!canPartBeMarked({ type }, j)) {
        break;
      }
      const part = parts[j];
      if (type === Type.MultipleChoice) {
        if (part.text === choices[correctIndex]) {
          part.isAcceptable = true;
          break;
        }
      } else if (choice.includes(part.text)) {
        part.isAcceptable = true;
        break;
      }
    }
  }
};

/**
 * Determines whether the part should be marked. E.g. if the part is the first
 * from a OneOf question, then the result will be true; if it is the second
 * from a OneOf question, then the result will be false.
 *
 * @param {import('./types').Question} question
 * @param {number} partIndex
 * @returns {boolean} true if the part can be marked, false otherwise
 */
const canPartBeMarked = ({ type }, partIndex) => {
  switch (type) {
    case Type.OneOf:
      return partIndex < 1;
    case Type.AtLeastOneOf:
      return true;
    case Type.TwoOf:
      return partIndex < 2;
    case Type.ThreeOf:
      return partIndex < 3;
    case Type.AllOf:
      return true;
    case Type.MultipleChoice:
      return partIndex < 1;
    case Type.MultipleChoiceMoreThanOne:
      return true;
    default:
      return true;
  }
};

module.exports = { default: markAnswerParts, markAnswerParts, canPartBeMarked };
