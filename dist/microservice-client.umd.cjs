(function (B, q) {
  typeof exports == 'object' && typeof module < 'u'
    ? (module.exports = q())
    : typeof define == 'function' && define.amd
      ? define(q)
      : ((B = typeof globalThis < 'u' ? globalThis : B || self), (B.MicroserviceClient = q()));
})(this, function () {
  'use strict';
  function B(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }
  var q = {};
  const { toString: nt } = Object.prototype,
    { getPrototypeOf: se } = Object,
    V = ((e) => (t) => {
      const n = nt.call(t);
      return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
    })(Object.create(null)),
    x = (e) => ((e = e.toLowerCase()), (t) => V(t) === e),
    K = (e) => (t) => typeof t === e,
    { isArray: j } = Array,
    M = K('undefined');
  function rt(e) {
    return e !== null && !M(e) && e.constructor !== null && !M(e.constructor) && C(e.constructor.isBuffer) && e.constructor.isBuffer(e);
  }
  const be = x('ArrayBuffer');
  function st(e) {
    let t;
    return typeof ArrayBuffer < 'u' && ArrayBuffer.isView ? (t = ArrayBuffer.isView(e)) : (t = e && e.buffer && be(e.buffer)), t;
  }
  const ot = K('string'),
    C = K('function'),
    we = K('number'),
    W = (e) => e !== null && typeof e == 'object',
    it = (e) => e === !0 || e === !1,
    X = (e) => {
      if (V(e) !== 'object') return !1;
      const t = se(e);
      return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
    },
    at = x('Date'),
    ct = x('File'),
    ut = x('Blob'),
    lt = x('FileList'),
    ft = (e) => W(e) && C(e.pipe),
    dt = (e) => {
      let t;
      return (
        e &&
        ((typeof FormData == 'function' && e instanceof FormData) ||
          (C(e.append) && ((t = V(e)) === 'formdata' || (t === 'object' && C(e.toString) && e.toString() === '[object FormData]'))))
      );
    },
    pt = x('URLSearchParams'),
    [ht, mt, yt, bt] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(x),
    wt = (e) => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
  function $(e, t, { allOwnKeys: n = !1 } = {}) {
    if (e === null || typeof e > 'u') return;
    let r, s;
    if ((typeof e != 'object' && (e = [e]), j(e))) for (r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e);
    else {
      const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
        i = o.length;
      let c;
      for (r = 0; r < i; r++) (c = o[r]), t.call(null, e[c], c, e);
    }
  }
  function ge(e, t) {
    t = t.toLowerCase();
    const n = Object.keys(e);
    let r = n.length,
      s;
    for (; r-- > 0; ) if (((s = n[r]), t === s.toLowerCase())) return s;
    return null;
  }
  const F = typeof globalThis < 'u' ? globalThis : typeof self < 'u' ? self : typeof window < 'u' ? window : global,
    Ee = (e) => !M(e) && e !== F;
  function oe() {
    const { caseless: e } = (Ee(this) && this) || {},
      t = {},
      n = (r, s) => {
        const o = (e && ge(t, s)) || s;
        X(t[o]) && X(r) ? (t[o] = oe(t[o], r)) : X(r) ? (t[o] = oe({}, r)) : j(r) ? (t[o] = r.slice()) : (t[o] = r);
      };
    for (let r = 0, s = arguments.length; r < s; r++) arguments[r] && $(arguments[r], n);
    return t;
  }
  const gt = (e, t, n, { allOwnKeys: r } = {}) => (
      $(
        t,
        (s, o) => {
          n && C(s) ? (e[o] = B(s, n)) : (e[o] = s);
        },
        { allOwnKeys: r }
      ),
      e
    ),
    Et = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
    St = (e, t, n, r) => {
      (e.prototype = Object.create(t.prototype, r)),
        (e.prototype.constructor = e),
        Object.defineProperty(e, 'super', { value: t.prototype }),
        n && Object.assign(e.prototype, n);
    },
    Rt = (e, t, n, r) => {
      let s, o, i;
      const c = {};
      if (((t = t || {}), e == null)) return t;
      do {
        for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; ) (i = s[o]), (!r || r(i, e, t)) && !c[i] && ((t[i] = e[i]), (c[i] = !0));
        e = n !== !1 && se(e);
      } while (e && (!n || n(e, t)) && e !== Object.prototype);
      return t;
    },
    Tt = (e, t, n) => {
      (e = String(e)), (n === void 0 || n > e.length) && (n = e.length), (n -= t.length);
      const r = e.indexOf(t, n);
      return r !== -1 && r === n;
    },
    Ot = (e) => {
      if (!e) return null;
      if (j(e)) return e;
      let t = e.length;
      if (!we(t)) return null;
      const n = new Array(t);
      for (; t-- > 0; ) n[t] = e[t];
      return n;
    },
    At = (
      (e) => (t) =>
        e && t instanceof e
    )(typeof Uint8Array < 'u' && se(Uint8Array)),
    Ct = (e, t) => {
      const r = (e && e[Symbol.iterator]).call(e);
      let s;
      for (; (s = r.next()) && !s.done; ) {
        const o = s.value;
        t.call(e, o[0], o[1]);
      }
    },
    xt = (e, t) => {
      let n;
      const r = [];
      for (; (n = e.exec(t)) !== null; ) r.push(n);
      return r;
    },
    Nt = x('HTMLFormElement'),
    _t = (e) =>
      e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, s) {
        return r.toUpperCase() + s;
      }),
    Se = (
      ({ hasOwnProperty: e }) =>
      (t, n) =>
        e.call(t, n)
    )(Object.prototype),
    Pt = x('RegExp'),
    Re = (e, t) => {
      const n = Object.getOwnPropertyDescriptors(e),
        r = {};
      $(n, (s, o) => {
        let i;
        (i = t(s, o, e)) !== !1 && (r[o] = i || s);
      }),
        Object.defineProperties(e, r);
    },
    Lt = (e) => {
      Re(e, (t, n) => {
        if (C(e) && ['arguments', 'caller', 'callee'].indexOf(n) !== -1) return !1;
        const r = e[n];
        if (C(r)) {
          if (((t.enumerable = !1), 'writable' in t)) {
            t.writable = !1;
            return;
          }
          t.set ||
            (t.set = () => {
              throw Error("Can not rewrite read-only method '" + n + "'");
            });
        }
      });
    },
    Ft = (e, t) => {
      const n = {},
        r = (s) => {
          s.forEach((o) => {
            n[o] = !0;
          });
        };
      return j(e) ? r(e) : r(String(e).split(t)), n;
    },
    Ut = () => {},
    Dt = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t),
    ie = 'abcdefghijklmnopqrstuvwxyz',
    Te = '0123456789',
    Oe = { DIGIT: Te, ALPHA: ie, ALPHA_DIGIT: ie + ie.toUpperCase() + Te },
    kt = (e = 16, t = Oe.ALPHA_DIGIT) => {
      let n = '';
      const { length: r } = t;
      for (; e--; ) n += t[(Math.random() * r) | 0];
      return n;
    };
  function Bt(e) {
    return !!(e && C(e.append) && e[Symbol.toStringTag] === 'FormData' && e[Symbol.iterator]);
  }
  const qt = (e) => {
      const t = new Array(10),
        n = (r, s) => {
          if (W(r)) {
            if (t.indexOf(r) >= 0) return;
            if (!('toJSON' in r)) {
              t[s] = r;
              const o = j(r) ? [] : {};
              return (
                $(r, (i, c) => {
                  const f = n(i, s + 1);
                  !M(f) && (o[c] = f);
                }),
                (t[s] = void 0),
                o
              );
            }
          }
          return r;
        };
      return n(e, 0);
    },
    jt = x('AsyncFunction'),
    Ht = (e) => e && (W(e) || C(e)) && C(e.then) && C(e.catch),
    Ae = ((e, t) =>
      e
        ? setImmediate
        : t
          ? ((n, r) => (
              F.addEventListener(
                'message',
                ({ source: s, data: o }) => {
                  s === F && o === n && r.length && r.shift()();
                },
                !1
              ),
              (s) => {
                r.push(s), F.postMessage(n, '*');
              }
            ))(`axios@${Math.random()}`, [])
          : (n) => setTimeout(n))(typeof setImmediate == 'function', C(F.postMessage)),
    It = typeof queueMicrotask < 'u' ? queueMicrotask.bind(F) : (typeof q < 'u' && q.nextTick) || Ae,
    a = {
      isArray: j,
      isArrayBuffer: be,
      isBuffer: rt,
      isFormData: dt,
      isArrayBufferView: st,
      isString: ot,
      isNumber: we,
      isBoolean: it,
      isObject: W,
      isPlainObject: X,
      isReadableStream: ht,
      isRequest: mt,
      isResponse: yt,
      isHeaders: bt,
      isUndefined: M,
      isDate: at,
      isFile: ct,
      isBlob: ut,
      isRegExp: Pt,
      isFunction: C,
      isStream: ft,
      isURLSearchParams: pt,
      isTypedArray: At,
      isFileList: lt,
      forEach: $,
      merge: oe,
      extend: gt,
      trim: wt,
      stripBOM: Et,
      inherits: St,
      toFlatObject: Rt,
      kindOf: V,
      kindOfTest: x,
      endsWith: Tt,
      toArray: Ot,
      forEachEntry: Ct,
      matchAll: xt,
      isHTMLForm: Nt,
      hasOwnProperty: Se,
      hasOwnProp: Se,
      reduceDescriptors: Re,
      freezeMethods: Lt,
      toObjectSet: Ft,
      toCamelCase: _t,
      noop: Ut,
      toFiniteNumber: Dt,
      findKey: ge,
      global: F,
      isContextDefined: Ee,
      ALPHABET: Oe,
      generateString: kt,
      isSpecCompliantForm: Bt,
      toJSONObject: qt,
      isAsyncFn: jt,
      isThenable: Ht,
      setImmediate: Ae,
      asap: It,
    };
  function m(e, t, n, r, s) {
    Error.call(this),
      Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack),
      (this.message = e),
      (this.name = 'AxiosError'),
      t && (this.code = t),
      n && (this.config = n),
      r && (this.request = r),
      s && ((this.response = s), (this.status = s.status ? s.status : null));
  }
  a.inherits(m, Error, {
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: a.toJSONObject(this.config),
        code: this.code,
        status: this.status,
      };
    },
  });
  const Ce = m.prototype,
    xe = {};
  [
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
    'ERR_NOT_SUPPORT',
    'ERR_INVALID_URL',
  ].forEach((e) => {
    xe[e] = { value: e };
  }),
    Object.defineProperties(m, xe),
    Object.defineProperty(Ce, 'isAxiosError', { value: !0 }),
    (m.from = (e, t, n, r, s, o) => {
      const i = Object.create(Ce);
      return (
        a.toFlatObject(
          e,
          i,
          function (f) {
            return f !== Error.prototype;
          },
          (c) => c !== 'isAxiosError'
        ),
        m.call(i, e.message, t, n, r, s),
        (i.cause = e),
        (i.name = e.name),
        o && Object.assign(i, o),
        i
      );
    });
  const Mt = null;
  function ae(e) {
    return a.isPlainObject(e) || a.isArray(e);
  }
  function Ne(e) {
    return a.endsWith(e, '[]') ? e.slice(0, -2) : e;
  }
  function _e(e, t, n) {
    return e
      ? e
          .concat(t)
          .map(function (s, o) {
            return (s = Ne(s)), !n && o ? '[' + s + ']' : s;
          })
          .join(n ? '.' : '')
      : t;
  }
  function $t(e) {
    return a.isArray(e) && !e.some(ae);
  }
  const zt = a.toFlatObject(a, {}, null, function (t) {
    return /^is[A-Z]/.test(t);
  });
  function G(e, t, n) {
    if (!a.isObject(e)) throw new TypeError('target must be an object');
    (t = t || new FormData()),
      (n = a.toFlatObject(n, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (y, h) {
        return !a.isUndefined(h[y]);
      }));
    const r = n.metaTokens,
      s = n.visitor || l,
      o = n.dots,
      i = n.indexes,
      f = (n.Blob || (typeof Blob < 'u' && Blob)) && a.isSpecCompliantForm(t);
    if (!a.isFunction(s)) throw new TypeError('visitor must be a function');
    function u(p) {
      if (p === null) return '';
      if (a.isDate(p)) return p.toISOString();
      if (!f && a.isBlob(p)) throw new m('Blob is not supported. Use a Buffer instead.');
      return a.isArrayBuffer(p) || a.isTypedArray(p) ? (f && typeof Blob == 'function' ? new Blob([p]) : Buffer.from(p)) : p;
    }
    function l(p, y, h) {
      let g = p;
      if (p && !h && typeof p == 'object') {
        if (a.endsWith(y, '{}')) (y = r ? y : y.slice(0, -2)), (p = JSON.stringify(p));
        else if ((a.isArray(p) && $t(p)) || ((a.isFileList(p) || a.endsWith(y, '[]')) && (g = a.toArray(p))))
          return (
            (y = Ne(y)),
            g.forEach(function (R, P) {
              !(a.isUndefined(R) || R === null) && t.append(i === !0 ? _e([y], P, o) : i === null ? y : y + '[]', u(R));
            }),
            !1
          );
      }
      return ae(p) ? !0 : (t.append(_e(h, y, o), u(p)), !1);
    }
    const d = [],
      b = Object.assign(zt, { defaultVisitor: l, convertValue: u, isVisitable: ae });
    function E(p, y) {
      if (!a.isUndefined(p)) {
        if (d.indexOf(p) !== -1) throw Error('Circular reference detected in ' + y.join('.'));
        d.push(p),
          a.forEach(p, function (g, S) {
            (!(a.isUndefined(g) || g === null) && s.call(t, g, a.isString(S) ? S.trim() : S, y, b)) === !0 && E(g, y ? y.concat(S) : [S]);
          }),
          d.pop();
      }
    }
    if (!a.isObject(e)) throw new TypeError('data must be an object');
    return E(e), t;
  }
  function Pe(e) {
    const t = { '!': '%21', "'": '%27', '(': '%28', ')': '%29', '~': '%7E', '%20': '+', '%00': '\0' };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
      return t[r];
    });
  }
  function ce(e, t) {
    (this._pairs = []), e && G(e, this, t);
  }
  const Le = ce.prototype;
  (Le.append = function (t, n) {
    this._pairs.push([t, n]);
  }),
    (Le.toString = function (t) {
      const n = t
        ? function (r) {
            return t.call(this, r, Pe);
          }
        : Pe;
      return this._pairs
        .map(function (s) {
          return n(s[0]) + '=' + n(s[1]);
        }, '')
        .join('&');
    });
  function Jt(e) {
    return encodeURIComponent(e)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }
  function Fe(e, t, n) {
    if (!t) return e;
    const r = (n && n.encode) || Jt;
    a.isFunction(n) && (n = { serialize: n });
    const s = n && n.serialize;
    let o;
    if ((s ? (o = s(t, n)) : (o = a.isURLSearchParams(t) ? t.toString() : new ce(t, n).toString(r)), o)) {
      const i = e.indexOf('#');
      i !== -1 && (e = e.slice(0, i)), (e += (e.indexOf('?') === -1 ? '?' : '&') + o);
    }
    return e;
  }
  class Ue {
    constructor() {
      this.handlers = [];
    }
    use(t, n, r) {
      return (
        this.handlers.push({ fulfilled: t, rejected: n, synchronous: r ? r.synchronous : !1, runWhen: r ? r.runWhen : null }),
        this.handlers.length - 1
      );
    }
    eject(t) {
      this.handlers[t] && (this.handlers[t] = null);
    }
    clear() {
      this.handlers && (this.handlers = []);
    }
    forEach(t) {
      a.forEach(this.handlers, function (r) {
        r !== null && t(r);
      });
    }
  }
  const De = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
    vt = {
      isBrowser: !0,
      classes: {
        URLSearchParams: typeof URLSearchParams < 'u' ? URLSearchParams : ce,
        FormData: typeof FormData < 'u' ? FormData : null,
        Blob: typeof Blob < 'u' ? Blob : null,
      },
      protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
    },
    ue = typeof window < 'u' && typeof document < 'u',
    le = (typeof navigator == 'object' && navigator) || void 0,
    Vt = ue && (!le || ['ReactNative', 'NativeScript', 'NS'].indexOf(le.product) < 0),
    Kt = typeof WorkerGlobalScope < 'u' && self instanceof WorkerGlobalScope && typeof self.importScripts == 'function',
    Wt = (ue && window.location.href) || 'http://localhost',
    T = {
      ...Object.freeze(
        Object.defineProperty(
          { __proto__: null, hasBrowserEnv: ue, hasStandardBrowserEnv: Vt, hasStandardBrowserWebWorkerEnv: Kt, navigator: le, origin: Wt },
          Symbol.toStringTag,
          { value: 'Module' }
        )
      ),
      ...vt,
    };
  function Xt(e, t) {
    return G(
      e,
      new T.classes.URLSearchParams(),
      Object.assign(
        {
          visitor: function (n, r, s, o) {
            return T.isNode && a.isBuffer(n) ? (this.append(r, n.toString('base64')), !1) : o.defaultVisitor.apply(this, arguments);
          },
        },
        t
      )
    );
  }
  function Gt(e) {
    return a.matchAll(/\w+|\[(\w*)]/g, e).map((t) => (t[0] === '[]' ? '' : t[1] || t[0]));
  }
  function Qt(e) {
    const t = {},
      n = Object.keys(e);
    let r;
    const s = n.length;
    let o;
    for (r = 0; r < s; r++) (o = n[r]), (t[o] = e[o]);
    return t;
  }
  function ke(e) {
    function t(n, r, s, o) {
      let i = n[o++];
      if (i === '__proto__') return !0;
      const c = Number.isFinite(+i),
        f = o >= n.length;
      return (
        (i = !i && a.isArray(s) ? s.length : i),
        f
          ? (a.hasOwnProp(s, i) ? (s[i] = [s[i], r]) : (s[i] = r), !c)
          : ((!s[i] || !a.isObject(s[i])) && (s[i] = []), t(n, r, s[i], o) && a.isArray(s[i]) && (s[i] = Qt(s[i])), !c)
      );
    }
    if (a.isFormData(e) && a.isFunction(e.entries)) {
      const n = {};
      return (
        a.forEachEntry(e, (r, s) => {
          t(Gt(r), s, n, 0);
        }),
        n
      );
    }
    return null;
  }
  function Zt(e, t, n) {
    if (a.isString(e))
      try {
        return (t || JSON.parse)(e), a.trim(e);
      } catch (r) {
        if (r.name !== 'SyntaxError') throw r;
      }
    return (n || JSON.stringify)(e);
  }
  const z = {
    transitional: De,
    adapter: ['xhr', 'http', 'fetch'],
    transformRequest: [
      function (t, n) {
        const r = n.getContentType() || '',
          s = r.indexOf('application/json') > -1,
          o = a.isObject(t);
        if ((o && a.isHTMLForm(t) && (t = new FormData(t)), a.isFormData(t))) return s ? JSON.stringify(ke(t)) : t;
        if (a.isArrayBuffer(t) || a.isBuffer(t) || a.isStream(t) || a.isFile(t) || a.isBlob(t) || a.isReadableStream(t)) return t;
        if (a.isArrayBufferView(t)) return t.buffer;
        if (a.isURLSearchParams(t)) return n.setContentType('application/x-www-form-urlencoded;charset=utf-8', !1), t.toString();
        let c;
        if (o) {
          if (r.indexOf('application/x-www-form-urlencoded') > -1) return Xt(t, this.formSerializer).toString();
          if ((c = a.isFileList(t)) || r.indexOf('multipart/form-data') > -1) {
            const f = this.env && this.env.FormData;
            return G(c ? { 'files[]': t } : t, f && new f(), this.formSerializer);
          }
        }
        return o || s ? (n.setContentType('application/json', !1), Zt(t)) : t;
      },
    ],
    transformResponse: [
      function (t) {
        const n = this.transitional || z.transitional,
          r = n && n.forcedJSONParsing,
          s = this.responseType === 'json';
        if (a.isResponse(t) || a.isReadableStream(t)) return t;
        if (t && a.isString(t) && ((r && !this.responseType) || s)) {
          const i = !(n && n.silentJSONParsing) && s;
          try {
            return JSON.parse(t);
          } catch (c) {
            if (i) throw c.name === 'SyntaxError' ? m.from(c, m.ERR_BAD_RESPONSE, this, null, this.response) : c;
          }
        }
        return t;
      },
    ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: T.classes.FormData, Blob: T.classes.Blob },
    validateStatus: function (t) {
      return t >= 200 && t < 300;
    },
    headers: { common: { Accept: 'application/json, text/plain, */*', 'Content-Type': void 0 } },
  };
  a.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (e) => {
    z.headers[e] = {};
  });
  const Yt = a.toObjectSet([
      'age',
      'authorization',
      'content-length',
      'content-type',
      'etag',
      'expires',
      'from',
      'host',
      'if-modified-since',
      'if-unmodified-since',
      'last-modified',
      'location',
      'max-forwards',
      'proxy-authorization',
      'referer',
      'retry-after',
      'user-agent',
    ]),
    en = (e) => {
      const t = {};
      let n, r, s;
      return (
        e &&
          e
            .split(
              `
`
            )
            .forEach(function (i) {
              (s = i.indexOf(':')),
                (n = i.substring(0, s).trim().toLowerCase()),
                (r = i.substring(s + 1).trim()),
                !(!n || (t[n] && Yt[n])) && (n === 'set-cookie' ? (t[n] ? t[n].push(r) : (t[n] = [r])) : (t[n] = t[n] ? t[n] + ', ' + r : r));
            }),
        t
      );
    },
    Be = Symbol('internals');
  function J(e) {
    return e && String(e).trim().toLowerCase();
  }
  function Q(e) {
    return e === !1 || e == null ? e : a.isArray(e) ? e.map(Q) : String(e);
  }
  function tn(e) {
    const t = Object.create(null),
      n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let r;
    for (; (r = n.exec(e)); ) t[r[1]] = r[2];
    return t;
  }
  const nn = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
  function fe(e, t, n, r, s) {
    if (a.isFunction(r)) return r.call(this, t, n);
    if ((s && (t = n), !!a.isString(t))) {
      if (a.isString(r)) return t.indexOf(r) !== -1;
      if (a.isRegExp(r)) return r.test(t);
    }
  }
  function rn(e) {
    return e
      .trim()
      .toLowerCase()
      .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
  }
  function sn(e, t) {
    const n = a.toCamelCase(' ' + t);
    ['get', 'set', 'has'].forEach((r) => {
      Object.defineProperty(e, r + n, {
        value: function (s, o, i) {
          return this[r].call(this, t, s, o, i);
        },
        configurable: !0,
      });
    });
  }
  let O = class {
    constructor(t) {
      t && this.set(t);
    }
    set(t, n, r) {
      const s = this;
      function o(c, f, u) {
        const l = J(f);
        if (!l) throw new Error('header name must be a non-empty string');
        const d = a.findKey(s, l);
        (!d || s[d] === void 0 || u === !0 || (u === void 0 && s[d] !== !1)) && (s[d || f] = Q(c));
      }
      const i = (c, f) => a.forEach(c, (u, l) => o(u, l, f));
      if (a.isPlainObject(t) || t instanceof this.constructor) i(t, n);
      else if (a.isString(t) && (t = t.trim()) && !nn(t)) i(en(t), n);
      else if (a.isHeaders(t)) for (const [c, f] of t.entries()) o(f, c, r);
      else t != null && o(n, t, r);
      return this;
    }
    get(t, n) {
      if (((t = J(t)), t)) {
        const r = a.findKey(this, t);
        if (r) {
          const s = this[r];
          if (!n) return s;
          if (n === !0) return tn(s);
          if (a.isFunction(n)) return n.call(this, s, r);
          if (a.isRegExp(n)) return n.exec(s);
          throw new TypeError('parser must be boolean|regexp|function');
        }
      }
    }
    has(t, n) {
      if (((t = J(t)), t)) {
        const r = a.findKey(this, t);
        return !!(r && this[r] !== void 0 && (!n || fe(this, this[r], r, n)));
      }
      return !1;
    }
    delete(t, n) {
      const r = this;
      let s = !1;
      function o(i) {
        if (((i = J(i)), i)) {
          const c = a.findKey(r, i);
          c && (!n || fe(r, r[c], c, n)) && (delete r[c], (s = !0));
        }
      }
      return a.isArray(t) ? t.forEach(o) : o(t), s;
    }
    clear(t) {
      const n = Object.keys(this);
      let r = n.length,
        s = !1;
      for (; r--; ) {
        const o = n[r];
        (!t || fe(this, this[o], o, t, !0)) && (delete this[o], (s = !0));
      }
      return s;
    }
    normalize(t) {
      const n = this,
        r = {};
      return (
        a.forEach(this, (s, o) => {
          const i = a.findKey(r, o);
          if (i) {
            (n[i] = Q(s)), delete n[o];
            return;
          }
          const c = t ? rn(o) : String(o).trim();
          c !== o && delete n[o], (n[c] = Q(s)), (r[c] = !0);
        }),
        this
      );
    }
    concat(...t) {
      return this.constructor.concat(this, ...t);
    }
    toJSON(t) {
      const n = Object.create(null);
      return (
        a.forEach(this, (r, s) => {
          r != null && r !== !1 && (n[s] = t && a.isArray(r) ? r.join(', ') : r);
        }),
        n
      );
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([t, n]) => t + ': ' + n).join(`
`);
    }
    get [Symbol.toStringTag]() {
      return 'AxiosHeaders';
    }
    static from(t) {
      return t instanceof this ? t : new this(t);
    }
    static concat(t, ...n) {
      const r = new this(t);
      return n.forEach((s) => r.set(s)), r;
    }
    static accessor(t) {
      const r = (this[Be] = this[Be] = { accessors: {} }).accessors,
        s = this.prototype;
      function o(i) {
        const c = J(i);
        r[c] || (sn(s, i), (r[c] = !0));
      }
      return a.isArray(t) ? t.forEach(o) : o(t), this;
    }
  };
  O.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']),
    a.reduceDescriptors(O.prototype, ({ value: e }, t) => {
      let n = t[0].toUpperCase() + t.slice(1);
      return {
        get: () => e,
        set(r) {
          this[n] = r;
        },
      };
    }),
    a.freezeMethods(O);
  function de(e, t) {
    const n = this || z,
      r = t || n,
      s = O.from(r.headers);
    let o = r.data;
    return (
      a.forEach(e, function (c) {
        o = c.call(n, o, s.normalize(), t ? t.status : void 0);
      }),
      s.normalize(),
      o
    );
  }
  function qe(e) {
    return !!(e && e.__CANCEL__);
  }
  function H(e, t, n) {
    m.call(this, e ?? 'canceled', m.ERR_CANCELED, t, n), (this.name = 'CanceledError');
  }
  a.inherits(H, m, { __CANCEL__: !0 });
  function je(e, t, n) {
    const r = n.config.validateStatus;
    !n.status || !r || r(n.status)
      ? e(n)
      : t(
          new m(
            'Request failed with status code ' + n.status,
            [m.ERR_BAD_REQUEST, m.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
            n.config,
            n.request,
            n
          )
        );
  }
  function on(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return (t && t[1]) || '';
  }
  function an(e, t) {
    e = e || 10;
    const n = new Array(e),
      r = new Array(e);
    let s = 0,
      o = 0,
      i;
    return (
      (t = t !== void 0 ? t : 1e3),
      function (f) {
        const u = Date.now(),
          l = r[o];
        i || (i = u), (n[s] = f), (r[s] = u);
        let d = o,
          b = 0;
        for (; d !== s; ) (b += n[d++]), (d = d % e);
        if (((s = (s + 1) % e), s === o && (o = (o + 1) % e), u - i < t)) return;
        const E = l && u - l;
        return E ? Math.round((b * 1e3) / E) : void 0;
      }
    );
  }
  function cn(e, t) {
    let n = 0,
      r = 1e3 / t,
      s,
      o;
    const i = (u, l = Date.now()) => {
      (n = l), (s = null), o && (clearTimeout(o), (o = null)), e.apply(null, u);
    };
    return [
      (...u) => {
        const l = Date.now(),
          d = l - n;
        d >= r
          ? i(u, l)
          : ((s = u),
            o ||
              (o = setTimeout(() => {
                (o = null), i(s);
              }, r - d)));
      },
      () => s && i(s),
    ];
  }
  const Z = (e, t, n = 3) => {
      let r = 0;
      const s = an(50, 250);
      return cn((o) => {
        const i = o.loaded,
          c = o.lengthComputable ? o.total : void 0,
          f = i - r,
          u = s(f),
          l = i <= c;
        r = i;
        const d = {
          loaded: i,
          total: c,
          progress: c ? i / c : void 0,
          bytes: f,
          rate: u || void 0,
          estimated: u && c && l ? (c - i) / u : void 0,
          event: o,
          lengthComputable: c != null,
          [t ? 'download' : 'upload']: !0,
        };
        e(d);
      }, n);
    },
    He = (e, t) => {
      const n = e != null;
      return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
    },
    Ie =
      (e) =>
      (...t) =>
        a.asap(() => e(...t)),
    un = T.hasStandardBrowserEnv
      ? ((e, t) => (n) => ((n = new URL(n, T.origin)), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
          new URL(T.origin),
          T.navigator && /(msie|trident)/i.test(T.navigator.userAgent)
        )
      : () => !0,
    ln = T.hasStandardBrowserEnv
      ? {
          write(e, t, n, r, s, o) {
            const i = [e + '=' + encodeURIComponent(t)];
            a.isNumber(n) && i.push('expires=' + new Date(n).toGMTString()),
              a.isString(r) && i.push('path=' + r),
              a.isString(s) && i.push('domain=' + s),
              o === !0 && i.push('secure'),
              (document.cookie = i.join('; '));
          },
          read(e) {
            const t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
            return t ? decodeURIComponent(t[3]) : null;
          },
          remove(e) {
            this.write(e, '', Date.now() - 864e5);
          },
        }
      : {
          write() {},
          read() {
            return null;
          },
          remove() {},
        };
  function fn(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
  }
  function dn(e, t) {
    return t ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '') : e;
  }
  function Me(e, t) {
    return e && !fn(t) ? dn(e, t) : t;
  }
  const $e = (e) => (e instanceof O ? { ...e } : e);
  function U(e, t) {
    t = t || {};
    const n = {};
    function r(u, l, d, b) {
      return a.isPlainObject(u) && a.isPlainObject(l)
        ? a.merge.call({ caseless: b }, u, l)
        : a.isPlainObject(l)
          ? a.merge({}, l)
          : a.isArray(l)
            ? l.slice()
            : l;
    }
    function s(u, l, d, b) {
      if (a.isUndefined(l)) {
        if (!a.isUndefined(u)) return r(void 0, u, d, b);
      } else return r(u, l, d, b);
    }
    function o(u, l) {
      if (!a.isUndefined(l)) return r(void 0, l);
    }
    function i(u, l) {
      if (a.isUndefined(l)) {
        if (!a.isUndefined(u)) return r(void 0, u);
      } else return r(void 0, l);
    }
    function c(u, l, d) {
      if (d in t) return r(u, l);
      if (d in e) return r(void 0, u);
    }
    const f = {
      url: o,
      method: o,
      data: o,
      baseURL: i,
      transformRequest: i,
      transformResponse: i,
      paramsSerializer: i,
      timeout: i,
      timeoutMessage: i,
      withCredentials: i,
      withXSRFToken: i,
      adapter: i,
      responseType: i,
      xsrfCookieName: i,
      xsrfHeaderName: i,
      onUploadProgress: i,
      onDownloadProgress: i,
      decompress: i,
      maxContentLength: i,
      maxBodyLength: i,
      beforeRedirect: i,
      transport: i,
      httpAgent: i,
      httpsAgent: i,
      cancelToken: i,
      socketPath: i,
      responseEncoding: i,
      validateStatus: c,
      headers: (u, l, d) => s($e(u), $e(l), d, !0),
    };
    return (
      a.forEach(Object.keys(Object.assign({}, e, t)), function (l) {
        const d = f[l] || s,
          b = d(e[l], t[l], l);
        (a.isUndefined(b) && d !== c) || (n[l] = b);
      }),
      n
    );
  }
  const ze = (e) => {
      const t = U({}, e);
      let { data: n, withXSRFToken: r, xsrfHeaderName: s, xsrfCookieName: o, headers: i, auth: c } = t;
      (t.headers = i = O.from(i)),
        (t.url = Fe(Me(t.baseURL, t.url), e.params, e.paramsSerializer)),
        c && i.set('Authorization', 'Basic ' + btoa((c.username || '') + ':' + (c.password ? unescape(encodeURIComponent(c.password)) : '')));
      let f;
      if (a.isFormData(n)) {
        if (T.hasStandardBrowserEnv || T.hasStandardBrowserWebWorkerEnv) i.setContentType(void 0);
        else if ((f = i.getContentType()) !== !1) {
          const [u, ...l] = f
            ? f
                .split(';')
                .map((d) => d.trim())
                .filter(Boolean)
            : [];
          i.setContentType([u || 'multipart/form-data', ...l].join('; '));
        }
      }
      if (T.hasStandardBrowserEnv && (r && a.isFunction(r) && (r = r(t)), r || (r !== !1 && un(t.url)))) {
        const u = s && o && ln.read(o);
        u && i.set(s, u);
      }
      return t;
    },
    pn =
      typeof XMLHttpRequest < 'u' &&
      function (e) {
        return new Promise(function (n, r) {
          const s = ze(e);
          let o = s.data;
          const i = O.from(s.headers).normalize();
          let { responseType: c, onUploadProgress: f, onDownloadProgress: u } = s,
            l,
            d,
            b,
            E,
            p;
          function y() {
            E && E(), p && p(), s.cancelToken && s.cancelToken.unsubscribe(l), s.signal && s.signal.removeEventListener('abort', l);
          }
          let h = new XMLHttpRequest();
          h.open(s.method.toUpperCase(), s.url, !0), (h.timeout = s.timeout);
          function g() {
            if (!h) return;
            const R = O.from('getAllResponseHeaders' in h && h.getAllResponseHeaders()),
              A = {
                data: !c || c === 'text' || c === 'json' ? h.responseText : h.response,
                status: h.status,
                statusText: h.statusText,
                headers: R,
                config: e,
                request: h,
              };
            je(
              function (k) {
                n(k), y();
              },
              function (k) {
                r(k), y();
              },
              A
            ),
              (h = null);
          }
          'onloadend' in h
            ? (h.onloadend = g)
            : (h.onreadystatechange = function () {
                !h || h.readyState !== 4 || (h.status === 0 && !(h.responseURL && h.responseURL.indexOf('file:') === 0)) || setTimeout(g);
              }),
            (h.onabort = function () {
              h && (r(new m('Request aborted', m.ECONNABORTED, e, h)), (h = null));
            }),
            (h.onerror = function () {
              r(new m('Network Error', m.ERR_NETWORK, e, h)), (h = null);
            }),
            (h.ontimeout = function () {
              let P = s.timeout ? 'timeout of ' + s.timeout + 'ms exceeded' : 'timeout exceeded';
              const A = s.transitional || De;
              s.timeoutErrorMessage && (P = s.timeoutErrorMessage),
                r(new m(P, A.clarifyTimeoutError ? m.ETIMEDOUT : m.ECONNABORTED, e, h)),
                (h = null);
            }),
            o === void 0 && i.setContentType(null),
            'setRequestHeader' in h &&
              a.forEach(i.toJSON(), function (P, A) {
                h.setRequestHeader(A, P);
              }),
            a.isUndefined(s.withCredentials) || (h.withCredentials = !!s.withCredentials),
            c && c !== 'json' && (h.responseType = s.responseType),
            u && (([b, p] = Z(u, !0)), h.addEventListener('progress', b)),
            f && h.upload && (([d, E] = Z(f)), h.upload.addEventListener('progress', d), h.upload.addEventListener('loadend', E)),
            (s.cancelToken || s.signal) &&
              ((l = (R) => {
                h && (r(!R || R.type ? new H(null, e, h) : R), h.abort(), (h = null));
              }),
              s.cancelToken && s.cancelToken.subscribe(l),
              s.signal && (s.signal.aborted ? l() : s.signal.addEventListener('abort', l)));
          const S = on(s.url);
          if (S && T.protocols.indexOf(S) === -1) {
            r(new m('Unsupported protocol ' + S + ':', m.ERR_BAD_REQUEST, e));
            return;
          }
          h.send(o || null);
        });
      },
    hn = (e, t) => {
      const { length: n } = (e = e ? e.filter(Boolean) : []);
      if (t || n) {
        let r = new AbortController(),
          s;
        const o = function (u) {
          if (!s) {
            (s = !0), c();
            const l = u instanceof Error ? u : this.reason;
            r.abort(l instanceof m ? l : new H(l instanceof Error ? l.message : l));
          }
        };
        let i =
          t &&
          setTimeout(() => {
            (i = null), o(new m(`timeout ${t} of ms exceeded`, m.ETIMEDOUT));
          }, t);
        const c = () => {
          e &&
            (i && clearTimeout(i),
            (i = null),
            e.forEach((u) => {
              u.unsubscribe ? u.unsubscribe(o) : u.removeEventListener('abort', o);
            }),
            (e = null));
        };
        e.forEach((u) => u.addEventListener('abort', o));
        const { signal: f } = r;
        return (f.unsubscribe = () => a.asap(c)), f;
      }
    },
    mn = function* (e, t) {
      let n = e.byteLength;
      if (n < t) {
        yield e;
        return;
      }
      let r = 0,
        s;
      for (; r < n; ) (s = r + t), yield e.slice(r, s), (r = s);
    },
    yn = async function* (e, t) {
      for await (const n of bn(e)) yield* mn(n, t);
    },
    bn = async function* (e) {
      if (e[Symbol.asyncIterator]) {
        yield* e;
        return;
      }
      const t = e.getReader();
      try {
        for (;;) {
          const { done: n, value: r } = await t.read();
          if (n) break;
          yield r;
        }
      } finally {
        await t.cancel();
      }
    },
    Je = (e, t, n, r) => {
      const s = yn(e, t);
      let o = 0,
        i,
        c = (f) => {
          i || ((i = !0), r && r(f));
        };
      return new ReadableStream(
        {
          async pull(f) {
            try {
              const { done: u, value: l } = await s.next();
              if (u) {
                c(), f.close();
                return;
              }
              let d = l.byteLength;
              if (n) {
                let b = (o += d);
                n(b);
              }
              f.enqueue(new Uint8Array(l));
            } catch (u) {
              throw (c(u), u);
            }
          },
          cancel(f) {
            return c(f), s.return();
          },
        },
        { highWaterMark: 2 }
      );
    },
    Y = typeof fetch == 'function' && typeof Request == 'function' && typeof Response == 'function',
    ve = Y && typeof ReadableStream == 'function',
    wn =
      Y &&
      (typeof TextEncoder == 'function'
        ? (
            (e) => (t) =>
              e.encode(t)
          )(new TextEncoder())
        : async (e) => new Uint8Array(await new Response(e).arrayBuffer())),
    Ve = (e, ...t) => {
      try {
        return !!e(...t);
      } catch {
        return !1;
      }
    },
    gn =
      ve &&
      Ve(() => {
        let e = !1;
        const t = new Request(T.origin, {
          body: new ReadableStream(),
          method: 'POST',
          get duplex() {
            return (e = !0), 'half';
          },
        }).headers.has('Content-Type');
        return e && !t;
      }),
    Ke = 64 * 1024,
    pe = ve && Ve(() => a.isReadableStream(new Response('').body)),
    ee = { stream: pe && ((e) => e.body) };
  Y &&
    ((e) => {
      ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((t) => {
        !ee[t] &&
          (ee[t] = a.isFunction(e[t])
            ? (n) => n[t]()
            : (n, r) => {
                throw new m(`Response type '${t}' is not supported`, m.ERR_NOT_SUPPORT, r);
              });
      });
    })(new Response());
  const En = async (e) => {
      if (e == null) return 0;
      if (a.isBlob(e)) return e.size;
      if (a.isSpecCompliantForm(e)) return (await new Request(T.origin, { method: 'POST', body: e }).arrayBuffer()).byteLength;
      if (a.isArrayBufferView(e) || a.isArrayBuffer(e)) return e.byteLength;
      if ((a.isURLSearchParams(e) && (e = e + ''), a.isString(e))) return (await wn(e)).byteLength;
    },
    Sn = async (e, t) => {
      const n = a.toFiniteNumber(e.getContentLength());
      return n ?? En(t);
    },
    he = {
      http: Mt,
      xhr: pn,
      fetch:
        Y &&
        (async (e) => {
          let {
            url: t,
            method: n,
            data: r,
            signal: s,
            cancelToken: o,
            timeout: i,
            onDownloadProgress: c,
            onUploadProgress: f,
            responseType: u,
            headers: l,
            withCredentials: d = 'same-origin',
            fetchOptions: b,
          } = ze(e);
          u = u ? (u + '').toLowerCase() : 'text';
          let E = hn([s, o && o.toAbortSignal()], i),
            p;
          const y =
            E &&
            E.unsubscribe &&
            (() => {
              E.unsubscribe();
            });
          let h;
          try {
            if (f && gn && n !== 'get' && n !== 'head' && (h = await Sn(l, r)) !== 0) {
              let A = new Request(t, { method: 'POST', body: r, duplex: 'half' }),
                L;
              if ((a.isFormData(r) && (L = A.headers.get('content-type')) && l.setContentType(L), A.body)) {
                const [k, re] = He(h, Z(Ie(f)));
                r = Je(A.body, Ke, k, re);
              }
            }
            a.isString(d) || (d = d ? 'include' : 'omit');
            const g = 'credentials' in Request.prototype;
            p = new Request(t, {
              ...b,
              signal: E,
              method: n.toUpperCase(),
              headers: l.normalize().toJSON(),
              body: r,
              duplex: 'half',
              credentials: g ? d : void 0,
            });
            let S = await fetch(p);
            const R = pe && (u === 'stream' || u === 'response');
            if (pe && (c || (R && y))) {
              const A = {};
              ['status', 'statusText', 'headers'].forEach((et) => {
                A[et] = S[et];
              });
              const L = a.toFiniteNumber(S.headers.get('content-length')),
                [k, re] = (c && He(L, Z(Ie(c), !0))) || [];
              S = new Response(
                Je(S.body, Ke, k, () => {
                  re && re(), y && y();
                }),
                A
              );
            }
            u = u || 'text';
            let P = await ee[a.findKey(ee, u) || 'text'](S, e);
            return (
              !R && y && y(),
              await new Promise((A, L) => {
                je(A, L, { data: P, headers: O.from(S.headers), status: S.status, statusText: S.statusText, config: e, request: p });
              })
            );
          } catch (g) {
            throw (
              (y && y(),
              g && g.name === 'TypeError' && /fetch/i.test(g.message)
                ? Object.assign(new m('Network Error', m.ERR_NETWORK, e, p), { cause: g.cause || g })
                : m.from(g, g && g.code, e, p))
            );
          }
        }),
    };
  a.forEach(he, (e, t) => {
    if (e) {
      try {
        Object.defineProperty(e, 'name', { value: t });
      } catch {}
      Object.defineProperty(e, 'adapterName', { value: t });
    }
  });
  const We = (e) => `- ${e}`,
    Rn = (e) => a.isFunction(e) || e === null || e === !1,
    Xe = {
      getAdapter: (e) => {
        e = a.isArray(e) ? e : [e];
        const { length: t } = e;
        let n, r;
        const s = {};
        for (let o = 0; o < t; o++) {
          n = e[o];
          let i;
          if (((r = n), !Rn(n) && ((r = he[(i = String(n)).toLowerCase()]), r === void 0))) throw new m(`Unknown adapter '${i}'`);
          if (r) break;
          s[i || '#' + o] = r;
        }
        if (!r) {
          const o = Object.entries(s).map(
            ([c, f]) => `adapter ${c} ` + (f === !1 ? 'is not supported by the environment' : 'is not available in the build')
          );
          let i = t
            ? o.length > 1
              ? `since :
` +
                o.map(We).join(`
`)
              : ' ' + We(o[0])
            : 'as no adapter specified';
          throw new m('There is no suitable adapter to dispatch the request ' + i, 'ERR_NOT_SUPPORT');
        }
        return r;
      },
      adapters: he,
    };
  function me(e) {
    if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)) throw new H(null, e);
  }
  function Ge(e) {
    return (
      me(e),
      (e.headers = O.from(e.headers)),
      (e.data = de.call(e, e.transformRequest)),
      ['post', 'put', 'patch'].indexOf(e.method) !== -1 && e.headers.setContentType('application/x-www-form-urlencoded', !1),
      Xe.getAdapter(e.adapter || z.adapter)(e).then(
        function (r) {
          return me(e), (r.data = de.call(e, e.transformResponse, r)), (r.headers = O.from(r.headers)), r;
        },
        function (r) {
          return (
            qe(r) ||
              (me(e),
              r &&
                r.response &&
                ((r.response.data = de.call(e, e.transformResponse, r.response)), (r.response.headers = O.from(r.response.headers)))),
            Promise.reject(r)
          );
        }
      )
    );
  }
  const Qe = '1.7.9',
    te = {};
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((e, t) => {
    te[e] = function (r) {
      return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
    };
  });
  const Ze = {};
  (te.transitional = function (t, n, r) {
    function s(o, i) {
      return '[Axios v' + Qe + "] Transitional option '" + o + "'" + i + (r ? '. ' + r : '');
    }
    return (o, i, c) => {
      if (t === !1) throw new m(s(i, ' has been removed' + (n ? ' in ' + n : '')), m.ERR_DEPRECATED);
      return (
        n && !Ze[i] && ((Ze[i] = !0), console.warn(s(i, ' has been deprecated since v' + n + ' and will be removed in the near future'))),
        t ? t(o, i, c) : !0
      );
    };
  }),
    (te.spelling = function (t) {
      return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
    });
  function Tn(e, t, n) {
    if (typeof e != 'object') throw new m('options must be an object', m.ERR_BAD_OPTION_VALUE);
    const r = Object.keys(e);
    let s = r.length;
    for (; s-- > 0; ) {
      const o = r[s],
        i = t[o];
      if (i) {
        const c = e[o],
          f = c === void 0 || i(c, o, e);
        if (f !== !0) throw new m('option ' + o + ' must be ' + f, m.ERR_BAD_OPTION_VALUE);
        continue;
      }
      if (n !== !0) throw new m('Unknown option ' + o, m.ERR_BAD_OPTION);
    }
  }
  const ne = { assertOptions: Tn, validators: te },
    N = ne.validators;
  let D = class {
    constructor(t) {
      (this.defaults = t), (this.interceptors = { request: new Ue(), response: new Ue() });
    }
    async request(t, n) {
      try {
        return await this._request(t, n);
      } catch (r) {
        if (r instanceof Error) {
          let s = {};
          Error.captureStackTrace ? Error.captureStackTrace(s) : (s = new Error());
          const o = s.stack ? s.stack.replace(/^.+\n/, '') : '';
          try {
            r.stack
              ? o &&
                !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, '')) &&
                (r.stack +=
                  `
` + o)
              : (r.stack = o);
          } catch {}
        }
        throw r;
      }
    }
    _request(t, n) {
      typeof t == 'string' ? ((n = n || {}), (n.url = t)) : (n = t || {}), (n = U(this.defaults, n));
      const { transitional: r, paramsSerializer: s, headers: o } = n;
      r !== void 0 &&
        ne.assertOptions(
          r,
          {
            silentJSONParsing: N.transitional(N.boolean),
            forcedJSONParsing: N.transitional(N.boolean),
            clarifyTimeoutError: N.transitional(N.boolean),
          },
          !1
        ),
        s != null &&
          (a.isFunction(s) ? (n.paramsSerializer = { serialize: s }) : ne.assertOptions(s, { encode: N.function, serialize: N.function }, !0)),
        ne.assertOptions(n, { baseUrl: N.spelling('baseURL'), withXsrfToken: N.spelling('withXSRFToken') }, !0),
        (n.method = (n.method || this.defaults.method || 'get').toLowerCase());
      let i = o && a.merge(o.common, o[n.method]);
      o &&
        a.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (p) => {
          delete o[p];
        }),
        (n.headers = O.concat(i, o));
      const c = [];
      let f = !0;
      this.interceptors.request.forEach(function (y) {
        (typeof y.runWhen == 'function' && y.runWhen(n) === !1) || ((f = f && y.synchronous), c.unshift(y.fulfilled, y.rejected));
      });
      const u = [];
      this.interceptors.response.forEach(function (y) {
        u.push(y.fulfilled, y.rejected);
      });
      let l,
        d = 0,
        b;
      if (!f) {
        const p = [Ge.bind(this), void 0];
        for (p.unshift.apply(p, c), p.push.apply(p, u), b = p.length, l = Promise.resolve(n); d < b; ) l = l.then(p[d++], p[d++]);
        return l;
      }
      b = c.length;
      let E = n;
      for (d = 0; d < b; ) {
        const p = c[d++],
          y = c[d++];
        try {
          E = p(E);
        } catch (h) {
          y.call(this, h);
          break;
        }
      }
      try {
        l = Ge.call(this, E);
      } catch (p) {
        return Promise.reject(p);
      }
      for (d = 0, b = u.length; d < b; ) l = l.then(u[d++], u[d++]);
      return l;
    }
    getUri(t) {
      t = U(this.defaults, t);
      const n = Me(t.baseURL, t.url);
      return Fe(n, t.params, t.paramsSerializer);
    }
  };
  a.forEach(['delete', 'get', 'head', 'options'], function (t) {
    D.prototype[t] = function (n, r) {
      return this.request(U(r || {}, { method: t, url: n, data: (r || {}).data }));
    };
  }),
    a.forEach(['post', 'put', 'patch'], function (t) {
      function n(r) {
        return function (o, i, c) {
          return this.request(U(c || {}, { method: t, headers: r ? { 'Content-Type': 'multipart/form-data' } : {}, url: o, data: i }));
        };
      }
      (D.prototype[t] = n()), (D.prototype[t + 'Form'] = n(!0));
    });
  let On = class tt {
    constructor(t) {
      if (typeof t != 'function') throw new TypeError('executor must be a function.');
      let n;
      this.promise = new Promise(function (o) {
        n = o;
      });
      const r = this;
      this.promise.then((s) => {
        if (!r._listeners) return;
        let o = r._listeners.length;
        for (; o-- > 0; ) r._listeners[o](s);
        r._listeners = null;
      }),
        (this.promise.then = (s) => {
          let o;
          const i = new Promise((c) => {
            r.subscribe(c), (o = c);
          }).then(s);
          return (
            (i.cancel = function () {
              r.unsubscribe(o);
            }),
            i
          );
        }),
        t(function (o, i, c) {
          r.reason || ((r.reason = new H(o, i, c)), n(r.reason));
        });
    }
    throwIfRequested() {
      if (this.reason) throw this.reason;
    }
    subscribe(t) {
      if (this.reason) {
        t(this.reason);
        return;
      }
      this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
    }
    unsubscribe(t) {
      if (!this._listeners) return;
      const n = this._listeners.indexOf(t);
      n !== -1 && this._listeners.splice(n, 1);
    }
    toAbortSignal() {
      const t = new AbortController(),
        n = (r) => {
          t.abort(r);
        };
      return this.subscribe(n), (t.signal.unsubscribe = () => this.unsubscribe(n)), t.signal;
    }
    static source() {
      let t;
      return {
        token: new tt(function (s) {
          t = s;
        }),
        cancel: t,
      };
    }
  };
  function An(e) {
    return function (n) {
      return e.apply(null, n);
    };
  }
  function Cn(e) {
    return a.isObject(e) && e.isAxiosError === !0;
  }
  const ye = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
  };
  Object.entries(ye).forEach(([e, t]) => {
    ye[t] = e;
  });
  function Ye(e) {
    const t = new D(e),
      n = B(D.prototype.request, t);
    return (
      a.extend(n, D.prototype, t, { allOwnKeys: !0 }),
      a.extend(n, t, null, { allOwnKeys: !0 }),
      (n.create = function (s) {
        return Ye(U(e, s));
      }),
      n
    );
  }
  const w = Ye(z);
  (w.Axios = D),
    (w.CanceledError = H),
    (w.CancelToken = On),
    (w.isCancel = qe),
    (w.VERSION = Qe),
    (w.toFormData = G),
    (w.AxiosError = m),
    (w.Cancel = w.CanceledError),
    (w.all = function (t) {
      return Promise.all(t);
    }),
    (w.spread = An),
    (w.isAxiosError = Cn),
    (w.mergeConfig = U),
    (w.AxiosHeaders = O),
    (w.formToJSON = (e) => ke(a.isHTMLForm(e) ? new FormData(e) : e)),
    (w.getAdapter = Xe.getAdapter),
    (w.HttpStatusCode = ye),
    (w.default = w);
  const {
      Axios: Dn,
      AxiosError: kn,
      CanceledError: Bn,
      isCancel: qn,
      CancelToken: jn,
      VERSION: Hn,
      all: In,
      Cancel: Mn,
      isAxiosError: $n,
      spread: zn,
      toFormData: Jn,
      AxiosHeaders: vn,
      HttpStatusCode: Vn,
      formToJSON: Kn,
      getAdapter: Wn,
      mergeConfig: Xn,
    } = w,
    I = {
      debug: function () {
        window.isDebug && console.info.apply(console, arguments);
      },
      log: window.console.log.bind(window.console),
    };
  async function xn(e, t) {
    const n = new TextEncoder(),
      r = e,
      s = { name: 'HMAC', hash: 'SHA-256' },
      o = await crypto.subtle.importKey('raw', n.encode(t), s, !1, ['sign', 'verify']),
      i = await crypto.subtle.sign(s.name, o, n.encode(r));
    return Array.from(new Uint8Array(i))
      .map((f) => f.toString(16).padStart(2, '0'))
      .join('');
  }
  var v = {};
  function _(e) {
    this.settings = e;
    const t = { baseURL: e.URL, headers: {} };
    e.headers && (t.headers = e.headers),
      e.accessToken && (t.headers['Access-Token'] = e.accessToken),
      v &&
        v.env &&
        v.env.npm_package_version &&
        (t.headers['User-Agent'] = 'MicroserviceClient.' + v.env.npm_package_name + '.' + v.env.npm_package_version),
      (this.instance = w.create(t));
  }
  return (
    (_.prototype.settings = {}),
    (_.prototype._request = async function (e) {
      e.headers === void 0 && (e.headers = {});
      const t = ['PUT', 'SEARCH', 'PATCH', 'POST', 'OPTIONS'];
      if (this.settings.secureKey && t.indexOf(e.method.toUpperCase()) !== -1) {
        const n = await xn(JSON.stringify(e.data), this.settings.secureKey);
        (e.headers.signature = 'sha256=' + n), (e.headers['Access-Token'] = !1);
      }
      return (
        I.debug('reqOptions', e),
        this.instance
          .request(e)
          .then(function (n) {
            return (
              I.debug('request', n.config.headers),
              I.debug('response', n),
              I.log(n.config.method.toUpperCase(), n.config.url, n.status),
              { code: n.status, answer: n.data, headers: JSON.parse(JSON.stringify(n.headers)) }
            );
          })
          .catch(function (n) {
            return (
              I.debug('catch', n.request),
              n.response
                ? (I.log(n.response.config.method.toUpperCase(), n.response.config.url, n.response.status, n.response.data.message),
                  { code: n.response.status, error: n.response.data, headers: JSON.parse(JSON.stringify(n.response.headers)) })
                : { code: 500, error: n }
            );
          })
      );
    }),
    (_.prototype.get = function (e, t) {
      const n = { method: 'GET', url: '/' + e };
      return t !== void 0 && (n.headers = { token: t, 'Access-Token': !1 }), this._request(n);
    }),
    (_.prototype.delete = function (e, t) {
      const n = { method: 'DELETE', url: '/' + e };
      return t !== void 0 && (n.headers = { token: t, 'Access-Token': !1 }), this._request(n);
    }),
    (_.prototype.search = function (e, t) {
      const n = { method: 'SEARCH', url: '/' };
      return arguments.length === 1 && ((t = e), (e = !1)), e && (n.url += e), t && (n.data = t), this._request(n);
    }),
    (_.prototype.post = function (e, t) {
      const n = { method: 'POST', url: '/' };
      return arguments.length === 1 && ((t = e), (e = !1)), e && (n.url += e), t && (n.data = t), this._request(n);
    }),
    (_.prototype.options = function (e, t) {
      const n = { method: 'OPTIONS', url: '/' };
      return e && (n.url += e), t && (n.data = t), this._request(n);
    }),
    (_.prototype.put = function (e, t, n) {
      const r = { method: 'PUT', url: '/' + e };
      return (
        arguments.length === 2 && ((n = t), (t = !1)), t !== !1 && (r.headers = { token: t, 'Access-Token': !1 }), n && (r.data = n), this._request(r)
      );
    }),
    _
  );
});
//# sourceMappingURL=microservice-client.umd.cjs.map
