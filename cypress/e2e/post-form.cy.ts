describe('New post', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#email').type('alice@blog.com');
    cy.get('#password').type('alice123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('navigates to the new post form from the dashboard', () => {
    cy.get('a.btn-new').click();
    cy.url().should('include', '/dashboard/posts/new');
    cy.get('#title').should('exist');
    cy.get('#content').should('exist');
  });

  it('creates a published post and shows it in the dashboard', () => {
    cy.get('a.btn-new').click();
    cy.url().should('include', '/dashboard/posts/new');

    cy.get('#title').type('Cypress Test Post');
    cy.get('#content').type('This post was created by a Cypress E2E test.');
    cy.get('#status').select('published');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('.post-card h2', 'Cypress Test Post').should('exist');
  });

  it('creates a draft post and shows it with draft badge', () => {
    cy.get('a.btn-new').click();
    cy.url().should('include', '/dashboard/posts/new');

    cy.get('#title').type('Draft from Cypress');
    cy.get('#content').type('This is a draft post.');
    cy.get('#status').select('draft');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('.post-card h2', 'Draft from Cypress')
      .closest('.post-card')
      .find('.status-badge.draft')
      .should('exist');
  });

  it('shows validation errors when submitting an empty form', () => {
    cy.get('a.btn-new').click();
    cy.url().should('include', '/dashboard/posts/new');
    cy.get('button[type="submit"]').click();
    cy.get('.field-error').should('have.length', 2);
  });
});
