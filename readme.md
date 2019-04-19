elm 파 볼 시간이 안되서 만드는 eoshub UI 전용 저장소입니다.

--------------------------------------------------------------------------------

# 환경설정

macos 기준으로 설명합니다.

```
brew install imagemagick --with-ghostscript
npm install gulp -g
npm install --save
```

--------------------------------------------------------------------------------


# 실행

로컬에서 실행해볼떄
```
gulp local
```

개발된 ui를 github pages에서 확인
```
gulp deploy
```


--------------------------------------------------------------------------------

# extra

## bp list의 imagesprite 처리
```
gulp makeSprite
```

## ruby에서 사용하는 popup sass 파일의 별도 생성
```
gulp make:popupStyleForRuby
```

--------------------------------------------------------------------------------


# 개발한 이미지를 eoshub.io와 싱크시킬때

처리된 asset을 저장소끼리 복사합니다.

``` bash
# 스타일시트와 이미지 파일을 복사함
cp -rf ~/workspace/ui.eoshub/src/stylesheets   ~/workspace/eoshub.io/app/frontend/src/
cp -rf ~/workspace/ui.eoshub/src/image ~/workspace/eoshub.io/app/frontend/src

# 팝업용 스타일시트를 루비로 추가함
cp  ~/workspace/ui.eoshub/deploy/css/popup.scss ~/workspace/eoshub.io/app/assets/stylesheets
```

------------------------------------------------------------

## trouble shotting

`ReferenceError: internalBinding is not defined` 이란 에러가 발생할 경우 natives 모듈을 수동으로 업그레이드 해줍니다.

```
❯ npm install natives@1.1.6
```


