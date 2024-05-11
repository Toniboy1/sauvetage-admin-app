/**
 * this test will perform crud operations on alarmes
 */
describe('Alarmes crud', () => {
    it('should navigate to the page alarmes', () => {
        cy.visit(`http://localhost:8888/alarmes/`,{
            onBeforeLoad(win) {
                win.indexedDB.deleteDatabase("renderer/model/db/index.ts")
            }
        })
    })

    it('should create a new alarme', () => { 
        cy.visit(`http://localhost:8888/alarmes/`)
        cy.get('#add-alarm').click()
    })

    it('should edit the alarme', () => {
        cy.visit(`http://localhost:8888/alarmes/`)
        cy.get('#edit-alarm-0').click()
        cy.get('input[name="name"]').clear().type('Alarme 1 updated')
        cy.get('#edit-cancel-alarm-1').click()
    })

    it('should delete the alarme', () => {
        cy.visit(`http://localhost:8888/alarmes/`)
        cy.get('#delete-alarm-0').click()
    })
})