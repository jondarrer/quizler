const camelCase = require('lodash.camelcase');

/**
 * Annotates questions with a name
 *
 * @param {Array<import('./types').Question>} questions The questions to annotate
 */
const annotateQuestions = (questions) =>
  questions.forEach((question) => {
    question.name = camelCase(question.question);
  });

module.exports = annotateQuestions;
