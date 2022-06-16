const contains = require('./contains');

describe('contains', () => {
  it('should return 0, if none of the options contains the answers', () => {
    // Arrange
    const options = ['red', 'green', 'blue'];
    const answers = ['carrot'];

    // Act
    const result = contains(options, answers);

    // Assert
    expect(result).toBe(0);
  });
});
