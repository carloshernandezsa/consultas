//
// Consultas API URL
//
// Sirve para definir apiUrl, que es la URL base de la API segun sea el ambiente de desarrollo o de producción
//

// Determinar la URL de la API segun sea el ambiente de desarrollo o de producción
let apiUrl;
switch (window.location.hostname) {
  case "localhost":
    apiUrl = "http://localhost:8001/v3";
    break;
  case "127.0.0.1":
    apiUrl = "http://127.0.0.1:8001/v3";
    break;
  default:
    apiUrl = "https://api.justiciadigital.gob.mx/v3";
}

function esperar(miliSegundos) {
  return new Promise((resolve) => setTimeout(resolve, miliSegundos));
}

function _0x298d(_0x20f56f,_0x34cbad){const _0x476799=_0x4767();return _0x298d=function(_0x298dd3,_0x525ea0){_0x298dd3=_0x298dd3-0x80;let _0x51c60b=_0x476799[_0x298dd3];return _0x51c60b;},_0x298d(_0x20f56f,_0x34cbad);}const _0x3e265f=_0x298d;function _0x4767(){const _0x40eba6=['185872qYLPWV','1432408JxPaOq','10FUpvpv','1123038TBMfxl','7hZmLwT','12RaTqvB','660242UVTsAD','1pTkinl','1026800PbAyLs','202374SbXXCq','42406GblqER','gAAAAABkpXxWfVwxb56_V9NQLOb04-MUlvSagBGXduQhuEVZH7a9-aI60oUSF6n4xQeq8hksu9hpjps1tOLEUqBQVYgSr6Yurjt0a5ijg4xc-dO2TLLayQs='];_0x4767=function(){return _0x40eba6;};return _0x4767();}(function(_0x480b72,_0x349210){const _0x24417b=_0x298d,_0x442c08=_0x480b72();while(!![]){try{const _0x191af6=-parseInt(_0x24417b(0x89))/0x1*(-parseInt(_0x24417b(0x80))/0x2)+parseInt(_0x24417b(0x87))/0x3*(-parseInt(_0x24417b(0x82))/0x4)+-parseInt(_0x24417b(0x84))/0x5*(parseInt(_0x24417b(0x8b))/0x6)+-parseInt(_0x24417b(0x86))/0x7*(-parseInt(_0x24417b(0x83))/0x8)+parseInt(_0x24417b(0x85))/0x9+parseInt(_0x24417b(0x8a))/0xa+-parseInt(_0x24417b(0x88))/0xb;if(_0x191af6===_0x349210)break;else _0x442c08['push'](_0x442c08['shift']());}catch(_0x4f974d){_0x442c08['push'](_0x442c08['shift']());}}}(_0x4767,0x1bebc));const apiKey=_0x3e265f(0x81);
