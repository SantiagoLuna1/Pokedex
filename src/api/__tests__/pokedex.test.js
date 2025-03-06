import { obtenerPokemones, obtenerDetallesPokemon} from "../pokedex.js";

beforeEach(() => {
    global.fetch = jest.fn();
});

test('carga 1 pokemon', () => {
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
            r({});
        });
        resolve({ json: () => jsonPromise });
    }));

    obtenerDetallesPokemon('1');
    expect(global.fetch)
        .toHaveBeenCalledTimes(1);

    expect(global.fetch)
        .toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon/1/`);
});

test('cargar 1 pokemon sin identificador da error', () => {
    expect(obtenerDetallesPokemon())
        .rejects
        .toEqual(new Error('Se necesita un identificador para cargar un pokemón'));

    expect(global.fetch)
        .toHaveBeenCalledTimes(0);
});

test('carga listado de pokemones con parametros por default', () => {
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
            r([]);
        });
        resolve({ json: () => jsonPromise });
    }));

    obtenerPokemones();

    expect(global.fetch)
        .toHaveBeenCalledTimes(1);
    expect(global.fetch)
        .toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
});


test('carga listado de pokemones con parametros definidos por el usuario', () => {
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
        r([]);
        });
        resolve({ json: () => jsonPromise });
    }));

    obtenerPokemones(1, 15);

    expect(global.fetch)
        .toHaveBeenCalledTimes(1);
    expect(global.fetch)
        .toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon?limit=${15}&offset=1`);
});
