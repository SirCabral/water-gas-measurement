FROM node:18

USER node
RUN mkdir -p /home/node/server/node_modules
RUN mkdir -p /home/node/server/dist
RUN chown -R node:node /home/node/server & chown -R node:node /home/node/server/**
WORKDIR /home/node/server

COPY package*.json ./
RUN yarn

COPY --chown=node:node . .


CMD ["npm", "run", "dev"]