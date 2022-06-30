/**
 * @param {string} input The user input with answers separated by commas (e.g. One, Two, Three)
 * @returns {Array<string>} The array of answers
 */
const inputToAnswerArray = (input) =>
  input.split ? input.split(',').map((answer) => answer.trim()) : [];

module.exports = inputToAnswerArray;
