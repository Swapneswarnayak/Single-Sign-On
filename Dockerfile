FROM node:18-alpine
WORKDIR /app

# COPY package.json package-lock.json ./
# RUN  npm install --production

#FROM node:18-alpine AS builder
#WORKDIR /app
COPY . .
# Run npm install -g npm@10.2.5
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
