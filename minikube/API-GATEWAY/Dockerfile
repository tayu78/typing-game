FROM node:14.15.1
WORKDIR /app
COPY package*.json ./
ADD package.json app/package.json
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "server.js"]