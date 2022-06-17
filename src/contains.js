/**
 * Identifies which options were given as an answer
 *
 * @param {Array<import('./types').Choice>} options Represent valid answers
 * @param {Array<string>} answers The answers which were given
 * @returns {Array<string>} The options found in answers
 */
const contains = (options, answers) => {
  const result = [];

  for (let i = 0; i < options.length; i++) {
    for (let j = 0; j < answers.length; j++) {
      const option = typeof options[i] === 'string' ? [options[i]] : options[i];
      if (option.includes(answers[j])) {
        result.push(answers[j]);
        break;
      }
    }
  }

  return result;
};

module.exports = contains;
