/**
 * Marks each part of the answer based on the question
 *
 * @param {import('./types').Question} question The question
 * @param {import('./types').AnswerParts} answerParts The parts of the answer
 */
const markAnswerParts = (question, answerParts) => {
  for (let i = 0; i < question.choices.length; i++) {
    const choice =
      typeof question.choices[i] === 'string'
        ? [question.choices[i]]
        : question.choices[i];
    for (let j = 0; j < answerParts.parts.length; j++) {
      const part = answerParts.parts[j];
      if (choice.includes(part.text)) {
        part.isAcceptable = true;
        break;
      }
    }
  }
};

module.exports = markAnswerParts;
