"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @copyright (c) 2017 Miraculous Owonubi
 * @author Miraculous Owonubi
 * @license Apache-2.0
 * @module parse-template
 */
var specTify = function specTify(spec) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'g';
  return new RegExp('[%$:]([+-]?\\d*){0%?}'.replace(0, spec), flags);
};
/**
 * Parse a template, replace parts with specified values
 * @param {String} tmp Template to be parsed
 * @param {*} feats Object containing the object parts with replaceable values
 * @param {string} skip Part of the object to skip when checking
 */


module.exports = function parseTemplate(tmp, feats) {
  var rootSkip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  Object.entries(feats).filter(function (slot) {
    return !(rootSkip.includes(slot[0]) || !tmp.match(specTify(slot[0])));
  }).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        tag = _ref2[0],
        data = _ref2[1];

    var _ = tmp.match(specTify(tag, ''));

    var regex = specTify(tag);
    var result = (data = "".concat(typeof data === 'function' ? data(feats) : data)).match(specTify('.+')) ? parseTemplate(data, feats, (rootSkip.push(tag), rootSkip)) : data;
    tmp = tmp.replace(regex, _ ? result[+_[1] > 0 ? 'padStart' : 'padEnd'](Math.abs(_[1]), /^[+-]?0\d/.test(_[1]) ? 0 : ' ') : result);
  });
  return tmp;
};