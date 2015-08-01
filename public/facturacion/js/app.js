var facturacion = angular.module('facturacion', [
  'ngRoute',
  'facturacion.controllers',
  'facturacion.services',
  'ng-currency',
  'pascalprecht.translate'
]);

facturacion.config(['$routeProvider', '$translateProvider', config]);

function config($routeProvider, $translateProvider) {

  // routes
  $routeProvider.when('/factura', {
    templateUrl: 'facturacion/partials/factura/factura.html'
  });

  $routeProvider.when('/tercero', {
    templateUrl: 'facturacion/partials/tercero/tercero.html'
  });

  $routeProvider.when('/', {
    templateUrl: 'facturacion/partials/menu/menu.html'
  });

  // translate
  $translateProvider.translations('en', {
      SALUDO: 'Hello world'
    })
    .translations('es', {
      SALUDO: 'Hola mundo'
    });

  $translateProvider.preferredLanguage('es');
  $translateProvider.use('en');

}

facturacion.constant('CONSTANTS', {
  REST_URL: 'http://localhost:8080',
  LOCAL_URL: 'http://localhost:8080',
  TIPO_DOCUMENTO_POR_DEFECTO: "CC"
});

var controllers = angular.module('facturacion.controllers', []);
var services = angular.module('facturacion.services', ['ngResource']);

facturacion.directive('myDialog', function() {
  return {
    templateUrl: 'facturacion/partials/tmpl/modal.html',
    scope: {
      x: "=titulo",
      y: "=mensaje",
      i: "=id"
    }
  };
});
