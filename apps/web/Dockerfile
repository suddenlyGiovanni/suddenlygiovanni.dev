FROM node:21-alpine3.19 AS base

LABEL authors="suddenlyGiovanni"

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

RUN corepack use pnpm@latest

WORKDIR /home/node/

FROM base AS builder

WORKDIR /home/node/builder

RUN pnpm add --global turbo

COPY . .

RUN turbo prune --docker @suddenly-giovanni/web

ENTRYPOINT ["sh"]

FROM base AS build

WORKDIR /home/node/build

COPY .gitignore .gitignore

COPY --from=builder /home/node/builder/out/json/ .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile=false --prod=false

# Build the project
COPY --from=builder /home/node/builder/out/full/ .

ENV NODE_ENV production

RUN pnpm turbo build --filter=@suddenly-giovanni/web

RUN pnpm --filter @suddenly-giovanni/web --prod deploy pruned


FROM base AS production

ENV NODE_ENV production

WORKDIR /home/node/code

RUN apk add --no-cache dumb-init

COPY --from=build --chown=node:node /home/node/build/pruned .
COPY --from=build --chown=node:node /home/node/build/apps/web/build ./build

USER node

EXPOSE 3000

CMD ["dumb-init", "pnpm", "run", "start"]
