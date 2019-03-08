const specTify = (spec, flags = 'g') => new RegExp(`[%$:]([+-]?\\d*){${spec}%?}`, flags);

/**
 * Parse a template, replace parts with specified values
 * @module stringd
 * @param {String} tmp Template to be parsed
 * @param {*} feats Object containing the object parts with replaceable values
 * @param {string} skip Part of the object to skip when checking
 * @license Apache-2.0
 * @author Miraculous Owonubi
 * @copyright (c) 2019 Miraculous Owonubi
 */

function stringd(tmp, feats, rootSkip = []) {
  Object.entries(feats)
    .filter(slot => !(rootSkip.includes(slot[0]) || !tmp.match(specTify(slot[0]))))
    .forEach(([tag, data]) => {
      const _ = tmp.match(specTify(tag, ''));
      const regex = specTify(tag);
      const result = (data = `${typeof data === 'function' ? data(feats) : data}`).match(specTify('.+'))
        ? stringd(data, feats, (rootSkip.push(tag), rootSkip))
        : data;
      tmp = tmp.replace(
        regex,
        _ ? result[+_[1] > 0 ? 'padStart' : 'padEnd'](Math.abs(_[1]), /^[+-]?0\d/.test(_[1]) ? 0 : ' ') : result,
      );
    });
  return tmp;
}

if (typeof module !== 'undefined') module.exports = stringd;
