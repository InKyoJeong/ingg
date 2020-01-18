---
title: How to write a Commit Message
date: "2020-01-14T18:18:37.121Z"
description: This style guide acts as the official guide to follow in your projects. Udacity evaluators will use this guide to grade your projects. There are many opinions on the "ideal" style in the world of development. Therefore, in order to reduce the confusion on what style students should follow during the course of their projects, we urge all students to refer to this style guide for their projects.
---

커밋 메세지 제목은 타입 라벨을 앞에 붙여 `타입(Type): 제목` 형식으로 작성한다.

- **feat**: 새로운 기능
- **fix**: 버그 수정
- **docs**: 문서 수정
- **style**: 코드 포맷 변경, 세미 콜론 누락, 코드 변경 없음
- **refactor**: 프로덕션 코드 리팩터링
- **test**: 테스트 추가, 테스트 리팩터링 (프로덕션 코드 변경 없음)
- **chore**: 빌드 테스크 업데이트, 패키지 매니저 설정할 경우 (프로덕션 코드 변경 없음)

제목은 50자 이내이며, 대문자로 시작하고 마지막에 마침표 `.`를 붙이지 않는다.
**"Changed"**, **"Fixed"** 등 과거형이 아닌 **"Change"**, **"Fix"**와 같이 명령문으로 시작한다.

예시 1) `docs: Edit README.md to include ...`<br>
예시 2) `feat: Summarize changes in around 50 characters or less`

### Reference

> [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/) 를 참고하여 번역한 글입니다.
