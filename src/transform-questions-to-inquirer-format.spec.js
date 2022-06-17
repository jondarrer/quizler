const transformQuestionsToInquirerFormat = require('./transform-questions-to-inquirer-format');

describe('transformQuestionsToInquirerFormat', () => {
  it.skip('should transform the question into an input', () => {
    // Arrange
    const questions = [
      {
        question: 'Name three different fruit',
        name: 'nameThreeDifferentFruit',
        type: 'ThreeOf',
        choices: ['Apple', 'Orange', 'Banana', 'Kiwi'],
      },
    ];

    // Act
    const result = transformQuestionsToInquirerFormat(questions);

    // Assert
    expect(result).toStrictEqual([
      {
        type: 'input',
        name: 'nameThreeDifferentFruit',
        message: 'Name three different fruit',
      },
    ]);
  });
});
