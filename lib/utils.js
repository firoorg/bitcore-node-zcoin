'use strict';

const Decimal = require('decimal.js');
var MAX_SAFE_INTEGER = 0x1fffffffffffff; // 2 ^ 53 - 1

var utils = {};
utils.isHash = function isHash(value) {
    return typeof value === 'string' && value.length === 64 && /^[0-9a-fA-F]+$/.test(value);
};

utils.isSafeNatural = function isSafeNatural(value) {
    return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value &&
        value >= 0 &&
        value <= MAX_SAFE_INTEGER;
};

utils.startAtZero = function startAtZero(obj, key) {
    if (!obj.hasOwnProperty(key)) {
        obj[key] = 0;
    }
};

utils.isAbsolutePath = require('path').isAbsolute;
if (!utils.isAbsolutePath) {
    utils.isAbsolutePath = require('path-is-absolute');
}

utils.parseParamsWithJSON = function parseParamsWithJSON(paramsArg) {
    var params = paramsArg.map(function (paramArg) {
        var param;
        try {
            param = JSON.parse(paramArg);
        } catch (err) {
            param = paramArg;
        }
        return param;
    });
    return params;
};

utils.safeMul = function safeMul(x,y){
    if(Number.isNaN(x) || Number.isNaN(y)){
    	throw new Error("require number");
    }
    var r = new Decimal(x);
    r = r.mul(y);
    return Number(r.toString());
};

module.exports = utils;
