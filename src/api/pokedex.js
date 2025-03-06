export async function obtenerPokemones(offset = 0, limit = 20) {
    return (await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)).json();
}

export async function obtenerDetallesPokemon(pokemonId) {
    if(pokemonId === undefined) {
        throw new Error('Se necesita un identificador para cargar un pokemón');
    }
        return (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)).json();
}