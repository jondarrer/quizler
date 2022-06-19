const chalk = require('chalk');
const isSyntacticallyValid = require('./is-syntactically-valid');
const isCorrect = require('./is-correct');
const inputToAnswerArray = require('./input-to-answer-array');

/**
 *
 * @param {Array<import('./types').Question>} questions
 * @returns {Array<any>}
 */
const transformQuestionsToInquirerFormat = (questions) =>
  questions.map((question) => ({
    message: question.question,
    name: question.name,
    type: 'input',
    transformer: (input, _answers, { isFinal }) => {
      if (isFinal) {
        const result = isCorrect(question, inputToAnswerArray(input));
        const message =
          result === true ? chalk.green('Correct') : chalk.red('Incorrect');
        return `${chalk.cyan(input)} ${chalk.bold(message)}`;
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
