const re = /(\w+\s?)+/g;

/**
 * Takes a user's answer and identifies all the parts
 *
 * @param {string} input The raw user input string
 * @returns {import('./types').AnswerParts} All the parts of the answer
 */
const identifyAnswerParts = (input) => {
  const result = {
    input,
    parts: [],
  };
  let ex;

  while ((ex = re.exec(input)) !== null) {
    result.parts.push({ text: ex[0], index: ex.index });
  }

  return result;
};

module.exports = identifyAnswerParts;
