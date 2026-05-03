describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the Latest Posts heading', () => {
    cy.get('h1.page-title').should('contain.text', 'Latest Posts');
  });

  it('displays post cards', () => {
    cy.get('.post-card').should('have.length.greaterThan', 0);
  });

  it('each card shows a thumbnail image and a title', () => {
    cy.get('.post-card').first().within(() => {
      cy.get('.card-thumbnail img').should('exist');
      cy.get('.card-title').should('not.be.empty');
    });
  });

  it('clicking a card navigates to the post detail page', () => {
    cy.get('.post-card').first().click();
    cy.url().should('match', /\/posts\/\d+/);
    cy.get('.detail-title').should('exist');
  });
});
