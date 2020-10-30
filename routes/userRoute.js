var express = require("express");
var router = express.Router();
const Joi = require("joi");
var [
  getUser,
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
  deleteUserbyObjectID
] = require("../controler/user");

/*Metodo get de un user por la cedula*/
router.get("/api/users/:id", async function (req, res, next) {
  const almacen = await getUser(req.params.id);
  res.send(almacen);
});

/*Metodo get de todos los almacens*/
router.get("/api/users", async function (req, res, next) {
  const users = await getUsers();
  res.send(users);
});

/*Metodo para crear un almacen*/
router.post("/api/users", async function (req, res, next) {
  console.log(req.body);
  const user = await insertUser(req.body);
  res.send("Usuario creado con exito");
});

/*Metodo para modificar un almacen*/
router.put("/api/users/:id", async function (req, res, next) {
  if ((await getUser(req.params.id)) === null)
    res.send("No existe ese usuario");
  else {
    const user = await updateUser(req.params.id, req.body);
    res.send("Se completó con exito");
  }
});

/*Metodo para borrar un almacen*/
router.delete("/api/users/:id", async function (req, res, next) {
  const almacen = await deleteUser(req.params.id);
  res.send(almacen);
});
/*Metodo para borrar un usuario por ObjectID*/
router.delete("/api/users/objectid/:id", async function (req, res, next) {
  const almacen = await deleteUserbyObjectID(req.params.id);
  res.send(almacen);
});

module.exports = router;
