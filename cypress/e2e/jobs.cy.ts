describe('Screen Job test', () => {
  it('load component', () => {
    cy.visit('http://localhost:4200/oportunidades');
    cy.contains('Carregando');
    cy.contains('Listagem de vagas');
  });

  it('open modal and check validate form', () => {
    cy.visit('http://localhost:4200/oportunidades');
    cy.get('button').contains('Adicionar vaga').click();
    cy.get('button').contains('Salvar').click();
    cy.contains('Formulário inválido!');
  });

  it('open accordion and verify infos', () => {
    cy.visit('http://localhost:4200/oportunidades');
    cy.get('button').contains('Totvs - Desenvolvedor Font-End Sênior').click();
    cy.contains('O que esperamos de você:');
    cy.contains(
      'Fazendo parte do nosso time, você terá os seguintes benefícios:'
    );
  });

  it('open modal and add job', () => {
    cy.visit('http://localhost:4200/oportunidades');
    cy.get('button').contains('Adicionar vaga').click();
    cy.get('input[name="company"]').type('Teste cypress');
    cy.get('input[name="title"]').type('Vaga para desenvolvedor');
    cy.get('input[name="description"]').type('Descrição da vaga');
    cy.get('input[name="experiences0"]').type('Experiência 1');
    let experiencesIndex = 0;
    experiencesIndex = experiencesIndex + 1;
    cy.get('button').contains('Adicionar experiências').click();
    cy.get(`input[name="experiences${experiencesIndex}"]`).type(
      'Experiência 2'
    );
    cy.get('input[name="conditions0"]').type('Benefícios 1');
    cy.get('button').contains('Adicionar condições/benefícios').click();
    let conditionsIndex = 0;
    conditionsIndex = conditionsIndex + 1;
    cy.get(`input[name="conditions${conditionsIndex}"]`).type('Benefícios 2');
    cy.get('button').contains('Salvar').click();
    cy.contains('Salvo com sucesso!');
  });

  it('checks if the job was create', () => {
    cy.visit('http://localhost:4200/oportunidades');
    cy.contains('Teste cypress');
  });

  it('open modal and update job', () => {
    cy.visit('http://localhost:4200/oportunidades');
    cy.get('button')
      .contains('Teste cypress - Vaga para desenvolvedor')
      .click();
    cy.get('button').contains('Editar').click();
    cy.get('input[name="company"]').clear();
    cy.get('input[name="company"]').type('Teste cypress atualizado');
    cy.get('button').contains('Salvar').click();
    cy.contains('Alteração salva com sucesso!');
  });

  it('checks if the job was updated', () => {
    cy.visit('http://localhost:4200/oportunidades');
    cy.contains('Teste cypress atualizado');
  });

  it('delete job', () => {
    cy.visit('http://localhost:4200/oportunidades');
    cy.get('button')
      .contains('Teste cypress atualizado - Vaga para desenvolvedor')
      .click();
    cy.get('button').contains('Excluir').click();
    cy.get('button').contains('Sim').click();
  });

  it('checks if the job was deleted', () => {
    cy.visit('http://localhost:4200/oportunidades');
    cy.contains('Teste cypress - Vaga para desenvolvedor').should('not.exist');
  });

  it('check for a server error message', () => {
    cy.intercept('GET', 'http://localhost:3000/jobs', { statusCode: 500 }).as(
      'getServerFailure'
    );
    cy.visit('http://localhost:4200/oportunidades');
    cy.contains('An error occurred');
  });
});
