##################
# Dependencies
##################
FROM node:18-alpine AS deps
RUN apk add --no-cache git openssh libc6-compat
RUN corepack enable pnpm
RUN corepack use pnpm@9.x

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prefer-offline --frozen-lockfile

##################
# Builder
##################
FROM node:18-alpine as builder
RUN apk add --no-cache git openssh
RUN corepack enable pnpm
RUN corepack use pnpm@9.x

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ARG APP_ENV
ARG APP_VERSION
ENV NEXT_PUBLIC_APP_ENV=${APP_ENV}
ENV NEXT_PUBLIC_APP_VERSION=${APP_VERSION} 

RUN echo "${ENV_FOR_BUILD}"
RUN echo "${APP_ENV}"
RUN echo "${APP_VERSION}"
RUN pnpm run build:dev
RUN pnpm install --prod --prefer-offline --frozen-lockfile

##################
# Runner
##################
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node_modules/.bin/next", "start"]
