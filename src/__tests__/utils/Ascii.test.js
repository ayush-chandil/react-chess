import Ascii from 'common/Ascii.js';
import Pgn from 'common/Pgn.js';

describe('toFen()', () => {
  it('is a starting position', () => {
    const board = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    expect(Ascii.toFen(board)).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
  });
  it('is pseudo-castling short', () => {
    const board = [
      [ ' r ', ' . ', ' b ', ' q ', ' k ', ' . ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' b ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' n ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' B ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' . ', ' . ', ' K ', ' R ' ]
    ];
    expect(Ascii.toFen(board)).toBe('r1bqk1nr/ppppbppp/2n5/4p3/4P3/5N2/PPPPBPPP/RNBQ2KR');
  });
  it('is castling short', () => {
    const board = [
      [ ' r ', ' . ', ' b ', ' q ', ' k ', ' . ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' b ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' n ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' B ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' . ', ' R ', ' K ', ' . ' ]
    ];
    expect(Ascii.toFen(board)).toBe('r1bqk1nr/ppppbppp/2n5/4p3/4P3/5N2/PPPPBPPP/RNBQ1RK1');
  });
  it('is r1bqkbnR/pppp1p2/2n5/4p1p1/2B1P3/5N2/PPPP1PP1/RNBQK3', () => {
    const board = [
      [ ' r ', ' . ', ' b ', ' q ', ' k ', ' b ', ' n ', ' R ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' n ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' p ', ' . ' ],
      [ ' . ', ' . ', ' B ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' . ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' . ', ' . ', ' . ' ]
    ];
    expect(Ascii.toFen(board)).toBe('r1bqkbnR/pppp1p2/2n5/4p1p1/2B1P3/5N2/PPPP1PP1/RNBQK3');
  });
});

describe('flip()', () => {
  it('is a starting position for White', () => {
    const board = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const expected = board;
    expect(Ascii.flip(Pgn.symbol.WHITE, board)).toEqual(expected);
  });
  it('is a starting position for Black', () => {
    const board = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const expected = [
      [ ' R ', ' N ', ' B ', ' K ', ' Q ', ' B ', ' N ', ' R ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' r ', ' n ', ' b ', ' k ', ' q ', ' b ', ' n ', ' r ' ]
    ];
    expect(Ascii.flip(Pgn.symbol.BLACK, board)).toEqual(expected);
  });
  it('is the Sicilian Defense for White', () => {
    const board = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' . ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' p ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const expected = board;
    expect(Ascii.flip(Pgn.symbol.WHITE, board)).toEqual(expected);
  });
  it('is the Sicilian Defense for Black', () => {
    const board = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' . ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' p ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const expected = [
      [ ' R ', ' N ', ' B ', ' K ', ' Q ', ' B ', ' N ', ' R ' ],
      [ ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' p ' ],
      [ ' r ', ' n ', ' b ', ' k ', ' q ', ' b ', ' n ', ' r ' ]
    ];
    expect(Ascii.flip(Pgn.symbol.BLACK, board)).toEqual(expected);
  });
});

describe('toAscii()', () => {
  it('is a starting position', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    const expected = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    expect(Ascii.toAscii(fen)).toEqual(expected);
  });
  it('is 1.e4 e5', () => {
    const fen = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR';
    const expected = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    expect(Ascii.toAscii(fen)).toEqual(expected);
  });
  it('is the Benko Gambit', () => {
    const fen = 'rn1qkb1r/4pp1p/3p1np1/2pP4/4P3/2N3P1/PP3P1P/R1BQ1KNR';
    const expected = [
      [ ' r ', ' n ', ' . ', ' q ', ' k ', ' b ', ' . ', ' r ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' p ', ' . ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' p ', ' . ', ' n ', ' p ', ' . ' ],
      [ ' . ', ' . ', ' p ', ' P ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' N ', ' . ', ' . ', ' . ', ' P ', ' . ' ],
      [ ' P ', ' P ', ' . ', ' . ', ' . ', ' P ', ' . ', ' P ' ],
      [ ' R ', ' . ', ' B ', ' Q ', ' . ', ' K ', ' N ', ' R ' ]
    ];
    expect(Ascii.toAscii(fen)).toEqual(expected);
  });
  it('is the Closed Sicilian', () => {
    const fen = 'r1bqk1nr/pp2ppbp/2np2p1/2p5/4P3/2NP2P1/PPP2PBP/R1BQK1NR';
    const expected = [
      [ ' r ', ' . ', ' b ', ' q ', ' k ', ' . ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' . ', ' . ', ' p ', ' p ', ' b ', ' p ' ],
      [ ' . ', ' . ', ' n ', ' p ', ' . ', ' . ', ' p ', ' . ' ],
      [ ' . ', ' . ', ' p ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' N ', ' P ', ' . ', ' . ', ' P ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' . ', ' . ', ' P ', ' B ', ' P ' ],
      [ ' R ', ' . ', ' B ', ' Q ', ' K ', ' . ', ' N ', ' R ' ]
    ];
    expect(Ascii.toAscii(fen)).toEqual(expected);
  });
});

describe('fromIndexToAlgebraic()', () => {
  const size = {
    files: 8,
    ranks: 8
  };
  it('is a8', () => {
    expect(Ascii.fromIndexToAlgebraic(0, 0, size)).toEqual('a8');
  });
  it('is a7', () => {
    expect(Ascii.fromIndexToAlgebraic(1, 0, size)).toEqual('a7');
  });
  it('is h2', () => {
    expect(Ascii.fromIndexToAlgebraic(6, 7, size)).toEqual('h2');
  });
  it('is h1', () => {
    expect(Ascii.fromIndexToAlgebraic(7, 7, size)).toEqual('h1');
  });
});

describe('fromAlgebraicToIndex()', () => {
  const size = {
    files: 8,
    ranks: 8
  };
  it('is 0, 0', () => {
    expect(Ascii.fromAlgebraicToIndex('a8', size)).toEqual([0, 0]);
  });
  it('is 1, 0', () => {
    expect(Ascii.fromAlgebraicToIndex('a7', size)).toEqual([1, 0]);
  });
  it('is 6, 7', () => {
    expect(Ascii.fromAlgebraicToIndex('h2', size)).toEqual([6, 7]);
  });
  it('is 7, 7', () => {
    expect(Ascii.fromAlgebraicToIndex('h1', size)).toEqual([7, 7]);
  });
});

describe('promote()', () => {
  it('a8', () => {
    const board = [
      [ ' P ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' . ', ' p ', ' p ', ' p ', ' p ', ' p ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' P ', ' P ', ' P ', ' P ', ' P ', ' p ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const expected = [
      [ ' Q ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' . ', ' p ', ' p ', ' p ', ' p ', ' p ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' P ', ' P ', ' P ', ' P ', ' P ', ' p ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    expect(Ascii.promote(board)).toEqual(expected);
  });
});

describe('asciiDiff()', () => {
  const size = {
    files: 8,
    ranks: 8
  };
  it('is e5', () => {
    const a = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const b = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const expected = [
      {
        from: ' p ',
        to: ' . ',
        sq: 'e7'
      },
      {
        from: ' . ',
        to: ' p ',
        sq: 'e5'
      }
    ];
    expect(Ascii.asciiDiff(a, b, size)).toEqual(expected);
  });
  it('is Nf3', () => {
    const a = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const b = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' . ', ' R ' ]
    ];
    const expected = [
      {
        from: ' . ',
        to: ' N ',
        sq: 'f3'
      },
      {
        from: ' N ',
        to: ' . ',
        sq: 'g1'
      }
    ];
    expect(Ascii.asciiDiff(a, b, size)).toEqual(expected);
  });
  it('is d5', () => {
    const a = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' . ', ' R ' ]
    ];
    const b = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' . ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' p ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' . ', ' R ' ]
    ];
    const expected = [
      {
        from: ' p ',
        to: ' . ',
        sq: 'd7'
      },
      {
        from: ' . ',
        to: ' p ',
        sq: 'd5'
      }
    ];
    expect(Ascii.asciiDiff(a, b, size)).toEqual(expected);
  });
  it('is exd5', () => {
    const a = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' . ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' p ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' . ', ' R ' ]
    ];
    const b = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' . ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' P ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' . ', ' R ' ]
    ];
    const expected = [
      {
        from: ' p ',
        to: ' P ',
        sq: 'd5'
      },
      {
        from: ' P ',
        to: ' . ',
        sq: 'e4'
      }
    ];
    expect(Ascii.asciiDiff(a, b, size)).toEqual(expected);
  });
});

describe('sqDiff()', () => {
  it('is files: 0, ranks: 0', () => {
    const a = 'a1';
    const b = 'a1';
    const expected = {
      files: 0,
      ranks: 0
    };
    expect(Ascii.sqDiff(a, b)).toEqual(expected);
  });
  it('is files: 0, ranks: 1', () => {
    const a = 'a4';
    const b = 'a3';
    const expected = {
      files: 0,
      ranks: 1
    };
    expect(Ascii.sqDiff(a, b)).toEqual(expected);
  });
  it('is files: 0, ranks: 1', () => {
    const a = 'a4';
    const b = 'a5';
    const expected = {
      files: 0,
      ranks: 1
    };
    expect(Ascii.sqDiff(a, b)).toEqual(expected);
  });
  it('is files: 2, ranks: 2', () => {
    const a = 'c1';
    const b = 'h5';
    const expected = {
      files: 5,
      ranks: 4
    };
    expect(Ascii.sqDiff(a, b)).toEqual(expected);
  });
});

describe('longAlgebraicNotation()', () => {
  const size = {
    files: 8,
    ranks: 8
  };
  it('is e7e5', () => {
    const a = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const b = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const expected = ['e7', 'e5'];
    expect(Ascii.longAlgebraicNotation(a, b, size)).toEqual(expected);
  });
  it('is g1f3', () => {
    const a = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const b = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' . ', ' R ' ]
    ];
    const expected = ['g1', 'f3'];
    expect(Ascii.longAlgebraicNotation(a, b, size)).toEqual(expected);
  });
  it('is d7d5', () => {
    const a = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' . ', ' R ' ]
    ];
    const b = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' . ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' p ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' . ', ' R ' ]
    ];
    const expected = ['d7', 'd5'];
    expect(Ascii.longAlgebraicNotation(a, b, size)).toEqual(expected);
  });
  it('is e4d5', () => {
    const a = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' . ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' p ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' . ', ' R ' ]
    ];
    const b = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' . ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' P ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' . ', ' R ' ]
    ];
    const expected = ['e4', 'd5'];
    expect(Ascii.longAlgebraicNotation(a, b, size)).toEqual(expected);
  });
});
