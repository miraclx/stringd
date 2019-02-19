/**
 * @copyright (c) 2017 Miraculous Owonubi
 * @author Miraculous Owonubi
 * @license Apache-2.0
 * @module parse-template
 */

/**
 * Parse a template, replace parts with specified values
 * @param {String} tmp Template to be parsed
 * @param {*} feats Object containing the object parts with replaceable values
 * @param {string} skip Part of the object to skip when checking
 */

export default function parseTemplate(tmp, feats, rootSkip = []) {
  for (let [tag, data] of Object.entries(feats).filter(slot => !(rootSkip.includes(slot[0]) || !tmp.match(specTify(slot[0]))))) {
    let _ = tmp.match(specTify(tag, '')),
      regex = specTify(tag),
      result = (data = `${typeof data == 'function' ? data(feats) : data}`).match(specTify('.+'))
        ? parseTemplate(data, feats, (rootSkip.push(tag), rootSkip))
        : data;
    tmp = tmp.replace(
      regex,
      _ ? result[+_[1] > 0 ? 'padStart' : 'padEnd'](Math.abs(_[1]), /^[+-]?0\d/.test(_[1]) ? 0 : ' ') : result
    );
  }
  return tmp;
}

export const specTify = (spec, flags = 'g') => new RegExp('[%$:]([+-]?\\d*){0%?}'.replace(0, spec), flags);
