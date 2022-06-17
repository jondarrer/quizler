const contains = require('./contains');

describe('contains', () => {
  it('should return an empty array, if none of the options contains the answers', () => {
    // Arrange
    const options = ['red', 'green', 'blue'];
    const answers = ['carrot'];

    // Act
    const result = contains(options, answers);

    // Assert
    expect(result).toStrictEqual([]);
  });

  it('should return an array with one correct answer, if one of the options is contained by the answers', () => {
    // Arrange
    const options = ['red', 'green', 'blue'];
    const answers = ['green', 'carrot'];

    // Act
    const result = contains(options, answers);

    // Assert
    expect(result).toStrictEqual(['green']);
  });

  it('should return an array with two correct answers, where two of the options are contained by the answers and one of the options has alternative "spellings"', () => {
    // Arrange
    const options = [['red', 'maroon'], 'green', 'blue'];
    const answers = ['maroon', 'red', 'carrot'];

    // Act
    const result = contains(options, answers);

    // Assert
    expect(result).toStrictEqual(['maroon']);
  });
});
