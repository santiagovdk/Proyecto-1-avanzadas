module.exports.set = function(app) {
  var direccionador = require('../logic/direccionador');
  var databaseConfig = require('../configs/database');
  var pgp = databaseConfig.getPgp();
  var debug = false;

  app.get('/api/v1/empleado', function(req, res) {
    var destino = req.query.origin || 1;
    const columns = ['id', 'id_tienda', 'id_puesto', 'nombre'];
    var myquery = 'SELECT ${columns^} FROM empleado WHERE activo = true';

    databaseConfig.getDb(destino).query(myquery, {
        columns: columns.map(pgp.as.name).join(),
        table: 'Table Name'
      }).then(result => {
        console.log("Realizando get empleados");
        if (debug) {
          console.log(result); // printing the data returned
        }

        res.status(200).json({
          status: "success",
          data: result
        });

      })
      .catch(error => {
        if (debug) {
          console.log(error); // printing the data returned
        }
        // var error_type = error.code.substring(0, 2);
        // if (destino.localeCompare('heredia') == 0) {
        //   console.log("Nodo central fuera de linea..."); // printing the error
        //   res.status(500).send();
        // } else {
        //   if ((error_type.localeCompare('08') == 0) || (error_type.localeCompare('28') == 0)) {
        //     console.log('Error de conexion, realizando consulta en nodo principal Heredia');
        //     databaseConfig.getDb('heredia').query(myquery, {
        //
        //         table: 'Table Name'
        //       }).then(result => {
        //         console.log(result); // printing the data returned
        //
        //         res.status(200).json({
        //           status: "success",
        //           data: result
        //         });
        //
        //       })
        //       .catch(error => {
        //         console.log("Nodo central fuera de linea..."); // printing the error
        //         res.status(500).send();
        //       });
        //   } else {
        //     console.log("Error inesperado"); // printing the error
        //     res.status(500).send();
        //   }
        // }

      })
  });



  app.get('/api/v1/empleado/puesto', function(req, res) {
    var destino = req.query.origin || 1;
    const columns = ['id', 'nombre'];
    var myquery = 'SELECT ${columns^} FROM puesto_empleado WHERE activo = true';

    databaseConfig.getDb(destino).query(myquery, {
        columns: columns.map(pgp.as.name).join(),
        table: 'Table Name'
      }).then(result => {
        console.log("Realizando get puestos");
        if (debug) {
          console.log(result); // printing the data returned
        }

        res.status(200).json({
          status: "success",
          data: result
        });

      })
      .catch(error => {
        if (debug) {
          console.log(error); // printing the data returned
        }
        // var error_type = error.code.substring(0, 2);
        // if (destino.localeCompare('heredia') == 0) {
        //   console.log("Nodo central fuera de linea..."); // printing the error
        //   res.status(500).send();
        // } else {
        //   if ((error_type.localeCompare('08') == 0) || (error_type.localeCompare('28') == 0)) {
        //     console.log('Error de conexion, realizando consulta en nodo principal Heredia');
        //     databaseConfig.getDb('heredia').query(myquery, {
        //
        //         table: 'Table Name'
        //       }).then(result => {
        //         console.log(result); // printing the data returned
        //
        //         res.status(200).json({
        //           status: "success",
        //           data: result
        //         });
        //
        //       })
        //       .catch(error => {
        //         console.log("Nodo central fuera de linea..."); // printing the error
        //         res.status(500).send();
        //       });
        //   } else {
        //     console.log("Error inesperado"); // printing the error
        //     res.status(500).send();
        //   }
        // }

      })
  });



  app.get('/api/v1/empleado_v', function(req, res) {
    var destino = req.query.origin || 1;
    var myquery = 'SELECT * FROM empleado_v';

    databaseConfig.getDb(destino).query(myquery, {

        table: 'Table Name'
      }).then(result => {
        console.log("Realizando get empleado_v");
        if (debug) {
          console.log(result); // printing the data returned
        }

        res.status(200).json({
          status: "success",
          data: result
        });

      })
      .catch(error => {
        if (debug) {
          console.log(error); // printing the data returned
        }
        // var error_type = error.code.substring(0, 2);
        // if (destino.localeCompare('heredia') == 0) {
        //   console.log("Nodo central fuera de linea..."); // printing the error
        //   res.status(500).send();
        // } else {
        //   if ((error_type.localeCompare('08') == 0) || (error_type.localeCompare('28') == 0)) {
        //     console.log('Error de conexion, realizando consulta en nodo principal Heredia');
        //     databaseConfig.getDb('heredia').query(myquery, {
        //
        //         table: 'Table Name'
        //       }).then(result => {
        //         console.log(result); // printing the data returned
        //
        //         res.status(200).json({
        //           status: "success",
        //           data: result
        //         });
        //
        //       })
        //       .catch(error => {
        //         console.log("Nodo central fuera de linea..."); // printing the error
        //         res.status(500).send();
        //       });
        //   } else {
        //     console.log("Error inesperado"); // printing the error
        //     res.status(500).send();
        //   }
        // }

      })
  });


  app.post('/api/v1/empleado', function(req, res) {

    var destino = req.query.origin || 1;
    // Default siempre desde heredia
    const columns = ['id_tienda', 'id_puesto', 'nombre'];
    var id_tienda = req.body.id_tienda;
    var id_puesto = req.body.id_puesto;
    var nombre = req.body.nombre;

    var myquery = 'INSERT INTO public.empleado(${columns^}) VALUES (' + id_tienda + ',' + id_puesto + ',\'' + nombre + '\')';

    databaseConfig.getDb(destino).query(myquery, {
        columns: columns.map(pgp.as.name).join(),
        table: 'Table Name'
      }).then(result => {
        console.log("Realizando post empleado");
        if (debug) {
          console.log(result); // printing the data returned
        }
        res.status(200).json({
          status: "success",
          data: result
        });

      })
      .catch(error => {
        if (debug) {
          console.log(error); // printing the data returned
        }
        // var error_type = error.code.substring(0, 2);
        // if (destino.localeCompare('heredia') == 0) {
        //   console.log("El nodo central no se encuentra disponible, insertando en SanJose");
        //
        //   databaseConfig.getDb('sanjose').query(myquery, {
        //       table: 'Table Name'
        //     }).then(result => {
        //       console.log(result); // printing the data returned
        //
        //       res.status(200).json({
        //         status: "success",
        //         data: result
        //       });
        //
        //     })
        //     .catch(error => {
        //       console.log("Nodo secundario SJ fuera de linea..."); // printing the error
        //       res.status(500).send();
        //     });
        //
        //
        //
        // } else {
        //   if ((error_type.localeCompare('08') == 0) || (error_type.localeCompare('28') == 0)) {
        //     console.log('Error de conexion, realizando consulta en nodo principal Heredia');
        //     databaseConfig.getDb('heredia').query(myquery, {
        //         table: 'Table Name'
        //       }).then(result => {
        //         console.log(result); // printing the data returned
        //
        //         res.status(200).json({
        //           status: "success",
        //           data: result
        //         });
        //
        //       })
        //       .catch(error => {
        //         console.log("Nodo central fuera de linea..."); // printing the error
        //         res.status(500).send();
        //       });
        //   } else {
        //     console.log("Error inesperado"); // printing the error
        //     res.status(500).send();
        //   }
        // }

      })


  })



  app.get('/api/v1/empleado/:id?', function(req, res) {
    var destino = req.query.origin || 1;
    var myquery = 'SELECT * FROM empleado_v WHERE id = ' + req.params.id;

    databaseConfig.getDb(destino).query(myquery, {

        table: 'Table Name'
      }).then(result => {
        console.log("Realizando get de un empleado");
        if (debug) {
          console.log(result); // printing the data returned
        }

        res.status(200).json({
          status: "success",
          data: result
        });
      })
      .catch(error => {
        if (debug) {
          console.log(error); // printing the data returned
        }
        // var error_type = error.code.substring(0, 2);
        // if (destino.localeCompare('heredia') == 0) {
        //   console.log("El nodo central no se encuentra disponible, insertando en SanJose");
        //
        //   databaseConfig.getDb('sanjose').query(myquery, {
        //
        //       table: 'Table Name'
        //     }).then(result => {
        //       console.log(result); // printing the data returned
        //       res.status(200).json({
        //         status: "success",
        //         data: result
        //       });
        //     })
        //     .catch(error => {
        //       console.log("Nodo secundario SJ fuera de linea..."); // printing the error
        //       res.status(500).send();
        //     });
        //
        // } else {
        //   if ((error_type.localeCompare('08') == 0) || (error_type.localeCompare('28') == 0)) {
        //     console.log('Error de conexion, realizando consulta en nodo principal Heredia');
        //     databaseConfig.getDb('heredia').query(myquery, {
        //
        //         table: 'Table Name'
        //       }).then(result => {
        //         console.log(result); // printing the data returned
        //
        //         res.status(200).json({
        //           status: "success",
        //           data: result
        //         });
        //
        //       })
        //       .catch(error => {
        //         console.log("Nodo central fuera de linea..."); // printing the error
        //         res.status(500).send();
        //       });
        //   } else {
        //     console.log("Error inesperado"); // printing the error
        //     res.status(500).send();
        //   }
        // }
      })
  });
};
