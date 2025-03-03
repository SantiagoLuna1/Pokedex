//obtiene el offset y el limit
export function obtenerParametrosDeURL(url) {
    let offset;
    let limit;
    try {
        offset = /offset=([0-9]+)/gi.exec(url).pop();
        limit = /limit=([0-9]+)/gi.exec(url).pop();
    } catch {
        offset = undefined;
        limit = undefined;
    }
    return { offset, limit };
}

function crearItemPaginador(texto, url = '#') {
    const $item = document.createElement('li');
    const $link = document.createElement('a');
    $item.className = 'page-item';
    $link.className = 'page-link';
    $link.textContent = texto;
    $link.href = url;
    $link.dataset.pagina = texto;

    $item.appendChild($link);

    return $item;
}

export function manejarCambioPagina(e, cambiarPagina) {
    e.preventDefault();
    const { target } = e;
    const href = target.getAttribute('href');
    let numeroPagina;
    const { pagina } = target.dataset;
    if (href === '#') {
        numeroPagina = Number(pagina);
        cambiarPagina(numeroPagina);
    } else {
        cambiarPagina(href);
    }
}

export function mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior, cambiarPagina) {
    const POKEMONES_POR_PAGINA = 20;
    const $paginador = document.querySelector('.pagination');
    $paginador.innerHTML = '';

    const totalPaginas = Math.ceil(totalPokemones / POKEMONES_POR_PAGINA);

    const $paginaAnterior = crearItemPaginador('Anterior', urlAnterior);
    
    if(urlAnterior) {
        $paginaAnterior.classList.remove('disabled');
    } else {
        $paginaAnterior.classList.add('disabled');
    }
    $paginador.appendChild($paginaAnterior);

    //muestra solo ciertas páginas
    let paginasMostrar = [];
    
    if (paginaActual <= 2) {
        paginasMostrar = [1, 2, 3];
    } else if (paginaActual >= totalPaginas - 1) {
        paginasMostrar = [totalPaginas - 2, totalPaginas - 1, totalPaginas];
    } else {
        paginasMostrar = [paginaActual - 1, paginaActual, paginaActual + 1];
    }

    //crea las páginas
    paginasMostrar.forEach((pagina) => {
        const $pagina = crearItemPaginador(pagina);
        if (pagina === paginaActual) {
            $pagina.classList.add('active');
        }
        $paginador.appendChild($pagina);
    });

    const $paginaSiguiente = crearItemPaginador('Siguiente', urlSiguiente);
    if(urlSiguiente) {
        $paginaSiguiente.classList.remove('disabled');
    } else {
        $paginaSiguiente.classList.add('disabled');
    }
    $paginador.appendChild($paginaSiguiente);

    $paginador.addEventListener('click', (e) => manejarCambioPagina(e, cambiarPagina));
}