/// <reference types="Cypress" />

describe('Pruebas de paginación', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0', {
            fixture: 'listado-pagina-1'
        }).as('obtenerPrimeraPagina');
    
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20', {
            fixture: 'listado-pagina-2'
        }).as('obtenerSegundaPagina');
    
        cy.visit('http://127.0.0.1:5500/index.html'); 
        cy.get('.pokemon').should('have.length', 20);
    
        cy.wait('@obtenerPrimeraPagina'); 
    });

    it('Navega a la segunda página', () => {
        cy.get('#paginador .page-link:last').click(); 
        cy.wait('@obtenerSegundaPagina');
    });

    it('Verifica el estado de los botones de paginación', () => {
        cy.get('#paginador .page-link:first')
            .as('paginaAnterior') //tiene un alias para ser usado abajo @paginaAnterior
            .parent()
            .should('have.class', 'disabled');

        cy.get('#paginador .page-link:last')
            .as('paginaSiguiente')
            .click();

        cy.wait(10000);

        cy.get('@paginaAnterior')
            .parent()
            .should('not.have.class', 'disabled');

        cy.get('@paginaSiguiente')
            .parent()
            .should('not.have.class', 'disabled');

        cy.get('@paginaAnterior')
            .click();

        cy.wait(10000);

        cy.get('@paginaAnterior')
            .parent()
            .should('have.class', 'disabled');
    });
});