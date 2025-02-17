# Extract pnpm version from package.json
FROM alpine:3.21 AS pnpm-version

WORKDIR /tmp

COPY package.json .

RUN apk add --no-cache jq

RUN jq -r .packageManager package.json > pnpm-version.txt


FROM node:23.8-alpine3.21 AS base

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

RUN pnpm dlx turbo prune --docker "@suddenly-giovanni/app"


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

RUN cd ./packages/app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod=false

ENV NODE_ENV="production"

RUN pnpm exec turbo run build --filter=@suddenly-giovanni/app

# Deploy a package from a workspace:
# During deployment, the files of the deployed package are copied to the target directory.
# All dependencies of the deployed package, including dependencies from the workspace, are installed inside an isolated node_modules directory at the target directory.
# The target directory will contain a portable package that can be copied to a server and executed without additional steps.
RUN pnpm --filter @suddenly-giovanni/app --prod --no-optional deploy pruned


FROM base AS production

ENV NODE_ENV="production"
ENV PORT="5173"
ENV HOST="0.0.0.0"

COPY --from=build --chown=node:node /home/node/pruned/package.json .
COPY --from=build --chown=node:node /home/node/pruned/node_modules ./node_modules
COPY --from=build --chown=node:node /home/node/packages/app/server ./server
COPY --from=build --chown=node:node /home/node/packages/app/build ./build
COPY --from=build --chown=node:node /home/node/packages/app/react-router.config.ts ./react-router.config.ts

USER node

EXPOSE 5173

CMD ["node", "--experimental-transform-types", "server/server.ts"]
