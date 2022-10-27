FROM node:16

ENV DATABASE_URL="mongodb+srv://cuonghm:vanha110100@cluster0.e74cvwr.mongodb.net/perfumeDB?retryWrites=true&w=majority"

EXPOSE 3000

WORKDIR /app

RUN npm i npm@8.5.0 -g

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["node","src/index.js"]