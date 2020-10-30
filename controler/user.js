const mdbconn = require("../lib/utils/mongo.js");
const {ObjectID} = require('mongodb');
async function getUsers() {
  return mdbconn.conn().then((client) => {
    return client.db("DataBase").collection("user").find({}).toArray();
  });
}

async function getUser(id) {
  return mdbconn.conn().then((client) => {
    return client
      .db("DataBase")
      .collection("user")
      .findOne({ cedula: parseInt(id) });
  });
}

async function insertUser(user) {  
    return mdbconn.conn().then((client) => {
        if(client.db("DataBase").collection("user") === null || client.db("DataBase").collection("user") === undefined || client.db("DataBase").collection("user") === NaN){
            client.db("DataBase").createCollection("user");
        }
        return client.db("DataBase").collection("user").insertOne(user);
    });
}

async function deleteUser(id) {
  return mdbconn.conn().then((client) => {
    return client
      .db("DataBase")
      .collection("user")
      .deleteOne({ cedula:parseInt(id) });
  });
}
async function deleteUserbyObjectID(id){
  return mdbconn.conn().then((client) => {
    return client
      .db("DataBase")
      .collection("user")
      .deleteOne({ _id :ObjectID(id) });
  });

}

async function updateUser(almacen, updateDoc) {
  return mdbconn.conn().then((client) => {
    return client
      .db("DataBase")
      .collection("user")
      .updateOne(
        { cedula: parseInt(almacen) },
        { $set: updateDoc },
        { upsert: false }
      );
  });
}

module.exports = [
  getUser,
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
  deleteUserbyObjectID
];
