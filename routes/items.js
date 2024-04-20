const {
  getRoot,
  getAllItems,
  getOneItem,
  postOneItem,
  updateOneItem,
  deleteOneItem,
} = require("../controller/controller");

const Item = {
  type: "object",
  properties: {
    _id: { type: "integer" },
    name: { type: "string" },
    qty: { type: "integer" },
    price: { type: "number" },
  },
};

// options for get all items
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: getAllItems,
};

const getItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: getOneItem,
};

const postItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "price", "qty"],
      properties: {
        name: { type: "string" },
        price: { type: "number" },
        qty: { type: "integer" },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: postOneItem,
};

const updateItemOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: updateOneItem,
};

const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: deleteOneItem,
};

const itemRoutes = function (fastify, options, done) {
  fastify.get("/", getRoot);

  fastify.get("/items", getItemsOpts);

  fastify.get("/item/:id", getItemOpts);

  fastify.post("/item", postItemOpts);

  fastify.put("/item/:id", updateItemOpts);

  fastify.delete("/item/:id", deleteItemOpts);

  done();
};

module.exports = itemRoutes;
