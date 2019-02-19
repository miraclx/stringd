"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseTemplate;
exports.specTify = void 0;

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

/**
 * Parse a template, replace parts with specified values
 * @param {String} tmp Template to be parsed
 * @param {*} feats Object containing the object parts with replaceable values
 * @param {string} skip Part of the object to skip when checking
 */
function parseTemplate(tmp, feats) {
  var rootSkip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(feats).filter(function (slot) {
      return !(rootSkip.includes(slot[0]) || !tmp.match(specTify(slot[0])));
    })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          tag = _step$value[0],
          data = _step$value[1];

      var _ = tmp.match(specTify(tag, '')),
          regex = specTify(tag),
          result = (data = "".concat(typeof data == 'function' ? data(feats) : data)).match(specTify('.+')) ? parseTemplate(data, feats, (rootSkip.push(tag), rootSkip)) : data;

      tmp = tmp.replace(regex, _ ? result[+_[1] > 0 ? 'padStart' : 'padEnd'](Math.abs(_[1]), /^[+-]?0\d/.test(_[1]) ? 0 : ' ') : result);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return tmp;
}

var specTify = function specTify(spec) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'g';
  return new RegExp('[%$:]([+-]?\\d*){0%?}'.replace(0, spec), flags);
};

exports.specTify = specTify;