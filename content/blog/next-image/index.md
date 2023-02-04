---
title: "[React] Next.js 이미지컴포넌트와 이미지최적화"
tags: ["react"]
date: 2022-12-19 19:09:98
---

![next](./images/next.png)

**Next**의 이미지컴포넌트 `next/image`는 아래와 같은 다양한 성능 최적화 기능을 제공한다.

- 향상된 성능: 최신 이미지 형식을 사용하여 각 디바이스에 대한 올바른 크기의 이미지 제공
- 시각적 안정성: 자동으로 **layout shift** 방지
- 빠른 페이지 로드: 이미지가 뷰포트에 들어갈 때만 로드되며 **placeholder** 제공
- 유연성: 원격 서버에 저장된 이미지에 대해서도 온디맨드 이미지 크기 조정

<br>

### next/image 사용하기

<hr />

**Next**에서 `img` 태그를 사용하면 아래와 같은 경고가 나온다.

```
Do not use `<img>` element. Use `<Image />` from `next/image` instead. See: https://nextjs.org/docs/messages/no-img-element
```

**_layout shift_** 를 방지하고 이미지를 최적화하기 위해 `'next/image'`의 `Image`를 사용해야한다.

<br>

### local 이미지

<hr />

local 이미지를 사용하는 경우 `.jpg, .png, .webp` 파일을 이용한다. 로컬이미지는 **width/height**를 지정하지 않아도 import된 파일 기반으로 next가 결정한다.

```js
import Image from 'next/image'
import profilePic from '../public/me.png'

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src={profilePic}
        alt="Picture of the author"
        // width={500} automatically provided
        // height={500} automatically provided
     />
//...
```

<br>

#### Optional blur-up placeholder

local 이미지의 경우 `placeholder='blur'` 속성을 지정하면, 이미지가 로드되는 동안 작은 사이즈의 blur 이미지를 미리 로딩하여 보여줄 수 있다.

```js
import TreeImage from "../public/tree.jpg";

//...

<Image src={TreeImage} alt="tree" placeholder="blur" />;
```

<br>

![blur](https://user-images.githubusercontent.com/48676844/208404235-c74454e3-9ce5-444e-bc50-343c51e96e2f.gif)

<br>

### remote 이미지

<hr />

remote 이미지인 경우 next는 빌드 프로세스 중에 원격 파일에 액세스할 수 없으므로, **_width/height_** 속성을 지정해주어야 한다. 또한 **_placeholder_** 로 **_blur_** 이미지를 사용하고 싶은 경우 별도로 `blurDataURL` 속성에 **base64**로 인코딩된 이미지 데이터를 작성해야 한다.

```js
<Image src="/me.png" alt="Picture of the author" width={500} height={500} />
```

<br>

### Next/Image를 적용하며 발생한 이슈

<hr />

#### Invalid src prop [https://...] on `next/image`, hostname "xxx" is not configured 에러

remote 이미지를 로드하는 과정에서 다음과 같은 에러가 발생한다면, **_next.config.js_** 파일에서 `images.remotePatterns` 의 _protocol, hostname, port, pathname_ 을 설정한뒤 next 서버를 재시작해야한다.

```
Error: Invalid src prop [https://xxx] on `next/image`, hostname "xxx" is not configured under images in your `next.config.js`

See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
```

```js
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xxx",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
module.exports = nextConfig;
```

<br>

#### storybook

storybook을 사용중에 동일한 에러가 발생했는데, **addon** 을 이용하여 해결할 수 있었다. _**storybook-addon-next**_ 를 설치하고 **_main.js_** 의 **_addon_** 내에 다음과 같이 설정한다.

```bash
$ npm install --save-dev storybook-addon-next
```

```js
// .storybook/main.js
const path = require("path");

module.exports = {
  // ...
  addons: [
    // ...
    {
      name: "storybook-addon-next",
      options: {
        nextConfigPath: path.resolve(__dirname, "../next.config.js"),
      },
    },
    // ...
  ],
};
```

<br>

### Priority

<hr />

`priority` **property**를 추가하면 next가 로드할 이미지의 우선순위를 지정하여 [LCP](https://web.dev/lcp/#what-elements-are-considered) 를 향상시킬 수 있다.

```js
<Image
  src="/me.png"
  alt="Picture of the author"
  width={500}
  height={500}
  priority
/>
```

<br>

#### reference

https://nextjs.org/docs/basic-features/image-optimization
https://nextjs.org/docs/messages/no-img-element#why-this-error-occurred
https://nextjs.org/docs/messages/next-image-unconfigured-host
https://storybook.js.org/addons/storybook-addon-next
