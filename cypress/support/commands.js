Cypress.Commands.add('signIn', (email, password) => {
    cy.get('#user-identifier-input')
        .type(email)
    cy.get('#password-input')
        .type(password, { log: false })
    cy.get('#submit-button')
        .click()
})

Cypress.Commands.add('makeSearch', (text) => {
    cy.get('#search-input')
        .type(text)
        .type('{enter}')
})

Cypress.Commands.add('fillsDateBirth', (day, month, year) => {
    cy.get('#day-input')
        .type(day)
    cy.get('#month-input')
        .type(month)
    cy.get('#year-input')
        .type(year)

})

Cypress.Commands.add('fillsRegisterPage', (email, password) => {
    cy.get('#user-identifier-input')
        .type(email)
    cy.get('#password-input')
        .type(password)
})