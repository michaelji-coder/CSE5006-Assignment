FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Set a fallback SQLite URL for the build step
ENV DATABASE_URL="file:./dev.db"

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
