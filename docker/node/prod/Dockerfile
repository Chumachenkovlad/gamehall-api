FROM node:10.15-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
ENV NODE_ENV production
RUN npm run prestart:prod
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
