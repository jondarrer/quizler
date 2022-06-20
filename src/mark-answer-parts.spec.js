const { markAnswerParts, canPartBeMarked } = require('./mark-answer-parts');

describe('markAnswerParts', () => {
  describe('OneOf', () => {
    // Arrange
    const question = {
      question:
        'Name any large lake in the island of Ireland except the biggest',
      type: 'OneOf',
      choices: [
        ['Lough Corrib', 'Loch Coirib'],
        ['Lough Derg', 'Loch Deirgeirt'],
        ['Lough Erne', 'Loch Eirne'],
        ['Lough Ree', 'Loch Ri'],
        ['Lough Mask', 'Loch Measca'],
        ['Lough Conn', 'Loch Con'],
        ['Lough Allen', 'Loch Aillionn'],
        ['Lough Melvin', 'Loch Meilbhe'],
        ['Lough Leane', 'Loch Lein'],
        ['Poulaphouca Reservoir', 'Pollaphuca', "Poll a' Phuca"],
        ['Lough Sheelin', 'Loch Siodh Linn'],
        ['Lough Carra', 'Loch Ceara'],
      ],
    };

    it('should mark 0 as acceptable given 1 incorrect response', () => {
      // Arrange
      const answerParts = {
        input: 'Blah',
        parts: [{ text: 'Blah' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeFalsy();
    });

    it('should mark 1 as acceptable given 1 correct response', () => {
      // Arrange
      const answerParts = {
        input: 'Loch Coirib',
        parts: [{ text: 'Loch Coirib' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
    });

    it('should mark 1 as acceptable given 2 correct responses', () => {
      // Arrange
      const answerParts = {
        input: 'Loch Coirib, Loch Deirgeirt',
        parts: [{ text: 'Loch Coirib' }, { text: 'Loch Deirgeirt' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
      expect(answerParts.parts[1].isAcceptable).toBeFalsy();
    });
  });
  describe('AtLeastOneOf', () => {
    // Arrange
    const question = {
      question:
        'Give the Irish name for at least one of the counties in Northern Ireland',
      type: 'AtLeastOneOf',
      choices: [
        'Fear Manach',
        'Tir Eoghain',
        'Doire',
        'Aontroim',
        'An Dun',
        'Ard Mhacha',
      ],
    };

    it('should mark 0 as acceptable given 1 incorrect response', () => {
      // Arrange
      const answerParts = {
        input: 'Blah',
        parts: [{ text: 'Blah' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeFalsy();
    });

    it('should mark 1 as acceptable given 1 correct response', () => {
      // Arrange
      const answerParts = {
        input: 'Fear Manach',
        parts: [{ text: 'Fear Manach' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
    });

    it('should mark 2 as acceptable given 2 correct responses', () => {
      // Arrange
      const answerParts = {
        input: 'Fear Manach, Tir Eoghain',
        parts: [{ text: 'Fear Manach' }, { text: 'Tir Eoghain' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
      expect(answerParts.parts[1].isAcceptable).toBeTruthy();
    });

    it('should mark 2 as acceptable given 2 correct responses and 1 incorrect response', () => {
      // Arrange
      const answerParts = {
        input: 'Fear Manach, Tir Eoghain, Blah',
        parts: [
          { text: 'Fear Manach' },
          { text: 'Tir Eoghain' },
          { text: 'Blah' },
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
  describe('TwoOf', () => {
    // Arrange
    const question = {
      question: 'Name 2 counties which ajoin Dublin county',
      type: 'TwoOf',
      choices: [
        ['Wicklow', 'Cill Mhantain'],
        ['Kildare', 'Cill Dara'],
        ['Meath', 'An Mhi'],
        ['Louth', 'La'],
      ],
    };

    it('should mark 0 as acceptable given 2 incorrect responses', () => {
      // Arrange
      const answerParts = {
        input: 'Blah, Cad',
        parts: [{ text: 'Blah' }, { text: 'Cad' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeFalsy();
      expect(answerParts.parts[1].isAcceptable).toBeFalsy();
    });

    it('should mark 1 as acceptable given 1 correct response and 1 incorrect response', () => {
      // Arrange
      const answerParts = {
        input: 'Cill Mhantain, Cad',
        parts: [{ text: 'Cill Mhantain' }, { text: 'Cad' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
      expect(answerParts.parts[1].isAcceptable).toBeFalsy();
    });

    it('should mark 2 as acceptable given 2 correct responses', () => {
      // Arrange
      const answerParts = {
        input: 'Cill Mhantain, La',
        parts: [{ text: 'Cill Mhantain' }, { text: 'La' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
      expect(answerParts.parts[1].isAcceptable).toBeTruthy();
    });

    it('should mark 2 as acceptable given 2 correct responses and 1 incorrect response', () => {
      // Arrange
      const answerParts = {
        input: 'Cill Mhantain, La, Cad',
        parts: [{ text: 'Cill Mhantain' }, { text: 'La' }, { text: 'Cad' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
      expect(answerParts.parts[1].isAcceptable).toBeTruthy();
      expect(answerParts.parts[2].isAcceptable).toBeFalsy();
    });
  });
  describe('ThreeOf', () => {
    // Arrange
    const question = {
      question: 'Name 3 counties in Northern Ireland',
      type: 'ThreeOf',
      choices: [
        ['Fermanagh', 'Fear Manach'],
        ['Tyrone', 'Tir Eoghain'],
        ['Derry', 'Londonderry', 'Doire'],
        ['Antrim', 'Aontroim'],
        ['Down', 'An Dun'],
        ['Armagh', 'Ard Mhacha'],
      ],
    };

    it('should mark 0 as acceptable given 0 correct responses', () => {
      // Arrange
      const answerParts = {
        input: 'Blah, Cad, Conas',
        parts: [{ text: 'Blah' }, { text: 'Cad' }, { text: 'Conas' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeFalsy();
      expect(answerParts.parts[1].isAcceptable).toBeFalsy();
      expect(answerParts.parts[2].isAcceptable).toBeFalsy();
    });

    it('should mark 1 as acceptable given 1 correct response', () => {
      // Arrange
      const answerParts = {
        input: 'Fear Manach, Cad, Conas',
        parts: [{ text: 'Fear Manach' }, { text: 'Cad' }, { text: 'Conas' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
      expect(answerParts.parts[1].isAcceptable).toBeFalsy();
      expect(answerParts.parts[2].isAcceptable).toBeFalsy();
    });

    it('should mark 2 as acceptable given 2 correct responses', () => {
      // Arrange
      const answerParts = {
        input: 'Fear Manach, Antrim, Conas',
        parts: [{ text: 'Fear Manach' }, { text: 'Antrim' }, { text: 'Conas' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
      expect(answerParts.parts[1].isAcceptable).toBeTruthy();
      expect(answerParts.parts[2].isAcceptable).toBeFalsy();
    });

    it('should mark 3 as acceptable given 3 correct responses', () => {
      // Arrange
      const answerParts = {
        input: 'Fear Manach, Antrim, Down',
        parts: [{ text: 'Fear Manach' }, { text: 'Antrim' }, { text: 'Down' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
      expect(answerParts.parts[1].isAcceptable).toBeTruthy();
      expect(answerParts.parts[2].isAcceptable).toBeTruthy();
    });

    it('should mark 3 as acceptable given 4 correct responses', () => {
      // Arrange
      const answerParts = {
        input: 'Fear Manach, Antrim, Down, Doire',
        parts: [
          { text: 'Fear Manach' },
          { text: 'Antrim' },
          { text: 'Down' },
          { text: 'Doire' },
        ],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
      expect(answerParts.parts[1].isAcceptable).toBeTruthy();
      expect(answerParts.parts[2].isAcceptable).toBeTruthy();
      expect(answerParts.parts[3].isAcceptable).toBeFalsy();
    });
  });
  describe('AllOf', () => {
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

    it('should mark 2 as acceptable given 2 correct responses out of 3', () => {
      // Arrange
      const answerParts = {
        input: 'Dun na nGall, An Cabhan, Blah',
        parts: [
          { text: 'Dun na nGall' },
          { text: 'An Cabhan' },
          { text: 'Blah' },
        ],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
      expect(answerParts.parts[1].isAcceptable).toBeTruthy();
      expect(answerParts.parts[2].isAcceptable).toBeFalsy();
    });

    it('should mark 2 as acceptable given 2 correct responses out of 3', () => {
      // Arrange
      const answerParts = {
        input: 'Dun na nGall, An Cabhan, Muineachan',
        parts: [
          { text: 'Dun na nGall' },
          { text: 'An Cabhan' },
          { text: 'Muineachan' },
        ],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
      expect(answerParts.parts[1].isAcceptable).toBeTruthy();
      expect(answerParts.parts[2].isAcceptable).toBeTruthy();
    });

    it('should mark 3 as acceptable given 3 correct responses and 1 incorrect response out of 3', () => {
      // Arrange
      const answerParts = {
        input: 'Dun na nGall, An Cabhan, Muineachan, Blah',
        parts: [
          { text: 'Dun na nGall' },
          { text: 'An Cabhan' },
          { text: 'Muineachan' },
          { text: 'Blah' },
        ],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
      expect(answerParts.parts[1].isAcceptable).toBeTruthy();
      expect(answerParts.parts[2].isAcceptable).toBeTruthy();
      expect(answerParts.parts[3].isAcceptable).toBeFalsy();
    });
  });
  describe('MultipleChoice', () => {
    // Arrange
    const question = {
      question: "When is St Patrick's day?",
      type: 'MultipleChoice',
      choices: ['March 9th', 'March 17th', 'March 21th'],
      correctIndex: 1,
    };

    it('should mark 0 as acceptable given 1 incorrect response', () => {
      // Arrange
      const answerParts = {
        input: 'March 9th',
        parts: [{ text: 'March 9th' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeFalsy();
    });

    it('should mark 1 as acceptable given 1 correct response', () => {
      // Arrange
      const answerParts = {
        input: 'March 17th',
        parts: [{ text: 'March 17th' }],
      };

      // Act
      markAnswerParts(question, answerParts);

      // Assert
      expect(answerParts.parts[0].isAcceptable).toBeTruthy();
    });
  });
});

describe('canPartBeMarked', () => {
  describe('OneOf', () => {
    // Arrange
    const question = {
      type: 'OneOf',
    };

    it('should return true for the first part', () => {
      // Arrange
      const partIndex = 0;

      // Act
      const result = canPartBeMarked(question, partIndex);

      // Assert
      expect(result).toBeTruthy();
    });

    it('should return false for the second part', () => {
      // Arrange
      const partIndex = 1;

      // Act
      const result = canPartBeMarked(question, partIndex);

      // Assert
      expect(result).toBeFalsy();
    });
  });
  describe('AtLeastOneOf', () => {
    // Arrange
    const question = {
      type: 'AtLeastOneOf',
    };

    it('should return true for the first part', () => {
      // Arrange
      const partIndex = 0;

      // Act
      const result = canPartBeMarked(question, partIndex);

      // Assert
      expect(result).toBeTruthy();
    });

    it('should return true for the second part', () => {
      // Arrange
      const partIndex = 1;

      // Act
      const result = canPartBeMarked(question, partIndex);

      // Assert
      expect(result).toBeTruthy();
    });
  });
  describe('TwoOf', () => {
    // Arrange
    const question = {
      type: 'TwoOf',
    };

    it('should return true for the second part', () => {
      // Arrange
      const partIndex = 1;

      // Act
      const result = canPartBeMarked(question, partIndex);

      // Assert
      expect(result).toBeTruthy();
    });

    it('should return false for the third part', () => {
      // Arrange
      const partIndex = 2;

      // Act
      const result = canPartBeMarked(question, partIndex);

      // Assert
      expect(result).toBeFalsy();
    });
  });
  describe('ThreeOf', () => {
    // Arrange
    const question = {
      type: 'ThreeOf',
    };

    it('should return true for the third part', () => {
      // Arrange
      const partIndex = 2;

      // Act
      const result = canPartBeMarked(question, partIndex);

      // Assert
      expect(result).toBeTruthy();
    });

    it('should return false for the fourth part', () => {
      // Arrange
      const partIndex = 3;

      // Act
      const result = canPartBeMarked(question, partIndex);

      // Assert
      expect(result).toBeFalsy();
    });
  });
  describe('AllOf', () => {
    // Arrange
    const question = {
      type: 'AllOf',
    };

    it('should return true for the first part', () => {
      // Arrange
      const partIndex = 0;

      // Act
      const result = canPartBeMarked(question, partIndex);

      // Assert
      expect(result).toBeTruthy();
    });

    it('should return true for the hundreth part', () => {
      // Arrange
      const partIndex = 99;

      // Act
      const result = canPartBeMarked(question, partIndex);

      // Assert
      expect(result).toBeTruthy();
    });
  });
  describe('MultipleChoice', () => {
    // Arrange
    const question = {
      type: 'MultipleChoice',
    };

    it('should return true for the first part', () => {
      // Arrange
      const partIndex = 0;

      // Act
      const result = canPartBeMarked(question, partIndex);

      // Assert
      expect(result).toBeTruthy();
    });

    it('should return false for the second part', () => {
      // Arrange
      const partIndex = 1;

      // Act
      const result = canPartBeMarked(question, partIndex);

      // Assert
      expect(result).toBeFalsy();
    });
  });
});
