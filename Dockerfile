FROM mhart/alpine-node AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM mhart/alpine-node:base
WORKDIR /app
COPY --from=builder /app/build ./build
EXPOSE 5000
ENV NODE_ENV=production
CMD ["serve", "-s", "build"]