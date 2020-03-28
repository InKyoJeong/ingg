---
title: "[JS] ES6 Concepts"
date: 2020-03-26 12:30:98
---

![js](./js.png)

ECMAScript란 자바스크립트 언어의 표준이다.
ECMAScript 6는 2015년 6월에 업데이트 되었으며 ECMAScript 언어의 6번째 표준 스펙(Spec)이다. 
그래서 ES6 또는 ES2015라고 부른다.
현재 시점에서 대부분 개발은 ECMAScript 2015버전을 사용하며, 이제 ES6는 필수이다. 
익숙해져야할 ES6 몇가지 개념들을 알아보자.

<br>

---

### 📌 Contents

1. [const & let](#const)
2. [화살표 함수 (Arrow Function)](#arrow)
3. [비구조화 할당 (Destructuring)](#dest)
4. [전개 연산자 (Spread Operator)](#spread)

---

<br>

### <a name="const"></a>const, let
<hr>

**var**은 이제 **let**과 **const**가 대체한다. `let`과 `const`는 ES6부터 추가된 변수 선언자로 '블록 유효 범위'를 갖는 변수를 선언한다. 블록 유효 범위를 가진 변수는 중괄호`{}`안에서만 유효하다. 즉, 블록 스코프를 가지므로 블록 밖에서는 변수에 접근할 수 없다.

#### var와 let의 scope 비교

- _var_

```js
function varScope() {
  var test = 11;
  if (true) {
    var test = 22;
    console.log(test); // 22
  }
  console.log(test); // 22
}
//scope가 전체 외부함수까지이다.
```

- _let_

```js
function letScope() {
  let test = 33;
  if (true) {
    let test = 44;
    console.log(test); //44
  }
  console.log(test); //33
}
//scope가 내부, 하위블록에서 유효하다.
```

가장 큰 차이는 하위 블록에서 재선언을 했을 때 var는 상위 블록과 같은 변수 취급, let은 다른 변수로 취급한다는 것이다.

- _var_

```js
function varScope() {
  if (true) {
    var test = 50;
    console.log(test); // 50
  }
  console.log(test); // 50
}
```

- _let_

```js{3,4}
function letScope1() {
  if (true) {
    let test = 50;
    console.log(test); // 50
  }
  console.log(test); //Uncaught ReferenceError: test is not defined
} //test는 블록 안에서 유효범위를 가지므로 블록 밖에서 변수에 접근할 수 없다.
```
```js{2-6}
function letScope2() {
  let test = 50;
  if (true) {
    console.log(test); //50
  }
  console.log(test); //50
} // 바깥에 있는 변수 test의 유효범위는 전체이므로 밖에서도 접근할 수 있다.
```

var의 유효범위는 상위블록을 포함하고, let은 포함하지 않는다.

#### const와 let비교

- `let`과 `const`의 **공통점**은 `var`와 다르게 **변수 재선언 불가능**이다.
- `let`과 `const`의 **차이점**은 변수의 _immutable_ 여부이다.
- `let`은 **변수에 재할당이 가능**하지만, `const`는 **변수 재선언, 재할당 모두 불가능**하다.

```js
//let : 블록유효범위를 갖는 지역변수 선언
let a = "test";
let a = "test2"; // Uncaught SyntaxError: Identifier 'a' has already been declared
a = "test3"; // 가능
```

```js
// const : 블록유효범위를 가지면서 한번만 할당할 수 있는 변수(상수)선언
// 반드시 초기화해야 한다.
const b = "test";
const b = "test2"; // Uncaught SyntaxError: Identifier 'b' has already been declared
b = "test3"; // 불가능 (Uncaught TypeError)
```

> #### 자바스크립트에서 한 번 초기화했던 변수에 다른 값을 대입하는 경우는 의외로 적다. 따라서 기본적으로는 변수 선언 시 const를 사용하고, 값을 변경해야하는 상황이 있으면 let을 사용하면 된다.

<br>

### <a name="arrow"></a>화살표 함수 (Arrow Function)
<hr>

ES6문법인 화살표함수를 이용하면 `function`키워드를 사용해서 함수를 만드는 것보다 간단히 함수를 표현할 수 있다.

```js
function sayHello(name) {
  return "Hello " + name;
}
const mary = sayHello("Mary");
console.log(mary); // Hello Mary
```

이를 화살표 함수 표현식으로 작성하면 다음과 같다.

```js
const sayHello = name => "Hello " + name; // 중괄호를 하지않는다면 return한다는 것이 함축되어있다.
const mary = sayHello("Mary");
console.log(mary); // Hello Mary
```

<br>

이렇게 default값을 넣을 수도 있다.

```js
function sayHello(name = "John") {
  return "Hello " + name;
}
const human = sayHello();
console.log(human); // Hello John
```

- _Arrow Function_

```js
const sayHello = (name = "John") => "Hello " + name;
const human = sayHello();
console.log(human); // Hello John
```

<br>

### 함수 리터럴과 화살표 함수의 차이점

화살표 함수 표현은 함수 리터럴(익명 함수)의 단축 표현이다. 그러나 두가지 표현이 완전히 같은 것은 아니다. 몇가지 차이점이 있다.

#### 1. this의 값이 함수를 정의할 때 결정된다

함수 리터럴로 정의한 함수의 `this`값은 함수를 **호출**할 때 결정된다. 그러나 화살표 함수의 `this`는 함수를 **정의**할 때 결정된다. 즉, 화살표 함수 바깥의 `this`값이 화살표 함수의 `this`값이 된다.

```js
const obj = {
  test: function() {
    console.log(this); //{test: ƒ}
    const f1 = function() {
      console.log(this); // Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
    };
    f1();
    const f2 = () => console.log(this); //{test: ƒ}
    f2();
  }
};
obj.test();
```

함수 **_f1_** 은 _test_ 라는 함수의 중첩함수고 `this`의 값은 `전역객체`를 가리킨다. 반면 화살표함수 **_f2_**의 `this`값은 함수 **_f2_**를 정의한 익명함수의 `this`값인 객체 **_obj_** 를 가리킨다.

화살표함수는 `call`이나 `apply`메서드를 사용해서 `this`를 바꿔 호출해도 `this`값이 바뀌지않는다.

```js
const mary = { name: "Mary" };
const f1 = function() {
  console.log(this.name);
};
const f2 = () => console.log(this.name);

f1.call(mary); //"Mary"
f2.call(mary); //""
```
<br>

#### 2. arguments 변수가 없다

화살표 함수 안에는 `arguments` 변수가 정의되어 있지 않으므로 사용할 수 없다.

```js
const f1 = () => console.log(arguments);
f1(); //Uncaught ReferenceError: arguments is not defined
```

<br>

#### 3. 생성자로 사용할 수 없다

화살표 함수 앞에 `new`연산자를 붙여 호출할 수 없다.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const mary = new Person("Mary", 25);

console.log(mary); //Person {name: "Mary", age: 25}
```

- _Arrow Function_

```js
const Person = (name, age) => {
  this.name = name;
  this.age = age;
};
const mary = new Person("Mary", 25); //Uncaught TypeError: Person is not a constructor
```
<!-- #### 4. yield 키워드를 사용할 수 없다.  -->

<br>

### <a name="dest"></a>비구조화 할당 (Destructuring)
<hr>

비구조화 할당은 배열, 객체, 반복 가능 객체에서 값을 꺼내 그 값을 별도의 변수에 대입하는 문장이다. 객체와 배열로부터 속성이나 요소를 쉽게 꺼낼 수 있다.

```js
var candyMachine = {
  status: {
    name: "jelly",
    count: 4
  },
  getCandy: function() {
    this.status.count--;
    return this.status.count;
  }
};

var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
```

**객체 속성을 같은 이름의 변수에 대입하는 코드**이다. 아래와 같이 바꿀 수 있다.

```js
const candyMachine = {
  status: {
    name: "jelly",
    count: 4
  },
  getCandy() {
    this.status.count--;
    return this.status.count;
  }
};

const {
  getCandy,
  status: { count }
} = candyMachine;
```

_candyMachine_ 객체 안의 속성을 찾아 변수와 매칭한다. _count_ 처럼 여러 단계 안의 속성도 찾을 수 있다.

#### 배열도 비구조화 할 수 있다.

```js
var array = ["nodejs", {}, 10, true];
var first = array[0];
var second = array[1];
var last = array[3];
```

array라는 배열에 첫번째,두번째,마지막 요소를 변수에 대입하는 과정이다. 아래와 같이 바꿀 수 있다.

```js
const array = ["nodejs", {}, 10, true];
const [first, second, , last] = array;
```
<br>

### <a name="spread"></a>전개 연산자 (Spread Operator)
<hr>

`...`은 **전개 연산자(spread operator)** 라고 한다. 반복가능한 객체를 반환하는 표현식 앞에 표기하며, 반복 가능한 객체를 배열 리터럴 또는 함수의 인수 목록으로 펼칠 수 있다.

```js
console.log([..."ABC"]); // (3) ["A", "B", "C"]
console.log([1, ...[2, 3, 4], 5]); //(5) [1, 2, 3, 4, 5]
```

<br>

예를들어 _day1_ 와 _day2_ 라는 배열이 있고 이 배열을 더한다고 하자.

```js
const day1 = ["Mon", "Tues", "Wed"];
const day2 = ["Thu", "Fri", "Sat"];

const allDays = day1 + day2;

console.log(allDays); //Mon,Tues,WedThu,Fri,Sat
```

모든게 `string`으로 바뀌었다. 따라서 더이상 배열이 아니게 된다. `+` 연산자가 숫자가 아니면 _WedThu_ 처럼 문자로 바꿔서 붙여버린다. 이번엔 아래와 같이 배열로 만들면 오직 하나의 item을 가진 배열이 된다.

```js
let allDays = [day1 + day2];

console.log(allDays); // ["Mon,Tues,WedThu,Fri,Sat"]
```

배열 전체가아니라 해당배열의 item들을 가지기 위해 이렇게 하면 두개의 배열을 만들 수 있다.

```js
const day1 = ["Mon", "Tues", "Wed"];
const day2 = ["Thu", "Fri", "Sat"];

const allDays = [day1, day2];

console.log(allDays); // ▶(2) [Array(3), Array(3)]
```
<br>

**_Spread Operator_** 는 배열로부터 아이템을 가져와서 `Unpack`한다. 따라서 배열을 없애고 콘텐츠만 얻으려면 다음과 같이 한다.

```js{4}
const day1 = ["Mon", "Tues", "Wed"];
const day2 = ["Thu", "Fri", "Sat"];

const allDays = [...day1, ...day2];

console.log(allDays); //["Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]
```

이러면 두배열의 콘텐츠를 한 배열에 가지게 된다. 이게바로 **_Spread Operator_** 이다.
<br>

#### push 메서드

배열 두 개를 연결할 때는 보통 `Array.prototype.concat`메서드를 사용하지만 전개 연산자를 활용하면 `Array.prototype.push`메서드로도 배열을 연결할 수 있다.

```js
const x = ["A", "B", "C"];
x.push(...["D", "E"]); //5

console.log(x); //(5) ["A", "B", "C", "D", "E"]
```

#### Math.max

배열 안의 최댓값을 `Math.max`로 구할 수 있다.

```js
const a = [5, 2, 6, 7, 8];

Math.max(a); //NaN
Math.max(...a); //8
```
<br>

#### Object에서도 작동한다.

```js
const a = {
  first: "name",
  second: "age"
};

const b = {
  thrid: "address"
};

const two = { a, b };

console.log(two); // ▶ {a: {…}, b: {…}}
```

이렇게 하면 **두개의 Object가 있는 하나의 Object**를 얻게된다. 따라서, 두개의 object를 합치는 _two_ 객체를 만들고 싶다면 **_Spread Operator_** 를 사용한다.

```js{10}
const a = {
  first: "name",
  second: "age"
};

const b = {
  thrid: "address"
};

const two = { ...a, ...b };

console.log(two); // ▶ {first: "name", second: "age", thrid: "address"}
```

두개의 Object의 콘텐츠를 가지게 되었다.

#### 마찬가지로 Function에서도 작동한다.

```js
const info = (something, args) => console.log(...args);
```

이렇게 하면 누군가 제공한 *Argument*를 `console.log`할 수 있다.

> #### 전개 연산자는 React프로젝트에서 자주 사용한다. 두개의 Object를 병합하거나, 어떤 대상의 복사본을 만들거나, 어떤 한 콘텐츠를 다른 배열에 넣는 등의 상황에 사용한다.

<br>

