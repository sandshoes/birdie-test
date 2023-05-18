FROM node:18-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/backend

COPY package.json ./

COPY prisma ./prisma/

RUN npm install

COPY . ./

RUN npx prisma generate

RUN npx prisma validate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
