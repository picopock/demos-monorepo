FROM harbor.zen5ops.com/zchatim/node:20-alpine as assetsBuilder

ENV HOME /home/app

WORKDIR ${HOME}

COPY . .

RUN npm install -g pnpm && \
    pnpm install && \
    pnpm run build && \
    mv ./node_modules/ ./dist/ && \
    cp -r .husky ./package.json ./pnpm-lock.yaml ./tsconfig.json ./pm2.*.json .npmrc CHANGES.txt ./dist/

FROM harbor.zen5ops.com/zchatim/node:20-alpine

ENV NPM_CONFIG_LOGLEVEL info
ENV HOME /home/app

WORKDIR ${HOME}

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories && \
    apk --no-cache add curl ca-certificates && \
    addgroup -S app && \
    adduser -S -g app app

COPY --from=assetsBuilder ${HOME}/dist ${HOME}/

CMD ["pnpm", "run", "pm2:ms"]
