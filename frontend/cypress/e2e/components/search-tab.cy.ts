describe('Search tab', () => {
  it('should display search tab', () => {
    cy.visit('/');

    cy.get('[data-cy="search-tab"]').should('be.visible');
  });
});

describe('Search tab', () => {
  it('should search by title or campaign URL', () => {
    cy.visit('/');

    cy.get('[data-cy="search-input"]').type('test');
  });
});

describe('Search tab', () => {
  it('should filter by "is Running"', () => {
    cy.visit('/');

    cy.get('[data-cy="filter-input"]').click();
  });
});
