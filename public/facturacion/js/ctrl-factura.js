controllers.controller('CtrlFactura', ['$scope', 'MensajesFactory',
  'FacturaService', controlador
]);

function controlador($scope, mensaje, facturaService) {

  $scope.detalles = [];
  $scope.detalle = {};

  facturaService.tipos().$promise.then(function(response) {
    $scope.tipos = response;
  }, function(err) {
    console.log(err);
  });

  facturaService.generar().$promise.then(function(response){
    console.log(response)
  });

  // facturaService.find(14).$promise.then(function(response) {
  //   console.log(response);
  // }, function(err) {
  //   console.log(err);
  // });

  $scope.agregar = function agregar() {

    $scope.detalle.vTotal = ($scope.detalle.cantidad * $scope.detalle.vunit) - $scope.detalle.descuento;
    $scope.detalles.push($scope.detalle);

    $scope.init();
    mensaje('Agregó algo!!!');
  }

  $scope.init = function init() {
    $scope.factura = {
      numeroFact: 14,
      fechaFactura: "",
      observaciones: ""
    };
    $scope.detalle = {
      miTipo: {
        "id": "1",
        "descripcion": "Cuenta de cobro"
      },
      cantidad: 1,
      descripcion: '',
      descuento: 0,
      vunit: 0
    };
  }

  $scope.show = function show(item) {
    $scope.detalle = item;
  }

  $scope.save = function save() {
    facturaService.save($scope.factura).$promise.then(function(response) {
      console.log("se guardó la factura");
    }, function(err) {
      console.log(err);
    });
  }

  $scope.init();
}
