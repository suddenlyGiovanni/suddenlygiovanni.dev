FROM node:21-bookworm-slim AS base

LABEL authors="suddenlygiovanni"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update

RUN corepack enable

# Set working directory
WORKDIR /app

RUN pnpm add --global turbo

COPY . .
