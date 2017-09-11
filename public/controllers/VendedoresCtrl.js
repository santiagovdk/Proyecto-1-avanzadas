angular.module('VendedoresCtrl', []).controller('VendedoresController', ['$scope', 'Ventas', 'Articulos', 'Clientes', 'Empleados', 'Tiendas', 'toastr', function($scope, Ventas, Articulos, Clientes, Empleados, Tiendas, toastr) {

  $scope.form = {};
  $scope.articulos = {};
  $scope.agregarVenta = function(venta, articulos) {
    $scope.form = angular.copy(venta);
    $scope.articulos = angular.copy(articulos);

    var monto = 0;
    var articulosList = [];
    for (i = 0; i < articulos.length; i++) {
      var res = articulos[i].split("&");
      monto = monto + parseInt(res[1]);
      articulosList.push(res[0]);
    }

    var data = {
      id_cliente: venta.idCliente,
      id_tienda: venta.idTienda,
      id_empleado: venta.idEmpleado,
      monto: monto,
      articulos: articulosList
    }

    Ventas.postVenta(data).then(function(response) {
      toastr.success('Exito', 'Su solicitud fue procesada');
      $scope.ventas = [];
      $scope.cargarVentas();
      $scope.venta = {}
    }).catch(function(err) {
      toastr.error('Hubo un error mientras se creaba la venta.', 'Error');
    });
  }

  Articulos.getArticulosGenerales().then(function(response) {
    $scope.collectionGeneralArticulos = response.data.data;
  }).catch(function(err) {
    toastr.error('Hubo un error mientras se solicitaban los articulos.', 'Error');
  });

  Clientes.getClientes().then(function(response) {
    $scope.clientes = response.data.data;
  }).catch(function(err) {
    toastr.error('Hubo un error mientras se solicitaban los clientes.', 'Error');
  });

  Empleados.getEmpleados().then(function(response) {
    $scope.empleados = response.data.data;
  }).catch(function(err) {
    toastr.error('Hubo un error mientras se solicitaban los empleados.', 'Error');
  });

  Tiendas.getTiendas().then(function(response) {
    $scope.tiendas = response.data.data;
  }).catch(function(err) {
    toastr.error('Hubo un error mientras se solicitaban las tiendas.', 'Error');
  });
$scope.ventas = [];
  $scope.cargarVentas = function() {
    Ventas.getVentas().then(function(response) {


      angular.forEach(response.data.data, function(value) {
        $scope.ventas.push(value);
      });


    }).catch(function(err) {
      toastr.error('Hubo un error mientras se solicitaban las ventas existentes.', 'Error');
    });
  }

}]);
