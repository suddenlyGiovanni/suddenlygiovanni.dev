FROM --platform=$TARGETPLATFORM node:24-alpine3.21 AS base

LABEL authors="suddenlyGiovanni"

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /home/node/

RUN corepack enable pnpm


FROM base AS build

ENV NODE_ENV="production"

COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run --filter=@repo/app build

# Deploy a package from a workspace:
# During deployment, the files of the deployed package are copied to the target directory.
# All dependencies of the deployed package, including dependencies from the workspace, are installed inside an isolated node_modules directory at the target directory.
# The target directory will contain a portable package that can be copied to a server and executed without additional steps.
RUN pnpm --filter=@repo/app deploy --legacy --prod --no-optional ./pruned


FROM base AS production

ENV NODE_ENV="production"
ENV PORT="5173"
ENV HOST="0.0.0.0"

COPY --from=build --chown=node:node /home/node/pruned/package.json .
COPY --from=build --chown=node:node /home/node/pruned/node_modules ./node_modules
COPY --from=build --chown=node:node /home/node/packages/app/src/server ./src/server
COPY --from=build --chown=node:node /home/node/packages/app/build ./build
COPY --from=build --chown=node:node /home/node/packages/app/react-router.config.ts ./react-router.config.ts

USER node

EXPOSE 5173

CMD ["node", "src/server/server.ts"]
