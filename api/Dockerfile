FROM node:22-alpine

WORKDIR /app

# Install build dependencies for native C++ addons like better-sqlite3
RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm ci

COPY . .

# Generate Prisma Client during build
RUN npx prisma generate

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]
