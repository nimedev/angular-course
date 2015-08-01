services.factory('FacturaService', ['$resource',
  function($resource) {
    return $resource('', {}, {
      find: {
        method: 'GET',
        url: 'http://localhost:8080/angular-back/rest/factura/find/:id'
      },
      tipos: {
        url: 'http://localhost:8080/angular-back/rest/factura/tipos',
        method: 'POST',
        isArray: true
      },
      save: {
        url: 'http://localhost:8080/angular-back/rest/factura/save',
        method: 'POST',
        isArray: true
      },
      generar: {
        url: 'http://172.60.1.133:8080/angular-back/rest/factura/generar',
        method: 'POST',
        responseType: 'arraybuffer',
        transformResponse: function(data) {
          return {
            response: data
          }
        }
      }
    });
  }
]);

services.factory('TerceroService', ['$resource',
  function($resource) {
    return $resource('', {}, {
      save: {
        url: 'http://localhost:8080/api/tercero/save',
        method: 'POST'
      },
      delete: {
        url: 'http://localhost:8080/api/tercero/delete',
        method: 'POST'
      },
      findAll: {
        url: 'http://localhost:8080/api/tercero/findAll',
        method: 'POST',
        isArray: true
      },
      tipos: {
        url: 'http://localhost:8080/api/tercero/tiposDocumento',
        method: 'POST',
        isArray: true
      }
    });
  }
]);

services.factory('MenuService', ['$resource',
  function($resource) {
    return $resource('', {}, {
      findAll: {
        url: 'http://localhost:8080/api/menu/findAll',
        method: 'POST',
        isArray: true
      }
    });
  }
]);

services.factory('MensajesFactory', function() {

  var mensajesFactory = {};

  mensajesFactory.mensaje = function(id) {
    $(id).modal('show');
  }

  return mensajesFactory;

});
