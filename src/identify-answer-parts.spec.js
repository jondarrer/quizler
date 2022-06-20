const identifyAnswerParts = require('./identify-answer-parts');

describe('identifyAnswerParts', () => {
  it('should identify the three parts of the answer', () => {
    // Arrange
    const input = 'Dun na nGall, An Cabhan, Muineachan';

    // Act
    const result = identifyAnswerParts(input);

    // Assert
    expect(result.parts).toHaveLength(3);
    expect(result.parts[0].text).toBe('Dun na nGall');
    expect(result.parts[0].index).toBe(0);
    expect(result.parts[1].text).toBe('An Cabhan');
    expect(result.parts[1].index).toBe(14);
    expect(result.parts[2].text).toBe('Muineachan');
    expect(result.parts[2].index).toBe(25);
  });
});
