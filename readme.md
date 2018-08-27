elm 파 볼 시간이 안되서 만드는 eoshub UI 전용 저장소입니다.

# 환경설정

> npm install gulp -g
> npm install --save

--------------------------------------------------------------------------------

# 실행

로컬에서 실행해볼떄
> gulp local

개발된 ui를 github pages에서 확인
> gulp deploy

--------------------------------------------------------------------------------

# 개발한 이미지를 eoshub.io와 싱크시킬때

``` bash
❯ cp -rf ~/workspace/ui.eoshub/src/stylesheets   ~/workspace/eoshub.io/app/frontend/src/
❯ cp -rf ~/workspace/ui.eoshub/src/image ~/workspace/eoshub.io/app/frontend/src
```
