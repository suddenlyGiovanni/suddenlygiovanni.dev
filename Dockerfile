# base node image
FROM node:21-bookworm-slim AS base

LABEL authors="suddenlyGiovanni"

# set for base and all layer that inherit from it
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV production

RUN apt-get update && apt-get install -y openssl

RUN corepack enable

# Install all node_modules, including dev dependencies
FROM base AS deps

COPY . /usr/src/app

WORKDIR /usr/src/app


# The `--mount=type=cache,id=pnpm,target=/pnpm/store` part is a build-time mount.
# It's a feature of BuildKit, Docker's next-generation build system.
# This specific mount is of type cache, which means it's used to share the build cache across different builds.
# The id is pnpm, which is an identifier for the cache.
# The target is /pnpm/store, which is the path in the container where the cache is mounted.
# `pnpm install --frozen-lockfile` is the command being run.
# pnpm is a fast, disk space efficient package manager.
# The install command is used to install all dependencies for a project. The `--frozen-lockfile`
# option ensures that the exact versions of dependencies specified in the `pnpm-lock.yaml` file are
# installed, rather than potentially installing newer versions of those dependencies.
# This is important for ensuring consistent builds.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm --filter @suddenly-giovanni/web run build
