# Mohaji-server


## Intro

아래의 API 문서를 참고해 주세요.

(현재 수정해야 할 부분들이 있습니다. 확인되지 않는 부분은 연락 주세요.)
https://app.gitbook.com/@fbworkd4943/s/mohaji/#user-info

## Before Start

1. `npm install` 을 통해서 의존성 모듈을 설치 합니다.
2. `.env.example` 파일을 참고해서 필요한 부분을 작성해 주세요.

## DB 연결

1. 데이터 베이스와 연결을 진행해 주세요.
 - `npx sequelize-cli db:create`
 - `npx sequelize-cli db:migrate`
 2. tags 테이블(모델)에 tag가 미리 작성되어 있어야 회원가입을 테스트 할수 있습니다.
  - 직접 tags 테이블에 몇가지 tag를 작성해 주시거나
  - Postman을 사용해서 POST 요청으로 추가도 가능합니다.
 
 ex) `POST`  http://localhost:4000/spot/taginfo 

```
    {
       "tag_name": "보드게임"
    }
 ```

