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

RUN corepack enable \
    && corepack prepare $(cat pnpm-version.txt) --activate \
    && rm pnpm-version.txt

ENTRYPOINT ["sh"]

FROM base AS builder

RUN pnpm add --global turbo

COPY . .

RUN turbo prune --docker @suddenly-giovanni/web

ENTRYPOINT ["sh"]

FROM base AS build

# pnpm fetch does require only lockfile + .npmrc
COPY --from=builder /home/node/out/json/pnpm-lock.yaml .
COPY --from=builder /home/node/out/json/.npmrc .

# Fetch packages from a lockfile into virtual store, package manifest is ignored.
RUN pnpm fetch

# Build the project
COPY --from=builder /home/node/out/full/ .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --offline --prod=false

ENV NODE_ENV="production"

RUN pnpm turbo build --filter=@suddenly-giovanni/web

RUN pnpm --filter @suddenly-giovanni/web --prod deploy pruned

ENTRYPOINT ["sh"]

FROM base AS production

ENV NODE_ENV="production"
ENV PORT="5173"
ENV HOST="0.0.0.0"

COPY --from=build --chown=node:node /home/node/pruned .
COPY --from=build --chown=node:node /home/node/apps/web/build ./build

USER node

EXPOSE 5173

CMD ["./node_modules/.bin/remix-serve", "./build/server/index.js"]
