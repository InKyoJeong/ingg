---
title: "[React Native] 합성 컴포넌트로 재사용성 높이기"
tags: ["reactnative"]
date: 2023-05-26 22:47:11
---

![rn](../rn-deploy/images/rn.png)

옵션 선택을 위한 Modal을 구현하면서 합성 컴포넌트 패턴을 사용해보았다. 비슷한 새로운 컴포넌트가 필요해지더라도 컴포넌트들을 조합하여 빠르게 구현할 수 있었고 컴포넌트의 재사용성을 높일 수 있었다.

---

### 📌 Contents

1. [옵션 Modal과 문제점](#option-modal)
2. [합성 컴포넌트 도입](#compound-pattern)
3. [도입 결과](#result)

---

<br>

### <a name="option-modal"></a>옵션 Modal과 문제점

<hr>

먼저 최초에 구현하고자 하는 옵션 형태의 Modal은 아래와 같았다. 처음에는 아래와 같이 버튼 한개, 최대 두개까지만 사용될것이라고 생각하여 OneButtonOption, TwoButtonOption과 같이 컴포넌트를 만들어 사용하려고 했다.

<br>

![option-modal](https://github.com/InKyoJeong/TIL/assets/48676844/860e8f18-ac95-4aba-ad27-6b4d74695930)

<br>

```tsx
function TwoOptionModal({ isVisible, hideOption }) {
  const handleOuterClick = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideOption();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={hideOption}
    >
      <View style={styles.background} onTouchEnd={handleOuterClick}>
        <View style={styles.container}>
          <View>
            <Text>옵션1</Text>
          </View>
          <View>
            <Text>옵션1</Text>
          </View>
        </View>
        <View>
          <Text>닫기</Text>
        </View>
      </View>
    </Modal>
  );
}
```

<br>

이렇게 OneOptionModal, TwoOptionModal 두개를 만들어 사용하거나, props를 받아 조건부 렌더링으로 처리하여 하나의 컴포넌트로 만들어도 될것 같다.

하지만 만약 사용하는 옵션 버튼이 많아진다면 어떻게 해야할까? 그리고 버튼이 아니라 제목, 체크박스 등 다른 형태의 컴포넌트가 추가된다면 어떻게 해야할까라는 고민이 생겼다. 실제로도 새로운 기능과 화면이 추가되면서 다른 형태의 옵션이 필요해졌다.

<br>

### <a name="compound-pattern"></a>합성 컴포넌트 도입

<hr>

그래서 합성 컴포넌트를 도입해보았다. 합성 컴포넌트 패턴은 하나의 컴포넌트를 여러 집합체로 분리하고, 이를 조합하여 사용하는 패턴이다. 기본 태그인 `<select>`와 `<option>` 태그도 합성 컴포넌트 패턴에 해당한다.

```html
<select>
  <option value="value1">key1</option>
  <option value="value2">key2</option>
  <option value="value3">key3</option>
</select>
```

<br>

#### 메인 컴포넌트 구현

먼저 메인 컴포넌트를 구현했다. children으로 들어오는 서브 컴포넌트들을 묶어서 사용하도록 하는 역할을 한다.

```tsx
interface OptionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideOption: () => void;
  animationType?: ModalProps["animationType"];
}

function OptionMain({
  children,
  isVisible,
  hideOption,
  animationType = "slide",
  ...props
}: OptionMainProps) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animationType}
      onRequestClose={hideOption}
      {...props}
    >
      {children}
    </Modal>
  );
}
```

<br>

#### 서브 컴포넌트 구현

그리고 메인 컴포넌트 내부에서 조합하여 사용할 서브 컴포넌트들을 구현했다.

```tsx{1,5,18,27}
function Container({ children }: PropsWithChildren) {
  return <View style={styles.optionContainer}>{children}</View>;
}

function Title({ children }: PropsWithChildren) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
}

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isChecked?: boolean;
}

function Button({ children, isChecked = false, ...props }: ButtonProps) {
  return (
    <Pressable {...props}>
      <Text>{children}</Text>
      {isChecked && <Icon name="checkmark" />}
    </Pressable>
  );
}

function Divider() {
  return <View style={styles.border} />;
}
```

<br>

#### Context로 로직 공유

컴포넌트가 공유할 로직이 있다면 Context와 Provider를 이용하여 공유할 수 있다. 만약 onClickOutSide라는 함수를 내부에 공유하려면 Provider를 이용하여 전달하고, 사용하는 컴포넌트에서는 useContext를 이용하면 된다.

```tsx{35-37}
interface OptionContextValue {
  onClickOutSide?: (event: GestureResponderEvent) => void;
}

const OptionContext = createContext<OptionContextValue | undefined>(undefined);

interface OptionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideOption: () => void;
  animationType?: ModalProps["animationType"];
}

function OptionMain({
  children,
  isVisible,
  hideOption,
  animationType = "slide",
  ...props
}: OptionMainProps) {
  const onClickOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideOption();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animationType}
      onRequestClose={hideOption}
      {...props}
    >
      <OptionContext.Provider value={{ onClickOutSide }}>
        {children}
      </OptionContext.Provider>
    </Modal>
  );
}
```

```tsx{2}
function Background({ children, dimmed = true }: BackgroundProps) {
  const optionContext = useContext(OptionContext);

  return (
    <SafeAreaView onTouchEnd={optionContext?.onClickOutSide}>
      {children}
    </SafeAreaView>
  );
}
```

<br>

#### 합성 컴포넌트 사용

그리고 구현한 합성 컴포넌트를 묶어서 export 하여 사용한다.

```tsx
export const CompoundOption = Object.assign(OptionMain, {
  Background,
  Container,
  Title,
  Button,
  Divider,
  Card,
});

// 사용
<CompoundOption>
  <CompoundOption.Button>버튼</CompoundOption.Button>
</CompoundOption>;
```

<br>

### <a name="result"></a>도입 결과

<hr>

이제 옵션 버튼 개수나 위치가 변경되거나 다른형태가 필요하더라도 쉽게 서브 컴포넌트 들을 조합하여 사용할 수 있게 되었다.

```tsx
<CompoundOption>
  <CompoundOption.Background>
    <CompoundOption.Container>
      <CompoundOption.Button>라이트 모드</CompoundOption.Button>
      <CompoundOption.Divider />
      <CompoundOption.Button>다크 모드</CompoundOption.Button>
      <CompoundOption.Divider />
      <CompoundOption.Button isChecked>시스템 기본값</CompoundOption.Button>
    </CompoundOption.Container>

    <CompoundOption.Container>
      <CompoundOption.Button>취소</CompoundOption.Button>
    </CompoundOption.Container>
  </CompoundOption.Background>
</CompoundOption>
```

![compound](https://github.com/InKyoJeong/TIL/assets/48676844/a3a80d21-16db-41ab-91fd-27a56899d23f)

<br>

또한 합성 컴포넌트로 만들어두었더니 아래와 같이 디자인은 비슷하지만 조금 더 복잡한 컴포넌트를 구현할때도 유용했다. **_CheckBox, Filter_** 서브 컴포넌트만 추가하여 새로운 디자인 변경사항을 바로 반영할 수 있다.

<center>
<img  alt="filter" src=" https://github.com/InKyoJeong/TIL/assets/48676844/4c9d9b09-ba63-4ce5-bd88-2b1633a2d487"></center>

<br>

<br>

이렇게 합성 컴포넌트 패턴을 사용해서 옵션 Modal 형태의 컴포넌트를 구현한 결과 기존과 비교하면 좀 더 변경에 유연한 컴포넌트를 만들 수 있었고, 비슷한 디자인에서 요구사항이 달라지는 컴포넌트를 어떻게 구현해야할까 고민했던 문제를 해결할 수 있어서 좋았다.

<br>

#### Reference

- https://fe-developers.kakaoent.com/2022/220731-composition-component/
