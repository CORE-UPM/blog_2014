
var urlm = require('url');


function addPagenoToUrl(url,pageno) {

    var urlObj = urlm.parse(url,true);

    urlObj.query.pageno = pageno;

    delete urlObj.search;

    return urlm.format(urlObj);
}


// Funcion de ayuda para paginar.
// Devuleve un fragmento HTML con la botonera usada para paginar.
// 
exports.paginate = function(totalItems,itemsPerPage,currentPage,url) {

    var pagctrl = [];
    
    pagctrl.push('<ul class="pagination">');

    // Primero
    if (1 == currentPage) {
        pagctrl.push('<li class="disable"> <a href="#"> Primero </a> </li>');
    } else {
        url = addPagenoToUrl(url,1);
        pagctrl.push('<li> <a href="' + url + '"> Primero </a></li>');
    }
    
    // Anterior
    if (1 == currentPage) {
        pagctrl.push('<li class="disable"> <a href="#"> Anterior </a></li>');
    } else {
        url = addPagenoToUrl(url, currentPage - 1);
        pagctrl.push('<li> <a href="' + url + '"> Anterior </a></li>');
    }

    // Paginas
    var total = Math.ceil(totalItems/itemsPerPage);
    var dots = true;

    for (var i=1 ; i <= total ; i++) {
        if (i === currentPage) {
            pagctrl.push('<li class="active"> <a href="#"> ' + i + '</a></li>');
            dots = true;
        } else {
            if (i >= currentPage - 2 && i <= currentPage + 2) {
                url = addPagenoToUrl(url,i);
                pagctrl.push('<li> <a href="' + url + '"> ' + i + ' </a></li>');
                dots = true;
            } else if (dots) {
                pagctrl.push('<li class="disabled"> <a href="#"> &#8230; </a></li>');
                dots = false;
            }
        }
    }

    // Siguiente
    if (total == currentPage) {
        pagctrl.push('<li class="disable"> <a href="#"> Siguiente </a></li>');
    } else {
        url = addPagenoToUrl(url, currentPage + 1);
        pagctrl.push('<li> <a href="' + url + '"> Siguiente </a></li>');
    }
    
    // Ultimo
    if (total == currentPage) {
       pagctrl.push('<li class="disable"> <a href="#"> Último </a></li>');
    } else {
       url = addPagenoToUrl(url, total);
       pagctrl.push('<li> <a href="' + url + '"> Último  </a></li>');
    }

    pagctrl.push('</ul>');

    return pagctrl.join('');
}
