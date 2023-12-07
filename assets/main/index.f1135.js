window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AssetLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd285a4GGZOmKCJAp9Nfndj", "AssetLoader");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.FolderLoader = exports.BundleLoader = exports.SingleLoader = exports.AssetLoader = void 0;
    var AssetLoader = function() {
      function AssetLoader() {}
      AssetLoader.parse = function(url) {
        var slices = url.split("/?");
        if (slices.length > 1) {
          var pair = slices[1].split("=");
          return {
            path: slices[0],
            bundle: pair[1]
          };
        }
        return {
          path: slices[0]
        };
      };
      AssetLoader.combine = function(path, bundle) {
        return path + (bundle ? "/?bundle=" + bundle : "");
      };
      return AssetLoader;
    }();
    exports.AssetLoader = AssetLoader;
    var SingleLoader = function(_super) {
      __extends(SingleLoader, _super);
      function SingleLoader() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      SingleLoader.prototype.execute = function(url, type) {
        return new Promise(function(resolve, reject) {
          var _a = AssetLoader.parse(url), path = _a.path, bundle = _a.bundle;
          var loader = bundle ? cc.assetManager.getBundle(bundle) : cc.resources;
          loader.load(path, type, function(err, asset) {
            return err ? reject(err) : resolve(asset);
          });
        });
      };
      return SingleLoader;
    }(AssetLoader);
    exports.SingleLoader = SingleLoader;
    var BundleLoader = function(_super) {
      __extends(BundleLoader, _super);
      function BundleLoader() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BundleLoader.prototype.execute = function(bundle) {
        return new Promise(function(resolve, reject) {
          cc.assetManager.loadBundle(bundle, function(err, asset) {
            return err ? reject(err) : resolve(asset);
          });
        });
      };
      return BundleLoader;
    }(AssetLoader);
    exports.BundleLoader = BundleLoader;
    var FolderLoader = function(_super) {
      __extends(FolderLoader, _super);
      function FolderLoader() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      FolderLoader.prototype.execute = function(url, type) {
        return new Promise(function(resolve, reject) {
          var _a = AssetLoader.parse(url), path = _a.path, bundle = _a.bundle;
          var loader = bundle ? cc.assetManager.getBundle(bundle) : cc.resources;
          loader.loadDir(path, type, function(err, assets) {
            err && reject(err);
            var info = loader.getDirWithPath(path, type);
            var res = [];
            assets.forEach(function(asset, idx) {
              res.push({
                url: AssetLoader.combine(info[idx].path, bundle),
                asset: asset
              });
            });
            resolve(res);
          });
        });
      };
      return FolderLoader;
    }(AssetLoader);
    exports.FolderLoader = FolderLoader;
    cc._RF.pop();
  }, {} ],
  AssetMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4fba7nXle5NQbOyTjNwXFtj", "AssetMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AssetMgr = void 0;
    var Singleton_1 = require("../util/Singleton");
    var AssetLoader_1 = require("./AssetLoader");
    var AssetMgr = function(_super) {
      __extends(AssetMgr, _super);
      function AssetMgr() {
        var _this = _super.call(this) || this;
        _this._bundles = new Map();
        _this._assets = new Map();
        _this._loaders = {};
        _this._loaders.single = new AssetLoader_1.SingleLoader();
        _this._loaders.bundle = new AssetLoader_1.BundleLoader();
        _this._loaders.folder = new AssetLoader_1.FolderLoader();
        return _this;
      }
      Object.defineProperty(AssetMgr.prototype, "_now", {
        get: function() {
          return Date.now() / 1e3;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(AssetMgr.prototype, "_dateline", {
        get: function() {
          return this._now + AssetMgr.IDLE;
        },
        enumerable: false,
        configurable: true
      });
      AssetMgr.prototype.onDestroy = function() {
        this._loaders.single = null;
        this._loaders.bundle = null;
        this._loaders.folder = null;
        this._assets.forEach(function(data) {
          return data.asset.decRef();
        });
        this._assets.clear();
        this._bundles.forEach(function(bundle) {
          bundle.releaseAll();
          cc.assetManager.removeBundle(bundle);
        });
        this._bundles.clear();
      };
      AssetMgr.prototype.get = function(url) {
        var data = this._assets.get(url);
        if (data) {
          data.time = this._dateline;
          return data.asset;
        }
        return null;
      };
      AssetMgr.prototype.add = function(url, asset, reserve) {
        if (asset && false == this._assets.has(url)) {
          this._assets.set(url, {
            asset: asset,
            time: this._dateline,
            reserve: reserve
          });
          asset.addRef();
          return true;
        }
        return false;
      };
      AssetMgr.prototype.clear = function() {
        var _this = this;
        var wait = [];
        this._assets.forEach(function(data, url) {
          if (data.time < _this._now && false == data.reserve) {
            wait.push(url);
            data.asset.decRef();
          }
        }, this);
        wait.forEach(function(url) {
          return _this._assets.delete(url);
        }, this);
      };
      AssetMgr.prototype.loadAsset = function(url, type, reserve) {
        return __awaiter(this, void 0, Promise, function() {
          var _a, _b;
          return __generator(this, function(_c) {
            switch (_c.label) {
             case 0:
              if (!(false == this._assets.has(url))) return [ 3, 3 ];
              return [ 4, this.loadBundle(url) ];

             case 1:
              _c.sent();
              _a = this.add;
              _b = [ url ];
              return [ 4, this._loaders.single.execute(url, type) ];

             case 2:
              _a.apply(this, _b.concat([ _c.sent(), reserve ]));
              _c.label = 3;

             case 3:
              return [ 2, this.get(url) ];
            }
          });
        });
      };
      AssetMgr.prototype.loadFolder = function(url, type, reserve) {
        return __awaiter(this, void 0, Promise, function() {
          var list;
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.loadBundle(url) ];

             case 1:
              _a.sent();
              return [ 4, this._loaders.folder.execute(url, type) ];

             case 2:
              list = _a.sent();
              list.forEach(function(src) {
                return _this.add(src.url, src.asset, reserve);
              }, this);
              return [ 2 ];
            }
          });
        });
      };
      AssetMgr.prototype.loadBundle = function(url) {
        return __awaiter(this, void 0, Promise, function() {
          var _a, path, bundle, _b, _c, _d;
          return __generator(this, function(_e) {
            switch (_e.label) {
             case 0:
              if (!(false == this._bundles.has(url))) return [ 3, 2 ];
              _a = AssetLoader_1.AssetLoader.parse(url), path = _a.path, bundle = _a.bundle;
              if (!bundle) return [ 3, 2 ];
              _c = (_b = this._bundles).set;
              _d = [ url ];
              return [ 4, this._loaders.bundle.execute(bundle) ];

             case 1:
              _c.apply(_b, _d.concat([ _e.sent() ]));
              _e.label = 2;

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      AssetMgr.IDLE = 300;
      return AssetMgr;
    }(Singleton_1.Singleton);
    exports.AssetMgr = AssetMgr;
    cc._RF.pop();
  }, {
    "../util/Singleton": "Singleton",
    "./AssetLoader": "AssetLoader"
  } ],
  AudioCfg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "badfe6dZDFF2ICvAarYFyR4", "AudioCfg");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AudioSrc = void 0;
    var AudioSrc;
    (function(AudioSrc) {
      AudioSrc["LoopBgm"] = "audio/bgm";
    })(AudioSrc = exports.AudioSrc || (exports.AudioSrc = {}));
    cc._RF.pop();
  }, {} ],
  BgmAudio: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1216262TqFKgpl95ndvMrre", "BgmAudio");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BgmAudio = void 0;
    var AssetMgr_1 = require("../asset/AssetMgr");
    var Singleton_1 = require("../util/Singleton");
    var BgmAudio = function(_super) {
      __extends(BgmAudio, _super);
      function BgmAudio() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(BgmAudio.prototype, "vol", {
        get: function() {
          return cc.audioEngine.getMusicVolume();
        },
        set: function(value) {
          cc.audioEngine.setMusicVolume(value.limit(0, 1));
        },
        enumerable: false,
        configurable: true
      });
      BgmAudio.prototype.onDestroy = function() {};
      BgmAudio.prototype.play = function(audio) {
        return __awaiter(this, void 0, Promise, function() {
          var src, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              if (!(audio instanceof cc.AudioClip)) return [ 3, 1 ];
              _a = audio;
              return [ 3, 3 ];

             case 1:
              return [ 4, AssetMgr_1.AssetMgr.inst().loadAsset(audio, cc.AudioClip, true) ];

             case 2:
              _a = _b.sent();
              _b.label = 3;

             case 3:
              src = _a;
              cc.audioEngine.playMusic(src, true);
              return [ 2 ];
            }
          });
        });
      };
      BgmAudio.prototype.stop = function() {
        cc.audioEngine.stopMusic();
      };
      BgmAudio.prototype.pause = function() {
        cc.audioEngine.pauseMusic();
      };
      BgmAudio.prototype.resume = function() {
        cc.audioEngine.resumeMusic();
      };
      return BgmAudio;
    }(Singleton_1.Singleton);
    exports.BgmAudio = BgmAudio;
    cc._RF.pop();
  }, {
    "../asset/AssetMgr": "AssetMgr",
    "../util/Singleton": "Singleton"
  } ],
  CanvasAdapt: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cb5d3whOKVI7ZZ/1cfcoY08", "CanvasAdapt");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CanvasAdapt = void 0;
    var EventCfg_1 = require("../../../cfg/EventCfg");
    var EventMgr_1 = require("../../event/EventMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
    var CanvasAdapt = function(_super) {
      __extends(CanvasAdapt, _super);
      function CanvasAdapt() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      CanvasAdapt.prototype.onLoad = function() {
        var canvas = cc.Canvas.instance;
        canvas.fitWidth = true;
        canvas.fitHeight = true;
        cc.view.setResizeCallback(function() {
          return EventMgr_1.EventMgr.inst().emit(EventCfg_1.EventSrc.Resize);
        });
      };
      CanvasAdapt = __decorate([ ccclass, menu("adapt/canvas") ], CanvasAdapt);
      return CanvasAdapt;
    }(cc.Component);
    exports.CanvasAdapt = CanvasAdapt;
    cc._RF.pop();
  }, {
    "../../../cfg/EventCfg": "EventCfg",
    "../../event/EventMgr": "EventMgr"
  } ],
  CmptPool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd63c7goOpK2ryyK/xLudPO", "CmptPool");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CmptPool = void 0;
    var ObjPool_1 = require("./ObjPool");
    var CmptPool = function(_super) {
      __extends(CmptPool, _super);
      function CmptPool() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      CmptPool.prototype.fetch = function(key) {
        var value = _super.prototype.fetch.call(this, key);
        var cmpt = null === value || void 0 === value ? void 0 : value.getComponent(key);
        cmpt && cmpt.reuse && cmpt.reuse();
        return value;
      };
      CmptPool.prototype.recycle = function(key, value) {
        var cmpt = value.getComponent(key);
        cmpt && cmpt.unuse && cmpt.unuse();
        return _super.prototype.recycle.call(this, key, value);
      };
      return CmptPool;
    }(ObjPool_1.ObjPool);
    exports.CmptPool = CmptPool;
    cc._RF.pop();
  }, {
    "./ObjPool": "ObjPool"
  } ],
  ComboWork: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "804bateyO1LrqFXpPr5R+zd", "ComboWork");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ComboWork = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var ComboWork = function(_super) {
      __extends(ComboWork, _super);
      function ComboWork() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ComboWork.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var len, i, pos;
          return __generator(this, function(_a) {
            len = param.changes.length;
            for (i = 0; i < len; i++) {
              pos = param.changes[i];
              if (param.model.isCrush(pos)) {
                cc.log("\u9023\u9396", pos);
                param.finished = false;
                param.load[param.load.length - 1].slack = 50;
                return [ 2, true ];
              }
            }
            param.finished = true;
            return [ 2, true ];
          });
        });
      };
      return ComboWork;
    }(WorkChain_1.WorkChain);
    exports.ComboWork = ComboWork;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain"
  } ],
  CrushWork: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fc94ea0dElKkb9rIcuObbWJ", "CrushWork");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CrushWork = void 0;
    var GridDefine_1 = require("../../../define/GridDefine");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileCrush_1 = require("../../act/TileCrush");
    var TileTrans_1 = require("../../act/TileTrans");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var CrushWork = function(_super) {
      __extends(CrushWork, _super);
      function CrushWork() {
        var _this = _super.call(this) || this;
        _this._process = null;
        _this._process = new CrushH();
        _this._process.push(new CrushV());
        _this._process.push(new CrushO());
        _this._process.push(new CrushT());
        _this._process.push(new CrushL());
        return _this;
      }
      CrushWork.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var cmd;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              cmd = new GridCmd_1.GridCmd();
              param.atkers = [];
              return [ 4, this._process.execute(param) ];

             case 1:
              _a.sent();
              GridDefine_1.FOR_COL_ROW(function(pos) {
                var tile = param.model.getTile(pos);
                if (tile) {
                  if (tile.trans != TileDefine_1.TileType.None) {
                    cmd.add(tile, new TileTrans_1.TileTrans(tile.trans));
                    tile.type = tile.trans;
                    tile.trans = TileDefine_1.TileType.None;
                    tile.crushed = false;
                    param.atkers.push(tile);
                  }
                  if (tile.crushed) {
                    cmd.add(tile, new TileCrush_1.TileCrush());
                    param.model.setTile(pos, null);
                    param.atkers.push(tile);
                  }
                }
              });
              param.load.push(cmd);
              param.changes = [];
              return [ 2, true ];
            }
          });
        });
      };
      return CrushWork;
    }(WorkChain_1.WorkChain);
    exports.CrushWork = CrushWork;
    var CrushV = function(_super) {
      __extends(CrushV, _super);
      function CrushV() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      CrushV.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            param.changes.forEach(function(elm) {
              var places = param.model.getCrushesV(elm);
              var len = places.length;
              if (len >= 3) {
                var log_1 = [];
                var type_1 = TileDefine_1.TileType.None;
                places.forEach(function(pos, idx) {
                  var tile = param.model.getTile(pos);
                  len >= 4 && 0 == idx ? tile.trans = TileDefine_1.TileType.Cross : tile.crushed = true;
                  log_1.push(tile.id);
                  type_1 = tile.type;
                });
                len >= 4 && cc.log("\u8b8a\u5316V", log_1[0], places[0]);
                cc.log("\u6d88\u9664V", type_1, log_1, places);
              }
            });
            return [ 2, true ];
          });
        });
      };
      return CrushV;
    }(WorkChain_1.WorkChain);
    var CrushH = function(_super) {
      __extends(CrushH, _super);
      function CrushH() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      CrushH.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            param.changes.forEach(function(elm) {
              var places = param.model.getCrushesH(elm);
              var len = places.length;
              if (len >= 3) {
                var log_2 = [];
                var type_2 = TileDefine_1.TileType.None;
                places.forEach(function(pos, idx) {
                  var tile = param.model.getTile(pos);
                  len >= 4 && 0 == idx ? tile.trans = TileDefine_1.TileType.Cross : tile.crushed = true;
                  log_2.push(tile.id);
                  type_2 = tile.type;
                });
                len >= 4 && cc.log("\u8b8a\u5316H", log_2[0], places[0]);
                cc.log("\u6d88\u9664H", type_2, log_2, places);
              }
            });
            return [ 2, true ];
          });
        });
      };
      return CrushH;
    }(WorkChain_1.WorkChain);
    var CrushO = function(_super) {
      __extends(CrushO, _super);
      function CrushO() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      CrushO.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            param.changes.forEach(function(elm) {
              var places = param.model.getCrushesO(elm);
              var len = places.length;
              if (len >= 4) {
                var log_3 = [];
                var type_3 = TileDefine_1.TileType.None;
                places.forEach(function(pos, idx) {
                  var tile = param.model.getTile(pos);
                  0 == idx ? tile.trans = TileDefine_1.TileType.Thunder : tile.crushed = true;
                  log_3.push(tile.id);
                  type_3 = tile.type;
                });
                cc.log("\u8b8a\u5316O", log_3[0], places[0]);
                cc.log("\u6d88\u9664O", type_3, log_3, places);
              }
            });
            return [ 2, true ];
          });
        });
      };
      return CrushO;
    }(WorkChain_1.WorkChain);
    var CrushT = function(_super) {
      __extends(CrushT, _super);
      function CrushT() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      CrushT.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            param.changes.forEach(function(elm) {
              var places = param.model.getCrushesT(elm);
              var len = places.length;
              if (len >= 5) {
                var log_4 = [];
                var type_4 = TileDefine_1.TileType.None;
                places.forEach(function(pos, idx) {
                  var tile = param.model.getTile(pos);
                  0 == idx ? tile.trans = TileDefine_1.TileType.Cyclone : tile.crushed = true;
                  log_4.push(tile.id);
                  type_4 = tile.type;
                });
                cc.log("\u8b8a\u5316T", log_4[0], places[0]);
                cc.log("\u6d88\u9664T", type_4, log_4, places);
              }
            });
            return [ 2, true ];
          });
        });
      };
      return CrushT;
    }(WorkChain_1.WorkChain);
    var CrushL = function(_super) {
      __extends(CrushL, _super);
      function CrushL() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      CrushL.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            param.changes.forEach(function(elm) {
              var places = param.model.getCrushesL(elm);
              var len = places.length;
              if (len >= 5) {
                var log_5 = [];
                places.forEach(function(pos, idx) {
                  var tile = param.model.getTile(pos);
                  0 == idx ? tile.trans = TileDefine_1.TileType.Cyclone : tile.crushed = true;
                  log_5.push(tile.id);
                });
                cc.log("\u8b8a\u5316L", log_5[0], places[0]);
                cc.log("\u6d88\u9664L", log_5, places);
              }
            });
            return [ 2, true ];
          });
        });
      };
      return CrushL;
    }(WorkChain_1.WorkChain);
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/GridDefine": "GridDefine",
    "../../../define/TileDefine": "TileDefine",
    "../../act/TileCrush": "TileCrush",
    "../../act/TileTrans": "TileTrans",
    "../../mvc/GridCmd": "GridCmd"
  } ],
  DataDriven: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "790e0gEIT1L3IzBCAIw1eXx", "DataDriven");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DataDriven = void 0;
    function decorator() {
      return function(target, name) {
        delete target[name];
        var field = "_" + name;
        Object.defineProperty(target, field, {
          writable: true,
          enumerable: true,
          configurable: true
        });
        var getter = function() {
          return this[field];
        };
        var setter = function(value) {
          var func = this.emit;
          func && func.call(this, value, this[field]);
          this[field] = value;
        };
        Object.defineProperty(target, name, {
          get: getter,
          set: setter,
          enumerable: true,
          configurable: true
        });
      };
    }
    var DataDriven = function() {
      function DataDriven(value, skip) {
        this.value = null;
        this._events = [];
        this._skip = null;
        this.value = value;
        this._skip = skip;
      }
      DataDriven.prototype.emit = function(next, last) {
        var _a;
        (null == this._skip || this._skip(next, last)) && (null === (_a = this._events) || void 0 === _a ? void 0 : _a.forEach(function(event) {
          return event(next, last);
        }));
      };
      DataDriven.prototype.clear = function() {
        this._events = [];
      };
      DataDriven.prototype.on = function(event) {
        this._events.push(event);
      };
      DataDriven.prototype.off = function(event) {
        var idx = this._events.findIndex(function(src) {
          return src == event;
        });
        -1 != idx && this._events.splice(idx, 1);
      };
      __decorate([ decorator() ], DataDriven.prototype, "value", void 0);
      return DataDriven;
    }();
    exports.DataDriven = DataDriven;
    cc._RF.pop();
  }, {} ],
  DebugPnl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "40308wxg7BAT6wqHx20lUhr", "DebugPnl");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DebugPnl = void 0;
    var EventCfg_1 = require("../cfg/EventCfg");
    var EventMgr_1 = require("../comm/event/EventMgr");
    var GameDefine_1 = require("../define/GameDefine");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DebugPnl = function(_super) {
      __extends(DebugPnl, _super);
      function DebugPnl() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.edit1 = null;
        _this.edit2 = null;
        _this.edit3 = null;
        return _this;
      }
      DebugPnl.prototype.onBtn1Click = function(event, data) {
        var x = Number(this.edit1.string);
        var y = Number(this.edit2.string);
        var type = Number(this.edit3.string);
        EventMgr_1.EventMgr.inst().emit(EventCfg_1.EventSrc.DebugType, {
          x: x,
          y: y
        }, type);
      };
      DebugPnl.prototype.onBtn2Click = function(event, data) {
        EventMgr_1.EventMgr.inst().emit(EventCfg_1.EventSrc.Charge, GameDefine_1.MAX_ENERGY);
      };
      __decorate([ property(cc.EditBox) ], DebugPnl.prototype, "edit1", void 0);
      __decorate([ property(cc.EditBox) ], DebugPnl.prototype, "edit2", void 0);
      __decorate([ property(cc.EditBox) ], DebugPnl.prototype, "edit3", void 0);
      DebugPnl = __decorate([ ccclass ], DebugPnl);
      return DebugPnl;
    }(cc.Component);
    exports.DebugPnl = DebugPnl;
    cc._RF.pop();
  }, {
    "../cfg/EventCfg": "EventCfg",
    "../comm/event/EventMgr": "EventMgr",
    "../define/GameDefine": "GameDefine"
  } ],
  DebugTool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6d926O2PtVHNqZ+BLqFLm+J", "DebugTool");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DebugTool = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DebugTool = function(_super) {
      __extends(DebugTool, _super);
      function DebugTool() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pnl = null;
        return _this;
      }
      DebugTool.prototype.onLoad = function() {
        this.node.active = true;
        this.pnl.active = false;
      };
      DebugTool.prototype.onClick = function(event, data) {
        this.pnl.active = !this.pnl.active;
      };
      __decorate([ property(cc.Node) ], DebugTool.prototype, "pnl", void 0);
      DebugTool = __decorate([ ccclass ], DebugTool);
      return DebugTool;
    }(cc.Component);
    exports.DebugTool = DebugTool;
    cc._RF.pop();
  }, {} ],
  DesktopAdapt: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9141fEPpWlB9oUAF5oD4qNc", "DesktopAdapt");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DesktopAdapt = void 0;
    var EventCfg_1 = require("../../../cfg/EventCfg");
    var EventDecor_1 = require("../../event/EventDecor");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
    var DesktopAdapt = function(_super) {
      __extends(DesktopAdapt, _super);
      function DesktopAdapt() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DesktopAdapt.prototype.onLoad = function() {
        this.adjust();
      };
      DesktopAdapt.prototype.adjust = function() {
        var oldW = this.node.width;
        var oldH = this.node.height;
        var size = cc.view.getCanvasSize();
        var scale = Math.min(size.width / oldW, size.height / oldH);
        var newW = oldW * scale;
        var newH = oldH * scale;
        this.node.scale = Math.max(size.width / newW, size.height / newH);
      };
      __decorate([ EventDecor_1.onEvent(EventCfg_1.EventSrc.Resize) ], DesktopAdapt.prototype, "adjust", null);
      DesktopAdapt = __decorate([ ccclass, menu("adapt/desktop"), EventDecor_1.onEnable() ], DesktopAdapt);
      return DesktopAdapt;
    }(cc.Component);
    exports.DesktopAdapt = DesktopAdapt;
    cc._RF.pop();
  }, {
    "../../../cfg/EventCfg": "EventCfg",
    "../../event/EventDecor": "EventDecor"
  } ],
  DropWork: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5f5b8WOGHhLNo9l/iQYmeaf", "DropWork");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DropWork = void 0;
    var GridDefine_1 = require("../../../define/GridDefine");
    var TileFall_1 = require("../../act/TileFall");
    var TileWait_1 = require("../../act/TileWait");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var DropWork = function(_super) {
      __extends(DropWork, _super);
      function DropWork() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DropWork.prototype.business = function(param, col) {
        return __awaiter(this, void 0, Promise, function() {
          var cmd;
          return __generator(this, function(_a) {
            cmd = new GridCmd_1.GridCmd();
            GridDefine_1.FOR_ROW_COL(function(end) {
              if (col && col != end.x) return;
              if (param.model.getTile(end)) return;
              for (var i = end.y; i < GridDefine_1.GRID_ROW; i++) {
                var begin = {
                  x: end.x,
                  y: i
                };
                var tile = param.model.getTile(begin);
                if (tile) {
                  if (tile.hold) return;
                  cc.log("\u6389\u843d", tile.id, tile.type, end);
                  param.model.setTile(end, tile);
                  param.model.setTile(begin, null);
                  cmd.add(tile, new TileWait_1.TileWait(.1));
                  cmd.add(tile, new TileFall_1.TileFall(end));
                  param.changes.push(end);
                  param.load.push(cmd);
                  return;
                }
              }
            });
            return [ 2, true ];
          });
        });
      };
      return DropWork;
    }(WorkChain_1.WorkChain);
    exports.DropWork = DropWork;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/GridDefine": "GridDefine",
    "../../act/TileFall": "TileFall",
    "../../act/TileWait": "TileWait",
    "../../mvc/GridCmd": "GridCmd"
  } ],
  EnemyAtk: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "adf0a2MXydHjanbkZkB8YBP", "EnemyAtk");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EnemyAtk = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var GridDefine_1 = require("../../../define/GridDefine");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileDie_1 = require("../../act/TileDie");
    var TileHit_1 = require("../../act/TileHit");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var EnemyAtk = function(_super) {
      __extends(EnemyAtk, _super);
      function EnemyAtk() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._param = null;
        _this._cmd = null;
        return _this;
      }
      EnemyAtk.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var _this = this;
          return __generator(this, function(_a) {
            this._param = param;
            this._cmd = new GridCmd_1.GridCmd();
            param.atkers.forEach(function(atker) {
              return Object.values(GridDefine_1.FOUR_DIR).forEach(function(dir) {
                return _this.attack(atker, dir);
              });
            });
            this._cmd.deed.size > 0 && param.load.push(this._cmd);
            return [ 2, true ];
          });
        });
      };
      EnemyAtk.prototype.attack = function(atker, offset) {
        var x = atker.pos.x + offset.x;
        var y = atker.pos.y + offset.y;
        var defer = this._param.model.getTile({
          x: x,
          y: y
        });
        if (defer && defer.group == TileDefine_1.TileGroup.Player) {
          var damage = atker.atk - defer.def;
          damage = damage.limit(1, atker.atk);
          defer.decHp(damage);
          this._cmd.add(defer, new TileHit_1.TileHit(damage));
          cc.log(atker.id + "\u666e\u653b" + defer.id + ", \u50b7\u5bb3" + damage + ", \u5269\u8840" + defer.currHp, atker.pos, atker.type, defer.pos, defer.type);
          this.dead(defer);
        }
      };
      EnemyAtk.prototype.dead = function(defer) {
        if (defer.currHp <= 0) {
          this._cmd.add(defer, new TileDie_1.TileDie());
          this._param.model.setTile(defer.pos, null);
          cc.log(defer.id + "\u6b7b\u4ea1", defer.pos);
        }
      };
      return EnemyAtk;
    }(WorkChain_1.WorkChain);
    exports.EnemyAtk = EnemyAtk;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/GridDefine": "GridDefine",
    "../../../define/TileDefine": "TileDefine",
    "../../act/TileDie": "TileDie",
    "../../act/TileHit": "TileHit",
    "../../mvc/GridCmd": "GridCmd"
  } ],
  EnemyPort: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "245a2pek5xIcrykOKM+KgBC", "EnemyPort");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EnemyPort = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var TileDefine_1 = require("../../../define/TileDefine");
    var EnemyAtk_1 = require("../battle/EnemyAtk");
    var EnemyWalk_1 = require("../battle/EnemyWalk");
    var EnemyPort = function(_super) {
      __extends(EnemyPort, _super);
      function EnemyPort() {
        var _this = _super.call(this) || this;
        _this._process = null;
        _this._process = new EnemyWalk_1.EnemyWalk();
        _this._process.push(new EnemyAtk_1.EnemyAtk());
        return _this;
      }
      EnemyPort.prototype.clear = function(param) {
        param.changes = [];
        param.finished = false;
        param.atkers = [];
      };
      EnemyPort.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.clear(param);
              param.model.enemies.forEach(function(elm) {
                elm && elm.group == TileDefine_1.TileGroup.Enemy && elm.cd <= 0 && param.atkers.push(elm);
              });
              if (!(param.atkers.length > 0)) return [ 3, 2 ];
              return [ 4, this._process.execute(param) ];

             case 1:
              _a.sent();
              param.atkers.forEach(function(tile) {
                tile.cooldown();
                cc.log("\u51b7\u537b", tile.id, tile.cd);
              });
              _a.label = 2;

             case 2:
              return [ 2, true ];
            }
          });
        });
      };
      return EnemyPort;
    }(WorkChain_1.WorkChain);
    exports.EnemyPort = EnemyPort;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/TileDefine": "TileDefine",
    "../battle/EnemyAtk": "EnemyAtk",
    "../battle/EnemyWalk": "EnemyWalk"
  } ],
  EnemyWalk: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "18b3ahGlblGh5Evcwr6LMVf", "EnemyWalk");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EnemyWalk = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var GridDefine_1 = require("../../../define/GridDefine");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileSwap_1 = require("../../act/TileSwap");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var EnemyWalk = function(_super) {
      __extends(EnemyWalk, _super);
      function EnemyWalk() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._param = null;
        _this._cmd = null;
        _this._last = null;
        return _this;
      }
      EnemyWalk.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var _this = this;
          return __generator(this, function(_a) {
            this._param = param;
            param.atkers.forEach(function(atker) {
              return _this.walk(atker);
            });
            return [ 2, true ];
          });
        });
      };
      EnemyWalk.prototype.walk = function(tile) {
        this._last = tile.pos;
        this._cmd = new GridCmd_1.GridCmd();
        for (var i = 0; i < tile.dex; i++) {
          if (this.contacted(tile.pos)) break;
          this.step(tile);
        }
      };
      EnemyWalk.prototype.contacted = function(center) {
        var ay = Object.values(GridDefine_1.FOUR_DIR);
        var len = ay.length;
        for (var i = 0; i < len; i++) {
          var pos = {
            x: center.x + ay[i].x,
            y: center.y + ay[i].y
          };
          var tile = this._param.model.getTile(pos);
          if (tile && tile.group == TileDefine_1.TileGroup.Player) return true;
        }
        return false;
      };
      EnemyWalk.prototype.cost = function(from, to) {
        var tile = this._param.model.getTile(from);
        if (tile && tile.group == TileDefine_1.TileGroup.Norm) return Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
        return Number.MAX_SAFE_INTEGER;
      };
      EnemyWalk.prototype.step = function(tile) {
        var ay = Object.values(GridDefine_1.FOUR_DIR);
        var len = ay.length;
        var to = tile.pos;
        var min = Number.MAX_SAFE_INTEGER;
        for (var i = 0; i < len; i++) {
          var temp = {
            x: tile.pos.x + ay[i].x,
            y: tile.pos.y + ay[i].y
          };
          if (this._last && GridDefine_1.SAME_POS(this._last, temp)) continue;
          var cost = this.cost(temp, this._param.model.player.pos);
          if (min > cost) {
            min = cost;
            to = temp;
          }
        }
        if (false == GridDefine_1.SAME_POS(tile.pos, to)) {
          this._last = tile.pos;
          this.swap(tile.pos, to);
        }
      };
      EnemyWalk.prototype.swap = function(from, to) {
        var fromTile = this._param.model.getTile(from);
        var toTile = this._param.model.getTile(to);
        cc.log("\u884c\u8d70", fromTile.id, from, to);
        this._cmd.add(fromTile, new TileSwap_1.TileSwap(to));
        this._cmd.add(toTile, new TileSwap_1.TileSwap(from));
        this._cmd.pass(.5);
        this._param.load.push(this._cmd);
        this._param.model.setTile(from, toTile);
        this._param.model.setTile(to, fromTile);
      };
      return EnemyWalk;
    }(WorkChain_1.WorkChain);
    exports.EnemyWalk = EnemyWalk;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/GridDefine": "GridDefine",
    "../../../define/TileDefine": "TileDefine",
    "../../act/TileSwap": "TileSwap",
    "../../mvc/GridCmd": "GridCmd"
  } ],
  EventCfg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ce7f10yKOJGHbNbTO9/8szi", "EventCfg");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EventSrc = void 0;
    var EventSrc;
    (function(EventSrc) {
      EventSrc[EventSrc["Resize"] = 0] = "Resize";
      EventSrc[EventSrc["Focus"] = 1] = "Focus";
      EventSrc[EventSrc["Blur"] = 2] = "Blur";
      EventSrc[EventSrc["Scale"] = 3] = "Scale";
      EventSrc[EventSrc["DebugType"] = 4] = "DebugType";
      EventSrc[EventSrc["Charge"] = 5] = "Charge";
      EventSrc[EventSrc["Ultimate"] = 6] = "Ultimate";
    })(EventSrc = exports.EventSrc || (exports.EventSrc = {}));
    cc._RF.pop();
  }, {} ],
  EventDecor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bfa7dJbbTROeqnRcFz816Ns", "EventDecor");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.onEvent = exports.onEnable = exports.onLoad = void 0;
    var EventMgr_1 = require("./EventMgr");
    function rewrite(target, on, off) {
      var func1 = target.prototype[on];
      target.prototype[on] = function() {
        EventMgr_1.EventMgr.register(this);
        func1 && func1.call(this);
      };
      var func2 = target.prototype[off];
      target.prototype[off] = function() {
        EventMgr_1.EventMgr.unregister(this);
        func2 && func2.call(this);
      };
    }
    function onLoad() {
      return function(target) {
        rewrite(target, "onLoad", "onDestroy");
      };
    }
    exports.onLoad = onLoad;
    function onEnable() {
      return function(target) {
        rewrite(target, "onEnable", "onDisable");
      };
    }
    exports.onEnable = onEnable;
    function onEvent(key, once) {
      void 0 === once && (once = false);
      return function(target, name, desc) {
        var list = EventMgr_1.EventMgr.container.get(target.constructor);
        if (null == list) {
          list = [];
          EventMgr_1.EventMgr.container.set(target.constructor, list);
        }
        list.push({
          key: key,
          func: name,
          once: once
        });
      };
    }
    exports.onEvent = onEvent;
    cc._RF.pop();
  }, {
    "./EventMgr": "EventMgr"
  } ],
  EventMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23910doGkZP15FshwfnmI0H", "EventMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EventMgr = void 0;
    var Singleton_1 = require("../util/Singleton");
    var EventMgr = function(_super) {
      __extends(EventMgr, _super);
      function EventMgr() {
        var _this = _super.call(this) || this;
        _this._events = new Map();
        EventMgr._on = _this.on.bind(_this);
        EventMgr._off = function(target) {
          _this._events.forEach(function(map, key) {
            map.get(target).length = 0;
            map.delete(target);
            map.size <= 0 && _this._events.delete(key);
          });
        };
        return _this;
      }
      EventMgr.register = function(target) {
        var _this = this;
        this.container.get(target.constructor).forEach(function(src) {
          _this._on(target, src.key, target[src.func], src.once);
        }, this);
      };
      EventMgr.unregister = function(target) {
        this._off(target);
      };
      EventMgr.prototype.onDestroy = function() {
        EventMgr._on = null;
        EventMgr._off = null;
        this._events.forEach(function(map) {
          map.forEach(function(list) {
            return [];
          });
          map.clear();
        });
        this._events.clear();
        EventMgr.container.forEach(function(list) {
          return [];
        });
        EventMgr.container.clear();
      };
      EventMgr.prototype.on = function(target, key, event, once) {
        void 0 === once && (once = false);
        var map = this._events.get(key);
        var list = [];
        if (map) {
          list = map.get(target);
          if (null == list) {
            list = [];
            map.set(target, list);
          }
        } else {
          map = new Map();
          map.set(target, list);
          this._events.set(key, map);
        }
        list.push({
          event: event,
          once: once
        });
      };
      EventMgr.prototype.once = function(target, key, event) {
        this.on(target, key, event, true);
      };
      EventMgr.prototype.off = function(target, key, event) {
        var _a;
        var map = this._events.get(key);
        var list = map.get(target);
        var idx = null !== (_a = null === list || void 0 === list ? void 0 : list.findIndex(function(data) {
          return data.event == event;
        })) && void 0 !== _a ? _a : -1;
        -1 != idx && list.splice(idx, 1);
        if (list && list.length <= 0) {
          map.delete(target);
          map.size <= 0 && this._events.delete(key);
        }
      };
      EventMgr.prototype.emit = function(key) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) params[_i - 1] = arguments[_i];
        this.listeners(key).forEach(function(data) {
          return data.event.apply(data.target, params);
        });
      };
      EventMgr.prototype.emitAsync = function(key) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) params[_i - 1] = arguments[_i];
        return __awaiter(this, void 0, Promise, function() {
          var jobs;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jobs = [];
              this.listeners(key).forEach(function(data) {
                return jobs.push(data.target, params);
              });
              return [ 4, Promise.all(jobs) ];

             case 1:
              _a.sent();
              return [ 2 ];
            }
          });
        });
      };
      EventMgr.prototype.listeners = function(key) {
        var _this = this;
        var src = this._events.get(key);
        if (null == src) return [];
        var res = [];
        var wait = [];
        src.forEach(function(list, target) {
          list.forEach(function(item) {
            var data = {
              target: target,
              event: item.event
            };
            res.push(Object.assign({}, data));
            item.once && wait.push(Object.assign({}, data));
          });
        });
        wait.forEach(function(data) {
          return _this.off(data.target, key, data.event);
        }, this);
        return res;
      };
      EventMgr.container = new Map();
      EventMgr._on = null;
      EventMgr._off = null;
      return EventMgr;
    }(Singleton_1.Singleton);
    exports.EventMgr = EventMgr;
    var order = EventMgr.inst();
    cc._RF.pop();
  }, {
    "../util/Singleton": "Singleton"
  } ],
  FirstCheck: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd187/EeflPcIdyj7iSHMBU", "FirstCheck");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.FirstCheck = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var TileSelect_1 = require("../../act/TileSelect");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var FirstCheck = function(_super) {
      __extends(FirstCheck, _super);
      function FirstCheck() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      FirstCheck.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            if (param.from) return [ 2, true ];
            cc.log("\u521d\u9078", param.to.tile.id);
            param.load.push(new GridCmd_1.GridCmd().add(param.to.tile, new TileSelect_1.TileSelect(true)));
            param.from = param.to;
            param.to = null;
            return [ 2, false ];
          });
        });
      };
      return FirstCheck;
    }(WorkChain_1.WorkChain);
    exports.FirstCheck = FirstCheck;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../act/TileSelect": "TileSelect",
    "../../mvc/GridCmd": "GridCmd"
  } ],
  GameDefine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "51a5025505L4KmYV/KkIB/b", "GameDefine");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ULT_DAMAGE = exports.MAX_ENERGY = exports.ROLE_TABLE = exports.MAX_STAGE = exports.START_STAGE = exports.STAGE_RULE = exports.PLAYER_START = void 0;
    exports.PLAYER_START = {
      x: 3,
      y: 7
    };
    exports.STAGE_RULE = {
      1: {
        block: {
          min: 2,
          max: 5
        },
        enemy: {
          min: 3,
          max: 5,
          types: [ 400, 401, 402 ],
          weights: [ 6, 4, 2 ]
        },
        pass: {
          400: 10,
          401: 4,
          402: 3
        }
      }
    };
    exports.START_STAGE = 1;
    exports.MAX_STAGE = Object.keys(exports.STAGE_RULE).length;
    exports.ROLE_TABLE = {
      0: {
        atk: 30,
        energy: 1
      },
      1: {
        atk: 30,
        energy: 1
      },
      2: {
        atk: 30,
        energy: 1
      },
      3: {
        atk: 30,
        energy: 1
      },
      100: {
        hp: 1
      },
      101: {
        hp: 2
      },
      200: {
        atk: 100
      },
      300: {
        atk: 55
      },
      301: {
        atk: 55
      },
      302: {
        atk: 55
      },
      400: {
        hp: 100,
        atk: 10,
        def: 5,
        cd: 1,
        dex: 2,
        energy: 10
      },
      401: {
        hp: 90,
        atk: 5,
        def: 0,
        cd: 2,
        dex: 3,
        energy: 10
      },
      402: {
        hp: 120,
        atk: 30,
        def: 25,
        cd: 3,
        dex: 1,
        energy: 10
      },
      500: {
        hp: 300,
        atk: 1,
        def: 0,
        cd: 3
      },
      999: {
        hp: 0,
        atk: 0,
        def: 0,
        cd: 0,
        dex: 0
      }
    };
    exports.MAX_ENERGY = 200;
    exports.ULT_DAMAGE = 50;
    cc._RF.pop();
  }, {} ],
  GameMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0562cid6/tHHYag995KuafP", "GameMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GameMgr = void 0;
    var AudioCfg_1 = require("../cfg/AudioCfg");
    var AssetMgr_1 = require("../comm/asset/AssetMgr");
    var BgmAudio_1 = require("../comm/audio/BgmAudio");
    var SfxAudio_1 = require("../comm/audio/SfxAudio");
    var EventMgr_1 = require("../comm/event/EventMgr");
    var CmptPool_1 = require("../comm/pool/CmptPool");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameMgr = function(_super) {
      __extends(GameMgr, _super);
      function GameMgr() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      GameMgr.prototype.onLoad = function() {
        cc.game.setFrameRate(60);
        cc.debug.setDisplayStats(true);
        cc.dynamicAtlasManager.enabled = true;
        var mgr = cc.director.getCollisionManager();
        mgr.enabled = true;
        mgr.enabledDebugDraw = false;
      };
      GameMgr.prototype.onDestroy = function() {
        SfxAudio_1.SfxAudio.destroy();
        BgmAudio_1.BgmAudio.destroy();
        EventMgr_1.EventMgr.destroy();
        CmptPool_1.CmptPool.destroy();
        AssetMgr_1.AssetMgr.destroy();
      };
      GameMgr.prototype.start = function() {
        AssetMgr_1.AssetMgr.inst().loadAsset(AudioCfg_1.AudioSrc.LoopBgm, cc.AudioClip, true).then(function(audio) {
          BgmAudio_1.BgmAudio.inst().play(audio);
        });
      };
      GameMgr = __decorate([ ccclass ], GameMgr);
      return GameMgr;
    }(cc.Component);
    exports.GameMgr = GameMgr;
    cc._RF.pop();
  }, {
    "../cfg/AudioCfg": "AudioCfg",
    "../comm/asset/AssetMgr": "AssetMgr",
    "../comm/audio/BgmAudio": "BgmAudio",
    "../comm/audio/SfxAudio": "SfxAudio",
    "../comm/event/EventMgr": "EventMgr",
    "../comm/pool/CmptPool": "CmptPool"
  } ],
  GridCmd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4ffe2KtsGhAi6l+Mn5Muwn+", "GridCmd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GridCmd = exports.TileCmd = exports.TilePlay = void 0;
    var TileModel_1 = require("./model/TileModel");
    var TilePlay = function() {
      function TilePlay() {
        this.start = 0;
      }
      return TilePlay;
    }();
    exports.TilePlay = TilePlay;
    var TileCmd = function() {
      function TileCmd(base) {
        this.base = new TileModel_1.TileModel(-1);
        this.seq = [];
        Object.assign(this.base, base);
      }
      TileCmd.prototype.clear = function() {
        this.seq.forEach(function(elm) {
          return null;
        });
        this.seq = [];
        this.base = null;
      };
      TileCmd.prototype.add = function(play) {
        this.seq.push(play);
      };
      return TileCmd;
    }();
    exports.TileCmd = TileCmd;
    var GridCmd = function() {
      function GridCmd() {
        this.deed = new Map();
        this._timeline = 0;
        this.slack = 0;
      }
      GridCmd.prototype.clear = function() {
        this.deed.forEach(function(elm) {
          elm.clear();
          elm = null;
        });
        this.deed.clear();
      };
      GridCmd.prototype.add = function(tile, play) {
        var _a;
        var id = tile.id;
        var cmd = null !== (_a = this.deed.get(id)) && void 0 !== _a ? _a : new TileCmd(tile);
        this.deed.set(id, cmd);
        play.start = this._timeline;
        cmd.add(play);
        return this;
      };
      GridCmd.prototype.pass = function(sec) {
        this._timeline += sec;
      };
      return GridCmd;
    }();
    exports.GridCmd = GridCmd;
    cc._RF.pop();
  }, {
    "./model/TileModel": "TileModel"
  } ],
  GridCtrlBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62c2a9zBexMcZhJw3qLm4Q3", "GridCtrlBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GridCtrlBase = void 0;
    var GridDefine_1 = require("../../../define/GridDefine");
    var TileDefine_1 = require("../../../define/TileDefine");
    var SelectHandler_1 = require("../../select/SelectHandler");
    var GridModel_1 = require("../model/GridModel");
    var GridView_1 = require("../view/GridView");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GridCtrlBase = function(_super) {
      __extends(GridCtrlBase, _super);
      function GridCtrlBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._model = null;
        _this._view = null;
        _this.window = null;
        return _this;
      }
      GridCtrlBase.prototype.onLoad = function() {
        if (this.window) {
          this.window.width = GridDefine_1.GRID_W;
          this.window.height = GridDefine_1.GRID_H;
        }
      };
      GridCtrlBase.prototype.onEnable = function() {
        this._model = new GridModel_1.GridModel();
        this._view = this.getComponentInChildren(GridView_1.GridView);
      };
      GridCtrlBase.prototype.start = function() {
        var target = this._view.node;
        target.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        target.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      };
      GridCtrlBase.prototype.onDestroy = function() {
        SelectHandler_1.SelectHandler.destroy();
        this._model.clear();
        this._model = null;
      };
      GridCtrlBase.prototype.onTouchStart = function(event) {
        this.select(this.convertPos(event));
      };
      GridCtrlBase.prototype.onTouchMove = function(event) {
        var from = SelectHandler_1.SelectHandler.inst().selected;
        var to = this.convertPos(event);
        from && false == GridDefine_1.SAME_POS(from, to) && this.select(this.convertPos(event));
      };
      GridCtrlBase.prototype.convertPos = function(src) {
        var pos = this._view.node.convertToNodeSpaceAR(src.getLocation());
        return {
          x: Math.floor(pos.x / TileDefine_1.TILE_W),
          y: Math.floor(pos.y / TileDefine_1.TILE_H)
        };
      };
      __decorate([ property(cc.Node) ], GridCtrlBase.prototype, "window", void 0);
      GridCtrlBase = __decorate([ ccclass ], GridCtrlBase);
      return GridCtrlBase;
    }(cc.Component);
    exports.GridCtrlBase = GridCtrlBase;
    cc._RF.pop();
  }, {
    "../../../define/GridDefine": "GridDefine",
    "../../../define/TileDefine": "TileDefine",
    "../../select/SelectHandler": "SelectHandler",
    "../model/GridModel": "GridModel",
    "../view/GridView": "GridView"
  } ],
  GridCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7a413+ZZVZJIZHsVSkqljbp", "GridCtrl");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GridCtrl = void 0;
    var GameDefine_1 = require("../../../define/GameDefine");
    var GridDefine_1 = require("../../../define/GridDefine");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileSpawn_1 = require("../../act/TileSpawn");
    var StageCtrl_1 = require("./StageCtrl");
    var GridCmd_1 = require("../GridCmd");
    var GridView_1 = require("../view/GridView");
    var RandUtil_1 = require("../../../comm/util/RandUtil");
    var GridModel_1 = require("../model/GridModel");
    var GridCtrlBase_1 = require("./GridCtrlBase");
    var SelectHandler_1 = require("../../select/SelectHandler");
    var EventDecor_1 = require("../../../comm/event/EventDecor");
    var EventCfg_1 = require("../../../cfg/EventCfg");
    var TileTrans_1 = require("../../act/TileTrans");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GridCtrl = function(_super) {
      __extends(GridCtrl, _super);
      function GridCtrl() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._model = null;
        _this._playing = false;
        return _this;
      }
      GridCtrl_1 = GridCtrl;
      Object.defineProperty(GridCtrl, "inst", {
        get: function() {
          return this._inst;
        },
        enumerable: false,
        configurable: true
      });
      GridCtrl.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        GridCtrl_1._inst = this;
      };
      GridCtrl.prototype.onEnable = function() {
        this._model = new GridModel_1.GridModel();
        this._view = this.getComponentInChildren(GridView_1.GridView);
      };
      GridCtrl.prototype.play = function(cmd) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this._view.accept(cmd) ];

             case 1:
              _a.sent() && this._model.print();
              return [ 2 ];
            }
          });
        });
      };
      GridCtrl.prototype.fight = function() {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this._model.clearManage();
              this.genNorm();
              this.genPlayer();
              this.genBlocks();
              this.genEnemies();
              return [ 4, this.expose() ];

             case 1:
              _a.sent();
              return [ 2 ];
            }
          });
        });
      };
      GridCtrl.prototype.genNorm = function() {
        var _this = this;
        var min = TileDefine_1.NORM_TILE.min;
        var max = TileDefine_1.NORM_TILE.max;
        GridDefine_1.FOR_COL_ROW(function(pos) {
          var tile = _this._model.getTile(pos);
          tile.type = _this._model.getRandType();
          for (var i = min; i < max; i++) {
            if (_this._model.isCrush(pos)) {
              var type = tile.type;
              tile.type = ++type >= max ? min : type;
              continue;
            }
            return;
          }
          cc.warn("\u91cd\u8907", tile.id, pos);
        });
      };
      GridCtrl.prototype.genPlayer = function() {
        var tile = this._model.getTile(GameDefine_1.PLAYER_START);
        tile.type = TileDefine_1.TileType.Hero;
        tile.cd = 0;
      };
      GridCtrl.prototype.genBlocks = function() {
        var data = StageCtrl_1.StageCtrl.inst.data.block;
        var size = RandUtil_1.RandUtil.randInt(data.max + 1, data.min);
        var count = 0;
        do {
          var tile = this._model.getTile(this.randPos());
          if (tile.group == TileDefine_1.TileGroup.Norm) {
            tile.type = RandUtil_1.RandUtil.randTypes([ TileDefine_1.TileType.Stone, TileDefine_1.TileType.Rock ]);
            count++;
          }
        } while (count < size);
      };
      GridCtrl.prototype.genEnemies = function() {
        var data = StageCtrl_1.StageCtrl.inst.data.enemy;
        var size = RandUtil_1.RandUtil.randInt(data.max + 1, data.min);
        var count = 0;
        do {
          var tile = this._model.getTile(this.randPos());
          if (tile.group == TileDefine_1.TileGroup.Norm) {
            var idx = RandUtil_1.RandUtil.randWeights(data.weights);
            tile.type = data.types[idx];
            count++;
          }
        } while (count < size);
      };
      GridCtrl.prototype.randPos = function() {
        return {
          x: RandUtil_1.RandUtil.randInt(GridDefine_1.GRID_COL),
          y: RandUtil_1.RandUtil.randInt(GridDefine_1.GRID_ROW)
        };
      };
      GridCtrl.prototype.expose = function() {
        return __awaiter(this, void 0, Promise, function() {
          var cmd;
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              cmd = new GridCmd_1.GridCmd();
              GridDefine_1.FOR_COL_ROW(function(pos) {
                var tile = _this._model.getTile(pos);
                cmd.add(tile, new TileSpawn_1.TileSpawn());
                cmd.pass(.01);
              });
              return [ 4, this.play(cmd) ];

             case 1:
              _a.sent();
              return [ 2 ];
            }
          });
        });
      };
      GridCtrl.prototype.select = function(pos) {
        return __awaiter(this, void 0, Promise, function() {
          var cmd, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              if (false == this._model.checkPos(pos) || this._playing) return [ 2 ];
              this._playing = true;
              return [ 4, SelectHandler_1.SelectHandler.inst().execute(this._model, pos) ];

             case 1:
              cmd = _b.sent();
              _a = cmd;
              if (!_a) return [ 3, 3 ];
              return [ 4, this.play(cmd) ];

             case 2:
              _a = _b.sent();
              _b.label = 3;

             case 3:
              _a;
              this._playing = false;
              return [ 2 ];
            }
          });
        });
      };
      GridCtrl.prototype.ultimate = function() {
        return __awaiter(this, void 0, Promise, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              _a = this.play;
              return [ 4, SelectHandler_1.SelectHandler.inst().executeUlt(this._model) ];

             case 1:
              return [ 4, _a.apply(this, [ _b.sent() ]) ];

             case 2:
              _b.sent();
              return [ 2 ];
            }
          });
        });
      };
      GridCtrl.prototype.onDebugType = function(pos, type) {
        var tile = this._model.getTile(pos);
        if (tile) {
          tile.type = type;
          this._view.accept(new GridCmd_1.GridCmd().add(tile, new TileTrans_1.TileTrans(type)));
          this._model.print();
        }
      };
      var GridCtrl_1;
      GridCtrl._inst = null;
      __decorate([ EventDecor_1.onEvent(EventCfg_1.EventSrc.Ultimate) ], GridCtrl.prototype, "ultimate", null);
      __decorate([ EventDecor_1.onEvent(EventCfg_1.EventSrc.DebugType) ], GridCtrl.prototype, "onDebugType", null);
      GridCtrl = GridCtrl_1 = __decorate([ ccclass, EventDecor_1.onEnable() ], GridCtrl);
      return GridCtrl;
    }(GridCtrlBase_1.GridCtrlBase);
    exports.GridCtrl = GridCtrl;
    cc._RF.pop();
  }, {
    "../../../cfg/EventCfg": "EventCfg",
    "../../../comm/event/EventDecor": "EventDecor",
    "../../../comm/util/RandUtil": "RandUtil",
    "../../../define/GameDefine": "GameDefine",
    "../../../define/GridDefine": "GridDefine",
    "../../../define/TileDefine": "TileDefine",
    "../../act/TileSpawn": "TileSpawn",
    "../../act/TileTrans": "TileTrans",
    "../../select/SelectHandler": "SelectHandler",
    "../GridCmd": "GridCmd",
    "../model/GridModel": "GridModel",
    "../view/GridView": "GridView",
    "./GridCtrlBase": "GridCtrlBase",
    "./StageCtrl": "StageCtrl"
  } ],
  GridDefine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "47bc0b7cVNAJLd4T8KqhA08", "GridDefine");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.FOR_ROW_COL = exports.FOR_COL_ROW = exports.FOR_ROW = exports.FOR_COL = exports.FOUR_DIR = exports.SAME_POS = exports.FALL_SPEED = exports.GRID_H = exports.GRID_W = exports.GRID_ROW = exports.GRID_COL = void 0;
    var TileDefine_1 = require("./TileDefine");
    exports.GRID_COL = 7;
    exports.GRID_ROW = 9;
    exports.GRID_W = exports.GRID_COL * TileDefine_1.TILE_W;
    exports.GRID_H = exports.GRID_ROW * TileDefine_1.TILE_H;
    exports.FALL_SPEED = .6 / exports.GRID_H;
    var SAME_POS = function(posA, posB) {
      return posA.x == posB.x && posA.y == posB.y;
    };
    exports.SAME_POS = SAME_POS;
    exports.FOUR_DIR = {
      right: {
        x: 1,
        y: 0
      },
      bottom: {
        x: 0,
        y: -1
      },
      left: {
        x: -1,
        y: 0
      },
      top: {
        x: 0,
        y: 1
      }
    };
    var FOR_COL = function(act) {
      for (var i = 0; i < exports.GRID_COL; i++) act(i);
    };
    exports.FOR_COL = FOR_COL;
    var FOR_ROW = function(act) {
      for (var i = 0; i < exports.GRID_ROW; i++) act(i);
    };
    exports.FOR_ROW = FOR_ROW;
    var FOR_COL_ROW = function(act) {
      exports.FOR_ROW(function(y) {
        return exports.FOR_COL(function(x) {
          return act({
            x: x,
            y: y
          });
        });
      });
    };
    exports.FOR_COL_ROW = FOR_COL_ROW;
    var FOR_ROW_COL = function(act) {
      exports.FOR_COL(function(x) {
        return exports.FOR_ROW(function(y) {
          return act({
            x: x,
            y: y
          });
        });
      });
    };
    exports.FOR_ROW_COL = FOR_ROW_COL;
    cc._RF.pop();
  }, {
    "./TileDefine": "TileDefine"
  } ],
  GridDirector: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31c1d5xHCtEPbpAqJUkVZuA", "GridDirector");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GridDirector = void 0;
    var GridDefine_1 = require("../../define/GridDefine");
    var TileDefine_1 = require("../../define/TileDefine");
    var GridDirector = function() {
      function GridDirector(host) {
        this._host = null;
        this._perform = new Map();
        this._tween = null;
        this._host = host;
        this._perform.set(TileDefine_1.TileAct.Spawn, this.spawn);
        this._perform.set(TileDefine_1.TileAct.Fall, this.fall);
        this._perform.set(TileDefine_1.TileAct.Select, this.select);
        this._perform.set(TileDefine_1.TileAct.Swap, this.swap);
        this._perform.set(TileDefine_1.TileAct.Crush, this.crush);
        this._perform.set(TileDefine_1.TileAct.Trans, this.trans);
        this._perform.set(TileDefine_1.TileAct.Wait, this.wait);
        this._perform.set(TileDefine_1.TileAct.Move, this.move);
        this._perform.set(TileDefine_1.TileAct.Slip, this.slip);
        this._perform.set(TileDefine_1.TileAct.Hit, this.hit);
        this._perform.set(TileDefine_1.TileAct.Die, this.die);
        this._perform.set(TileDefine_1.TileAct.Next, this.next);
        this._perform.set(TileDefine_1.TileAct.Skill, this.skill);
      }
      GridDirector.prototype.execute = function(tween, type, act, tile) {
        this._tween = tween;
        return this._perform.has(type) ? this._perform.get(type).call(this, act, tile) : 0;
      };
      GridDirector.prototype.spawn = function(act, tile) {
        var time = act.skip ? 0 : .1;
        if (time <= 0) {
          tile.node.active = true;
          tile.node.scale = 1;
        } else {
          this._tween.call(function() {
            tile.node.scale = 0;
            tile.node.active = true;
          });
          this._tween.to(time, {
            scale: 1
          });
        }
        return time;
      };
      GridDirector.prototype.fall = function(act, tile) {
        var begin = tile.node.position;
        var end = cc.v3((act.target.x + .5) * TileDefine_1.TILE_W, (act.target.y + .5) * TileDefine_1.TILE_H, 0);
        var dist = end.sub(begin).mag();
        var time = dist * GridDefine_1.FALL_SPEED;
        this._tween.to(time, {
          position: end
        }, {
          easing: cc.easing.quadIn
        });
        return time;
      };
      GridDirector.prototype.select = function(act, tile) {
        var time = .1;
        this._tween.to(time, {
          scale: act.selected ? .7 : 1
        });
        return time;
      };
      GridDirector.prototype.swap = function(act, tile) {
        var time = .3;
        var x = (act.target.x + .5) * TileDefine_1.TILE_W;
        var y = (act.target.y + .5) * TileDefine_1.TILE_H;
        this._tween.to(time, {
          position: cc.v3(x, y, 0)
        });
        return time;
      };
      GridDirector.prototype.crush = function(act, tile) {
        var _this = this;
        var time = .2;
        this._tween.call(function() {
          return tile.node.scale = 1;
        });
        this._tween.to(time, {
          scale: 0
        });
        this._tween.call(function() {
          return tile.die().then(function() {
            return _this._host.recycle(tile);
          });
        }, this);
        return time;
      };
      GridDirector.prototype.trans = function(act, tile) {
        var time = act.skip ? 0 : .2;
        if (time <= 0) {
          tile.node.scale = 1;
          tile.setType(act.target);
        } else {
          this._tween.call(function() {
            return tile.node.scale = 1;
          });
          this._tween.to(time, {
            scale: 0
          });
          this._tween.call(function() {
            tile.node.scale = 1;
            tile.setType(act.target);
          });
        }
        return time;
      };
      GridDirector.prototype.wait = function(act, tile) {
        this._tween.delay(act.time);
        return act.time;
      };
      GridDirector.prototype.move = function(act, tile) {
        var time = act.skip ? 0 : .3;
        var x = (act.target.x + .5) * TileDefine_1.TILE_W;
        var y = (act.target.y + .5) * TileDefine_1.TILE_H;
        if (time <= 0) tile.node.setPosition(x, y); else {
          this._tween.call(function() {
            return tile.node.zIndex = TileDefine_1.TileGroup.None;
          });
          this._tween.to(time, {
            position: cc.v3(x, y, 0)
          }, {
            easing: cc.easing.quadIn
          });
          this._tween.call(function() {
            return tile.node.zIndex = tile.group;
          });
        }
        return time;
      };
      GridDirector.prototype.slip = function(act, tile) {
        var _this = this;
        var total = 0;
        var begin = tile.node.position;
        act.path.forEach(function(pos) {
          var end = cc.v3((pos.x + .5) * TileDefine_1.TILE_W, (pos.y + .5) * TileDefine_1.TILE_H, 0);
          var dist = end.sub(begin).mag();
          var time = dist * GridDefine_1.FALL_SPEED;
          _this._tween.call(function() {
            return tile.node.zIndex = 1;
          });
          _this._tween.to(time, {
            position: end
          }, {
            easing: cc.easing.quadIn
          });
          _this._tween.call(function() {
            return tile.node.zIndex = 0;
          });
          begin = end;
          total += time;
        });
        return total;
      };
      GridDirector.prototype.hit = function(act, tile) {
        var time = .2;
        var half = time / 2;
        this._tween.call(function() {
          tile.node.scale = 1;
          tile.hit();
        });
        this._tween.to(half, {
          scale: .8
        });
        this._tween.to(half, {
          scale: 1
        });
        this._tween.call(function() {
          return tile.decHp(act.damage);
        });
        return time;
      };
      GridDirector.prototype.die = function(act, tile) {
        var _this = this;
        var time = .2;
        this._tween.call(function() {
          return tile.node.scale = 1;
        });
        this._tween.to(time, {
          scale: 0
        });
        this._tween.call(function() {
          return tile.die().then(function() {
            return _this._host.recycle(tile);
          });
        }, this);
        return time;
      };
      GridDirector.prototype.next = function(act, tile) {
        var time = .5;
        this._tween.call(function() {
          return tile.node.angle = 0;
        });
        this._tween.to(time, {
          angle: 360
        });
        this._tween.call(function() {
          return tile.nextRound();
        });
        return time;
      };
      GridDirector.prototype.skill = function(act, tile) {
        var _this = this;
        var time = 0;
        this._tween.call(function() {
          return _this._host.recycle(tile);
        }, this);
        return time;
      };
      return GridDirector;
    }();
    exports.GridDirector = GridDirector;
    cc._RF.pop();
  }, {
    "../../define/GridDefine": "GridDefine",
    "../../define/TileDefine": "TileDefine"
  } ],
  GridModelBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c7f10tZbStIN5/QOUqWdYct", "GridModelBase");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GridModelBase = void 0;
    var RandUtil_1 = require("../../../comm/util/RandUtil");
    var GridDefine_1 = require("../../../define/GridDefine");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileModel_1 = require("./TileModel");
    var GridModelBase = function() {
      function GridModelBase() {
        var _this = this;
        this.tiles = [];
        GridDefine_1.FOR_ROW_COL(function(pos) {
          0 == pos.y && (_this.tiles[pos.x] = []);
          _this.setTile(pos, new TileModel_1.TileModel());
        });
      }
      GridModelBase.prototype.clear = function() {
        var _this = this;
        GridDefine_1.FOR_COL_ROW(function(pos) {
          return _this.tiles[pos.x][pos.y] = null;
        });
        this.tiles = [];
      };
      GridModelBase.prototype.getRandType = function() {
        return RandUtil_1.RandUtil.randInt(TileDefine_1.NORM_TILE.max + 1, TileDefine_1.NORM_TILE.min);
      };
      GridModelBase.prototype.checkPos = function(pos) {
        return pos && pos.x >= 0 && pos.x < GridDefine_1.GRID_COL && pos.y >= 0 && pos.y < GridDefine_1.GRID_ROW;
      };
      GridModelBase.prototype.getTile = function(pos) {
        return this.checkPos(pos) ? this.tiles[pos.x][pos.y] : TileDefine_1.NULL_TILE;
      };
      GridModelBase.prototype.setTile = function(pos, tile) {
        if (this.checkPos(pos)) {
          this.tiles[pos.x][pos.y] = tile;
          tile && (tile.pos = pos);
        }
      };
      GridModelBase.prototype.print = function() {
        var _this = this;
        var str = "";
        GridDefine_1.FOR_COL_ROW(function(pos) {
          var tile = _this.getTile({
            x: pos.x,
            y: GridDefine_1.GRID_ROW - pos.y - 1
          });
          str += (tile ? tile.toString() : "xxx(xxx)") + ", ";
          pos.x == GridDefine_1.GRID_COL - 1 && (str += "\n");
        });
        cc.log(str);
      };
      return GridModelBase;
    }();
    exports.GridModelBase = GridModelBase;
    cc._RF.pop();
  }, {
    "../../../comm/util/RandUtil": "RandUtil",
    "../../../define/GridDefine": "GridDefine",
    "../../../define/TileDefine": "TileDefine",
    "./TileModel": "TileModel"
  } ],
  GridModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2ebfeNnlfFHEKsIJc63kHGC", "GridModel");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GridModel = void 0;
    var GridDefine_1 = require("../../../define/GridDefine");
    var TileDefine_1 = require("../../../define/TileDefine");
    var GridModelBase_1 = require("./GridModelBase");
    var OFFSET_O = [ [ {
      x: 1,
      y: 0
    }, {
      x: 1,
      y: 1
    }, {
      x: 0,
      y: 1
    } ], [ {
      x: 0,
      y: 1
    }, {
      x: -1,
      y: 1
    }, {
      x: -1,
      y: 0
    } ], [ {
      x: -1,
      y: 0
    }, {
      x: -1,
      y: -1
    }, {
      x: 0,
      y: -1
    } ], [ {
      x: 1,
      y: 0
    }, {
      x: 1,
      y: -1
    }, {
      x: 0,
      y: -1
    } ] ];
    var OFFSET_T = [ [ {
      x: 1,
      y: 0
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: -1
    }, {
      x: 0,
      y: -2
    } ], [ {
      x: 0,
      y: 1
    }, {
      x: 0,
      y: -1
    }, {
      x: 1,
      y: 0
    }, {
      x: 2,
      y: 0
    } ], [ {
      x: 0,
      y: 1
    }, {
      x: 0,
      y: -1
    }, {
      x: -1,
      y: 0
    }, {
      x: -2,
      y: 0
    } ], [ {
      x: 1,
      y: 0
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 0,
      y: 2
    } ] ];
    var OFFSET_L = [ [ {
      x: 1,
      y: 0
    }, {
      x: 2,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 0,
      y: 2
    } ], [ {
      x: 0,
      y: 1
    }, {
      x: 0,
      y: 2
    }, {
      x: -1,
      y: 0
    }, {
      x: -2,
      y: 0
    } ], [ {
      x: -1,
      y: 0
    }, {
      x: -2,
      y: 0
    }, {
      x: 0,
      y: -1
    }, {
      x: 0,
      y: -2
    } ], [ {
      x: 0,
      y: -1
    }, {
      x: 0,
      y: -2
    }, {
      x: 1,
      y: 0
    }, {
      x: 2,
      y: 0
    } ] ];
    var GridModel = function(_super) {
      __extends(GridModel, _super);
      function GridModel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.player = null;
        _this._enemies = new Map();
        return _this;
      }
      Object.defineProperty(GridModel.prototype, "enemies", {
        get: function() {
          return this.getEnemies();
        },
        enumerable: false,
        configurable: true
      });
      GridModel.prototype.setTile = function(pos, tile) {
        _super.prototype.setTile.call(this, pos, tile);
        tile && (tile.manage = this.addManage.bind(this));
      };
      GridModel.prototype.getTile = function(pos) {
        var tile = _super.prototype.getTile.call(this, pos);
        tile && (tile.manage = this.addManage.bind(this));
        return tile;
      };
      GridModel.prototype.getRandType = function() {
        return _super.prototype.getRandType.call(this);
      };
      GridModel.prototype.getEnemies = function() {
        var _this = this;
        var waits = [];
        this._enemies.forEach(function(enemy, id) {
          _this.getTile(enemy.pos).id != id && waits.push(id);
        }, this);
        waits.forEach(function(id) {
          return _this._enemies.delete(id);
        }, this);
        return Array.from(this._enemies.values());
      };
      GridModel.prototype.clearManage = function() {
        var _this = this;
        Array.from(this._enemies.values()).forEach(function(enemy) {
          enemy && _this.removeManage(enemy);
        }, this);
        this._enemies.clear();
        this.player && this.removeManage(this.player);
      };
      GridModel.prototype.addManage = function(tile) {
        switch (tile.group) {
         case TileDefine_1.TileGroup.Player:
          this.player = tile;
          break;

         case TileDefine_1.TileGroup.Enemy:
          this._enemies.set(tile.id, tile);
        }
      };
      GridModel.prototype.removeManage = function(tile) {
        switch (tile.group) {
         case TileDefine_1.TileGroup.Player:
          this.player = null;
          break;

         case TileDefine_1.TileGroup.Enemy:
          this._enemies.delete(tile.id);
        }
        tile.manage = null;
      };
      GridModel.prototype.isCrush = function(center) {
        return this.getCrushesH(center).length >= 3 || this.getCrushesV(center).length >= 3 || this.getCrushesO(center).length >= 4 || this.getCrushesT(center).length >= 5 || this.getCrushesL(center).length >= 5;
      };
      GridModel.prototype.getCrushesH = function(center) {
        var res = [];
        var type = this.getTile(center).type;
        if (TileDefine_1.TILE_GROUP_IS(type) != TileDefine_1.TileGroup.Norm) return res;
        for (var i = center.x - 1; i >= 0; i--) {
          var pos = {
            x: i,
            y: center.y
          };
          var tile = this.getTile(pos);
          if (!tile || tile.type != type || tile.trans != TileDefine_1.TileType.None) break;
          res.push(pos);
        }
        for (var i = center.x + 1; i < GridDefine_1.GRID_COL; i++) {
          var pos = {
            x: i,
            y: center.y
          };
          var tile = this.getTile(pos);
          if (!tile || tile.type != type || tile.trans != TileDefine_1.TileType.None) break;
          res.push(pos);
        }
        res.length >= 2 && res.unshift(center);
        return res;
      };
      GridModel.prototype.getCrushesV = function(center) {
        var res = [];
        var type = this.getTile(center).type;
        if (TileDefine_1.TILE_GROUP_IS(type) != TileDefine_1.TileGroup.Norm) return res;
        for (var i = center.y - 1; i >= 0; i--) {
          var pos = {
            x: center.x,
            y: i
          };
          var tile = this.getTile(pos);
          if (!tile || tile.type != type || tile.trans != TileDefine_1.TileType.None) break;
          res.push(pos);
        }
        for (var i = center.y + 1; i < GridDefine_1.GRID_ROW; i++) {
          var pos = {
            x: center.x,
            y: i
          };
          var tile = this.getTile(pos);
          if (!tile || tile.type != type || tile.trans != TileDefine_1.TileType.None) break;
          res.push(pos);
        }
        res.length >= 2 && res.unshift(center);
        return res;
      };
      GridModel.prototype.getCrushesO = function(center) {
        var _this = this;
        var res = [];
        var type = this.getTile(center).type;
        if (TileDefine_1.TILE_GROUP_IS(type) != TileDefine_1.TileGroup.Norm) return res;
        OFFSET_O.forEach(function(elm) {
          var len = elm.length;
          var temp = [];
          for (var i = 0; i < len; i++) {
            var pos = {
              x: center.x + elm[i].x,
              y: center.y + elm[i].y
            };
            var tile = _this.getTile(pos);
            if (!tile || tile.type != type || tile.trans != TileDefine_1.TileType.None) return;
            temp.push(pos);
          }
          res = res.concat(temp);
        });
        res.length >= 3 && res.unshift(center);
        return res;
      };
      GridModel.prototype.getCrushesT = function(center) {
        var _this = this;
        var res = [];
        var type = this.getTile(center).type;
        if (TileDefine_1.TILE_GROUP_IS(type) != TileDefine_1.TileGroup.Norm) return res;
        OFFSET_T.forEach(function(elm) {
          var len = elm.length;
          var temp = [];
          for (var i = 0; i < len; i++) {
            var pos = {
              x: center.x + elm[i].x,
              y: center.y + elm[i].y
            };
            var tile = _this.getTile(pos);
            if (!tile || tile.type != type || tile.trans != TileDefine_1.TileType.None) return;
            temp.push(tile.pos);
          }
          res = res.concat(temp);
        });
        res.length >= 4 && res.unshift(center);
        return res;
      };
      GridModel.prototype.getCrushesL = function(center) {
        var _this = this;
        var res = [];
        var type = this.getTile(center).type;
        if (TileDefine_1.TILE_GROUP_IS(type) != TileDefine_1.TileGroup.Norm) return res;
        OFFSET_L.forEach(function(elm) {
          var len = elm.length;
          var temp = [];
          for (var i = 0; i < len; i++) {
            var pos = {
              x: center.x + elm[i].x,
              y: center.y + elm[i].y
            };
            var tile = _this.getTile(pos);
            if (!tile || tile.type != type || tile.trans != TileDefine_1.TileType.None) return;
            temp.push(pos);
          }
          res = res.concat(temp);
        });
        res.length >= 4 && res.unshift(center);
        return res;
      };
      return GridModel;
    }(GridModelBase_1.GridModelBase);
    exports.GridModel = GridModel;
    cc._RF.pop();
  }, {
    "../../../define/GridDefine": "GridDefine",
    "../../../define/TileDefine": "TileDefine",
    "./GridModelBase": "GridModelBase"
  } ],
  GridView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "066deMKz0dIp6QYYrLmOpAv", "GridView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GridView = void 0;
    var PrefabCfg_1 = require("../../../cfg/PrefabCfg");
    var AssetMgr_1 = require("../../../comm/asset/AssetMgr");
    var CmptPool_1 = require("../../../comm/pool/CmptPool");
    var WaitUtil_1 = require("../../../comm/util/WaitUtil");
    var GridDefine_1 = require("../../../define/GridDefine");
    var TileView_1 = require("./TileView");
    var GridDirector_1 = require("../GridDirector");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GridView = function(_super) {
      __extends(GridView, _super);
      function GridView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._tiles = new Map();
        _this._cmd = [];
        _this._director = null;
        return _this;
      }
      GridView.prototype.onLoad = function() {
        this.node.anchorX = 0;
        this.node.anchorY = 0;
        this.node.x = -GridDefine_1.GRID_W / 2;
        this.node.y = -GridDefine_1.GRID_H / 2;
        this.node.width = GridDefine_1.GRID_W;
        this.node.height = GridDefine_1.GRID_H;
      };
      GridView.prototype.onEnable = function() {
        this._director = new GridDirector_1.GridDirector(this);
      };
      GridView.prototype.onDestroy = function() {
        this._cmd.forEach(function(elm) {
          return elm.clear();
        });
        this._cmd = [];
        this._tiles.clear();
      };
      GridView.prototype.fetch = function() {
        var _a;
        return __awaiter(this, void 0, Promise, function() {
          var tile, _b, _c, _d;
          return __generator(this, function(_e) {
            switch (_e.label) {
             case 0:
              return [ 4, CmptPool_1.CmptPool.inst().fetch(TileView_1.TileView) ];

             case 1:
              if (!(null !== (_a = _e.sent()) && void 0 !== _a)) return [ 3, 2 ];
              _b = _a;
              return [ 3, 4 ];

             case 2:
              _d = (_c = cc).instantiate;
              return [ 4, AssetMgr_1.AssetMgr.inst().loadAsset(PrefabCfg_1.PrefabSrc.Tile, cc.Prefab, true) ];

             case 3:
              _b = _d.apply(_c, [ _e.sent() ]);
              _e.label = 4;

             case 4:
              tile = _b;
              tile.setParent(this.node);
              tile.active = false;
              return [ 2, tile.getComponent(TileView_1.TileView) ];
            }
          });
        });
      };
      GridView.prototype.recycle = function(tile) {
        this._tiles.delete(tile.id) && CmptPool_1.CmptPool.inst().recycle(TileView_1.TileView, tile.node);
      };
      GridView.prototype.accept = function(cmd) {
        return __awaiter(this, void 0, Promise, function() {
          var cmd_1, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              if (null == cmd || cmd instanceof Array && cmd.length <= 0) return [ 2, false ];
              this._cmd = this._cmd.concat(cmd);
              _b.label = 1;

             case 1:
              cmd_1 = this._cmd.shift();
              return [ 4, this.process(cmd_1) ];

             case 2:
              _b.sent();
              _a = cmd_1.slack > 0;
              if (!_a) return [ 3, 4 ];
              return [ 4, WaitUtil_1.WaitUtil.waitMs(cmd_1.slack) ];

             case 3:
              _a = _b.sent();
              _b.label = 4;

             case 4:
              _a;
              _b.label = 5;

             case 5:
              if (this._cmd.length > 0) return [ 3, 1 ];
              _b.label = 6;

             case 6:
              return [ 2, true ];
            }
          });
        });
      };
      GridView.prototype.process = function(cmd) {
        return __awaiter(this, void 0, Promise, function() {
          var jobs, values, len, i, elm, id, tile;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (null == cmd || null == cmd.deed || cmd.deed.size <= 0) return [ 2 ];
              jobs = [];
              values = Array.from(cmd.deed.values());
              len = values.length;
              i = 0;
              _a.label = 1;

             case 1:
              if (!(i < len)) return [ 3, 5 ];
              elm = values[i];
              id = elm.base.id;
              tile = this._tiles.get(id);
              if (!(null == tile)) return [ 3, 3 ];
              return [ 4, this.fetch() ];

             case 2:
              tile = _a.sent();
              tile.init(elm.base);
              this._tiles.set(id, tile);
              _a.label = 3;

             case 3:
              jobs.push(this.execute(elm));
              _a.label = 4;

             case 4:
              i++;
              return [ 3, 1 ];

             case 5:
              return [ 4, Promise.all(jobs) ];

             case 6:
              _a.sent();
              cmd.clear();
              cmd = null;
              return [ 2 ];
            }
          });
        });
      };
      GridView.prototype.execute = function(cmd) {
        return __awaiter(this, void 0, Promise, function() {
          var tile;
          var _this = this;
          return __generator(this, function(_a) {
            tile = this._tiles.get(cmd.base.id);
            return [ 2, new Promise(function(resolve) {
              var tween = cc.tween(tile.node);
              var timeline = 0;
              for (var _i = 0, _a = cmd.seq; _i < _a.length; _i++) {
                var act = _a[_i];
                if (act.start > timeline) {
                  var space = act.start - timeline;
                  tween.delay(space);
                  timeline += space;
                }
                timeline += _this._director.execute(tween, act.type, act, tile);
              }
              tween.call(function() {
                return resolve();
              });
              tween.start();
            }) ];
          });
        });
      };
      GridView = __decorate([ ccclass ], GridView);
      return GridView;
    }(cc.Component);
    exports.GridView = GridView;
    cc._RF.pop();
  }, {
    "../../../cfg/PrefabCfg": "PrefabCfg",
    "../../../comm/asset/AssetMgr": "AssetMgr",
    "../../../comm/pool/CmptPool": "CmptPool",
    "../../../comm/util/WaitUtil": "WaitUtil",
    "../../../define/GridDefine": "GridDefine",
    "../GridDirector": "GridDirector",
    "./TileView": "TileView"
  } ],
  LimitCheck: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2fcf8cbV9BB7aXaEEvyQ8Tw", "LimitCheck");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.LimitCheck = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileSelect_1 = require("../../act/TileSelect");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var LimitCheck = function(_super) {
      __extends(LimitCheck, _super);
      function LimitCheck() {
        var _this = _super.call(this) || this;
        _this._process = null;
        _this._process = new LimitNorm();
        _this._process.push(new LimitBlock());
        _this._process.push(new LimitItem());
        _this._process.push(new LimitSkill());
        _this._process.push(new LimitEnemy());
        _this._process.push(new LimitPlayer());
        return _this;
      }
      LimitCheck.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this._process.execute(param) ];

             case 1:
              return [ 2, _a.sent() ];
            }
          });
        });
      };
      return LimitCheck;
    }(WorkChain_1.WorkChain);
    exports.LimitCheck = LimitCheck;
    var LimitNorm = function(_super) {
      __extends(LimitNorm, _super);
      function LimitNorm() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LimitNorm.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var id;
          return __generator(this, function(_a) {
            if (param.from) {
              id = param.to.tile.id;
              if (id == param.from.tile.id) {
                cc.log("\u53d6\u6d88", id);
                param.load.push(new GridCmd_1.GridCmd().add(param.from.tile, new TileSelect_1.TileSelect(false)));
                param.from = null;
                param.to = null;
                return [ 2, false ];
              }
            }
            return [ 2, true ];
          });
        });
      };
      return LimitNorm;
    }(WorkChain_1.WorkChain);
    var LimitBlock = function(_super) {
      __extends(LimitBlock, _super);
      function LimitBlock() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LimitBlock.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            if (param.to.tile.group == TileDefine_1.TileGroup.Block) {
              param.to = null;
              return [ 2, false ];
            }
            return [ 2, true ];
          });
        });
      };
      return LimitBlock;
    }(WorkChain_1.WorkChain);
    var LimitItem = function(_super) {
      __extends(LimitItem, _super);
      function LimitItem() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LimitItem.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            if (param.to.tile.group == TileDefine_1.TileGroup.Item && (null == param.from || param.from.tile.group != TileDefine_1.TileGroup.Player)) {
              param.to = null;
              return [ 2, false ];
            }
            return [ 2, true ];
          });
        });
      };
      return LimitItem;
    }(WorkChain_1.WorkChain);
    var LimitSkill = function(_super) {
      __extends(LimitSkill, _super);
      function LimitSkill() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LimitSkill.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            if (param.to.tile.group == TileDefine_1.TileGroup.Skill && (null == param.from || param.from.tile.group != TileDefine_1.TileGroup.Player)) {
              param.to = null;
              return [ 2, false ];
            }
            return [ 2, true ];
          });
        });
      };
      return LimitSkill;
    }(WorkChain_1.WorkChain);
    var LimitEnemy = function(_super) {
      __extends(LimitEnemy, _super);
      function LimitEnemy() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LimitEnemy.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            if (param.to.tile.group == TileDefine_1.TileGroup.Enemy) {
              param.to = null;
              return [ 2, false ];
            }
            return [ 2, true ];
          });
        });
      };
      return LimitEnemy;
    }(WorkChain_1.WorkChain);
    var LimitPlayer = function(_super) {
      __extends(LimitPlayer, _super);
      function LimitPlayer() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LimitPlayer.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var tile, cmd;
          return __generator(this, function(_a) {
            tile = param.to.tile;
            if (tile.group == TileDefine_1.TileGroup.Player && tile.cd > 0) return [ 2, false ];
            if (param.from && tile.group == TileDefine_1.TileGroup.Player) {
              cmd = new GridCmd_1.GridCmd();
              cmd.add(param.from.tile, new TileSelect_1.TileSelect(false));
              cmd.add(tile, new TileSelect_1.TileSelect(true));
              param.load.push(cmd);
              param.from = param.to;
              param.to = null;
              return [ 2, false ];
            }
            return [ 2, true ];
          });
        });
      };
      return LimitPlayer;
    }(WorkChain_1.WorkChain);
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/TileDefine": "TileDefine",
    "../../act/TileSelect": "TileSelect",
    "../../mvc/GridCmd": "GridCmd"
  } ],
  MoveCheck: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "300f4990P5AZoRi8S2qV3li", "MoveCheck");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MoveCheck = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileMove_1 = require("../../act/TileMove");
    var TileSkill_1 = require("../../act/TileSkill");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var MoveCheck = function(_super) {
      __extends(MoveCheck, _super);
      function MoveCheck() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      MoveCheck.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var fromPos, fromTile, toPos, toTile, cmd, res;
          return __generator(this, function(_a) {
            fromPos = param.from.pos;
            fromTile = param.from.tile;
            toPos = param.to.pos;
            toTile = param.to.tile;
            if (fromTile.group == TileDefine_1.TileGroup.Player) {
              cmd = new GridCmd_1.GridCmd();
              res = true;
              switch (toTile.group) {
               case TileDefine_1.TileGroup.Norm:
                cc.log("\u79fb\u52d5", toTile.id, fromPos);
                cmd.add(toTile, new TileMove_1.TileMove(fromPos));
                param.model.setTile(fromPos, toTile);
                break;

               case TileDefine_1.TileGroup.Skill:
                cc.log("\u6280\u80fd", toTile.id, toTile.type);
                cmd.add(toTile, new TileSkill_1.TileSkill(toTile.type));
                param.model.setTile(fromPos, null);
                break;

               default:
                cc.error("\u932f\u8aa4\u7684\u79fb\u52d5\u76ee\u6a19", fromTile.id, toTile.id);
                param.from = null;
                param.to = null;
                res = false;
              }
              if (res) {
                cc.log("\u79fb\u52d5", fromTile.id, toPos);
                cmd.add(fromTile, new TileMove_1.TileMove(toPos));
                param.model.setTile(toPos, fromTile);
              }
              param.load.push(cmd);
              return [ 2, res ];
            }
            return [ 2, true ];
          });
        });
      };
      return MoveCheck;
    }(WorkChain_1.WorkChain);
    exports.MoveCheck = MoveCheck;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/TileDefine": "TileDefine",
    "../../act/TileMove": "TileMove",
    "../../act/TileSkill": "TileSkill",
    "../../mvc/GridCmd": "GridCmd"
  } ],
  NormAtk: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fd3d2AM3MxPEbfyiRLd/F4U", "NormAtk");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NormAtk = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var GridDefine_1 = require("../../../define/GridDefine");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileDie_1 = require("../../act/TileDie");
    var TileHit_1 = require("../../act/TileHit");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var NormAtk = function(_super) {
      __extends(NormAtk, _super);
      function NormAtk() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._param = null;
        _this._cmd = null;
        return _this;
      }
      NormAtk.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var _this = this;
          return __generator(this, function(_a) {
            this._param = param;
            this._cmd = new GridCmd_1.GridCmd();
            param.atkers.forEach(function(atker) {
              return Object.values(GridDefine_1.FOUR_DIR).forEach(function(dir) {
                return _this.attack(atker, dir);
              });
            });
            this._cmd.deed.size > 0 && param.load.push(this._cmd);
            return [ 2, true ];
          });
        });
      };
      NormAtk.prototype.attack = function(atker, offset) {
        var x = atker.pos.x + offset.x;
        var y = atker.pos.y + offset.y;
        var defer = this._param.model.getTile({
          x: x,
          y: y
        });
        if (defer && defer.group == TileDefine_1.TileGroup.Enemy) {
          var damage = atker.atk - defer.def;
          damage = damage.limit(1, atker.atk);
          defer.decHp(damage);
          this._cmd.add(defer, new TileHit_1.TileHit(damage));
          cc.log(atker.id + "\u666e\u653b" + defer.id + ", \u50b7\u5bb3" + damage + ", \u5269\u8840" + defer.currHp, atker.pos, atker.type, defer.pos, defer.type);
          this.dead(defer);
        }
      };
      NormAtk.prototype.dead = function(defer) {
        if (defer.currHp <= 0) {
          this._cmd.add(defer, new TileDie_1.TileDie());
          this._param.model.setTile(defer.pos, null);
          cc.log(defer.id + "\u6b7b\u4ea1", defer.pos);
        }
      };
      return NormAtk;
    }(WorkChain_1.WorkChain);
    exports.NormAtk = NormAtk;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/GridDefine": "GridDefine",
    "../../../define/TileDefine": "TileDefine",
    "../../act/TileDie": "TileDie",
    "../../act/TileHit": "TileHit",
    "../../mvc/GridCmd": "GridCmd"
  } ],
  NormPort: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7141cQTxgJIR6wpliuAoeLc", "NormPort");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NormPort = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var TileDefine_1 = require("../../../define/TileDefine");
    var ComboWork_1 = require("../base/ComboWork");
    var CrushWork_1 = require("../base/CrushWork");
    var DropWork_1 = require("../base/DropWork");
    var SlipWork_1 = require("../base/SlipWork");
    var StuffWork_1 = require("../base/StuffWork");
    var NormAtk_1 = require("../battle/NormAtk");
    var NormPort = function(_super) {
      __extends(NormPort, _super);
      function NormPort() {
        var _this = _super.call(this) || this;
        _this._process = null;
        _this._process = new CrushWork_1.CrushWork();
        _this._process.push(new NormAtk_1.NormAtk());
        _this._process.push(new DropWork_1.DropWork());
        _this._process.push(new StuffWork_1.StuffWork());
        _this._process.push(new SlipWork_1.SlipWork());
        _this._process.push(new ComboWork_1.ComboWork());
        return _this;
      }
      NormPort.prototype.clear = function(param) {
        param.changes = [];
        param.finished = false;
        param.atkers = [];
      };
      NormPort.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.clear(param);
              [ param.first, param.second ].forEach(function(elm) {
                elm && elm.group == TileDefine_1.TileGroup.Norm && param.changes.push(elm.pos);
              });
              _a.label = 1;

             case 1:
              param.finished = false;
              return [ 4, this._process.execute(param) ];

             case 2:
              _a.sent();
              _a.label = 3;

             case 3:
              if (!param.finished) return [ 3, 1 ];
              _a.label = 4;

             case 4:
              return [ 2, true ];
            }
          });
        });
      };
      return NormPort;
    }(WorkChain_1.WorkChain);
    exports.NormPort = NormPort;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/TileDefine": "TileDefine",
    "../base/ComboWork": "ComboWork",
    "../base/CrushWork": "CrushWork",
    "../base/DropWork": "DropWork",
    "../base/SlipWork": "SlipWork",
    "../base/StuffWork": "StuffWork",
    "../battle/NormAtk": "NormAtk"
  } ],
  NumExtend: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9da3fiOvjJBHLJ6VBAtaqTo", "NumExtend");
    Number.prototype.limit = function(min, max) {
      var value = this.valueOf();
      return value >= max ? max : value <= min ? min : value;
    };
    cc._RF.pop();
  }, {} ],
  ObjPool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "db7b8tyFNdBU67twUTGGDzS", "ObjPool");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ObjPool = void 0;
    var Singleton_1 = require("../util/Singleton");
    var ObjPool = function(_super) {
      __extends(ObjPool, _super);
      function ObjPool() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._pool = new Map();
        return _this;
      }
      ObjPool.prototype.onDestroy = function() {
        var _this = this;
        Array.from(this._pool.keys()).forEach(function(key) {
          return _this.clear(key);
        }, this);
        this._pool.clear();
      };
      ObjPool.prototype.clear = function(key) {
        var _a;
        var list = this._pool.get(key);
        if (list) for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
          var item = list_1[_i];
          null === (_a = item) || void 0 === _a ? void 0 : _a.destroy();
          item = null;
        }
        list = [];
        this._pool.delete(key);
      };
      ObjPool.prototype.size = function(key) {
        var _a, _b;
        return null !== (_b = null === (_a = this._pool.get(key)) || void 0 === _a ? void 0 : _a.length) && void 0 !== _b ? _b : 0;
      };
      ObjPool.prototype.fetch = function(key) {
        return this.size(key) > 0 ? this._pool.get(key).shift() : null;
      };
      ObjPool.prototype.recycle = function(key, value) {
        var _a, _b;
        if (key && value) {
          var list = this._pool.get(key);
          if (null == list) {
            list = [];
            this._pool.set(key, list);
          } else if (-1 != list.indexOf(value)) {
            null === (_a = value) || void 0 === _a ? void 0 : _a.destroy();
            value = null;
            return false;
          }
          null === (_b = value) || void 0 === _b ? void 0 : _b.removeFromParent(false);
          list.push(value);
          return true;
        }
        return false;
      };
      return ObjPool;
    }(Singleton_1.Singleton);
    exports.ObjPool = ObjPool;
    cc._RF.pop();
  }, {
    "../util/Singleton": "Singleton"
  } ],
  PlayerPort: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "043eePYxJJAsYkOiTOasC+u", "PlayerPort");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PlayerPort = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var TileDefine_1 = require("../../../define/TileDefine");
    var PlayerPort = function(_super) {
      __extends(PlayerPort, _super);
      function PlayerPort() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PlayerPort.prototype.clear = function(param) {
        param.changes = [];
        param.finished = false;
        param.atkers = [];
      };
      PlayerPort.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            this.clear(param);
            [ param.first, param.second ].forEach(function(elm) {
              if (elm && elm.group == TileDefine_1.TileGroup.Player) {
                elm.cooldown();
                cc.log("\u51b7\u537b", elm.id, elm.cd);
              }
            });
            return [ 2, true ];
          });
        });
      };
      return PlayerPort;
    }(WorkChain_1.WorkChain);
    exports.PlayerPort = PlayerPort;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/TileDefine": "TileDefine"
  } ],
  PrefabCfg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6bb16BgRM5PfJJRz2ZnSfUJ", "PrefabCfg");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PrefabSrc = void 0;
    var PrefabSrc;
    (function(PrefabSrc) {
      PrefabSrc["Tile"] = "prefab/Tile";
    })(PrefabSrc = exports.PrefabSrc || (exports.PrefabSrc = {}));
    cc._RF.pop();
  }, {} ],
  RandUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "79b32YCoAlKLK/buiU4J3UP", "RandUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RandUtil = void 0;
    var RandUtil = function() {
      function RandUtil() {}
      RandUtil.randFloat = function(max, min) {
        void 0 === min && (min = 0);
        return Math.random() * (max - min) + min;
      };
      RandUtil.randInt = function(max, min) {
        void 0 === min && (min = 0);
        return Math.floor(this.randFloat(Math.floor(max), Math.ceil(min)));
      };
      RandUtil.randRate = function(value) {
        return this.randFloat(100) < value;
      };
      RandUtil.randTypes = function(src) {
        return src[this.randInt(src.length)];
      };
      RandUtil.randWeights = function(src) {
        var sum = 0;
        src.forEach(function(weight) {
          return sum += weight;
        });
        var rand = this.randFloat(sum);
        var curr = 0;
        var len = src.length;
        for (var i = 0; i < len; i++) {
          curr += src[i];
          if (curr > rand) return i;
        }
        return len - 1;
      };
      RandUtil.shuffle = function(src) {
        var _a;
        var len = src.length;
        for (var i = 0; i < len; i++) {
          var idx = this.randInt(len);
          _a = [ src[i], src[idx] ], src[idx] = _a[0], src[i] = _a[1];
        }
        return src;
      };
      return RandUtil;
    }();
    exports.RandUtil = RandUtil;
    cc._RF.pop();
  }, {} ],
  ReplayFx: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "810b54UfxdCb7LQo1nXfYSm", "ReplayFx");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ReplayFx = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
    var ReplayFx = function(_super) {
      __extends(ReplayFx, _super);
      function ReplayFx() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.p3d = [];
        _this.p2d = [];
        _this.spines = [];
        _this.anim = [];
        return _this;
      }
      Object.defineProperty(ReplayFx.prototype, "refresh", {
        get: function() {
          return false;
        },
        set: function(value) {
          this.search();
        },
        enumerable: false,
        configurable: true
      });
      ReplayFx.prototype.clear = function() {
        this.p3d = [];
        this.p2d = [];
        this.spines = [];
        this.anim = [];
      };
      ReplayFx.prototype.search = function() {
        this.clear();
        var find = function(type) {
          return this.getComponentsInChildren(type).filter(function(cmpt) {
            return cmpt.enabled;
          });
        }.bind(this);
        this.p3d = find(cc.ParticleSystem3D);
        this.p2d = find(cc.ParticleSystem);
        this.spines = find(sp.Skeleton);
        this.anim = find(cc.Animation);
      };
      ReplayFx.prototype.play = function() {
        this.stop();
        this.p3d.forEach(function(item) {
          return item.play();
        });
        this.p2d.forEach(function(item) {
          return item.resetSystem();
        });
        this.anim.forEach(function(item) {
          return item.play();
        });
        this.spines.forEach(function(item) {
          item.setAnimation(0, item.defaultAnimation, item.loop);
          item.node.active = true;
        });
        this.node.active = true;
      };
      ReplayFx.prototype.stop = function() {
        this.node.active = false;
        this.p3d.forEach(function(item) {
          return item.stop();
        });
        this.p2d.forEach(function(item) {
          return item.stopSystem();
        });
        this.spines.forEach(function(item) {
          return item.node.active = false;
        });
        this.anim.forEach(function(item) {
          return item.stop();
        });
      };
      __decorate([ property(cc.Boolean) ], ReplayFx.prototype, "refresh", null);
      __decorate([ property([ cc.ParticleSystem3D ]) ], ReplayFx.prototype, "p3d", void 0);
      __decorate([ property([ cc.ParticleSystem ]) ], ReplayFx.prototype, "p2d", void 0);
      __decorate([ property([ sp.Skeleton ]) ], ReplayFx.prototype, "spines", void 0);
      __decorate([ property([ cc.Animation ]) ], ReplayFx.prototype, "anim", void 0);
      ReplayFx = __decorate([ ccclass, menu("replay fx") ], ReplayFx);
      return ReplayFx;
    }(cc.Component);
    exports.ReplayFx = ReplayFx;
    cc._RF.pop();
  }, {} ],
  ResetWork: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "600e1k+aphOmqx4z7Jv5v81", "ResetWork");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ResetWork = void 0;
    var GridDefine_1 = require("../../../define/GridDefine");
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var ResetWork = function(_super) {
      __extends(ResetWork, _super);
      function ResetWork() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ResetWork.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            GridDefine_1.FOR_COL_ROW(function(pos) {
              var tile = param.model.getTile(pos);
              tile && tile.clear();
            });
            return [ 2, true ];
          });
        });
      };
      return ResetWork;
    }(WorkChain_1.WorkChain);
    exports.ResetWork = ResetWork;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/GridDefine": "GridDefine"
  } ],
  RuleView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "940daGmeGREIqPxURKgHcuJ", "RuleView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RuleView = void 0;
    var TextureCfg_1 = require("../../../cfg/TextureCfg");
    var AssetMgr_1 = require("../../../comm/asset/AssetMgr");
    var TileDefine_1 = require("../../../define/TileDefine");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RuleView = function(_super) {
      __extends(RuleView, _super);
      function RuleView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.type = null;
        _this.num = null;
        _this._finished = false;
        return _this;
      }
      RuleView.prototype.clear = function() {
        this._finished = false;
        this.node.active = false;
        this.setColor();
      };
      RuleView.prototype.setColor = function() {
        var color = this._finished ? cc.Color.BLACK : cc.Color.WHITE;
        this.type.node.color = color;
        this.num.node.color = color;
      };
      RuleView.prototype.setNum = function(num) {
        this.num.string = "x" + num.limit(0, Number.MAX_VALUE);
        if (num <= 0 && false == this._finished) {
          this._finished = true;
          this.setColor();
        }
      };
      RuleView.prototype.init = function(type, num) {
        return __awaiter(this, void 0, Promise, function() {
          var url, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              this.clear();
              if (!(type != TileDefine_1.TileType.None)) return [ 3, 2 ];
              this.setNum(num);
              url = TextureCfg_1.TextureSrc[TileDefine_1.TileType[type]];
              _a = this.type;
              return [ 4, AssetMgr_1.AssetMgr.inst().loadAsset(url, cc.SpriteFrame, true) ];

             case 1:
              _a.spriteFrame = _b.sent();
              num > 0 && (this.node.active = true);
              _b.label = 2;

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(cc.Sprite) ], RuleView.prototype, "type", void 0);
      __decorate([ property(cc.Label) ], RuleView.prototype, "num", void 0);
      RuleView = __decorate([ ccclass ], RuleView);
      return RuleView;
    }(cc.Component);
    exports.RuleView = RuleView;
    cc._RF.pop();
  }, {
    "../../../cfg/TextureCfg": "TextureCfg",
    "../../../comm/asset/AssetMgr": "AssetMgr",
    "../../../define/TileDefine": "TileDefine"
  } ],
  SecondCheck: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2c31e5ZleBA0rUwsq88kohA", "SecondCheck");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SecondCheck = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileSelect_1 = require("../../act/TileSelect");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var SecondCheck = function(_super) {
      __extends(SecondCheck, _super);
      function SecondCheck() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      SecondCheck.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var cmd, offset;
          return __generator(this, function(_a) {
            cmd = new GridCmd_1.GridCmd();
            offset = Math.abs(param.to.pos.x - param.from.pos.x) + Math.abs(param.to.pos.y - param.from.pos.y);
            if (1 == offset || param.from.tile.group == TileDefine_1.TileGroup.Player) {
              cc.log("\u8907\u9078", param.to.tile.id);
              cmd.add(param.from.tile, new TileSelect_1.TileSelect(false));
              cmd.add(param.to.tile, new TileSelect_1.TileSelect(false));
              param.load.push(cmd);
              return [ 2, true ];
            }
            cc.log("\u91cd\u9078", param.to.tile.id);
            cmd.add(param.from.tile, new TileSelect_1.TileSelect(false));
            cmd.add(param.to.tile, new TileSelect_1.TileSelect(true));
            param.from = param.to;
            param.to = null;
            param.load.push(cmd);
            return [ 2, false ];
          });
        });
      };
      return SecondCheck;
    }(WorkChain_1.WorkChain);
    exports.SecondCheck = SecondCheck;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/TileDefine": "TileDefine",
    "../../act/TileSelect": "TileSelect",
    "../../mvc/GridCmd": "GridCmd"
  } ],
  SelectHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e6b9dQPszZPmLIYxwML5NLk", "SelectHandler");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SelectHandler = void 0;
    var Singleton_1 = require("../../comm/util/Singleton");
    var GridCmd_1 = require("../mvc/GridCmd");
    var GridDefine_1 = require("../../define/GridDefine");
    var PlayerPort_1 = require("./port/PlayerPort");
    var NormPort_1 = require("./port/NormPort");
    var EnemyPort_1 = require("./port/EnemyPort");
    var TileDefine_1 = require("../../define/TileDefine");
    var TileNext_1 = require("../act/TileNext");
    var LimitCheck_1 = require("./check/LimitCheck");
    var FirstCheck_1 = require("./check/FirstCheck");
    var SecondCheck_1 = require("./check/SecondCheck");
    var SwapCheck_1 = require("./check/SwapCheck");
    var MoveCheck_1 = require("./check/MoveCheck");
    var ResetWork_1 = require("./base/ResetWork");
    var SkillPort_1 = require("./port/SkillPort");
    var UltAtk_1 = require("./battle/UltAtk");
    var SelectHandler = function(_super) {
      __extends(SelectHandler, _super);
      function SelectHandler() {
        var _this = _super.call(this) || this;
        _this._from = null;
        _this._check = null;
        _this._port = null;
        _this._ultimate = null;
        _this._check = new LimitCheck_1.LimitCheck();
        _this._check.push(new FirstCheck_1.FirstCheck());
        _this._check.push(new SecondCheck_1.SecondCheck());
        _this._check.push(new SwapCheck_1.SwapCheck());
        _this._check.push(new MoveCheck_1.MoveCheck());
        _this._port = new ResetWork_1.ResetWork();
        _this._port.push(new SkillPort_1.SkillPort());
        _this._port.push(new NormPort_1.NormPort());
        _this._port.push(new PlayerPort_1.PlayerPort());
        _this._port.push(new EnemyPort_1.EnemyPort());
        _this._ultimate = new ResetWork_1.ResetWork();
        _this._ultimate.push(new UltAtk_1.UltAtk());
        _this._ultimate.push(new NormPort_1.NormPort());
        return _this;
      }
      Object.defineProperty(SelectHandler.prototype, "selected", {
        get: function() {
          return this._from ? this._from.pos : null;
        },
        enumerable: false,
        configurable: true
      });
      SelectHandler.prototype.onDestroy = function() {
        this._from = null;
      };
      SelectHandler.prototype.execute = function(model, pos) {
        return __awaiter(this, void 0, Promise, function() {
          var load, param, succeed;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              load = [];
              param = {
                model: model,
                load: load,
                from: this._from,
                to: {
                  pos: pos,
                  tile: model.getTile(pos)
                }
              };
              return [ 4, this._check.execute(param) ];

             case 1:
              succeed = _a.sent();
              this._from = param.from;
              if (!succeed) return [ 3, 4 ];
              return [ 4, this._port.execute({
                model: model,
                load: load,
                first: param.from.tile,
                second: param.to.tile
              }) ];

             case 2:
              _a.sent();
              this._from = null;
              return [ 4, this.nextRound(model, load) ];

             case 3:
              _a.sent();
              _a.label = 4;

             case 4:
              return [ 2, load ];
            }
          });
        });
      };
      SelectHandler.prototype.executeUlt = function(model) {
        return __awaiter(this, void 0, Promise, function() {
          var load;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              load = [];
              return [ 4, this._ultimate.execute({
                model: model,
                load: load,
                first: null,
                second: null
              }) ];

             case 1:
              _a.sent();
              this._from = null;
              return [ 4, this.nextRound(model, load) ];

             case 2:
              _a.sent();
              return [ 2, load ];
            }
          });
        });
      };
      SelectHandler.prototype.nextRound = function(model, load) {
        return __awaiter(this, void 0, Promise, function() {
          var cmd;
          return __generator(this, function(_a) {
            cmd = new GridCmd_1.GridCmd();
            GridDefine_1.FOR_COL_ROW(function(pos) {
              var tile = model.getTile(pos);
              if (tile && (tile.group == TileDefine_1.TileGroup.Player || tile.group == TileDefine_1.TileGroup.Enemy)) {
                tile.nextRound();
                cmd.add(tile, new TileNext_1.TileNext());
              }
            });
            cc.log("\u6b21\u56de");
            cmd.deed.size > 0 && load.push(cmd);
            return [ 2 ];
          });
        });
      };
      return SelectHandler;
    }(Singleton_1.Singleton);
    exports.SelectHandler = SelectHandler;
    cc._RF.pop();
  }, {
    "../../comm/util/Singleton": "Singleton",
    "../../define/GridDefine": "GridDefine",
    "../../define/TileDefine": "TileDefine",
    "../act/TileNext": "TileNext",
    "../mvc/GridCmd": "GridCmd",
    "./base/ResetWork": "ResetWork",
    "./battle/UltAtk": "UltAtk",
    "./check/FirstCheck": "FirstCheck",
    "./check/LimitCheck": "LimitCheck",
    "./check/MoveCheck": "MoveCheck",
    "./check/SecondCheck": "SecondCheck",
    "./check/SwapCheck": "SwapCheck",
    "./port/EnemyPort": "EnemyPort",
    "./port/NormPort": "NormPort",
    "./port/PlayerPort": "PlayerPort",
    "./port/SkillPort": "SkillPort"
  } ],
  SfxAudio: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "99caf4m2qFHkYEIv77izdO1", "SfxAudio");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SfxAudio = void 0;
    var AssetMgr_1 = require("../asset/AssetMgr");
    var Singleton_1 = require("../util/Singleton");
    var SfxAudio = function(_super) {
      __extends(SfxAudio, _super);
      function SfxAudio() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(SfxAudio.prototype, "vol", {
        get: function() {
          return cc.audioEngine.getEffectsVolume();
        },
        set: function(value) {
          cc.audioEngine.setEffectsVolume(value.limit(0, 1));
        },
        enumerable: false,
        configurable: true
      });
      SfxAudio.prototype.onDestroy = function() {};
      SfxAudio.prototype.play = function(audio, done) {
        return __awaiter(this, void 0, Promise, function() {
          var src, _a, id;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              if (!(audio instanceof cc.AudioClip)) return [ 3, 1 ];
              _a = audio;
              return [ 3, 3 ];

             case 1:
              return [ 4, AssetMgr_1.AssetMgr.inst().loadAsset(audio, cc.AudioClip, true) ];

             case 2:
              _a = _b.sent();
              _b.label = 3;

             case 3:
              src = _a;
              id = cc.audioEngine.playEffect(src, false);
              done && cc.audioEngine.setFinishCallback(id, done);
              return [ 2, id ];
            }
          });
        });
      };
      SfxAudio.prototype.stop = function(id) {
        cc.audioEngine.stopEffect(id);
      };
      SfxAudio.prototype.stopAll = function() {
        cc.audioEngine.stopAllEffects();
      };
      SfxAudio.prototype.pause = function(id) {
        cc.audioEngine.pauseEffect(id);
      };
      SfxAudio.prototype.pauseAll = function() {
        cc.audioEngine.pauseAllEffects();
      };
      SfxAudio.prototype.resume = function(id) {
        cc.audioEngine.resumeEffect(id);
      };
      SfxAudio.prototype.resumeAll = function() {
        cc.audioEngine.resumeAllEffects();
      };
      return SfxAudio;
    }(Singleton_1.Singleton);
    exports.SfxAudio = SfxAudio;
    cc._RF.pop();
  }, {
    "../asset/AssetMgr": "AssetMgr",
    "../util/Singleton": "Singleton"
  } ],
  SimulateFx: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "81e43e21cpOopyvA3GZGZo2", "SimulateFx");
    "use strict";
    false;
    cc._RF.pop();
  }, {} ],
  Singleton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6e9781YJWxMvL+U3Auu6onm", "Singleton");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Singleton = void 0;
    var Singleton = function() {
      function Singleton() {}
      Singleton.inst = function() {
        var _a;
        var _b;
        null !== (_a = (_b = this)._inst) && void 0 !== _a ? _a : _b._inst = new this();
        return this._inst;
      };
      Singleton.destroy = function() {
        this._inst.onDestroy();
        this._inst = null;
      };
      return Singleton;
    }();
    exports.Singleton = Singleton;
    cc._RF.pop();
  }, {} ],
  SkillAtk: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f0fa5uJFjhFiYE+qkkYZA8r", "SkillAtk");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SkillAtk = void 0;
    var RandUtil_1 = require("../../../comm/util/RandUtil");
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileDie_1 = require("../../act/TileDie");
    var TileHit_1 = require("../../act/TileHit");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var SkillAtk = function(_super) {
      __extends(SkillAtk, _super);
      function SkillAtk() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._param = null;
        _this._cmd = null;
        return _this;
      }
      SkillAtk.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var _this = this;
          return __generator(this, function(_a) {
            this._param = param;
            this._cmd = new GridCmd_1.GridCmd();
            param.atkers.forEach(function(atker) {
              switch (atker.type) {
               case TileDefine_1.TileType.Cross:
                _this.cross(atker);
                break;

               case TileDefine_1.TileType.Thunder:
                _this.thunder(atker);
                break;

               case TileDefine_1.TileType.Cyclone:
                _this.cyclone(atker);
              }
            });
            this._cmd.deed.size > 0 && param.load.push(this._cmd);
            return [ 2, true ];
          });
        });
      };
      SkillAtk.prototype.cross = function(atker) {
        for (var x = -3; x <= 3; x++) for (var y = -3; y <= 3; y++) this.attack(atker, {
          x: x,
          y: y
        });
      };
      SkillAtk.prototype.thunder = function(atker) {
        var ay = RandUtil_1.RandUtil.shuffle(this._param.model.enemies);
        var max = ay.length.limit(0, 3);
        for (var i = 0; i < max; i++) {
          var defer = ay.shift();
          this.attack(atker, {
            x: defer.pos.x - atker.pos.x,
            y: defer.pos.y - atker.pos.y
          });
        }
      };
      SkillAtk.prototype.cyclone = function(atker) {
        for (var x = -1; x <= 1; x++) for (var y = -1; y <= 1; y++) this.attack(atker, {
          x: x,
          y: y
        });
      };
      SkillAtk.prototype.attack = function(atker, offset) {
        var x = atker.pos.x + offset.x;
        var y = atker.pos.y + offset.y;
        var defer = this._param.model.getTile({
          x: x,
          y: y
        });
        if (defer) {
          var damage = 0;
          switch (defer.group) {
           case TileDefine_1.TileGroup.Enemy:
            damage = atker.atk - defer.def;
            damage = damage.limit(1, atker.atk);
            break;

           case TileDefine_1.TileGroup.Block:
            damage = 1;
          }
          defer.decHp(damage);
          this._cmd.add(defer, new TileHit_1.TileHit(damage));
          cc.log(atker.id + "\u7279\u653b" + defer.id + ", \u50b7\u5bb3" + damage + ", \u5269\u8840" + defer.currHp, atker.pos, atker.type, defer.pos, defer.type);
          this.dead(defer);
        }
      };
      SkillAtk.prototype.dead = function(defer) {
        if (defer.currHp <= 0) {
          this._cmd.add(defer, new TileDie_1.TileDie());
          this._param.model.setTile(defer.pos, null);
          cc.log(defer.id + "\u6b7b\u4ea1", defer.pos);
        }
      };
      return SkillAtk;
    }(WorkChain_1.WorkChain);
    exports.SkillAtk = SkillAtk;
    cc._RF.pop();
  }, {
    "../../../comm/util/RandUtil": "RandUtil",
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/TileDefine": "TileDefine",
    "../../act/TileDie": "TileDie",
    "../../act/TileHit": "TileHit",
    "../../mvc/GridCmd": "GridCmd"
  } ],
  SkillPort: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2276fICGTVFdL7TghRb2rbL", "SkillPort");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SkillPort = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var TileDefine_1 = require("../../../define/TileDefine");
    var SkillAtk_1 = require("../battle/SkillAtk");
    var SkillPort = function(_super) {
      __extends(SkillPort, _super);
      function SkillPort() {
        var _this = _super.call(this) || this;
        _this._process = null;
        _this._process = new SkillAtk_1.SkillAtk();
        return _this;
      }
      SkillPort.prototype.clear = function(param) {
        param.changes = [];
        param.finished = false;
        param.atkers = [];
      };
      SkillPort.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.clear(param);
              [ param.first, param.second ].forEach(function(elm) {
                elm && elm.group == TileDefine_1.TileGroup.Skill && param.atkers.push(elm);
              });
              if (!(param.atkers.length > 0)) return [ 3, 2 ];
              return [ 4, this._process.execute(param) ];

             case 1:
              _a.sent();
              _a.label = 2;

             case 2:
              return [ 2, true ];
            }
          });
        });
      };
      return SkillPort;
    }(WorkChain_1.WorkChain);
    exports.SkillPort = SkillPort;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/TileDefine": "TileDefine",
    "../battle/SkillAtk": "SkillAtk"
  } ],
  SlipWork: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "367acxTfcxPGqvBcT+FN7Io", "SlipWork");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SlipWork = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var GridDefine_1 = require("../../../define/GridDefine");
    var TileSlip_1 = require("../../act/TileSlip");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var DropWork_1 = require("./DropWork");
    var StuffWork_1 = require("./StuffWork");
    var SlipWork = function(_super) {
      __extends(SlipWork, _super);
      function SlipWork() {
        var _this = _super.call(this) || this;
        _this._param = null;
        _this._process = null;
        _this._process = new DropWork_1.DropWork();
        _this._process.push(new StuffWork_1.StuffWork());
        return _this;
      }
      SlipWork.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var y, x, begin, tile, right, left;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this._param = param;
              y = 0;
              _a.label = 1;

             case 1:
              if (!(y < GridDefine_1.GRID_ROW)) return [ 3, 8 ];
              x = 0;
              _a.label = 2;

             case 2:
              if (!(x < GridDefine_1.GRID_COL)) return [ 3, 7 ];
              begin = {
                x: x,
                y: y
              };
              tile = param.model.getTile(begin);
              if (null == tile || tile.hold) return [ 3, 6 ];
              right = this.searchR(begin);
              if (!(right.length > 0)) return [ 3, 4 ];
              this.slip(tile, right);
              return [ 4, this._process.execute(param, x) ];

             case 3:
              _a.sent();
              return [ 3, 6 ];

             case 4:
              left = this.searchL(begin);
              if (!(left.length > 0)) return [ 3, 6 ];
              this.slip(tile, left);
              return [ 4, this._process.execute(param, x) ];

             case 5:
              _a.sent();
              return [ 3, 6 ];

             case 6:
              x++;
              return [ 3, 2 ];

             case 7:
              y++;
              return [ 3, 1 ];

             case 8:
              return [ 2, true ];
            }
          });
        });
      };
      SlipWork.prototype.searchR = function(pos) {
        return this.search({
          x: pos.x + 1,
          y: pos.y - 1
        });
      };
      SlipWork.prototype.searchL = function(pos) {
        return this.search({
          x: pos.x - 1,
          y: pos.y - 1
        });
      };
      SlipWork.prototype.search = function(pos) {
        var path = [];
        if (pos.x < 0 || pos.x >= GridDefine_1.GRID_COL || pos.y < 0 || pos.y >= GridDefine_1.GRID_ROW) return path;
        var tile = this._param.model.getTile(pos);
        if (null == tile) {
          path.push(pos);
          var right = this.searchR(pos);
          if (right && right.length > 0) {
            path = path.concat(right);
            return path;
          }
          var left = this.searchL(pos);
          if (left && left.length > 0) {
            path = path.concat(left);
            return path;
          }
        }
        return path;
      };
      SlipWork.prototype.slip = function(tile, path) {
        var cmd = new GridCmd_1.GridCmd();
        cmd.add(tile, new TileSlip_1.TileSlip(path));
        var begin = tile.pos;
        var end = path[path.length - 1];
        this._param.model.setTile(end, tile);
        this._param.model.setTile(begin, null);
        this._param.changes.push(end);
        cc.log("\u5074\u6ed1", tile.id, end, path);
        this._param.load.push(cmd);
      };
      return SlipWork;
    }(WorkChain_1.WorkChain);
    exports.SlipWork = SlipWork;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/GridDefine": "GridDefine",
    "../../act/TileSlip": "TileSlip",
    "../../mvc/GridCmd": "GridCmd",
    "./DropWork": "DropWork",
    "./StuffWork": "StuffWork"
  } ],
  SpinCfg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c154aeIMtpKOahrfstnULHR", "SpinCfg");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SpineSrc = void 0;
    var SpineSrc;
    (function(SpineSrc) {
      SpineSrc["None"] = "";
    })(SpineSrc = exports.SpineSrc || (exports.SpineSrc = {}));
    cc._RF.pop();
  }, {} ],
  Spine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08714MdqEBH0IBaVGzgaQ16", "Spine");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Spine = void 0;
    var AssetMgr_1 = require("../asset/AssetMgr");
    var WaitUtil_1 = require("../util/WaitUtil");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, menu = _a.menu;
    var Spine = function(_super) {
      __extends(Spine, _super);
      function Spine() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._spine = null;
        return _this;
      }
      Spine_1 = Spine;
      Object.defineProperty(Spine.prototype, "spine", {
        get: function() {
          var _a;
          return null !== (_a = this._spine) && void 0 !== _a ? _a : this._spine = this.getComponent(sp.Skeleton);
        },
        enumerable: false,
        configurable: true
      });
      Spine.prototype.onLoad = function() {
        this._spine = this.getComponent(sp.Skeleton);
      };
      Spine.prototype.init = function(data) {
        return __awaiter(this, void 0, Promise, function() {
          var src, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              if (!(data instanceof sp.SkeletonData)) return [ 3, 1 ];
              _a = data;
              return [ 3, 3 ];

             case 1:
              return [ 4, AssetMgr_1.AssetMgr.inst().loadAsset(data, sp.SkeletonData, true) ];

             case 2:
              _a = _b.sent();
              _b.label = 3;

             case 3:
              src = _a;
              this.spine.skeletonData = src;
              return [ 2 ];
            }
          });
        });
      };
      Spine.prototype.scale = function(scale) {
        this.spine.timeScale = scale;
      };
      Spine.prototype.stop = function() {
        this.spine.clearTrack(Spine_1.TRACK);
        this.spine.setToSetupPose();
        this.resume();
      };
      Spine.prototype.pause = function() {
        this.spine.paused = true;
      };
      Spine.prototype.resume = function() {
        this.spine.paused = false;
      };
      Spine.prototype.listen = function(entry, action) {
        entry && action && this.spine.setTrackEventListener(entry, function(entry, event) {
          return action(event.data.name);
        });
      };
      Spine.prototype.playOnce = function(key, event) {
        void 0 === key && (key = this.spine.defaultAnimation);
        return __awaiter(this, void 0, Promise, function() {
          var entry;
          var _this = this;
          return __generator(this, function(_a) {
            this.stop();
            entry = this.spine.setAnimation(Spine_1.TRACK, key, false);
            this.listen(entry, event);
            return [ 2, new Promise(function(resolve) {
              return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  switch (_a.label) {
                   case 0:
                    return [ 4, WaitUtil_1.WaitUtil.waitSec(entry.animation.duration, this.spine) ];

                   case 1:
                    _a.sent();
                    resolve();
                    return [ 2 ];
                  }
                });
              });
            }) ];
          });
        });
      };
      Spine.prototype.playLoop = function(key, event) {
        void 0 === key && (key = this.spine.defaultAnimation);
        this.stop();
        this.listen(this.spine.setAnimation(Spine_1.TRACK, key, true), event);
      };
      Spine.prototype.playSteps = function(keys, event) {
        return __awaiter(this, void 0, Promise, function() {
          var time;
          var _this = this;
          return __generator(this, function(_a) {
            this.stop();
            time = 0;
            keys.forEach(function(key) {
              var entry = _this.spine.setAnimation(Spine_1.TRACK, key, false);
              _this.listen(entry, event);
              time += entry.animation.duration;
            }, this);
            if (time > 0) return [ 2, new Promise(function(resolve) {
              return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  switch (_a.label) {
                   case 0:
                    return [ 4, WaitUtil_1.WaitUtil.waitSec(time, this.spine) ];

                   case 1:
                    _a.sent();
                    resolve();
                    return [ 2 ];
                  }
                });
              });
            }) ];
            return [ 2 ];
          });
        });
      };
      Spine.prototype.contain = function(bone, node) {
        var nodes = this.spine.attachUtil.generateAttachedNodes(bone);
        nodes && nodes.length > 0 && (node.parent = nodes[0]);
      };
      var Spine_1;
      Spine.TRACK = 99;
      Spine = Spine_1 = __decorate([ ccclass, requireComponent(sp.Skeleton), menu("spine") ], Spine);
      return Spine;
    }(cc.Component);
    exports.Spine = Spine;
    cc._RF.pop();
  }, {
    "../asset/AssetMgr": "AssetMgr",
    "../util/WaitUtil": "WaitUtil"
  } ],
  StageCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "986b6jCmJVPk5A8nf9uXyUO", "StageCtrl");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StageCtrl = void 0;
    var GameDefine_1 = require("../../../define/GameDefine");
    var StageModel_1 = require("../model/StageModel");
    var StageView_1 = require("../view/StageView");
    var GridCtrl_1 = require("./GridCtrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StageCtrl = function(_super) {
      __extends(StageCtrl, _super);
      function StageCtrl() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._model = null;
        _this._view = null;
        return _this;
      }
      StageCtrl_1 = StageCtrl;
      Object.defineProperty(StageCtrl, "inst", {
        get: function() {
          return this._inst;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(StageCtrl.prototype, "data", {
        get: function() {
          return this._model.data;
        },
        enumerable: false,
        configurable: true
      });
      StageCtrl.prototype.onLoad = function() {
        StageCtrl_1._inst = this;
      };
      StageCtrl.prototype.onEnable = function() {
        this._model = new StageModel_1.StageModel();
        this._view = this.getComponentInChildren(StageView_1.StageView);
        this._view.init(this._model);
      };
      StageCtrl.prototype.start = function() {
        this._model.setLv(GameDefine_1.START_STAGE);
        GridCtrl_1.GridCtrl.inst.fight();
      };
      StageCtrl.prototype.onDestroy = function() {
        this._model = null;
      };
      var StageCtrl_1;
      StageCtrl._inst = null;
      StageCtrl = StageCtrl_1 = __decorate([ ccclass ], StageCtrl);
      return StageCtrl;
    }(cc.Component);
    exports.StageCtrl = StageCtrl;
    cc._RF.pop();
  }, {
    "../../../define/GameDefine": "GameDefine",
    "../model/StageModel": "StageModel",
    "../view/StageView": "StageView",
    "./GridCtrl": "GridCtrl"
  } ],
  StageModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "454dbsV8rdHl7uShXyaUZXT", "StageModel");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StageModel = void 0;
    var DataDriven_1 = require("../../../comm/util/DataDriven");
    var GameDefine_1 = require("../../../define/GameDefine");
    var StageModel = function() {
      function StageModel() {
        var _this = this;
        this.lv = new DataDriven_1.DataDriven(0);
        this.rules = new Map();
        this.lv.on(function(lv) {
          cc.log("\u5347\u7d1a", lv);
          _this.resetRules();
        });
      }
      Object.defineProperty(StageModel.prototype, "data", {
        get: function() {
          return GameDefine_1.STAGE_RULE[this.lv.value.limit(1, GameDefine_1.MAX_STAGE)];
        },
        enumerable: false,
        configurable: true
      });
      StageModel.prototype.incLv = function(value) {
        void 0 === value && (value = 1);
        return this.setLv(this.lv.value + value);
      };
      StageModel.prototype.setLv = function(value) {
        this.lv.value = value;
        return value;
      };
      StageModel.prototype.resetRules = function() {
        var _this = this;
        var data = this.data.pass;
        var keys = Object.keys(data);
        var values = Object.values(data);
        this.rules.clear();
        keys.forEach(function(elm, idx) {
          return _this.rules.set(+elm, +values[idx]);
        }, this);
      };
      return StageModel;
    }();
    exports.StageModel = StageModel;
    cc._RF.pop();
  }, {
    "../../../comm/util/DataDriven": "DataDriven",
    "../../../define/GameDefine": "GameDefine"
  } ],
  StageView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62e50XJb9JPRIqvh1JCj1Wd", "StageView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StageView = void 0;
    var RuleView_1 = require("./RuleView");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StageView = function(_super) {
      __extends(StageView, _super);
      function StageView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lv = null;
        _this.rules = [];
        return _this;
      }
      StageView.prototype.init = function(model) {
        var _this = this;
        model.lv.on(function(lv) {
          _this.lv.string = lv;
          var data = model.data.pass;
          var keys = Object.keys(data);
          var values = Object.values(data);
          _this.rules.forEach(function(rule) {
            var _a, _b;
            var type = null !== (_a = keys.shift()) && void 0 !== _a ? _a : 0;
            var num = null !== (_b = values.shift()) && void 0 !== _b ? _b : 0;
            rule.init(type, num);
          });
        });
      };
      __decorate([ property(cc.Label) ], StageView.prototype, "lv", void 0);
      __decorate([ property([ RuleView_1.RuleView ]) ], StageView.prototype, "rules", void 0);
      StageView = __decorate([ ccclass ], StageView);
      return StageView;
    }(cc.Component);
    exports.StageView = StageView;
    cc._RF.pop();
  }, {
    "./RuleView": "RuleView"
  } ],
  StrExtend: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4625bxA4ShArqK9d0U3lpKY", "StrExtend");
    String.prototype.format = function() {
      var params = [];
      for (var _i = 0; _i < arguments.length; _i++) params[_i] = arguments[_i];
      return this.replace(/\{(\d+)\}/g, function(src, idx) {
        return params[idx];
      });
    };
    String.prototype.exchange = function(passive, active) {
      return this.replace(new RegExp(passive, "gm"), active);
    };
    cc._RF.pop();
  }, {} ],
  StuffWork: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "885fdWjj1VM0JBwY5xiDr5B", "StuffWork");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StuffWork = void 0;
    var GridDefine_1 = require("../../../define/GridDefine");
    var TileFall_1 = require("../../act/TileFall");
    var TileSpawn_1 = require("../../act/TileSpawn");
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var TileModel_1 = require("../../mvc/model/TileModel");
    var StuffWork = function(_super) {
      __extends(StuffWork, _super);
      function StuffWork() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      StuffWork.prototype.business = function(param, col) {
        return __awaiter(this, void 0, Promise, function() {
          var cmd;
          return __generator(this, function(_a) {
            cmd = param.load[param.load.length - 1];
            GridDefine_1.FOR_COL(function(x) {
              if (col && col != x) return;
              var count = 0;
              var top = 0;
              for (var i = GridDefine_1.GRID_ROW - 1; i >= 0; i--) {
                var pos = {
                  x: x,
                  y: i
                };
                var tile = param.model.getTile(pos);
                if (tile && tile.hold) {
                  top = i;
                  break;
                }
              }
              for (var i = top; i < GridDefine_1.GRID_ROW; i++) {
                var end = {
                  x: x,
                  y: i
                };
                var space = param.model.getTile(end);
                if (null == space) {
                  var tile = new TileModel_1.TileModel();
                  param.model.setTile(end, tile);
                  tile.type = param.model.getRandType();
                  tile.entry = {
                    x: x,
                    y: GridDefine_1.GRID_ROW + count++
                  };
                  cmd.add(tile, new TileSpawn_1.TileSpawn());
                  cmd.add(tile, new TileFall_1.TileFall(end));
                  param.changes.push(end);
                  cc.log("\u586b\u88dc", tile.id, tile.type, end);
                }
              }
            });
            return [ 2, true ];
          });
        });
      };
      return StuffWork;
    }(WorkChain_1.WorkChain);
    exports.StuffWork = StuffWork;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/GridDefine": "GridDefine",
    "../../act/TileFall": "TileFall",
    "../../act/TileSpawn": "TileSpawn",
    "../../mvc/model/TileModel": "TileModel"
  } ],
  SwapCheck: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "49fd5kpFr1Ikpz4WkzZFYRC", "SwapCheck");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SwapCheck = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileSwap_1 = require("../../act/TileSwap");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var SwapCheck = function(_super) {
      __extends(SwapCheck, _super);
      function SwapCheck() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      SwapCheck.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var res;
          return __generator(this, function(_a) {
            if (param.from.tile.group == TileDefine_1.TileGroup.Norm) {
              this.swap(param);
              res = param.model.isCrush(param.from.pos);
              res || (res = param.model.isCrush(param.to.pos));
              if (false == res) {
                cc.log("\u5931\u6557", param.from.tile.id, param.to.tile.id);
                this.swap(param);
                param.from = null;
                param.to = null;
                return [ 2, false ];
              }
            }
            return [ 2, true ];
          });
        });
      };
      SwapCheck.prototype.swap = function(param) {
        cc.log("\u4e92\u63db", param.from.tile.id, param.to.tile.id);
        var cmd = new GridCmd_1.GridCmd();
        cmd.add(param.from.tile, new TileSwap_1.TileSwap(param.to.pos));
        cmd.add(param.to.tile, new TileSwap_1.TileSwap(param.from.pos));
        param.load.push(cmd);
        param.model.setTile(param.from.pos, param.to.tile);
        param.model.setTile(param.to.pos, param.from.tile);
        var temp = param.from.pos;
        param.from.pos = param.to.pos;
        param.to.pos = temp;
      };
      return SwapCheck;
    }(WorkChain_1.WorkChain);
    exports.SwapCheck = SwapCheck;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/TileDefine": "TileDefine",
    "../../act/TileSwap": "TileSwap",
    "../../mvc/GridCmd": "GridCmd"
  } ],
  TextureCfg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9df0efpjLJF5J9C+ixMeHm+", "TextureCfg");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TextureSrc = void 0;
    var TextureSrc;
    (function(TextureSrc) {
      TextureSrc["Blue"] = "texture/tile/blue";
      TextureSrc["Green"] = "texture/tile/green";
      TextureSrc["Red"] = "texture/tile/red";
      TextureSrc["Yellow"] = "texture/tile/yellow";
      TextureSrc["Stone"] = "texture/tile/stone";
      TextureSrc["Rock"] = "texture/tile/rock";
      TextureSrc["Potion"] = "texture/tile/potion";
      TextureSrc["Cross"] = "texture/tile/cross";
      TextureSrc["Thunder"] = "texture/tile/thunder";
      TextureSrc["Cyclone"] = "texture/tile/cyclone";
      TextureSrc["Warrior"] = "texture/tile/warrior";
      TextureSrc["Archer"] = "texture/tile/archer";
      TextureSrc["Armor"] = "texture/tile/armor";
      TextureSrc["Hero"] = "texture/tile/hero";
      TextureSrc["PlayerHp"] = "texture/tile/hp-green";
      TextureSrc["EnemyHp"] = "texture/tile/hp-red";
    })(TextureSrc = exports.TextureSrc || (exports.TextureSrc = {}));
    cc._RF.pop();
  }, {} ],
  TileCrush: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bc90dA8FS1N9b8WDSF8KC5q", "TileCrush");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileCrush = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileCrush = function(_super) {
      __extends(TileCrush, _super);
      function TileCrush() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(TileCrush.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Crush;
        },
        enumerable: false,
        configurable: true
      });
      return TileCrush;
    }(GridCmd_1.TilePlay);
    exports.TileCrush = TileCrush;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  TileDefine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "26803Rs0JVLDKDkgx5EFssX", "TileDefine");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NULL_TILE = exports.TileAct = exports.TILE_GROUP_IS = exports.NORM_TILE = exports.TileType = exports.TileGroup = exports.TILE_H = exports.TILE_W = void 0;
    var TileModel_1 = require("../game/mvc/model/TileModel");
    exports.TILE_W = 96;
    exports.TILE_H = 96;
    var TileGroup;
    (function(TileGroup) {
      TileGroup[TileGroup["Norm"] = 0] = "Norm";
      TileGroup[TileGroup["Block"] = 1] = "Block";
      TileGroup[TileGroup["Item"] = 2] = "Item";
      TileGroup[TileGroup["Skill"] = 3] = "Skill";
      TileGroup[TileGroup["Enemy"] = 4] = "Enemy";
      TileGroup[TileGroup["Player"] = 5] = "Player";
      TileGroup[TileGroup["None"] = 9] = "None";
    })(TileGroup = exports.TileGroup || (exports.TileGroup = {}));
    var TileType;
    (function(TileType) {
      TileType[TileType["Blue"] = 0] = "Blue";
      TileType[TileType["Green"] = 1] = "Green";
      TileType[TileType["Red"] = 2] = "Red";
      TileType[TileType["Yellow"] = 3] = "Yellow";
      TileType[TileType["Stone"] = 100] = "Stone";
      TileType[TileType["Rock"] = 101] = "Rock";
      TileType[TileType["Potion"] = 200] = "Potion";
      TileType[TileType["Cross"] = 300] = "Cross";
      TileType[TileType["Thunder"] = 301] = "Thunder";
      TileType[TileType["Cyclone"] = 302] = "Cyclone";
      TileType[TileType["Warrior"] = 400] = "Warrior";
      TileType[TileType["Archer"] = 401] = "Archer";
      TileType[TileType["Armor"] = 402] = "Armor";
      TileType[TileType["Hero"] = 500] = "Hero";
      TileType[TileType["None"] = 999] = "None";
    })(TileType = exports.TileType || (exports.TileType = {}));
    exports.NORM_TILE = {
      min: TileType.Blue,
      max: TileType.Yellow
    };
    var TILE_GROUP_IS = function(type) {
      return Math.floor(type / 100);
    };
    exports.TILE_GROUP_IS = TILE_GROUP_IS;
    var TileAct;
    (function(TileAct) {
      TileAct[TileAct["Spawn"] = 0] = "Spawn";
      TileAct[TileAct["Fall"] = 1] = "Fall";
      TileAct[TileAct["Select"] = 2] = "Select";
      TileAct[TileAct["Swap"] = 3] = "Swap";
      TileAct[TileAct["Crush"] = 4] = "Crush";
      TileAct[TileAct["Trans"] = 5] = "Trans";
      TileAct[TileAct["Wait"] = 6] = "Wait";
      TileAct[TileAct["Move"] = 7] = "Move";
      TileAct[TileAct["Slip"] = 8] = "Slip";
      TileAct[TileAct["Hit"] = 9] = "Hit";
      TileAct[TileAct["Die"] = 10] = "Die";
      TileAct[TileAct["Next"] = 11] = "Next";
      TileAct[TileAct["Skill"] = 12] = "Skill";
    })(TileAct = exports.TileAct || (exports.TileAct = {}));
    exports.NULL_TILE = new TileModel_1.TileModel(-1);
    cc._RF.pop();
  }, {
    "../game/mvc/model/TileModel": "TileModel"
  } ],
  TileDie: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "26723JtucxMjow/dr2SP1Ue", "TileDie");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileDie = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileDie = function(_super) {
      __extends(TileDie, _super);
      function TileDie() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(TileDie.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Die;
        },
        enumerable: false,
        configurable: true
      });
      return TileDie;
    }(GridCmd_1.TilePlay);
    exports.TileDie = TileDie;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  TileFall: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d3a2eEov51PbJtErpAbA9qL", "TileFall");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileFall = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileFall = function(_super) {
      __extends(TileFall, _super);
      function TileFall(target) {
        var _this = _super.call(this) || this;
        _this.target = null;
        _this.target = target;
        return _this;
      }
      Object.defineProperty(TileFall.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Fall;
        },
        enumerable: false,
        configurable: true
      });
      return TileFall;
    }(GridCmd_1.TilePlay);
    exports.TileFall = TileFall;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  TileHit: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "81e1ds1ixlA4b+yu/2w7KVO", "TileHit");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileHit = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileHit = function(_super) {
      __extends(TileHit, _super);
      function TileHit(damage) {
        var _this = _super.call(this) || this;
        _this.damage = 0;
        _this.damage = damage;
        return _this;
      }
      Object.defineProperty(TileHit.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Hit;
        },
        enumerable: false,
        configurable: true
      });
      return TileHit;
    }(GridCmd_1.TilePlay);
    exports.TileHit = TileHit;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  TileModelBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8661bpbMbtJ2LSJ2CrpIfqc", "TileModelBase");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileModelBase = void 0;
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileModelBase = function() {
      function TileModelBase(id) {
        void 0 === id && (id = TileModelBase.counter);
        this.id = -1;
        this._type = TileDefine_1.TileType.None;
        this.group = TileDefine_1.TileGroup.Norm;
        this._pos = {
          x: -1,
          y: -1
        };
        this.entry = {
          x: -1,
          y: -1
        };
        this.id = id;
      }
      Object.defineProperty(TileModelBase, "counter", {
        get: function() {
          return this._counter++;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TileModelBase.prototype, "type", {
        get: function() {
          return this._type;
        },
        set: function(value) {
          this.setType(value);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TileModelBase.prototype, "pos", {
        get: function() {
          return this._pos;
        },
        set: function(value) {
          this.setPos(value);
        },
        enumerable: false,
        configurable: true
      });
      TileModelBase.prototype.setType = function(type) {
        this._type = type;
        this.group = TileDefine_1.TILE_GROUP_IS(this._type);
      };
      TileModelBase.prototype.setPos = function(pos) {
        this._pos = pos;
        this.entry = pos;
      };
      TileModelBase.prototype.toString = function() {
        var id = (Array(3).join(" ") + this.id).slice(-3);
        var type = (Array(3).join(" ") + this.type).slice(-3);
        return this.type != TileDefine_1.TileType.None ? id + "(" + type + ")" : "xxx(xxx)";
      };
      TileModelBase._counter = 0;
      return TileModelBase;
    }();
    exports.TileModelBase = TileModelBase;
    cc._RF.pop();
  }, {
    "../../../define/TileDefine": "TileDefine"
  } ],
  TileModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "de0633qvGpDqZK3sNBY+uLA", "TileModel");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileModel = void 0;
    var GameDefine_1 = require("../../../define/GameDefine");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileModelBase_1 = require("./TileModelBase");
    var TileModel = function(_super) {
      __extends(TileModel, _super);
      function TileModel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.crushed = false;
        _this.hold = false;
        _this._trans = TileDefine_1.TileType.None;
        _this.maxHp = 0;
        _this.currHp = 0;
        _this.cd = 0;
        _this.manage = null;
        return _this;
      }
      Object.defineProperty(TileModel.prototype, "trans", {
        get: function() {
          return this._trans;
        },
        set: function(value) {
          this.setTrans(value);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TileModel.prototype, "_data", {
        get: function() {
          return GameDefine_1.ROLE_TABLE[this._type];
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TileModel.prototype, "dead", {
        get: function() {
          return this.currHp <= 0;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TileModel.prototype, "atk", {
        get: function() {
          var _a;
          return null !== (_a = this._data.atk) && void 0 !== _a ? _a : 0;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TileModel.prototype, "def", {
        get: function() {
          var _a;
          return null !== (_a = this._data.def) && void 0 !== _a ? _a : 0;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TileModel.prototype, "dex", {
        get: function() {
          var _a;
          return null !== (_a = this._data.dex) && void 0 !== _a ? _a : 0;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TileModel.prototype, "energy", {
        get: function() {
          var _a;
          return null !== (_a = this._data.energy) && void 0 !== _a ? _a : 0;
        },
        enumerable: false,
        configurable: true
      });
      TileModel.prototype.clear = function() {
        this.crushed = false;
        this._trans = TileDefine_1.TileType.None;
      };
      TileModel.prototype.setType = function(type) {
        _super.prototype.setType.call(this, type);
        this.crushed = false;
        this.hold = this.group == TileDefine_1.TileGroup.Block;
        this.fullHp();
        this.cooldown();
        this.manage && this.manage(this);
      };
      TileModel.prototype.setTrans = function(type) {
        this._trans = type;
        this.crushed = false;
      };
      TileModel.prototype.nextRound = function() {
        var _a;
        this.cd = (--this.cd).limit(0, null !== (_a = this._data.cd) && void 0 !== _a ? _a : 0);
      };
      TileModel.prototype.fullHp = function() {
        var _a;
        this.maxHp = null !== (_a = this._data.hp) && void 0 !== _a ? _a : 0;
        this.currHp = this.maxHp;
        return this.currHp;
      };
      TileModel.prototype.addHp = function(value) {
        this.currHp = (this.currHp + value).limit(0, this.maxHp);
        return this.currHp;
      };
      TileModel.prototype.decHp = function(value) {
        this.currHp = (this.currHp - value).limit(0, this.maxHp);
        return this.currHp;
      };
      TileModel.prototype.cooldown = function() {
        var _a;
        this.cd = null !== (_a = this._data.cd) && void 0 !== _a ? _a : 0;
        return this.cd;
      };
      TileModel.prototype.addCd = function(value) {
        var _a;
        void 0 === value && (value = 1);
        this.cd = (this.cd + value).limit(0, null !== (_a = this._data.cd) && void 0 !== _a ? _a : 0);
        return this.cd;
      };
      return TileModel;
    }(TileModelBase_1.TileModelBase);
    exports.TileModel = TileModel;
    cc._RF.pop();
  }, {
    "../../../define/GameDefine": "GameDefine",
    "../../../define/TileDefine": "TileDefine",
    "./TileModelBase": "TileModelBase"
  } ],
  TileMove: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "173a6QXDphOYJUrqhzom3ob", "TileMove");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileMove = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileMove = function(_super) {
      __extends(TileMove, _super);
      function TileMove(target, skip) {
        void 0 === skip && (skip = false);
        var _this = _super.call(this) || this;
        _this.target = null;
        _this.skip = false;
        _this.target = target;
        _this.skip = skip;
        return _this;
      }
      Object.defineProperty(TileMove.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Move;
        },
        enumerable: false,
        configurable: true
      });
      return TileMove;
    }(GridCmd_1.TilePlay);
    exports.TileMove = TileMove;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  TileNext: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dfd93kaszhNSLWF65YNYIyt", "TileNext");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileNext = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileNext = function(_super) {
      __extends(TileNext, _super);
      function TileNext() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(TileNext.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Next;
        },
        enumerable: false,
        configurable: true
      });
      return TileNext;
    }(GridCmd_1.TilePlay);
    exports.TileNext = TileNext;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  TileSelect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0ce15DYk5lAP5BHkUmd9wnk", "TileSelect");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileSelect = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileSelect = function(_super) {
      __extends(TileSelect, _super);
      function TileSelect(selected) {
        var _this = _super.call(this) || this;
        _this.selected = false;
        _this.selected = selected;
        return _this;
      }
      Object.defineProperty(TileSelect.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Select;
        },
        enumerable: false,
        configurable: true
      });
      return TileSelect;
    }(GridCmd_1.TilePlay);
    exports.TileSelect = TileSelect;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  TileSkill: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c3ecfPnyZtB1IvOe0ohudrD", "TileSkill");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileSkill = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileSkill = function(_super) {
      __extends(TileSkill, _super);
      function TileSkill(eff) {
        var _this = _super.call(this) || this;
        _this.eff = TileDefine_1.TileType.None;
        _this.eff = eff;
        return _this;
      }
      Object.defineProperty(TileSkill.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Skill;
        },
        enumerable: false,
        configurable: true
      });
      return TileSkill;
    }(GridCmd_1.TilePlay);
    exports.TileSkill = TileSkill;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  TileSlip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "edde108FNBN1aZbMwD8dxhn", "TileSlip");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileSlip = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileSlip = function(_super) {
      __extends(TileSlip, _super);
      function TileSlip(path) {
        var _this = _super.call(this) || this;
        _this.path = [];
        _this.path = _this.path.concat(path);
        return _this;
      }
      Object.defineProperty(TileSlip.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Slip;
        },
        enumerable: false,
        configurable: true
      });
      return TileSlip;
    }(GridCmd_1.TilePlay);
    exports.TileSlip = TileSlip;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  TileSpawn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ae52abFu7RJMYTi1a09cpxX", "TileSpawn");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileSpawn = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileSpawn = function(_super) {
      __extends(TileSpawn, _super);
      function TileSpawn(skip) {
        void 0 === skip && (skip = false);
        var _this = _super.call(this) || this;
        _this.skip = false;
        _this.skip = skip;
        return _this;
      }
      Object.defineProperty(TileSpawn.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Spawn;
        },
        enumerable: false,
        configurable: true
      });
      return TileSpawn;
    }(GridCmd_1.TilePlay);
    exports.TileSpawn = TileSpawn;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  TileSwap: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "305eb9/uFVFt7PwwQrQpdoG", "TileSwap");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileSwap = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileSwap = function(_super) {
      __extends(TileSwap, _super);
      function TileSwap(target) {
        var _this = _super.call(this) || this;
        _this.target = null;
        _this.target = target;
        return _this;
      }
      Object.defineProperty(TileSwap.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Swap;
        },
        enumerable: false,
        configurable: true
      });
      return TileSwap;
    }(GridCmd_1.TilePlay);
    exports.TileSwap = TileSwap;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  TileTrans: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "742f808Xg5MsIylfMVf7TPM", "TileTrans");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileTrans = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileTrans = function(_super) {
      __extends(TileTrans, _super);
      function TileTrans(target, skip) {
        void 0 === skip && (skip = false);
        var _this = _super.call(this) || this;
        _this.target = null;
        _this.skip = false;
        _this.target = target;
        _this.skip = skip;
        return _this;
      }
      Object.defineProperty(TileTrans.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Trans;
        },
        enumerable: false,
        configurable: true
      });
      return TileTrans;
    }(GridCmd_1.TilePlay);
    exports.TileTrans = TileTrans;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  TileView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2b049TUbiZK+4ESEXmNP/a7", "TileView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileView = void 0;
    var EventCfg_1 = require("../../../cfg/EventCfg");
    var TextureCfg_1 = require("../../../cfg/TextureCfg");
    var AssetMgr_1 = require("../../../comm/asset/AssetMgr");
    var EventMgr_1 = require("../../../comm/event/EventMgr");
    var TileDefine_1 = require("../../../define/TileDefine");
    var TileModel_1 = require("../model/TileModel");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TileView = function(_super) {
      __extends(TileView, _super);
      function TileView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._model = new TileModel_1.TileModel(-1);
        _this.avatar = null;
        _this.info = null;
        _this.bar = null;
        return _this;
      }
      Object.defineProperty(TileView.prototype, "id", {
        get: function() {
          return this._model.id;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TileView.prototype, "group", {
        get: function() {
          return this._model.group;
        },
        enumerable: false,
        configurable: true
      });
      TileView.prototype.onDestroy = function() {
        this._model = null;
      };
      TileView.prototype.init = function(model) {
        return __awaiter(this, void 0, Promise, function() {
          var name;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              name = model.id.toString();
              this.node.name = name;
              this.info.string = name;
              this.bar.node.active = false;
              Object.assign(this._model, model);
              this.node.x = TileDefine_1.TILE_W * (model.entry.x + .5);
              this.node.y = TileDefine_1.TILE_H * (model.entry.y + .5);
              return [ 4, this.setType(model.type) ];

             case 1:
              _a.sent();
              return [ 2 ];
            }
          });
        });
      };
      TileView.prototype.setType = function(type) {
        return __awaiter(this, void 0, Promise, function() {
          var url, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              this._model.type = type;
              if (!(type != TileDefine_1.TileType.None)) return [ 3, 2 ];
              url = TextureCfg_1.TextureSrc[TileDefine_1.TileType[type]];
              _a = this.avatar;
              return [ 4, AssetMgr_1.AssetMgr.inst().loadAsset(url, cc.SpriteFrame, true) ];

             case 1:
              _a.spriteFrame = _b.sent();
              this.node.zIndex = this.group;
              _b.label = 2;

             case 2:
              return [ 4, this.setBar() ];

             case 3:
              _b.sent();
              return [ 2 ];
            }
          });
        });
      };
      TileView.prototype.setBar = function() {
        return __awaiter(this, void 0, Promise, function() {
          var url, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              url = this.group == TileDefine_1.TileGroup.Player ? TextureCfg_1.TextureSrc.PlayerHp : this.group == TileDefine_1.TileGroup.Enemy ? TextureCfg_1.TextureSrc.EnemyHp : null;
              if (!url) return [ 3, 2 ];
              _a = this.bar.barSprite;
              return [ 4, AssetMgr_1.AssetMgr.inst().loadAsset(url, cc.SpriteFrame, true) ];

             case 1:
              _a.spriteFrame = _b.sent();
              this.refreshBar();
              this.bar.node.active = true;
              _b.label = 2;

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      TileView.prototype.refreshBar = function() {
        this.bar.progress = this._model.currHp / this._model.maxHp;
      };
      TileView.prototype.decHp = function(value) {
        this._model.decHp(value);
        this.refreshBar();
        this.refreshBlock();
      };
      TileView.prototype.refreshBlock = function() {
        return __awaiter(this, void 0, Promise, function() {
          var hp, url, _a, _b;
          return __generator(this, function(_c) {
            switch (_c.label) {
             case 0:
              if (!(this._model.group == TileDefine_1.TileGroup.Block)) return [ 3, 3 ];
              hp = this._model.currHp;
              url = 1 == hp ? TextureCfg_1.TextureSrc.Stone : 2 == hp ? TextureCfg_1.TextureSrc.Rock : null;
              _a = url;
              if (!_a) return [ 3, 2 ];
              _b = this.avatar;
              return [ 4, AssetMgr_1.AssetMgr.inst().loadAsset(url, cc.SpriteFrame, true) ];

             case 1:
              _a = _b.spriteFrame = _c.sent();
              _c.label = 2;

             case 2:
              _a;
              _c.label = 3;

             case 3:
              return [ 2 ];
            }
          });
        });
      };
      TileView.prototype.nextRound = function() {
        this._model.nextRound();
      };
      TileView.prototype.hit = function() {
        var tween = cc.tween(this.avatar.node);
        tween.to(.1, {
          color: cc.Color.RED
        });
        tween.to(.1, {
          color: cc.Color.WHITE
        });
        tween.start();
      };
      TileView.prototype.die = function() {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            this._model.energy > 0 && EventMgr_1.EventMgr.inst().emit(EventCfg_1.EventSrc.Charge, this._model.energy);
            return [ 2 ];
          });
        });
      };
      __decorate([ property(cc.Sprite) ], TileView.prototype, "avatar", void 0);
      __decorate([ property(cc.Label) ], TileView.prototype, "info", void 0);
      __decorate([ property(cc.ProgressBar) ], TileView.prototype, "bar", void 0);
      TileView = __decorate([ ccclass ], TileView);
      return TileView;
    }(cc.Component);
    exports.TileView = TileView;
    cc._RF.pop();
  }, {
    "../../../cfg/EventCfg": "EventCfg",
    "../../../cfg/TextureCfg": "TextureCfg",
    "../../../comm/asset/AssetMgr": "AssetMgr",
    "../../../comm/event/EventMgr": "EventMgr",
    "../../../define/TileDefine": "TileDefine",
    "../model/TileModel": "TileModel"
  } ],
  TileWait: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e37c4LzOuBLlabsD+PHRT8N", "TileWait");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileWait = void 0;
    var TileDefine_1 = require("../../define/TileDefine");
    var GridCmd_1 = require("../mvc/GridCmd");
    var TileWait = function(_super) {
      __extends(TileWait, _super);
      function TileWait(time) {
        var _this = _super.call(this) || this;
        _this.time = 0;
        _this.time = time;
        return _this;
      }
      Object.defineProperty(TileWait.prototype, "type", {
        get: function() {
          return TileDefine_1.TileAct.Wait;
        },
        enumerable: false,
        configurable: true
      });
      return TileWait;
    }(GridCmd_1.TilePlay);
    exports.TileWait = TileWait;
    cc._RF.pop();
  }, {
    "../../define/TileDefine": "TileDefine",
    "../mvc/GridCmd": "GridCmd"
  } ],
  UltAtk: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "40202/RgDdJ6oe2meoBti+n", "UltAtk");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UltAtk = void 0;
    var WorkChain_1 = require("../../../comm/util/WorkChain");
    var GameDefine_1 = require("../../../define/GameDefine");
    var TileDie_1 = require("../../act/TileDie");
    var TileHit_1 = require("../../act/TileHit");
    var GridCmd_1 = require("../../mvc/GridCmd");
    var UltAtk = function(_super) {
      __extends(UltAtk, _super);
      function UltAtk() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UltAtk.prototype.business = function(param) {
        return __awaiter(this, void 0, Promise, function() {
          var cmd, count;
          return __generator(this, function(_a) {
            cmd = new GridCmd_1.GridCmd();
            count = 0;
            param.model.enemies.forEach(function(elm) {
              var damage = (GameDefine_1.ULT_DAMAGE - elm.def).limit(1, GameDefine_1.ULT_DAMAGE);
              cmd.add(elm, new TileHit_1.TileHit(damage));
              elm.decHp(damage);
              cc.log("$\u5927\u62db" + elm.id + ", \u50b7\u5bb3" + damage + ", \u5269\u8840" + elm.currHp, elm.pos, elm.type);
              if (elm.decHp(damage) <= 0) {
                elm.currHp <= 0 && cmd.add(elm, new TileDie_1.TileDie());
                param.model.setTile(elm.pos, null);
                cc.log(elm.id + "\u6b7b\u4ea1", elm.pos);
                count++;
              }
            });
            cmd.deed.size > 0 && param.load.push(cmd);
            return [ 2, true ];
          });
        });
      };
      return UltAtk;
    }(WorkChain_1.WorkChain);
    exports.UltAtk = UltAtk;
    cc._RF.pop();
  }, {
    "../../../comm/util/WorkChain": "WorkChain",
    "../../../define/GameDefine": "GameDefine",
    "../../act/TileDie": "TileDie",
    "../../act/TileHit": "TileHit",
    "../../mvc/GridCmd": "GridCmd"
  } ],
  UltView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eb877LJj4dLRaakjapoCfve", "UltView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UltView = void 0;
    var EventCfg_1 = require("../../../cfg/EventCfg");
    var EventDecor_1 = require("../../../comm/event/EventDecor");
    var EventMgr_1 = require("../../../comm/event/EventMgr");
    var GameDefine_1 = require("../../../define/GameDefine");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UltView = function(_super) {
      __extends(UltView, _super);
      function UltView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bar = null;
        _this.btn = null;
        _this._energy = 0;
        return _this;
      }
      UltView.prototype.onLoad = function() {
        this.clear();
      };
      UltView.prototype.clear = function() {
        this._energy = 0;
        this.bar.progress = 0;
        this.btn.target.color = cc.Color.GRAY;
      };
      UltView.prototype.charge = function(value) {
        this._energy = (this._energy + value).limit(0, GameDefine_1.MAX_ENERGY);
        this.bar.progress = this._energy / GameDefine_1.MAX_ENERGY;
        this._energy >= GameDefine_1.MAX_ENERGY && (this.btn.target.color = cc.Color.WHITE);
        cc.log("\u5145\u80fd", value, this._energy);
      };
      UltView.prototype.onClick = function(event, data) {
        if (this._energy >= GameDefine_1.MAX_ENERGY) {
          EventMgr_1.EventMgr.inst().emit(EventCfg_1.EventSrc.Ultimate);
          this.clear();
        }
      };
      __decorate([ property(cc.ProgressBar) ], UltView.prototype, "bar", void 0);
      __decorate([ property(cc.Button) ], UltView.prototype, "btn", void 0);
      __decorate([ EventDecor_1.onEvent(EventCfg_1.EventSrc.Charge) ], UltView.prototype, "charge", null);
      UltView = __decorate([ ccclass, EventDecor_1.onEnable() ], UltView);
      return UltView;
    }(cc.Component);
    exports.UltView = UltView;
    cc._RF.pop();
  }, {
    "../../../cfg/EventCfg": "EventCfg",
    "../../../comm/event/EventDecor": "EventDecor",
    "../../../comm/event/EventMgr": "EventMgr",
    "../../../define/GameDefine": "GameDefine"
  } ],
  WaitUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2e4aahn2utFXr4HtKpGXAFG", "WaitUtil");
    "use strict";
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WaitUtil = void 0;
    var WaitUtil = function() {
      function WaitUtil() {}
      WaitUtil.waitMs = function(ms, cmpt) {
        return __awaiter(this, void 0, Promise, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              if (!cmpt) return [ 3, 2 ];
              return [ 4, this.waitSec(ms / 1e3, cmpt) ];

             case 1:
              _a = _b.sent();
              return [ 3, 4 ];

             case 2:
              return [ 4, new Promise(function(resolve) {
                return window.setTimeout(resolve, ms);
              }) ];

             case 3:
              _a = _b.sent();
              _b.label = 4;

             case 4:
              _a;
              return [ 2 ];
            }
          });
        });
      };
      WaitUtil.waitSec = function(sec, cmpt) {
        return __awaiter(this, void 0, Promise, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              if (!cmpt) return [ 3, 2 ];
              return [ 4, new Promise(function(resolve) {
                return cmpt.scheduleOnce(resolve, sec);
              }) ];

             case 1:
              _a = _b.sent();
              return [ 3, 4 ];

             case 2:
              return [ 4, this.waitMs(1e3 * sec) ];

             case 3:
              _a = _b.sent();
              _b.label = 4;

             case 4:
              _a;
              return [ 2 ];
            }
          });
        });
      };
      return WaitUtil;
    }();
    exports.WaitUtil = WaitUtil;
    cc._RF.pop();
  }, {} ],
  WidgetAdapt: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34c5eicTu5AhbJ6bPWBa3tJ", "WidgetAdapt");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetAdapt = void 0;
    var EventCfg_1 = require("../../../cfg/EventCfg");
    var EventDecor_1 = require("../../event/EventDecor");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
    var WidgetAdapt = function(_super) {
      __extends(WidgetAdapt, _super);
      function WidgetAdapt() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      WidgetAdapt.prototype.onLoad = function() {
        this.adjust();
      };
      WidgetAdapt.prototype.adjust = function() {
        this.node.setContentSize(cc.Canvas.instance.designResolution);
        var oldW = this.node.width;
        var oldH = this.node.height;
        var size = cc.view.getCanvasSize();
        var scale = Math.min(size.width / oldW, size.height / oldH);
        var newW = oldW * scale;
        var newH = oldH * scale;
        this.node.width *= size.width / newW;
        this.node.height *= size.height / newH;
      };
      __decorate([ EventDecor_1.onEvent(EventCfg_1.EventSrc.Resize) ], WidgetAdapt.prototype, "adjust", null);
      WidgetAdapt = __decorate([ ccclass, menu("adapt/widget"), EventDecor_1.onEnable() ], WidgetAdapt);
      return WidgetAdapt;
    }(cc.Component);
    exports.WidgetAdapt = WidgetAdapt;
    cc._RF.pop();
  }, {
    "../../../cfg/EventCfg": "EventCfg",
    "../../event/EventDecor": "EventDecor"
  } ],
  WorkChain: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8cb28vigJ9BGpjOomy/kS+Q", "WorkChain");
    "use strict";
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WorkChain = void 0;
    var WorkChain = function() {
      function WorkChain() {
        this._next = null;
      }
      WorkChain.prototype.push = function(chain) {
        if (this._next) return this._next.push(chain);
        this._next = chain;
        return this;
      };
      WorkChain.prototype.insert = function(chain) {
        chain._next = this._next;
        this._next = chain;
        return chain;
      };
      WorkChain.prototype.execute = function() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) params[_i] = arguments[_i];
        return __awaiter(this, void 0, Promise, function() {
          var _a;
          var _b;
          return __generator(this, function(_c) {
            switch (_c.label) {
             case 0:
              return [ 4, this.business.apply(this, params) ];

             case 1:
              if (!_c.sent()) return [ 3, 5 ];
              if (!this._next) return [ 3, 3 ];
              return [ 4, (_b = this._next).execute.apply(_b, params) ];

             case 2:
              _a = _c.sent();
              return [ 3, 4 ];

             case 3:
              _a = true;
              _c.label = 4;

             case 4:
              return [ 2, _a ];

             case 5:
              return [ 2, false ];
            }
          });
        });
      };
      return WorkChain;
    }();
    exports.WorkChain = WorkChain;
    cc._RF.pop();
  }, {} ]
}, {}, [ "AudioCfg", "EventCfg", "PrefabCfg", "SpinCfg", "TextureCfg", "AssetLoader", "AssetMgr", "BgmAudio", "SfxAudio", "ReplayFx", "Spine", "CanvasAdapt", "DesktopAdapt", "WidgetAdapt", "EventDecor", "EventMgr", "NumExtend", "StrExtend", "CmptPool", "ObjPool", "DataDriven", "RandUtil", "SimulateFx", "Singleton", "WaitUtil", "WorkChain", "DebugPnl", "DebugTool", "GameDefine", "GridDefine", "TileDefine", "GameMgr", "TileCrush", "TileDie", "TileFall", "TileHit", "TileMove", "TileNext", "TileSelect", "TileSkill", "TileSlip", "TileSpawn", "TileSwap", "TileTrans", "TileWait", "GridCmd", "GridDirector", "GridCtrl", "GridCtrlBase", "StageCtrl", "GridModel", "GridModelBase", "StageModel", "TileModel", "TileModelBase", "GridView", "RuleView", "StageView", "TileView", "UltView", "SelectHandler", "ComboWork", "CrushWork", "DropWork", "ResetWork", "SlipWork", "StuffWork", "EnemyAtk", "EnemyWalk", "NormAtk", "SkillAtk", "UltAtk", "FirstCheck", "LimitCheck", "MoveCheck", "SecondCheck", "SwapCheck", "EnemyPort", "NormPort", "PlayerPort", "SkillPort" ]);