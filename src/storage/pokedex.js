import { obtenerPokemones } from "../api/pokedex.js";

function obtenerKeyPokemones(offset, limit) {
    return `pokemones_${offset}_${limit}`;
}

function guardarPokemonesEnLocalStorage(offset, limit, pokemones) {
    if (offset === undefined || limit === undefined || typeof pokemones !== 'object') {
        throw new Error('Se necesita offset, limite y pokemones');
    }

    localStorage.setItem(obtenerKeyPokemones(offset, limit), JSON.stringify(pokemones));
}

function cargarPokemonesDeLocalStorage(offset = 0, limit = 20) {
    const pokemones = JSON.parse(localStorage.getItem(obtenerKeyPokemones(offset, limit)));
    if (pokemones === null) {
        throw new Error(`Listado de pokemones con offset ${offset} y limite ${limit} no encontrado`);
    }

    return pokemones;
}

export async function cargarPokemones(offset = 0, limit = 20) {
    try{
        //lo busca en el localstorage
        return cargarPokemonesDeLocalStorage(offset, limit);
    } catch {
        //si no lo consigue lo pide desde la API
        const pokemones = await obtenerPokemones (offset, limit);
        //y lo guarda en localstorage, entonces la proxima vez lo encuentra directo en localstorage
        guardarPokemonesEnLocalStorage(offset, limit, pokemones);
        return pokemones;
    }
}
