var express = require("express");
var router = express.Router();
const Joi = require("joi");
var [
  getAlmacen,
  getAlmacenes,
  insertAlmacen,
  updateAlmacen,
  deleteAlmacen,
  deleteAlmacenByObjectID,
  getTodosHistoriales,
] = require("../controler/almacen");

/*Metodo get de un almacen por el nombre*/
router.get("/api/almacenes/:id", async function (req, res, next) {
  const almacen = await getAlmacen(req.params.id);
  res.send(almacen);
});

/*Metodo get de todos los almacens*/
router.get("/api/almacenes", async function (req, res, next) {
  const almacenes = await getAlmacenes();
  res.send(almacenes);
});

/*Metodo para crear un almacen*/
router.post("/api/almacenes", async function (req, res, next) {
  console.log(req.body);
  const almacen = await insertAlmacen(req.body);
  res.send("Almacen creado con exito");
});

/*Metodo para modificar un almacen*/
router.put("/api/almacenes/:id", async function (req, res, next) {
  if ((await getAlmacen(req.params.id)) === null)
    res.send("No existe ese almacen");
  else {
    const almacen = await updateAlmacen(req.params.id, req.body);
    res.send("Se completó con exito");
  }
});

/*Metodo para borrar un almacen*/
router.delete("/api/almacenes/:id", async function (req, res, next) {
  const almacen = await deleteAlmacen(req.params.id);
  res.send(almacen);
});
/*Metodo para borrar un almacen por ObjectID*/
router.delete("/api/almacenes/objectid/:id", async function (req, res, next) {
  const almacen = await deleteAlmacenByObjectID(req.params.id);
  res.send(almacen);
});

/*Metodo para actualizar la cantidad de un producto en una bodega dado el nit y la nueva cantidad y se agrega en el historial*/
router.put("/api/almacenes/modificar/:id", async function (req, res, next) {
  const almacen = await getAlmacen(req.params.id);
  if (almacen === null) {
    res.send("No existe un almacen con ese numero");
  } else {
    var encontro = false;
    almacen.productos.forEach((producto) => {
      if (producto.nit === req.body.nit) {
        encontro = true;
        var currentdate = new Date();
        var datetime =
          "Last Sync: " +
          currentdate.getDate() +
          "/" +
          (currentdate.getMonth() + 1) +
          "/" +
          currentdate.getFullYear() +
          " @ " +
          currentdate.getHours() +
          ":" +
          currentdate.getMinutes() +
          ":" +
          currentdate.getSeconds();
        historial = {
          usuario: req.body.usuario,
          nit: req.body.nit,
          fecha: datetime,
          cantidadAnterior: producto.cantidad,
          cantidadNueva: req.body.cantidadNueva,
          tipo: req.body.tipo
        };
        cantidadAnterior = producto.cantidad;
        producto.cantidad = req.body.cantidadNueva;
        almacen.historial.push(historial);
      }
    });
    if (encontro === true) {
      await updateAlmacen(almacen.numero, almacen);
      res.send(
        "La cantidad del producto con nit: " +
          req.body.nit +
          " En el almacen: " +
          almacen.nombre +
          ", fue actualizada a: " +
          req.body.cantidadNueva +
          " unidades"
      );
    } else res.send("No existe un producto con ese nit");
  }
});
/*Metodo para recuperar el historial de un almacen*/
router.get("/api/almacenes/historial/:id", async function (req, res, next) {
  const almacen = await getAlmacen(req.params.id);
  if (almacen === null) {
    res.send("No existe ese almacen");
  } else res.send(almacen.historial);
});

/*Metodo para recuperar todos los historiales*/
router.get("/api/historiales", async function (req, res, next) {
  const almacenes = await getTodosHistoriales();
  console.log(almacenes);
  res.send(almacenes);
});

/*Metodo para recuperar todos los productos de un almacen*/
router.get("/api/almacenes/productos/:id", async function (req, res, next) {
  const almacen = await getAlmacen(req.params.id);
  if (almacen === null) {
    res.send("no existe ese almacen");
  } else res.send(almacen.productos);
});

/*Metodo para agregar un producto a un almacen*/
router.put("/api/almacenes/producto/:id", async function (req, res, next) {
  const almacen = await getAlmacen(req.params.id);
  if (almacen === null) {
    res.send("no existe ese almacen");
  } else {
    almacen.productos.push(req.body);
    await updateAlmacen(almacen.numero, almacen);
    res.send("Se agregó el producto con exito");
  }
});
/*Metodo para eliminar un producto a un almacen*/
router.put("/api/delproducto/:id", async function (req, res, next) {
  const almacen = await getAlmacen(req.params.id);
  if (almacen === null) res.send("No existe ese almacen");
  else {
    for (let i = 0; i < almacen.productos.length; i++) {
      if (almacen.productos[i].nit === req.body.nit) {
        if (almacen.productos[i].cantidad > 0) {
          res.send("No se puede elminar el producto, primero acaba el stock");
        } else almacen.productos.splice(i, 1);
      }
    }
    await updateAlmacen(almacen.numero, almacen);
    res.send("Eliminado exitosamente");
  }
});
/*Metodo para eliminar un producto dado un almacen y el nit */
router.delete("/api/delproducto/:id/:nit", async function (req,res) {
  const almacen = await getAlmacen(req.params.id);
  if (almacen === null) res.send("No existe ese almacen");
  else {
    for (let i = 0; i < almacen.productos.length; i++) {
      if (almacen.productos[i].nit === req.params.nit) {
        if (almacen.productos[i].cantidad > 0) {
          res.send("No se puede elminar el producto, primero acaba el stock");
        } else almacen.productos.splice(i, 1);
      }
    }
    await updateAlmacen(almacen.numero, almacen);
    res.send("Eliminado exitosamente");
  }
});



/* Metodo para ver las actualizaciones que ha hecho un usuario en un almacen*/
router.get("/api/almacenes/:id/historial/:idUsuario", async function(req, res){
  let almacen = await getAlmacen(req.params.id);
  if ( almacen === null) res.send("No existe ningun almacen con dicho ID ");
  else{
    let respuesta = [];
    for(let i = 0; i < almacen.historial.length; i++){
      if(almacen.historial[i].usuario == req.params.idUsuario){
        respuesta.push(almacen.historial[i]);
      }
    }
    res.send(respuesta);
  }
});
/*Metodo para obtener todos los cambios que ha hecho un usuario en todos los almacenes */
router.get("/api/almacenes/historial/usuario/:idUsuario", async function (req,res) {
  let historiales = await getTodosHistoriales();
  let respuesta = [];
  for(let i = 0; i < historiales.length; i++){
    if(historiales[i].usuario == req.params.idUsuario){
      respuesta.push(historiales[i]);
    }
  }
  res.send(respuesta);
});
/*Metodo para generar las estadisticas de un almacen*/
router.get("/api/almacenes/estadisticas/:id", async function (req,res){
  let almacen = await getAlmacen(req.params.id);
  if (almacen === null) res.send("No existe ningun almacen con dicho ID "); 
  else{
    let capacidad = almacen.capacidad;
    let capacidadActual = 0; 
    for(let i = 0; i < almacen.productos.length; i++){
      capacidadActual += almacen.productos[i].cantidad; 
    }
    let ocupacion = (capacidadActual/capacidad) * 100; 
    let respuesta = {"productos": capacidadActual ,"ocupacion": ocupacion};
    res.send(respuesta);
  }
});




module.exports = router;
