---
title: "[ES6] let과 const"
date: "2020-01-16T18:18:37.121Z"
description: "javascript : var, let, const 차이점"
---

```js
function func() {
  {
    let x //변수 x 선언
    {
      const x = "inner block x" //상수로 변환
      x = "foo" //const는 재할당 불가
    }
    x = "inner" //상수로 앞에 블록에 선언이 되었기 때문에 재할당 불가
  }
}
//변수의 scope는 함수 블록 단위를 형성

// ES5의 var와 ES6의 let의 scope 비교

function varScope() {
  var testx = 30
  if (true) {
    var testx = 70
    console.log(testx) // 70
  }
  console.log(testx) // 70
}
//scope가 전체 외부함수까지이다.

function letScope() {
  let testy = 40
  if (true) {
    let testy = 70
    console.log(testy) //70
  }
  console.log(testy) //40
}
//scope가 내부, 하위블록에서 유효하다.

// var 와 let은 하위 블록과 내부 블록에서 유효하다
// 하지만 가장 큰 차이는 하위 블록에서 재선언을 했을 때
// var는 상위 블록과 같은 변수 취급, let은 다른 변수로 취급한다.

function scopeTest1() {
  if (true) {
    var vs = 50
    console.log(vs) // 50
  }
  console.log(vs) // 50
}

function scopeTest2() {
  if (true) {
    let ls = 50
    console.log(ls) // 50
  }
  console.log(ls) //변수선언 에러
}

function scopeTest3() {
  let z = 50
  if (true) {
    console.log(z) //50
  }
  console.log(z) //50
}

//var의 유효범위는 상위블록을 포함 let은 포함하지 않는다

//let 과 const 차이점
// 두개의 공통점은 var와 다르게 변수 재선언 불가능이다.
// let과 const의 차이점은 변수의 immutable여부이다.
// let은 변수에 재할당이 가능하지만,
// const는 변수 재선언, 재할당 모두 불가능하다.

//let : 블록유효범위를 갖는  지역변수 선언
let a = "test"
let a = "test2" // Uncaught SyntaxError: Identifier 'a' has already been declared
a = "test3" // 가능

// const : 블록유효범위를 가지면서 한번만 할당할 수 있는 변수(상수)선언
// 반드시 초기화해야 한다.
const b = "test"
const b = "test2" // Uncaught SyntaxError: Identifier 'a' has already been declared
b = "test3" // Uncaught TypeError
```
