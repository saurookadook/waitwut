---
title: "JavaScript"
date: "2022-07-24"
fullPath: "/sheets/javascript"
iconComponentName: "javascript_icon"
sectionSlug: "sheets"
---

# Table of Contents

- [Ponyfill](#ponyfill)
- [Debouncing](#debouncing)
- [Asynchronous Stuff](#asynchronous-stuff)
- [IIFE](#iife)
- [lolwtf](#lolwtf)

## Ponyfill

_from [ponyfill](https://ponyfill.com)_

> A [polyfill](https://en.wikipedia.org/wiki/Polyfill_(programming)) is code that adds missing functionality by [monkey patching](https://en.wikipedia.org/wiki/Monkey_patch) an API. Unfortunately, it usually globally patches built-ins, which affects all code running in the environment. This is especially problematic when a polyfill is not fully spec compliant (which in some cases is impossible), as it could cause very hard to debug bugs and inconsistencies. Or when the spec for a new feature changes and your code depends on behavior that a module somewhere else in the dependency tree polyfills differently. In general, [you should not modify API's you don't own](https://www.nczonline.net/blog/2010/03/02/maintainable-javascript-dont-modify-objects-you-down-own/).
>
> A ponyfill, in contrast, doesn't monkey patch anything, but instead exports the functionality as a normal module, so you can use it locally without affecting other code.
>
> tl;dr: Polyfills are naughty as they patch native APIs, while ponyfills are pure and don't affect the environment.
>
>
> **Polyfill**
>
> ```JavaScript
> Number.isNaN ??= function (value) {
> 	return value !== value;
> };
> ```
>
> ```JavaScript
> import 'is-nan-polyfill';
>
> Number.isNaN(5);
> ```
>
> **Ponyfill**
>
> ```JavaScript
> export default function isNaN(value) {
> 	return value !== value;
> };
> ```
>
> ```JavaScript
> import isNanPonyfill from 'is-nan-ponyfill';
>
> isNanPonyfill(5);
> ```
>
> Ponyfills should avoid using native APIs, because potential bugs or differences in the native APIs will make such a ponyfill less robust (therefore defeating one of its main purposes). There are important exceptions, such as when:
> - There is no way to implement some of the ponyfill without native APIs.
> - Reimplementing native parts would have a large cost (e.g. performance or code size).
> In such cases, it's still valuable for the ponyfill to minimize any assumptions about the underlying environment.

---

## Debouncing

A technique to ensure that event handler is only called after event has stopped firing for a certain amount of time.

Simple example from [Optimizing window.onresize](https://bencentra.com/code/2015/02/27/optimizing-window-resize.html)

```JavaScript
var w = document.querySelector("#width");
var h = document.querySelector("#height");
var c = document.querySelector("#calls");
var timeout = null;
var delay = 250; // delay after event is "complete" to run callback
var calls = 0;

// window.resize callback function
function getDimensions() {
  w.innerHTML = window.innerWidth;
  h.innerHTML = window.innerHeight;
  calls += 1;
  c.innerHTML = calls;
}

// window.resize event listener
window.addEventListener('resize', function() {
  // clear the timeout
  clearTimeout(timeout);
  // start timing for event "completion"
  timeout = setTimeout(getDimensions, delay);
});

getDimensions();

```

---

## Asynchronous Stuff

_TODO_ 🙃

---

## IIFE

```JavaScript
const colors = []

(function() {
    if (!dontAddColors) {
        colors.push('green', 'blue', 'red');
    }
})();

if (colors.length) {
    console.log('Look at these colors! ', colors);
} else {
    console.log('No colors to print :(');
}
```

---

## Template Literals

### [Tagged Templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)

> A more advanced form of template literals are tagged templates.
>
> Tags allow you to parse template literals with a function. The first argument of a tag function contains an array of string values. The remaining arguments are related to the expressions.
>
> The tag function can then perform whatever operations on these arguments you wish, and return the manipulated string. (Alternatively, it can return something completely different, as described in one of the following examples.)
>
> The name of the function used for the tag can be whatever you want.

```js
function logTemplateLiteralFuncArgs({ strings, values }) {
    const strsLen = strings.length;
    const valsLen = values.length;

    console.log('    logTemplateLiteralFuncArgs    '.padStart(50, '=').padEnd(100, '='));
    console.log(`    'strings' arg length - ${strsLen}`);
    console.log(`    'values' arg length - ${valsLen}`);

    const longest = valsLen > strsLen ? valsLen : strsLen;

    for (let i = 0; i < longest; i++) {
        console.log(`arg # : ${i}`);
        if (i < strsLen) {
            console.log(`'strings'${i} - ${strings[i]}`);
        }
        if (i < valsLen) {
            console.log(`'values'${i} - ${values[i]}`);
        }
    }
}

function buildCSSTextContent({ randClass, tag, strings, values }) {
    // console.log(`'this' in 'buildCSSTextContent'\n`, this);
    let result = '';

    const strsLen = strings.length;
    const valsLen = values.length;
    const longest = valsLen > strsLen ? valsLen : strsLen;

    for (let i = 0; i < longest; i++) {
        if (i < strsLen) {
            result += strings[i];
        }
        if (i < valsLen) {
            result += values[i];
        }
    }

    if (!result.includes('{')) {
        result = `${tag}.${randClass} {\n` + result + `\n}`;
    }

    return result;
}

var styledLite = function _styledLite(strings, ...values) {
    logTemplateLiteralFuncArgs({ strings, values });
    // console.log(`'this' in 'styledLite'\n`, this);
    const _tag = this.tag;
    const randID = Number.parseFloat(Math.random()).toFixed(5).replace(/^0\./, '');
    const kls = `slite-${randID}`;

    const styleTextContent = buildCSSTextContent({
        randClass: kls,
        tag: _tag,
        strings,
        values
    });
    // console.log('---- buildCSSTextContent')
    // console.log(styleTextContent);
    const styleEl = document.createElement('style');
    styleEl.textContent = styleTextContent;
    document.querySelector('head').appendChild(styleEl);

    const el = document.createElement(_tag);
    el.classList.add(kls);

    const spanLabel = document.createComment('span');
    spanLabel.textContent = `styles for '${_tag}'`;
    el.appendChild(spanLabel);

    const preTag = document.createElement('pre');
    preTag.textContent = styleTextContent;
    el.appendChild(preTag);

    return el;
}

var slite = (function () {
    return {
        div: styledLite.bind({ tag: 'div' }),
        p: styledLite.bind({ tag: 'p' }),
        span: styledLite.bind({ tag: 'span' }),
    }
})();

var styleVars = {
    bgColor: '#000000',
    textColor: '#ffffff',
    textSize: '1rem'
};

var styledLiteTest = styledLite`
    background: ${styleVars.bgColor};
    color: ${styleVars.bgColor};
    display: flex;
    flex-direction: column;
    font-size: ${styleVars.textSize};
    height: 100%;
    width: 100%;
`;

var divStyles = {
    bgColor: '#2BC6C6',
    height: 100,
    width: '30rem',
}

function handleDimensionVal(val) {
    return typeof val === 'number'
        ? `${val}%`
        : val
}

var styledLiteDivText = slite.div`
    background: ${divStyles.bgColor};
    display: flex;
    height: ${handleDimensionVal(divStyles.height)};
    position: fixed;
    top: 0;
    width: ${handleDimensionVal(divStyles.width)};
    z-index: 1000;
`;

var bodyEl = document.querySelector('body');
bodyEl.prepend(styledLiteDivText);

```

---

## lolwtf

```JavaScript
console.log(true - false); // 1
console.log(false - false); // -0
```

## Node.js

### Running a file with debugger enabled

```javascript
// some/path/to/index.js
function doTheThing() {
    debugger;
    console.log('Doing the thing!');
}


// NOTE: depending on file passed to `node inspect` command, might have to execute the function directly
doTheThing();

module.exports = doTheThing
```

```sh
$ node inspect some/path/to/index.js
```
