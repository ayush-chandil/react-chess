import Pgn from './Pgn.js';

export default class Ascii {
  static toFen = (ascii) => {
    let string = '';
    Ascii.promote(ascii).forEach((item, i) => {
      string += item.join('').replace(/\s/g, '');
      if (i !== 7) {
        string += '/';
      }
    });
    let filtered = '';
    let strSplit = string.split('');
    let n = 1;
    strSplit.forEach((item, i) => {
      if (strSplit[i] === '.') {
        if (strSplit[i+1] === '.') {
          n++;
        } else {
          filtered += n;
          n = 1;
        }
      } else {
        filtered += strSplit[i];
        n = 1;
      }
    });

    return filtered;
  }

  static flip = (color, ascii) => {
    if (color == Pgn.symbol.BLACK) {
      const flipped = [];
      for (let i = 0; i < 8; i++) {
        flipped.push(new Array(8));
      }
      ascii.forEach((rank, i) => {
        rank.forEach((file, j) => {
          flipped[7-i][7-j] = ascii[i][j];
        });
      });
      return flipped;
    }

    return ascii;
  }

  static toAscii = (fen) => {
    let arr = fen.split('/').map(rank => {
      let row = [];
      let digits = [...rank.matchAll(/[0-9]+/g)].map(item => [item.index, parseInt(item[0])]);
      let letters = [...rank.matchAll(/[a-zA-Z]{1}/g)].map(item => [item.index, item[0]]);
      [...digits, ...letters]
        .sort((a, b) =>  a[0] - b[0])
        .forEach(item => {
          let elem;
          typeof item[1] === 'number'
            ? elem = Array(item[1]).fill(' . ')
            : elem = [` ${item[1]} `];
          row = [...row, ...elem];
        });
      return row;
    });

    return arr;
  }

  static fromIndexToAlgebraic = (i, j, size) => {
    const file = String.fromCharCode(97 + j);
    const rank = size.ranks - i;

    return file + rank;
  }

  static fromAlgebraicToIndex = (sq, size) => {
    const i = size.ranks - sq.charAt(1);
    const j = sq.charAt(0).charCodeAt(0) - 97;

    return [i, j];
  }

  static promote = (ascii) => {
    ascii[0] = ascii[0].map(item => item === ' P ' ? ' Q ' : item);
    ascii[7] = ascii[7].map(item => item === ' p ' ? ' q ' : item);

    return ascii;
  }

  static asciiDiff = (a, b, size) => {
    let sqs = [];
    a.forEach((rank, i) => {
      rank.forEach((file, j) => {
        if (a[i][j] !== b[i][j]) {
          sqs.push({
            from: a[i][j],
            to: b[i][j],
            sq: Ascii.fromIndexToAlgebraic(i, j, size)
          });
        }
      });
    });

    return sqs;
  }

  static sqDiff = (a, b) => {
    let diff = {
      files: Math.abs(a.charCodeAt(0) - b.charCodeAt(0)),
      ranks: Math.abs(a.charCodeAt(1) - b.charCodeAt(1))
    };

    return diff;
  }

  static xAxisSign = (a, b, color, flip) => {
    const sign =  Math.sign(a.charCodeAt(0) - b.charCodeAt(0));
    if (color === Pgn.symbol.WHITE) {
      if (flip === Pgn.symbol.WHITE) {
        return -sign;
      } else {
        return sign;
      }
    } else {
      if (flip === Pgn.symbol.WHITE) {
        return -sign;
      } else {
        return sign;
      }
    }
  }

  static yAxisSign = (a, b, color, flip) => {
    const sign =  Math.sign(a.charCodeAt(1) - b.charCodeAt(1));
    if (color === Pgn.symbol.WHITE) {
      if (flip === Pgn.symbol.WHITE) {
        return sign;
      } else {
        return -sign;
      }
    } else {
      if (flip === Pgn.symbol.WHITE) {
        return sign;
      } else {
        return -sign;
      }
    }
  }

  static longAlgebraicNotation = (a, b, size) => {
    const diff = Ascii.asciiDiff(a, b, size);
    let sorted = [];
    if (diff[0].to === ' . ') {
      sorted.push(diff[0].sq);
      sorted.push(diff[1].sq);
    } else {
      sorted.push(diff[1].sq);
      sorted.push(diff[0].sq);
    }

    return sorted;
  }
}
