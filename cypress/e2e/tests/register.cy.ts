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
    cy.get('form button').should('exist');
  });

  it('displays errors if no values are entered on submit', () => {
    cy.get('form button').click();

    cy.get('.input-error').should('have.length.at.least', 4);
  });

  it("displays errors if value don't meet requirements, and user moves onto next input", () => {
    cy.get('form button').as('submit');
    cy.contains('label', 'Email').next('input').type('test');
    cy.contains('label', 'Username').next('input').click().type('1');

    cy.get('.input-error').should('have.length', 1);

    cy.contains('label', 'Password').next('input').click().type('hhh');

    cy.get('.input-error').should('have.length', 2);

    cy.contains('label', 'Confirm Password').next('input').click().type('hh');

    cy.get('.input-error').should('have.length', 3);

    cy.contains('label', 'Password').next('input').click().type('hhhhhhhhh');

    cy.get('.input-error').should('have.length', 4);

    cy.get('@submit').click();

    cy.get('.input-error').should('have.length', 5);
  });

  it('should not display errors if input values entered are valid', () => {
    cy.contains('label', 'Email').next('input').type('test@gmail.com');
    cy.contains('label', 'Username').next('input').click().type('test');
    cy.contains('label', 'Password').next('input').click().type('Test1245;');
    cy.contains('label', 'Confirm Password')
      .next('input')
      .click()
      .type('Test1245;');
    cy.contains('legend', 'Date of Birth').next('input').click().type('1');
    cy.get('#month').select(1);
    cy.contains('legend', 'Date of Birth').nextAll('input').eq(1).type('2000');
    cy.get('form button').click();

    cy.get('.input-error').should('have.length', 0);
  });

  it('should display loading overlay on submit, when fetch is called', () => {
    cy.contains('label', 'Email').next('input').type('test@gmail.com');
    cy.contains('label', 'Username').next('input').click().type('test');
    cy.contains('label', 'Password').next('input').click().type('Test1245;');
    cy.contains('label', 'Confirm Password')
      .next('input')
      .click()
      .type('Test1245;');
    cy.contains('legend', 'Date of Birth').next('input').click().type('1');
    cy.get('#month').select(1);
    cy.contains('legend', 'Date of Birth').nextAll('input').eq(1).type('2000');
    cy.get('form button').click();

    cy.get('.loading-overlay').should('exist');
  });
});
