const fastify = require("fastify")({ logger: true });
fastify.register(require("@fastify/swagger"), {
  swagger: {
    info: {
      title: "fastify-api",
      description: "My first fastify api",
      version: "1.0.0",
    },
    host: "localhost:5000",
  },
});

fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/docs",
  exposeRoute: true,
});

fastify.register(require("./routes/items"));

// Run the server!
const PORT = 5000;
fastify.listen({ port: PORT }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
