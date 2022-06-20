const markAnswerParts = require('./mark-answer-parts');

describe('markAnswerParts', () => {
  it('should mark the first two parts as acceptable, but the last as unacceptable', () => {
    // Arrange
    const question = {
      question: 'Name all 3 counties of Ulster in Ireland',
      type: 'AllOf',
      choices: [
        ['Donegal', 'Dun na nGall'],
        ['Cavan', 'An Cabhan'],
        ['Monaghan', 'Muineachan'],
      ],
    };
    const answerParts = {
      input: 'Dun na nGall, An Cabhan, Blah',
      parts: [
        { text: 'Dun na nGall', index: 0 },
        { text: 'An Cabhan', index: 14 },
        { text: 'Blah', index: 25 },
      ],
    };

    // Act
    markAnswerParts(question, answerParts);

    // Assert
    expect(answerParts.parts[0].isAcceptable).toBeTruthy();
    expect(answerParts.parts[1].isAcceptable).toBeTruthy();
    expect(answerParts.parts[2].isAcceptable).toBeFalsy();
  });
});
