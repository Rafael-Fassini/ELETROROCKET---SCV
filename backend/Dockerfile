FROM node:latest

WORKDIR /backend

COPY . .

RUN rm -rf node_modules
RUN npm i

CMD ["npm", "start" ]

EXPOSE 5001