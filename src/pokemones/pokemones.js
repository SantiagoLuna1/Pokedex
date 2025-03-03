//crea las cartas en la pantalla
export function mostrarPokemones(datosPokemones){
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