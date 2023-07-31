/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';

describe('bbc register page', () => {
    const dayMonth = 1
    const year = 1998
    const sevenCharacters = '1234567'
    beforeEach(() => {
        cy.visit('https://bbc.in/3q0Cucp')
    })
    context('under 16 and 16 or over', () => {
        it('Should not allow registration for individuals under 16 years old', () => {
            cy.contains('span', 'Under 16')
                .click()
            cy.contains('span', 'Sorry, only 16s and over can register outside the UK')
                .should('be.visible')
        })

        it('Should successfully create an account for individuals over 16 years old.', () => {
            cy.contains('span', '16 or over')
                .click()
            cy.fillsDateBirth(dayMonth, dayMonth, year)
            cy.get('#submit-button')
                .click()
            cy.fillsRegisterPage(faker.internet.email(), '123qwe!@#159')
            cy.get('#location-select')
                .should('have.value', 'br')
            cy.get('#submit-button')
                .click()
            cy.get('#return-to-ptrt')
                .click()
            cy.origin('https://www.bbc.co.uk', () => {
                cy.get('#search-input')
                    .should('be.visible')
            })

        })

        it('Should not accept individuals under 16 years old.', () => {
            cy.contains('span', '16 or over')
                .click()
            cy.fillsDateBirth(dayMonth, dayMonth, year + 12)
            cy.get('#submit-button')
                .click()
            cy.contains('span', 'Sorry, you need to be 16 or over.')
                .should('be.visible')
        })

        it('Password field should not accept passwords without at least 8 characteres', () => {
            cy.contains('span', '16 or over')
                .click()
            cy.fillsDateBirth(dayMonth, dayMonth, year)
            cy.get('#submit-button')
                .click()
            cy.fillsRegisterPage(faker.internet.email(), sevenCharacters)
            cy.get('#submit-button')
                .click()
            cy.contains('span', 'Sorry, that password is too short')
                .should('be.visible')
            cy.contains('span', 'It needs to be eight characters or more.')
                .should('be.visible')
        })
        it('Password field should not accept passwords without at least a letter', () => {
            cy.contains('span', '16 or over')
                .click()
            cy.fillsDateBirth(dayMonth, dayMonth, year)
            cy.get('#submit-button')
                .click()
            cy.fillsRegisterPage(faker.internet.email(), `${sevenCharacters}#`)
            cy.get('#submit-button')
                .click()
            cy.contains('span', "Sorry, that password isn't valid")
                .should('be.visible')
            cy.contains('span', 'Please include a letter.')
                .should('be.visible')
        })
        it('Password should have 8 characters with at least 1 letter, 1 number, or symbol.', () => {
            cy.contains('span', '16 or over')
                .click()
            cy.fillsDateBirth(dayMonth, dayMonth, year)
            cy.get('#submit-button')
                .click()
            cy.fillsRegisterPage(faker.internet.email(), '1q6s9d8r')
            cy.get('#password-input')
                .tab()
            cy.get('#password').should('not.have.class', 'field--invalid')
        })

    })
})