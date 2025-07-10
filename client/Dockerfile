FROM node:20-alpine AS build

RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

WORKDIR /app

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY patches/ ./patches/
COPY client ./client/

RUN pnpm install --frozen-lockfile --filter client --ignore-scripts
RUN pnpm --filter client build

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["pnpm", "--filter", "client", "preview"]