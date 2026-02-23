#node environment
FROM node:25-alpine

#install chrome
npx @puppeteer/browsers install chrome

#set workdir
WORKDIR /app

#install deps
COPY package*.json ./
RUN npm install --production

#copy all files
COPY . .

#run the app
CMD ["node", "app.js"]

