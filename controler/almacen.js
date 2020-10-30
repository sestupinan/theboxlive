const mdbconn = require("../lib/utils/mongo.js");
const {ObjectID} = require('mongodb');

async function getTodosHistoriales() {
  return mdbconn.conn().then((client) => {
    return client.db("DataBase").collection("almacen").distinct("historial");
  });
}
async function getAlmacenes() {
  return mdbconn.conn().then((client) => {
    return client.db("DataBase").collection("almacen").find({}).toArray();
  });
}

async function getAlmacen(id) {
  return mdbconn.conn().then((client) => {
    return client
      .db("DataBase")
      .collection("almacen")
      .findOne({ numero: parseInt(id) });
  });
}

async function insertAlmacen(almacen) {
  return mdbconn.conn().then((client) => {
    return client.db("DataBase").collection("almacen").insertMany(almacen);
  });
}

async function deleteAlmacen(id) {
  return mdbconn.conn().then((client) => {
    return client
      .db("DataBase")
      .collection("almacen")
      .deleteOne({ numero: parseInt(id) });
  });
}
async function deleteAlmacenByObjectID(id) {
  return mdbconn.conn().then((client) => {
    return client
      .db("DataBase")
      .collection("almacen")
      .deleteOne({ _id :ObjectID(id) });
  });
}
async function updateAlmacen(almacen, updateDoc) {
  return mdbconn.conn().then((client) => {
    return client
      .db("DataBase")
      .collection("almacen")
      .updateOne(
        { numero: parseInt(almacen) },
        { $set: updateDoc },
        { upsert: false }
      );
  });
}
module.exports = [
  getAlmacen,
  getAlmacenes,
  insertAlmacen,
  updateAlmacen,
  deleteAlmacen,
  deleteAlmacenByObjectID,
  getTodosHistoriales,
];
