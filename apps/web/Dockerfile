# base node image
FROM node:21-alpine3.19
LABEL authors="suddenlyGiovanni"

# set for base and all layer that inherit from it
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production

RUN corepack enable

USER node

# Create app directory
WORKDIR /home/node/code

# Copy the entire workspace
COPY --chown=node:node . .

# Install app dependencies
RUN pnpm install --prod false --frozen-lockfile

# Change to the web app directory
WORKDIR /home/node/code/apps/web

# Build the project
RUN pnpm run build

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["pnpm", "run", "start"]
