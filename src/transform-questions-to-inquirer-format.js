const chalk = require('chalk');

const isSyntacticallyValid = require('./is-syntactically-valid');
const identifyAnswerParts = require('./identify-answer-parts');
const { markAnswerParts } = require('./mark-answer-parts');
const formatMessage = require('./format-message');

/**
 *
 * @param {Array<import('./types').Question>} questions
 * @returns {Array<any>}
 */
const transformQuestionsToInquirerFormat = (questions) =>
  questions.map((question) => ({
    message: question.question,
    name: question.name,
    type: question.type === 'MultipleChoice' ? 'list' : 'input',
    choices: question.type === 'MultipleChoice' ? question.choices : undefined,
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
      new Promise((resolve) => {
        resolve(
          isSyntacticallyValid(question, input.split(',')) === true
            ? true
            : question.type
        );
      }),
  }));

module.exports = transformQuestionsToInquirerFormat;
