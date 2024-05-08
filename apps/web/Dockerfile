# Extract pnpm version from package.json
FROM alpine:3.19 AS pnpm-version

WORKDIR /tmp

COPY package.json .

RUN apk add --no-cache jq

RUN jq -r .packageManager package.json > pnpm-version.txt

ENTRYPOINT ["sh"]

FROM node:22-alpine3.19 AS base

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

# Add build argument for GitHub token
ARG GH_PACKAGES_TOKEN

COPY . .

RUN echo "//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}" >> .npmrc

RUN pnpm dlx turbo prune --docker "@suddenlygiovanni/web"

ENTRYPOINT ["sh"]

FROM base AS build

# pnpm fetch does require only lockfile + .npmrc
COPY --from=builder /home/node/out/json/pnpm-lock.yaml .
COPY --from=builder /home/node/out/json/.npmrc .

# Fetch packages from a lockfile into virtual store, package manifest is ignored.
RUN pnpm fetch

# Build the project
COPY --from=builder /home/node/out/full/ .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter @suddenlygiovanni/web install --prod=false

ENV NODE_ENV="production"

RUN pnpm exec turbo build --filter=@suddenlygiovanni/web

RUN pnpm --filter @suddenlygiovanni/web --prod --no-optional deploy pruned

ENTRYPOINT ["sh"]

FROM base AS production

ENV NODE_ENV="production"
ENV PORT="5173"
ENV HOST="0.0.0.0"

COPY --from=build --chown=node:node /home/node/pruned/package.json .
COPY --from=build --chown=node:node /home/node/pruned/node_modules ./node_modules
COPY --from=build --chown=node:node /home/node/apps/web/build ./build

USER node

EXPOSE 5173

CMD ["./node_modules/.bin/remix-serve", "./build/server/index.js"]
