require('core-js/es/string/pad-end');
require('core-js/es/string/pad-start');

const specTify = ({tag, flags} = {}) => new RegExp(`[%$:]([+-]?\\d+)?{(${tag || '[^()}%]+?'})(?:\\(([^()}]*?)\\))?%?}`, flags);

/**
 * Parse comma-separated <[key=]value> pairs into a useful object
 * @param {string} value Value (data argument) to be parsed
 * @returns {{args: string[], matched: {[key:string]: string}}}
 */
function parseDataArgument(value) {
  const exceptEscapeFromFilterPart = str => new RegExp(`(?=[^{])${str}(?=[^}])`, 'g');
  return (value
    ? value
        .split(exceptEscapeFromFilterPart(','))
        .map(part =>
          part
            .split(exceptEscapeFromFilterPart('='))
            .map(sect => sect.replace(/^\s*["']?|["']?\s*$/g, '').replace(/{([^\s]+?)}/g, '$1')),
        )
    : []
  ).reduce((all, item) => (item.length === 2 ? ([, all.matched[item[0]]] = item) : all.args.push(...item), all), {
    args: [],
    matched: {},
  });
}

/**
 * Parse a template, replacing variable sections with flexibly defined values
 * @module stringd
 * @param {String} tmp String template template to be parsed
 * @param {*} props Object containing the properties for variables to be replaced with
 * @param {string} ignore Tags within a snippet of a string to be ignored. (used specifically to avoid tag repetition/recursion)
 * @license Apache-2.0
 * @author Miraculous Owonubi
 * @copyright (c) 2020 Miraculous Owonubi
 */

function stringd(temp, props = {}, ignore = []) {
  if (typeof temp !== 'string') throw new TypeError('<temp> must be a valid string');
  if (props && typeof props !== 'object') throw new TypeError('<props>, if defined, must be a valid object');
  if (ignore && !Array.isArray(ignore)) throw new TypeError('<ignore>, if defined, must be a valid array');
  [props, ignore] = [props || {}, ignore || {}];
  const [spec, glob] = [specTify(), specTify({flags: 'g'})];
  const ignoreX = ignore.map(item => specTify({tag: item, flags: 'g'}));
  (matches =>
    matches
      ? matches
          .filter(match => !ignoreX.some(item => item.test(match)))
          .map(match => match.match(spec))
          .filter(([, , tag]) => tag in props)
          .forEach(([match, prefix, tag, data]) => {
            let val = props[tag];
            if (typeof val === 'function')
              val = val(props, ![undefined, null].includes(data) ? parseDataArgument(data) : undefined);
            if (![null, undefined].includes(val))
              temp = temp.replace(
                new RegExp(match.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g'),
                stringd(
                  val.toString()[+prefix > 0 ? 'padStart' : 'padEnd'](Math.abs(prefix), /^[+-]?0\d/.test(prefix) ? 0 : ' '),
                  props,
                  ignore.concat(tag),
                ),
              );
          })
      : null)(temp.match(glob));
  return temp;
}

if (typeof module !== 'undefined') module.exports = stringd;
