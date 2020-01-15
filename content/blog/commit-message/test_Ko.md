---
title: How to write a Commit Message
date: "2020-01-15T18:18:37.121Z"
description: This style guide acts as the official guide to follow in your projects. Udacity evaluators will use this guide to grade your projects. There are many opinions on the "ideal" style in the world of development. Therefore, in order to reduce the confusion on what style students should follow during the course of their projects, we urge all students to refer to this style guide for their projects.
---

커밋 메시지 제목은 `docs: Edit README.md to include New Features` 와 같이 작성한다.

제목 : 타입 라벨을 맨 앞에 붙여 `타입(Type): 제목` 형식으로 작성

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 수정한 경우
- **style**: 코드 포맷 변경, 세미 콜론 누락, 코드 변경 없음
- **refactor**: 프로덕션 코드 리팩터링
- **test**: 테스트 추가, 테스트 리팩터링 (프로덕션 코드 변경 없음)
- **chore**: 빌드 테스크 업데이트, 패키지 매니저 설정할 경우 (프로덕션 코드 변경 없음)

제목의 처음은 동사 원형으로 시작하고 첫 글자는 대문자로 작성한다. "Fixed", "Added", "Changed" 등 과거 시제가 아닌 "Fix", "Add", "Change"로 명령어로 시작한다. 총 글자 수는 50자 이내며 마지막에 마침표`.`를 붙이지 않는다.

### Reference

> [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/) 를 참고하여 번역한 글입니다.
