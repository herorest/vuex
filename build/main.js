require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_project_vuex_fire_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_project_vuex_fire_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_project_vuex_fire_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_path__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_path__);


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var config = __webpack_require__(7);
config.dev = !(process.env == 'production');

var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;
var MIDDLEWARES = ['router'];
var r = function r(path) {
    return Object(__WEBPACK_IMPORTED_MODULE_4_path__["resolve"])(__dirname, path);
};

var Server = function () {
    function Server() {
        _classCallCheck(this, Server);

        this.app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();
        this.useMiddleWare(this.app)(MIDDLEWARES);
    }

    _createClass(Server, [{
        key: 'useMiddleWare',
        value: function useMiddleWare(app) {
            return __WEBPACK_IMPORTED_MODULE_3_ramda___default.a.map(__WEBPACK_IMPORTED_MODULE_3_ramda___default.a.compose(__WEBPACK_IMPORTED_MODULE_3_ramda___default.a.map(function (i) {
                return i(app);
            }), !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), function (i) {
                return r('./middlewares') + '/' + i;
            }));
        }
    }, {
        key: 'start',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_project_vuex_fire_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2() {
                var _this = this;

                var nuxt;
                return __WEBPACK_IMPORTED_MODULE_0_D_project_vuex_fire_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](config);

                            case 2:
                                nuxt = _context2.sent;

                                if (!config.dev) {
                                    _context2.next = 13;
                                    break;
                                }

                                _context2.prev = 4;
                                _context2.next = 7;
                                return nuxt.build();

                            case 7:
                                _context2.next = 13;
                                break;

                            case 9:
                                _context2.prev = 9;
                                _context2.t0 = _context2['catch'](4);

                                console.error(_context2.t0);
                                process.exit(1);

                            case 13:

                                this.app.use(function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_project_vuex_fire_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
                                        return __WEBPACK_IMPORTED_MODULE_0_D_project_vuex_fire_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        ctx.status = 200; // koa defaults to 404 when it sees that status is unset
                                                        _context.next = 3;
                                                        return nuxt.render(ctx.req, ctx.res);

                                                    case 3:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this);
                                    }));

                                    return function (_x, _x2) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());

                                this.app.listen(port, host);
                                console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

                            case 16:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[4, 9]]);
            }));

            function start() {
                return _ref.apply(this, arguments);
            }

            return start;
        }()
    }]);

    return Server;
}();

var app = new Server();
app.start();
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server"))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 8;

/***/ })
/******/ ]);
//# sourceMappingURL=main.map