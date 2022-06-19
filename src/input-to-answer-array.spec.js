const inputToAnswerArray = require('./input-to-answer-array');

describe('inputToAnswerArray', () => {
  it('should trim the answers', () => {
    // Arrange
    const input = 'One, Two, Three';

    // Act
    const result = inputToAnswerArray(input);

    // Assert
    expect(result).toStrictEqual(['One', 'Two', 'Three']);
  });
});
