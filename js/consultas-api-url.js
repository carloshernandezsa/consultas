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

function _0x5bbb(_0x4adcbf,_0x1c0789){const _0x283177=_0x2831();return _0x5bbb=function(_0x5bbbcd,_0x33a68d){_0x5bbbcd=_0x5bbbcd-0x93;let _0x2c9cc2=_0x283177[_0x5bbbcd];return _0x2c9cc2;},_0x5bbb(_0x4adcbf,_0x1c0789);}const _0x44bce3=_0x5bbb;(function(_0x4d39dd,_0x2ed590){const _0x5d5d97=_0x5bbb,_0x25be60=_0x4d39dd();while(!![]){try{const _0x38a8a7=-parseInt(_0x5d5d97(0x95))/0x1+-parseInt(_0x5d5d97(0x97))/0x2+parseInt(_0x5d5d97(0x98))/0x3*(parseInt(_0x5d5d97(0x9c))/0x4)+parseInt(_0x5d5d97(0x93))/0x5+-parseInt(_0x5d5d97(0x96))/0x6+-parseInt(_0x5d5d97(0x94))/0x7*(-parseInt(_0x5d5d97(0x99))/0x8)+parseInt(_0x5d5d97(0x9b))/0x9;if(_0x38a8a7===_0x2ed590)break;else _0x25be60['push'](_0x25be60['shift']());}catch(_0x583b42){_0x25be60['push'](_0x25be60['shift']());}}}(_0x2831,0xb353d));function _0x2831(){const _0x3cfcc8=['77kaLmMB','778439JaUtnN','6486702TTazrU','2629340nQvOxx','681sHDTVl','874240lMIFAy','gAAAAABktVVNFrJK6kPMxdlEPNPGBZk_gxKaC8cCB3B207eRLLjsETFGMZ2dIM-vLIenRo0iWLOGSdbOPZYqYhldsxcn_LqM8ur3Cw7lVF1HSDOG7M9jhys=','19003329qwXOXB','4860dDzaym','1596925HugkLG'];_0x2831=function(){return _0x3cfcc8;};return _0x2831();}const apiKey=_0x44bce3(0x9a);
