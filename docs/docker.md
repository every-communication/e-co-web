# Docker 패키지 사용 방법

[e-co-web docker package 주소](https://github.com/every-communication/e-co-web/pkgs/container/e-co-web)

## 선행해야하는 내용

### docker desktop 다운로드

- [windows](https://docs.docker.com/desktop/install/windows-install/)
- [mac](https://docs.docker.com/desktop/install/mac-install/)

### docker ghcr.io 로그인

```sh
docker login ghcr.io -u {username} --password {github password}
```

## 실행 방법

### 이미지 불러오기

```sh
docker pull ghcr.io/every-communication/e-co-web
```

### 컨테이너 띄우기

실행 이후 localhost:3000을 통해 접근 가능하다.

```sh
docker run -d -p 3000:3000 --name e-co-web ghcr.io/every-communication/e-co-we
```
