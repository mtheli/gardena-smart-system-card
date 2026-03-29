
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
/**
 * Gardena Smart System Card for Home Assistant
 * Supports multiple backend integrations:
 *   - hass-gardena-smart-system (thecem / py-smart-gardena)
 *   - ha-gardena-smart-system (kayloehmann)
 */ /**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $def2de46b9306e8a$var$t = globalThis, $def2de46b9306e8a$export$b4d10f6001c083c2 = $def2de46b9306e8a$var$t.ShadowRoot && (void 0 === $def2de46b9306e8a$var$t.ShadyCSS || $def2de46b9306e8a$var$t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $def2de46b9306e8a$var$s = Symbol(), $def2de46b9306e8a$var$o = new WeakMap;
class $def2de46b9306e8a$export$505d1e8739bad805 {
    constructor(t, e, o){
        if (this._$cssResult$ = !0, o !== $def2de46b9306e8a$var$s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = e;
    }
    get styleSheet() {
        let t = this.o;
        const s = this.t;
        if ($def2de46b9306e8a$export$b4d10f6001c083c2 && void 0 === t) {
            const e = void 0 !== s && 1 === s.length;
            e && (t = $def2de46b9306e8a$var$o.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), e && $def2de46b9306e8a$var$o.set(s, t));
        }
        return t;
    }
    toString() {
        return this.cssText;
    }
}
const $def2de46b9306e8a$export$8d80f9cac07cdb3 = (t)=>new $def2de46b9306e8a$export$505d1e8739bad805("string" == typeof t ? t : t + "", void 0, $def2de46b9306e8a$var$s), $def2de46b9306e8a$export$dbf350e5966cf602 = (t, ...e)=>{
    const o = 1 === t.length ? t[0] : e.reduce((e, s, o)=>e + ((t)=>{
            if (!0 === t._$cssResult$) return t.cssText;
            if ("number" == typeof t) return t;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(s) + t[o + 1], t[0]);
    return new $def2de46b9306e8a$export$505d1e8739bad805(o, t, $def2de46b9306e8a$var$s);
}, $def2de46b9306e8a$export$2ca4a66ec4cecb90 = (s, o)=>{
    if ($def2de46b9306e8a$export$b4d10f6001c083c2) s.adoptedStyleSheets = o.map((t)=>t instanceof CSSStyleSheet ? t : t.styleSheet);
    else for (const e of o){
        const o = document.createElement("style"), n = $def2de46b9306e8a$var$t.litNonce;
        void 0 !== n && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
    }
}, $def2de46b9306e8a$export$ee69dfd951e24778 = $def2de46b9306e8a$export$b4d10f6001c083c2 ? (t)=>t : (t)=>t instanceof CSSStyleSheet ? ((t)=>{
        let e = "";
        for (const s of t.cssRules)e += s.cssText;
        return $def2de46b9306e8a$export$8d80f9cac07cdb3(e);
    })(t) : t;


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const { is: $19fe8e3abedf4df0$var$i, defineProperty: $19fe8e3abedf4df0$var$e, getOwnPropertyDescriptor: $19fe8e3abedf4df0$var$h, getOwnPropertyNames: $19fe8e3abedf4df0$var$r, getOwnPropertySymbols: $19fe8e3abedf4df0$var$o, getPrototypeOf: $19fe8e3abedf4df0$var$n } = Object, $19fe8e3abedf4df0$var$a = globalThis, $19fe8e3abedf4df0$var$c = $19fe8e3abedf4df0$var$a.trustedTypes, $19fe8e3abedf4df0$var$l = $19fe8e3abedf4df0$var$c ? $19fe8e3abedf4df0$var$c.emptyScript : "", $19fe8e3abedf4df0$var$p = $19fe8e3abedf4df0$var$a.reactiveElementPolyfillSupport, $19fe8e3abedf4df0$var$d = (t, s)=>t, $19fe8e3abedf4df0$export$7312b35fbf521afb = {
    toAttribute (t, s) {
        switch(s){
            case Boolean:
                t = t ? $19fe8e3abedf4df0$var$l : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, s) {
        let i = t;
        switch(s){
            case Boolean:
                i = null !== t;
                break;
            case Number:
                i = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    i = JSON.parse(t);
                } catch (t) {
                    i = null;
                }
        }
        return i;
    }
}, $19fe8e3abedf4df0$export$53a6892c50694894 = (t, s)=>!$19fe8e3abedf4df0$var$i(t, s), $19fe8e3abedf4df0$var$b = {
    attribute: !0,
    type: String,
    converter: $19fe8e3abedf4df0$export$7312b35fbf521afb,
    reflect: !1,
    useDefault: !1,
    hasChanged: $19fe8e3abedf4df0$export$53a6892c50694894
};
Symbol.metadata ??= Symbol("metadata"), $19fe8e3abedf4df0$var$a.litPropertyMetadata ??= new WeakMap;
class $19fe8e3abedf4df0$export$c7c07a37856565d extends HTMLElement {
    static addInitializer(t) {
        this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
        return this.finalize(), this._$Eh && [
            ...this._$Eh.keys()
        ];
    }
    static createProperty(t, s = $19fe8e3abedf4df0$var$b) {
        if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
            const i = Symbol(), h = this.getPropertyDescriptor(t, i, s);
            void 0 !== h && $19fe8e3abedf4df0$var$e(this.prototype, t, h);
        }
    }
    static getPropertyDescriptor(t, s, i) {
        const { get: e, set: r } = $19fe8e3abedf4df0$var$h(this.prototype, t) ?? {
            get () {
                return this[s];
            },
            set (t) {
                this[s] = t;
            }
        };
        return {
            get: e,
            set (s) {
                const h = e?.call(this);
                r?.call(this, s), this.requestUpdate(t, h, i);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) ?? $19fe8e3abedf4df0$var$b;
    }
    static _$Ei() {
        if (this.hasOwnProperty($19fe8e3abedf4df0$var$d("elementProperties"))) return;
        const t = $19fe8e3abedf4df0$var$n(this);
        t.finalize(), void 0 !== t.l && (this.l = [
            ...t.l
        ]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
        if (this.hasOwnProperty($19fe8e3abedf4df0$var$d("finalized"))) return;
        if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($19fe8e3abedf4df0$var$d("properties"))) {
            const t = this.properties, s = [
                ...$19fe8e3abedf4df0$var$r(t),
                ...$19fe8e3abedf4df0$var$o(t)
            ];
            for (const i of s)this.createProperty(i, t[i]);
        }
        const t = this[Symbol.metadata];
        if (null !== t) {
            const s = litPropertyMetadata.get(t);
            if (void 0 !== s) for (const [t, i] of s)this.elementProperties.set(t, i);
        }
        this._$Eh = new Map;
        for (const [t, s] of this.elementProperties){
            const i = this._$Eu(t, s);
            void 0 !== i && this._$Eh.set(i, t);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s) {
        const i = [];
        if (Array.isArray(s)) {
            const e = new Set(s.flat(1 / 0).reverse());
            for (const s of e)i.unshift((0, $def2de46b9306e8a$export$ee69dfd951e24778)(s));
        } else void 0 !== s && i.push((0, $def2de46b9306e8a$export$ee69dfd951e24778)(s));
        return i;
    }
    static _$Eu(t, s) {
        const i = s.attribute;
        return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    constructor(){
        super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
    }
    _$Ev() {
        this._$ES = new Promise((t)=>this.enableUpdating = t), this._$AL = new Map, this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t)=>t(this));
    }
    addController(t) {
        (this._$EO ??= new Set).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
        this._$EO?.delete(t);
    }
    _$E_() {
        const t = new Map, s = this.constructor.elementProperties;
        for (const i of s.keys())this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
        t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
        const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return (0, $def2de46b9306e8a$export$2ca4a66ec4cecb90)(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
        this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t)=>t.hostConnected?.());
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        this._$EO?.forEach((t)=>t.hostDisconnected?.());
    }
    attributeChangedCallback(t, s, i) {
        this._$AK(t, i);
    }
    _$ET(t, s) {
        const i = this.constructor.elementProperties.get(t), e = this.constructor._$Eu(t, i);
        if (void 0 !== e && !0 === i.reflect) {
            const h = (void 0 !== i.converter?.toAttribute ? i.converter : $19fe8e3abedf4df0$export$7312b35fbf521afb).toAttribute(s, i.type);
            this._$Em = t, null == h ? this.removeAttribute(e) : this.setAttribute(e, h), this._$Em = null;
        }
    }
    _$AK(t, s) {
        const i = this.constructor, e = i._$Eh.get(t);
        if (void 0 !== e && this._$Em !== e) {
            const t = i.getPropertyOptions(e), h = "function" == typeof t.converter ? {
                fromAttribute: t.converter
            } : void 0 !== t.converter?.fromAttribute ? t.converter : $19fe8e3abedf4df0$export$7312b35fbf521afb;
            this._$Em = e;
            const r = h.fromAttribute(s, t.type);
            this[e] = r ?? this._$Ej?.get(e) ?? r, this._$Em = null;
        }
    }
    requestUpdate(t, s, i, e = !1, h) {
        if (void 0 !== t) {
            const r = this.constructor;
            if (!1 === e && (h = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? $19fe8e3abedf4df0$export$53a6892c50694894)(h, s) || i.useDefault && i.reflect && h === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
            this.C(t, s, i);
        }
        !1 === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t, s, { useDefault: i, reflect: e, wrapped: h }, r) {
        i && !(this._$Ej ??= new Map).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), !0 !== h || void 0 !== r) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), !0 === e && this._$Em !== t && (this._$Eq ??= new Set).add(t));
    }
    async _$EP() {
        this.isUpdatePending = !0;
        try {
            await this._$ES;
        } catch (t) {
            Promise.reject(t);
        }
        const t = this.scheduleUpdate();
        return null != t && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
            if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
                for (const [t, s] of this._$Ep)this[t] = s;
                this._$Ep = void 0;
            }
            const t = this.constructor.elementProperties;
            if (t.size > 0) for (const [s, i] of t){
                const { wrapped: t } = i, e = this[s];
                !0 !== t || this._$AL.has(s) || void 0 === e || this.C(s, void 0, i, e);
            }
        }
        let t = !1;
        const s = this._$AL;
        try {
            t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((t)=>t.hostUpdate?.()), this.update(s)) : this._$EM();
        } catch (s) {
            throw t = !1, this._$EM(), s;
        }
        t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
        this._$EO?.forEach((t)=>t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$EM() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$ES;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        this._$Eq &&= this._$Eq.forEach((t)=>this._$ET(t, this[t])), this._$EM();
    }
    updated(t) {}
    firstUpdated(t) {}
}
$19fe8e3abedf4df0$export$c7c07a37856565d.elementStyles = [], $19fe8e3abedf4df0$export$c7c07a37856565d.shadowRootOptions = {
    mode: "open"
}, $19fe8e3abedf4df0$export$c7c07a37856565d[$19fe8e3abedf4df0$var$d("elementProperties")] = new Map, $19fe8e3abedf4df0$export$c7c07a37856565d[$19fe8e3abedf4df0$var$d("finalized")] = new Map, $19fe8e3abedf4df0$var$p?.({
    ReactiveElement: $19fe8e3abedf4df0$export$c7c07a37856565d
}), ($19fe8e3abedf4df0$var$a.reactiveElementVersions ??= []).push("2.1.2");


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $f58f44579a4747ac$var$t = globalThis, $f58f44579a4747ac$var$i = (t)=>t, $f58f44579a4747ac$var$s = $f58f44579a4747ac$var$t.trustedTypes, $f58f44579a4747ac$var$e = $f58f44579a4747ac$var$s ? $f58f44579a4747ac$var$s.createPolicy("lit-html", {
    createHTML: (t)=>t
}) : void 0, $f58f44579a4747ac$var$h = "$lit$", $f58f44579a4747ac$var$o = `lit$${Math.random().toFixed(9).slice(2)}$`, $f58f44579a4747ac$var$n = "?" + $f58f44579a4747ac$var$o, $f58f44579a4747ac$var$r = `<${$f58f44579a4747ac$var$n}>`, $f58f44579a4747ac$var$l = document, $f58f44579a4747ac$var$c = ()=>$f58f44579a4747ac$var$l.createComment(""), $f58f44579a4747ac$var$a = (t)=>null === t || "object" != typeof t && "function" != typeof t, $f58f44579a4747ac$var$u = Array.isArray, $f58f44579a4747ac$var$d = (t)=>$f58f44579a4747ac$var$u(t) || "function" == typeof t?.[Symbol.iterator], $f58f44579a4747ac$var$f = "[ \t\n\f\r]", $f58f44579a4747ac$var$v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $f58f44579a4747ac$var$_ = /-->/g, $f58f44579a4747ac$var$m = />/g, $f58f44579a4747ac$var$p = RegExp(`>|${$f58f44579a4747ac$var$f}(?:([^\\s"'>=/]+)(${$f58f44579a4747ac$var$f}*=${$f58f44579a4747ac$var$f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), $f58f44579a4747ac$var$g = /'/g, $f58f44579a4747ac$var$$ = /"/g, $f58f44579a4747ac$var$y = /^(?:script|style|textarea|title)$/i, $f58f44579a4747ac$var$x = (t)=>(i, ...s)=>({
            _$litType$: t,
            strings: i,
            values: s
        }), $f58f44579a4747ac$export$c0bb0b647f701bb5 = $f58f44579a4747ac$var$x(1), $f58f44579a4747ac$export$7ed1367e7fa1ad68 = $f58f44579a4747ac$var$x(2), $f58f44579a4747ac$export$47d5b44d225be5b4 = $f58f44579a4747ac$var$x(3), $f58f44579a4747ac$export$9c068ae9cc5db4e8 = Symbol.for("lit-noChange"), $f58f44579a4747ac$export$45b790e32b2810ee = Symbol.for("lit-nothing"), $f58f44579a4747ac$var$C = new WeakMap, $f58f44579a4747ac$var$P = $f58f44579a4747ac$var$l.createTreeWalker($f58f44579a4747ac$var$l, 129);
function $f58f44579a4747ac$var$V(t, i) {
    if (!$f58f44579a4747ac$var$u(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== $f58f44579a4747ac$var$e ? $f58f44579a4747ac$var$e.createHTML(i) : i;
}
const $f58f44579a4747ac$var$N = (t, i)=>{
    const s = t.length - 1, e = [];
    let n, l = 2 === i ? "<svg>" : 3 === i ? "<math>" : "", c = $f58f44579a4747ac$var$v;
    for(let i = 0; i < s; i++){
        const s = t[i];
        let a, u, d = -1, f = 0;
        for(; f < s.length && (c.lastIndex = f, u = c.exec(s), null !== u);)f = c.lastIndex, c === $f58f44579a4747ac$var$v ? "!--" === u[1] ? c = $f58f44579a4747ac$var$_ : void 0 !== u[1] ? c = $f58f44579a4747ac$var$m : void 0 !== u[2] ? ($f58f44579a4747ac$var$y.test(u[2]) && (n = RegExp("</" + u[2], "g")), c = $f58f44579a4747ac$var$p) : void 0 !== u[3] && (c = $f58f44579a4747ac$var$p) : c === $f58f44579a4747ac$var$p ? ">" === u[0] ? (c = n ?? $f58f44579a4747ac$var$v, d = -1) : void 0 === u[1] ? d = -2 : (d = c.lastIndex - u[2].length, a = u[1], c = void 0 === u[3] ? $f58f44579a4747ac$var$p : '"' === u[3] ? $f58f44579a4747ac$var$$ : $f58f44579a4747ac$var$g) : c === $f58f44579a4747ac$var$$ || c === $f58f44579a4747ac$var$g ? c = $f58f44579a4747ac$var$p : c === $f58f44579a4747ac$var$_ || c === $f58f44579a4747ac$var$m ? c = $f58f44579a4747ac$var$v : (c = $f58f44579a4747ac$var$p, n = void 0);
        const x = c === $f58f44579a4747ac$var$p && t[i + 1].startsWith("/>") ? " " : "";
        l += c === $f58f44579a4747ac$var$v ? s + $f58f44579a4747ac$var$r : d >= 0 ? (e.push(a), s.slice(0, d) + $f58f44579a4747ac$var$h + s.slice(d) + $f58f44579a4747ac$var$o + x) : s + $f58f44579a4747ac$var$o + (-2 === d ? i : x);
    }
    return [
        $f58f44579a4747ac$var$V(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : 3 === i ? "</math>" : "")),
        e
    ];
};
class $f58f44579a4747ac$var$S {
    constructor({ strings: t, _$litType$: i }, e){
        let r;
        this.parts = [];
        let l = 0, a = 0;
        const u = t.length - 1, d = this.parts, [f, v] = $f58f44579a4747ac$var$N(t, i);
        if (this.el = $f58f44579a4747ac$var$S.createElement(f, e), $f58f44579a4747ac$var$P.currentNode = this.el.content, 2 === i || 3 === i) {
            const t = this.el.content.firstChild;
            t.replaceWith(...t.childNodes);
        }
        for(; null !== (r = $f58f44579a4747ac$var$P.nextNode()) && d.length < u;){
            if (1 === r.nodeType) {
                if (r.hasAttributes()) for (const t of r.getAttributeNames())if (t.endsWith($f58f44579a4747ac$var$h)) {
                    const i = v[a++], s = r.getAttribute(t).split($f58f44579a4747ac$var$o), e = /([.?@])?(.*)/.exec(i);
                    d.push({
                        type: 1,
                        index: l,
                        name: e[2],
                        strings: s,
                        ctor: "." === e[1] ? $f58f44579a4747ac$var$I : "?" === e[1] ? $f58f44579a4747ac$var$L : "@" === e[1] ? $f58f44579a4747ac$var$z : $f58f44579a4747ac$var$H
                    }), r.removeAttribute(t);
                } else t.startsWith($f58f44579a4747ac$var$o) && (d.push({
                    type: 6,
                    index: l
                }), r.removeAttribute(t));
                if ($f58f44579a4747ac$var$y.test(r.tagName)) {
                    const t = r.textContent.split($f58f44579a4747ac$var$o), i = t.length - 1;
                    if (i > 0) {
                        r.textContent = $f58f44579a4747ac$var$s ? $f58f44579a4747ac$var$s.emptyScript : "";
                        for(let s = 0; s < i; s++)r.append(t[s], $f58f44579a4747ac$var$c()), $f58f44579a4747ac$var$P.nextNode(), d.push({
                            type: 2,
                            index: ++l
                        });
                        r.append(t[i], $f58f44579a4747ac$var$c());
                    }
                }
            } else if (8 === r.nodeType) {
                if (r.data === $f58f44579a4747ac$var$n) d.push({
                    type: 2,
                    index: l
                });
                else {
                    let t = -1;
                    for(; -1 !== (t = r.data.indexOf($f58f44579a4747ac$var$o, t + 1));)d.push({
                        type: 7,
                        index: l
                    }), t += $f58f44579a4747ac$var$o.length - 1;
                }
            }
            l++;
        }
    }
    static createElement(t, i) {
        const s = $f58f44579a4747ac$var$l.createElement("template");
        return s.innerHTML = t, s;
    }
}
function $f58f44579a4747ac$var$M(t, i, s = t, e) {
    if (i === $f58f44579a4747ac$export$9c068ae9cc5db4e8) return i;
    let h = void 0 !== e ? s._$Co?.[e] : s._$Cl;
    const o = $f58f44579a4747ac$var$a(i) ? void 0 : i._$litDirective$;
    return h?.constructor !== o && (h?._$AO?.(!1), void 0 === o ? h = void 0 : (h = new o(t), h._$AT(t, s, e)), void 0 !== e ? (s._$Co ??= [])[e] = h : s._$Cl = h), void 0 !== h && (i = $f58f44579a4747ac$var$M(t, h._$AS(t, i.values), h, e)), i;
}
class $f58f44579a4747ac$var$R {
    constructor(t, i){
        this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    u(t) {
        const { el: { content: i }, parts: s } = this._$AD, e = (t?.creationScope ?? $f58f44579a4747ac$var$l).importNode(i, !0);
        $f58f44579a4747ac$var$P.currentNode = e;
        let h = $f58f44579a4747ac$var$P.nextNode(), o = 0, n = 0, r = s[0];
        for(; void 0 !== r;){
            if (o === r.index) {
                let i;
                2 === r.type ? i = new $f58f44579a4747ac$var$k(h, h.nextSibling, this, t) : 1 === r.type ? i = new r.ctor(h, r.name, r.strings, this, t) : 6 === r.type && (i = new $f58f44579a4747ac$var$Z(h, this, t)), this._$AV.push(i), r = s[++n];
            }
            o !== r?.index && (h = $f58f44579a4747ac$var$P.nextNode(), o++);
        }
        return $f58f44579a4747ac$var$P.currentNode = $f58f44579a4747ac$var$l, e;
    }
    p(t) {
        let i = 0;
        for (const s of this._$AV)void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
}
class $f58f44579a4747ac$var$k {
    get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, i, s, e){
        this.type = 2, this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = e?.isConnected ?? !0;
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, i = this) {
        t = $f58f44579a4747ac$var$M(this, t, i), $f58f44579a4747ac$var$a(t) ? t === $f58f44579a4747ac$export$45b790e32b2810ee || null == t || "" === t ? (this._$AH !== $f58f44579a4747ac$export$45b790e32b2810ee && this._$AR(), this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee) : t !== this._$AH && t !== $f58f44579a4747ac$export$9c068ae9cc5db4e8 && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : $f58f44579a4747ac$var$d(t) ? this.k(t) : this._(t);
    }
    O(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    T(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
    }
    _(t) {
        this._$AH !== $f58f44579a4747ac$export$45b790e32b2810ee && $f58f44579a4747ac$var$a(this._$AH) ? this._$AA.nextSibling.data = t : this.T($f58f44579a4747ac$var$l.createTextNode(t)), this._$AH = t;
    }
    $(t) {
        const { values: i, _$litType$: s } = t, e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = $f58f44579a4747ac$var$S.createElement($f58f44579a4747ac$var$V(s.h, s.h[0]), this.options)), s);
        if (this._$AH?._$AD === e) this._$AH.p(i);
        else {
            const t = new $f58f44579a4747ac$var$R(e, this), s = t.u(this.options);
            t.p(i), this.T(s), this._$AH = t;
        }
    }
    _$AC(t) {
        let i = $f58f44579a4747ac$var$C.get(t.strings);
        return void 0 === i && $f58f44579a4747ac$var$C.set(t.strings, i = new $f58f44579a4747ac$var$S(t)), i;
    }
    k(t) {
        $f58f44579a4747ac$var$u(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const h of t)e === i.length ? i.push(s = new $f58f44579a4747ac$var$k(this.O($f58f44579a4747ac$var$c()), this.O($f58f44579a4747ac$var$c()), this, this.options)) : s = i[e], s._$AI(h), e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR(t = this._$AA.nextSibling, s) {
        for(this._$AP?.(!1, !0, s); t !== this._$AB;){
            const s = $f58f44579a4747ac$var$i(t).nextSibling;
            $f58f44579a4747ac$var$i(t).remove(), t = s;
        }
    }
    setConnected(t) {
        void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t));
    }
}
class $f58f44579a4747ac$var$H {
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    constructor(t, i, s, e, h){
        this.type = 1, this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee;
    }
    _$AI(t, i = this, s, e) {
        const h = this.strings;
        let o = !1;
        if (void 0 === h) t = $f58f44579a4747ac$var$M(this, t, i, 0), o = !$f58f44579a4747ac$var$a(t) || t !== this._$AH && t !== $f58f44579a4747ac$export$9c068ae9cc5db4e8, o && (this._$AH = t);
        else {
            const e = t;
            let n, r;
            for(t = h[0], n = 0; n < h.length - 1; n++)r = $f58f44579a4747ac$var$M(this, e[s + n], i, n), r === $f58f44579a4747ac$export$9c068ae9cc5db4e8 && (r = this._$AH[n]), o ||= !$f58f44579a4747ac$var$a(r) || r !== this._$AH[n], r === $f58f44579a4747ac$export$45b790e32b2810ee ? t = $f58f44579a4747ac$export$45b790e32b2810ee : t !== $f58f44579a4747ac$export$45b790e32b2810ee && (t += (r ?? "") + h[n + 1]), this._$AH[n] = r;
        }
        o && !e && this.j(t);
    }
    j(t) {
        t === $f58f44579a4747ac$export$45b790e32b2810ee ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
    }
}
class $f58f44579a4747ac$var$I extends $f58f44579a4747ac$var$H {
    constructor(){
        super(...arguments), this.type = 3;
    }
    j(t) {
        this.element[this.name] = t === $f58f44579a4747ac$export$45b790e32b2810ee ? void 0 : t;
    }
}
class $f58f44579a4747ac$var$L extends $f58f44579a4747ac$var$H {
    constructor(){
        super(...arguments), this.type = 4;
    }
    j(t) {
        this.element.toggleAttribute(this.name, !!t && t !== $f58f44579a4747ac$export$45b790e32b2810ee);
    }
}
class $f58f44579a4747ac$var$z extends $f58f44579a4747ac$var$H {
    constructor(t, i, s, e, h){
        super(t, i, s, e, h), this.type = 5;
    }
    _$AI(t, i = this) {
        if ((t = $f58f44579a4747ac$var$M(this, t, i, 0) ?? $f58f44579a4747ac$export$45b790e32b2810ee) === $f58f44579a4747ac$export$9c068ae9cc5db4e8) return;
        const s = this._$AH, e = t === $f58f44579a4747ac$export$45b790e32b2810ee && s !== $f58f44579a4747ac$export$45b790e32b2810ee || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, h = t !== $f58f44579a4747ac$export$45b790e32b2810ee && (s === $f58f44579a4747ac$export$45b790e32b2810ee || e);
        e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
    }
}
class $f58f44579a4747ac$var$Z {
    constructor(t, i, s){
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        $f58f44579a4747ac$var$M(this, t);
    }
}
const $f58f44579a4747ac$export$8613d1ca9052b22e = {
    M: $f58f44579a4747ac$var$h,
    P: $f58f44579a4747ac$var$o,
    A: $f58f44579a4747ac$var$n,
    C: 1,
    L: $f58f44579a4747ac$var$N,
    R: $f58f44579a4747ac$var$R,
    D: $f58f44579a4747ac$var$d,
    V: $f58f44579a4747ac$var$M,
    I: $f58f44579a4747ac$var$k,
    H: $f58f44579a4747ac$var$H,
    N: $f58f44579a4747ac$var$L,
    U: $f58f44579a4747ac$var$z,
    B: $f58f44579a4747ac$var$I,
    F: $f58f44579a4747ac$var$Z
}, $f58f44579a4747ac$var$B = $f58f44579a4747ac$var$t.litHtmlPolyfillSupport;
$f58f44579a4747ac$var$B?.($f58f44579a4747ac$var$S, $f58f44579a4747ac$var$k), ($f58f44579a4747ac$var$t.litHtmlVersions ??= []).push("3.3.2");
const $f58f44579a4747ac$export$b3890eb0ae9dca99 = (t, i, s)=>{
    const e = s?.renderBefore ?? i;
    let h = e._$litPart$;
    if (void 0 === h) {
        const t = s?.renderBefore ?? null;
        e._$litPart$ = h = new $f58f44579a4747ac$var$k(i.insertBefore($f58f44579a4747ac$var$c(), t), t, void 0, s ?? {});
    }
    return h._$AI(t), h;
};




/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $ab210b2da7b39b9d$var$s = globalThis;
class $ab210b2da7b39b9d$export$3f2f9f5909897157 extends (0, $19fe8e3abedf4df0$export$c7c07a37856565d) {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0;
    }
    createRenderRoot() {
        const t = super.createRenderRoot();
        return this.renderOptions.renderBefore ??= t.firstChild, t;
    }
    update(t) {
        const r = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = (0, $f58f44579a4747ac$export$b3890eb0ae9dca99)(r, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
        return 0, $f58f44579a4747ac$export$9c068ae9cc5db4e8;
    }
}
$ab210b2da7b39b9d$export$3f2f9f5909897157._$litElement$ = !0, $ab210b2da7b39b9d$export$3f2f9f5909897157["finalized"] = !0, $ab210b2da7b39b9d$var$s.litElementHydrateSupport?.({
    LitElement: $ab210b2da7b39b9d$export$3f2f9f5909897157
});
const $ab210b2da7b39b9d$var$o = $ab210b2da7b39b9d$var$s.litElementPolyfillSupport;
$ab210b2da7b39b9d$var$o?.({
    LitElement: $ab210b2da7b39b9d$export$3f2f9f5909897157
});
const $ab210b2da7b39b9d$export$f5c524615a7708d6 = {
    _$AK: (t, e, r)=>{
        t._$AK(e, r);
    },
    _$AL: (t)=>t._$AL
};
($ab210b2da7b39b9d$var$s.litElementVersions ??= []).push("4.2.2");


/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $a00bca1a101a9088$export$6acf61af03e62db = !1;




var $4828e467d1847026$exports = {};
$4828e467d1847026$exports = "ha-card {\n  font-family: var(--paper-font-body1_-_font-family, var(--ha-font-family-body, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif));\n  color: var(--primary-text-color, #fff);\n  display: block;\n  overflow: visible;\n  container-type: inline-size;\n}\n\n:host {\n  --gs-text-dim: var(--secondary-text-color, #ffffff80);\n  --gs-text-dimmer: var(--disabled-text-color, #ffffff59);\n  --gs-text-dimmest: var(--disabled-text-color, #ffffff40);\n  --gs-border: var(--divider-color, #ffffff0a);\n  --gs-track: var(--divider-color, #ffffff0f);\n  --gs-card-bg: var(--ha-card-background, var(--card-background-color, #1c1c1c));\n  --gs-elevated: color-mix(in srgb, var(--primary-text-color, #fff) 6%, var(--gs-card-bg));\n  --gs-green-500: #00a86b;\n  --gs-green-400: #1dbf7b;\n  --gs-green-300: #5dcaa5;\n  --gs-green-200: #9fe1cb;\n  --gs-green-100: color-mix(in srgb, #1dbf7b 10%, var(--gs-card-bg));\n  --gs-green-600: #008756;\n  --gs-green-700: #006b44;\n  --gs-amber: #ef9f27;\n  --gs-amber-bg: color-mix(in srgb, #ef9f27 8%, var(--gs-card-bg));\n  --gs-red: #e53935;\n  --gs-red-bg: color-mix(in srgb, #e53935 8%, var(--gs-card-bg));\n  --gs-surface: color-mix(in srgb, var(--primary-text-color, #fff) 4%, var(--gs-card-bg));\n  --gs-surface-hover: color-mix(in srgb, var(--primary-text-color, #fff) 8%, var(--gs-card-bg));\n  --gs-radius-sm: 6px;\n  --gs-radius-md: 10px;\n  --gs-radius-lg: 14px;\n  --gs-radius-xl: 20px;\n}\n\n.card-header {\n  border-bottom: 1px solid var(--gs-border);\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 1.5rem;\n  display: flex;\n}\n\n.header-title {\n  color: var(--primary-text-color);\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 1.2;\n}\n\n.header-right {\n  flex-shrink: 0;\n  align-items: center;\n  gap: 0;\n  margin-right: -8px;\n  display: flex;\n}\n\n.ws-icon, .header-menu {\n  cursor: pointer;\n  border-radius: 50%;\n  justify-content: center;\n  align-items: center;\n  width: 28px;\n  height: 28px;\n  transition: background .2s, opacity .2s;\n  display: inline-flex;\n}\n\n.ws-icon:hover, .header-menu:hover {\n  background: var(--gs-surface-hover);\n}\n\n.ws-icon svg, .header-menu svg {\n  width: 18px;\n  height: 18px;\n}\n\n.ws-icon.online svg {\n  fill: var(--gs-green-400);\n}\n\n.ws-icon.offline svg {\n  fill: var(--gs-text-dimmer);\n}\n\n.header-menu svg {\n  fill: var(--gs-text-dim);\n}\n\n.content {\n  padding: 0;\n}\n\nha-card.single-section .mower-section, ha-card.single-section .valves-section, ha-card.single-section .socket-section {\n  margin: 0;\n  padding: 0;\n}\n\nha-card.single-section .mower-card, ha-card.single-section .valve, ha-card.single-section .socket-card {\n  border-radius: 0 0 var(--ha-card-border-radius, 12px) var(--ha-card-border-radius, 12px);\n  border: none;\n}\n\nha-card.single-section .valve:before {\n  border-radius: 0 0 var(--ha-card-border-radius, 12px) var(--ha-card-border-radius, 12px);\n}\n\nha-card.single-section.no-header .mower-card, ha-card.single-section.no-header .valve, ha-card.single-section.no-header .socket-card {\n  border-radius: var(--ha-card-border-radius, 12px);\n}\n\nha-card.single-section .valves-grid {\n  gap: 0;\n}\n\n.knob-section {\n  justify-content: center;\n  align-items: center;\n  gap: 2rem;\n  padding: 1.5rem 1.5rem 1rem;\n  display: flex;\n}\n\n.knob-container {\n  cursor: pointer;\n  flex-shrink: 0;\n  width: 140px;\n  height: 140px;\n  position: relative;\n}\n\n.knob-track {\n  position: absolute;\n  inset: 0;\n}\n\n.knob-track svg {\n  width: 100%;\n  height: 100%;\n}\n\n.knob-arc-bg {\n  fill: none;\n  stroke: var(--gs-surface);\n  stroke-width: 8px;\n  stroke-linecap: round;\n}\n\n.knob-arc-fill {\n  fill: none;\n  stroke: var(--gs-green-400);\n  stroke-width: 8px;\n  stroke-linecap: round;\n  filter: drop-shadow(0 0 6px #1dbf7b40);\n  transition: stroke-dashoffset .15s ease-out;\n}\n\n.knob-handle {\n  background: var(--gs-card-bg);\n  border: 2px solid var(--gs-green-400);\n  cursor: grab;\n  z-index: 2;\n  border-radius: 50%;\n  width: 28px;\n  height: 28px;\n  transition: box-shadow .2s;\n  position: absolute;\n  transform: translate(-50%, -50%);\n  box-shadow: 0 2px 8px #0000001f, 0 1px 2px #00000014;\n}\n\n.knob-handle:active {\n  cursor: grabbing;\n  box-shadow: 0 0 0 6px #1dbf7b26, 0 2px 8px #0000001f;\n}\n\n.knob-handle:after {\n  content: \"\";\n  background: var(--gs-green-400);\n  border-radius: 50%;\n  width: 8px;\n  height: 8px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.knob-center {\n  text-align: center;\n  pointer-events: none;\n  z-index: 1;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.knob-value {\n  color: var(--primary-text-color);\n  font-size: 28px;\n  font-weight: 500;\n  line-height: 1;\n}\n\n.knob-unit {\n  color: var(--gs-text-dim);\n  letter-spacing: .5px;\n  margin-top: 2px;\n  font-size: 12px;\n}\n\n.knob-info {\n  flex-direction: column;\n  gap: 6px;\n  display: flex;\n}\n\n.knob-preset {\n  border-radius: var(--gs-radius-md);\n  border: .5px solid var(--gs-border);\n  background: var(--gs-card-bg);\n  color: var(--gs-text-dim);\n  cursor: pointer;\n  white-space: nowrap;\n  align-items: center;\n  gap: 8px;\n  padding: 7px 14px;\n  font-family: inherit;\n  font-size: 13px;\n  font-weight: 400;\n  transition: all .2s;\n  display: flex;\n}\n\n.knob-preset:hover {\n  background: var(--gs-surface);\n  color: var(--primary-text-color);\n  border-color: var(--gs-surface-hover);\n}\n\n.knob-preset.active {\n  background: var(--gs-green-100);\n  color: var(--gs-green-400);\n  border-color: var(--gs-green-300);\n}\n\n.knob-preset-dot {\n  background: var(--gs-text-dimmest);\n  border-radius: 50%;\n  flex-shrink: 0;\n  width: 5px;\n  height: 5px;\n  transition: background .2s;\n}\n\n.knob-preset.active .knob-preset-dot {\n  background: var(--gs-green-500);\n}\n\n.section-label {\n  color: var(--gs-text-dimmest);\n  text-transform: uppercase;\n  letter-spacing: .8px;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 10px;\n  font-size: 11px;\n  font-weight: 500;\n  display: flex;\n}\n\n.section-status {\n  color: var(--gs-green-400);\n  cursor: pointer;\n  align-items: center;\n  margin-left: auto;\n  display: inline-flex;\n}\n\n.section-status svg {\n  fill: currentColor;\n  width: 14px;\n  height: 14px;\n}\n\n.section-status.offline {\n  color: var(--gs-text-dimmer);\n}\n\n.valves-section {\n  padding: 0 1.5rem 1.5rem;\n}\n\n.valves-grid {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 8px;\n  display: grid;\n}\n\n.valves-grid.count-1 {\n  grid-template-columns: 1fr;\n}\n\n.valves-grid.count-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.valves-grid:not(.count-1):not(.count-2) .valve {\n  padding: 8px;\n}\n\n.valve {\n  background: var(--gs-surface);\n  border-radius: var(--gs-radius-md);\n  border: .5px solid #0000;\n  padding: 12px;\n  transition: all .3s cubic-bezier(.16, 1, .3, 1);\n  animation: .4s cubic-bezier(.16, 1, .3, 1) both valveIn;\n  position: relative;\n  overflow: visible;\n  container-type: inline-size;\n}\n\n.valve:before {\n  content: \"\";\n  pointer-events: none;\n  border-radius: inherit;\n  background: linear-gradient(to top, #1dbf7b14, #0000);\n  height: 0%;\n  transition: height .6s cubic-bezier(.16, 1, .3, 1);\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n.valve.active {\n  background: var(--gs-green-100);\n  border-color: var(--gs-green-300);\n}\n\n.valve.active:before {\n  height: 100%;\n}\n\n.valve-header {\n  align-items: center;\n  gap: 6px;\n  margin-bottom: 8px;\n  display: flex;\n}\n\n.valve-zone-label {\n  color: var(--gs-text-dimmest);\n  letter-spacing: .6px;\n  text-transform: uppercase;\n  white-space: nowrap;\n  font-size: 10px;\n  font-weight: 600;\n}\n\n.valve.active .valve-zone-label {\n  color: var(--gs-green-300);\n}\n\n.valve-name {\n  color: var(--primary-text-color);\n  cursor: pointer;\n  margin-bottom: 4px;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 1.3;\n}\n\n.valve-status {\n  color: var(--gs-text-dimmest);\n  align-items: center;\n  gap: 4px;\n  min-height: 16px;\n  font-size: 11px;\n  display: flex;\n}\n\n.valve.active .valve-status {\n  color: var(--gs-green-400);\n}\n\n.valve-progress {\n  background: color-mix(in srgb, var(--primary-text-color, #fff) 6%, transparent);\n  border-radius: 2px;\n  height: 3px;\n  margin-top: 8px;\n  display: none;\n  overflow: hidden;\n}\n\n.valve.active .valve-progress {\n  display: block;\n}\n\n.valve-progress-fill {\n  background: var(--gs-green-400);\n  border-radius: 2px;\n  height: 100%;\n  transition: width 1s linear;\n}\n\n.toggle {\n  background: color-mix(in srgb, var(--primary-text-color, #fff) 14%, var(--gs-card-bg));\n  cursor: pointer;\n  appearance: none;\n  border: none;\n  border-radius: 10px;\n  outline: none;\n  flex-shrink: 0;\n  width: 36px;\n  height: 20px;\n  padding: 0;\n  transition: background .25s;\n  position: relative;\n}\n\n.toggle:after {\n  content: \"\";\n  background: #fff;\n  border-radius: 50%;\n  width: 16px;\n  height: 16px;\n  transition: transform .25s cubic-bezier(.16, 1, .3, 1);\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  box-shadow: 0 1px 3px #00000026;\n}\n\n.toggle.on {\n  background: var(--gs-green-400);\n}\n\n.toggle.on:after {\n  transform: translateX(16px);\n}\n\n.toggle.socket-toggle-on {\n  background: var(--gs-amber);\n}\n\n.toggle.disabled, .toggle:disabled {\n  opacity: .3;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n\n.pill {\n  background: var(--gs-card-bg);\n  border: 1px solid color-mix(in srgb, var(--primary-text-color, #fff) 15%, transparent);\n  border-radius: 22px;\n  flex-shrink: 0;\n  align-items: center;\n  margin-left: auto;\n  padding: 3px;\n  transition: all .35s;\n  display: inline-flex;\n}\n\n.valve.active .pill {\n  background: color-mix(in srgb, #1dbf7b 6%, var(--gs-card-bg));\n  border-color: #1dbf7b33;\n}\n\n.pill-dur-wrap {\n  position: relative;\n}\n\n.pill-dur {\n  height: 22px;\n  color: var(--gs-text-dim);\n  cursor: pointer;\n  font-size: 11px;\n  font-weight: 500;\n  font-family: var(--ha-font-family-body, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif);\n  background: none;\n  border: none;\n  border-radius: 11px;\n  align-items: center;\n  gap: 1px;\n  padding: 0 4px 0 8px;\n  transition: all .2s;\n  display: flex;\n}\n\n.pill-dur:hover {\n  background: var(--gs-surface);\n}\n\n.pill-dur.locked {\n  cursor: default;\n  opacity: .5;\n}\n\n.pill-dur.locked:hover {\n  background: none;\n}\n\n.valve.active .pill-dur {\n  color: var(--gs-green-700);\n}\n\n.pill-dur svg {\n  fill: currentColor;\n  opacity: .4;\n  width: 12px;\n  height: 12px;\n  transition: transform .25s cubic-bezier(.16, 1, .3, 1);\n}\n\n.pill-dur.open svg {\n  opacity: .7;\n  transform: rotate(180deg);\n}\n\n.pill-tog {\n  cursor: pointer;\n  background: color-mix(in srgb, var(--primary-text-color, #fff) 14%, var(--gs-card-bg));\n  border-radius: 11px;\n  flex-shrink: 0;\n  width: 38px;\n  height: 22px;\n  transition: background .3s cubic-bezier(.16, 1, .3, 1);\n  position: relative;\n}\n\n.pill-tog.on {\n  background: var(--gs-green-400);\n}\n\n.pill-tog.amber {\n  background: var(--gs-amber);\n}\n\n.pill-tog:after {\n  content: \"\";\n  background: #fff;\n  border-radius: 50%;\n  width: 16px;\n  height: 16px;\n  transition: transform .3s cubic-bezier(.16, 1, .3, 1);\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  box-shadow: 0 1px 3px #00000026;\n}\n\n.pill-tog.on:after {\n  transform: translateX(16px);\n}\n\n.pill-tog.disabled {\n  opacity: .3;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n\n.pill-pop {\n  background: var(--gs-card-bg);\n  border: .5px solid color-mix(in srgb, var(--primary-text-color, #fff) 12%, transparent);\n  z-index: 100;\n  border-radius: 12px;\n  flex-wrap: wrap;\n  gap: 4px;\n  width: max-content;\n  max-width: 210px;\n  padding: 6px;\n  display: none;\n  position: absolute;\n  top: calc(100% + 6px);\n  right: 0;\n  box-shadow: 0 4px 12px #0000001f;\n}\n\n.pill-pop.show {\n  display: flex;\n}\n\n.valve.pill-open, .mower-card.pill-open, .socket-card.pill-open {\n  z-index: 50;\n}\n\n.pop-chip {\n  border: .5px solid color-mix(in srgb, var(--primary-text-color, #fff) 8%, transparent);\n  color: var(--gs-text-dim);\n  cursor: pointer;\n  background: none;\n  border-radius: 10px;\n  padding: 5px 8px;\n  font-family: inherit;\n  font-size: 10px;\n  font-weight: 500;\n  line-height: 1;\n  transition: all .15s;\n}\n\n.pop-chip:hover {\n  background: var(--gs-surface);\n  border-color: color-mix(in srgb, var(--primary-text-color, #fff) 14%, transparent);\n}\n\n.pop-chip.sel {\n  background: var(--gs-green-100);\n  color: var(--gs-green-600);\n  border-color: var(--gs-green-300);\n}\n\n.pop-custom {\n  border-top: .5px solid color-mix(in srgb, var(--primary-text-color, #fff) 8%, transparent);\n  align-items: center;\n  gap: 4px;\n  width: 100%;\n  margin-top: 2px;\n  padding-top: 6px;\n  display: flex;\n}\n\n.pop-input {\n  border: .5px solid color-mix(in srgb, var(--primary-text-color, #fff) 8%, transparent);\n  min-width: 0;\n  height: 26px;\n  color: var(--primary-text-color);\n  background: var(--gs-card-bg);\n  -moz-appearance: textfield;\n  border-radius: 8px;\n  outline: none;\n  flex: 1;\n  padding: 0 8px;\n  font-family: inherit;\n  font-size: 10px;\n  font-weight: 500;\n  line-height: 1;\n}\n\n.pop-input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.pop-input::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.pop-input::placeholder {\n  color: var(--gs-text-dim);\n}\n\n.pop-input:focus {\n  border-color: var(--gs-green-300);\n}\n\n.pop-input-unit {\n  color: var(--gs-text-dim);\n  flex-shrink: 0;\n  margin-left: -2px;\n  font-family: inherit;\n  font-size: 9px;\n}\n\n.pop-ok {\n  background: var(--gs-green-400);\n  color: #fff;\n  cursor: pointer;\n  letter-spacing: .3px;\n  border: none;\n  border-radius: 8px;\n  flex-shrink: 0;\n  height: 26px;\n  padding: 0 10px;\n  font-family: inherit;\n  font-size: 10px;\n  font-weight: 600;\n  transition: all .15s;\n}\n\n.pop-ok:hover {\n  background: var(--gs-green-500);\n}\n\n.pop-ok:active {\n  transform: scale(.95);\n}\n\n.valve.offline, .socket-card.offline {\n  opacity: .5;\n}\n\n.water-icon {\n  width: 8px;\n  height: 10px;\n  display: inline-block;\n  position: relative;\n}\n\n.water-icon:before {\n  content: \"\";\n  background: var(--gs-green-400);\n  border-radius: 50% 50% 50% 0;\n  width: 8px;\n  height: 8px;\n  animation: 1.5s ease-in-out infinite dropPulse;\n  position: absolute;\n  bottom: 0;\n  transform: rotate(-45deg);\n}\n\n.countdown-text {\n  animation: 2s ease-in-out infinite countPulse;\n}\n\n.mower-section {\n  margin-top: .25rem;\n  padding: 0 1.5rem 1rem;\n}\n\n.mower-card {\n  background: var(--gs-surface);\n  border-radius: var(--gs-radius-md);\n  border: .5px solid #0000;\n  padding: 14px;\n  transition: all .3s cubic-bezier(.16, 1, .3, 1);\n  animation: .4s cubic-bezier(.16, 1, .3, 1) both valveIn;\n  position: relative;\n}\n\n.mower-card.active {\n  background: var(--gs-green-100);\n  border-color: var(--gs-green-300);\n}\n\n.mower-card.paused {\n  background: var(--gs-amber-bg);\n  border-color: #ef9f274d;\n}\n\n.mower-card.error {\n  background: var(--gs-red-bg);\n  border-color: #e539354d;\n}\n\n.mower-card.offline {\n  opacity: .5;\n}\n\n.mower-header {\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n  display: flex;\n}\n\n.mower-icon {\n  border-radius: var(--gs-radius-sm);\n  background: var(--gs-surface-hover);\n  width: 36px;\n  height: 36px;\n  color: var(--gs-text-dimmest);\n  flex-shrink: 0;\n  justify-content: center;\n  align-items: center;\n  transition: all .3s;\n  display: flex;\n  position: relative;\n  overflow: hidden;\n}\n\n.mower-card.active .mower-icon {\n  background: color-mix(in srgb, #1dbf7b 15%, var(--gs-card-bg));\n  color: var(--gs-green-400);\n}\n\n.mower-card.paused .mower-icon {\n  background: color-mix(in srgb, #ef9f27 15%, var(--gs-card-bg));\n  color: var(--gs-amber);\n}\n\n.mower-card.error .mower-icon {\n  background: color-mix(in srgb, #e53935 15%, var(--gs-card-bg));\n  color: var(--gs-red);\n}\n\n.mower-drive {\n  z-index: 1;\n  align-items: center;\n  display: inline-flex;\n  position: relative;\n}\n\n.mower-icon svg {\n  fill: currentColor;\n  width: 20px;\n  height: 20px;\n}\n\n.mower-icon.mowing .mower-drive {\n  animation: 3s linear infinite mowerDrive;\n}\n\n.grass-particles {\n  pointer-events: none;\n  width: 4px;\n  height: 4px;\n  position: absolute;\n  bottom: 2px;\n  left: -2px;\n}\n\n.grass-particles:before, .grass-particles:after {\n  content: \"\";\n  border-radius: 50%;\n  position: absolute;\n}\n\n.grass-particles:before {\n  background: #66bb6a;\n  width: 3px;\n  height: 3px;\n  animation: .8s ease-out infinite particleA;\n}\n\n.grass-particles:after {\n  background: #43a047;\n  width: 2px;\n  height: 2px;\n  animation: .8s ease-out .2s infinite particleB;\n}\n\n.mower-info {\n  flex: 1;\n  min-width: 0;\n}\n\n.mower-name {\n  color: var(--primary-text-color);\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.mower-activity {\n  color: var(--gs-text-dimmest);\n  align-items: center;\n  gap: 6px;\n  margin-top: 1px;\n  font-size: 11px;\n  transition: color .3s;\n  display: flex;\n}\n\n.mower-card.active .mower-activity {\n  color: var(--gs-green-200);\n}\n\n.mower-card.paused .mower-activity {\n  color: var(--gs-amber);\n}\n\n.mower-card.error .mower-activity {\n  color: var(--gs-red);\n}\n\n.mow-dot {\n  background: var(--gs-green-400);\n  border-radius: 50%;\n  width: 6px;\n  height: 6px;\n  animation: 1s ease-in-out infinite mowPulse;\n  display: inline-block;\n}\n\n.mower-battery-chip {\n  background: var(--gs-surface-hover);\n  color: var(--gs-text-dim);\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n  border-radius: 12px;\n  flex-shrink: 0;\n  align-items: center;\n  gap: 4px;\n  padding: 3px 8px;\n  font-size: 11px;\n  font-weight: 500;\n  display: inline-flex;\n}\n\n.mower-battery-chip.low {\n  background: color-mix(in srgb, #e53935 12%, var(--gs-card-bg));\n  color: var(--gs-red);\n}\n\n.mower-battery-chip.replace {\n  background: color-mix(in srgb, #e53935 18%, var(--gs-card-bg));\n  color: var(--gs-red);\n  animation: 2s ease-in-out infinite battery-replace-pulse;\n}\n\n@keyframes battery-replace-pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: .5;\n  }\n}\n\n.mower-battery-chip.charging {\n  background: color-mix(in srgb, #1dbf7b 12%, var(--gs-card-bg));\n  color: var(--gs-green-400);\n}\n\n.mower-battery-chip svg {\n  flex-shrink: 0;\n}\n\n.section-signal {\n  color: var(--gs-green-400);\n  cursor: pointer;\n  align-items: center;\n  margin-left: auto;\n  display: inline-flex;\n}\n\n.section-signal ha-icon {\n  --mdc-icon-size: 18px;\n  line-height: 0;\n}\n\n.card-header .section-signal ha-icon {\n  --mdc-icon-size: 16px;\n}\n\n.mower-progress {\n  background: color-mix(in srgb, var(--primary-text-color, #fff) 8%, transparent);\n  border-radius: 2px;\n  height: 4px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n\n.mower-progress-fill {\n  background: var(--gs-green-400);\n  border-radius: 2px;\n  height: 100%;\n  transition: width 1s linear;\n}\n\n.mower-remaining {\n  font-variant-numeric: tabular-nums;\n  opacity: .8;\n}\n\n.mower-error-banner {\n  border-radius: var(--gs-radius-sm);\n  color: var(--gs-red);\n  background: #e539351f;\n  margin-bottom: 12px;\n  padding: 8px 10px;\n  font-size: 11px;\n  line-height: 1.4;\n}\n\n.mower-actions {\n  flex-wrap: wrap;\n  gap: 6px;\n  display: flex;\n}\n\n.mower-btn {\n  border-radius: var(--gs-radius-md);\n  border: .5px solid var(--gs-border);\n  background: var(--gs-card-bg);\n  color: var(--gs-text-dim);\n  cursor: pointer;\n  white-space: nowrap;\n  align-items: center;\n  padding: 7px 14px;\n  font-family: inherit;\n  font-size: 12px;\n  font-weight: 500;\n  transition: all .2s;\n  display: inline-flex;\n}\n\n.mower-btn:hover {\n  background: var(--gs-surface);\n  color: var(--primary-text-color);\n  border-color: var(--gs-surface-hover);\n}\n\n.mower-btn.primary {\n  background: var(--gs-green-100);\n  color: var(--gs-green-400);\n  border-color: var(--gs-green-300);\n}\n\n.mower-btn.primary:hover {\n  background: color-mix(in srgb, #1dbf7b 15%, var(--gs-card-bg));\n}\n\n.mower-btn:disabled {\n  opacity: .3;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n\n.mower-btn-wrap {\n  align-items: stretch;\n  display: inline-flex;\n  position: relative;\n}\n\n.mower-btn-wrap .mower-btn {\n  border-right: none;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.mower-dur-wrap {\n  position: relative;\n}\n\n.mower-dur-btn {\n  border-top-right-radius: var(--gs-radius-md);\n  border-bottom-right-radius: var(--gs-radius-md);\n  border: .5px solid var(--gs-green-300);\n  border-left: .5px solid color-mix(in srgb, var(--gs-green-300) 40%, transparent);\n  background: var(--gs-green-100);\n  color: var(--gs-green-400);\n  cursor: pointer;\n  white-space: nowrap;\n  align-items: center;\n  gap: 2px;\n  padding: 7px 8px;\n  font-family: inherit;\n  font-size: 11px;\n  font-weight: 500;\n  transition: all .2s;\n  display: inline-flex;\n}\n\n.mower-dur-btn:hover {\n  background: color-mix(in srgb, #1dbf7b 15%, var(--gs-card-bg));\n}\n\n.mower-dur-btn:disabled {\n  opacity: .3;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n\n.mower-dur-btn svg {\n  opacity: .5;\n  transition: transform .25s cubic-bezier(.16, 1, .3, 1);\n}\n\n.mower-dur-btn.open svg {\n  opacity: .8;\n  transform: rotate(180deg);\n}\n\n.socket-section {\n  margin-top: .25rem;\n  padding: 0 1.5rem 1rem;\n}\n\n.socket-card {\n  background: var(--gs-surface);\n  border-radius: var(--gs-radius-md);\n  border: .5px solid #0000;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 14px;\n  transition: all .3s;\n  display: flex;\n}\n\n.socket-card.active {\n  background: var(--gs-amber-bg);\n  border-color: #ef9f274d;\n}\n\n.socket-left {\n  align-items: center;\n  gap: 12px;\n  min-width: 0;\n  display: flex;\n}\n\n.socket-icon {\n  border-radius: var(--gs-radius-sm);\n  background: var(--gs-surface-hover);\n  width: 36px;\n  height: 36px;\n  color: var(--gs-text-dimmest);\n  flex-shrink: 0;\n  justify-content: center;\n  align-items: center;\n  transition: all .3s;\n  display: flex;\n}\n\n.socket-card.active .socket-icon {\n  background: color-mix(in srgb, #ef9f27 15%, var(--gs-card-bg));\n  color: var(--gs-amber);\n}\n\n.socket-info {\n  min-width: 0;\n}\n\n.socket-name {\n  color: var(--primary-text-color);\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.socket-status {\n  color: var(--gs-text-dimmest);\n  margin-top: 1px;\n  font-size: 11px;\n  transition: color .3s;\n}\n\n.socket-card.active .socket-status {\n  color: var(--gs-amber);\n}\n\n.socket-right {\n  flex-shrink: 0;\n  align-items: center;\n  gap: 12px;\n  display: flex;\n}\n\n.socket-timer {\n  font-size: 12px;\n  font-family: var(--gs-font-mono, \"SF Mono\", \"Cascadia Code\", \"Consolas\", monospace);\n  color: var(--gs-text-dimmest);\n  text-align: right;\n  white-space: nowrap;\n}\n\n.socket-progress-wrap {\n  width: 100%;\n  margin-top: 8px;\n  padding: 0;\n}\n\n.socket-progress-track {\n  background: color-mix(in srgb, var(--primary-text-color, #000) 6%, transparent);\n  border-radius: 2px;\n  height: 3px;\n  overflow: hidden;\n}\n\n.socket-progress-fill {\n  background: var(--gs-amber);\n  border-radius: 2px;\n  height: 100%;\n  transition: width 1s linear;\n}\n\n.unavailable {\n  text-align: center;\n  color: var(--gs-text-dim);\n  padding: 20px;\n  font-size: 14px;\n}\n\n.version-warning {\n  background: color-mix(in srgb, #ef9f27 10%, var(--gs-card-bg));\n  border-radius: var(--gs-radius-md);\n  text-align: left;\n  color: var(--primary-text-color);\n  border: .5px solid #ef9f274d;\n  padding: 16px;\n  font-size: 13px;\n  line-height: 1.5;\n}\n\n.patch-warning {\n  background: color-mix(in srgb, #ef9f27 8%, var(--gs-card-bg));\n  border-radius: var(--gs-radius-sm);\n  color: var(--gs-text-dim);\n  border: .5px solid #ef9f2740;\n  margin: 0 1.5rem 8px;\n  padding: 10px 14px;\n  font-size: 12px;\n  line-height: 1.4;\n}\n\n.patch-warning strong {\n  color: var(--gs-amber);\n  margin-bottom: 2px;\n  font-size: 12px;\n  display: block;\n}\n\n.schedule-missing {\n  background: color-mix(in srgb, var(--info-color, #039be5) 8%, var(--gs-card-bg));\n  border: .5px solid color-mix(in srgb, var(--info-color, #039be5) 25%, transparent);\n  border-radius: var(--gs-radius-sm);\n  color: var(--gs-text-dim);\n  margin: 0 1.5rem 8px;\n  padding: 10px 14px;\n  font-size: 12px;\n  line-height: 1.4;\n}\n\n.schedule-missing strong {\n  color: var(--info-color, #039be5);\n  margin-bottom: 2px;\n  font-size: 12px;\n  display: block;\n}\n\n.history-section {\n  border-top: .5px solid var(--gs-border);\n  margin-top: 12px;\n  padding: 4px 1.5rem 1rem;\n}\n\n.history-header {\n  justify-content: space-between;\n  align-items: baseline;\n  margin-bottom: 14px;\n  display: flex;\n}\n\n.history-period {\n  color: var(--gs-text-dim);\n  font-size: 12px;\n}\n\n.history-total {\n  color: var(--gs-text-dim);\n  font-variant-numeric: tabular-nums;\n  font-size: 12px;\n}\n\n.chart-container {\n  gap: 0;\n  display: flex;\n}\n\n.chart-y-axis {\n  flex-shrink: 0;\n  height: 124px;\n  margin-bottom: 26px;\n  padding-right: 10px;\n  position: relative;\n}\n\n.chart-y-label {\n  color: var(--gs-text-dimmest);\n  font-variant-numeric: tabular-nums;\n  font-size: 10px;\n  line-height: 1;\n  position: absolute;\n  left: 0;\n  transform: translateY(-50%);\n}\n\n.chart-main {\n  flex: 1;\n  min-width: 0;\n  height: 124px;\n  margin-bottom: 26px;\n  position: relative;\n}\n\n.chart-gridlines {\n  pointer-events: none;\n  flex-direction: column;\n  justify-content: space-between;\n  display: flex;\n  position: absolute;\n  inset: 0;\n}\n\n.chart-gridline {\n  border-top: .5px solid var(--gs-border);\n  height: 0;\n}\n\n.chart-gridline:last-child {\n  border-top: .5px solid color-mix(in srgb, var(--primary-text-color, #000) 14%, transparent);\n}\n\n.chart-bars {\n  justify-content: space-around;\n  align-items: stretch;\n  padding: 0 4px;\n  display: flex;\n  position: absolute;\n  inset: 0;\n}\n\n.chart-bar-group {\n  flex-direction: column;\n  flex: 1;\n  justify-content: flex-end;\n  align-items: center;\n  max-width: 64px;\n  padding: 0 6px;\n  display: flex;\n  position: relative;\n}\n\n.chart-stack {\n  border-radius: 3px 3px 0 0;\n  flex-direction: column-reverse;\n  width: 100%;\n  display: flex;\n  overflow: hidden;\n}\n\n.chart-segment {\n  width: 100%;\n  min-height: 0;\n}\n\n.chart-segment + .chart-segment {\n  border-bottom: .5px solid #ffffff4d;\n}\n\n.chart-day-label {\n  color: var(--gs-text-dim);\n  white-space: nowrap;\n  margin-top: 4px;\n  font-size: 11px;\n  position: absolute;\n  top: 100%;\n}\n\n.chart-bar-group.today .chart-day-label {\n  color: var(--primary-text-color);\n  font-weight: 500;\n}\n\n.chart-bar-group:hover .chart-stack {\n  filter: brightness(1.08);\n}\n\n.chart-tooltip {\n  background: var(--gs-card-bg, var(--card-background-color, #fff));\n  border: .5px solid color-mix(in srgb, var(--primary-text-color, #000) 14%, transparent);\n  border-radius: var(--gs-radius-md);\n  color: var(--primary-text-color);\n  white-space: nowrap;\n  z-index: 10;\n  pointer-events: none;\n  padding: 8px 12px;\n  font-size: 11px;\n  display: none;\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n  box-shadow: 0 4px 16px #0000001f;\n}\n\n.chart-bar-group:hover .chart-tooltip {\n  display: block;\n}\n\n.tooltip-title {\n  border-bottom: .5px solid var(--gs-border);\n  margin-bottom: 4px;\n  padding-bottom: 4px;\n  font-size: 12px;\n  font-weight: 500;\n}\n\n.tooltip-line {\n  align-items: center;\n  gap: 6px;\n  padding: 2px 0;\n  display: flex;\n}\n\n.tooltip-dot {\n  border-radius: 2px;\n  flex-shrink: 0;\n  width: 6px;\n  height: 6px;\n}\n\n.tooltip-mins {\n  font-variant-numeric: tabular-nums;\n  margin-left: auto;\n  padding-left: 12px;\n  font-weight: 500;\n}\n\n.tooltip-total {\n  border-top: .5px solid var(--gs-border);\n  justify-content: space-between;\n  margin-top: 4px;\n  padding-top: 4px;\n  font-weight: 500;\n  display: flex;\n}\n\n.chart-legend {\n  flex-wrap: wrap;\n  gap: 4px 14px;\n  margin-top: 12px;\n  display: flex;\n}\n\n.legend-item {\n  color: var(--gs-text-dim);\n  align-items: center;\n  gap: 5px;\n  font-size: 11px;\n  display: flex;\n}\n\n.legend-dot {\n  border-radius: 2px;\n  flex-shrink: 0;\n  width: 8px;\n  height: 8px;\n}\n\n.schedule-strip {\n  border-top: 1px solid var(--gs-border);\n  flex-direction: column;\n  gap: 6px;\n  margin-top: 10px;\n  padding-top: 10px;\n  display: flex;\n}\n\n.schedule-row {\n  align-items: center;\n  gap: 8px;\n  display: flex;\n}\n\n.schedule-time {\n  color: var(--gs-text-dim);\n  font-variant-numeric: tabular-nums;\n  align-items: center;\n  gap: 4px;\n  min-width: 80px;\n  font-size: 11px;\n  font-weight: 500;\n  display: inline-flex;\n}\n\n.schedule-icon {\n  fill: currentColor;\n  opacity: .6;\n  flex-shrink: 0;\n  width: 12px;\n  height: 12px;\n}\n\n.schedule-days {\n  gap: 3px;\n  display: flex;\n}\n\n.schedule-day {\n  text-transform: uppercase;\n  letter-spacing: .3px;\n  border-radius: 4px;\n  justify-content: center;\n  align-items: center;\n  width: 20px;\n  height: 18px;\n  font-size: 9px;\n  font-weight: 600;\n  display: flex;\n}\n\n.schedule-day.active {\n  background: color-mix(in srgb, var(--gs-green-400) 20%, var(--gs-card-bg));\n  color: var(--gs-green-400);\n}\n\n.schedule-day.inactive {\n  background: var(--gs-surface);\n  color: var(--gs-text-dimmest);\n}\n\n.schedule-day.paused {\n  background: color-mix(in srgb, var(--gs-amber) 12%, var(--gs-card-bg));\n  color: var(--gs-amber);\n}\n\n.schedule-row.now-active, .valve-schedule-row.now-active, .socket-schedule-mini.now-active {\n  background: color-mix(in srgb, var(--gs-green-400) 10%, transparent);\n  border-radius: var(--gs-radius-sm);\n  padding: 4px 6px;\n}\n\n.schedule-row.now-active .schedule-time, .valve-schedule-row.now-active .valve-schedule-time, .socket-schedule-mini.now-active .schedule-time {\n  color: var(--gs-green-400);\n}\n\n.schedule-row.now-active .schedule-icon, .valve-schedule-row.now-active .schedule-icon, .socket-schedule-mini.now-active .schedule-icon {\n  opacity: 1;\n}\n\n.schedule-icon-wrap {\n  flex-shrink: 0;\n  display: inline-flex;\n  position: relative;\n}\n\n.schedule-paused .schedule-icon {\n  color: var(--gs-amber);\n  opacity: .8;\n}\n\n.schedule-paused .schedule-icon-wrap:after {\n  content: \"\";\n  background: linear-gradient(to top right,\n        transparent calc(50% - .5px),\n        var(--gs-amber) calc(50% - .5px),\n        var(--gs-amber) calc(50% + .5px),\n        transparent calc(50% + .5px));\n  opacity: .7;\n  pointer-events: none;\n  width: 14px;\n  height: 14px;\n  position: absolute;\n  top: -1px;\n  left: -1px;\n}\n\n.schedule-pause-badge {\n  color: var(--gs-amber);\n  background: color-mix(in srgb, var(--gs-amber) 10%, var(--gs-card-bg));\n  white-space: nowrap;\n  border-radius: 4px;\n  align-items: center;\n  gap: 3px;\n  margin-left: auto;\n  padding: 2px 7px;\n  font-size: 10px;\n  font-weight: 500;\n  display: inline-flex;\n}\n\n.valve-schedule-mini {\n  border-top: 1px solid var(--gs-border);\n  flex-direction: column;\n  gap: 4px;\n  margin-top: 8px;\n  padding-top: 8px;\n  display: flex;\n}\n\n.valve-schedule-row {\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px;\n  display: flex;\n}\n\n.valve-schedule-time {\n  color: var(--gs-text-dim);\n  font-variant-numeric: tabular-nums;\n  text-align: center;\n  justify-content: center;\n  align-items: center;\n  gap: 4px;\n  font-size: 11px;\n  display: inline-flex;\n}\n\n.valve-schedule-mini .schedule-days {\n  justify-content: center;\n  gap: 3px;\n}\n\n.valve-schedule-mini .schedule-day {\n  border-radius: 4px;\n  width: 20px;\n  height: 18px;\n  font-size: 9px;\n}\n\n@container (width <= 120px) {\n  .valve-header {\n    flex-wrap: wrap;\n  }\n\n  .pill {\n    border-radius: 14px;\n    flex-direction: column;\n    gap: 3px;\n    padding: 3px;\n  }\n}\n\n@container (width <= 150px) {\n  .valve-header {\n    margin-bottom: 6px;\n  }\n\n  .valve-name {\n    font-size: 12px;\n  }\n\n  .valve-schedule-time {\n    font-size: 10px;\n  }\n\n  .valve-schedule-mini .schedule-day {\n    border-radius: 3px;\n    width: 16px;\n    height: 14px;\n    font-size: 8px;\n  }\n\n  .valve-schedule-row {\n    flex-flow: row;\n    justify-content: center;\n    gap: 3px;\n  }\n\n  .valve-schedule-time {\n    white-space: nowrap;\n  }\n\n  .valve-schedule-mini .schedule-days {\n    gap: 1px;\n  }\n\n  .valve-schedule-mini .schedule-day {\n    border-radius: 50%;\n    width: 5px;\n    height: 5px;\n    padding: 0;\n    font-size: 0;\n    overflow: hidden;\n  }\n\n  .valve-schedule-mini .schedule-day.active {\n    background: var(--gs-green-400);\n  }\n\n  .valve-schedule-mini .schedule-day.inactive {\n    background: var(--gs-track);\n  }\n\n  .valve-schedule-mini .schedule-day.paused {\n    background: var(--gs-amber);\n  }\n}\n\n.valve.schedule-paused {\n  border-color: color-mix(in srgb, var(--gs-amber) 20%, transparent);\n}\n\n.socket-schedule-mini {\n  border-top: 1px solid var(--gs-border);\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  margin-top: 8px;\n  padding-top: 8px;\n  display: flex;\n}\n\n.socket-schedule-mini .schedule-time {\n  min-width: auto;\n}\n\n.socket-schedule-mini .schedule-days {\n  flex-wrap: nowrap;\n}\n\n@keyframes valveIn {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes dropPulse {\n  0%, 100% {\n    opacity: .6;\n    transform: rotate(-45deg) scale(1);\n  }\n\n  50% {\n    opacity: 1;\n    transform: rotate(-45deg) scale(1.15);\n  }\n}\n\n@keyframes countPulse {\n  0%, 100% {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: .55;\n  }\n}\n\n@keyframes mowerDrive {\n  0% {\n    transform: translateX(-130%);\n  }\n\n  100% {\n    transform: translateX(130%);\n  }\n}\n\n@keyframes particleA {\n  0% {\n    opacity: .9;\n    transform: translate(0) scale(1);\n  }\n\n  100% {\n    opacity: 0;\n    transform: translate(-8px, -10px) scale(.3);\n  }\n}\n\n@keyframes particleB {\n  0% {\n    opacity: .8;\n    transform: translate(0) scale(1);\n  }\n\n  100% {\n    opacity: 0;\n    transform: translate(-5px, -12px) scale(.2);\n  }\n}\n\n@keyframes mowPulse {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n\n  50% {\n    opacity: .5;\n    transform: scale(1.3);\n  }\n}\n\n@container (width <= 400px) {\n  .valves-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .valves-grid.count-1 {\n    grid-template-columns: 1fr;\n  }\n\n  .knob-section {\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .knob-info {\n    flex-flow: wrap;\n    justify-content: center;\n  }\n\n  .mower-actions {\n    flex-direction: column;\n  }\n\n  .mower-btn {\n    justify-content: center;\n  }\n}\n\n@container (width <= 300px) {\n  .mower-section, .valve-section, .socket-section {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n\n  .card-header {\n    padding: 12px 1rem;\n  }\n\n  .valves-grid {\n    grid-template-columns: 1fr !important;\n  }\n\n  .mower-header {\n    gap: 8px;\n  }\n\n  .mower-name {\n    font-size: 12px;\n  }\n\n  .mower-activity {\n    flex-wrap: wrap;\n    font-size: 10px;\n  }\n\n  .mower-battery-chip {\n    padding: 2px 6px;\n    font-size: 10px;\n  }\n\n  .mower-btn {\n    padding: 6px 10px;\n    font-size: 11px;\n  }\n\n  .schedule-row {\n    flex-wrap: wrap;\n    gap: 4px;\n  }\n\n  .schedule-time {\n    min-width: unset;\n    font-size: 10px;\n  }\n\n  .schedule-day {\n    width: 16px;\n    height: 14px;\n    font-size: 8px;\n  }\n\n  .schedule-days {\n    gap: 2px;\n  }\n\n  .socket-schedule-mini {\n    flex-wrap: wrap;\n    gap: 4px;\n  }\n}\n";


var $1dfb787b5a538269$exports = {};
$1dfb787b5a538269$exports = JSON.parse("{\"default_title\":\"Gardena Smart System\",\"config_backend\":\"Backend Integration\",\"config_backend_auto\":\"Auto-detect\",\"config_backend_thecem\":\"hass-gardena-smart-system (thecem)\",\"config_backend_kayloehmann\":\"ha-gardena-smart-system (kayloehmann)\",\"config_title\":\"Title (Optional)\",\"config_select_device\":\"Please select a Gardena Smart System device in the card configuration.\",\"config_no_device\":\"Please select a device.\",\"config_sections\":\"Sections to display (leave empty for all)\",\"config_show_header\":\"Show header\",\"config_show_duration\":\"Show duration picker\",\"config_default_duration\":\"Default duration (minutes)\",\"config_valve_columns\":\"Valve columns per row\",\"config_valve_entities\":\"Valve zones to display (leave empty for all)\",\"config_socket_entities\":\"Power sockets to display (leave empty for all)\",\"state_online\":\"Online\",\"state_offline\":\"Offline\",\"state_unavailable\":\"Unavailable\",\"section_valves\":\"Valve Zones\",\"section_socket\":\"Power Socket\",\"knob_unit_minutes\":\"Minutes\",\"valve_zone\":\"Zone\",\"valve_ready\":\"Ready\",\"valve_watering\":\"Watering\",\"valve_watering_scheduled\":\"Watering (schedule)\",\"valve_watering_manual\":\"Watering (manual)\",\"valve_open\":\"Open\",\"valve_closed\":\"Closed\",\"socket_off\":\"Off\",\"socket_active\":\"Active\",\"socket_active_scheduled\":\"Active (schedule)\",\"socket_active_manual\":\"Active (always on)\",\"socket_active_timed\":\"Active (manual)\",\"section_mower\":\"Mower\",\"config_mower_entities\":\"Mowers to display (leave empty for all)\",\"mower_cutting\":\"Mowing\",\"mower_cutting_manual\":\"Mowing (manual)\",\"mower_searching\":\"Returning to dock\",\"mower_leaving\":\"Leaving dock\",\"mower_next_action\":\"Starting next action\",\"mower_paused\":\"Paused\",\"mower_paused_cs\":\"Paused (in dock)\",\"mower_charging\":\"Charging\",\"mower_parked_timer\":\"Parked (schedule)\",\"mower_parked_manual\":\"Parked (manual)\",\"mower_parked_auto\":\"Parked (auto timer)\",\"mower_parked_frost\":\"Parked (frost)\",\"mower_stopped_garden\":\"Stopped in garden\",\"mower_searching_sat\":\"Searching for satellites\",\"mower_error\":\"Error\",\"mower_error_prefix\":\"Error\",\"error_trapped\":\"Mower is stuck\",\"error_lifted\":\"Mower was lifted\",\"error_outside\":\"Outside working area\",\"error_collision\":\"Collision detected\",\"error_upside_down\":\"Mower is upside down\",\"error_low_battery\":\"Battery too low\",\"error_temp_stopped\":\"Temporarily stopped\",\"error_cs_blocked\":\"Charging station blocked\",\"mower_mowing\":\"Mowing\",\"mower_docked\":\"Docked\",\"mower_start\":\"Start\",\"mower_resume_schedule\":\"Resume schedule\",\"mower_pause\":\"Pause\",\"mower_resume\":\"Resume\",\"mower_park_next\":\"Park until next\",\"mower_park\":\"Park\",\"ws_connected\":\"Connected\",\"ws_disconnected\":\"Disconnected\",\"version_required_title\":\"No supported integration found\",\"version_required_message\":\"This card requires a supported Gardena Smart System integration. Please install hass-gardena-smart-system (thecem) or ha-gardena-smart-system (kayloehmann) via HACS.\",\"patch_warning_title\":\"Patched integration required\",\"patch_warning_message\":\"Controls are disabled. Please install the patched integration from mtheli/hass-gardena-smart-system to enable device control.\",\"section_history\":\"History\",\"config_show_history\":\"Show history chart\",\"day_today\":\"Today\",\"day_sun\":\"Sun\",\"day_mon\":\"Mon\",\"day_tue\":\"Tue\",\"day_wed\":\"Wed\",\"day_thu\":\"Thu\",\"day_fri\":\"Fri\",\"day_sat\":\"Sat\",\"history_total_label\":\"Total\",\"chip_battery\":\"Battery\",\"config_show_schedules\":\"Show schedules\",\"schedule_tooltip\":\"Schedule from Gardena App\",\"schedule_tooltip_paused\":\"Schedule paused\",\"schedule_tooltip_active\":\"Schedule currently active\",\"schedule_paused\":\"Paused\",\"schedule_paused_until\":\"Paused until\",\"schedule_day_mo\":\"Mo\",\"schedule_day_tu\":\"Tu\",\"schedule_day_we\":\"We\",\"schedule_day_th\":\"Th\",\"schedule_day_fr\":\"Fr\",\"schedule_day_sa\":\"Sa\",\"schedule_day_su\":\"Su\",\"schedule_missing_title\":\"Schedule integration not installed\",\"schedule_missing_message\":\"Install Gardena Smart Schedule via HACS to display schedules from the Gardena App.\",\"sensor_temperature\":\"Temperature\",\"sensor_humidity\":\"Humidity\",\"sensor_light\":\"Light\",\"sensor_soil_temperature\":\"Soil Temp\",\"sensor_soil_humidity\":\"Soil Humidity\"}");


var $e236ed736515ddf8$exports = {};
$e236ed736515ddf8$exports = JSON.parse('{"default_title":"Gardena Smart System","config_backend":"Backend-Integration","config_backend_auto":"Automatisch erkennen","config_backend_thecem":"hass-gardena-smart-system (thecem)","config_backend_kayloehmann":"ha-gardena-smart-system (kayloehmann)","config_title":"Titel (Optional)","config_select_device":"Bitte w\xe4hle ein Gardena Smart System Ger\xe4t in der Kartenkonfiguration.","config_no_device":"Bitte w\xe4hle ein Ger\xe4t.","config_sections":"Anzuzeigende Bereiche (leer = alle)","config_show_header":"Header anzeigen","config_show_duration":"Zeitauswahl anzeigen","config_default_duration":"Standard-Laufzeit (Minuten)","config_valve_columns":"Ventile pro Zeile","config_valve_entities":"Anzuzeigende Ventilzonen (leer = alle)","config_socket_entities":"Anzuzeigende Steckdosen (leer = alle)","state_online":"Online","state_offline":"Offline","state_unavailable":"Nicht verf\xfcgbar","section_valves":"Ventilzonen","section_socket":"Steckdose","knob_unit_minutes":"Minuten","valve_zone":"Zone","valve_ready":"Bereit","valve_watering":"Bew\xe4sserung","valve_watering_scheduled":"Bew\xe4sserung (Zeitplan)","valve_watering_manual":"Bew\xe4sserung (manuell)","valve_open":"Offen","valve_closed":"Geschlossen","socket_off":"Aus","socket_active":"Aktiv","socket_active_scheduled":"Aktiv (Zeitplan)","socket_active_manual":"Aktiv (Dauerbetrieb)","socket_active_timed":"Aktiv (manuell)","section_mower":"M\xe4her","config_mower_entities":"Anzuzeigende M\xe4her (leer = alle)","mower_cutting":"M\xe4ht","mower_cutting_manual":"M\xe4ht (manuell)","mower_searching":"R\xfcckkehr zur Station","mower_leaving":"Verl\xe4sst Station","mower_next_action":"N\xe4chste Aktion","mower_paused":"Pausiert","mower_paused_cs":"Pausiert (in Station)","mower_charging":"L\xe4dt","mower_parked_timer":"Geparkt (Zeitplan)","mower_parked_manual":"Geparkt (manuell)","mower_parked_auto":"Geparkt (Autotimer)","mower_parked_frost":"Geparkt (Frost)","mower_stopped_garden":"Gestoppt im Garten","mower_searching_sat":"Satellitensuche","mower_error":"Fehler","mower_error_prefix":"Fehler","error_trapped":"M\xe4her steckt fest","error_lifted":"M\xe4her wurde angehoben","error_outside":"Au\xdferhalb des Arbeitsbereichs","error_collision":"Kollision erkannt","error_upside_down":"M\xe4her umgedreht","error_low_battery":"Akku zu schwach","error_temp_stopped":"Vor\xfcbergehend gestoppt","error_cs_blocked":"Ladestation blockiert","mower_mowing":"M\xe4ht","mower_docked":"In Station","mower_start":"Starten","mower_resume_schedule":"Zeitplan fortsetzen","mower_pause":"Pause","mower_resume":"Fortsetzen","mower_park_next":"Parken bis n\xe4chster","mower_park":"Parken","ws_connected":"Verbunden","ws_disconnected":"Getrennt","version_required_title":"Keine unterst\xfctzte Integration gefunden","version_required_message":"Diese Karte ben\xf6tigt eine unterst\xfctzte Gardena Smart System Integration. Bitte hass-gardena-smart-system (thecem) oder ha-gardena-smart-system (kayloehmann) \xfcber HACS installieren.","patch_warning_title":"Gepatchte Integration erforderlich","patch_warning_message":"Steuerung deaktiviert. Bitte die gepatchte Integration von mtheli/hass-gardena-smart-system installieren, um Ger\xe4te steuern zu k\xf6nnen.","section_history":"Historie","config_show_history":"Verlaufsdiagramm anzeigen","day_today":"Heute","day_sun":"So","day_mon":"Mo","day_tue":"Di","day_wed":"Mi","day_thu":"Do","day_fri":"Fr","day_sat":"Sa","history_total_label":"Gesamt","chip_battery":"Akku","config_show_schedules":"Zeitpl\xe4ne anzeigen","schedule_tooltip":"Zeitplan aus der Gardena App","schedule_tooltip_paused":"Zeitplan pausiert","schedule_tooltip_active":"Zeitplan gerade aktiv","schedule_paused":"Pausiert","schedule_paused_until":"Pausiert bis","schedule_day_mo":"Mo","schedule_day_tu":"Di","schedule_day_we":"Mi","schedule_day_th":"Do","schedule_day_fr":"Fr","schedule_day_sa":"Sa","schedule_day_su":"So","schedule_missing_title":"Schedule-Integration nicht installiert","schedule_missing_message":"Installiere Gardena Smart Schedule \xfcber HACS, um Zeitpl\xe4ne aus der Gardena App anzuzeigen.","sensor_temperature":"Temperatur","sensor_humidity":"Feuchtigkeit","sensor_light":"Licht","sensor_soil_temperature":"Bodentemp.","sensor_soil_humidity":"Bodenfeuchtigkeit"}');


const $bfc33d6b165ebf37$var$LOCALES = {
    en: (/*@__PURE__*/$parcel$interopDefault($1dfb787b5a538269$exports)),
    de: (/*@__PURE__*/$parcel$interopDefault($e236ed736515ddf8$exports))
};
function $bfc33d6b165ebf37$export$625550452a3fa3ec(hass, key) {
    const lang = hass?.language || 'en';
    const locale = $bfc33d6b165ebf37$var$LOCALES[lang] || $bfc33d6b165ebf37$var$LOCALES.en;
    return locale[key] || $bfc33d6b165ebf37$var$LOCALES.en[key] || key;
}


/**
 * Backend adapter for the original hass-gardena-smart-system integration
 * (py-smart-gardena / thecem / mtheli fork)
 *
 * Uses custom domain-level services (gardena_smart_system.*) with device_id parameter.
 * Duration parameters are in seconds.
 */ const $745bb0daa83c0e2b$var$DOMAIN = 'gardena_smart_system';
class $745bb0daa83c0e2b$export$40967b6313899a18 {
    get id() {
        return 'thecem';
    }
    // -- Valve --
    async openValve(hass, { entityId: entityId, gardenaDeviceId: gardenaDeviceId, serviceId: serviceId, durationSec: durationSec }) {
        const data = {
            device_id: gardenaDeviceId
        };
        if (serviceId != null) {
            data.service_id = serviceId;
            data.duration = durationSec;
        }
        await hass.callService($745bb0daa83c0e2b$var$DOMAIN, 'valve_open', data);
    }
    async closeValve(hass, { entityId: entityId, gardenaDeviceId: gardenaDeviceId, serviceId: serviceId }) {
        const data = {
            device_id: gardenaDeviceId
        };
        if (serviceId != null) data.service_id = serviceId;
        await hass.callService($745bb0daa83c0e2b$var$DOMAIN, 'valve_close', data);
    }
    // -- Mower --
    async callMowerAction(hass, entityId, action, durationSec) {
        switch(action){
            case 'start_override':
                await hass.callService($745bb0daa83c0e2b$var$DOMAIN, 'start_override', {
                    entity_id: entityId,
                    duration: durationSec
                });
                return true; // started timer
            case 'start_automatic':
                await hass.callService($745bb0daa83c0e2b$var$DOMAIN, 'start_automatic', {
                    entity_id: entityId
                });
                return false;
            case 'park_until_next_task':
                await hass.callService($745bb0daa83c0e2b$var$DOMAIN, 'park_until_next_task', {
                    entity_id: entityId
                });
                return false;
            case 'park_until_further_notice':
                await hass.callService($745bb0daa83c0e2b$var$DOMAIN, 'park_until_further_notice', {
                    entity_id: entityId
                });
                return false;
            case 'pause':
                await hass.callService('lawn_mower', 'pause', {
                    entity_id: entityId
                });
                return false;
            case 'resume':
                await hass.callService('lawn_mower', 'start_mowing', {
                    entity_id: entityId
                });
                return false;
        }
        return false;
    }
    getMowerActions(haState) {
        switch(haState){
            case 'docked':
                return [
                    {
                        key: 'mower_start',
                        action: 'start_override',
                        primary: true,
                        showDuration: true
                    },
                    {
                        key: 'mower_resume_schedule',
                        action: 'start_automatic'
                    }
                ];
            case 'mowing':
                return [
                    {
                        key: 'mower_pause',
                        action: 'pause',
                        primary: true
                    },
                    {
                        key: 'mower_park_next',
                        action: 'park_until_next_task'
                    },
                    {
                        key: 'mower_park',
                        action: 'park_until_further_notice'
                    }
                ];
            case 'paused':
                return [
                    {
                        key: 'mower_resume',
                        action: 'resume',
                        primary: true
                    },
                    {
                        key: 'mower_park_next',
                        action: 'park_until_next_task'
                    },
                    {
                        key: 'mower_park',
                        action: 'park_until_further_notice'
                    }
                ];
            default:
                return [
                    {
                        key: 'mower_start',
                        action: 'start_override',
                        primary: true,
                        showDuration: true
                    },
                    {
                        key: 'mower_park',
                        action: 'park_until_further_notice'
                    }
                ];
        }
    }
    getMowerInfo(_hass, state, _context) {
        return {
            haState: state.state,
            activity: state.attributes.activity,
            battery: state.attributes.battery_level,
            batteryState: state.attributes.battery_state,
            opHours: state.attributes.operating_hours,
            lastError: state.attributes.last_error_code,
            deviceState: state.attributes.state
        };
    }
    // -- Socket --
    async turnOnSocket(hass, { entityId: entityId, gardenaDeviceId: gardenaDeviceId, durationSec: durationSec, patched: patched }) {
        const data = {
            device_id: gardenaDeviceId
        };
        if (patched) data.duration = durationSec;
        await hass.callService($745bb0daa83c0e2b$var$DOMAIN, 'power_socket_on', data);
    }
    async turnOffSocket(hass, { entityId: entityId, gardenaDeviceId: gardenaDeviceId }) {
        await hass.callService($745bb0daa83c0e2b$var$DOMAIN, 'power_socket_off', {
            device_id: gardenaDeviceId
        });
    }
    // -- Attribute helpers --
    getRfLinkLevel(hass, entityId) {
        return hass.states[entityId]?.attributes?.rf_link_level ?? null;
    }
    isPatchedIntegration(hass, entities) {
        if (!entities?.valves?.length) return undefined;
        const firstValve = hass.states[entities.valves[0]];
        return firstValve?.attributes?.service_id != null;
    }
    getGardenaDeviceId(hass, entityId) {
        const entity = (hass.entities || {})[entityId];
        if (!entity?.device_id) return null;
        const device = (hass.devices || {})[entity.device_id];
        if (!device?.identifiers) return null;
        for (const [domain, id] of device.identifiers){
            if (domain === $745bb0daa83c0e2b$var$DOMAIN) return id;
        }
        return null;
    }
}


/**
 * Backend adapter for kayloehmann's ha-gardena-smart-system integration
 * (kayloehmann/ha-gardena-smart-system) v1.4+
 *
 * Uses standard HA services (valve.open_valve, lawn_mower.start_mowing, switch.turn_on)
 * plus entity-services for timed operations (duration in minutes).
 * Device identifiers use serial number: (DOMAIN, device.serial).
 *
 * Key differences from thecem backend:
 *   - activity, battery_state are separate sensor entities (not attributes on mower)
 *   - valve remaining duration is a separate sensor (not attribute on valve)
 *   - valve activity is not exposed at all (inferred via schedule integration)
 *   - socket activity IS an extra_state_attribute on the switch entity
 */ const $846aa683367f4d83$var$DOMAIN = 'gardena_smart_system';
class $846aa683367f4d83$export$15679f44c07c43cc {
    get id() {
        return 'kayloehmann';
    }
    // -- Valve --
    async openValve(hass, { entityId: entityId, durationSec: durationSec }) {
        // Use entity-service start_watering with duration in minutes
        const durationMin = Math.round(durationSec / 60);
        await hass.callService($846aa683367f4d83$var$DOMAIN, 'start_watering', {
            entity_id: entityId,
            duration: durationMin
        });
    }
    async closeValve(hass, { entityId: entityId }) {
        await hass.callService('valve', 'close_valve', {
            entity_id: entityId
        });
    }
    // -- Mower --
    async callMowerAction(hass, entityId, action, durationSec) {
        switch(action){
            case 'start_override':
                {
                    // Entity-service override_schedule with duration in minutes
                    const durationMin = Math.round(durationSec / 60);
                    await hass.callService($846aa683367f4d83$var$DOMAIN, 'override_schedule', {
                        entity_id: entityId,
                        duration: durationMin
                    });
                    return true; // started timer
                }
            case 'start_automatic':
                // start_mowing maps to START_DONT_OVERRIDE (resume schedule)
                await hass.callService('lawn_mower', 'start_mowing', {
                    entity_id: entityId
                });
                return false;
            case 'park_until_next_task':
                // dock maps to PARK_UNTIL_NEXT_TASK
                await hass.callService('lawn_mower', 'dock', {
                    entity_id: entityId
                });
                return false;
            case 'park_until_further_notice':
                // pause maps to PARK_UNTIL_FURTHER_NOTICE
                await hass.callService('lawn_mower', 'pause', {
                    entity_id: entityId
                });
                return false;
            case 'pause':
                await hass.callService('lawn_mower', 'pause', {
                    entity_id: entityId
                });
                return false;
            case 'resume':
                await hass.callService('lawn_mower', 'start_mowing', {
                    entity_id: entityId
                });
                return false;
        }
        return false;
    }
    getMowerActions(haState) {
        switch(haState){
            case 'docked':
                return [
                    {
                        key: 'mower_start',
                        action: 'start_override',
                        primary: true,
                        showDuration: true
                    },
                    {
                        key: 'mower_resume_schedule',
                        action: 'start_automatic'
                    }
                ];
            case 'mowing':
                return [
                    {
                        key: 'mower_pause',
                        action: 'pause',
                        primary: true
                    },
                    {
                        key: 'mower_park_next',
                        action: 'park_until_next_task'
                    },
                    {
                        key: 'mower_park',
                        action: 'park_until_further_notice'
                    }
                ];
            case 'paused':
                return [
                    {
                        key: 'mower_resume',
                        action: 'resume',
                        primary: true
                    },
                    {
                        key: 'mower_park_next',
                        action: 'park_until_next_task'
                    },
                    {
                        key: 'mower_park',
                        action: 'park_until_further_notice'
                    }
                ];
            default:
                return [
                    {
                        key: 'mower_start',
                        action: 'start_override',
                        primary: true,
                        showDuration: true
                    },
                    {
                        key: 'mower_park',
                        action: 'park_until_further_notice'
                    }
                ];
        }
    }
    getMowerInfo(hass, state, { entities: entities, deviceId: deviceId }) {
        // kayloehmann exposes activity, battery_state as separate sensor entities
        // battery_level is on a separate sensor entity (device lookup)
        let battery = null;
        if (deviceId && entities?.deviceBatteries?.[deviceId]) {
            const batteryEntityId = entities.deviceBatteries[deviceId];
            const batteryState = hass.states[batteryEntityId];
            if (batteryState) {
                battery = parseInt(batteryState.state, 10);
                if (isNaN(battery)) battery = null;
            }
        }
        // Activity from separate sensor (raw Gardena values: OK_CUTTING, PARKED_TIMER, etc.)
        let activity = state.attributes.activity; // fallback to attribute if present
        if (!activity && deviceId && entities?.deviceMowerActivities?.[deviceId]) {
            const actSensor = hass.states[entities.deviceMowerActivities[deviceId]];
            if (actSensor) activity = actSensor.state;
        }
        // Battery state from separate enum sensor (lowercase: charging, ok, low, etc.)
        let batteryState = state.attributes.battery_state;
        if (!batteryState && deviceId && entities?.deviceBatteryStates?.[deviceId]) {
            const batStateSensor = hass.states[entities.deviceBatteryStates[deviceId]];
            if (batStateSensor) batteryState = batStateSensor.state?.toUpperCase();
        }
        return {
            haState: state.state,
            activity: activity,
            battery: battery,
            batteryState: batteryState,
            opHours: null,
            lastError: state.attributes.last_error_code,
            deviceState: null
        };
    }
    // -- Socket --
    async turnOnSocket(hass, { entityId: entityId, durationSec: durationSec }) {
        // Entity-service turn_on_for with duration in minutes
        const durationMin = Math.round(durationSec / 60);
        await hass.callService($846aa683367f4d83$var$DOMAIN, 'turn_on_for', {
            entity_id: entityId,
            duration: durationMin
        });
    }
    async turnOffSocket(hass, { entityId: entityId }) {
        await hass.callService('switch', 'turn_off', {
            entity_id: entityId
        });
    }
    // -- Attribute helpers --
    getRfLinkLevel(_hass, _entityId) {
        // rf_link_level is a separate sensor entity in kayloehmann's integration
        // not available as a direct attribute on valve/mower/switch entities
        return null;
    }
    isPatchedIntegration() {
        // kayloehmann's integration always has working controls
        return true;
    }
    getGardenaDeviceId(hass, entityId) {
        // kayloehmann uses serial as device identifier: (DOMAIN, serial)
        const entity = (hass.entities || {})[entityId];
        if (!entity?.device_id) return null;
        const device = (hass.devices || {})[entity.device_id];
        if (!device?.identifiers) return null;
        for (const [domain, id] of device.identifiers){
            if (domain === $846aa683367f4d83$var$DOMAIN) return id;
        }
        return null;
    }
}


const $c181edec8277de1e$export$d5e7ce6d07daf10f = "0.4.0";
// ---------- Knob constants ----------
const $c181edec8277de1e$var$KNOB_MIN = 5;
const $c181edec8277de1e$var$KNOB_MAX = 120;
const $c181edec8277de1e$var$KNOB_ARC_START = 135;
const $c181edec8277de1e$var$KNOB_ARC_SWEEP = 270;
const $c181edec8277de1e$var$KNOB_RADIUS = 58;
const $c181edec8277de1e$var$KNOB_CX = 70;
const $c181edec8277de1e$var$KNOB_CY = 70;
const $c181edec8277de1e$var$KNOB_CIRCUMFERENCE = 2 * Math.PI * $c181edec8277de1e$var$KNOB_RADIUS;
const $c181edec8277de1e$var$KNOB_ARC_LENGTH = $c181edec8277de1e$var$KNOB_ARC_SWEEP / 360 * $c181edec8277de1e$var$KNOB_CIRCUMFERENCE;
const $c181edec8277de1e$var$KNOB_PRESETS = [
    10,
    30,
    60,
    120
];
// Integration domain for custom services (v2+)
const $c181edec8277de1e$var$DOMAIN = 'gardena_smart_system';
// ---------- Mower activity mapping ----------
const $c181edec8277de1e$var$MOWER_ACTIVITY_MAP = {
    'OK_CUTTING': 'mower_cutting',
    'OK_CUTTING_TIMER_OVERRIDDEN': 'mower_cutting_manual',
    'OK_SEARCHING': 'mower_searching',
    'OK_LEAVING': 'mower_leaving',
    'INITIATE_NEXT_ACTION': 'mower_next_action',
    'PAUSED': 'mower_paused',
    'PAUSED_IN_CS': 'mower_paused_cs',
    'OK_CHARGING': 'mower_charging',
    'PARKED_TIMER': 'mower_parked_timer',
    'PARKED_PARK_SELECTED': 'mower_parked_manual',
    'PARKED_AUTOTIMER': 'mower_parked_auto',
    'PARKED_FROST': 'mower_parked_frost',
    'STOPPED_IN_GARDEN': 'mower_stopped_garden',
    'SEARCHING_FOR_SATELLITES': 'mower_searching_sat',
    'NONE': 'mower_error'
};
const $c181edec8277de1e$var$MOWER_ERROR_MAP = {
    'TRAPPED': 'error_trapped',
    'LIFTED': 'error_lifted',
    'OUTSIDE_WORKING_AREA': 'error_outside',
    'COLLISION': 'error_collision',
    'UPSIDE_DOWN': 'error_upside_down',
    'LOW_BATTERY': 'error_low_battery',
    'TEMPORARILY_STOPPED': 'error_temp_stopped',
    'CHARGING_STATION_BLOCKED': 'error_cs_blocked'
};
// Module-level timer storage — survives card re-creation during config edits
const $c181edec8277de1e$var$TIMER_STORAGE_KEY = 'gardena_card_timers';
const $c181edec8277de1e$var$_persistedTimers = $c181edec8277de1e$var$_loadTimers();
function $c181edec8277de1e$var$_loadTimers() {
    try {
        const raw = localStorage.getItem($c181edec8277de1e$var$TIMER_STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        const timers = {};
        const now = Date.now();
        for (const [id, t] of Object.entries(parsed)){
            const start = new Date(t.startTime);
            // Discard expired timers
            if (now - start.getTime() < t.durationSec * 1000) timers[id] = {
                startTime: start,
                durationSec: t.durationSec
            };
        }
        return timers;
    } catch  {
        return {};
    }
}
function $c181edec8277de1e$var$_saveTimers() {
    try {
        const data = {};
        for (const [id, t] of Object.entries($c181edec8277de1e$var$_persistedTimers))data[id] = {
            startTime: t.startTime.toISOString(),
            durationSec: t.durationSec
        };
        if (Object.keys(data).length > 0) localStorage.setItem($c181edec8277de1e$var$TIMER_STORAGE_KEY, JSON.stringify(data));
        else localStorage.removeItem($c181edec8277de1e$var$TIMER_STORAGE_KEY);
    } catch  {}
}
class $c181edec8277de1e$export$4db43f2ac07d900b extends (0, $ab210b2da7b39b9d$export$3f2f9f5909897157) {
    static get properties() {
        return {
            config: {
                type: Object
            },
            _entities: {
                type: Object,
                state: true
            },
            _selectedDuration: {
                type: Number,
                state: true
            },
            _now: {
                type: Object,
                state: true
            },
            _backend: {
                type: Object,
                state: true
            },
            _historyData: {
                type: Array,
                state: true
            }
        };
    }
    constructor(){
        super();
        this._selectedDuration = 30;
        this._now = new Date();
        this._clockInterval = null;
        this._isDragging = false;
        this._backend = null;
        this._historyData = null;
        this._historyLastFetch = 0;
        // Per-entity duration: entityId -> minutes
        this._entityDurations = {};
        // Which pill popup is currently open (entityId or null)
        this._openPillPopup = null;
        // Local countdown tracking: entityId -> { startTime, durationSec }
        this._valveTimers = $c181edec8277de1e$var$_persistedTimers;
    }
    connectedCallback() {
        super.connectedCallback();
        this._clockInterval = setInterval(()=>{
            this._now = new Date();
        }, 1000);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._clockInterval) {
            clearInterval(this._clockInterval);
            this._clockInterval = null;
        }
    }
    // ---------- Translation helper ----------
    _t(key) {
        return (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(this._hass, key);
    }
    set hass(hass) {
        this._hass = hass;
        // Auto-detect backend adapter
        if (!this._backend && hass.services?.[$c181edec8277de1e$var$DOMAIN]) {
            // valve_open is a domain-level service only registered by thecem's integration
            if (hass.services[$c181edec8277de1e$var$DOMAIN].valve_open) this._backend = new (0, $745bb0daa83c0e2b$export$40967b6313899a18)();
            else this._backend = new (0, $846aa683367f4d83$export$15679f44c07c43cc)();
        }
        // Detect patched integration via backend
        if (this._isPatchedIntegration === undefined && this._backend && this._entities?.valves?.length) this._isPatchedIntegration = this._backend.isPatchedIntegration(hass, this._entities);
        if (!this._entities || !this._entities.valves) this._entities = this._findEntities(hass);
        // Fetch history data if needed
        if (this.config?.show_history !== false && this._entities) this._fetchHistory();
        // Clean up local timers for valves/sockets that closed externally
        let timerChanged = false;
        for (const entityId of Object.keys(this._valveTimers)){
            const state = hass.states[entityId];
            if (!state || state.state !== 'open' && state.state !== 'on' && state.state !== 'mowing') {
                delete this._valveTimers[entityId];
                timerChanged = true;
            }
        }
        if (timerChanged) $c181edec8277de1e$var$_saveTimers();
        this.requestUpdate();
    }
    get hass() {
        return this._hass;
    }
    setConfig(config) {
        this.config = config;
        this._selectedDuration = config.default_duration || 30;
        this._entities = null;
        if (this._hass) this._entities = this._findEntities(this._hass);
    }
    getCardSize() {
        return 6;
    }
    // ---------- Entity discovery (domain-based) ----------
    _findEntities(hass) {
        const allEntities = hass.entities || {};
        const found = {
            valves: [],
            sockets: [],
            mowers: [],
            connection: null,
            battery: null,
            deviceBatteries: {},
            deviceConnections: {},
            deviceSignals: {},
            deviceMowerActivities: {},
            deviceBatteryStates: {},
            deviceValveRemainingDurations: {},
            deviceSocketRemainingDurations: {},
            deviceIds: new Set()
        };
        for(const entityId in allEntities){
            const entity = allEntities[entityId];
            if (entity.platform !== $c181edec8277de1e$var$DOMAIN) continue;
            const domain = entityId.split('.')[0];
            const state = hass.states[entityId];
            if (entity.device_id) found.deviceIds.add(entity.device_id);
            if (domain === 'valve') found.valves.push(entityId);
            else if (domain === 'switch') found.sockets.push(entityId);
            else if (domain === 'lawn_mower') found.mowers.push(entityId);
            else if (domain === 'binary_sensor' && state?.attributes?.device_class === 'connectivity') {
                found.deviceConnections[entity.device_id] = entityId;
                if (!found.connection) found.connection = entityId;
            } else if (domain === 'sensor') {
                if (state?.attributes?.device_class === 'battery') {
                    if (!found.battery) found.battery = entityId;
                    if (entity.device_id) found.deviceBatteries[entity.device_id] = entityId;
                } else if (entity.translation_key === 'rf_link_level' && entity.device_id) found.deviceSignals[entity.device_id] = entityId;
                else if (entity.translation_key === 'mower_activity' && entity.device_id) found.deviceMowerActivities[entity.device_id] = entityId;
                else if (entity.translation_key === 'battery_state' && entity.device_id) found.deviceBatteryStates[entity.device_id] = entityId;
                else if (entity.translation_key === 'valve_remaining_duration' && entity.device_id) found.deviceValveRemainingDurations[entity.device_id] = entityId;
                else if (entity.translation_key === 'power_socket_remaining_duration' && entity.device_id) found.deviceSocketRemainingDurations[entity.device_id] = entityId;
            }
        }
        return found;
    }
    // ---------- Helpers ----------
    _shortEntityName(state, fallback) {
        // Prefer device name over entity friendly_name to avoid redundancy
        const entityId = state?.entity_id;
        if (entityId) {
            const entityReg = (this._hass.entities || {})[entityId];
            if (entityReg?.device_id) {
                const device = (this._hass.devices || {})[entityReg.device_id];
                if (device?.name_by_user || device?.name) return device.name_by_user || device.name;
            }
        }
        const name = state?.attributes?.friendly_name || fallback;
        let short = name.includes(' - ') ? name.split(' - ').pop().trim() : name;
        short = short.replace(/\b(\w+)(?:\s+\1)+\b/gi, '$1');
        return short || fallback;
    }
    _entityNameWithoutDevice(entityId, fallback) {
        const state = this._hass.states[entityId];
        const name = state?.attributes?.friendly_name || fallback;
        const entityReg = (this._hass.entities || {})[entityId];
        if (entityReg?.device_id) {
            const device = (this._hass.devices || {})[entityReg.device_id];
            const devName = device?.name_by_user || device?.name;
            if (devName && name.startsWith(devName)) {
                const suffix = name.substring(devName.length).replace(/^[\s\-–]+/, '').trim();
                if (suffix) return suffix;
            }
        }
        return name;
    }
    _getGardenaDeviceId(entityId) {
        if (this._backend) return this._backend.getGardenaDeviceId(this._hass, entityId);
        const entity = (this._hass.entities || {})[entityId];
        if (!entity?.device_id) return null;
        const device = (this._hass.devices || {})[entity.device_id];
        if (!device?.identifiers) return null;
        for (const [domain, id] of device.identifiers){
            if (domain === $c181edec8277de1e$var$DOMAIN) return id;
        }
        return null;
    }
    _formatTime(seconds) {
        if (!seconds || seconds <= 0) return '';
        const m = Math.floor(seconds / 60);
        const s = Math.round(seconds % 60);
        if (m > 0 && s > 0) return `${m}m ${s}s`;
        if (m > 0) return `${m} min`;
        return `${s}s`;
    }
    _getValveRemaining(entityId, state) {
        // Try real attribute first (thecem-style integration)
        if (state.attributes.valve_remaining_time > 0) return {
            remaining: state.attributes.valve_remaining_time,
            total: state.attributes.valve_duration || state.attributes.valve_remaining_time
        };
        // Try separate remaining_duration sensor (kayloehmann)
        const entityReg = (this._hass.entities || {})[entityId];
        const devId = entityReg?.device_id;
        if (devId) {
            const remainSensorId = this._entities?.deviceValveRemainingDurations?.[devId];
            if (remainSensorId) {
                const remainSensor = this._hass.states[remainSensorId];
                const secs = parseFloat(remainSensor?.state);
                if (secs > 0) return {
                    remaining: secs,
                    total: secs
                };
            }
        }
        // Fall back to local timer tracking (py-smart-gardena v2)
        const timer = this._valveTimers[entityId];
        if (timer) {
            const elapsed = (this._now.getTime() - timer.startTime.getTime()) / 1000;
            const remaining = Math.max(0, timer.durationSec - elapsed);
            return {
                remaining: remaining,
                total: timer.durationSec
            };
        }
        // Fall back to schedule-based timer
        const scheduleTimer = this._getScheduleRemaining(entityId, state);
        if (scheduleTimer) return scheduleTimer;
        return {
            remaining: 0,
            total: 0
        };
    }
    _getScheduleRemaining(entityId, state) {
        const activity = this._getEntityActivity(entityId, state);
        const haState = state.state;
        const isScheduled = activity === 'SCHEDULED_WATERING' || activity === 'SCHEDULED_ON' || haState === 'mowing' && (activity === 'OK_CUTTING' || activity === 'OK_CUTTING_TIMER_OVERRIDDEN');
        if (!isScheduled) return null;
        const events = this._getScheduleEvents(entityId);
        if (!events || events.length === 0) return null;
        const now = this._now;
        const dayMap = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday'
        ];
        const today = dayMap[now.getDay()];
        const nowMins = now.getHours() * 60 + now.getMinutes();
        for (const ev of events){
            if (!(ev.weekdays || []).includes(today)) continue;
            const startRaw = ev.start_at || '';
            const endRaw = ev.end_at || '';
            if (startRaw.startsWith('SR') || startRaw.startsWith('SS') || endRaw.startsWith('SR') || endRaw.startsWith('SS')) continue;
            const [sh, sm] = startRaw.split(':').map(Number);
            const [eh, em] = endRaw.split(':').map(Number);
            if (isNaN(sh) || isNaN(eh)) continue;
            const startMins = sh * 60 + (sm || 0);
            const endMins = eh * 60 + (em || 0);
            const crossesMidnight = endMins <= startMins;
            const inRange = crossesMidnight ? nowMins >= startMins || nowMins <= endMins : nowMins >= startMins && nowMins <= endMins;
            if (inRange) {
                const totalSec = crossesMidnight ? (1440 - startMins + endMins) * 60 : (endMins - startMins) * 60;
                const elapsedSec = crossesMidnight && nowMins < startMins ? (1440 - startMins + nowMins) * 60 + now.getSeconds() : (nowMins - startMins) * 60 + now.getSeconds();
                return {
                    remaining: Math.max(0, totalSec - elapsedSec),
                    total: totalSec
                };
            }
        }
        return null;
    }
    _getConnectionEntityForDevices(entityIds) {
        const connections = this._entities?.deviceConnections || {};
        const signals = this._entities?.deviceSignals || {};
        const entities = this._hass.entities || {};
        for (const eid of entityIds){
            const devId = entities[eid]?.device_id;
            if (devId) {
                if (connections[devId]) return connections[devId];
                if (signals[devId]) return signals[devId];
            }
        }
        return null;
    }
    _renderConnectionIcon(status, entityIds) {
        const connEntityId = entityIds ? this._getConnectionEntityForDevices(entityIds) : null;
        const click = connEntityId ? ()=>this._fireMoreInfo(connEntityId) : null;
        const tooltip = status === 'online' ? this._t('state_online') : this._t('state_offline');
        if (status === 'online') return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="section-status online" title="${tooltip}" @click="${click}"><svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg></span>`;
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="section-status offline" title="${tooltip}" @click="${click}"><svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg></span>`;
    }
    _getDeviceOnlineStatus(entityIds) {
        if (!entityIds || entityIds.length === 0) return null;
        const connections = this._entities?.deviceConnections || {};
        const entities = this._hass.entities || {};
        const checked = new Set();
        let online = false, offline = false;
        let hasConnSensor = false;
        for (const eid of entityIds){
            const devId = entities[eid]?.device_id;
            if (!devId || checked.has(devId)) continue;
            checked.add(devId);
            const connId = connections[devId];
            if (connId) {
                hasConnSensor = true;
                if (this._hass.states[connId]?.state === 'on') online = true;
                else offline = true;
            }
        }
        if (hasConnSensor) {
            if (online && !offline) return 'online';
            if (offline) return 'offline';
            return null;
        }
        // Fallback: check entity availability (e.g. kayloehmann backend)
        for (const eid of entityIds){
            const state = this._hass.states[eid];
            if (!state) continue;
            if (state.state === 'unavailable') offline = true;
            else online = true;
        }
        if (online && !offline) return 'online';
        if (offline) return 'offline';
        return null;
    }
    _getMinRfLink(entityIds) {
        let min = null;
        for (const eid of entityIds){
            let rf = this._backend ? this._backend.getRfLinkLevel(this._hass, eid) : this._hass.states[eid]?.attributes?.rf_link_level;
            // Fallback: look up device signal sensor (e.g. kayloehmann)
            if (rf == null) {
                const devId = (this._hass.entities || {})[eid]?.device_id;
                const sigId = devId && this._entities?.deviceSignals?.[devId];
                if (sigId) {
                    rf = parseInt(this._hass.states[sigId]?.state, 10);
                    if (isNaN(rf)) rf = null;
                }
            }
            if (rf != null && (min === null || rf < min)) min = rf;
        }
        return min;
    }
    _renderSignalBars(level) {
        let icon;
        if (level >= 75) icon = 'mdi:signal-cellular-3';
        else if (level >= 50) icon = 'mdi:signal-cellular-2';
        else if (level >= 25) icon = 'mdi:signal-cellular-1';
        else icon = 'mdi:signal-cellular-outline';
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<ha-icon .icon="${icon}"></ha-icon>`;
    }
    _getDeviceNameForEntities(entityIds) {
        const entities = this._hass.entities || {};
        const devices = this._hass.devices || {};
        for (const eid of entityIds){
            const devId = entities[eid]?.device_id;
            if (devId) {
                const dev = devices[devId];
                if (dev) return dev.name_by_user || dev.name || null;
            }
        }
        return null;
    }
    _fireMoreInfo(entityId) {
        if (!entityId) return;
        this.dispatchEvent(new CustomEvent('hass-more-info', {
            bubbles: true,
            composed: true,
            detail: {
                entityId: entityId
            }
        }));
    }
    _navigateHistory(entityId) {
        if (!entityId) return;
        history.pushState(null, '', `/history?entity_id=${entityId}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }
    _getFirstDeviceId() {
        const deviceIds = this._entities?.deviceIds;
        if (deviceIds && deviceIds.size > 0) return deviceIds.values().next().value;
        return null;
    }
    _navigateToDevice() {
        const deviceId = this._getFirstDeviceId();
        if (!deviceId) return;
        const path = `/config/devices/device/${deviceId}`;
        history.pushState(null, "", path);
        window.dispatchEvent(new CustomEvent("location-changed", {
            detail: {
                replace: false
            }
        }));
    }
    // ==========================================================
    // RENDER
    // ==========================================================
    render() {
        const hass = this._hass;
        const config = this.config;
        if (!hass || !config || !this._entities) {
            if (hass && config) this._entities = this._findEntities(hass);
            if (!this._entities) return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<ha-card><div class="unavailable">${this._t("config_no_device")}</div></ha-card>`;
        }
        // Show warning if no supported backend detected
        if (!this._backend) return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
        <ha-card>
          <div class="unavailable">
            <div class="version-warning">
              <strong>${this._t("version_required_title")}</strong><br>
              ${this._t("version_required_message")}
            </div>
          </div>
        </ha-card>
      `;
        const sections = this.config.sections || [
            'mower',
            'valves',
            'socket',
            'history'
        ];
        const hasValves = sections.includes('valves') && this._getVisibleValves().length > 0;
        const hasSockets = sections.includes('socket') && this._getVisibleSockets().length > 0;
        const hasMowers = sections.includes('mower') && this._getVisibleMowers().length > 0;
        const showHistory = sections.includes('history') && this.config.show_history !== false && (hasValves || hasSockets || this.config.sections?.includes('history'));
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <ha-card class="${this.config.show_header === false ? 'no-header' : ''}${this.config.sections?.length === 1 ? ' single-section' : ''}" @click="${()=>this._closePillPopups()}">
        ${this.config.show_header !== false ? this._renderHeader() : ''}
        <div class="content">
          ${this._isPatchedIntegration === false ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <div class="patch-warning">
              <strong>${this._t("patch_warning_title")}</strong>
              ${this._t("patch_warning_message")}
            </div>
          ` : ''}
          ${this._renderScheduleMissingBanner()}
          ${hasMowers ? this._renderMowerSection() : ''}
          ${hasValves ? this._renderValvesSection() : ''}
          ${hasSockets ? this._renderSocketSection() : ''}
          ${showHistory ? this._renderHistorySection() : ''}
        </div>
      </ha-card>
    `;
    }
    // ---------- Schedule missing banner ----------
    _renderScheduleMissingBanner() {
        if (this.config?.show_schedules === false) return '';
        // Check if any gardena_smart_schedule entity exists (integration installed)
        const entities = this._hass.entities || {};
        const hasScheduleIntegration = Object.values(entities).some((e)=>e.platform === 'gardena_smart_schedule');
        if (hasScheduleIntegration) return '';
        // Also skip if the main integration provides schedules natively (patched fork)
        const allEntityIds = [
            ...this._entities?.valves || [],
            ...this._entities?.sockets || [],
            ...this._entities?.mowers || []
        ];
        const hasNativeSchedules = allEntityIds.some((eid)=>{
            const st = this._hass.states[eid];
            return st?.attributes?.scheduled_events?.length > 0;
        });
        if (hasNativeSchedules) return '';
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="schedule-missing">
        <strong>${this._t('schedule_missing_title')}</strong>
        ${this._t('schedule_missing_message')}
      </div>
    `;
    }
    // ---------- Header ----------
    _isGlobalOnline() {
        const connections = this._entities?.deviceConnections || {};
        const connIds = Object.values(connections);
        if (connIds.length > 0) return connIds.some((eid)=>this._hass.states[eid]?.state === 'on');
        // Fallback: check if any main entity is available
        const allEntityIds = [
            ...this._entities?.valves || [],
            ...this._entities?.sockets || [],
            ...this._entities?.mowers || []
        ];
        return allEntityIds.some((eid)=>{
            const s = this._hass.states[eid]?.state;
            return s && s !== 'unavailable';
        });
    }
    _getSingleSectionEntities() {
        const sections = this.config.sections;
        if (!sections || sections.length !== 1) return null;
        const s = sections[0];
        if (s === 'mower') return this._getVisibleMowers();
        if (s === 'valves') return this._getVisibleValves();
        if (s === 'socket') return this._getVisibleSockets();
        return null;
    }
    _getSingleSectionTitle() {
        const sections = this.config.sections;
        if (!sections || sections.length !== 1) return null;
        const s = sections[0];
        const entitiesMap = {
            mower: this._getVisibleMowers(),
            valves: this._getVisibleValves(),
            socket: this._getVisibleSockets()
        };
        const entities = entitiesMap[s];
        if (!entities?.length) return this._t(`section_${s === 'socket' ? 'socket' : s === 'mower' ? 'mower' : 'valves'}`);
        const deviceName = this._getDeviceNameForEntities(entities);
        const sectionLabel = this._t(s === 'mower' ? 'section_mower' : s === 'valves' ? 'section_valves' : 'section_socket');
        return deviceName ? `${deviceName} \u{2013} ${sectionLabel}` : sectionLabel;
    }
    _renderHeader() {
        const isSingle = this.config.sections?.length === 1;
        const name = this.config.title || (isSingle ? this._getSingleSectionTitle() : null) || this._t("default_title");
        const wsOnline = this._isGlobalOnline();
        // For single-section sub-cards, show signal strength instead of connection icon
        const singleEntities = isSingle ? this._getSingleSectionEntities() : null;
        const rfLink = singleEntities ? this._getMinRfLink(singleEntities) : null;
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="card-header">
        <div class="header-title">${name}</div>
        <div class="header-right">
          ${rfLink != null ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="section-signal" @click="${()=>this._fireMoreInfo(this._getConnectionEntityForDevices(singleEntities))}">${this._renderSignalBars(rfLink)}</span>` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="ws-icon ${wsOnline ? 'online' : 'offline'}" title="${wsOnline ? this._t('ws_connected') : this._t('ws_disconnected')}"
                @click="${()=>this._fireMoreInfo(this._entities?.connection)}">
                ${wsOnline ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<svg viewBox="0 0 24 24"><path d="M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M3,13V18L3,20H10V18H5V13H3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M14,15H20V19H14V15Z"/></svg>` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<svg viewBox="0 0 24 24"><path d="M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M3.88,13.46L2.46,14.88L4.59,17L2.46,19.12L3.88,20.54L6,18.41L8.12,20.54L9.54,19.12L7.41,17L9.54,14.88L8.12,13.46L6,15.59L3.88,13.46M14,15H20V19H14V15Z"/></svg>`}
              </span>`}
          <span class="header-menu" @click="${()=>this._navigateToDevice()}">
            <svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </span>
        </div>
      </div>
    `;
    }
    // ---------- Knob Duration Control ----------
    _renderKnobSection() {
        const dur = this._selectedDuration;
        const angle = (dur - $c181edec8277de1e$var$KNOB_MIN) / ($c181edec8277de1e$var$KNOB_MAX - $c181edec8277de1e$var$KNOB_MIN) * $c181edec8277de1e$var$KNOB_ARC_SWEEP;
        const fraction = angle / $c181edec8277de1e$var$KNOB_ARC_SWEEP;
        const fillLength = fraction * $c181edec8277de1e$var$KNOB_ARC_LENGTH;
        const gapLength = $c181edec8277de1e$var$KNOB_CIRCUMFERENCE - $c181edec8277de1e$var$KNOB_ARC_LENGTH;
        // Handle position as percentage of 140x140 viewbox
        const handleAngle = $c181edec8277de1e$var$KNOB_ARC_START + angle;
        const rad = handleAngle * Math.PI / 180;
        const hx = $c181edec8277de1e$var$KNOB_CX + $c181edec8277de1e$var$KNOB_RADIUS * Math.cos(rad);
        const hy = $c181edec8277de1e$var$KNOB_CY + $c181edec8277de1e$var$KNOB_RADIUS * Math.sin(rad);
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="knob-section">
        <div class="knob-container" @click="${this._onKnobClick}">
          <div class="knob-track">
            <svg viewBox="0 0 140 140">
              <circle class="knob-arc-bg" cx="70" cy="70" r="58"
                stroke-dasharray="${$c181edec8277de1e$var$KNOB_ARC_LENGTH} ${gapLength}"
                stroke-dashoffset="0"
                transform="rotate(135 70 70)"/>
              <circle class="knob-arc-fill" cx="70" cy="70" r="58"
                stroke-dasharray="${fillLength} ${$c181edec8277de1e$var$KNOB_CIRCUMFERENCE}"
                stroke-dashoffset="0"
                transform="rotate(135 70 70)"/>
            </svg>
          </div>
          <div class="knob-handle"
            style="left:${hx / 140 * 100}%;top:${hy / 140 * 100}%"
            @mousedown="${this._onKnobDragStart}"
            @touchstart="${this._onKnobDragStart}">
          </div>
          <div class="knob-center">
            <div class="knob-value">${dur}</div>
            <div class="knob-unit">${this._t('knob_unit_minutes')}</div>
          </div>
        </div>
        <div class="knob-info">
          ${$c181edec8277de1e$var$KNOB_PRESETS.map((min)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <button class="knob-preset ${dur === min ? 'active' : ''}"
              @click="${(e)=>{
                e.stopPropagation();
                this._selectedDuration = min;
            }}">
              <span class="knob-preset-dot"></span> ${min} min
            </button>
          `)}
        </div>
      </div>
    `;
    }
    // ---------- Knob drag logic ----------
    _onKnobDragStart(e) {
        e.preventDefault();
        e.stopPropagation();
        this._isDragging = true;
        this._boundDrag = this._onKnobDrag.bind(this);
        this._boundDragEnd = this._onKnobDragEnd.bind(this);
        document.addEventListener('mousemove', this._boundDrag);
        document.addEventListener('mouseup', this._boundDragEnd);
        document.addEventListener('touchmove', this._boundDrag, {
            passive: false
        });
        document.addEventListener('touchend', this._boundDragEnd);
    }
    _onKnobDrag(e) {
        if (!this._isDragging) return;
        e.preventDefault();
        const angle = this._getAngleFromEvent(e);
        const t = Math.max(0, Math.min(1, angle / $c181edec8277de1e$var$KNOB_ARC_SWEEP));
        this._selectedDuration = Math.round(($c181edec8277de1e$var$KNOB_MIN + t * ($c181edec8277de1e$var$KNOB_MAX - $c181edec8277de1e$var$KNOB_MIN)) / 5) * 5;
    }
    _onKnobDragEnd() {
        this._isDragging = false;
        document.removeEventListener('mousemove', this._boundDrag);
        document.removeEventListener('mouseup', this._boundDragEnd);
        document.removeEventListener('touchmove', this._boundDrag);
        document.removeEventListener('touchend', this._boundDragEnd);
    }
    _onKnobClick(e) {
        if (e.target.closest('.knob-handle') || e.target.closest('.knob-preset')) return;
        const angle = this._getAngleFromEvent(e);
        if (angle < 0) return;
        const t = Math.max(0, Math.min(1, angle / $c181edec8277de1e$var$KNOB_ARC_SWEEP));
        this._selectedDuration = Math.round(($c181edec8277de1e$var$KNOB_MIN + t * ($c181edec8277de1e$var$KNOB_MAX - $c181edec8277de1e$var$KNOB_MIN)) / 5) * 5;
    }
    _getAngleFromEvent(e) {
        const container = this.shadowRoot.querySelector('.knob-container');
        if (!container) return -1;
        const rect = container.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        let angle = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
        angle = (angle - $c181edec8277de1e$var$KNOB_ARC_START + 360) % 360;
        if (angle > $c181edec8277de1e$var$KNOB_ARC_SWEEP + 20) angle = 0;
        if (angle > $c181edec8277de1e$var$KNOB_ARC_SWEEP) angle = $c181edec8277de1e$var$KNOB_ARC_SWEEP;
        return angle;
    }
    // ---------- Pill Track Duration Helpers ----------
    static PILL_DURATIONS = [
        5,
        10,
        15,
        20,
        30,
        45,
        60,
        90
    ];
    static MOWER_DURATIONS = [
        30,
        60,
        120,
        180,
        360
    ];
    _getEntityDuration(entityId) {
        if (this._entityDurations[entityId]) return this._entityDurations[entityId];
        // Mowers default to 60min, valves/sockets to config default
        const entity = (this._hass?.entities || {})[entityId];
        if (entity && entityId.startsWith('lawn_mower.')) return 60;
        return this._selectedDuration;
    }
    _formatDurationLabel(minutes) {
        if (minutes >= 60 && minutes % 60 === 0) return `${minutes / 60}h`;
        return `${minutes}m`;
    }
    _setEntityDuration(entityId, minutes) {
        this._entityDurations[entityId] = minutes;
        this._openPillPopup = null;
        this.requestUpdate();
    }
    _togglePillPopup(entityId, e) {
        e.stopPropagation();
        this._openPillPopup = this._openPillPopup === entityId ? null : entityId;
        this.requestUpdate();
    }
    _closePillPopups() {
        if (this._openPillPopup) {
            this._openPillPopup = null;
            this.requestUpdate();
        }
    }
    _renderPill(entityId, isActive, isDisabled, onToggle, amberToggle = false) {
        const dur = this._getEntityDuration(entityId);
        const isOpen = this._openPillPopup === entityId;
        const isCustom = !$c181edec8277de1e$export$4db43f2ac07d900b.PILL_DURATIONS.includes(dur);
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="pill">
        <div class="pill-dur-wrap">
          <div class="pill-dur ${isOpen ? 'open' : ''} ${isActive ? 'locked' : ''}"
            @click="${(e)=>{
            e.stopPropagation();
            if (!isActive) this._togglePillPopup(entityId, e);
        }}">
            <span>${dur}m</span>
            ${isActive ? '' : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>`}
          </div>
          <div class="pill-pop ${isOpen ? 'show' : ''}" @click="${(e)=>e.stopPropagation()}">
            ${$c181edec8277de1e$export$4db43f2ac07d900b.PILL_DURATIONS.map((d)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
              <span class="pop-chip ${d === dur ? 'sel' : ''}"
                @click="${(e)=>{
                e.stopPropagation();
                this._setEntityDuration(entityId, d);
            }}">${d}m</span>
            `)}
            <div class="pop-custom">
              <input class="pop-input" type="number" min="1" max="90" placeholder="z.B. 25"
                .value="${isCustom ? String(dur) : ''}"
                @click="${(e)=>e.stopPropagation()}"
                @keydown="${(e)=>{
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                const v = Math.max(1, Math.min(90, parseInt(e.target.value)));
                if (v) this._setEntityDuration(entityId, v);
            }
        }}"
              />
              <span class="pop-input-unit">min</span>
              <button class="pop-ok" @click="${(e)=>{
            e.stopPropagation();
            const inp = e.target.closest('.pop-custom').querySelector('input');
            const v = Math.max(1, Math.min(90, parseInt(inp.value)));
            if (v) this._setEntityDuration(entityId, v);
        }}">OK</button>
            </div>
          </div>
        </div>
        <div class="pill-tog ${isActive ? 'on' : ''} ${amberToggle && isActive ? 'amber' : ''} ${isDisabled ? 'disabled' : ''}"
          @click="${()=>!isDisabled && onToggle()}"></div>
      </div>
    `;
    }
    // ---------- Valves Section ----------
    _getVisibleValves() {
        const allValves = this._entities?.valves || [];
        const configured = this.config?.valve_entities;
        if (!configured || configured.length === 0) return allValves;
        return configured.filter((id)=>allValves.includes(id));
    }
    _renderValvesSection() {
        const valves = this._getVisibleValves();
        if (valves.length === 0) return '';
        const status = this._getDeviceOnlineStatus(valves);
        const rfLink = this._getMinRfLink(valves);
        const deviceName = this._getDeviceNameForEntities(valves);
        const isSingle = this.config.sections?.length === 1;
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="valves-section">
        ${!isSingle ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="section-label">
          ${deviceName ? `${deviceName} \u{2013} ` : ''}${this._t('section_valves')}
          ${rfLink != null ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="section-signal" @click="${()=>this._fireMoreInfo(this._getConnectionEntityForDevices(valves))}">${this._renderSignalBars(rfLink)}</span>` : status ? this._renderConnectionIcon(status, valves) : ''}
        </div>` : ''}
        <div class="valves-grid count-${Math.min(valves.length, this.config?.valve_columns || 3)}">
          ${valves.map((entityId, i)=>this._renderValve(entityId, i, status === 'offline'))}
        </div>
      </div>
    `;
    }
    _renderValve(entityId, index, isOffline = false) {
        const state = this._hass.states[entityId];
        if (!state) return '';
        const isActive = state.state === 'open';
        const shortName = this._entityNameWithoutDevice(entityId, `Valve ${index + 1}`);
        const zoneLabel = `${this._t('valve_zone')} ${index + 1}`;
        const { remaining: remaining, total: total } = this._getValveRemaining(entityId, state);
        const pct = isActive && total > 0 && remaining > 0 ? Math.round(remaining / total * 100) : 0;
        const scheduleEvents = this._getScheduleEvents(entityId);
        const isSchedulePaused = scheduleEvents.some((ev)=>ev.paused === true);
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="valve ${isActive ? 'active' : ''} ${isOffline ? 'offline' : ''} ${isSchedulePaused ? 'schedule-paused' : ''} ${this._openPillPopup === entityId ? 'pill-open' : ''}" style="animation-delay:${index * 0.05 + 0.05}s">
        <div class="valve-header">
          <span class="valve-zone-label">${zoneLabel}</span>
          ${this._renderPill(entityId, isActive, isOffline && !isActive || this._isPatchedIntegration === false, ()=>this._toggleValve(entityId, isActive))}
        </div>
        <div class="valve-name" @click="${()=>this._fireMoreInfo(entityId)}">${shortName}</div>
        <div class="valve-status">
          ${isOffline && !isActive ? this._t('state_offline') : this._getValveStatusText(entityId, state, remaining)}
        </div>
        <div class="valve-progress">
          ${isActive ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="valve-progress-fill" style="width:${pct}%"></div>` : ''}
        </div>
        ${this._renderValveScheduleMini(entityId)}
      </div>
    `;
    }
    async _toggleValve(entityId, isActive) {
        const gardenaId = this._getGardenaDeviceId(entityId);
        const state = this._hass.states[entityId];
        const serviceId = state?.attributes?.service_id;
        if (isActive) {
            await this._backend.closeValve(this._hass, {
                entityId: entityId,
                gardenaDeviceId: gardenaId,
                serviceId: serviceId
            });
            delete this._valveTimers[entityId];
        } else {
            const durationSec = this._getEntityDuration(entityId) * 60;
            await this._backend.openValve(this._hass, {
                entityId: entityId,
                gardenaDeviceId: gardenaId,
                serviceId: serviceId,
                durationSec: durationSec
            });
            this._valveTimers[entityId] = {
                startTime: new Date(),
                durationSec: durationSec
            };
        }
        $c181edec8277de1e$var$_saveTimers();
    }
    // ---------- Socket Section ----------
    _getVisibleSockets() {
        const allSockets = this._entities?.sockets || [];
        const configured = this.config?.socket_entities;
        if (configured === undefined) return allSockets;
        return configured.filter((id)=>allSockets.includes(id));
    }
    // ---------- Mower Section ----------
    _getVisibleMowers() {
        const allMowers = this._entities?.mowers || [];
        const configured = this.config?.mower_entities;
        if (configured === undefined) return allMowers;
        return configured.filter((id)=>allMowers.includes(id));
    }
    _getMowerInfo(state) {
        if (this._backend) {
            const entityId = state.entity_id;
            const deviceId = (this._hass.entities || {})[entityId]?.device_id;
            return this._backend.getMowerInfo(this._hass, state, {
                entities: this._entities,
                deviceId: deviceId
            });
        }
        return {
            haState: state.state,
            activity: state.attributes.activity,
            battery: state.attributes.battery_level,
            batteryState: state.attributes.battery_state,
            opHours: state.attributes.operating_hours,
            lastError: state.attributes.last_error_code,
            deviceState: state.attributes.state
        };
    }
    _getBatteryIconPath(level, charging) {
        const bolt = 'M23,11H20V4L15,14H18V22';
        const shell = 'M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z';
        if (charging) {
            if (level >= 95) return `${bolt}${shell}`;
            if (level >= 85) return `${bolt}M12,8H4V6H12${shell}`;
            if (level >= 75) return `${bolt}M12,9H4V6H12${shell}`;
            if (level >= 55) return `${bolt}M12,11H4V6H12${shell}`;
            if (level >= 35) return `M13,4H11V2H5V4H3C2.4,4 2,4.4 2,5V21C2,21.6 2.4,22 3,22H13C13.6,22 14,21.6 14,21V5C14,4.4 13.6,4 13,4M12,14.5H4V6H12V14.5${bolt}`;
            return `${bolt}M12.05,17H4.05V6H12.05M12.72,4H11.05V2H5.05V4H3.38A1.33,1.33 0 0,0 2.05,5.33V20.67C2.05,21.4 2.65,22 3.38,22H12.72C13.45,22 14.05,21.4 14.05,20.67V5.33A1.33,1.33 0 0,0 12.72,4Z`;
        }
        if (level >= 95) return 'M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
        if (level >= 85) return 'M16,8H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
        if (level >= 75) return 'M16,9H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
        if (level >= 65) return 'M16,10H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
        if (level >= 55) return 'M16,12H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
        if (level >= 45) return 'M16,13H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
        if (level >= 35) return 'M16,14H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
        if (level >= 25) return 'M16,15H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
        if (level >= 15) return 'M16,17H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
        if (level >= 5) return 'M16,18H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
        return 'M14,20H6V6H14M14.67,4H13V2H7V4H5.33C4.6,4 4,4.6 4,5.33V20.67C4,21.4 4.6,22 5.33,22H14.67C15.4,22 16,21.4 16,20.67V5.33C16,4.6 15.4,4 14.67,4M21,7H19V13H21V8M21,15H19V17H21V15Z';
    }
    _getMowerActions(haState) {
        if (this._backend) return this._backend.getMowerActions(haState);
        switch(haState){
            case 'docked':
                return [
                    {
                        key: 'mower_start',
                        action: 'start_override',
                        primary: true,
                        showDuration: true
                    },
                    {
                        key: 'mower_resume_schedule',
                        action: 'start_automatic'
                    }
                ];
            case 'mowing':
                return [
                    {
                        key: 'mower_pause',
                        action: 'pause',
                        primary: true
                    },
                    {
                        key: 'mower_park_next',
                        action: 'park_until_next_task'
                    },
                    {
                        key: 'mower_park',
                        action: 'park_until_further_notice'
                    }
                ];
            case 'paused':
                return [
                    {
                        key: 'mower_resume',
                        action: 'resume',
                        primary: true
                    },
                    {
                        key: 'mower_park_next',
                        action: 'park_until_next_task'
                    },
                    {
                        key: 'mower_park',
                        action: 'park_until_further_notice'
                    }
                ];
            default:
                return [
                    {
                        key: 'mower_start',
                        action: 'start_override',
                        primary: true,
                        showDuration: true
                    },
                    {
                        key: 'mower_park',
                        action: 'park_until_further_notice'
                    }
                ];
        }
    }
    _renderMowerSection() {
        const mowers = this._getVisibleMowers();
        if (mowers.length === 0) return '';
        const status = this._getDeviceOnlineStatus(mowers);
        const rfLink = this._getMinRfLink(mowers);
        const isSingle = this.config.sections?.length === 1;
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="mower-section">
        ${!isSingle ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="section-label">
          ${this._t('section_mower')}
          ${rfLink != null ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="section-signal" @click="${()=>this._fireMoreInfo(this._getConnectionEntityForDevices(mowers))}">${this._renderSignalBars(rfLink)}</span>` : status ? this._renderConnectionIcon(status, mowers) : ''}
        </div>` : ''}
        ${mowers.map((entityId)=>this._renderMower(entityId, status === 'offline'))}
      </div>
    `;
    }
    _getMowerRemaining(entityId, info) {
        const timer = this._valveTimers[entityId];
        if (timer && info.haState === 'mowing') {
            const elapsed = (this._now.getTime() - timer.startTime.getTime()) / 1000;
            const remaining = Math.max(0, timer.durationSec - elapsed);
            return {
                remaining: remaining,
                total: timer.durationSec
            };
        }
        // Fall back to schedule-based timer
        const state = this._hass.states[entityId];
        if (state && info.haState === 'mowing') {
            const scheduleTimer = this._getScheduleRemaining(entityId, state);
            if (scheduleTimer) return scheduleTimer;
        }
        return {
            remaining: 0,
            total: 0
        };
    }
    _renderMower(entityId, isOffline = false) {
        const state = this._hass.states[entityId];
        if (!state) return '';
        const info = this._getMowerInfo(state);
        const shortName = this._shortEntityName(state, this._t('section_mower'));
        const activityKey = $c181edec8277de1e$var$MOWER_ACTIVITY_MAP[info.activity] || `mower_${info.haState}`;
        const activityText = this._t(activityKey);
        const actions = this._getMowerActions(info.haState);
        const isMowing = info.haState === 'mowing';
        const stateClass = isMowing ? 'active' : info.haState === 'error' ? 'error' : info.haState === 'paused' ? 'paused' : 'docked';
        const { remaining: remaining, total: total } = this._getMowerRemaining(entityId, info);
        const pct = isMowing && total > 0 && remaining > 0 ? Math.round(remaining / total * 100) : 0;
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="mower-card ${stateClass} ${isOffline ? 'offline' : ''} ${this._openPillPopup === entityId ? 'pill-open' : ''}">
        <div class="mower-header">
          <div class="mower-icon ${isMowing ? 'mowing' : ''}">
            <span class="mower-drive">
              <svg viewBox="0 0 24 24"><path d="M1 14C1 16.76 3.24 19 6 19C7.64 19 9.09 18.21 10 17H15.17C15.58 18.17 16.7 19 18 19C19.31 19 20.42 18.17 20.83 17H23V15C23 9.5 18.5 5 13 5H1V14M21 15H10.9C10.97 14.68 11 14.34 11 14C11 11.24 8.76 9 6 9C4.87 9 3.84 9.37 3 10V7H12.5C15.1 7 17.42 8.16 19 10H15V12H20.25C20.67 12.92 20.92 13.94 21 15M6 11C7.66 11 9 12.34 9 14C9 15.66 7.66 17 6 17C4.34 17 3 15.66 3 14C3 12.34 4.34 11 6 11Z"/></svg>
              ${isMowing ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="grass-particles"></span>` : ''}
            </span>
          </div>
          <div class="mower-info">
            <div class="mower-name" @click="${()=>this._fireMoreInfo(entityId)}">${shortName}</div>
            <div class="mower-activity">
              ${isMowing ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="mow-dot"></span>` : ''}
              ${activityText}
              ${isMowing && remaining > 0 ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="mower-remaining">${this._formatTime(remaining)}</span>` : ''}
            </div>
          </div>
          ${info.battery != null ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <div class="mower-battery-chip ${info.batteryState === 'REPLACE_NOW' ? 'replace' : info.batteryState === 'LOW' || info.battery < 20 ? 'low' : ''} ${info.batteryState === 'CHARGING' ? 'charging' : ''}"
              @click="${()=>{
            const devId = (this._hass.entities || {})[entityId]?.device_id;
            const batId = devId && this._entities?.deviceBatteries?.[devId];
            this._fireMoreInfo(batId || entityId);
        }}" style="cursor:pointer">
              <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="${this._getBatteryIconPath(info.battery, info.batteryState === 'CHARGING')}"/></svg>
              <span>${info.battery}%</span>
            </div>
          ` : ''}
        </div>

        ${isMowing && pct > 0 ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
          <div class="mower-progress">
            <div class="mower-progress-fill" style="width:${pct}%"></div>
          </div>
        ` : ''}

        ${info.haState === 'error' && info.lastError ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
          <div class="mower-error-banner">
            ${this._t('mower_error_prefix')}: ${$c181edec8277de1e$var$MOWER_ERROR_MAP[info.lastError] ? this._t($c181edec8277de1e$var$MOWER_ERROR_MAP[info.lastError]) : info.lastError}
          </div>
        ` : ''}

        <div class="mower-actions">
          ${actions.map((a)=>a.showDuration && this._isPatchedIntegration !== false ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <div class="mower-btn-wrap" style="position:relative">
              <button class="mower-btn ${a.primary ? 'primary' : ''}"
                @click="${()=>this._callMowerAction(entityId, a.action)}"
                ?disabled="${isOffline || this._isPatchedIntegration === false}">
                ${this._t(a.key)}
              </button>
              <div class="mower-dur-wrap">
                <div class="mower-dur-btn ${this._openPillPopup === entityId ? 'open' : ''}"
                  @click="${(e)=>{
                e.stopPropagation();
                if (!isOffline && this._isPatchedIntegration !== false) this._togglePillPopup(entityId, e);
            }}">
                  ${this._formatDurationLabel(this._getEntityDuration(entityId))}
                  <svg viewBox="0 0 24 24" width="10" height="10"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
                </div>
                <div class="pill-pop ${this._openPillPopup === entityId ? 'show' : ''}" @click="${(e)=>e.stopPropagation()}">
                  ${$c181edec8277de1e$export$4db43f2ac07d900b.MOWER_DURATIONS.map((d)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                    <span class="pop-chip ${d === this._getEntityDuration(entityId) ? 'sel' : ''}"
                      @click="${(e)=>{
                    e.stopPropagation();
                    this._setEntityDuration(entityId, d);
                }}">${this._formatDurationLabel(d)}</span>
                  `)}
                  <div class="pop-custom">
                    <input class="pop-input" type="number" min="1" max="360" placeholder="z.B. 25"
                      .value="${!$c181edec8277de1e$export$4db43f2ac07d900b.MOWER_DURATIONS.includes(this._getEntityDuration(entityId)) ? String(this._getEntityDuration(entityId)) : ''}"
                      @click="${(e)=>e.stopPropagation()}"
                      @keydown="${(e)=>{
                if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    const v = Math.max(1, Math.min(360, parseInt(e.target.value)));
                    if (v) this._setEntityDuration(entityId, v);
                }
            }}"
                    />
                    <span class="pop-input-unit">min</span>
                    <button class="pop-ok" @click="${(e)=>{
                e.stopPropagation();
                const inp = e.target.closest('.pop-custom').querySelector('input');
                const v = Math.max(1, Math.min(360, parseInt(inp.value)));
                if (v) this._setEntityDuration(entityId, v);
            }}">OK</button>
                  </div>
                </div>
              </div>
            </div>
          ` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <button class="mower-btn ${a.primary ? 'primary' : ''}"
              @click="${()=>this._isPatchedIntegration !== false && this._callMowerAction(entityId, a.action)}"
              ?disabled="${isOffline || this._isPatchedIntegration === false}">
              ${this._t(a.key)}
            </button>
          `)}
        </div>
        ${this._renderScheduleStrip(entityId)}
      </div>
    `;
    }
    async _callMowerAction(entityId, action) {
        const durationSec = this._getEntityDuration(entityId) * 60;
        const startedTimer = await this._backend.callMowerAction(this._hass, entityId, action, durationSec);
        if (startedTimer) {
            this._valveTimers[entityId] = {
                startTime: new Date(),
                durationSec: durationSec
            };
            $c181edec8277de1e$var$_saveTimers();
        }
    }
    // ---------- Schedule Helpers ----------
    static SCHEDULE_WEEKDAYS = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
    ];
    static SCHEDULE_DAY_KEYS = [
        'schedule_day_mo',
        'schedule_day_tu',
        'schedule_day_we',
        'schedule_day_th',
        'schedule_day_fr',
        'schedule_day_sa',
        'schedule_day_su'
    ];
    // ---------- Activity Helpers ----------
    /** Resolve activity for any entity: attribute first, then device sensor fallback */ _getEntityActivity(entityId, state) {
        const activity = state?.attributes?.activity;
        if (activity) return activity;
        const entityReg = (this._hass.entities || {})[entityId];
        const devId = entityReg?.device_id;
        if (!devId) return null;
        // Mower activity sensor
        const mowerActId = this._entities?.deviceMowerActivities?.[devId];
        if (mowerActId) {
            const s = this._hass.states[mowerActId];
            if (s?.state && s.state !== 'unknown' && s.state !== 'unavailable') return s.state;
        }
        return null;
    }
    _getValveStatusText(entityId, state, remaining) {
        const activity = state.attributes?.activity;
        if (state.state === 'open') {
            const timeText = this._formatTime(remaining);
            let label = this._t('valve_watering');
            if (activity === 'SCHEDULED_WATERING') label = this._t('valve_watering_scheduled');
            else if (activity === 'MANUAL_WATERING') label = this._t('valve_watering_manual');
            else if (!activity) {
                // Infer from schedule events if activity is not available (kayloehmann)
                const scheduleTimer = this._getScheduleRemaining(entityId, state);
                if (scheduleTimer) label = this._t('valve_watering_scheduled');
                else label = this._t('valve_watering_manual');
            }
            return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="water-icon"></span><span class="countdown-text">${label}${timeText ? ` ${timeText}` : ''}</span>`;
        }
        return this._t('valve_ready');
    }
    _getSocketStatusText(entityId, state, remaining) {
        const activity = state.attributes?.activity;
        if (state.state === 'on') {
            const timeText = this._formatTime(remaining);
            let label = this._t('socket_active');
            if (activity === 'SCHEDULED_ON') label = this._t('socket_active_scheduled');
            else if (activity === 'FOREVER_ON') label = this._t('socket_active_manual');
            else if (activity === 'TIME_LIMITED_ON') label = this._t('socket_active_timed');
            else if (!activity) {
                // Infer from schedule events if activity is not available (kayloehmann)
                const scheduleTimer = this._getScheduleRemaining(entityId, state);
                if (scheduleTimer) label = this._t('socket_active_scheduled');
                else label = this._t('socket_active_manual');
            }
            return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="countdown-text">${label}${timeText ? ` ${timeText}` : ''}</span>`;
        }
        return this._t('socket_off');
    }
    _isScheduleActive(ev, entityId) {
        const state = this._hass.states[entityId];
        if (!state) return false;
        const activity = this._getEntityActivity(entityId, state);
        const haState = state.state;
        const isScheduled = activity === 'SCHEDULED_WATERING' || activity === 'SCHEDULED_ON' || haState === 'mowing' && (activity === 'OK_CUTTING' || activity === 'OK_CUTTING_TIMER_OVERRIDDEN');
        if (!isScheduled) return false;
        const now = this._now;
        const dayMap = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday'
        ];
        const today = dayMap[now.getDay()];
        if (!(ev.weekdays || []).includes(today)) return false;
        const startRaw = ev.start_at || '';
        const endRaw = ev.end_at || '';
        if (startRaw.startsWith('SR') || startRaw.startsWith('SS') || endRaw.startsWith('SR') || endRaw.startsWith('SS')) return true;
        const nowMins = now.getHours() * 60 + now.getMinutes();
        const [sh, sm] = (startRaw.startsWith('MN+') ? startRaw.substring(3) : startRaw).split(':').map(Number);
        const [eh, em] = (endRaw.startsWith('MN+') ? endRaw.substring(3) : endRaw).split(':').map(Number);
        if (isNaN(sh) || isNaN(eh)) return true;
        const startMins = sh * 60 + (sm || 0);
        const endMins = eh * 60 + (em || 0);
        if (endMins <= startMins) // Midnight crossing (e.g. 22:45 – 00:00)
        return nowMins >= startMins || nowMins <= endMins;
        return nowMins >= startMins && nowMins <= endMins;
    }
    _scheduleIcon(isPaused = false, isActive = false) {
        const tooltip = isPaused ? this._t('schedule_tooltip_paused') : isActive ? this._t('schedule_tooltip_active') : this._t('schedule_tooltip');
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="schedule-icon-wrap"><svg class="schedule-icon" viewBox="0 0 24 24"><title>${tooltip}</title><path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/></svg></span>`;
    }
    _getScheduleEvents(entityId) {
        if (this.config?.show_schedules === false) return [];
        const state = this._hass.states[entityId];
        // Primary: check main entity attributes (patched integration / fork)
        const mainEvents = state?.attributes?.scheduled_events;
        if (mainEvents && mainEvents.length > 0) return mainEvents;
        // Fallback: look for gardena_smart_schedule sensor on the same device
        return this._getScheduleEventsFromScheduleIntegration(entityId);
    }
    _getScheduleEventsFromScheduleIntegration(entityId) {
        if (!this._hass) return [];
        // Get the Gardena device ID for this entity
        const gardenaDeviceId = this._getGardenaDeviceId(entityId);
        if (!gardenaDeviceId) return [];
        // For valve entities, extract the valve index
        const valveIdx = this._getValveIndex(entityId);
        // Find all gardena_smart_schedule sensors matching this Gardena device ID
        const entities = this._hass.entities || {};
        const candidates = [];
        for (const eid of Object.keys(entities)){
            if (!eid.startsWith('sensor.')) continue;
            const e = entities[eid];
            if (e.platform !== 'gardena_smart_schedule') continue;
            const st = this._hass.states[eid];
            if (st?.attributes?.scheduled_events && (st.attributes.gardena_device_id === gardenaDeviceId || st.attributes.gardena_serial === gardenaDeviceId)) candidates.push(st);
        }
        if (candidates.length === 0) return [];
        // For valve entities, always match by valve_id
        if (valveIdx !== null) {
            const match = candidates.find((st)=>st.attributes.valve_id === valveIdx);
            return match ? match.attributes.scheduled_events : [];
        }
        // Non-valve entities (mower, socket): return first match
        if (candidates.length === 1) return candidates[0].attributes.scheduled_events;
        // Multiple candidates without valve context — return the one without valve_id
        const noValve = candidates.find((st)=>st.attributes.valve_id == null);
        return noValve ? noValve.attributes.scheduled_events : candidates[0].attributes.scheduled_events;
    }
    _getValveIndex(entityId) {
        if (!entityId.startsWith('valve.')) return null;
        const entities = this._hass.entities;
        if (!entities) return null;
        const sourceEntity = entities[entityId];
        if (!sourceEntity?.device_id) return null;
        // Find all valve entities on the same device, sorted by entity_id
        const deviceId = sourceEntity.device_id;
        const valveEntities = Object.keys(entities).filter((eid)=>eid.startsWith('valve.') && entities[eid]?.device_id === deviceId).sort();
        const idx = valveEntities.indexOf(entityId);
        // Return 1-based index to match schedule API valve_id
        return idx >= 0 ? idx + 1 : null;
    }
    _renderScheduleStrip(entityId) {
        const events = this._getScheduleEvents(entityId);
        if (events.length === 0) return '';
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="schedule-strip">
        ${events.map((ev)=>{
            const isPaused = ev.paused === true;
            const weekdays = ev.weekdays || [];
            const nowActive = this._isScheduleActive(ev, entityId);
            return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <div class="schedule-row ${nowActive ? 'now-active' : ''} ${isPaused ? 'schedule-paused' : ''}">
              <span class="schedule-time">${this._scheduleIcon(isPaused, nowActive)}${this._cleanTime(ev.start_at)} – ${this._cleanTime(ev.end_at)}</span>
              <span class="schedule-days">
                ${$c181edec8277de1e$export$4db43f2ac07d900b.SCHEDULE_WEEKDAYS.map((day, i)=>{
                const isActive = weekdays.includes(day);
                const cls = isPaused && isActive ? 'paused' : isActive ? 'active' : 'inactive';
                return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="schedule-day ${cls}">${this._t($c181edec8277de1e$export$4db43f2ac07d900b.SCHEDULE_DAY_KEYS[i])}</span>`;
            })}
              </span>
              ${isPaused ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="schedule-pause-badge">${ev.paused_until ? `${this._t('schedule_paused_until')} ${this._formatPauseDate(ev.paused_until)}` : this._t('schedule_paused')}</span>` : ''}
            </div>
          `;
        })}
      </div>
    `;
    }
    _renderValveScheduleMini(entityId) {
        const events = this._getScheduleEvents(entityId);
        if (events.length === 0) return '';
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="valve-schedule-mini">
        ${events.map((ev)=>{
            const isPaused = ev.paused === true;
            const weekdays = ev.weekdays || [];
            const nowActive = this._isScheduleActive(ev, entityId);
            return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <div class="valve-schedule-row ${nowActive ? 'now-active' : ''} ${isPaused ? 'schedule-paused' : ''}">
              <span class="valve-schedule-time">${this._scheduleIcon(isPaused, nowActive)}${this._cleanTime(ev.start_at)}–${this._cleanTime(ev.end_at)}</span>
              <span class="schedule-days">
                ${$c181edec8277de1e$export$4db43f2ac07d900b.SCHEDULE_WEEKDAYS.map((day, i)=>{
                const isActive = weekdays.includes(day);
                const cls = isPaused && isActive ? 'paused' : isActive ? 'active' : 'inactive';
                return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="schedule-day ${cls}">${this._t($c181edec8277de1e$export$4db43f2ac07d900b.SCHEDULE_DAY_KEYS[i])}</span>`;
            })}
              </span>
            </div>
          `;
        })}
      </div>
    `;
    }
    _renderSocketSchedule(entityId) {
        const events = this._getScheduleEvents(entityId);
        if (events.length === 0) return '';
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      ${events.map((ev)=>{
            const isPaused = ev.paused === true;
            const weekdays = ev.weekdays || [];
            const nowActive = this._isScheduleActive(ev, entityId);
            return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
          <div class="socket-schedule-mini ${nowActive ? 'now-active' : ''} ${isPaused ? 'schedule-paused' : ''}">
            <span class="schedule-time">${this._scheduleIcon(isPaused, nowActive)}${this._cleanTime(ev.start_at)} – ${this._cleanTime(ev.end_at)}</span>
            <span class="schedule-days">
              ${$c181edec8277de1e$export$4db43f2ac07d900b.SCHEDULE_WEEKDAYS.map((day, i)=>{
                const isActive = weekdays.includes(day);
                const cls = isPaused && isActive ? 'paused' : isActive ? 'active' : 'inactive';
                return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="schedule-day ${cls}">${this._t($c181edec8277de1e$export$4db43f2ac07d900b.SCHEDULE_DAY_KEYS[i])}</span>`;
            })}
            </span>
            ${isPaused ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="schedule-pause-badge">${ev.paused_until ? `${this._t('schedule_paused_until')} ${this._formatPauseDate(ev.paused_until)}` : this._t('schedule_paused')}</span>` : ''}
          </div>
        `;
        })}
    `;
    }
    _cleanTime(t) {
        if (!t) return '';
        if (t.startsWith('MN+')) return t.substring(3);
        if (t.startsWith('SR') || t.startsWith('SS')) {
            const symbol = t.startsWith('SR') ? "\u2600\uFE0E" : "\u263E";
            const offset = t.substring(2);
            if (offset === '+00:00' || offset === '-00:00' || offset === '') return symbol;
            const sign = offset[0];
            const [h, m] = offset.substring(1).split(':').map(Number);
            const mins = h * 60 + (m || 0);
            return `${symbol}${sign}${mins}min`;
        }
        return t;
    }
    _formatPauseDate(isoString) {
        try {
            const d = new Date(isoString);
            return `${d.getDate()}.${d.getMonth() + 1}.`;
        } catch  {
            return '';
        }
    }
    _renderSocketSection() {
        const sockets = this._getVisibleSockets();
        if (sockets.length === 0) return '';
        const status = this._getDeviceOnlineStatus(sockets);
        const rfLink = this._getMinRfLink(sockets);
        const isSingle = this.config.sections?.length === 1;
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="socket-section">
        ${!isSingle ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="section-label">
          ${this._t('section_socket')}
          ${rfLink != null ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="section-signal" @click="${()=>this._fireMoreInfo(this._getConnectionEntityForDevices(sockets))}">${this._renderSignalBars(rfLink)}</span>` : status ? this._renderConnectionIcon(status, sockets) : ''}
        </div>` : ''}
        ${sockets.map((entityId)=>this._renderSocket(entityId, status === 'offline'))}
      </div>
    `;
    }
    _renderSocket(entityId, isOffline = false) {
        const state = this._hass.states[entityId];
        if (!state) return '';
        const isActive = state.state === 'on';
        let shortName = this._shortEntityName(state, this._t('section_socket'));
        // Reuse valve timer tracking for socket countdown
        const timer = this._valveTimers[entityId];
        let remaining = 0, total = 0;
        if (isActive && timer) {
            const elapsed = (this._now.getTime() - timer.startTime.getTime()) / 1000;
            remaining = Math.max(0, timer.durationSec - elapsed);
            total = timer.durationSec;
        }
        // Try separate remaining_duration sensor (kayloehmann)
        if (isActive && remaining === 0) {
            const entityReg = (this._hass.entities || {})[entityId];
            const devId = entityReg?.device_id;
            if (devId) {
                const remainSensorId = this._entities?.deviceSocketRemainingDurations?.[devId];
                if (remainSensorId) {
                    const remainSensor = this._hass.states[remainSensorId];
                    const secs = parseFloat(remainSensor?.state);
                    if (secs > 0) {
                        remaining = secs;
                        total = secs;
                    }
                }
            }
        }
        // Fall back to schedule-based timer
        if (isActive && remaining === 0) {
            const scheduleTimer = this._getScheduleRemaining(entityId, state);
            if (scheduleTimer) {
                remaining = scheduleTimer.remaining;
                total = scheduleTimer.total;
            }
        }
        const pct = isActive && total > 0 && remaining > 0 ? Math.round(remaining / total * 100) : 0;
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="socket-card ${isActive ? 'active' : ''} ${isOffline && !isActive ? 'offline' : ''} ${this._openPillPopup === entityId ? 'pill-open' : ''}">
        <div class="socket-left">
          <div class="socket-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v6"/><path d="M6 2v6"/>
              <rect x="2" y="8" width="16" height="4" rx="1"/>
              <path d="M10 12v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4"/>
              <path d="M6 18v4"/><path d="M12 18v4"/>
            </svg>
          </div>
          <div class="socket-info">
            <div class="socket-name" @click="${()=>this._fireMoreInfo(entityId)}">${shortName}</div>
            <div class="socket-status">
              ${isOffline && !isActive ? this._t('state_offline') : this._getSocketStatusText(entityId, state, remaining)}
            </div>
          </div>
        </div>
        <div class="socket-right">
          ${this._renderPill(entityId, isActive, isOffline && !isActive || this._isPatchedIntegration === false, ()=>this._toggleSocket(entityId, isActive), true)}
        </div>
        ${isActive && pct > 0 ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
          <div class="socket-progress-wrap">
            <div class="socket-progress-track">
              <div class="socket-progress-fill" style="width:${pct}%"></div>
            </div>
          </div>
        ` : ''}
        ${this._renderSocketSchedule(entityId)}
      </div>
    `;
    }
    async _toggleSocket(entityId, isOn) {
        const gardenaId = this._getGardenaDeviceId(entityId);
        if (isOn) {
            await this._backend.turnOffSocket(this._hass, {
                entityId: entityId,
                gardenaDeviceId: gardenaId
            });
            delete this._valveTimers[entityId];
        } else {
            const durationSec = this._getEntityDuration(entityId) * 60;
            await this._backend.turnOnSocket(this._hass, {
                entityId: entityId,
                gardenaDeviceId: gardenaId,
                durationSec: durationSec,
                patched: this._isPatchedIntegration
            });
            this._valveTimers[entityId] = {
                startTime: new Date(),
                durationSec: durationSec
            };
        }
        $c181edec8277de1e$var$_saveTimers();
    }
    // ---------- History Section ----------
    static HISTORY_COLORS = [
        '#1DBF7B',
        '#00A86B',
        '#5DCAA5',
        '#EF9F27',
        '#378ADD',
        '#D85A30',
        '#D4537E',
        '#8E6FBF',
        '#3AAFA9',
        '#FF6F61'
    ];
    async _fetchHistory() {
        const now = Date.now();
        if (now - this._historyLastFetch < 300000) return; // cache 5 min
        this._historyLastFetch = now;
        const valves = this._getVisibleValves();
        const sockets = this._getVisibleSockets();
        const entities = [
            ...valves,
            ...sockets
        ];
        if (entities.length === 0) {
            this._historyData = [];
            return;
        }
        const end = new Date();
        const start = new Date(end);
        start.setDate(start.getDate() - 6);
        start.setHours(0, 0, 0, 0);
        const entityFilter = entities.join(',');
        const url = `history/period/${start.toISOString()}?end_time=${end.toISOString()}&filter_entity_id=${entityFilter}&minimal_response&no_attributes&significant_changes_only`;
        try {
            const result = await this._hass.callApi('GET', url);
            this._historyData = this._processHistory(result, entities, start, end);
        } catch (e) {
            console.warn('Gardena Card: Failed to fetch history', e);
            this._historyData = [];
        }
    }
    _processHistory(result, entities, start, end) {
        // Build 7-day structure
        const days = [];
        for(let d = 0; d < 7; d++){
            const date = new Date(start);
            date.setDate(start.getDate() + d);
            days.push({
                date: date,
                minutes: new Array(entities.length).fill(0)
            });
        }
        if (!result || !Array.isArray(result)) return days;
        result.forEach((entityHistory)=>{
            if (!Array.isArray(entityHistory) || entityHistory.length === 0) return;
            // Find which entity index this corresponds to
            const eid = entityHistory[0]?.entity_id;
            const idx = entities.indexOf(eid);
            if (idx === -1) return;
            for(let i = 0; i < entityHistory.length; i++){
                const entry = entityHistory[i];
                const isActive = entry.state === 'open' || entry.state === 'on';
                if (!isActive) continue;
                const entryStart = new Date(entry.last_changed);
                const nextEntry = entityHistory[i + 1];
                const entryEnd = nextEntry ? new Date(nextEntry.last_changed) : end;
                // Distribute minutes across days
                for (const day of days){
                    const dayStart = new Date(day.date);
                    dayStart.setHours(0, 0, 0, 0);
                    const dayEnd = new Date(dayStart);
                    dayEnd.setDate(dayEnd.getDate() + 1);
                    const overlapStart = Math.max(entryStart.getTime(), dayStart.getTime());
                    const overlapEnd = Math.min(entryEnd.getTime(), dayEnd.getTime());
                    if (overlapStart < overlapEnd) day.minutes[idx] += (overlapEnd - overlapStart) / 60000;
                }
            }
        });
        // Round minutes
        days.forEach((d)=>d.minutes = d.minutes.map((m)=>Math.round(m)));
        return days;
    }
    _renderHistorySection() {
        const valves = this._getVisibleValves();
        const sockets = this._getVisibleSockets();
        const entities = [
            ...valves,
            ...sockets
        ];
        if (entities.length === 0 || !this._historyData || this._historyData.length === 0) return '';
        const days = this._historyData;
        // Check if there's any data at all
        const hasAnyData = days.some((d)=>d.minutes.some((m)=>m > 0));
        if (!hasAnyData) return '';
        const dayNames = [
            this._t('day_sun'),
            this._t('day_mon'),
            this._t('day_tue'),
            this._t('day_wed'),
            this._t('day_thu'),
            this._t('day_fri'),
            this._t('day_sat')
        ];
        // Entity names for legend — valves use friendly_name, others use device name
        const valveSet = new Set(valves);
        const entityNames = entities.map((eid)=>{
            const state = this._hass.states[eid];
            if (valveSet.has(eid)) {
                const name = state?.attributes?.friendly_name || eid.split('.').pop();
                let short = name.includes(' - ') ? name.split(' - ').pop().trim() : name;
                short = short.replace(/\b(\w+)(?:\s+\1)+\b/gi, '$1');
                return short || eid.split('.').pop();
            }
            return this._shortEntityName(state, eid.split('.').pop());
        });
        let maxTotal = 0;
        const dayTotals = days.map((d)=>{
            const sum = d.minutes.reduce((a, b)=>a + b, 0);
            if (sum > maxTotal) maxTotal = sum;
            return sum;
        });
        maxTotal = Math.max(maxTotal, 20);
        maxTotal = Math.ceil(maxTotal / 20) * 20;
        const grandTotal = dayTotals.reduce((a, b)=>a + b, 0);
        const totalHrs = Math.floor(grandTotal / 60);
        const totalMins = grandTotal % 60;
        const totalStr = (totalHrs > 0 ? totalHrs + 'h ' : '') + totalMins + 'min';
        const first = days[0].date;
        const last = days[days.length - 1].date;
        const periodStr = `${first.getDate()}.\u{2013}${last.getDate()}.${last.getMonth() + 1}. ${last.getFullYear()}`;
        const chartHeight = 124;
        const gridSteps = 4;
        const today = new Date();
        // Find which entities have any data
        const usedEntities = new Set();
        days.forEach((d)=>d.minutes.forEach((m, i)=>{
                if (m > 0) usedEntities.add(i);
            }));
        const isSingle = this.config.sections?.length === 1;
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="history-section">
        ${!isSingle ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="section-label">${this._t('section_history')}</div>` : ''}
        <div class="history-header">
          <div class="history-period">${periodStr}</div>
          <div class="history-total">${totalStr}</div>
        </div>
        <div class="chart-container">
          <div class="chart-y-axis">
            ${Array.from({
            length: gridSteps + 1
        }, (_, i)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
              <span class="chart-y-label" style="top:${i / gridSteps * 100}%">${Math.round(maxTotal - maxTotal / gridSteps * i)}</span>
            `)}
          </div>
          <div class="chart-main">
            <div class="chart-gridlines">
              ${Array.from({
            length: gridSteps + 1
        }, ()=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="chart-gridline"></div>`)}
            </div>
            <div class="chart-bars">
              ${days.map((day, di)=>{
            const isToday = day.date.getDate() === today.getDate() && day.date.getMonth() === today.getMonth();
            const dayTotal = dayTotals[di];
            const dateStr = day.date.getDate() + '.' + (day.date.getMonth() + 1) + '.';
            return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                  <div class="chart-bar-group ${isToday ? 'today' : ''}">
                    <div class="chart-stack">
                      ${day.minutes.map((mins, zi)=>mins > 0 ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                        <div class="chart-segment" style="height:${Math.max(1, mins / maxTotal * chartHeight)}px;background:${$c181edec8277de1e$export$4db43f2ac07d900b.HISTORY_COLORS[zi % 10]};cursor:pointer" @click="${()=>this._navigateHistory(entities[zi])}"></div>
                      ` : '')}
                    </div>
                    <div class="chart-day-label">${isToday ? this._t('day_today') : dateStr}</div>
                    ${dayTotal > 0 ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                      <div class="chart-tooltip">
                        <div class="tooltip-title">${dayNames[day.date.getDay()]}, ${dateStr}</div>
                        ${day.minutes.map((mins, zi)=>mins > 0 ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                          <div class="tooltip-line">
                            <span class="tooltip-dot" style="background:${$c181edec8277de1e$export$4db43f2ac07d900b.HISTORY_COLORS[zi % 10]}"></span>
                            <span>${entityNames[zi]}</span>
                            <span class="tooltip-mins">${mins} min</span>
                          </div>
                        ` : '')}
                        <div class="tooltip-total">
                          <span>${this._t('history_total_label')}</span>
                          <span>${dayTotal} min</span>
                        </div>
                      </div>
                    ` : ''}
                  </div>
                `;
        })}
            </div>
          </div>
        </div>
        <div class="chart-legend">
          ${entityNames.map((name, i)=>usedEntities.has(i) ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <div class="legend-item" @click="${()=>this._navigateHistory(entities[i])}" style="cursor:pointer">
              <span class="legend-dot" style="background:${$c181edec8277de1e$export$4db43f2ac07d900b.HISTORY_COLORS[i % 10]}"></span>
              ${name}
            </div>
          ` : '')}
        </div>
      </div>
    `;
    }
    // ---------- Styles ----------
    static get styles() {
        return (0, $def2de46b9306e8a$export$8d80f9cac07cdb3)((0, (/*@__PURE__*/$parcel$interopDefault($4828e467d1847026$exports))));
    }
    // ---------- Config form ----------
    static getConfigForm() {
        return {
            schema: [
                {
                    name: "title",
                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "config_title"),
                    selector: {
                        text: {}
                    }
                },
                {
                    name: "sections",
                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "config_sections"),
                    selector: {
                        select: {
                            multiple: true,
                            options: [
                                {
                                    value: "mower",
                                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "section_mower")
                                },
                                {
                                    value: "valves",
                                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "section_valves")
                                },
                                {
                                    value: "socket",
                                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "section_socket")
                                },
                                {
                                    value: "history",
                                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "section_history")
                                }
                            ]
                        }
                    }
                },
                {
                    name: "show_header",
                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "config_show_header"),
                    selector: {
                        boolean: {}
                    },
                    default: true
                },
                {
                    name: "show_history",
                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "config_show_history"),
                    selector: {
                        boolean: {}
                    },
                    default: true
                },
                {
                    name: "show_schedules",
                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "config_show_schedules"),
                    selector: {
                        boolean: {}
                    },
                    default: true
                },
                {
                    name: "default_duration",
                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "config_default_duration"),
                    selector: {
                        number: {
                            min: 5,
                            max: 120,
                            step: 5,
                            unit_of_measurement: "min",
                            mode: "slider"
                        }
                    }
                },
                {
                    name: "mower_entities",
                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "config_mower_entities"),
                    selector: {
                        entity: {
                            filter: [
                                {
                                    domain: "lawn_mower",
                                    integration: "gardena_smart_system"
                                }
                            ],
                            multiple: true
                        }
                    }
                },
                {
                    name: "valve_columns",
                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "config_valve_columns"),
                    selector: {
                        number: {
                            min: 1,
                            max: 3,
                            step: 1,
                            mode: "slider"
                        }
                    },
                    default: 3
                },
                {
                    name: "valve_entities",
                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "config_valve_entities"),
                    selector: {
                        entity: {
                            filter: [
                                {
                                    domain: "valve",
                                    integration: "gardena_smart_system"
                                }
                            ],
                            multiple: true
                        }
                    }
                },
                {
                    name: "socket_entities",
                    label: (0, $bfc33d6b165ebf37$export$625550452a3fa3ec)(null, "config_socket_entities"),
                    selector: {
                        entity: {
                            filter: [
                                {
                                    domain: "switch",
                                    integration: "gardena_smart_system"
                                }
                            ],
                            multiple: true
                        }
                    }
                }
            ]
        };
    }
    static getStubConfig(hass) {
        const allEntities = Object.values(hass.entities).filter((e)=>e.platform === "gardena_smart_system");
        const byDomain = (domain)=>allEntities.filter((e)=>e.entity_id.startsWith(domain + '.')).map((e)=>e.entity_id);
        return {
            default_duration: 30,
            valve_columns: 3,
            valve_entities: byDomain('valve'),
            socket_entities: byDomain('switch'),
            mower_entities: byDomain('lawn_mower')
        };
    }
}



const $241519ecc570b12f$var$SUB_CARDS = [
    {
        type: 'gardena-smart-mower-card',
        name: 'Gardena Smart System - Mower',
        description: 'Mower section from the Gardena Smart System card.',
        sections: [
            'mower'
        ],
        configFields: [
            'title',
            'show_header',
            'show_schedules',
            'mower_entities'
        ],
        size: 3
    },
    {
        type: 'gardena-smart-valves-card',
        name: 'Gardena Smart System - Valves',
        description: 'Valve zones section from the Gardena Smart System card.',
        sections: [
            'valves'
        ],
        configFields: [
            'title',
            'show_header',
            'show_schedules',
            'default_duration',
            'valve_columns',
            'valve_entities'
        ],
        size: 4
    },
    {
        type: 'gardena-smart-socket-card',
        name: 'Gardena Smart System - Socket',
        description: 'Power socket section from the Gardena Smart System card.',
        sections: [
            'socket'
        ],
        configFields: [
            'title',
            'show_header',
            'show_schedules',
            'default_duration',
            'socket_entities'
        ],
        size: 2
    },
    {
        type: 'gardena-smart-history-card',
        name: 'Gardena Smart System - History',
        description: 'History chart from the Gardena Smart System card.',
        sections: [
            'history'
        ],
        configFields: [
            'title',
            'show_header',
            'valve_entities',
            'socket_entities'
        ],
        size: 3
    }
];
function $241519ecc570b12f$var$createSubCardClass(def) {
    class SubCard extends (0, $c181edec8277de1e$export$4db43f2ac07d900b) {
        setConfig(config) {
            super.setConfig({
                ...config,
                sections: def.sections
            });
        }
        static getConfigForm() {
            const fullForm = (0, $c181edec8277de1e$export$4db43f2ac07d900b).getConfigForm();
            return {
                schema: fullForm.schema.filter((f)=>def.configFields.includes(f.name))
            };
        }
        static getStubConfig(hass) {
            const full = (0, $c181edec8277de1e$export$4db43f2ac07d900b).getStubConfig(hass);
            const stub = {};
            for (const key of def.configFields)if (full[key] !== undefined) stub[key] = full[key];
            return stub;
        }
        getCardSize() {
            return def.size;
        }
    }
    return SubCard;
}
function $241519ecc570b12f$export$e0977bf6e2c8a92() {
    for (const def of $241519ecc570b12f$var$SUB_CARDS){
        if (!customElements.get(def.type)) customElements.define(def.type, $241519ecc570b12f$var$createSubCardClass(def));
        window.customCards = window.customCards || [];
        window.customCards.push({
            type: def.type,
            name: def.name,
            description: def.description,
            preview: true
        });
    }
}


if (!customElements.get("gardena-smart-system-card")) customElements.define("gardena-smart-system-card", (0, $c181edec8277de1e$export$4db43f2ac07d900b));
window.customCards = window.customCards || [];
window.customCards.push({
    type: "gardena-smart-system-card",
    name: "Gardena Smart System Card",
    description: "Custom card for the Gardena Smart System integration with mower, irrigation, and sensor support.",
    preview: true
});
(0, $241519ecc570b12f$export$e0977bf6e2c8a92)();
console.info(`%c GARDENA-SMART-SYSTEM-CARD %c v${(0, $c181edec8277de1e$export$d5e7ce6d07daf10f)} `, "color:#fff;background:#1c1c1c;padding:2px 6px;border-radius:4px 0 0 4px;font-weight:700", "color:#1c1c1c;background:#4caf50;padding:2px 6px;border-radius:0 4px 4px 0;font-weight:700");


//# sourceMappingURL=gardena_smart_system_card.js.map
