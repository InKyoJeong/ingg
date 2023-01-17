---
title: "[React] Zustand 동작 원리와 ExternalStore"
tags: ["react"]
date: 2023-01-17 09:50:98
---

![](https://user-images.githubusercontent.com/48676844/212665607-a5c114e9-77ad-4b58-9e13-dac77efa6b1f.jpeg)
 

최근 zustand를 이용하여 상태 관리를 해보았는데 사용법이 정말 간단하다고 느꼈다. 특이한 점은 redux, recoil 과 달리 앱을 감싸는 별도의 provider가 없이도 상태 관리가 가능하다는 것이였는데, 그 이유가 무엇일까? 


---

### 📌 Contents

1. [zustand란?](#zustand-intro)
2. [zustand 동작 원리 이해하기](#zustand-code)
3. [useSyncExternalStore란?](#use-sync-external-store-work)

---

<br>

### <a name="zustand-intro"></a>zustand란?

<hr>

zustand는 상태 관리 라이브러리이다. 사용이 간편하며 보일러플레이트 코드 또한 아주 적다는 장점이 있다. **_context api_** 를 이용하여 상태 관리를 할 때 발생하는 리렌더링은 context 분리, memoization 등을 통해 해결해야 한다. 반면 zustand를 이용하면 상태 변경 시 불필요한 리렌더링을 쉽게 방지할 수 있고 **provider hell** 문제 또한 해결할 수 있다.

<br>

#### 기본적인 사용법

기본적인 사용법은 먼저 `create` 함수를 이용하여 스토어를 생성하는 것이다.

```ts
import { create } from 'zustand'

interface CountState {
  counts: number;
  increaseCount: () => void;
}

const useCountStore = create<CountState>((set) => ({
  counts: 0,
  increaseCount: () => set((state) => ({ counts: state.counts + 1 })),
}))
```

그리고 컴포넌트에서 **_selector_** 함수를 전달하여 훅을 사용하면 된다.

```ts
function Counter() {
  const count = useCountStore((state) => state.count);

  return <div>{count}</div>;
};

function IncreaseButton() {
  const increaseCount = useCountStore((state) => state.increaseCount);

  return <button onClick={increaseCount}>증가</button>;
};
```

**immer**도 같이 사용 가능하며 **devtools, persist** 등의 여러가지 유용한 기능들이 있다.

<br>

### <a name="zustand-code"></a>zustand 동작 원리 이해하기

<hr>

이제 zustand 코드를 통해 어떻게 동작하는지 알아보자. zustand는 발행/구독 모델 기반으로 이루어져 있으며, 내부적으로 스토어 상태를 클로저로 관리한다. 아래는 type과 deprecated 부분을 제외한 vanilla 코드인데, 상태 변경을 구독할 리스너는 Set을 통해 관리하고 있다.

```js
// vanilla.ts
const createStoreImpl = (createState) => {
  let state;
  const listeners = new Set();

  const setState = (partial, replace) => {
    // ... (생략)
  };

  const getState = () => state;

  const subscribe = (listener) => {
    // ... (생략)
  };

  const api = { setState, getState, subscribe };
  state = createState(setState, getState, api);

  return api;
};

export const createStore = (createState) =>
  createState ? createStoreImpl(createState) : createStoreImpl;
```

<br>

#### setState

상태를 변경하는 **_setState_** 함수를 보면 인자가 _function_ 타입일 경우 현재 상태를 인자로 넘겨 **nextState**를 정의한다. 그리고 **nextState**와 **state**가 다르다면 `Object.assign` 을 이용해서 상태를 갱신해 준다.

```js
const setState = (partial, replace) => {
  const nextState = typeof partial === "function" ? partial(state) : partial;

  if (!Object.is(nextState, state)) {
    const previousState = state;
    state =
      replace ?? typeof nextState !== "object"
        ? nextState
        : Object.assign({}, state, nextState);

    listeners.forEach((listener) => listener(state, previousState));
  }
};
```

<br>

#### subscribe

상태를 구독하는 **_subscribe_** 함수이다. 구독을 해제하는 함수 또한 리턴하고 있다.

```js
const subscribe = (listener) => {
  listeners.add(listener);

  return () => listeners.delete(listener);
};
```

<br>

#### 사용 예시

위의 코드를 이용해서 스토어를 생성하고 **_subscribe, setState_** 함수를 사용할 수 있다.

```js
const store = createStore((set) => ({
  count: 0,
  setCount: (newCount) => set({ count: newCount }),
}));

store.subscribe((state) => console.log("상태가 변경됨: ", state));
store.setState((state) => ({ count: state.count + 1 }));
```


<br>

#### react 코드

이제 react 코드를 살펴보자. zustand는 위의 스토어를 기반으로 리액트 컴포넌트에서 사용할 수 있도록 해준다. zustand v4부터는 react 부분의 코드가 **_use-sync-external-store_** 를 이용하여 구현되어 있다. **_createStore_** 함수로 만들어진 스토어인 api를 **_useSyncExternalStore_** 훅에서 사용하고 있는 것을 볼 수 있다.


```js
// react.ts
import { useDebugValue } from "react";
import useSyncExternalStoreExports from "use-sync-external-store/shim/with-selector";
import { createStore } from "./vanila";

const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;

function useStore(api, selector, equalityFn) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}

const createImpl = (createState) => {
  const api =
    typeof createState === "function" ? createStore(createState) : createState;

  const useBoundStore = (selector, equalityFn) =>
    useStore(api, selector, equalityFn);

  Object.assign(useBoundStore, api);

  return useBoundStore;
};

export const create = (createState) =>
  createState ? createImpl(createState) : createImpl;
```

<!-- v4 버전부터는 react 코드가 바뀌었는데 use-sync-external-store를 사용한다.  -->

<br>

### <a name="use-sync-external-store-work"></a>useSyncExternalStore란?

<hr>

**_useSyncExternalStore_** 는 **external store(외부 저장소)**를 구독할 수 있게 해주는 **React Hook**이다. 여기서 external store는 _redux/zustand store, DOM/Date_ 객체 등을 말한다. 전역 변수(global variable)도 **external store**가 될수있다. _props, context, useState, useReducer_ 는 **internal store**이다.

리액트 18부터는 **concurrent 렌더링**이 등장하면서, `startTransition` 과 같은 동시성 기능을 사용하는 경우 리액트가 렌더링을 잠시 일시 중지할 수 있게 되었다. 이를 통해 브라우저는 렌더링 중에 브라우저를 freeze하는 대신 중간에 이벤트를 처리할 수 있다. [(startTransition을 사용하여 블로킹 렌더링 문제를 해결하는 간단한 예시)](https://www.youtube.com/embed/focpJqfSu4k?start=15)

#### tearing이란

concurrent 렌더링은 훌륭하지만 external store에 의존하는 라이브러리의 경우 `tearing`이 발생할 수 있다는 문제가 있었다. tearing은 사용자가 볼 수 있는 시각적인 불일치를 말한다. 동일한 state에 대해 UI가 여러 값을 표시하는 것이다. concurrent 렌더링에서 tearing이 발생하는 과정을 동기(synchronous) 렌더링과 동시(concurrent) 렌더링의 차이를 통해 알아보자.


> #### 동기(synchronous) 렌더링

![sync](https://user-images.githubusercontent.com/48676844/212763061-0da135fb-74ff-491c-a2aa-1f3dfe4c30e6.png)

첫 번째 과정에서, React 트리 렌더링이 시작된다. external store에 접근해서 색상 값을 가져오는 컴포넌트에 도달하면, external store는 색상이 파란색이라고 알려주고 컴포넌트가 파란색으로 렌더링된다.

두 번째 과정에서, 리액트는 멈추지 않고 모든 컴포넌트를 계속 렌더링하므로 모든 컴포넌트가 external store에 있는 동일한 값을 가진다.

세 번째 과정에서, 모든 컴포넌트가 파란색으로 렌더링되고 모두 동일하게 보인다. UI는 항상 일관된 상태로 표시된다. 

마지막으로 네 번째 과정은, 스토어를 업데이트할 수 있는 과정이다. React 렌더링이 끝나고 다른 작업이 일어나도록 허용되기 때문이다. React가 렌더링되지 않을 때 스토어가 업데이트되면 다음에 React가 트리를 렌더링할 때 첫 번째 과정부터 다시 시작하고 모든 컴포넌트가 동일한 값을 갖게 된다.

<br>

> #### 동시(concurrent) 렌더링

![concurrent](https://user-images.githubusercontent.com/48676844/212763346-8cfaa27b-3213-44a5-9c03-06f329ff9914.png)

동시 렌더링에서는 React가 작업이 완료되기 전에 작업을 중지하고 급한 작업에 양보할 수 있다. 따라서 사용자는 블로킹 없이 페이지와 상호작용할 수 있다.

![concurrent](https://user-images.githubusercontent.com/48676844/212764423-120b232d-a8f2-4c55-9848-b31c78f5b92c.png)
 
그렇다면 두 번째 과정에서 만약 사용자가 스토어를 파란색에서 빨간색으로 변경하는 버튼을 누른다면 어떻게 될까? 처음 컴포넌트는 파란색이지만, 그 이후 렌더링되는 컴포넌트는 빨간색 값을 가져올 것이다.

그 결과 마지막 과정과 같이 빨간색과 파란색이 혼재된 상태가 되고 사용자는 시각적인 불일치를 보게 될 것이다. 이것이 **tearing**이다.

<br>

**_useSyncExternalStore_** 는 이러한 문제를 해결하기 위한 React 18의 새로운 훅이다. 이 훅은 기본적으로 두 개의 함수를 받는다. 

```js
useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

- `subscribe` :  스토어가 변경될때마다 호출되는 콜백 함수를 등록하는 (구독) 함수
- `getSnapshot` : 스토어의 현재 값을 반환하는 함수
- `getServerSnapshot` : 서버 렌더링 시 사용된 스냅샷을 반환하는 기능



<br>

#### useSyncExternalStore 사용 예시

간단한 예시를 통해 훅을 사용해 보자. 먼저 **_state_** 와 불변성을 유지하며 상태를 변경하는 _**setState, subscribe, getSnapshot**_ 함수가 있는 **store**를 만든다. 그리고 두 함수를 통해 **_useSyncExternalStore_** 훅을 사용하면 된다.

```js
 const store = {
  state: { count: 0 },
  setState: (fn) => {
    store.state = fn(store.state); // requires immutable update
    store.listeners.forEach((listener) => listener());
  },
  listeners: new Set(),
  subscribe: (callback) => {
    store.listeners.add(callback);
    return () => store.listeners.delete(callback);
  },
  getSnapshot: () => {
    const snap = Object.freeze(store.state); // freeze is optional
    return snap;
  },
};

function App() {
  const snap = useSyncExternalStore(store.subscribe, store.getSnapshot);

  return (
    <>
      <div>{snap.count}</div>
      <button
        onClick={() => store.setState((state) => ({ count: state.count + 1 }))}
      >
        증가
      </button>
    </>
  );
}

export default App;

```

증가 버튼을 누를때마다 count 상태가 잘 변경되는 것을 볼 수 있다.


<br>

#### use-sync-external-store

**_useSyncExternalStore_** 훅은 **React 18**에서만 사용 가능하기 때문에, 마이그레이션을 위해 [use-sync-external-store](https://www.npmjs.com/package/use-sync-external-store)라는 별도의 패키지도 제공한다. 

위에서 봤던 zustand의 react 코드에서 사용된 `useSyncExternalStoreWithSelector` 는 패키지에서 제공되는 유틸리티 훅이다. 네 번째 인자로 **_selector_** 함수를 옵셔널로 받고, **_getSnapshot_** 결과를 자동으로 메모이제이션하는 기능을 지원한다.

v4.0.0 이전 버전의 zustand react 코드는 **_useEffect, useLayoutEffect, useReducer_** 등을 이용하여 구현되어 있다. 해당 코드에 대한 [toast 기술 블로그 글](https://ui.toast.com/weekly-pick/ko_20210812)도 있으므로 참고해 보면 좋을 것 같다.


<br>

### Reference

- https://github.com/pmndrs/zustand
- https://reactjs.org/blog/2022/03/29/react-v18.html
- https://github.com/reactwg/react-18/discussions/69
- https://github.com/reactwg/react-18/discussions/86
- [React Conf 2021: React 18 for External Store Libraries](https://youtu.be/oPfSC5bQPR8)
