import { obtenerDetallesPokemon } from './api/pokedex.js';
import { obtenerParametrosDeURL, mostrarPaginador } from './ui/paginacion.js';
import { mostrarPokemones } from './pokemones/pokemones.js';
import { cargarPokemones } from './storage/pokedex.js';

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

    try {
        const respuesta = await cargarPokemones(offset, limit);
        const {
            results: pokemones, count: totalPokemones, next: urlSiguiente, previous: urlAnterior
        } = respuesta;
        
        const detallesPokemones = await Promise.all(pokemones.map(async (pokemon) => {
            const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
            return await obtenerDetallesPokemon(pokemonId);
        }));

        const datosPokemones = detallesPokemones.map(data => ({
            id: data.id,
            nombre: data.name,
            imagen: data.sprites.other['official-artwork'].front_default,
            tipos: data.types.map(tipo => tipo.type.name)
        }));

        mostrarPokemones(datosPokemones); 
        mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior, cambiarPagina);
    } catch (error) {
        console.error("Error al cambiar de página:", error);
    }
}

function iniciar() {
    cambiarPagina(1);

}

iniciar();