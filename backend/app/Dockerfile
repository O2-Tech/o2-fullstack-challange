FROM oven/bun:1

WORKDIR /app

COPY package*.json ./
COPY bun.lockb ./

RUN rm -rf node_modules
RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"] 