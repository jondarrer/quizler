#!/usr/bin/env node

const getQuestionsFromFile = require('./get-questions-from-file');
const quizler = require('./quizler');

const main = () => {
  const questions = getQuestionsFromFile(getFilenameFromArgs());
  quizler(questions);
};

/**
 * Assumes the filename is the last argument passed in
 * @returns {string} The filename from the arguments passed in
 */
const getFilenameFromArgs = () => process.argv[process.argv.length - 1];

if (require.main === module) {
  main();
}

module.exports = main;
