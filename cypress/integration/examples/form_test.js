describe('User input tests', () => {


    const nameField = () => cy.get('input[name = "name"]')
    const emailField = () => cy.get('input[name = "email"]')
    const passField = () => cy.get('input[name = "password"]')
    const tosCheckbox = () => cy.get('input[type = "checkbox"]')
    const submitBtn = () => cy.get('button[name = "submit"]')

    it('Checking that all elements are real', () => {
        expect(2 + 2).to.equal(4)
        cy.visit('http://localhost:3000/')
        nameField().should('exist')
        emailField().should('exist')
        passField().should('exist')
        tosCheckbox().should('exist')
        submitBtn().should('exist')
    })

    it('Checking that name field can recieve input', () => {
        nameField()
            .should('have.value', '')
            .type('Chaz')
            .should('have.value', 'Chaz')
    })

    it('Checking that email field can recieve input', () => {
        emailField()
            .should('have.value', '')
            .type('Chaz@chaz.chaz')
            .should('have.value', 'Chaz@chaz.chaz')
    })

    it('Checking that password field can recieve input', () => {
        passField()
            .should('have.value', '')
            .type('password')
            .should('have.value', 'password')
    })

    it('Checking that ToS box can be checked', () => {
        tosCheckbox()
            .check()
    })

    it('Checking that the submit button is working', () => {
        submitBtn()
            .click()
    })

    it('Checking form validation', () => {
        nameField()
            .type('Ch')
        passField()
            .type('passwo')
        emailField()
            .type('not an email')
        submitBtn()
            .should('be.disabled')
    })
})