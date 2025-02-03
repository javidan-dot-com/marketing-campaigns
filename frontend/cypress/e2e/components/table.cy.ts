describe('Table', () => {
  it('should display table', () => {
    cy.visit('/');

    cy.get('[data-cy="table"]').should('exist');
  });

  it('should toggle campaign status', () => {
    cy.visit('/');

    cy.get('[data-cy="toggle-status"]').should('be.checked');
  });
});
