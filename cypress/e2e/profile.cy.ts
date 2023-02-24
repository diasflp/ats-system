describe('Screen Profile test', () => {
  it('load component', () => {
    cy.visit('http://localhost:4200/canditato');
    cy.contains('Carregando');
    cy.contains('Listagem de canditatos(as)');
  });

  it('open modal and check validate form', () => {
    cy.visit('http://localhost:4200/canditato');
    cy.get('button').contains('Adicionar canditato(a)').click();
    cy.get('button').contains('Salvar').click();
    cy.contains('Formulário inválido!');
  });

  it('open modal and check validate email', () => {
    cy.visit('http://localhost:4200/canditato');
    cy.get('button').contains('Adicionar canditato(a)').click();
    cy.get('input[name="name"]').type('Canditato teste cypress');
    cy.get('input[name="email"]').type('teste');
    cy.get('input[name="description"]').type('Descrição do canditato');
    cy.get('input[name="experiences0"]').type('Experiência 1');
    cy.get('button').contains('Salvar').click();
    cy.contains('E-mail inválido!');
  });

  it('open accordion and verify infos', () => {
    cy.visit('http://localhost:4200/canditato');
    cy.get('button').contains('Felipe Dias - flp.magno@gmail.com').click();
    cy.contains('Minhas experiências:');
  });

  it('open modal and add job', () => {
    cy.visit('http://localhost:4200/canditato');
    cy.get('button').contains('Adicionar canditato(a)').click();
    cy.get('input[name="name"]').type('Canditato teste cypress');
    cy.get('input[name="email"]').type('teste@teste.com');
    cy.get('input[name="description"]').type('Descrição do canditato');
    cy.get('input[name="experiences0"]').type('Experiência 1');
    let experiencesIndex = 0;
    experiencesIndex = experiencesIndex + 1;
    cy.get('button').contains('Adicionar experiências').click();
    cy.get(`input[name="experiences${experiencesIndex}"]`).type(
      'Experiência 2'
    );
    cy.get('button').contains('Salvar').click();
    cy.contains('Salvo com sucesso!');
  });

  it('checks if the job was create', () => {
    cy.visit('http://localhost:4200/canditato');
    cy.contains('Canditato teste cypress');
  });

  it('open modal and update job', () => {
    cy.visit('http://localhost:4200/canditato');
    cy.get('button')
      .contains('Canditato teste cypress - teste@teste.com')
      .click();
    cy.get('button').contains('Editar').click();
    cy.get('input[name="name"]').clear();
    cy.get('input[name="name"]').type('Canditato teste cypress atualizado');
    cy.get('button').contains('Salvar').click();
    cy.contains('Alteração salva com sucesso!');
  });

  it('checks if the job was updated', () => {
    cy.visit('http://localhost:4200/canditato');
    cy.contains('Canditato teste cypress atualizado - teste@teste.com');
  });

  it('delete job', () => {
    cy.visit('http://localhost:4200/canditato');
    cy.get('button')
      .contains('Canditato teste cypress atualizado - teste@teste.com')
      .click();
    cy.get('button').contains('Excluir').click();
    cy.get('button').contains('Sim').click();
  });

  it('checks if the job was deleted', () => {
    cy.visit('http://localhost:4200/canditato');
    cy.contains('Canditato teste cypress atualizado - teste@teste.com').should(
      'not.exist'
    );
  });

  it('check for a server error message', () => {
    cy.intercept('GET', 'http://localhost:3000/profile', {
      statusCode: 500,
    }).as('getServerFailure');
    cy.visit('http://localhost:4200/canditato');
    cy.contains('An error occurred');
  });
});
