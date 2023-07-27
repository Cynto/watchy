describe('register page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('displays correct elements', () => {
    cy.get('main').should('exist');
    cy.get('header > h1').should('exist');
    cy.get('header > p').should('exist');
    cy.get('form').should('exist');
    cy.get('form').children().should('have.length', 6);
    cy.get('form label')
      .should('contain', 'Email')
      .and('contain', 'Username')
      .and('contain', 'Password')
      .and('contain', 'Confirm Password');
    cy.get('form legend').should('contain', 'Date of Birth');
    cy.get('input').should('have.length', 6);
    cy.get('select').should('have.length', 1);
  });
});
