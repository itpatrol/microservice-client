function Ae(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: We } = Object.prototype, { getPrototypeOf: se } = Object, I = /* @__PURE__ */ ((e) => (t) => {
  const n = We.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), F = (e) => (e = e.toLowerCase(), (t) => I(t) === e), H = (e) => (t) => typeof t === e, { isArray: _ } = Array, L = H("undefined");
function Ke(e) {
  return e !== null && !L(e) && e.constructor !== null && !L(e.constructor) && S(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Fe = F("ArrayBuffer");
function Ge(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Fe(e.buffer), t;
}
const Xe = H("string"), S = H("function"), Re = H("number"), z = (e) => e !== null && typeof e == "object", Ze = (e) => e === !0 || e === !1, j = (e) => {
  if (I(e) !== "object")
    return !1;
  const t = se(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Qe = F("Date"), Ye = F("File"), et = F("Blob"), tt = F("FileList"), nt = (e) => z(e) && S(e.pipe), rt = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || S(e.append) && ((t = I(e)) === "formdata" || // detect form-data instance
  t === "object" && S(e.toString) && e.toString() === "[object FormData]"));
}, st = F("URLSearchParams"), ot = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function D(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, s;
  if (typeof e != "object" && (e = [e]), _(e))
    for (r = 0, s = e.length; r < s; r++)
      t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let l;
    for (r = 0; r < i; r++)
      l = o[r], t.call(null, e[l], l, e);
  }
}
function Te(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, s;
  for (; r-- > 0; )
    if (s = n[r], t === s.toLowerCase())
      return s;
  return null;
}
const Ne = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, xe = (e) => !L(e) && e !== Ne;
function Q() {
  const { caseless: e } = xe(this) && this || {}, t = {}, n = (r, s) => {
    const o = e && Te(t, s) || s;
    j(t[o]) && j(r) ? t[o] = Q(t[o], r) : j(r) ? t[o] = Q({}, r) : _(r) ? t[o] = r.slice() : t[o] = r;
  };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && D(arguments[r], n);
  return t;
}
const it = (e, t, n, { allOwnKeys: r } = {}) => (D(t, (s, o) => {
  n && S(s) ? e[o] = Ae(s, n) : e[o] = s;
}, { allOwnKeys: r }), e), at = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), ct = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, ut = (e, t, n, r) => {
  let s, o, i;
  const l = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
      i = s[o], (!r || r(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
    e = n !== !1 && se(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, lt = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, ft = (e) => {
  if (!e)
    return null;
  if (_(e))
    return e;
  let t = e.length;
  if (!Re(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, dt = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && se(Uint8Array)), ht = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let s;
  for (; (s = r.next()) && !s.done; ) {
    const o = s.value;
    t.call(e, o[0], o[1]);
  }
}, pt = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, mt = F("HTMLFormElement"), yt = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, s) {
    return r.toUpperCase() + s;
  }
), fe = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), bt = F("RegExp"), Pe = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  D(n, (s, o) => {
    let i;
    (i = t(s, o, e)) !== !1 && (r[o] = i || s);
  }), Object.defineProperties(e, r);
}, Ct = (e) => {
  Pe(e, (t, n) => {
    if (S(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (S(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, wt = (e, t) => {
  const n = {}, r = (s) => {
    s.forEach((o) => {
      n[o] = !0;
    });
  };
  return _(e) ? r(e) : r(String(e).split(t)), n;
}, gt = () => {
}, Et = (e, t) => (e = +e, Number.isFinite(e) ? e : t), W = "abcdefghijklmnopqrstuvwxyz", de = "0123456789", _e = {
  DIGIT: de,
  ALPHA: W,
  ALPHA_DIGIT: W + W.toUpperCase() + de
}, St = (e = 16, t = _e.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function Ot(e) {
  return !!(e && S(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const At = (e) => {
  const t = new Array(10), n = (r, s) => {
    if (z(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[s] = r;
        const o = _(r) ? [] : {};
        return D(r, (i, l) => {
          const m = n(i, s + 1);
          !L(m) && (o[l] = m);
        }), t[s] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, Ft = F("AsyncFunction"), Rt = (e) => e && (z(e) || S(e)) && S(e.then) && S(e.catch), u = {
  isArray: _,
  isArrayBuffer: Fe,
  isBuffer: Ke,
  isFormData: rt,
  isArrayBufferView: Ge,
  isString: Xe,
  isNumber: Re,
  isBoolean: Ze,
  isObject: z,
  isPlainObject: j,
  isUndefined: L,
  isDate: Qe,
  isFile: Ye,
  isBlob: et,
  isRegExp: bt,
  isFunction: S,
  isStream: nt,
  isURLSearchParams: st,
  isTypedArray: dt,
  isFileList: tt,
  forEach: D,
  merge: Q,
  extend: it,
  trim: ot,
  stripBOM: at,
  inherits: ct,
  toFlatObject: ut,
  kindOf: I,
  kindOfTest: F,
  endsWith: lt,
  toArray: ft,
  forEachEntry: ht,
  matchAll: pt,
  isHTMLForm: mt,
  hasOwnProperty: fe,
  hasOwnProp: fe,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Pe,
  freezeMethods: Ct,
  toObjectSet: wt,
  toCamelCase: yt,
  noop: gt,
  toFiniteNumber: Et,
  findKey: Te,
  global: Ne,
  isContextDefined: xe,
  ALPHABET: _e,
  generateString: St,
  isSpecCompliantForm: Ot,
  toJSONObject: At,
  isAsyncFn: Ft,
  isThenable: Rt
};
function y(e, t, n, r, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), s && (this.response = s);
}
u.inherits(y, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: u.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const ke = y.prototype, Ue = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Ue[e] = { value: e };
});
Object.defineProperties(y, Ue);
Object.defineProperty(ke, "isAxiosError", { value: !0 });
y.from = (e, t, n, r, s, o) => {
  const i = Object.create(ke);
  return u.toFlatObject(e, i, function(m) {
    return m !== Error.prototype;
  }, (l) => l !== "isAxiosError"), y.call(i, e.message, t, n, r, s), i.cause = e, i.name = e.name, o && Object.assign(i, o), i;
};
const Tt = null;
function Y(e) {
  return u.isPlainObject(e) || u.isArray(e);
}
function Le(e) {
  return u.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function he(e, t, n) {
  return e ? e.concat(t).map(function(s, o) {
    return s = Le(s), !n && o ? "[" + s + "]" : s;
  }).join(n ? "." : "") : t;
}
function Nt(e) {
  return u.isArray(e) && !e.some(Y);
}
const xt = u.toFlatObject(u, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function J(e, t, n) {
  if (!u.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = u.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(d, b) {
    return !u.isUndefined(b[d]);
  });
  const r = n.metaTokens, s = n.visitor || c, o = n.dots, i = n.indexes, m = (n.Blob || typeof Blob < "u" && Blob) && u.isSpecCompliantForm(t);
  if (!u.isFunction(s))
    throw new TypeError("visitor must be a function");
  function f(p) {
    if (p === null)
      return "";
    if (u.isDate(p))
      return p.toISOString();
    if (!m && u.isBlob(p))
      throw new y("Blob is not supported. Use a Buffer instead.");
    return u.isArrayBuffer(p) || u.isTypedArray(p) ? m && typeof Blob == "function" ? new Blob([p]) : Buffer.from(p) : p;
  }
  function c(p, d, b) {
    let w = p;
    if (p && !b && typeof p == "object") {
      if (u.endsWith(d, "{}"))
        d = r ? d : d.slice(0, -2), p = JSON.stringify(p);
      else if (u.isArray(p) && Nt(p) || (u.isFileList(p) || u.endsWith(d, "[]")) && (w = u.toArray(p)))
        return d = Le(d), w.forEach(function(O, x) {
          !(u.isUndefined(O) || O === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? he([d], x, o) : i === null ? d : d + "[]",
            f(O)
          );
        }), !1;
    }
    return Y(p) ? !0 : (t.append(he(b, d, o), f(p)), !1);
  }
  const a = [], h = Object.assign(xt, {
    defaultVisitor: c,
    convertValue: f,
    isVisitable: Y
  });
  function C(p, d) {
    if (!u.isUndefined(p)) {
      if (a.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + d.join("."));
      a.push(p), u.forEach(p, function(w, E) {
        (!(u.isUndefined(w) || w === null) && s.call(
          t,
          w,
          u.isString(E) ? E.trim() : E,
          d,
          h
        )) === !0 && C(w, d ? d.concat(E) : [E]);
      }), a.pop();
    }
  }
  if (!u.isObject(e))
    throw new TypeError("data must be an object");
  return C(e), t;
}
function pe(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function oe(e, t) {
  this._pairs = [], e && J(e, this, t);
}
const De = oe.prototype;
De.append = function(t, n) {
  this._pairs.push([t, n]);
};
De.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, pe);
  } : pe;
  return this._pairs.map(function(s) {
    return n(s[0]) + "=" + n(s[1]);
  }, "").join("&");
};
function Pt(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Be(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || Pt, s = n && n.serialize;
  let o;
  if (s ? o = s(t, n) : o = u.isURLSearchParams(t) ? t.toString() : new oe(t, n).toString(r), o) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class me {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    u.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const je = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, _t = typeof URLSearchParams < "u" ? URLSearchParams : oe, kt = typeof FormData < "u" ? FormData : null, Ut = typeof Blob < "u" ? Blob : null, Lt = {
  isBrowser: !0,
  classes: {
    URLSearchParams: _t,
    FormData: kt,
    Blob: Ut
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, ve = typeof window < "u" && typeof document < "u", Dt = ((e) => ve && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product), Bt = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: ve,
  hasStandardBrowserEnv: Dt,
  hasStandardBrowserWebWorkerEnv: Bt
}, Symbol.toStringTag, { value: "Module" })), A = {
  ...jt,
  ...Lt
};
function vt(e, t) {
  return J(e, new A.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, s, o) {
      return A.isNode && u.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function qt(e) {
  return u.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Mt(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++)
    o = n[r], t[o] = e[o];
  return t;
}
function qe(e) {
  function t(n, r, s, o) {
    let i = n[o++];
    if (i === "__proto__")
      return !0;
    const l = Number.isFinite(+i), m = o >= n.length;
    return i = !i && u.isArray(s) ? s.length : i, m ? (u.hasOwnProp(s, i) ? s[i] = [s[i], r] : s[i] = r, !l) : ((!s[i] || !u.isObject(s[i])) && (s[i] = []), t(n, r, s[i], o) && u.isArray(s[i]) && (s[i] = Mt(s[i])), !l);
  }
  if (u.isFormData(e) && u.isFunction(e.entries)) {
    const n = {};
    return u.forEachEntry(e, (r, s) => {
      t(qt(r), s, n, 0);
    }), n;
  }
  return null;
}
function It(e, t, n) {
  if (u.isString(e))
    try {
      return (t || JSON.parse)(e), u.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const ie = {
  transitional: je,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", s = r.indexOf("application/json") > -1, o = u.isObject(t);
    if (o && u.isHTMLForm(t) && (t = new FormData(t)), u.isFormData(t))
      return s ? JSON.stringify(qe(t)) : t;
    if (u.isArrayBuffer(t) || u.isBuffer(t) || u.isStream(t) || u.isFile(t) || u.isBlob(t))
      return t;
    if (u.isArrayBufferView(t))
      return t.buffer;
    if (u.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return vt(t, this.formSerializer).toString();
      if ((l = u.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const m = this.env && this.env.FormData;
        return J(
          l ? { "files[]": t } : t,
          m && new m(),
          this.formSerializer
        );
      }
    }
    return o || s ? (n.setContentType("application/json", !1), It(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || ie.transitional, r = n && n.forcedJSONParsing, s = this.responseType === "json";
    if (t && u.isString(t) && (r && !this.responseType || s)) {
      const i = !(n && n.silentJSONParsing) && s;
      try {
        return JSON.parse(t);
      } catch (l) {
        if (i)
          throw l.name === "SyntaxError" ? y.from(l, y.ERR_BAD_RESPONSE, this, null, this.response) : l;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: A.classes.FormData,
    Blob: A.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
u.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  ie.headers[e] = {};
});
const ae = ie, Ht = u.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), zt = (e) => {
  const t = {};
  let n, r, s;
  return e && e.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), n = i.substring(0, s).trim().toLowerCase(), r = i.substring(s + 1).trim(), !(!n || t[n] && Ht[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, ye = Symbol("internals");
function k(e) {
  return e && String(e).trim().toLowerCase();
}
function v(e) {
  return e === !1 || e == null ? e : u.isArray(e) ? e.map(v) : String(e);
}
function Jt(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const $t = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function K(e, t, n, r, s) {
  if (u.isFunction(r))
    return r.call(this, t, n);
  if (s && (t = n), !!u.isString(t)) {
    if (u.isString(r))
      return t.indexOf(r) !== -1;
    if (u.isRegExp(r))
      return r.test(t);
  }
}
function Vt(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Wt(e, t) {
  const n = u.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(s, o, i) {
        return this[r].call(this, t, s, o, i);
      },
      configurable: !0
    });
  });
}
class $ {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function o(l, m, f) {
      const c = k(m);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const a = u.findKey(s, c);
      (!a || s[a] === void 0 || f === !0 || f === void 0 && s[a] !== !1) && (s[a || m] = v(l));
    }
    const i = (l, m) => u.forEach(l, (f, c) => o(f, c, m));
    return u.isPlainObject(t) || t instanceof this.constructor ? i(t, n) : u.isString(t) && (t = t.trim()) && !$t(t) ? i(zt(t), n) : t != null && o(n, t, r), this;
  }
  get(t, n) {
    if (t = k(t), t) {
      const r = u.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n)
          return s;
        if (n === !0)
          return Jt(s);
        if (u.isFunction(n))
          return n.call(this, s, r);
        if (u.isRegExp(n))
          return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = k(t), t) {
      const r = u.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || K(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function o(i) {
      if (i = k(i), i) {
        const l = u.findKey(r, i);
        l && (!n || K(r, r[l], l, n)) && (delete r[l], s = !0);
      }
    }
    return u.isArray(t) ? t.forEach(o) : o(t), s;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, s = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || K(this, this[o], o, t, !0)) && (delete this[o], s = !0);
    }
    return s;
  }
  normalize(t) {
    const n = this, r = {};
    return u.forEach(this, (s, o) => {
      const i = u.findKey(r, o);
      if (i) {
        n[i] = v(s), delete n[o];
        return;
      }
      const l = t ? Vt(o) : String(o).trim();
      l !== o && delete n[o], n[l] = v(s), r[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return u.forEach(this, (r, s) => {
      r != null && r !== !1 && (n[s] = t && u.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((s) => r.set(s)), r;
  }
  static accessor(t) {
    const r = (this[ye] = this[ye] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function o(i) {
      const l = k(i);
      r[l] || (Wt(s, i), r[l] = !0);
    }
    return u.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
$.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
u.reduceDescriptors($.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
u.freezeMethods($);
const R = $;
function G(e, t) {
  const n = this || ae, r = t || n, s = R.from(r.headers);
  let o = r.data;
  return u.forEach(e, function(l) {
    o = l.call(n, o, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), o;
}
function Me(e) {
  return !!(e && e.__CANCEL__);
}
function B(e, t, n) {
  y.call(this, e ?? "canceled", y.ERR_CANCELED, t, n), this.name = "CanceledError";
}
u.inherits(B, y, {
  __CANCEL__: !0
});
function Kt(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new y(
    "Request failed with status code " + n.status,
    [y.ERR_BAD_REQUEST, y.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const Gt = A.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, s, o) {
      const i = [e + "=" + encodeURIComponent(t)];
      u.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()), u.isString(r) && i.push("path=" + r), u.isString(s) && i.push("domain=" + s), o === !0 && i.push("secure"), document.cookie = i.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Xt(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Zt(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Ie(e, t) {
  return e && !Xt(t) ? Zt(e, t) : t;
}
const Qt = A.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
    let r;
    function s(o) {
      let i = o;
      return t && (n.setAttribute("href", i), i = n.href), n.setAttribute("href", i), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return r = s(window.location.href), function(i) {
      const l = u.isString(i) ? s(i) : i;
      return l.protocol === r.protocol && l.host === r.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
);
function Yt(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function en(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let s = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(m) {
    const f = Date.now(), c = r[o];
    i || (i = f), n[s] = m, r[s] = f;
    let a = o, h = 0;
    for (; a !== s; )
      h += n[a++], a = a % e;
    if (s = (s + 1) % e, s === o && (o = (o + 1) % e), f - i < t)
      return;
    const C = c && f - c;
    return C ? Math.round(h * 1e3 / C) : void 0;
  };
}
function be(e, t) {
  let n = 0;
  const r = en(50, 250);
  return (s) => {
    const o = s.loaded, i = s.lengthComputable ? s.total : void 0, l = o - n, m = r(l), f = o <= i;
    n = o;
    const c = {
      loaded: o,
      total: i,
      progress: i ? o / i : void 0,
      bytes: l,
      rate: m || void 0,
      estimated: m && i && f ? (i - o) / m : void 0,
      event: s
    };
    c[t ? "download" : "upload"] = !0, e(c);
  };
}
const tn = typeof XMLHttpRequest < "u", nn = tn && function(e) {
  return new Promise(function(n, r) {
    let s = e.data;
    const o = R.from(e.headers).normalize();
    let { responseType: i, withXSRFToken: l } = e, m;
    function f() {
      e.cancelToken && e.cancelToken.unsubscribe(m), e.signal && e.signal.removeEventListener("abort", m);
    }
    let c;
    if (u.isFormData(s)) {
      if (A.hasStandardBrowserEnv || A.hasStandardBrowserWebWorkerEnv)
        o.setContentType(!1);
      else if ((c = o.getContentType()) !== !1) {
        const [d, ...b] = c ? c.split(";").map((w) => w.trim()).filter(Boolean) : [];
        o.setContentType([d || "multipart/form-data", ...b].join("; "));
      }
    }
    let a = new XMLHttpRequest();
    if (e.auth) {
      const d = e.auth.username || "", b = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(d + ":" + b));
    }
    const h = Ie(e.baseURL, e.url);
    a.open(e.method.toUpperCase(), Be(h, e.params, e.paramsSerializer), !0), a.timeout = e.timeout;
    function C() {
      if (!a)
        return;
      const d = R.from(
        "getAllResponseHeaders" in a && a.getAllResponseHeaders()
      ), w = {
        data: !i || i === "text" || i === "json" ? a.responseText : a.response,
        status: a.status,
        statusText: a.statusText,
        headers: d,
        config: e,
        request: a
      };
      Kt(function(O) {
        n(O), f();
      }, function(O) {
        r(O), f();
      }, w), a = null;
    }
    if ("onloadend" in a ? a.onloadend = C : a.onreadystatechange = function() {
      !a || a.readyState !== 4 || a.status === 0 && !(a.responseURL && a.responseURL.indexOf("file:") === 0) || setTimeout(C);
    }, a.onabort = function() {
      a && (r(new y("Request aborted", y.ECONNABORTED, e, a)), a = null);
    }, a.onerror = function() {
      r(new y("Network Error", y.ERR_NETWORK, e, a)), a = null;
    }, a.ontimeout = function() {
      let b = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const w = e.transitional || je;
      e.timeoutErrorMessage && (b = e.timeoutErrorMessage), r(new y(
        b,
        w.clarifyTimeoutError ? y.ETIMEDOUT : y.ECONNABORTED,
        e,
        a
      )), a = null;
    }, A.hasStandardBrowserEnv && (l && u.isFunction(l) && (l = l(e)), l || l !== !1 && Qt(h))) {
      const d = e.xsrfHeaderName && e.xsrfCookieName && Gt.read(e.xsrfCookieName);
      d && o.set(e.xsrfHeaderName, d);
    }
    s === void 0 && o.setContentType(null), "setRequestHeader" in a && u.forEach(o.toJSON(), function(b, w) {
      a.setRequestHeader(w, b);
    }), u.isUndefined(e.withCredentials) || (a.withCredentials = !!e.withCredentials), i && i !== "json" && (a.responseType = e.responseType), typeof e.onDownloadProgress == "function" && a.addEventListener("progress", be(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && a.upload && a.upload.addEventListener("progress", be(e.onUploadProgress)), (e.cancelToken || e.signal) && (m = (d) => {
      a && (r(!d || d.type ? new B(null, e, a) : d), a.abort(), a = null);
    }, e.cancelToken && e.cancelToken.subscribe(m), e.signal && (e.signal.aborted ? m() : e.signal.addEventListener("abort", m)));
    const p = Yt(h);
    if (p && A.protocols.indexOf(p) === -1) {
      r(new y("Unsupported protocol " + p + ":", y.ERR_BAD_REQUEST, e));
      return;
    }
    a.send(s || null);
  });
}, ee = {
  http: Tt,
  xhr: nn
};
u.forEach(ee, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Ce = (e) => `- ${e}`, rn = (e) => u.isFunction(e) || e === null || e === !1, He = {
  getAdapter: (e) => {
    e = u.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const s = {};
    for (let o = 0; o < t; o++) {
      n = e[o];
      let i;
      if (r = n, !rn(n) && (r = ee[(i = String(n)).toLowerCase()], r === void 0))
        throw new y(`Unknown adapter '${i}'`);
      if (r)
        break;
      s[i || "#" + o] = r;
    }
    if (!r) {
      const o = Object.entries(s).map(
        ([l, m]) => `adapter ${l} ` + (m === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = t ? o.length > 1 ? `since :
` + o.map(Ce).join(`
`) : " " + Ce(o[0]) : "as no adapter specified";
      throw new y(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: ee
};
function X(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new B(null, e);
}
function we(e) {
  return X(e), e.headers = R.from(e.headers), e.data = G.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), He.getAdapter(e.adapter || ae.adapter)(e).then(function(r) {
    return X(e), r.data = G.call(
      e,
      e.transformResponse,
      r
    ), r.headers = R.from(r.headers), r;
  }, function(r) {
    return Me(r) || (X(e), r && r.response && (r.response.data = G.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = R.from(r.response.headers))), Promise.reject(r);
  });
}
const ge = (e) => e instanceof R ? e.toJSON() : e;
function P(e, t) {
  t = t || {};
  const n = {};
  function r(f, c, a) {
    return u.isPlainObject(f) && u.isPlainObject(c) ? u.merge.call({ caseless: a }, f, c) : u.isPlainObject(c) ? u.merge({}, c) : u.isArray(c) ? c.slice() : c;
  }
  function s(f, c, a) {
    if (u.isUndefined(c)) {
      if (!u.isUndefined(f))
        return r(void 0, f, a);
    } else
      return r(f, c, a);
  }
  function o(f, c) {
    if (!u.isUndefined(c))
      return r(void 0, c);
  }
  function i(f, c) {
    if (u.isUndefined(c)) {
      if (!u.isUndefined(f))
        return r(void 0, f);
    } else
      return r(void 0, c);
  }
  function l(f, c, a) {
    if (a in t)
      return r(f, c);
    if (a in e)
      return r(void 0, f);
  }
  const m = {
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
    validateStatus: l,
    headers: (f, c) => s(ge(f), ge(c), !0)
  };
  return u.forEach(Object.keys(Object.assign({}, e, t)), function(c) {
    const a = m[c] || s, h = a(e[c], t[c], c);
    u.isUndefined(h) && a !== l || (n[c] = h);
  }), n;
}
const ze = "1.6.7", ce = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  ce[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Ee = {};
ce.transitional = function(t, n, r) {
  function s(o, i) {
    return "[Axios v" + ze + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, l) => {
    if (t === !1)
      throw new y(
        s(i, " has been removed" + (n ? " in " + n : "")),
        y.ERR_DEPRECATED
      );
    return n && !Ee[i] && (Ee[i] = !0, console.warn(
      s(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, l) : !0;
  };
};
function sn(e, t, n) {
  if (typeof e != "object")
    throw new y("options must be an object", y.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s], i = t[o];
    if (i) {
      const l = e[o], m = l === void 0 || i(l, o, e);
      if (m !== !0)
        throw new y("option " + o + " must be " + m, y.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new y("Unknown option " + o, y.ERR_BAD_OPTION);
  }
}
const te = {
  assertOptions: sn,
  validators: ce
}, N = te.validators;
class M {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new me(),
      response: new me()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let s;
        Error.captureStackTrace ? Error.captureStackTrace(s = {}) : s = new Error();
        const o = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        r.stack ? o && !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + o) : r.stack = o;
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = P(this.defaults, n);
    const { transitional: r, paramsSerializer: s, headers: o } = n;
    r !== void 0 && te.assertOptions(r, {
      silentJSONParsing: N.transitional(N.boolean),
      forcedJSONParsing: N.transitional(N.boolean),
      clarifyTimeoutError: N.transitional(N.boolean)
    }, !1), s != null && (u.isFunction(s) ? n.paramsSerializer = {
      serialize: s
    } : te.assertOptions(s, {
      encode: N.function,
      serialize: N.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = o && u.merge(
      o.common,
      o[n.method]
    );
    o && u.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (p) => {
        delete o[p];
      }
    ), n.headers = R.concat(i, o);
    const l = [];
    let m = !0;
    this.interceptors.request.forEach(function(d) {
      typeof d.runWhen == "function" && d.runWhen(n) === !1 || (m = m && d.synchronous, l.unshift(d.fulfilled, d.rejected));
    });
    const f = [];
    this.interceptors.response.forEach(function(d) {
      f.push(d.fulfilled, d.rejected);
    });
    let c, a = 0, h;
    if (!m) {
      const p = [we.bind(this), void 0];
      for (p.unshift.apply(p, l), p.push.apply(p, f), h = p.length, c = Promise.resolve(n); a < h; )
        c = c.then(p[a++], p[a++]);
      return c;
    }
    h = l.length;
    let C = n;
    for (a = 0; a < h; ) {
      const p = l[a++], d = l[a++];
      try {
        C = p(C);
      } catch (b) {
        d.call(this, b);
        break;
      }
    }
    try {
      c = we.call(this, C);
    } catch (p) {
      return Promise.reject(p);
    }
    for (a = 0, h = f.length; a < h; )
      c = c.then(f[a++], f[a++]);
    return c;
  }
  getUri(t) {
    t = P(this.defaults, t);
    const n = Ie(t.baseURL, t.url);
    return Be(n, t.params, t.paramsSerializer);
  }
}
u.forEach(["delete", "get", "head", "options"], function(t) {
  M.prototype[t] = function(n, r) {
    return this.request(P(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
u.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(o, i, l) {
      return this.request(P(l || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  M.prototype[t] = n(), M.prototype[t + "Form"] = n(!0);
});
const q = M;
class ue {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const r = this;
    this.promise.then((s) => {
      if (!r._listeners)
        return;
      let o = r._listeners.length;
      for (; o-- > 0; )
        r._listeners[o](s);
      r._listeners = null;
    }), this.promise.then = (s) => {
      let o;
      const i = new Promise((l) => {
        r.subscribe(l), o = l;
      }).then(s);
      return i.cancel = function() {
        r.unsubscribe(o);
      }, i;
    }, t(function(o, i, l) {
      r.reason || (r.reason = new B(o, i, l), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new ue(function(s) {
        t = s;
      }),
      cancel: t
    };
  }
}
const on = ue;
function an(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function cn(e) {
  return u.isObject(e) && e.isAxiosError === !0;
}
const ne = {
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
  NetworkAuthenticationRequired: 511
};
Object.entries(ne).forEach(([e, t]) => {
  ne[t] = e;
});
const un = ne;
function Je(e) {
  const t = new q(e), n = Ae(q.prototype.request, t);
  return u.extend(n, q.prototype, t, { allOwnKeys: !0 }), u.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(s) {
    return Je(P(e, s));
  }, n;
}
const g = Je(ae);
g.Axios = q;
g.CanceledError = B;
g.CancelToken = on;
g.isCancel = Me;
g.VERSION = ze;
g.toFormData = J;
g.AxiosError = y;
g.Cancel = g.CanceledError;
g.all = function(t) {
  return Promise.all(t);
};
g.spread = an;
g.isAxiosError = cn;
g.mergeConfig = P;
g.AxiosHeaders = R;
g.formToJSON = (e) => qe(u.isHTMLForm(e) ? new FormData(e) : e);
g.getAdapter = He.getAdapter;
g.HttpStatusCode = un;
g.default = g;
function ln(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var re = { exports: {} }, Z, Se;
function fn() {
  if (Se)
    return Z;
  Se = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, s = r * 7, o = r * 365.25;
  Z = function(c, a) {
    a = a || {};
    var h = typeof c;
    if (h === "string" && c.length > 0)
      return i(c);
    if (h === "number" && isFinite(c))
      return a.long ? m(c) : l(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function i(c) {
    if (c = String(c), !(c.length > 100)) {
      var a = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (a) {
        var h = parseFloat(a[1]), C = (a[2] || "ms").toLowerCase();
        switch (C) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * o;
          case "weeks":
          case "week":
          case "w":
            return h * s;
          case "days":
          case "day":
          case "d":
            return h * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function l(c) {
    var a = Math.abs(c);
    return a >= r ? Math.round(c / r) + "d" : a >= n ? Math.round(c / n) + "h" : a >= t ? Math.round(c / t) + "m" : a >= e ? Math.round(c / e) + "s" : c + "ms";
  }
  function m(c) {
    var a = Math.abs(c);
    return a >= r ? f(c, a, r, "day") : a >= n ? f(c, a, n, "hour") : a >= t ? f(c, a, t, "minute") : a >= e ? f(c, a, e, "second") : c + " ms";
  }
  function f(c, a, h, C) {
    var p = a >= h * 1.5;
    return Math.round(c / h) + " " + C + (p ? "s" : "");
  }
  return Z;
}
function dn(e) {
  n.debug = n, n.default = n, n.coerce = m, n.disable = o, n.enable = s, n.enabled = i, n.humanize = fn(), n.destroy = f, Object.keys(e).forEach((c) => {
    n[c] = e[c];
  }), n.names = [], n.skips = [], n.formatters = {};
  function t(c) {
    let a = 0;
    for (let h = 0; h < c.length; h++)
      a = (a << 5) - a + c.charCodeAt(h), a |= 0;
    return n.colors[Math.abs(a) % n.colors.length];
  }
  n.selectColor = t;
  function n(c) {
    let a, h = null, C, p;
    function d(...b) {
      if (!d.enabled)
        return;
      const w = d, E = Number(/* @__PURE__ */ new Date()), O = E - (a || E);
      w.diff = O, w.prev = a, w.curr = E, a = E, b[0] = n.coerce(b[0]), typeof b[0] != "string" && b.unshift("%O");
      let x = 0;
      b[0] = b[0].replace(/%([a-zA-Z%])/g, (V, $e) => {
        if (V === "%%")
          return "%";
        x++;
        const le = n.formatters[$e];
        if (typeof le == "function") {
          const Ve = b[x];
          V = le.call(w, Ve), b.splice(x, 1), x--;
        }
        return V;
      }), n.formatArgs.call(w, b), (w.log || n.log).apply(w, b);
    }
    return d.namespace = c, d.useColors = n.useColors(), d.color = n.selectColor(c), d.extend = r, d.destroy = n.destroy, Object.defineProperty(d, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => h !== null ? h : (C !== n.namespaces && (C = n.namespaces, p = n.enabled(c)), p),
      set: (b) => {
        h = b;
      }
    }), typeof n.init == "function" && n.init(d), d;
  }
  function r(c, a) {
    const h = n(this.namespace + (typeof a > "u" ? ":" : a) + c);
    return h.log = this.log, h;
  }
  function s(c) {
    n.save(c), n.namespaces = c, n.names = [], n.skips = [];
    let a;
    const h = (typeof c == "string" ? c : "").split(/[\s,]+/), C = h.length;
    for (a = 0; a < C; a++)
      h[a] && (c = h[a].replace(/\*/g, ".*?"), c[0] === "-" ? n.skips.push(new RegExp("^" + c.slice(1) + "$")) : n.names.push(new RegExp("^" + c + "$")));
  }
  function o() {
    const c = [
      ...n.names.map(l),
      ...n.skips.map(l).map((a) => "-" + a)
    ].join(",");
    return n.enable(""), c;
  }
  function i(c) {
    if (c[c.length - 1] === "*")
      return !0;
    let a, h;
    for (a = 0, h = n.skips.length; a < h; a++)
      if (n.skips[a].test(c))
        return !1;
    for (a = 0, h = n.names.length; a < h; a++)
      if (n.names[a].test(c))
        return !0;
    return !1;
  }
  function l(c) {
    return c.toString().substring(2, c.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function m(c) {
    return c instanceof Error ? c.stack || c.message : c;
  }
  function f() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return n.enable(n.load()), n;
}
var hn = dn;
(function(e, t) {
  var n = {};
  t.formatArgs = s, t.save = o, t.load = i, t.useColors = r, t.storage = l(), t.destroy = /* @__PURE__ */ (() => {
    let f = !1;
    return () => {
      f || (f = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), t.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function r() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function s(f) {
    if (f[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + f[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
      return;
    const c = "color: " + this.color;
    f.splice(1, 0, c, "color: inherit");
    let a = 0, h = 0;
    f[0].replace(/%[a-zA-Z%]/g, (C) => {
      C !== "%%" && (a++, C === "%c" && (h = a));
    }), f.splice(h, 0, c);
  }
  t.log = console.debug || console.log || (() => {
  });
  function o(f) {
    try {
      f ? t.storage.setItem("debug", f) : t.storage.removeItem("debug");
    } catch {
    }
  }
  function i() {
    let f;
    try {
      f = t.storage.getItem("debug");
    } catch {
    }
    return !f && typeof n < "u" && "env" in n && (f = n.env.DEBUG), f;
  }
  function l() {
    try {
      return localStorage;
    } catch {
    }
  }
  e.exports = hn(t);
  const { formatters: m } = e.exports;
  m.j = function(f) {
    try {
      return JSON.stringify(f);
    } catch (c) {
      return "[UnexpectedJSONParseError]: " + c.message;
    }
  };
})(re, re.exports);
var pn = re.exports;
const Oe = /* @__PURE__ */ ln(pn);
async function mn(e, t) {
  const n = new TextEncoder(), r = e, s = { name: "HMAC", hash: "SHA-256" }, o = await crypto.subtle.importKey(
    "raw",
    n.encode(t),
    s,
    !1,
    ["sign", "verify"]
  ), i = await crypto.subtle.sign(
    s.name,
    o,
    n.encode(r)
  );
  return Array.from(new Uint8Array(i)).map((m) => m.toString(16).padStart(2, "0")).join("");
}
var U = {};
function T(e) {
  this.settings = e;
  var t = {
    baseURL: e.URL,
    headers: {}
  };
  e.headers && (t.headers = e.headers), e.accessToken && (t.headers["Access-Token"] = e.accessToken), U && U.env && U.env.npm_package_version && (t.headers["User-Agent"] = "MicroserviceClient." + U.env.npm_package_name + "." + U.env.npm_package_version), this.instance = g.create(t);
}
T.prototype.settings = {};
T.prototype.debug = {
  debug: Oe("microservice-client:debug"),
  log: Oe("microservice-client:log")
};
T.prototype._request = async function(e) {
  var t = this;
  e.headers == null && (e.headers = {});
  var n = ["PUT", "SEARCH", "PATCH", "POST", "OPTIONS"];
  if (this.settings.secureKey && n.indexOf(e.method.toUpperCase()) !== -1) {
    var r = await mn(JSON.stringify(e.data), this.settings.secureKey);
    e.headers.signature = "sha256=" + r, e.headers["Access-Token"] = !1;
  }
  return this.debug.log("reqOptions", e), this.instance.request(e).then(function(s) {
    return t.debug.log("request", s.config.headers), t.debug.debug("response", s), t.debug.log(s.config.method.toUpperCase(), s.config.url, s.status), {
      code: s.status,
      answer: s.data,
      headers: s.headers
    };
  }).catch(function(s) {
    return t.debug.debug("catch", s.request), s.response ? (t.debug.log(s.response.config.method.toUpperCase(), s.response.config.url, s.response.status, s.response.data.message), {
      code: s.response.status,
      error: s.response.data,
      headers: s.response.headers
    }) : {
      code: 500,
      error: s
    };
  });
};
T.prototype.get = function(e, t) {
  var n = {
    method: "GET",
    url: "/" + e
  };
  return t != null && (n.headers = {
    token: t,
    "Access-Token": !1
  }), this._request(n);
};
T.prototype.delete = function(e, t) {
  var n = {
    method: "DELETE",
    url: "/" + e
  };
  return t != null && (n.headers = {
    token: t,
    "Access-Token": !1
  }), this._request(n);
};
T.prototype.search = function(e, t) {
  var n = {
    method: "SEARCH",
    url: "/"
  };
  return arguments.length === 1 && (t = e, e = !1), e && (n.url += e), t && (n.data = t), this._request(n);
};
T.prototype.post = function(e, t) {
  var n = {
    method: "POST",
    url: "/"
  };
  return arguments.length === 1 && (t = e, e = !1), e && (n.url += e), t && (n.data = t), this._request(n);
};
T.prototype.options = function(e, t) {
  var n = {
    method: "OPTIONS",
    url: "/"
  };
  return e && (n.url += e), t && (n.data = t), this._request(n);
};
T.prototype.put = function(e, t, n) {
  var r = {
    method: "PUT",
    url: "/" + e
  };
  return arguments.length === 2 && (n = t, t = !1), t != !1 && (r.headers = {
    token: t,
    "Access-Token": !1
  }), n && (r.data = n), this._request(r);
};
export {
  T as default
};
//# sourceMappingURL=microservice-client.js.map
