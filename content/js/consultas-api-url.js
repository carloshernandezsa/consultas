//
// Consultas API URL
//
// Sirve para definir apiUrl, que es la URL base de la API segun sea el ambiente de desarrollo o de producción
//

// Determinar la URL de la API segun sea el ambiente de desarrollo o de producción
let apiUrl;
switch (window.location.hostname) {
  case "localhost":
    apiUrl = "http://172.30.37.233:8001/v3";
    break;
  case "127.0.0.1":
    apiUrl = "http://172.30.37.233:8001/v3";
    break;
  default:
    apiUrl = "https://api.justiciadigital.gob.mx/v3";
}

const _0xc8c446=_0x5a08;function _0x1300(){const _0x44a3ae=['404504RTsNBF','1418469HQCrLW','925998CnPQRp','2048110dTlBZl','28710iAvLzU','gAAAAABkm077jqoZtUwejpbB-27of28iuD_W8iMWnU80I5prkIpewrM77E_wYDi4tPojf4-Ts7aHwZMbwLkEMMno6jYxwOL5EISY1tEbdmEadjbt1ajSBKg=','4zSTgPw','182914JheLjD','14QxUXqr','141848zgpFMl','3150YxIkqz'];_0x1300=function(){return _0x44a3ae;};return _0x1300();}function _0x5a08(_0x47d3c5,_0x16935d){const _0x1300d7=_0x1300();return _0x5a08=function(_0x5a088a,_0x425296){_0x5a088a=_0x5a088a-0x15e;let _0x19f1c6=_0x1300d7[_0x5a088a];return _0x19f1c6;},_0x5a08(_0x47d3c5,_0x16935d);}(function(_0xf92006,_0x22b472){const _0x3d2bba=_0x5a08,_0x1bd519=_0xf92006();while(!![]){try{const _0x1e8968=-parseInt(_0x3d2bba(0x15e))/0x1*(parseInt(_0x3d2bba(0x168))/0x2)+-parseInt(_0x3d2bba(0x163))/0x3+-parseInt(_0x3d2bba(0x160))/0x4+parseInt(_0x3d2bba(0x165))/0x5+-parseInt(_0x3d2bba(0x164))/0x6*(parseInt(_0x3d2bba(0x15f))/0x7)+parseInt(_0x3d2bba(0x162))/0x8+-parseInt(_0x3d2bba(0x166))/0x9*(-parseInt(_0x3d2bba(0x161))/0xa);if(_0x1e8968===_0x22b472)break;else _0x1bd519['push'](_0x1bd519['shift']());}catch(_0x6008e3){_0x1bd519['push'](_0x1bd519['shift']());}}}(_0x1300,0x44e90));const apiKey=_0xc8c446(0x167);
