# Extract pnpm version from package.json
FROM alpine:3.19 AS pnpm-version

WORKDIR /tmp

COPY package.json .

RUN apk add --no-cache jq

RUN jq -r .packageManager package.json > pnpm-version.txt

ENTRYPOINT ["sh"]

FROM node:21-alpine3.19 AS base

LABEL authors="suddenlyGiovanni"

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /home/node/

COPY --from=pnpm-version /tmp/pnpm-version.txt .

RUN corepack enable

RUN corepack prepare $(cat pnpm-version.txt) --activate

RUN rm pnpm-version.txt

ENTRYPOINT ["sh"]

FROM base AS builder

RUN pnpm add --global turbo

COPY . .

RUN turbo prune --docker @suddenly-giovanni/web

ENTRYPOINT ["sh"]

FROM base AS build

COPY .gitignore .gitignore

COPY .npmrc .npmrc

COPY --from=builder /home/node/out/json/ .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod=false

# Build the project
COPY --from=builder /home/node/out/full/ .

ENV NODE_ENV production

RUN pnpm turbo build --filter=@suddenly-giovanni/web

RUN pnpm --filter @suddenly-giovanni/web --prod deploy pruned

ENTRYPOINT ["sh"]

FROM base AS production

ENV NODE_ENV production

COPY --from=build --chown=node:node /home/node/pruned .
COPY --from=build --chown=node:node /home/node/apps/web/build ./build

USER node

EXPOSE 3000

CMD ["./node_modules/.bin/remix-serve", "./build/server/index.js"]
