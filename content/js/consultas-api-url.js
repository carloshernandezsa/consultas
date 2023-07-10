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

const _0x4aada0=_0x24dd;(function(_0x3c866e,_0x5ba30a){const _0x3d83ef=_0x24dd,_0x34b8a3=_0x3c866e();while(!![]){try{const _0x4f7cff=-parseInt(_0x3d83ef(0x1cf))/0x1+-parseInt(_0x3d83ef(0x1d2))/0x2*(parseInt(_0x3d83ef(0x1cc))/0x3)+parseInt(_0x3d83ef(0x1c9))/0x4*(parseInt(_0x3d83ef(0x1cb))/0x5)+-parseInt(_0x3d83ef(0x1d3))/0x6+parseInt(_0x3d83ef(0x1d4))/0x7*(-parseInt(_0x3d83ef(0x1ca))/0x8)+parseInt(_0x3d83ef(0x1ce))/0x9*(parseInt(_0x3d83ef(0x1d1))/0xa)+parseInt(_0x3d83ef(0x1d0))/0xb*(parseInt(_0x3d83ef(0x1d5))/0xc);if(_0x4f7cff===_0x5ba30a)break;else _0x34b8a3['push'](_0x34b8a3['shift']());}catch(_0x492007){_0x34b8a3['push'](_0x34b8a3['shift']());}}}(_0x5776,0xc3a20));function _0x24dd(_0x5ab10c,_0x199ab4){const _0x57763d=_0x5776();return _0x24dd=function(_0x24dd9b,_0x30a585){_0x24dd9b=_0x24dd9b-0x1c9;let _0x295fa5=_0x57763d[_0x24dd9b];return _0x295fa5;},_0x24dd(_0x5ab10c,_0x199ab4);}function _0x5776(){const _0x357039=['10sAOIbG','18462sDuZUa','1332540AvxzJC','175ukjAiI','27898788KwyRpu','5164acmvMB','37464GTDnFb','795uhUAHR','39XofLBl','gAAAAABkrD4KmbixatbFnnkiBeEphW7cOGw3SO2Cs6DMrpD_qY4kUlV_L2ydUlZfcHtH6L2D1PR_-D96bDQ3ziG1nwKyO4j_QrmF6qvbPtuaghQMDf-9Bqg=','252162KHnFEd','1297706xOKnEh','11JybMOl'];_0x5776=function(){return _0x357039;};return _0x5776();}const apiKey=_0x4aada0(0x1cd);
