FROM node:8.2.1

WORKDIR /app
CMD [ "npm", "start" ]

COPY package.json /app
COPY package-lock.json /app
COPY src /app
COPY public /app
RUN npm install --quiet

EXPOSE 3000

VOLUME [ "/app", "/app/node_modules" ]
