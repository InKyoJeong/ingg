---
title: "[React] Hook의 동작 원리 이해하기"
tags: ["react"]
date: 2021-12-19 22:09:98
description: "React Hook은 어떤 방식으로 동작할까? Hook을 구현해보며 동작 방식을 이해해보자."
---

![react](./images/react.png)

React Hook은 어떤 방식으로 동작할까? Hook을 구현해보며 동작 방식을 이해해보자.

> #### JSconf 2019, Shawn Wang의 영상을 참고하여 작성한 글입니다.

---

### 📌 Contents

1. [클로저란?](#about-closure)
2. [useState 구현하기](#make-usestate)
3. [컴포넌트에서 Hook 사용하기](#component-hook)
4. [Hook을 여러번 사용하기](#multiple-hook)
5. [조건문 안에서의 Hook](#hook-condition)
6. [useEffect 구현하기](#make-useeffect)
 
---

<br>

### <a name="about-closure"></a>클로저란?

<hr />

**_W3Schools_** 에서는 클로저를 다음과 같이 정의한다.

> #### "Closure makes it possible for a function to have 'private' variables."

<br>

먼저 간단한 예시를 살펴보자.

```js
let foo = 1;
function add() {
  foo += 1;
  return foo;
}

console.log(add()); //2
console.log(add()); //3
```

이 예시는 foo 변수가 글로벌 스코프를 가지므로 중간에 다른값을 할당할 수 있다는 문제가 있다.

```js{3}
console.log(add()); //2
console.log(add()); //3
foo = 999;
console.log(add()); //1000
console.log(add()); //1001
```

<br>

함수안으로 스코프를 옮기고 함수 내부에서 함수를 리턴하도록 변경해보자. 이렇게 바꾸면 글로벌 스코프를 가지지 않으면서 처음 예시처럼 동작한다. 또한 중간에 _foo_ 변수를 건드릴 수도 없다. 

```js{13}
function getAdd() {
  let foo = 1;
  return function () {
    foo += 1;
    return foo;
  };
}

const add = getAdd();

console.log(add()); //2
console.log(add()); //3
foo = 777; // ReferenceError: foo is not defined
```

<br>

이것이 클로저다. 아무도 _foo_ 변수에 접근할 수 없지만 _add_ 는 실행될때마다 접근할 수 있다. 

또는 모듈 패턴을 이용하여 아래 처럼 변경할 수도 있다.

```js
const add = (function getAdd() {
  let foo = 1;
  return function () {
    foo += 1;
    return foo;
  };
})();

console.log(add()); //2
console.log(add()); //3
```

<br>

### <a name="make-usestate"></a>useState 구현하기

<hr />

위의 예시를 이용해서 _useState_ 를 만들어보자. _state_ 를 _getter_ 함수로 만들고, _count_ 함수 값을 호출해서 값을 얻을 수 있다.

```js
function useState(initialVal) {
  let _val = initialVal;
  const state = () => _val;
  const setState = (newVal) => {
    _val = newVal;
  };

  return [state, setState];
}

const [count, setCount] = useState(1);

console.log(count()); //1
setCount(2);
console.log(count()); //2
```

<br>

### <a name="component-hook"></a>컴포넌트에서 Hook 사용하기

<hr />

리액트에서는 위와같이 함수로 호출하지 않고 변수로 사용하므로 _useState_ 함수를 변경해보자. 먼저 hook을 _React_ 모듈 안으로 넣는다. 이렇게 하면 _React_ 는 `useState 객체`를 반환하므로 사용법이 `React.useState`로 달라진다.

```js{15}
const React = (function () {
  function useState(initialVal) {
    let _val = initialVal;
    const state = () => _val;
    const setState = (newVal) => {
      _val = newVal;
    };

    return [state, setState];
  }

  return { useState };
})();

const [count, setCount] = React.useState(1); 

console.log(count()); //1
setCount(2);
console.log(count()); //2
```

그리고 안에 훅을 넣은 함수인 _Component_ 를 만든다.

```js
function Component() {
  const [count, setCount] = React.useState(1);

  return {
    render: () => console.log(count),
    click: () => setCount(count + 1),
  };
}
```

<br>

이제 _React_ 에게 어떻게 컴포넌트를 _render_ 할것인지 가르쳐줘야 한다. 따라서 _Component_ 를 받는 _render_ 함수를 추가한다. _Component_ 는 함수이므로 호출할 수 있다. 그리고 객체를 리턴하므로 마찬가지로 _render_ 도 호출할 수 있다.

```js{12-16}
const React = (function () {
  function useState(initialVal) {
    let _val = initialVal;
    const state = () => _val;
    const setState = (newVal) => {
      _val = newVal;
    };

    return [state, setState];
  }

  function render(Component) {
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();
```

```js
function Component() {
  const [count, setCount] = React.useState(1);

  return {
    render: () => console.log(count),
    click: () => setCount(count + 1),
  };
}

var App = React.render(Component); // ƒ state() {}
App.click();
var App = React.render(Component); // ƒ state() {}
```

<br>

#### 문제점 개선

지금은 콘솔에 _state_ 함수가 찍히므로 `_val` 를 위로 끌어올리고 _getter_ 함수를 제거하면 잘 동작한다.

```js{2,4}
const React = (function () {
  let _val;
  function useState(initialVal) {
    const state = _val || initialVal;
    const setState = (newVal) => {
      _val = newVal;
    };

    return [state, setState];
  }

  //...
})();

var App = React.render(Component); // 1
App.click();
var App = React.render(Component); // 2
```
 

<br>

### <a name="multiple-hook"></a>Hook을 여러번 사용하기

<hr />

그런데 위의 예시는 훅을 여러개 가진다면 제대로 동작하지 않는다.

```js{2-3}
function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple"); 

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word),
  };
}

var App = React.render(Component); // {count: 1, text: "apple"}
App.click();
var App = React.render(Component); // {count: 2, text: 2} 🥲
App.type("orange");
var App = React.render(Component); // {count: "orange", text: "orange"} 🥲
```

<br>

#### 문제점 개선 1

지금은 `_val` 라는 하나의 변수만 가지고 있고 계속 값을 덮어쓰기 때문이다. 따라서 배열과 인덱스를 이용하여 변경하자.

```js{2-3,11}
const React = (function () {
  let hooks = [];
  let idx = 0;

  function useState(initialVal) {
    const state = hooks[idx] || initialVal;
    const setState = (newVal) => {
      hooks[idx] = newVal;
    };

    idx++; // 다음 훅을 받을 수 있게 인덱스 증가
    return [state, setState];
  }

  function render(Component) {
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word),
  };
}

var App = React.render(Component); // {count: 1, text: "apple"}
App.click();
var App = React.render(Component); // {count: 2, text: "apple"}
App.type("orange");
var App = React.render(Component); // {count: "orange", text: "apple"} 🥲
```

<br>

#### 문제점 개선 2

이번에는 **_click_** 은 잘 동작하지만 _text_ 를 _orange_ 로 변경하면 _count_ 가 _orange_ 로 바뀌어 버린다.
**_App_** 컴포넌트가 _render_ 되면 _useState_ 함수를 호출하고, 그때마다 계속해서 _index_ 가 증가되기 때문이다. 따라서 _render_ 될때마다 hook의 _index_ 를 `0`으로 초기화한다.

```js{16}
const React = (function () {
  let hooks = [];
  let idx = 0;

  function useState(initialVal) {
    const state = hooks[idx] || initialVal;
    const setState = (newVal) => {
      hooks[idx] = newVal;
    };

    idx++;
    return [state, setState];
  }

  function render(Component) {
    idx = 0;
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word),
  };
}

var App = React.render(Component); // { count: 1, text: 'apple' }
App.click();
var App = React.render(Component); // { count: 1, text: 'apple' } 🥲
App.click();
var App = React.render(Component); // { count: 1, text: 'apple' } 🥲
App.type("orange");
var App = React.render(Component); // { count: 1, text: 'apple' } 🥲
App.type("peach");
var App = React.render(Component); // { count: 1, text: 'apple' } 🥲
```

<br>

#### 문제점 개선 3

그러면 상태가 바뀌지 않는데, _render_ 된 후에 _useState_ 가 호출되므로 증가된 _index_ 의 값에 저장이 되기 때문이다.

실제로 _hooks_ 배열을 살펴보면 첫번째, 두번째 인자는 비어있고 세번째 인자에 _setState_ 값이 저장되어 있다. 그렇기 때문에 계속 상태가 변하지 않은채로 계속 출력된것이다.

```js 
const React = (function () {
  let hooks = [];
  let idx = 0;

  function useState(initialVal) {
    const state = hooks[idx] || initialVal;
    const setState = (newVal) => {
      hooks[idx] = newVal;
      console.log(hooks); 
    };

    idx++;
    return [state, setState];
  }

  //...
})();

// { count: 1, text: 'apple' }
// [ <2 empty items>, 2 ]
// { count: 1, text: 'apple' }
// [ <2 empty items>, 2 ]
// { count: 1, text: 'apple' }
// [ <2 empty items>, 'orange' ]
// { count: 1, text: 'apple' }
// [ <2 empty items>, 'peach' ]
// { count: 1, text: 'apple' }
```

<br>

따라서 이걸 고치려면 _setState_ 안의 _index_ 가 _useState_ 에 의해서 변하지 않게 `freeze` 한다. 이렇게 하면 _useState_ 가 호출된 순간 `_idx`를 사용하고, 정상적으로 동작한다.

```js{7,9}
const React = (function () {
  let hooks = [];
  let idx = 0;

  function useState(initialVal) {
    const state = hooks[idx] || initialVal;
    const _idx = idx; 
    const setState = (newVal) => {
      hooks[_idx] = newVal; 
    };

    idx++;
    return [state, setState];
  }

  function render(Component) {
    idx = 0; 
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word),
  };
}

var App = React.render(Component); // { count: 1, text: 'apple' }
App.click();
var App = React.render(Component); // { count: 2, text: 'apple' } 😀
App.click();
var App = React.render(Component); // { count: 3, text: 'apple' } 😀
App.type("orange");
var App = React.render(Component); // { count: 3, text: 'orange' } 😀
App.type("peach");
var App = React.render(Component); // { count: 3, text: 'peach' } 😀
``` 

<br>

### <a name="hook-condition"></a>조건문 내에서의 Hook

<hr />

리액트 공식 문서에서는 반복문, 조건문, 중첩된 함수 내에서 Hook을 호출하면 안된다고 적혀있다. 이 규칙을 따라야 컴포넌트가 렌더링 될 때마다 동일한 순서로 Hook이 호출되는 것이 보장되기 때문이다.

만약 아래처럼 조건문 안에 _useState_ 를 넣는다면 두번째 Hook의 _index_ 는 `1`이어야 하지만, 조건에 따라 첫번째 Hook이 실행되지 않을 수도 있으므로 _index_ 가 `0`이 될 수도 있다는 문제가 있다. 따라서 순서가 보장되지 않으므로 아래와 같이 사용해서는 안 된다.

```js
function Component() {
  if (Math.random() > 0.5) {
    const [count, setCount] = React.useState(1); // ❌
  }

  const [text, setText] = React.useState("apple");

  return {
    //...
  };
}
```

<br>

### <a name="make-useeffect"></a>useEffect 구현하기

<hr />

이번에는 _useEffect_ 를 만들어보자. _useEffect_ Hook은 **콜백과 dependency 배열**을 받는다. 먼저 변수 _hasChanged_ 를 이용하여 변경되었는지 아닌지를 확인한다. 그리고 _dependency_ 가 변경되면 콜백을 실행한다.

그다음 변화를 감지하려면 _old dependencies_ 와 _new dependencies_ 의 차이가 필요하므로 _dependencies_ 를 저장해야한다. 따라서 호출되고 나면 _hooks_ 배열안에 저장한다. 그 이후에는 _oldDeps_ 가 존재하면 _newArray_ 와 비교하는 작업을 통해 _hasChanged_ 를 변경한다.

```js
const React = (function () {
  let hooks = [];
  let idx = 0;

  function useState(initialValue) {
    //...
  }

  function render(Component) {
    //...
  }

  function useEffect(cb, depArray) {
    const oldDeps = hooks[idx];
    let hasChanged = true; // default

    if (oldDeps) {
      hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    }

    // 변경을 감지
    if (hasChanged) {
      cb();
    }

    hooks[idx] = depArray;
    idx++;
  }

  return { useState, render, useEffect };
})();
```

<br>

#### 배열에 따른 결과 확인

이제 _useEffect_ 를 사용해보자. 두번째 인자에 빈 배열을 넣으면 처음에만 실행된다.

```js{5-7}
function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  React.useEffect(() => {
    console.log("--- 실행됨! ---");
  }, []);

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word),
  };
}

var App = React.render(Component);
App.click();
var App = React.render(Component);
App.type("orange");
var App = React.render(Component);

// --- 실행됨! ---
// { count: 1, text: 'apple' }
// { count: 2, text: 'apple' }
// { count: 2, text: 'orange' }
```

<br>

이제 배열에 _count_ 를 넣는다면, _count_ 가 업데이트 될때 실행되는 것을 볼 수 있다. 물론 _text_ 를 넣어도 마찬가지로 _text_ 가 업데이트 될때 실행된다.

```js{7}
function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  React.useEffect(() => {
    console.log("--- 실행됨! ---");
  }, [count]);  

  return {
    //...
  };
}

var App = React.render(Component);
App.click();
var App = React.render(Component);
App.type("orange");
var App = React.render(Component);

// --- 실행됨! ---
// { count: 1, text: 'apple' }
// --- 실행됨! ---
// { count: 2, text: 'apple' }
// { count: 2, text: 'orange' }
```

<br>

만약 배열을 제거한다면 매번 실행될 것이다.

```js
function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  React.useEffect(() => {
    console.log("--- 실행됨! ---");
  });

  return {
    //...
  };
}

var App = React.render(Component);
App.click();
var App = React.render(Component);
App.type("orange");
var App = React.render(Component);

// --- 실행됨! ---
// { count: 1, text: 'apple' }
// --- 실행됨! ---
// { count: 2, text: 'apple' }
// --- 실행됨! ---
// { count: 2, text: 'orange' }
```

<br>

#### Object.is 와 ===

위의 예시에서 비교를 위해 사용한 `Object.is`는 첫번째 인자와 두번째 인자가 같은지를 판정하는 메서드인데, 비교 연산자 `===`와 달리 **_NaN_** 와 **_-0, 0_** 비교가 가능하다.

```js
NaN === NaN; // false
Object.is(NaN, NaN); // true

0 === -0; // true
Object.is(0, -0); // false
```


<br>


이렇게 클로저 개념을 이용하여 간단히 useState, useEffect를 구현해보면서, 리액트 훅이 어떤 원리로 작동되는지 대략적으로 살펴볼 수 있었다. 더 자세한 설명은 아래 링크의 영상에서 볼 수 있다.

<br>

#### Reference

- [Getting Closure on React Hooks by Shawn Wang](https://youtu.be/KJP1E-Y-xyo)
