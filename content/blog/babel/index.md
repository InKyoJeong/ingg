---
title: "[프론트엔드 개발환경] Babel"
date: 2020-02-29 06:16:98
---

![webpack](./pic/babel.png)


**Babel**은 최신의 js코드를 normal한 예전의 js코드로 변환해준다.
많은 모던 웹 브라우저들이 ES6 문법을 어느정도 지원 하지만 부족한 상황이다. 따라서 바벨을 통해 크로스 브라우징(Cross Browsing)이슈를 해결할 수 있다.

```js
// Babel Input: ES2015 arrow function
[1, 2, 3].map(n => n + 1)

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1
})
```
<br>

---

### 📌 Contents

1. [Intro](#intro)
2. [Plugins](#plugin)
3. [Presets](#preset)
4. [Polyfill](#polyfill)
5. [Webpack과 사용하기](#with)

---


<br>

### <a name="intro"></a>1. Intro

#### 패키지 설치

```
npm install --save-dev @babel/core @babel/cli 
```

#### 프로젝트의 루트에 추가한 config 파일예시

```json
//babel.confing.json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "chrome": "79",  // 예시) 크롬 79까지 지원하는 코드를 만든다.
          "edge": "17",
          "firefox": "60",
          "safari": "11.1",
        },
        "useBuiltIns": "usage",
      }
    ]
  ]
}
```

#### CLI 사용

```
./node_modules/.bin/babel src --out-dir lib
```
`src`디렉토리의 모든 JavaScript 파일을 분석하고 변환 한 내용을 적용한 다음 각 파일을 `lib`디렉토리에 출력한다. 

`./node_modules/.bin/babel` 대신 `npx babel` 명령어를 사용할 수 있다.
( `npx babel --help` 명령어로 사용법을 볼 수 있다.)

### <a name="plugin"></a>2. Plugins

플러그인은 코드를 변환하게하는 작은 js프로그램이다. 바벨은 파싱과 출력을 담당하고 플러그인이 변환 작업을 처리한다.
자신만의 플러그인을 작성하여 변환을 코드에 적용할 수도 있고, 공식 플러그인을 사용할 수도 있다.

#### 커스텀 플러그인 예시
```js
// app.js
const fn = something => window.alert(something);
```
```js
// babelPlugin.js
module.exports = function myplugin() {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;

        // 바벨이 만든 AST 노드를 출력
        console.log('Identifier() name:', name) 
        
        // 코드 문자열을 역순으로 변환
        path.node.name = name
          .split("")
          .reverse()
          .join("");
      }
    },
  };
}
```
`--plugins` 옵션에 플러그인을 추가하여 사용한다.
```
npx babel app.js --plugins ./babelPlugin.js
```
```
Identifier() name: fn
Identifier() name: something
Identifier() name: window
Identifier() name: alert
Identifier() name: something
const nf = gnihtemos => wodniw.trela(gnihtemos);
```

#### 공식 플러그인

`block-scoping`이나 `arrow-functions`와 같은 공식 플러그인을 사용할 수도 있다. 화살표함수 플러그인만 설치해보자.

```
npm install --save-dev @babel/plugin-transform-arrow-functions
```
플러그인을 설치하고 마찬가지로 `--plugins`옵션을 지정한뒤 플러그인 이름을 지정하면 된다.
```
npx babel app.js --plugins @babel/plugin-transform-arrow-functions

또는
./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```
```
// 결과
const fn = function (something) {
  return window.alert(something);
};
```
화살표함수가 일반 함수로 변경된 것을 확인할 수 있다.

### <a name="preset"></a>3. Presets
하나하나 필요한 것마다 플러그인을 설정하기는 번거롭기 때문에 일종의 **"플러그인 세트"**인 **프리셋(preset)**을 사용할 수도 있다.

프리셋도 마찬가지로 커스텀 프리셋을 만들 수 있다.

#### 커스텀 프리셋 예시

```js
// src/app.js
const fn = something => window.alert(something);
```
```js
// babelPreset.js
module.exports = function mypreset() {
  return {
    plugins: [
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-transform-block-scoping"
    ]
  };
};
```
커맨드라인 명령어가 길어지기 때문에 웹팩처럼 설정 파일로 분리한다.
```json
//babel.confing.json
{
  "presets": ["./src/babelPreset.js"]
}

```

플러그인을 설정한 것과 똑같은 결과를 얻는다. 
```
npx babel ./src/app.js     

// 결과
var fn = function (something) {
  return window.alert(something);
};
```

#### 공식 프리셋

공식 프리셋은 몇가지가 제공된다.
- **_@babel/preset-env_**
- **_@babel/preset-flow_**
- **_@babel/preset-react_**
- **_@babel/preset-typescript_**

_env_프리셋을 사용해보자. 구성이 없으면 이 프리셋은 모던 자바스크립트를 지원하기위한 모든 _plugin_을 포함한다.
```
npm install --save-dev @babel/preset-env
```
설치후 설정파일에도 추가한다.
```json
{
  "presets": ["@babel/preset-env"]
}
```
```
npx babel ./src/app.js     
```
빌드하면 같은 결과를 출력한다.

_env_는 `targets`옵션으로 브라우저를 지정할 수 있다. 
```json
//babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "79"
        }
      }
    ]
  ]
}
```
```
npx babel ./src/app.js 

// 결과
"use strict";

const fn = something => window.alert(something);
```
옵션으로 크롬버전을 지정하였고, 크롬은 const와 화살표함수를 인식하기 때문에  이번에는 실행결과 변환이 되지 않았다.

<br>

```json{8}
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "79",
          "ie": "11"
    ...
```
```
npx babel ./src/app.js 

// 결과
"use strict";

var fn = function fn(something) {
  return window.alert(something);
};
```
크롬과 인터넷 익스플로러 11을 지원하게 설정하면 익스플로러도 포함해야하기 때문에 변환이 된다.

### <a name="polyfill"></a>4. Polyfill

아래와 같이 코드를 추가하고 실행하면 첫줄만 바뀌고 그대로 출력된다.
```js{2,3}
const fn = something => window.alert(something);
console.log(Array.from("foo"));
new Promise();
```
```
$ npx babel ./src/app.js 

"use strict";

var fn = function fn(something) {
  return window.alert(something);
};

console.log(Array.from("foo"));
new Promise();
```

`Promise`또는 `Map`, `Array.from`등 바벨이 변환하지 못하는 코드도 있다. 
**Polyfill**은 이러한 새로 추가된 전역 객체들을 사용가능하게 만들어준다.

```
npm install --save @babel/polyfill
```
```json{10-13}
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "79",
          "ie": "11"
        },
        "useBuiltIns": "usage",
        "corejs": {
          "version": "2"
        }
      }
    ]
  ]
}
```
**_useBuiltIns_** 옵션은 `usage`, `entry`, `false` 값이 있고 기본값은 `false`이다. 이 옵션은 어떻게 폴리필을 처리할지 구성한다.


이제 아까와는 다른 결과를 볼 수 있다.

```
$ npx babel ./src/app.js 
"use strict";

require("core-js/modules/es6.promise");
require("core-js/modules/es6.object.to-string");
require("core-js/modules/es6.string.iterator");
require("core-js/modules/es6.array.from");

var fn = function fn(something) {
  return window.alert(something);
};

console.log(Array.from("foo"));
new Promise();
```
폴리필 사용을 설정하면 `core-js`도 설치해야한다. **_corejs_**옵션은 `2`, `3` 버전이 있고 기본값은 `2`이다.
```
$ npm i core-js@2
```

<br>

### <a name="with"></a>5. Webpack과 사용하기
**Babel Loader**는 _Babel_과 _webpack_을 이용하여 _JavaScript_파일을 변환한다.

#### 설치

```
npm install -D babel-loader
```

#### 사용
```js
//webpack.config.js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

_js_ 확장자로 끝나는 파일은 _babel-loader_ 가 처리한다. 이제 웹팩으로 빌드하고 _dist_ 폴더의 _main.js_ 를 살펴보면 변경된 코드 등의 결과를 볼 수 있다.

바벨이 하는 역할은 웹팩과 엄밀히 다르다. 웹팩은 모듈을 번들링하고, 바벨은 코드 자체를 변경시켜준다는 차이가 있다. 


<!-- 
그동안 주로 접했던 것은 `.babelrc`였는데 이제 공식홈에서는 `babel.config.js`를 쓰기를 권장하고 있다.  -->

> References

- [https://babeljs.io/docs/en/](https://babeljs.io/docs/en/)
- [https://github.com/babel/babel-loader](https://github.com/babel/babel-loader)