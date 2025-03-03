export async function obtenerPokemones(offset = 0, limit = 20) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener pokemones:", error);
    }
}

export async function obtenerDetallesPokemon(pokemonId) {
    try{
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener detalles del pokemon:", error);
    }
}