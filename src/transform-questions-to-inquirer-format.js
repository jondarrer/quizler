const isSyntacticallyValid = require('../src/is-syntactically-valid');

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
