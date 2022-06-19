const fs = require('fs');

jest.mock('fs');

const getQuestionsFromFile = require('./get-questions-from-file');

describe('getQuestionsFromFile', () => {
  it('should get the questions from the file', () => {
    // Arrange
    const questions = [
      { question: 'How many?', type: 'OneOf', choices: ['A few', 'Many'] },
    ];
    fs.readFileSync.mockReturnValue(JSON.stringify(questions));

    // Act
    const result = getQuestionsFromFile('./test.json');

    // Assert
    expect(result).toStrictEqual(questions);
  });
});
