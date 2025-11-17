FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true

RUN corepack enable

# Create app directory
WORKDIR /app


# Copy all files
COPY . /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Migration target - needs TypeScript tools
FROM base AS migration
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY package.json /app/
COPY data-source.js /app/
CMD ["npm", "run", "migration:run"]

# Production target - lean runtime
FROM base AS production
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY package.json /app/
COPY .env* /app/
EXPOSE 3000
CMD ["node", "/app/dist/src/main.js"]
