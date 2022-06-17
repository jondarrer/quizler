const camelCase = require('lodash.camelcase');

const annotateQuestions = (questions) =>
  questions.forEach((question) => {
    question.name = camelCase(question.question);
  });

module.exports = annotateQuestions;
