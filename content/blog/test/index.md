---
title: Code Test
date: "2020-01-14T18:18:37.121Z"
---

This is a Test.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>테스트</title>

    <style type="text/css">
      .red {
        background: rgb(235, 51, 51);
      }
    </style>
  </head>
  <body>
    <button>CLICK ME</button>

    <script type="text/javascript" src="./toggle.js"></script>
  </body>
</html>
```

- JS

```js
const button = document.querySelector("button")

button.addEventListener("click", function() {
  document.body.classList.toggle("red")
})
```
