const inquirer = require('inquirer');
const questions = require('./questions.json');
const annotateQuestions = require('../src/annotate-questions');
const transformQuestionsToInquirerFormat = require('../src/transform-questions-to-inquirer-format');
const isCorrect = require('../src/is-correct');

annotateQuestions(questions);

inquirer
  .prompt(transformQuestionsToInquirerFormat(questions))
  .then((answers) => {
    let total = 0;
    let correct = 0;
    for (const [name, answer] of Object.entries(answers)) {
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if (name === question.name) {
          const result = isCorrect(question, answer.split(','));
          total++;
          correct = result ? correct + 1 : correct;
        }
      }
    }

    console.log(`${correct}/${total}`);
  });
