//
// Consultas API URL
//
// Sirve para definir apiUrl, que es la URL base de la API segun sea el ambiente de desarrollo o de producción
//

// Determinar la URL de la API segun sea el ambiente de desarrollo o de producción
let apiUrl;
let apiUrlPrometeo;

switch (window.location.hostname) {
  case "localhost":
    apiUrl = "https://api.justiciadigital.gob.mx/v3";
    apiUrlPrometeo = "https://archivos.justiciadigital.gob.mx/v4";
    break;
  case "127.0.0.1":
    apiUrl = "https://api.justiciadigital.gob.mx/v3";
    apiUrlPrometeo = "https://archivos.justiciadigital.gob.mx/v4" ;
    break;
  default:
    apiUrl = "https://api.justiciadigital.gob.mx/v3";
    apiUrlPrometeo = "https://archivos.justiciadigital.gob.mx/v4" ;
}

function esperar(miliSegundos) {
  return new Promise((resolve) => setTimeout(resolve, miliSegundos));
}

const _0x547c42=_0x2983;function _0x5e5f(){const _0x2ced38=['gAAAAABk0PpL-s9M3ahForwt74_q5aqMRphQAfQsnZ4E18CfXRVVBQAJbnt6kMI5RBXbl4YqseojLzeep8fZb3a3laj_InwzXpnjS1_ufAzH3Uj6JKcQ61E=','3152195KuHnvg','1159902fqXzzY','1952752gUNHAC','1529312GHfjfP','1XhQWdB','3019842szaNgp','3352251bADafa','6425874ovizwm'];_0x5e5f=function(){return _0x2ced38;};return _0x5e5f();}(function(_0x1137d0,_0x55bdcf){const _0x4d5c9a=_0x2983,_0x3109e0=_0x1137d0();while(!![]){try{const _0x25f1fb=-parseInt(_0x4d5c9a(0xa6))/0x1*(-parseInt(_0x4d5c9a(0xac))/0x2)+-parseInt(_0x4d5c9a(0xa8))/0x3+parseInt(_0x4d5c9a(0xae))/0x4+parseInt(_0x4d5c9a(0xab))/0x5+-parseInt(_0x4d5c9a(0xa7))/0x6+parseInt(_0x4d5c9a(0xa9))/0x7+-parseInt(_0x4d5c9a(0xad))/0x8;if(_0x25f1fb===_0x55bdcf)break;else _0x3109e0['push'](_0x3109e0['shift']());}catch(_0x202ff6){_0x3109e0['push'](_0x3109e0['shift']());}}}(_0x5e5f,0x9dafa));function _0x2983(_0x783d98,_0xdf1ff7){const _0x5e5f60=_0x5e5f();return _0x2983=function(_0x2983a7,_0x223d9c){_0x2983a7=_0x2983a7-0xa6;let _0x1e83a0=_0x5e5f60[_0x2983a7];return _0x1e83a0;},_0x2983(_0x783d98,_0xdf1ff7);}const apiKey=_0x547c42(0xaa);
