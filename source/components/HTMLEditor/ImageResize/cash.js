/* MIT https://github.com/kenwheeler/cash */
const doc = document,
    win = window,
    div = doc.createElement("div"),
    {
        filter,
        indexOf,
        map,
        push,
        reverse,
        slice,
        some,
        splice,
    } = Array.prototype;
const idRe = /^#[\w-]*$/,
    classRe = /^\.[\w-]*$/,
    htmlRe = /<.+>/,
    tagRe = /^\w+$/;
function find(selector, context = doc) {
    return !isDocument(context) && !isElement(context)
        ? []
        : classRe.test(selector)
        ? context.getElementsByClassName(selector.slice(1))
        : tagRe.test(selector)
        ? context.getElementsByTagName(selector)
        : context.querySelectorAll(selector);
}
class Cash {
    constructor(selector, context = doc) {
        if (!selector) return;
        if (isCash(selector)) return selector;
        let eles = selector;
        if (isString(selector)) {
            const ctx = isCash(context) ? context[0] : context;
            eles = idRe.test(selector)
                ? ctx.getElementById(selector.slice(1))
                : htmlRe.test(selector)
                ? parseHTML(selector)
                : find(selector, ctx);
            if (!eles) return;
        } else if (isFunction(selector)) {
            return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
        }
        if (eles.nodeType || eles === win) eles = [eles];
        this.length = eles.length;
        for (let i = 0, l = this.length; i < l; i++) {
            this[i] = eles[i];
        }
    }
    init(selector, context) {
        return new Cash(selector, context);
    }
}
const cash = Cash.prototype.init;
cash.fn = cash.prototype = Cash.prototype; // Ensuring that `cash () instanceof cash`
Cash.prototype.length = 0;
Cash.prototype.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools
if (typeof Symbol === "function") {
    Cash.prototype[Symbol["iterator"]] = Array.prototype[Symbol["iterator"]];
}
Cash.prototype.get = function(index) {
    if (index === undefined) return slice.call(this);
    return this[index < 0 ? index + this.length : index];
};
Cash.prototype.eq = function(index) {
    return cash(this.get(index));
};
Cash.prototype.first = function() {
    return this.eq(0);
};
Cash.prototype.last = function() {
    return this.eq(-1);
};
Cash.prototype.map = function(callback) {
    return cash(map.call(this, (ele, i) => callback.call(ele, i, ele)));
};
Cash.prototype.slice = function() {
    return cash(slice.apply(this, arguments));
};
const dashAlphaRe = /-([a-z])/g;
function camelCaseReplace(match, letter) {
    return letter.toUpperCase();
}
function camelCase(str) {
    return str.replace(dashAlphaRe, camelCaseReplace);
}
cash.camelCase = camelCase;
function each(arr, callback) {
    for (let i = 0, l = arr.length; i < l; i++) {
        if (callback.call(arr[i], i, arr[i]) === false) break;
    }
}
cash.each = each;
Cash.prototype.each = function(callback) {
    each(this, callback);
    return this;
};
Cash.prototype.removeProp = function(prop) {
    return this.each((i, ele) => {
        delete ele[prop];
    });
};
function extend(target, ...objs) {
    const args = arguments,
        length = args.length;
    for (let i = length < 2 ? 0 : 1; i < length; i++) {
        for (const key in args[i]) {
            target[key] = args[i][key];
        }
    }
    return target;
}
Cash.prototype.extend = function(plugins) {
    return extend(cash.fn, plugins);
};
cash.extend = extend;
cash.guid = 1;
function matches(ele, selector) {
    const matches =
        ele &&
        (ele["matches"] ||
            ele["webkitMatchesSelector"] ||
            ele["mozMatchesSelector"] ||
            ele["msMatchesSelector"] ||
            ele["oMatchesSelector"]);
    return !!matches && matches.call(ele, selector);
}
cash.matches = matches;
function pluck(arr, prop, deep) {
    const plucked = [];
    for (let i = 0, l = arr.length; i < l; i++) {
        let val = arr[i][prop];
        while (val != null) {
            plucked.push(val);
            if (!deep) break;
            val = val[prop];
        }
    }
    return plucked;
}
function isCash(x) {
    return x instanceof Cash;
}
function isWindow(x) {
    return !!x && x === x.window;
}
function isDocument(x) {
    return !!x && x.nodeType === 9;
}
function isElement(x) {
    return !!x && x.nodeType === 1;
}
function isFunction(x) {
    return typeof x === "function";
}
function isString(x) {
    return typeof x === "string";
}
function isNumeric(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}
const { isArray } = Array;
cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isString = isString;
cash.isNumeric = isNumeric;
cash.isArray = isArray;
Cash.prototype.prop = function(prop, value) {
    if (!prop) return;
    if (isString(prop)) {
        if (arguments.length < 2) return this[0] && this[0][prop];
        return this.each((i, ele) => {
            ele[prop] = value;
        });
    }
    for (const key in prop) {
        this.prop(key, prop[key]);
    }
    return this;
};
function getCompareFunction(comparator) {
    return isString(comparator)
        ? (i, ele) => matches(ele, comparator)
        : isFunction(comparator)
        ? comparator
        : isCash(comparator)
        ? (i, ele) => comparator.is(ele)
        : (i, ele) => ele === comparator;
}
Cash.prototype.filter = function(comparator) {
    if (!comparator) return cash();
    const compare = getCompareFunction(comparator);
    return cash(filter.call(this, (ele, i) => compare.call(ele, i, ele)));
};
function filtered(collection, comparator) {
    return !comparator || !collection.length
        ? collection
        : collection.filter(comparator);
}
const splitValuesRe = /\S+/g;
function getSplitValues(str) {
    return isString(str) ? str.match(splitValuesRe) || [] : [];
}
Cash.prototype.hasClass = function(cls) {
    return cls && some.call(this, ele => ele.classList.contains(cls));
};
Cash.prototype.removeAttr = function(attr) {
    const attrs = getSplitValues(attr);
    if (!attrs.length) return this;
    return this.each((i, ele) => {
        each(attrs, (i, a) => {
            ele.removeAttribute(a);
        });
    });
};
function attr(attr, value) {
    if (!attr) return;
    if (isString(attr)) {
        if (arguments.length < 2) {
            if (!this[0]) return;
            const value = this[0].getAttribute(attr);
            return value === null ? undefined : value;
        }
        if (value === undefined) return this;
        if (value === null) return this.removeAttr(attr);
        return this.each((i, ele) => {
            ele.setAttribute(attr, value);
        });
    }
    for (const key in attr) {
        this.attr(key, attr[key]);
    }
    return this;
}
Cash.prototype.attr = attr;
Cash.prototype.toggleClass = function(cls, force) {
    const classes = getSplitValues(cls),
        isForce = force !== undefined;
    if (!classes.length) return this;
    return this.each((i, ele) => {
        each(classes, (i, c) => {
            if (isForce) {
                force ? ele.classList.add(c) : ele.classList.remove(c);
            } else {
                ele.classList.toggle(c);
            }
        });
    });
};
Cash.prototype.addClass = function(cls) {
    return this.toggleClass(cls, true);
};
Cash.prototype.removeClass = function(cls) {
    return !arguments.length
        ? this.attr("class", "")
        : this.toggleClass(cls, false);
};
function unique(arr) {
    return arr.length > 1
        ? filter.call(
              arr,
              (item, index, self) => indexOf.call(self, item) === index
          )
        : arr;
}
cash.unique = unique;
Cash.prototype.add = function(selector, context) {
    return cash(unique(this.get().concat(cash(selector, context).get())));
};
function computeStyle(ele, prop, isVariable) {
    if (!isElement(ele) || !prop) return;
    const style = win.getComputedStyle(ele, null);
    return prop
        ? isVariable
            ? style.getPropertyValue(prop) || undefined
            : style[prop]
        : style;
}
function computeStyleInt(ele, prop) {
    return parseInt(computeStyle(ele, prop), 10) || 0;
}
const cssVariableRe = /^--/;
function isCSSVariable(prop) {
    return cssVariableRe.test(prop);
}
const prefixedProps = {},
    { style } = div,
    vendorsPrefixes = ["webkit", "moz", "ms", "o"];
function getPrefixedProp(prop, isVariable = isCSSVariable(prop)) {
    if (isVariable) return prop;
    if (!prefixedProps[prop]) {
        const propCC = camelCase(prop),
            propUC = `${propCC.charAt(0).toUpperCase()}${propCC.slice(1)}`,
            props = `${propCC} ${vendorsPrefixes.join(
                `${propUC} `
            )}${propUC}`.split(" ");
        each(props, (i, p) => {
            if (p in style) {
                prefixedProps[prop] = p;
                return false;
            }
        });
    }
    return prefixedProps[prop];
}
cash.prefixedProp = getPrefixedProp;
const numericProps = {
    animationIterationCount: true,
    columnCount: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
};
function getSuffixedValue(prop, value, isVariable = isCSSVariable(prop)) {
    return !isVariable && !numericProps[prop] && isNumeric(value)
        ? `${value}px`
        : value;
}
function css(prop, value) {
    if (isString(prop)) {
        const isVariable = isCSSVariable(prop);
        prop = getPrefixedProp(prop, isVariable);
        if (arguments.length < 2)
            return this[0] && computeStyle(this[0], prop, isVariable);
        if (!prop) return this;
        value = getSuffixedValue(prop, value, isVariable);
        return this.each((i, ele) => {
            if (!isElement(ele)) return;
            if (isVariable) {
                ele.style.setProperty(prop, value); //TSC
            } else {
                ele.style[prop] = value; //TSC
            }
        });
    }
    for (const key in prop) {
        this.css(key, prop[key]);
    }
    return this;
}
Cash.prototype.css = css;
function getData(ele, key) {
    const value = ele.dataset
        ? ele.dataset[key] || ele.dataset[camelCase(key)]
        : ele.getAttribute(`data-${key}`);
    try {
        return JSON.parse(value);
    } catch (_a) {}
    return value;
}
function setData(ele, key, value) {
    try {
        value = JSON.stringify(value);
    } catch (_a) {}
    if (ele.dataset) {
        ele.dataset[camelCase(key)] = value;
    } else {
        ele.setAttribute(`data-${key}`, value);
    }
}
const dataAttributeRe = /^data-(.+)/;
function data(name, value) {
    if (!name) {
        if (!this[0]) return;
        const datas = {};
        each(this[0].attributes, (i, attr) => {
            const match = attr.name.match(dataAttributeRe);
            if (!match) return;
            datas[match[1]] = this.data(match[1]);
        });
        return datas;
    }
    if (isString(name)) {
        if (value === undefined) return this[0] && getData(this[0], name);
        return this.each((i, ele) => setData(ele, name, value));
    }
    for (const key in name) {
        this.data(key, name[key]);
    }
    return this;
}
Cash.prototype.data = data;
function getExtraSpace(ele, xAxis) {
    return (
        computeStyleInt(ele, `border${xAxis ? "Left" : "Top"}Width`) +
        computeStyleInt(ele, `padding${xAxis ? "Left" : "Top"}`) +
        computeStyleInt(ele, `padding${xAxis ? "Right" : "Bottom"}`) +
        computeStyleInt(ele, `border${xAxis ? "Right" : "Bottom"}Width`)
    );
}
each(["Width", "Height"], (i, prop) => {
    Cash.prototype[`inner${prop}`] = function() {
        if (!this[0]) return;
        if (isWindow(this[0])) return win[`inner${prop}`];
        return this[0][`client${prop}`];
    };
});
each(["width", "height"], (index, prop) => {
    Cash.prototype[prop] = function(value) {
        if (!this[0]) return value === undefined ? undefined : this;
        if (!arguments.length) {
            if (isWindow(this[0])) return this[0][camelCase(`outer-${prop}`)];
            return (
                this[0].getBoundingClientRect()[prop] -
                getExtraSpace(this[0], !index)
            );
        }
        const valueNumber = parseInt(value, 10); //TSC
        return this.each((i, ele) => {
            if (!isElement(ele)) return;
            const boxSizing = computeStyle(ele, "boxSizing");
            ele.style[prop] = getSuffixedValue(
                prop,
                valueNumber +
                    (boxSizing === "border-box"
                        ? getExtraSpace(ele, !index)
                        : 0)
            );
        });
    };
});
each(["Width", "Height"], (index, prop) => {
    Cash.prototype[`outer${prop}`] = function(includeMargins) {
        if (!this[0]) return;
        if (isWindow(this[0])) return win[`outer${prop}`];
        return (
            this[0][`offset${prop}`] +
            (includeMargins
                ? computeStyleInt(this[0], `margin${!index ? "Left" : "Top"}`) +
                  computeStyleInt(
                      this[0],
                      `margin${!index ? "Right" : "Bottom"}`
                  )
                : 0)
        );
    };
});
const defaultDisplay = {};
function getDefaultDisplay(tagName) {
    if (defaultDisplay[tagName]) return defaultDisplay[tagName];
    const ele = doc.createElement(tagName);
    doc.body.appendChild(ele);
    const display = computeStyle(ele, "display");
    doc.body.removeChild(ele);
    return (defaultDisplay[tagName] = display !== "none" ? display : "block");
}
function isHidden(ele) {
    return computeStyle(ele, "display") === "none";
}
Cash.prototype.toggle = function(force) {
    return this.each((i, ele) => {
        force = force !== undefined ? force : isHidden(ele);
        if (force) {
            ele.style.display = "";
            if (isHidden(ele)) {
                ele.style.display = getDefaultDisplay(ele.tagName);
            }
        } else {
            ele.style.display = "none";
        }
    });
};
Cash.prototype.hide = function() {
    return this.toggle(false);
};
Cash.prototype.show = function() {
    return this.toggle(true);
};
function hasNamespaces(ns1, ns2) {
    return !ns2 || !some.call(ns2, ns => ns1.indexOf(ns) < 0);
}
const eventsNamespace = "__cashEvents",
    eventsNamespacesSeparator = ".",
    eventsFocus = { focus: "focusin", blur: "focusout" },
    eventsHover = { mouseenter: "mouseover", mouseleave: "mouseout" },
    eventsMouseRe = /^(?:mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
function getEventNameBubbling(name) {
    return eventsHover[name] || eventsFocus[name] || name;
}
function getEventsCache(ele) {
    return (ele[eventsNamespace] = ele[eventsNamespace] || {});
}
function addEvent(ele, name, namespaces, selector, callback) {
    callback.guid = callback.guid || cash.guid++;
    const eventCache = getEventsCache(ele);
    eventCache[name] = eventCache[name] || [];
    eventCache[name].push([namespaces, selector, callback]);
    ele.addEventListener(name, callback);
}
function parseEventName(eventName) {
    const parts = eventName.split(eventsNamespacesSeparator);
    return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
}
function removeEvent(ele, name, namespaces, selector, callback) {
    const cache = getEventsCache(ele);
    if (!name) {
        for (name in cache) {
            removeEvent(ele, name, namespaces, selector, callback);
        }
        delete ele[eventsNamespace];
    } else if (cache[name]) {
        cache[name] = cache[name].filter(([ns, sel, cb]) => {
            if (
                (callback && cb.guid !== callback.guid) ||
                !hasNamespaces(ns, namespaces) ||
                (selector && selector !== sel)
            )
                return true;
            ele.removeEventListener(name, cb);
        });
    }
}
Cash.prototype.off = function(eventFullName, selector, callback) {
    if (eventFullName === undefined) {
        this.each((i, ele) => removeEvent(ele));
    } else {
        if (isFunction(selector)) {
            callback = selector;
            selector = "";
        }
        each(getSplitValues(eventFullName), (i, eventFullName) => {
            const [name, namespaces] = parseEventName(
                getEventNameBubbling(eventFullName)
            );
            this.each((i, ele) =>
                removeEvent(ele, name, namespaces, selector, callback)
            ); //TSC
        });
    }
    return this;
};
function on(eventFullName, selector, callback, _one) {
    if (!isString(eventFullName)) {
        for (const key in eventFullName) {
            this.on(key, selector, eventFullName[key]);
        }
        return this;
    }
    if (isFunction(selector)) {
        callback = selector;
        selector = "";
    }
    each(getSplitValues(eventFullName), (i, eventFullName) => {
        const [name, namespaces] = parseEventName(
            getEventNameBubbling(eventFullName)
        );
        this.each((i, ele) => {
            const finalCallback = function(event) {
                if (
                    event.namespace &&
                    !hasNamespaces(
                        namespaces,
                        event.namespace.split(eventsNamespacesSeparator)
                    )
                )
                    return;
                let thisArg = ele;
                if (selector) {
                    let target = event.target;
                    while (!matches(target, selector)) {
                        //TSC
                        if (target === ele) return;
                        target = target.parentNode;
                        if (!target) return;
                    }
                    thisArg = target;
                    event.__delegate = true;
                }
                if (event.__delegate) {
                    Object.defineProperty(event, "currentTarget", {
                        configurable: true,
                        get() {
                            return thisArg;
                        },
                    });
                }
                const returnValue = callback.call(thisArg, event, event.data); //TSC
                if (_one) {
                    removeEvent(ele, name, namespaces, selector, finalCallback); //TSC
                }
                if (returnValue === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            };
            finalCallback.guid = callback["guid"] =
                callback["guid"] || cash.guid++; //TSC
            addEvent(ele, name, namespaces, selector, finalCallback); //TSC
        });
    });
    return this;
}
Cash.prototype.on = on;
function one(eventFullName, selector, callback) {
    return this.on(eventFullName, selector, callback, true); //TSC
}
Cash.prototype.one = one;
Cash.prototype.ready = function(callback) {
    const finalCallback = () => callback(cash);
    if (doc.readyState !== "loading") {
        setTimeout(finalCallback);
    } else {
        doc.addEventListener("DOMContentLoaded", finalCallback);
    }
    return this;
};
Cash.prototype.trigger = function(eventFullName, data) {
    let evt;
    if (isString(eventFullName)) {
        const [name, namespaces] = parseEventName(eventFullName),
            type = eventsMouseRe.test(name) ? "MouseEvents" : "HTMLEvents";
        evt = doc.createEvent(type);
        evt.initEvent(name, true, true);
        evt.namespace = namespaces.join(eventsNamespacesSeparator);
    } else {
        evt = eventFullName;
    }
    evt.data = data;
    const isEventFocus = evt.type in eventsFocus;
    return this.each((i, ele) => {
        if (isEventFocus && isFunction(ele[evt.type])) {
            ele[evt.type]();
        } else {
            ele.dispatchEvent(evt);
        }
    });
};
function getValue(ele) {
    if (ele.multiple)
        return pluck(
            filter.call(
                ele.options,
                option =>
                    option.selected &&
                    !option.disabled &&
                    !option.parentNode.disabled
            ),
            "value"
        );
    return ele.value || "";
}
const queryEncodeSpaceRe = /%20/g;
function queryEncode(prop, value) {
    return `&${encodeURIComponent(prop)}=${encodeURIComponent(value).replace(
        queryEncodeSpaceRe,
        "+"
    )}`;
}
const skippableRe = /file|reset|submit|button|image/i,
    checkableRe = /radio|checkbox/i;
Cash.prototype.serialize = function() {
    let query = "";
    this.each((i, ele) => {
        each(ele.elements || [ele], (i, ele) => {
            if (
                ele.disabled ||
                !ele.name ||
                ele.tagName === "FIELDSET" ||
                skippableRe.test(ele.type) ||
                (checkableRe.test(ele.type) && !ele.checked)
            )
                return;
            const value = getValue(ele);
            if (value === undefined) return;
            const values = isArray(value) ? value : [value];
            each(values, (i, value) => {
                query += queryEncode(ele.name, value);
            });
        });
    });
    return query.substr(1);
};
function val(value) {
    if (value === undefined) return this[0] && getValue(this[0]);
    return this.each((i, ele) => {
        if (ele.tagName === "SELECT") {
            const eleValue = isArray(value)
                ? value
                : value === null
                ? []
                : [value];
            each(ele.options, (i, option) => {
                option.selected = eleValue.indexOf(option.value) >= 0;
            });
        } else {
            ele.value = value === null ? "" : value;
        }
    });
}
Cash.prototype.val = val;
Cash.prototype.clone = function() {
    return this.map((i, ele) => ele.cloneNode(true));
};
Cash.prototype.detach = function() {
    return this.each((i, ele) => {
        if (ele.parentNode) {
            ele.parentNode.removeChild(ele);
        }
    });
};
const fragmentRe = /^\s*<(\w+)[^>]*>/,
    singleTagRe = /^\s*<(\w+)\s*\/?>(?:<\/\1>)?\s*$/;
let containers;
function initContainers() {
    if (containers) return;
    const table = doc.createElement("table"),
        tr = doc.createElement("tr");
    containers = {
        "*": div,
        tr: doc.createElement("tbody"),
        td: tr,
        th: tr,
        thead: table,
        tbody: table,
        tfoot: table,
    };
}
function parseHTML(html) {
    initContainers();
    if (!isString(html)) return [];
    if (singleTagRe.test(html)) return [doc.createElement(RegExp.$1)];
    const fragment = fragmentRe.test(html) && RegExp.$1,
        container = containers[fragment] || containers["*"];
    container.innerHTML = html;
    return cash(container.childNodes)
        .detach()
        .get();
}
cash.parseHTML = parseHTML;
Cash.prototype.empty = function() {
    return this.each((i, ele) => {
        while (ele.firstChild) {
            ele.removeChild(ele.firstChild);
        }
    });
};
function html(html) {
    if (html === undefined) return this[0] && this[0].innerHTML;
    return this.each((i, ele) => {
        ele.innerHTML = html;
    });
}
Cash.prototype.html = html;
Cash.prototype.remove = function() {
    return this.detach().off();
};
function text(text) {
    if (text === undefined) return this[0] ? this[0].textContent : "";
    return this.each((i, ele) => {
        ele.textContent = text;
    });
}
Cash.prototype.text = text;
Cash.prototype.unwrap = function() {
    this.parent().each((i, ele) => {
        const $ele = cash(ele);
        $ele.replaceWith($ele.children());
    });
    return this;
};
const docEle = doc.documentElement;
Cash.prototype.offset = function() {
    const ele = this[0];
    if (!ele) return;
    const rect = ele.getBoundingClientRect();
    return {
        top: rect.top + win.pageYOffset - docEle.clientTop,
        left: rect.left + win.pageXOffset - docEle.clientLeft,
    };
};
Cash.prototype.offsetParent = function() {
    return cash(this[0] && this[0].offsetParent);
};
Cash.prototype.position = function() {
    const ele = this[0];
    if (!ele) return;
    return {
        left: ele.offsetLeft,
        top: ele.offsetTop,
    };
};
Cash.prototype.children = function(comparator) {
    const result = [];
    this.each((i, ele) => {
        push.apply(result, ele.children);
    });
    return filtered(cash(unique(result)), comparator);
};
Cash.prototype.contents = function() {
    const result = [];
    this.each((i, ele) => {
        push.apply(
            result,
            ele.tagName === "IFRAME" ? [ele.contentDocument] : ele.childNodes
        );
    });
    return cash(unique(result));
};
Cash.prototype.find = function(selector) {
    const result = [];
    for (let i = 0, l = this.length; i < l; i++) {
        const found = find(selector, this[i]);
        if (found.length) {
            push.apply(result, found);
        }
    }
    return cash(unique(result));
};
const scriptTypeRe = /^$|^module$|\/(?:java|ecma)script/i,
    HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
function evalScripts(node) {
    const collection = cash(node);
    collection
        .filter("script")
        .add(collection.find("script"))
        .each((i, ele) => {
            if (!ele.src && scriptTypeRe.test(ele.type)) {
                // The script type is supported
                if (ele.ownerDocument.documentElement.contains(ele)) {
                    // The element is attached to the DOM // Using `documentElement` for broader browser support
                    eval(ele.textContent.replace(HTMLCDATARe, ""));
                }
            }
        });
}
function insertElement(anchor, child, prepend, prependTarget) {
    if (prepend) {
        anchor.insertBefore(child, prependTarget);
    } else {
        anchor.appendChild(child);
    }
    evalScripts(child);
}
function insertContent(parent, child, prepend) {
    each(parent, (index, parentEle) => {
        each(child, (i, childEle) => {
            insertElement(
                parentEle,
                !index ? childEle : childEle.cloneNode(true),
                prepend,
                prepend && parentEle.firstChild
            );
        });
    });
}
Cash.prototype.append = function() {
    each(arguments, (i, selector) => {
        insertContent(this, cash(selector));
    });
    return this;
};
Cash.prototype.appendTo = function(selector) {
    insertContent(cash(selector), this);
    return this;
};
Cash.prototype.insertAfter = function(selector) {
    cash(selector).each((index, ele) => {
        const parent = ele.parentNode;
        if (parent) {
            this.each((i, e) => {
                insertElement(
                    parent,
                    !index ? e : e.cloneNode(true),
                    true,
                    ele.nextSibling
                );
            });
        }
    });
    return this;
};
Cash.prototype.after = function() {
    each(reverse.apply(arguments), (i, selector) => {
        reverse.apply(cash(selector).slice()).insertAfter(this);
    });
    return this;
};
Cash.prototype.insertBefore = function(selector) {
    cash(selector).each((index, ele) => {
        const parent = ele.parentNode;
        if (parent) {
            this.each((i, e) => {
                insertElement(
                    parent,
                    !index ? e : e.cloneNode(true),
                    true,
                    ele
                );
            });
        }
    });
    return this;
};
Cash.prototype.before = function() {
    each(arguments, (i, selector) => {
        cash(selector).insertBefore(this);
    });
    return this;
};
Cash.prototype.prepend = function() {
    each(arguments, (i, selector) => {
        insertContent(this, cash(selector), true);
    });
    return this;
};
Cash.prototype.prependTo = function(selector) {
    insertContent(cash(selector), reverse.apply(this.slice()), true);
    return this;
};
Cash.prototype.replaceWith = function(selector) {
    return this.before(selector).remove();
};
Cash.prototype.replaceAll = function(selector) {
    cash(selector).replaceWith(this);
    return this;
};
Cash.prototype.wrapAll = function(selector) {
    if (this[0]) {
        const structure = cash(selector);
        this.first().before(structure);
        let wrapper = structure[0];
        while (wrapper.children.length) wrapper = wrapper.firstElementChild;
        this.appendTo(wrapper);
    }
    return this;
};
Cash.prototype.wrap = function(selector) {
    return this.each((index, ele) => {
        const wrapper = cash(selector)[0];
        cash(ele).wrapAll(!index ? wrapper : wrapper.cloneNode(true));
    });
};
Cash.prototype.wrapInner = function(selector) {
    return this.each((i, ele) => {
        const $ele = cash(ele),
            contents = $ele.contents();
        contents.length ? contents.wrapAll(selector) : $ele.append(selector);
    });
};
Cash.prototype.has = function(selector) {
    const comparator = isString(selector)
        ? (i, ele) => !!find(selector, ele).length
        : (i, ele) => ele.contains(selector);
    return this.filter(comparator);
};
Cash.prototype.is = function(comparator) {
    if (!comparator || !this[0]) return false;
    const compare = getCompareFunction(comparator);
    let check = false;
    this.each((i, ele) => {
        check = compare.call(ele, i, ele);
        return !check;
    });
    return check;
};
Cash.prototype.next = function(comparator, _all) {
    return filtered(
        cash(unique(pluck(this, "nextElementSibling", _all))),
        comparator
    );
};
Cash.prototype.nextAll = function(comparator) {
    return this.next(comparator, true);
};
Cash.prototype.not = function(comparator) {
    if (!comparator || !this[0]) return this;
    const compare = getCompareFunction(comparator);
    return this.filter((i, ele) => !compare.call(ele, i, ele));
};
Cash.prototype.parent = function(comparator) {
    return filtered(cash(unique(pluck(this, "parentNode"))), comparator);
};
Cash.prototype.index = function(selector) {
    const child = selector ? cash(selector)[0] : this[0],
        collection = selector
            ? this
            : cash(child)
                  .parent()
                  .children();
    return indexOf.call(collection, child);
};
Cash.prototype.closest = function(comparator) {
    if (!comparator || !this[0]) return cash();
    const filtered = this.filter(comparator);
    if (filtered.length) return filtered;
    return this.parent().closest(comparator);
};
Cash.prototype.parents = function(comparator) {
    return filtered(
        cash(unique(pluck(this, "parentElement", true))),
        comparator
    );
};
Cash.prototype.prev = function(comparator, _all) {
    return filtered(
        cash(unique(pluck(this, "previousElementSibling", _all))),
        comparator
    );
};
Cash.prototype.prevAll = function(comparator) {
    return this.prev(comparator, true);
};
Cash.prototype.siblings = function(comparator) {
    const result = [];
    this.each((i, ele) => {
        push.apply(
            result,
            cash(ele)
                .parent()
                .children((ci, child) => child !== ele)
        );
    });
    return filtered(cash(unique(result)), comparator);
};
export default cash;
