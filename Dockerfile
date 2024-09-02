ARG NODE_VERSION=20.13.1

FROM node:${NODE_VERSION}

EXPOSE 3000

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

CMD ["pnpm", "dev"]