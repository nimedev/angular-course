controllers.controller('CtrlMenu', ['$scope', 'MensajesFactory',
  'MenuService', controlador
]);

function controlador($scope, mensaje, menuService) {
  $scope.menus = {};

  menuService.findAll().$promise.then(function(response) {
    $scope.menus = response;
  }, function(err) {
    console.log(err);
  });
}
