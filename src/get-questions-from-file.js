const fs = require('fs');

/**
 *
 * @param {string} filename The path (relative or absolute) to the file containing the questions
 * @returns {Array<import('./types').Question>} The questions
 */
const getQuestionsFromFile = (filename) =>
  JSON.parse(fs.readFileSync(filename));

module.exports = getQuestionsFromFile;
