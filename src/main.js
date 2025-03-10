import { obtenerDetallesPokemon } from './api/pokedex.js';
import { mostrarPaginador } from './ui/paginacion.js';
import { mostrarPokemones } from './pokemones/pokemones.js';
import { cargarPokemones } from './storage/pokedex.js';
import obtenerParametrosDeURL from './utilidades/utilidades.js'
import { mapearPokemon } from './clases_y_mapeadores/pokemon.js';

async function cambiarPagina(pagina) {
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

    const listadoPokemones = await cargarPokemones(offset, limit);

    const detallesPokemones = await Promise.all(listadoPokemones.resultados.map(async (pokemon) => {
        const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
        return await obtenerDetallesPokemon(pokemonId);
    }));

    const datosPokemones = detallesPokemones.map(mapearPokemon);

    mostrarPokemones(datosPokemones); 
    mostrarPaginador(
        listadoPokemones.total,
        paginaActual,
        listadoPokemones.siguienteUrl,
        listadoPokemones.anteriorUrl,
        cambiarPagina
    );
}

export default function inicializar() {
    return cambiarPagina(1)
    .catch((e) => console.error(e));
}