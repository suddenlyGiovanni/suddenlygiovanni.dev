# Extract pnpm version from package.json
FROM alpine:3.21 AS pnpm-version

WORKDIR /tmp

COPY package.json .

RUN apk add --no-cache jq

RUN jq -r .packageManager package.json > pnpm-version.txt


FROM node:23.7-alpine3.21 AS base

LABEL authors="suddenlyGiovanni"

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /home/node/

COPY --from=pnpm-version /tmp/pnpm-version.txt .

RUN corepack enable \
    && corepack prepare $(cat pnpm-version.txt) --activate \
    && rm pnpm-version.txt


FROM base AS builder

# Add build argument for GitHub token
ENV TURBO_FORCE=true
ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1

COPY . .

RUN pnpm dlx turbo prune --docker "@suddenly-giovanni/web"


FROM base AS build

ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1

# pnpm fetch does require only lockfile + .npmrc
COPY --from=builder /home/node/out/json/pnpm-lock.yaml .
COPY --from=builder /home/node/out/json/.npmrc .

# Fetch packages from a lockfile into virtual store, package manifest is ignored.
RUN pnpm fetch

# Build the project
COPY --from=builder /home/node/out/full/ .

RUN cd ./apps/web

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod=false

ENV NODE_ENV="production"

RUN pnpm exec turbo build --filter=@suddenly-giovanni/web

RUN pnpm --filter @suddenly-giovanni/web --prod --no-optional deploy pruned


FROM base AS production

ENV NODE_ENV="production"
ENV PORT="5173"
ENV HOST="0.0.0.0"

COPY --from=build --chown=node:node /home/node/pruned/package.json .
COPY --from=build --chown=node:node /home/node/pruned/node_modules ./node_modules
COPY --from=build --chown=node:node /home/node/apps/web/server ./server
COPY --from=build --chown=node:node /home/node/apps/web/build ./build
COPY --from=build --chown=node:node /home/node/apps/web/react-router.config.ts ./react-router.config.ts

USER node

EXPOSE 5173

CMD ["node", "--experimental-transform-types", "server/server.ts"]
