class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.nombre = data.name;
    this.imagen = data.sprites.other['official-artwork'].front_default;
    this.tipos = data.types.map((item) => item.type.name)
  }
}

export function mapearPokemon(datosApi) {
  return new Pokemon(datosApi);
}

class ListadoPokemones {
  constructor(data) {
    this.total = data.count;
    this.siguienteUrl = data.next;
    this.anteriorUrl = data.previous;
    this.resultados = data.results
  }
}

export function mapearListadoPokemones(datosApi) {
  return new ListadoPokemones(datosApi);
}