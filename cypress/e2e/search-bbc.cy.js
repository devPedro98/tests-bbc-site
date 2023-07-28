/// <reference types="Cypress" />

describe('test the search field on the bbc site', () => {
    beforeEach(() => {
        cy.visit('https://www.bbc.co.uk/search?q=&d=HOMEPAGE_GNL')
    })

    context('Search', () => {
        it('successfully', () => {
            const text = 'Brazil'
           cy.makeSearch(text)
            cy.contains('p', text)
                .should('be.visible')

        })

        it('fail', () => {
            const text = 'duhuashdusa'
            cy.makeSearch(text)
            cy.contains('p', `Sorry, there are no results for ${text}.`)
                .should('be.visible')
        })
    })

})