# ---------- Base ----------
FROM node:14.17-alpine AS base

WORKDIR /home/node/app

# ---------- Builder ----------
FROM base AS builder

COPY package*.json ./

RUN npm install glob rimraf
RUN npm install

COPY . .

RUN npm run build

# ---------- Release ----------
FROM base AS release

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/dist ./dist

USER node

CMD ["node", "dist/main"]