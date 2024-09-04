ARG NODE_VERSION=20.13.1

FROM node:${NODE_VERSION}

LABEL maintainer="rldnd <gi981226@gmail.com>"
LABEL description="e-co"
LABEL license="MIT"
LABEL org.opencontainers.image.source https://github.com/every-communication/e-co-web

EXPOSE 3000

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

CMD ["pnpm", "dev"]