const inquirer = require('inquirer');
const chalk = require('chalk');

const annotateQuestions = require('./annotate-questions');
const transformQuestionsToInquirerFormat = require('./transform-questions-to-inquirer-format');
const isCorrect = require('./is-correct');

/**
 *
 * @param {Array<import('./types').Question>} questions The questions to ask
 */
const quizler = (questions) => {
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

      console.log(`${chalk.bold('Your score:')} ${correct}/${total}`);
    });
};

module.exports = quizler;
