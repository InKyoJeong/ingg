---
title: "[CSS] Flexbox 더 잘 활용하기"
tags: ["css"]
date: 2023-01-14 17:05:98
description: flexbox를 정확히 이해하고 다양한 속성을 활용해 보자.
---

![flexbox](https://user-images.githubusercontent.com/48676844/216775875-bfdf8509-ffd8-4fec-8fc7-4181fa3e1859.svg)

<br>

### 📌 Contents

1. [flexbox란](#flexbox-intro)
2. [flex container 속성 활용하기](#flexbox-flexcontainer)
3. [flex item 속성 활용하기](#flexbox-flexitem)
4. [flex-wrap & align-content](#flexwrap-aligncontent)

---

<br>

### <a name="flexbox-intro"></a>flexbox란?

<hr />

flexbox를 이용하면 요소를 쉽게 정렬할 수 있다. 사용 가능한 공간을 최대한 활용할 수 있도록 컨테이너에 요소를 확장하고 축소할 수 있는 기능을 제공한다. 또한 더 적은 코드와 읽기 쉬운 방법으로 **_float_** 레이아웃을 대체한다.

![flex](https://user-images.githubusercontent.com/48676844/211930298-62edce54-51c7-419c-9fe2-542452a58b1a.svg)

flexbox를 만드려면 부모 요소에 `display: flex` 속성을 지정한다. 이 속성이 적용된 요소는 **flex container**가 되고, 자식 요소는 **flex item**이다. **flex item**들이 배치되는 방향을 **main axis**, 수직 축을 **cross axis**라고한다.

<br>

#### flexbox 속성

flexbox 속성은 container에서 사용하는 속성과 item에서 사용하는 속성으로 나뉜다.

![properties](https://user-images.githubusercontent.com/48676844/211934921-f86a0d8c-2a26-4de1-9696-e832a26879ac.svg)

- `flex-wrap`은 flex container에 충분한 공간이 없는 경우 flex item의 줄바꿈 여부를 정의한다.
- `justify-content`는 flex item이 main axis를 따라 정렬되는 방식을, `align-items`는 cross axis를 따라 정렬되는 방식을 정의한다.
- `align-content`는 행이 1개보다 많은 경우에 적용된다. 빈 공간이 있는 경우 cross axis를 따라 행을 정렬하는 방법을 다룬다.

이제 예시를 통해 자주 사용하지 않았던 속성, 헷갈리는 속성 등을 정리해 보자.

<br>

### <a name="flexbox-flexcontainer"></a>flex container 속성 활용하기

<hr>

### flex-direction

<!-- > row, row-reverse, column, column-reverse -->

**_flex-direction_** 은 **_row, column_** 외에도 **_row-reverse, column-reverse_** 값을 사용할 수 있다. **main axis** 방향을 반대로 바꾼다.

```html
<div class="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
</div>
```

```css
.container {
  display: flex;
  flex-direction: row-reverse;
}
```

![row-reverse](https://user-images.githubusercontent.com/48676844/212118495-348bca9b-72f4-473b-9131-e8a20ffffd77.svg)

### justify-content

**_justify-content_** 에서는 특히 헷갈릴 수 있는 **_space-between, space-around, space-evenly_** 차이점을 알아보자.

#### space-between

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

![between](https://user-images.githubusercontent.com/48676844/212114708-8aaa0c02-5093-4ab0-b32d-7961e3e5bce2.svg)

**_space-between_** 을 사용하면 flex item 사이에 공간이 고르게 나뉜다.

<br>

#### space-around

```css
.container {
  display: flex;
  justify-content: space-around;
}
```

![around](https://user-images.githubusercontent.com/48676844/212114801-f957d38b-a862-4e61-a6b5-f3d7dfe89f82.svg)

**_space-around_** 는 각 flex item의 왼쪽과 오른쪽 모두에 같은 크기의 공간을 둔다.

<br>

#### space-evenly

```css
.container {
  display: flex;
  justify-content: space-evenly;
}
```

![evenly](https://user-images.githubusercontent.com/48676844/212114912-68331098-78df-4f60-8329-78cf9da1af7b.svg)

**_space-evenly_** 는 **_space-around_** 와 비슷하지만 요소의 측면과 item 사이 공간이 모두 같다는 차이점이 있다.

<br>

### align-items

<!-- >   -->

**_align-items_** 에서는 **_center, flex-start, flex-end, stretch_** 를 특히 자주 사용하는데, **_baseline_** 이라는 속성 값도 있다. 텍스트 기준선인 baseline을 기준으로 item을 정렬해 준다.

```html
<div class="container">
  <div class="item">1</div>
  <div class="item item2">2</div>
  <div class="item item3">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
</div>
```

```css{4}
.container {
  display: flex;
  justify-content: center;
  align-items: baseline;
}
.item2 {
  font-size: 100px;
}
```

예를 들어 item2의 폰트 사이즈를 크게 변경하면 아래와 같이 정렬된다.

![baseline](https://user-images.githubusercontent.com/48676844/212138430-b9f69c30-b5fe-4ce1-a49b-ada61f5be738.svg)

<br>

### <a name="flexbox-flexitem"></a>flex item 속성 활용하기

<hr>

### align-self

**_align-self_** 는 **_align-items_** 값을 재정의한다. **grid**에서는 **_grid area_** 항목을 정렬하고, **flexbox**에서는 **cross axis** 항목을 정렬한다.

```css{10}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item2 {
  font-size: 100px;
}
.item3 {
  align-self: flex-end;
}
```

![alignself](https://user-images.githubusercontent.com/48676844/212141377-100bd74d-08ca-4b45-9da6-0f51a29494ce.svg)

<br>

### order

order의 초기값은 0이다. 만약 요소 하나를 시작 부분으로 옮기려면 0보다 작은 값을 주면 된다. 반대로 0보다 큰 값을 준다면 마지막으로 이동한다. 예를 들어 아래처럼 세 번째 아이템에 -1을 주면 맨 앞으로 오게 된다.

```css
.item3 {
  order: -1;
}
```

![order](https://user-images.githubusercontent.com/48676844/212142245-e4cd8b03-0aa3-4572-8197-83ec23baefbe.svg)

<br>

### flex-grow

**_flex-grow_** 속성은 flex item의 확장과 관련된 속성이다. 예를 들어 모든 item에 **1**이상의 값을 부여하면 아이템 각각이 가능한 전체 공간을 차지하게 된다.

```css{7}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
  flex-grow: 1;
  margin: 10px;
}
.item2 {
  font-size: 100px;
}
```

![grow](https://user-images.githubusercontent.com/48676844/212144901-26e67c13-5454-4184-a7c7-43cc69937ce1.svg)

<br>

### flex-shrink

**_flex-shrink_** 속성은 flex item의 축소와 관련된 속성이다. 기본값은 1이고, 공간이 더 이상 없다면 요소가 축소될 수 있게 한다. 만약 값이 0이면 item의 크기가 줄어들지 않고 유지된다.

<br>

### flex-basis

**_flex-basis_** 속성은 flex item의 기본 크기를 결정한다. 기본값은 auto이다. item 각각에 **_width_** 를 지정하는 대신, **_flex-basis_** 를 이용하여 너비를 설정할 수 있다.

<br>

> #### flex: 1 이란?

**_flex-grow, flex-shrink, flex-basis_** 속성은 축약하여 표현할 수 있다. 예를 들어 `flex: 1 1 0` 은 아래와 같고, 이를 다시 `flex: 1` 로 표현할 수 있다.

```css
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  /* flex: 1 */
}
```

<br>

### <a name="flexwrap-aligncontent"></a>flex-wrap & align-content

<hr>

**_flex-wrap_** 은 item이 flex container를 벗어났을 때 줄을 바꿔주는 역할을 해서 반응형을 구현할 때 유용하다. 예를 들어, 아래와 같이 컨테이너에 `flex-wrap: wrap`, 6번째 아이템에 `flex: 1`을 준다면, 뷰포트에 따라 아이템이 아래로 흐르는 것을 볼 수 있다.

```html
<div class="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div class="item6">6</div>
</div>
```

```css{5}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.item6 {
  flex: 1;
}
```

![wrap](https://user-images.githubusercontent.com/48676844/212461414-740b78f9-eba6-488e-827f-bec63b4264f5.gif)

그런데 행이 2개로 늘어나면서 두 행 사이에 불필요한 공간이 생겼다. 이때 **_align-content_** 를 사용하면 쉽게 행을 정렬할 수 있다.

```css{6}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
}
```

![align](https://user-images.githubusercontent.com/48676844/212461970-f65d5787-bb61-4c80-870c-b8eb7521dd69.gif)

이제 의도한 대로 공간없이 중앙에 배치된것을 볼수 있다. 물론 **_flex-start, flex-end, space-between_** 등을 이용하여 원하는 위치에 두 행을 정렬할 수도 있다.
