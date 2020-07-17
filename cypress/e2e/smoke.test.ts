describe('app', () => {
  it('works', () => {
    cy.visit('/')

    // wait for rehydration
    cy.wait(500)
  })
})
