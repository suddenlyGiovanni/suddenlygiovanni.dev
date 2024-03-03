# base node image
FROM node:21-bookworm-slim

LABEL authors="suddenlyGiovanni"

# set for base and all layer that inherit from it
ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y

RUN corepack enable

USER node

WORKDIR /home/node/code

COPY --chown=node:node . .

RUN pnpm install --prod false --frozen-lockfile

RUN pnpm run build

CMD ["pnpm", "--filter", "@suddenly-giovanni/web", "run", "start"]
