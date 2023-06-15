---
title: "[React Native] CodePush 도입으로 빠른 업데이트 배포하기"
tags: ["reactnative"]
date: 2023-06-15 05:52:09
description: "CodePush를 도입하여 빠르게 사용자에게 업데이트 버전을 배포해보자."
---

![rn](../rn-deploy/images/rn.png)

---

### 📌 Contents

1. [기존의 배포 프로세스](#before)
1. [CodePush 설정하기](#codepush-setting)
1. [CodePush 배포하기](#codepush-distribute)
1. [도입 결과](#after)

---

<br>

### <a name="before"></a>기존의 배포 프로세스

<hr/>

리액트 네이티브를 이용하여 앱을 개발하면 두 가지 플랫폼을 동시에 개발할 수 있지만 빌드 및 배포, 심사까지의 과정은 따로 진행하게 된다. 이때 심사 과정은 몇 시간이 될 수도 있고, 길게는 며칠이 걸릴 수도 있다.

수정사항이나 버그가 발생하여 빠르게 앱을 배포해야 하더라도 심사 대기 중인 앱을 기다릴 수밖에 없는 것은 정말 답답한 상황이다. 일반적으로 Fastlane 같은 배포 자동화의 경우를 제외하고 배포 프로세스는 다음과 같다.

![before-deploy](https://github-production-user-asset-6210df.s3.amazonaws.com/48676844/245931339-9ad4496b-d52c-4e2b-b57e-729ea27d561a.png)

빌드/배포 과정도 단순하지 않다. 빌드에 걸리는 시간과 배포를 위한 Archive 작업, Connect 업로드, 처리되는 시간을 거친 후에야 심사 제출이 가능하다. 작은 수정에도 이렇게 배포하고 기다려야만 하는 문제를 해결하기 위해 CodePush를 도입하게 되었다.

<br>

### <a name="codepush-setting"></a>CodePush 설정하기

<hr/>

CodePush 설정을 위해서는 **_microsoft_** 의 **_react-native-code-push_** 라이브러리를 설치하고, Readme를 참고하여 적용할 플랫폼에 따라 네이티브 코드 Setup을 진행하면된다.

```bash
$ npm install --save react-native-code-push
# or
$ yarn add react-native-code-push
```

이때 Readme나 검색을 통해 설정하는 것보다는 [appcenter 공식 문서](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-get-started)를 따라 설정하는 것이 좋다. 불과 3일 전에 수정된 것을 보면 문서가 자주 최신화되는 것 같다.

그리고 [appcenter](https://appcenter.ms/)에 가입하여 플랫폼에 따라 새 앱을 생성한다. 앱을 생성하면 플랫폼에 따라 Overview 항목에 네이티브 설정 절차가 나와있다. 여기서도 설정할 부분이 많으므로 차례대로 잘 설정해야 한다.

문서를 따라 코드 설정이 끝났다면, 글로벌로 **_appcenter-cli_** 를 설치한다. 설치후에 `appcenter login`을 입력하면 브라우저가 열리는데 해당 키를 복사하여 입력하면 된다.

```bash
$ npm i -g appcenter-cli
```

<br/>

로그인 후에는 `appcenter codepush deployment list -a <ownerName>/<appName> -k` 명령어로 **_Deployment Key_** 를 생성할 수 있다. ownerName과 appName은 appcenter에서 생성한 앱에따라 설정하면 된다. 생성한 키는 android의 경우 **_strings.xml_** 에, ios는 **_Info.plist_** 에 넣어준다.

![key](https://github-production-user-asset-6210df.s3.amazonaws.com/48676844/245936405-2cf2b901-3aed-4fa3-820d-12fedccd7448.png)

이때 Key가 빈값으로 표시된다면 **_AppCenter -> 생성한 앱 -> Distribute -> CodePush로 가서 [Create standard deployments]_** 를 클릭한다.

<br>

### <a name="codepush-distribute"></a>CodePush 배포하기

<hr/>

#### CodePush 적용

모든 설정이 끝났다면, CodePush를 적용해서 배포하는 것은 간단하다. App을 Codepush로 감싸기만 하면 적용된다.

```tsx{11}
import CodePush from "react-native-code-push";

function App() {
  return (
    <Provider>
      <RootNavigator />
    </Provider>
  );
}

export default CodePush(App);
```

옵션을 지정하여 업데이트 방식을 설정할 수도 있다.

```tsx
const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.언제체크할지설정,
  installMode: CodePush.InstallMode.설치모드설정,
  mandatoryInstallMode: CodePush.InstallMode.설치모드설정,
};

function App() {
  //...
}

export default CodePush(codePushOptions)(App);
```

<br>

#### 사용자 경험 개선

위와 같이 옵션을 지정하여 사용하다 보면, 사용자가 앱을 사용하는 도중에 갑자기 업데이트가 진행되고 재실행될 수 있다. 따라서 hasUpdate 상태를 이용하여 업데이트가 있는지 체크하고 코드 푸시를 동기적으로 실행하여 업데이트가 완료되면 첫 화면을 띄우도록 했다.

```tsx
const [hasUpdate, setHasUpdate] = useState(true);
const [syncProgress, setSyncProgress] = useState<DownloadProgress>();

useEffect(() => {
  const checkCodePush = async () => {
    try {
      if (업데이트 존재) {
        update
          .download((progress: DownloadProgress) => setSyncProgress(progress))
          .then((newPackage: LocalPackage) =>
            newPackage
              .install(CodePush.InstallMode.IMMEDIATE)
              .then(() => CodePush.restartApp())
          );
        return;
      }

      setHasUpdate(false);
    } catch {
      setHasUpdate(false);
    }
  };

  checkCodePush();
}, []);
```

<br>

그리고 DownloadProgress 값을 이용하여 progressBar 형태로 진행 상황을 시각적으로 보여줌으로써 좀 더 나은 사용자 경험을 제공하도록 했다.

```tsx{14-16}
interface SyncProgressViewProps {
  syncProgress: DownloadProgress;
}

function SyncProgressView({ syncProgress }: SyncProgressViewProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>안정적인 서비스 사용을 위해 내부 업데이트를 진행합니다.</Text>
        <Text>재시작까지 잠시만 기다려주세요.</Text>
        <View style={{ width: deviceWidth }}>
          <View
            style={{
              width:
                (syncProgress.receivedBytes / syncProgress.totalBytes) *
                deviceWidth,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
```

<br>

#### 배포와 버저닝

이제 **_appcenter codepush release-react_** 명령어로 배포하면 되는데, **_package.json_** 에 명령어를 설정해서 배포할때 사용하면 간편하다.

```
"codepush:android": "appcenter codepush release-react -a <username>/<appname> -d Staging",
"codepush:ios": "appcenter codepush release-react -a <username>/<appname> -d Staging"
```

이때 [다양한 옵션](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/cli#releasing-updates-react-native)을 지정할 수 있는데, `-t` 옵션을 이용하면 **_binary target version_** 을 지정할 수 있다. 예를 들어 `-t 1.4`를 지정하면 **1.4** 버전이 타겟이 된다.

버전 혼동을 피하기 위해 스토어를 통한 업데이트는 minor 버전을 올리고, 코드 푸시를 이용한 업데이트는 이 옵션을 사용하여 patch로 구분하여 업데이트하고 있다.

<br>

#### CodePush 배포

명령어를 실행하고 성공했다면, appcenter의 CodePush -> Staging 모드에 새로운 버전이 생성되는 것을 볼 수 있다.

![staging](https://github-production-user-asset-6210df.s3.amazonaws.com/48676844/245946394-39739f4a-317b-40ac-be08-5d936b935bcc.png)

이상이 없다면 appcenter에서 Staging 모드를 Production으로 승격시키면 된다. 배포할 버전을 누르고 Production을 지정한다. 이제 해당 코드 푸시에 영향을 받는 사용자들에게 즉각적인 업데이트가 가능하다.

![production](https://github-production-user-asset-6210df.s3.amazonaws.com/48676844/245946745-c5ac4543-050e-42c9-81a1-0f91ddcab3f3.png)

<br>

### <a name="after"></a>도입 결과

<hr/>

이제 CodePush를 통해 길었던 빌드/배포/심사 과정을 거치지 않아도 되고, 빠르게 수정해야 하는 코드가 있다면 바로 반영할 수 있게 되었다. 배포 프로세스는 이렇게 바뀌었다.

![after](https://github-production-user-asset-6210df.s3.amazonaws.com/48676844/245949023-c1e4c7f6-5e5e-4d8d-a374-0534d4653791.png)

<br>

물론 CodePush가 만능은 아니다. js단의 변경 사항만 반영 가능하며 네이티브 코드 변경 시에는 스토어를 통해 배포해야 한다.

또한 CodePush를 통한 업데이트만 진행하고 스토어 배포를 하지 않는다면, 신규 사용자는 스토어에서 다운로드한 후 다시 첫 실행에 CodePush 업데이트도 해야 한다는 단점이 있다. 따라서 스토어를 통한 출시도 주기적으로 진행하는 것이 좋을 것 같다.
