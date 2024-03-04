# base node image
FROM node:21-alpine3.19 AS base

LABEL authors="suddenlyGiovanni"

# set for base and all layer that inherit from it
ENV PNPM_HOME="/pnpm"
#ENV NODE_ENV production
ENV PATH="$PNPM_HOME:$PATH"

RUN apk add --no-cache libc6-compat

RUN apk update

RUN corepack enable

ENTRYPOINT ["sh"]

FROM base AS builder

WORKDIR /home/node/code

RUN pnpm add --global turbo

COPY . .

# Creates a pruned version of the monorepo inside an ./out directory.
# It only includes workspaces which `@suddenly-giovanni/web` depends on.
RUN turbo prune --docker @suddenly-giovanni/web

ENTRYPOINT ["sh"]


# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

RUN #apk add --no-cache libc6-compat
RUN #apk update

WORKDIR /home/node/code

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /home/node/code/out/json/ .
#COPY --from=builder /home/node/code/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --prod=false

# Build the project
COPY --from=builder /home/node/code/out/full/ .
#COPY turbo.json turbo.json

ENV NODE_ENV production
RUN pnpm turbo build --filter=@suddenly-giovanni/web

ENTRYPOINT ["sh"]

FROM base AS runner
ENV NODE_ENV="production"
WORKDIR /home/node/code
USER node
COPY --from=installer /home/node/code/apps/web/package.json .
COPY --from=installer /home/node/code/apps/web/node_modules/ ./node_modules
COPY --from=installer /home/node/code/apps/web/build/ ./build/

ENTRYPOINT ["sh"]




# Install app dependencies
#RUN pnpm install --prod false --frozen-lockfile
# Change to the web app directory
#WORKDIR /home/node/code/apps/web
# Build the project
#RUN pnpm run build
# Expose the port the app runs in
#EXPOSE 3000
# Serve the app
#CMD ["pnpm", "run", "start"]
