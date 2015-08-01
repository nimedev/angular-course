controllers.controller('CtrlTerceros', ['$scope', 'MensajesFactory',
  'TerceroService', 'CONSTANTS', controlador
]);

function controlador($scope, mensaje, terceroService, constants) {

  $scope.personas = [];
  $scope.persona = {};

  // inicia tipos
  terceroService.tipos().$promise.then(function(response) {
    $scope.tipos = response;
  }, function(err) {
    $scope.tipos = [{
      "id": "CC",
      "descripcion": "Cedula de ciudadania"
    }, {
      "id": "NI",
      "descripcion": "Nit"
    }]
    console.log(err);
  });

  // inicia campos del form
  $scope.init = function() {
    $scope.persona = {
      strTipoDocumento: constants.TIPO_DOCUMENTO_POR_DEFECTO
    };
  }

  $scope.save = function() {
    terceroService.save($scope.persona).$promise.then(function(response) {
      if ($scope.frmPersona.$valid) {
        console.log("se guardó la persona");
        mensaje.mensaje('#myOk');
        $scope.init();
        $scope.getPersons();
      } else {
        console.log('INVALIDO!');
      }
    }, function(err) {
      console.log(err);
      mensaje.mensaje('#myError');
    });
  }

  $scope.getPersons = function() {
    terceroService.findAll().$promise.then(function(response) {
      $scope.personas = response;
    }, function(err) {
      console.log(err);
    });
  }

  $scope.deletePerson = function(person) {
    console.log(person)
    for (var d in person) {
      console.log(d);
    }
    // terceroService.delete().$promise.then(function(response) {
    //   console.log("se elimino persona");
    //   $scope.getPersons();
    // }, function(err) {
    //   console.log(err);
    //   mensaje.mensaje('#myError');
    // });
  }

  $scope.reset = function(frmPersona) {
    if (frmPersona) {
      frmPersona.$setPristine();
      frmPersona.$setUntouched();
    }
  };

  $scope.reset();

  $scope.init();
  $scope.getPersons();
}
