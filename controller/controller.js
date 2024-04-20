const items = require("../items");

const getRoot = (req, res) => {
  res.send("Hello welcome to fastify server!");
};

const getAllItems = (req, res) => {
  if (items.length === 0) {
    res.code(200).send({ message: "No items to show!" });
  }
  res.send(items);
};

const getOneItem = (req, res) => {
  const { id } = req.params;

  const item = items.find((item) => item._id === parseInt(id));

  res.send(item);
};

const postOneItem = (req, res) => {
  try {
    if (!req.body || req.body === null) {
      res.code(400).send({ error: "No body!" });
      return;
    }

    const { name, price, qty } = req.body;

    if (!name || !price || !qty) {
      res.code(400).send({ error: "Missing required fields!" });
      return;
    }

    const newId = items.length + 1;

    const newItem = { _id: newId, name, price, qty };

    items.push(newItem);

    res.code(200).send({
      message: `Successfully added the new item with id : ${newId}`,
    });
  } catch (error) {
    res.code(500).send({ error: "Internal server error!" });
  }
};

const updateOneItem = (req, res) => {
  const { id } = req.params;

  try {
    const item = items.find((item) => item._id === parseInt(id));

    if (!item) {
      res.code(400).send({ error: "No item found with this id!" });
    }

    if (req.body.name) {
      item.name = req.body.name;
    }

    if (req.body.price) {
      item.price = req.body.price;
    }

    if (req.body.qty) {
      item.qty = req.body.qty;
    }

    res
      .code(200)
      .send({ message: `Item updated successfully with id : ${id}` });
  } catch (error) {
    res.code(500).send({ error: "Internal server error!" });
  }
};

const deleteOneItem = (req, res) => {
  req.log.info("Heading on to delete route");
  const { id } = req.params;

  try {
    const index = items.findIndex((item) => item._id === parseInt(id));

    if (index === -1) {
      res.code(404).send({ error: "Item not found" });
      return;
    }

    items.splice(index, 1);

    res.send({ message: "Item deleted successfully" });
  } catch (error) {
    res.code(500).send({ error: "Internal server error!" });
  }
};

module.exports = {
  getRoot,
  getAllItems,
  getOneItem,
  postOneItem,
  updateOneItem,
  deleteOneItem,
};
