/// <reference types="Cypress" />

describe('test the login page', () => {
    const email = Cypress.env('email_bbc')
    const password = Cypress.env('password_bbc')
    beforeEach(() => {
        cy.visit('https://bbc.in/3Yf4567')
    })
    context('sign in', () => {
        it('successfully', () => {
            cy.signIn(email, password)
            cy.get('#return-to-ptrt')
                .click()
            cy.get('a#idcta-link')
                .should('exist')
        })

        it('fail', () => {
            cy.signIn('wrong_email@gmail.com', 'wrong_password')
            cy.contains('span', 'Looks like either the email/username or password is wrong. Try again')
                .should('exist')
        })
    })

})