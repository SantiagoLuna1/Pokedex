import {crearItemPaginador, manejarCambioPagina, mostrarPaginador} from '../paginacion.js'

test ('crearItemPaginador debe crear un elemento de paginación con el texto y URL correctos', () => {
    const item = crearItemPaginador('1', 'https://asd.com/pagina1');
    
    expect(item.tagName).toBe('LI');
    expect(item.className).toContain('page-item');

    const link = item.querySelector('a'); //buscar el <a> dentro del <li>
    expect(link).toBeDefined();
    expect(link.classList.contains('page-link')).toBe(true);
    expect(link.textContent).toBe('1');
    expect(link.href).toBe('https://asd.com/pagina1');
});


describe('mostrarPaginador', () => {
    let $paginador;

    beforeEach(() => {
        document.body.innerHTML = '<ul class="pagination"></ul>';
        $paginador = document.querySelector('.pagination');
    });

    test('mostrarPaginador debe mostrar 5 botones', () => {
        mostrarPaginador(1300, 5, 'https://asd.com/pagina6', 'https://asd.com/pagina4', () => {});
        const items = $paginador.querySelectorAll('li');
        expect(items.length).toBe(5);
    });

    test('debe marcar el botón de la página actual como activo', () => {
        mostrarPaginador(1300, 5, 'https://asd.com/pagina6', 'https://asd.com/pagina4', () => {});
        const paginaActual = $paginador.querySelector('.active');
        expect(paginaActual.textContent).toBe('5');
    });

    test('el botón "Anterior" debe estar deshabilitado si no hay URL anterior', () => {
        mostrarPaginador(1300, 1, 'https://asd.com/pagina2', null, () => {});
        const botonAnterior = $paginador.querySelector('.boton-anterior');
        expect(botonAnterior.classList.contains('disabled')).toBe(true);
    });
    
    test('el botón "Siguiente" debe estar deshabilitado si no hay URL siguiente', () => {
        mostrarPaginador(1300, 66, null, 'https://asd.com/pagina65', () => {});
        const botonSiguiente = $paginador.querySelector('.boton-siguiente');
        expect(botonSiguiente.classList.contains('disabled')).toBe(true);
    });
});