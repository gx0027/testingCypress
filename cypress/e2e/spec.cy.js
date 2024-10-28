describe('Simple Notes App', function () {
  beforeEach(function () {
      cy.visit('http://localhost:3000');
  });

  it('should load the page', () => {
      cy.contains('Simple Notes App').should('be.visible');
  });

  it('should add a new note', () => {
      const noteTitle = 'Test Note';
      const noteContent = 'This is a test note content.';

      cy.get('#note-title').type(noteTitle);
      cy.get('#note-content').type(noteContent);
      cy.get('#note-form').submit();

      cy.contains(noteTitle).should('be.visible');
      cy.contains(noteContent).should('be.visible');
  });

  it('should not add a note if required fields are empty', () => {
      cy.get('#note-form').submit();

      cy.contains('Title is required').should('be.visible'); 
      cy.get('.note').should('not.exist'); 
  });

  it('should delete a note', () => {
      const noteTitle = 'Note to be deleted';
      const noteContent = 'This note will be deleted.';


      cy.get('#note-title').type(noteTitle);
      cy.get('#note-content').type(noteContent);
      cy.get('#note-form').submit();

     
      cy.contains(noteTitle).should('be.visible');
      cy.contains(noteContent).should('be.visible');

    
      cy.get('[data-cy="delete-btn"]').first().click();


      cy.contains(noteTitle).should('not.exist');
      cy.contains(noteContent).should('not.exist');
  });

  it('should allow editing of a note', () => {
      const noteTitle = 'Original Note';
      const noteContent = 'Original content.';

      cy.get('#note-title').type(noteTitle);
      cy.get('#note-content').type(noteContent);
      cy.get('#note-form').submit();


      cy.get('[data-cy="edit-btn"]').first().click();

      cy.get('#note-title').clear().type('Edited Note');
      cy.get('#note-content').clear().type('Edited content.');
      cy.get('#note-form').submit();

      cy.contains('Edited Note').should('be.visible');
      cy.contains('Edited content.').should('be.visible');
  });

  it('should retain a note after refreshing the page', () => {
      const noteTitle = 'Persistent Note';
      const noteContent = 'This note should persist.';


      cy.get('#note-title').type(noteTitle);
      cy.get('#note-content').type(noteContent);
      cy.get('#note-form').submit();

      cy.reload();

      cy.contains(noteTitle).should('be.visible');
      cy.contains(noteContent).should('be.visible');
  });

  it('should delete all notes', () => {
      cy.get('#note-title').type('Note 1');
      cy.get('#note-content').type('Content 1');
      cy.get('#note-form').submit();
      cy.get('#note-title').type('Note 2');
      cy.get('#note-content').type('Content 2');
      cy.get('#note-form').submit();
      cy.get('#delete-all').click();
      cy.get('.note').should('not.exist');
  });
});