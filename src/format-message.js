const chalk = require('chalk');

/**
 * Uses the acceptability of the parts of the answer to indicate the
 * rightness or wrongness to the user
 *
 * @param {import('./types').AnswerParts} answerParts
 * @returns {string} The formatted message
 */
const formatMessage = (answerParts) => {
  const message = [];

  for (let i = 0; i < answerParts.parts.length; i++) {
    const part = answerParts.parts[i];
    switch (part.isAcceptable) {
      case true:
        message.push(chalk.green(part.text));
        break;
      default:
        message.push(chalk.red(chalk.strikethrough(part.text)));
    }

    if (i < answerParts.parts.length - 1) {
      message.push(
        answerParts.input.substring(
          part.index + part.text.length,
          answerParts.parts[i + 1].index
        )
      );
    }
  }

  return message.join('');
};

module.exports = formatMessage;
