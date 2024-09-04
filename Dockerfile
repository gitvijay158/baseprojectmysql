FROM node:16.14.0
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
#RUN npm cache clean --force
COPY . /app
EXPOSE 3001
RUN npm install --loglevel verbose
 
CMD [ "npm", "start", "main-project.js" ]
 





