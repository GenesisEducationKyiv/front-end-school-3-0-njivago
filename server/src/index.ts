// oxlint-disable no-console

import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { fastifyWebsocket } from "@fastify/websocket";
import { makeHandler } from "graphql-ws/use/@fastify/websocket";
import { fastifyApolloHandler } from "@as-integrations/fastify";
import { initializeDb } from "./utils/db";
import config from "./config";
import { WSSchema, createGraphQLServer } from "./graphql";

async function start() {
  try {
    await initializeDb();

    const fastify = Fastify({
      logger: {
        level: config.logger.level,
        transport: config.isDevelopment
          ? {
              target: "pino-pretty",
              options: {
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
              },
            }
          : undefined,
      },
    });

    await fastify.register(cors, {
      origin: config.cors.origin,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });

    await fastify.register(multipart, {
      limits: {
        fileSize: config.upload.maxFileSize,
      },
    });

    await fastify.register(fastifyStatic, {
      root: config.storage.uploadsDir,
      prefix: "/graphql/files/",
      decorateReply: false,
    });

    await fastify.register(fastifyWebsocket);

    await fastify.register(swagger, {
      openapi: {
        info: {
          title: "Music Tracks API",
          description: "API for managing music tracks",
          version: "1.0.0",
        },
      },
    });

    await fastify.register(swaggerUi, {
      routePrefix: "/documentation",
      uiConfig: {
        docExpansion: "list",
        deepLinking: true,
      },
    });

    const apollo = await createGraphQLServer(fastify);
    await apollo.start();

    await fastify.register(async (fastify) => {
      fastify.get(
        "/graphql/ws",
        { websocket: true },
        makeHandler({ schema: WSSchema })
      );
    });

    await fastify.route({
      method: ["POST", "OPTIONS"],
      url: "/graphql",
      handler: fastifyApolloHandler(apollo),
    });

    await fastify.listen({
      port: config.server.port,
      host: config.server.host,
    });

    console.log(
      `🚀 Server running at http://${config.server.host}:${config.server.port}/graphql`
    );
  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
}

start();
