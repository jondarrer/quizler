/**
 * @enum {string} Type
 */
const Type = {
  OneOf: 'OneOf',
  AtLeastOneOf: 'AtLeastOneOf',
  TwoOf: 'TwoOf',
  ThreeOf: 'ThreeOf',
  AllOf: 'AllOf',
  MultipleChoice: 'MultipleChoice',
};

/**
 * @typedef {string|Array<string>} Choice
 */

/**
 * @typedef {Object} Question
 * @property {string} question
 * @property {string} name
 * @property {Type} type
 * @property {Array<Choice>} choices
 */

/**
 * @typedef {Object} AnswerPart
 * @property {string} text
 * @property {number} index
 * @property {boolean?} isAcceptable
 */

/**
 * @typedef {Object} AnswerParts
 * @property {string} input
 * @property {Array<AnswerPart>} parts
 */

module.exports = { Type };
