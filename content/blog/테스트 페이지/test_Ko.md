---
title: 커밋메세지 작성법 (Test Page)
date: "2020-01-15T18:18:37.121Z"
description: How to write Commit Message
---

커밋 메시지 제목은 `docs: Edit README.md to include New Features Use-Cases` 와 같이 작성한다.

제목은 타입 라벨을 맨 앞에 붙여 `타입(Type): 제목` 형식으로 작성

**feat**: 새로운 기능을 추가할 경우<br>
**fix**: 버그를 고친 경우<br>
**docs**: 문서 수정한 경우<br>
**style**: 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우<br>
**refactor**: 프로덕션 코드 리팩터링<br>
**test**: 테스트 추가, 테스트 리팩터링 (프로덕션 코드 변경 없음)<br>
**chore**: 빌드 테스크 업데이트, 패키지 매니저 설정할 경우 (프로덕션 코드 변경 없음)<br>

제목의 처음은 동사 원형으로 시작하고 첫 글자는 대문자로 작성한다. "Fixed", "Added", "Changed" 등 과거 시제가 아닌 "Fix", "Add", "Change"로 명령어로 시작한다. 총 글자 수는 50자 이내며 마지막에 마침표`.`를 붙이지 않는다.

### Reference

- https://udacity.github.io/git-styleguide/
