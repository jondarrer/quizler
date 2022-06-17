/**
 * @enum {string} Type
 */
const Type = {
  OneOf: 'OneOf',
  TwoOf: 'TwoOf',
  ThreeOf: 'ThreeOf',
  AllOf: 'AllOf',
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

module.exports = { Type };
