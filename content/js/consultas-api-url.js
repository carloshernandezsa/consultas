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

function _0x1664(_0x37fc69,_0x4bf5fe){const _0x40c9cd=_0x40c9();return _0x1664=function(_0x1664f6,_0x1b101a){_0x1664f6=_0x1664f6-0x7e;let _0x434081=_0x40c9cd[_0x1664f6];return _0x434081;},_0x1664(_0x37fc69,_0x4bf5fe);}const _0x40057c=_0x1664;function _0x40c9(){const _0x5a7223=['75666bCahZd','8104fhWzNd','gAAAAABkqHOtgNBPehpm0VsoJUBelM16x3En-l7fzF-P1alK-TPIa-w2nrj5OpR9olgi70wp_MfBm9_lXKygJlz74WAPOF86qfErC9l-riLAKXM5kQ3X3G4=','833154znYVbG','484749TEjTiM','174LCHoYm','80607VUSMeS','1146192XVIMAi','155pbOHjX','1591184OiHUyD'];_0x40c9=function(){return _0x5a7223;};return _0x40c9();}(function(_0x426420,_0x4d419e){const _0x3494dd=_0x1664,_0x2ed06=_0x426420();while(!![]){try{const _0x1300b0=-parseInt(_0x3494dd(0x80))/0x1*(-parseInt(_0x3494dd(0x86))/0x2)+-parseInt(_0x3494dd(0x81))/0x3+parseInt(_0x3494dd(0x84))/0x4+parseInt(_0x3494dd(0x83))/0x5*(-parseInt(_0x3494dd(0x85))/0x6)+-parseInt(_0x3494dd(0x7e))/0x7+-parseInt(_0x3494dd(0x82))/0x8+parseInt(_0x3494dd(0x7f))/0x9;if(_0x1300b0===_0x4d419e)break;else _0x2ed06['push'](_0x2ed06['shift']());}catch(_0x5b687c){_0x2ed06['push'](_0x2ed06['shift']());}}}(_0x40c9,0x745b7));const apiKey=_0x40057c(0x87);
