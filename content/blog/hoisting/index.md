---
title: "[JS] 호이스팅과 TDZ에 대하여"
tags: ["javascript"]
date: 2022-11-13 23:30:98 
---

![js](../@images/js.png)



호이스팅(Hoisting)이란 변수나 함수를 선언했을 때 코드 범위(scope) 내의 최상단으로 끌어올려지는 것처럼 보이는 현상이다. 흔히 **_var_** 는 호이스팅이 발생하며, **_const_** 와 **_let_** 은 발생하지 않는다고 하는데, 그 이유는 무엇일까? 그리고 **_const_** 와 **_let_** 이 TDZ에 들어가는 이유는 무엇일까? 

<br>

---

### 📌 Contents

1. [호이스팅(Hoisting)](#about-hoisting)
2. [TDZ (Temporal Dead Zone)란?](#about-tdz)
3. [const, let은 왜 TDZ에 들어갈까](#const-let-tdz)
4. [더 알아보기](#more) 
 
---


<br>

### <a name="about-hoisting"></a>호이스팅(Hoisting)


<hr>



프로그램은 작성한 순서에 따라 윗줄부터 차례로 실행된다. 그러나 변수 선언은 이 원칙을 따르지 않는다.

```js
console.log(x); // undefined
var x;
```

이 코드에서 첫번째 줄은 아직 변수 **_x_** 가 선언되지 않았기 때문에 오류가 발생할 것 같지만, **_undefined_** 가 출력된다. 프로그램 중간에서 변수나 함수를 선언하더라도 프로그램 처음에 선언된 것처럼 다른 문장앞에 생성되기 때문이다. 이를 변수 선언의 **끌어올림(Hoisting)** 이라고 한다.

<br>

선언과 동시에 대입하는 코드는 끌어올리지 않는다. 아래의 첫번째 줄은 **_undefined_** 가 출력되고 세번째는 **5**가 출력된다. 변수 선언부 `var x`는 끌어올리지만 대입부 `x = 5`는 끌어올리지 않기 때문이다.

```js
console.log(x); // undefined
var x = 5;
console.log(x); /// 5
```

<br>

또한, **_let_** 과 **_const_** 변수 선언에서는 호이스팅이 발생하지 않는다.

```js
console.log(b); //Uncaught ReferenceError: Cannot access 'b' before initialization

let b = 1;

console.log(b);
```

<br>

#### 호이스팅이 발생하는 이유

- `var a = 2;`는 하나의 구문처럼 보이지만, 자바스크립트 엔진은 그렇게 보지 않는다.
- `var a`와 `a = 2`라는 구문으로 보고, 첫 번째는 컴파일러 단계에서 처리하고, 두 번째 구문은 실행 단계에서 처리한다.
- 이 의미는 스코프의 모든 선언문은 실행 전에 먼저 처리된다는 점이다.

<br>

#### 호이스팅과 TDZ

사실 호이스팅은 정말 위로 끌어올려지는 것이 아니라, 변수나 함수를 선언 이전에 사용할 수 있기 때문에 끌어 올려지는 것처럼 보이는 것이다. **_var_** 와 달리 **_const, let_** 은 호이스팅이 발생하지 않는 것처럼 보이는데, TDZ에 들어가기 때문이다. 그렇다면 TDZ란 무엇일까?

<br>

### <a name="about-tdz"></a>TDZ (Temporal Dead Zone)란?

<hr>

TDZ는 일시적인 사각지대로, 변수를 사용하는 것을 비허용하는 개념상의 공간이다. TDZ에 있는 값에 접근하게 되면 **_ReferenceError: Cannot access 'xxx' before initialization_** 에러가 발생한다.

정확히는 `const, let`이 호이스팅이 발생하지 않는 것이 아니다. 선언문을 통해 모든 식별자(변수, 함수, 클래스 등)는 호이스팅된다. 그러나 `var`과 다르게 초기화되기 전까지 TDZ에 머물러있기 때문에 호이스팅이 발생하지 않는 것처럼 보이며 참조가 불가능하다.

<br>

#### <a name="const-let-tdz"></a>const, let은 왜 TDZ에 들어갈까

<!-- <hr> -->

그럼 **_var_** 와는 달리 **_const_** 나 **_let_** 은 왜 TDZ에 들어가는 것일까?

```c
// var
var->AllocateTo(VariableLocation::PARAMETER, index);

// const
VariableProxy* proxy =
    DeclareBoundVariable(local_name, VariableMode::kConst, pos);
proxy->var()->set_initializer_position(position());

// let
VariableProxy* proxy =
    DeclareBoundVariable(variable_name, VariableMode::kLet, class_token_pos);
proxy->var()->set_initializer_position(end_pos);
```

**V8** 엔진의 코드를 보면 **_var_** 는 변수 객체를 생성한 후 `AllocateTo` 메소드를 통해 바로 메모리에 공간을 할당한다.

**_const_** 나 **_let_** 은, `set_initializer_position` 메소드를 통해 해당 코드의 위치를 의미하는 position 값만 정해준다. 선언은 되어 있지만 변수에 값을 담기 위한 메모리에 공간이 확보되지 않은 상태가 되는 것이다. 이 시점에 **_let, const_** 키워드로 생성된 변수들이 **TDZ**에 들어간다.

따라서 **TDZ**에 있는 변수 객체란, 선언은 되어있지만 아직 초기화되지 않아서 변수에 담길 값을 위한 공간이 메모리에 할당되지 않은 상태임을 알 수 있다.

<br>

### <a name="more"></a>더 알아보기

<hr>

**_const_** 와 **_let_** 외에, 호이스팅과 함께 알아두면 좋은 내용들을 살펴보자. 편의상 호이스팅이 **되는/되지않는**으로 나누었다.

<br>

#### 함수 표현식과 함수 선언문

- 함수 표현식 (Function Expression): 호이스팅되지 않는다.

```js
a(); // Uncaught TypeError: a is not a function

var a = function () {
  console.log("boo");
};

a();
```

a변수가 아직 할당을 못받은 상태에서 호출하여 에러가 발생한다.

<br>

- 함수 선언문 (Function Declaration): 호이스팅 된다.

```js
say(); // Hello

function say() {
  console.log("Hello");
}

say();
```

함수를 작성하기 전에 함수를 호출하였지만, 코드는 여전히 동작한다. 함수 선언문은 함수 전체를 호이스팅하고, 함수 표현식은 변수 선언부만 호이스팅하는 것을 알 수 있다.

<br>

#### import 모듈

import 모듈도 호이스팅된다. 따라서 자바스크립트 파일 시작 부분에서 디펜던시 모듈을 가져오는 것이 좋다.

```js
foo(); // 동작함
import { foo } from "./myModule";
```

<br>

#### 클래스

클래스도 클래스 선언문 이전에 참조할 수 없다.

```js
console.log(Foo);
// ReferenceError: Cannot access 'Foo' before initialization

class Foo {
  //
}
```

클래스 또한 선언문 이전에 TDZ에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.

```js
const Foo = "";

{
  // 호이스팅이 발생하지 않는다면 ''가 출력되어야함
  console.log(Foo);
  // ReferenceError: Cannot access 'Foo' before initialization
  class Foo {
    //
  }
}
```
