FROM node:20-alpine
# RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["pnpm","dev","-p","3000","-H","0.0.0.0"]