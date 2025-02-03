describe('Add campaign modal', () => {
  it('should add a campaign', () => {
    cy.visit('/');

    cy.get('[data-cy="add-campaign-button"]').click();

    cy.get('[data-cy="campaign-title"]').type('Test campaign');

    cy.get('[data-cy="campaign-url"]').type('https://example.com');

    cy.get('[data-cy="payout-country"]').select('United States');

    cy.get('[data-cy="payout-amount"]').type('100');

    cy.get('[data-cy="add-campaign"]').click();
  });
});
