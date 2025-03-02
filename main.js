const coloresPorTipo = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
};

//obtiene el offset y el limit
function obtenerParametrosDeURL(url) {
    let offset;
    let limit;
    try {
        offset = /offset=([0-9]+)/gi.exec(url).pop();
        limit = /limit=([0-9]+)/gi.exec(url).pop();
    } catch (e) {
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

function manejarCambioPagina(e) {
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

function mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior) {
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

    $paginador.addEventListener('click', manejarCambioPagina);
}

function cambiarPagina(pagina) {
    const POKEMONES_POR_PAGINA = 20;
    let paginaActual;
    let offset;
    let limit = POKEMONES_POR_PAGINA;

    if (typeof pagina === 'number') {
        offset = POKEMONES_POR_PAGINA * (pagina - 1);
        paginaActual = pagina;
    } else {
        const parametros = obtenerParametrosDeURL(pagina);
        offset = parametros.offset;
        limit = parametros.limit;
        paginaActual = Math.ceil(offset / limit) + 1;
    }

    return obtenerPokemones(offset, limit).then((respuesta) => {
        const {
            results: pokemones, count: totalPokemones, next: urlSiguiente, previous: urlAnterior
        } = respuesta;
        
        const promesasDetalles = pokemones.map(pokemon => {
            const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
            return obtenerDetallesPokemon(pokemonId);
        });

    return Promise.all(promesasDetalles).then(detallesPokemones => {
        const datosPokemones = detallesPokemones.map(data => ({
            id: data.id,
            nombre: data.name,
            imagen: data.sprites.other['official-artwork'].front_default,
            tipos: data.types.map(tipo => tipo.type.name)
        }));

    mostrarPokemones(datosPokemones); 
    mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior, manejarCambioPagina);
    });
    });
}

function obtenerPokemones(offset = 0, limit = 20) {
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(respuesta => respuesta.json());
}

function obtenerDetallesPokemon(pokemonId) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then(respuesta => respuesta.json())
        .catch(error => console.error("Error al obtener detalles del Pokémon:", error));
}

//crea las cartas en la pantalla
function mostrarPokemones(datosPokemones){
    const $contenedor = document.querySelector('.contenedor');
    $contenedor.innerHTML = '';
    datosPokemones.forEach(detalles => {
        const $pokemonDiv = document.createElement('div');
        $pokemonDiv.classList.add('pokemon');
        $contenedor.appendChild($pokemonDiv);
        //agrega un div imagen al div contenedor
        const $pokemonImagenDiv = document.createElement('div');
        $pokemonImagenDiv.classList.add('pokemon-imagen');
        $pokemonDiv.appendChild($pokemonImagenDiv);
        //agregar imagen y nombre al div
        const $pokemonImagen = document.createElement('img');
        $pokemonImagen.src = detalles.imagen;
        $pokemonImagen.alt = detalles.nombre;
        $pokemonImagenDiv.appendChild($pokemonImagen);
        //agregar un div info
        const $pokemonInfoDiv = document.createElement('div');
        $pokemonInfoDiv.classList.add('pokemon-info');
        $pokemonDiv.appendChild($pokemonInfoDiv);
        //agregar dos contenedores al contenedor info
        const $pokemonNombreContenedorDiv = document.createElement('div');
        $pokemonNombreContenedorDiv.classList.add('nombre-contenedor');
        $pokemonInfoDiv.appendChild($pokemonNombreContenedorDiv);
        //agregar nombre y id al primer contenedor dentro de info
        const $pokemonId = document.createElement('span');
        $pokemonId.classList.add('pokemon-id');
        $pokemonId.textContent = `#${String(detalles.id).padStart(3, '0')}`; 
        $pokemonNombreContenedorDiv.appendChild($pokemonId);
        const $pokemonNombre = document.createElement('span');
        $pokemonNombre.classList.add('pokemon-nombre');
        $pokemonNombre.textContent = detalles.nombre;
        $pokemonNombreContenedorDiv.appendChild($pokemonNombre);
        //contenedor tipos dentro de contenedor info
        const $pokemonTiposContenedorDiv = document.createElement('div');
        $pokemonTiposContenedorDiv.classList.add('pokemon-tipos');
        $pokemonInfoDiv.appendChild($pokemonTiposContenedorDiv);
        //tipos
        detalles.tipos.forEach(tipo => {
            const $pokemonTipo = document.createElement('p');
            $pokemonTipo.classList.add('tipo');
            $pokemonTipo.textContent = tipo;
            $pokemonTipo.style.backgroundColor = coloresPorTipo[tipo.toLowerCase()];
            $pokemonTipo.style.color = "#fff";
            $pokemonTiposContenedorDiv.appendChild($pokemonTipo);
        });
    });
}

function iniciar() {
    cambiarPagina(1);

}

iniciar();