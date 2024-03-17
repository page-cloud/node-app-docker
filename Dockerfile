FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY app/package.json .
RUN npm install

# Bundle app source
COPY app .

# Expose port and start application
EXPOSE 3000
CMD ["node", "index.js"]

