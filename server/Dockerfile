FROM node:8.2.1

WORKDIR /app
CMD [ "node", "server.js" ]

COPY package.json /app
COPY package-lock.json /app
COPY server.js /app
RUN npm install --quiet

EXPOSE 3000

VOLUME [ "/app", "/app/node_modules" ]
