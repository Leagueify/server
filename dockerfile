FROM oven/bun:1.0.11-alpine as base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install

FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

FROM base AS release
COPY --from=install /temp/dev/node_modules node_modules
COPY --from=prerelease /usr/src/app/api api
COPY --from=prerelease /usr/src/app/index.ts .
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/tsconfig.json .

EXPOSE 8888/tcp
CMD [ "bun", "dev" ]
