const annotateQuestions = require('./annotate-questions');

describe('annotateQuestions', () => {
  it('given a question of "What date is Christmas day?", should add a name "whatDateIsChristmasDay"', () => {
    // Arrange
    const question = {
      question: 'What date is Christmas day?',
    };

    // Act
    annotateQuestions([question]);

    // Assert
    expect(question.name).toBe('whatDateIsChristmasDay');
  });
});
