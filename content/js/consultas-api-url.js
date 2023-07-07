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

function _0x24e2(){const _0x2a1682=['10042270RXrNPF','17122HFaDFH','1317EdfsST','4424bPJIPB','9884988poxpzP','27327qeEFqB','3553310tbFzIu','8827188HoRmWZ','344uqhaKw','gAAAAABkpsKumGd7NQ9J7T8_-7tBUoKtfLDvif-4bOZMJWYoTnXaHOJUYYn85S66LkC13VVuL6ovdozGXKaomnaBnRl5XgYi6ZMyxYjcszufo-Zmj-OIACg=','2062HbZezY'];_0x24e2=function(){return _0x2a1682;};return _0x24e2();}const _0x30d0be=_0x56ec;function _0x56ec(_0xda3333,_0x4cd004){const _0x24e2e3=_0x24e2();return _0x56ec=function(_0x56ece5,_0x2d9460){_0x56ece5=_0x56ece5-0x172;let _0x2da4e4=_0x24e2e3[_0x56ece5];return _0x2da4e4;},_0x56ec(_0xda3333,_0x4cd004);}(function(_0x6dfa13,_0x556a34){const _0x2cb31f=_0x56ec,_0x2f0ef0=_0x6dfa13();while(!![]){try{const _0x220059=-parseInt(_0x2cb31f(0x173))/0x1*(parseInt(_0x2cb31f(0x17b))/0x2)+-parseInt(_0x2cb31f(0x176))/0x3*(-parseInt(_0x2cb31f(0x179))/0x4)+parseInt(_0x2cb31f(0x177))/0x5+parseInt(_0x2cb31f(0x178))/0x6+parseInt(_0x2cb31f(0x172))/0x7*(parseInt(_0x2cb31f(0x174))/0x8)+-parseInt(_0x2cb31f(0x175))/0x9+-parseInt(_0x2cb31f(0x17c))/0xa;if(_0x220059===_0x556a34)break;else _0x2f0ef0['push'](_0x2f0ef0['shift']());}catch(_0x3409f2){_0x2f0ef0['push'](_0x2f0ef0['shift']());}}}(_0x24e2,0xd158e));const apiKey=_0x30d0be(0x17a);
