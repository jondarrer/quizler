const isSyntacticallyValid = require('./is-syntactically-valid');

describe('isSymanticallyValid', () => {
  describe('OneOf', () => {
    it('should return false given no responses', () => {
      // Arrange
      const question = { type: 'OneOf' };
      const answers = [];

      // Act
      const result = isSyntacticallyValid(question, answers);

      // Assert
      expect(result).toBeFalsy();
    });
    it('should return true given 1 response', () => {
      // Arrange
      const question = { type: 'OneOf' };
      const answers = ['One'];

      // Act
      const result = isSyntacticallyValid(question, answers);

      // Assert
      expect(result).toBeTruthy();
    });
    it('should return false given 2 responses', () => {
      // Arrange
      const question = { type: 'OneOf' };
      const answers = ['One', 'Two'];

      // Act
      const result = isSyntacticallyValid(question, answers);

      // Assert
      expect(result).toBeFalsy();
    });
  });
  describe('TwoOf', () => {
    it('should return false given 1 response', () => {
      // Arrange
      const question = { type: 'TwoOf' };
      const answers = ['One'];

      // Act
      const result = isSyntacticallyValid(question, answers);

      // Assert
      expect(result).toBeFalsy();
    });
    it('should return true given 2 responses', () => {
      // Arrange
      const question = { type: 'TwoOf' };
      const answers = ['One', 'Two'];

      // Act
      const result = isSyntacticallyValid(question, answers);

      // Assert
      expect(result).toBeTruthy();
    });
    it('should return false given 3 responses', () => {
      // Arrange
      const question = { type: 'TwoOf' };
      const answers = ['One', 'Two', 'Three'];

      // Act
      const result = isSyntacticallyValid(question, answers);

      // Assert
      expect(result).toBeFalsy();
    });
  });
  describe('ThreeOf', () => {
    it('should return false given 2 responses', () => {
      // Arrange
      const question = { type: 'ThreeOf' };
      const answers = ['One', 'Two'];

      // Act
      const result = isSyntacticallyValid(question, answers);

      // Assert
      expect(result).toBeFalsy();
    });
    it('should return true given 3 responses', () => {
      // Arrange
      const question = { type: 'ThreeOf' };
      const answers = ['One', 'Two', 'Three'];

      // Act
      const result = isSyntacticallyValid(question, answers);

      // Assert
      expect(result).toBeTruthy();
    });
    it('should return false given 4 responses', () => {
      // Arrange
      const question = { type: 'ThreeOf' };
      const answers = ['One', 'Two', 'Three', 'Four'];

      // Act
      const result = isSyntacticallyValid(question, answers);

      // Assert
      expect(result).toBeFalsy();
    });
  });
  describe('AllOf', () => {
    it('should return false given 2 responses out of 3', () => {
      // Arrange
      const question = { type: 'AllOf', choices: ['', '', ''] };
      const answers = ['One,Two'];

      // Act
      const result = isSyntacticallyValid(question, answers);

      // Assert
      expect(result).toBeFalsy();
    });
    it('should return true given 3 responses out of 3', () => {
      // Arrange
      const question = { type: 'AllOf', choices: ['', '', ''] };
      const answers = ['One', 'Two', 'Three'];

      // Act
      const result = isSyntacticallyValid(question, answers);

      // Assert
      expect(result).toBeTruthy();
    });
    it('should return false given 4 responses out of 3', () => {
      // Arrange
      const question = { type: 'AllOf', choices: ['', '', ''] };
      const answers = ['One', 'Two', 'Three', 'Four'];

      // Act
      const result = isSyntacticallyValid(question, answers);

      // Assert
      expect(result).toBeFalsy();
    });
  });
});
