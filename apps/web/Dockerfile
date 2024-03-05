# base node image
FROM node:21-alpine3.19 AS base

LABEL authors="suddenlyGiovanni"

# set for base and all layer that inherit from it
ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN apk add --no-cache libc6-compat

RUN apk update

RUN corepack enable

COPY . /app

WORKDIR /app

#ENTRYPOINT ["sh"]


FROM base AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

#ENTRYPOINT ["sh"]


FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

ENV NODE_ENV production

RUN pnpm run build

#ENTRYPOINT ["sh"]


FROM base AS runner

ENV NODE_ENV production

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/apps/web/node_modules /app/apps/web/node_modules
COPY --from=build /app/apps/web/build /app/apps/web/build

USER node

EXPOSE 3000

WORKDIR /app/apps/web

CMD ["pnpm", "run",  "start"]
