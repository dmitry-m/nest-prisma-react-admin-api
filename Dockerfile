FROM node:18-alpine As development
RUN apk update && apk add openssl

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma
COPY . .

RUN yarn install
RUN yarn prisma generate

FROM development As build

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .

RUN yarn run build

RUN yarn install --production=true && yarn cache clean

FROM build As production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env ./
COPY package*.json ./

CMD [ "yarn", "run", "start:migrate:prod"]