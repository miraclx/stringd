require('core-js/modules/es7.string.pad-end');
require('core-js/modules/es7.string.pad-start');

const specTify = ({tag, flags} = {}) => new RegExp(`[%$:](?<prefix>[+-]?\\d+)?{(?<tag>${tag || '[^()}%]+?'})(?:\\((?<data>[^()}]+?)\\))?%?}`, flags);

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

function stringd(temp, props = {}, ignore=[]) {
  const [spec, glob] = [specTify(), specTify({flags: 'g'})];
  const _ignore = ignore.map(item => specTify({tag: item, flags: 'g'}));
  (matches => matches ? matches.filter(match => !_ignore.some(item => item.test(match))).forEach(match => {
    temp = temp.replace(new RegExp(match.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g'), (({groups: {tag, prefix, data, val}}) => {
      if (typeof (val = props[tag]) === 'function') val = val(...(data ? [data, props] : [props]))
      return stringd((val = val.toString())[(+prefix > 0) ? 'padStart' : 'padEnd'](Math.abs(prefix), /^[+-]?0\d/.test(prefix) ? 0 : ' '), props, ignore.concat(tag));
    })(match.match(spec)))
  }): null)(temp.match(glob));
  return temp;
}

if (typeof module !== 'undefined') module.exports = stringd;
