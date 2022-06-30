const chalk = require('chalk');

const isSyntacticallyValid = require('./is-syntactically-valid');
const identifyAnswerParts = require('./identify-answer-parts');
const { markAnswerParts } = require('./mark-answer-parts');
const formatMessage = require('./format-message');
const inputToAnswerArray = require('./input-to-answer-array');
const { Type } = require('./types');

/**
 *
 * @param {Array<import('./types').Question>} questions
 * @returns {Array<any>}
 */
const transformQuestionsToInquirerFormat = (questions) =>
  questions.map((question) => ({
    message: question.question,
    name: question.name,
    type: convertTypeToInquirerType(question.type),
    choices: convertChoicesToInquirerChoices(question),
    transformer: (input, _answers, { isFinal }) => {
      if (isFinal) {
        const answerParts = identifyAnswerParts(input);
        markAnswerParts(question, answerParts);
        return formatMessage(answerParts);
      } else {
        return input;
      }
    },
    validate: (input) =>
      new Promise((resolve) =>
        resolve(
          isSyntacticallyValid(question, inputToAnswerArray(input)) === true
            ? true
            : question.type
        )
      ),
  }));

/**
 *
 * @param {import('./types').Type} type
 * @returns {string} Inquirer type
 */
const convertTypeToInquirerType = (type) => {
  switch (type) {
    case Type.MultipleChoice:
      return 'list';
    case Type.MultipleChoiceMoreThanOne:
      return 'checkbox';
    default:
      return 'input';
  }
};

/**
 *
 * @param {import('./types').Question} question
 * @returns {Array<import('./types').Choice>|undefined} The choices
 */
const convertChoicesToInquirerChoices = ({ type, choices }) => {
  switch (type) {
    case Type.MultipleChoice:
    case Type.MultipleChoiceMoreThanOne:
      return choices;
    default:
      return undefined;
  }
};

module.exports = transformQuestionsToInquirerFormat;
