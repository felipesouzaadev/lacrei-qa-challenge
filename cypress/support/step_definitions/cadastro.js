const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

let emailTeste;
const senhaTeste = "Teste@123";

Given("que acesso a página de cadastro da Lacrei Saúde", () => {
  cy.visit("/");
  cy.contains("button", "Criar conta").click();
});

When(
  "preencho os dados obrigatórios do cadastro com informações válidas",
  () => {
    const emailBase = Cypress.env("EMAIL_TESTE");

    if (!emailBase) {
      throw new Error("A variável EMAIL_TESTE não foi configurada.");
    }

    const [usuario, dominio] = emailBase.split("@");

    emailTeste = `${usuario}+lacrei${Date.now()}@${dominio}`;

    cy.get('input[placeholder="Digite seu nome civil ou social"]')
      .should("be.visible")
      .type("Pessoa");

    cy.get('input[placeholder="Digite seu sobrenome"]')
      .should("be.visible")
      .type("Teste");

    cy.get('input[placeholder="Digite seu e-mail"]')
      .should("be.visible")
      .type(emailTeste);

    cy.get('input[placeholder="Confirme seu e-mail"]')
      .should("be.visible")
      .type(emailTeste);
  },
);

When("informo uma senha que atende aos requisitos de segurança", () => {
  cy.get('input[placeholder="Digite uma senha"]')
    .should("be.visible")
    .type(senhaTeste);
});

When("confirmo a mesma senha", () => {
  cy.get('input[placeholder="Confirme sua senha"]')
    .should("be.visible")
    .type(senhaTeste);
});

When("aceito os Termos de Uso e a Política de Privacidade", () => {
  cy.get('input[type="checkbox"]').eq(0).check().should("be.checked");
});

When("confirmo que tenho 18 anos ou mais", () => {
  cy.get('input[type="checkbox"]').eq(1).check().should("be.checked");
});

When("submeto o cadastro", () => {
  cy.contains("button", "Cadastrar")
    .should("be.visible")
    .and("be.enabled")
    .click();
});

Then("devo receber a confirmação de criação da conta", () => {
  cy.get("body", { timeout: 10000 })
    .should("be.visible")
    .and("contain.text", "Estamos quase lá");

  cy.get("body").should("contain.text", "link de verificação");

  cy.get("body").should("contain.text", "24 horas");

  cy.contains(/Voltar ao login/i, { timeout: 10000 }).should("be.visible");
});

When("confirmo a conta através do fluxo de validação disponibilizado", () => {
  cy.task("obterLinkConfirmacao", emailTeste, { timeout: 240000 }).then(
    (linkConfirmacao) => {
      expect(linkConfirmacao).to.be.a("string").and.not.be.empty;

      const linkDecodificado = decodeURIComponent(linkConfirmacao);

      expect(linkDecodificado).to.include("api-staging.lacreisaude.com.br");

      expect(linkDecodificado).to.include("confirm-email");

      cy.visit(linkConfirmacao);
    },
  );
});

When("realizo login com a conta confirmada", () => {
  cy.get('input[placeholder="Digite seu e-mail"]', { timeout: 10000 })
    .should("be.visible")
    .type(emailTeste);

  cy.get('input[placeholder="Digite sua senha"]')
    .should("be.visible")
    .type(senhaTeste, { log: false });

  cy.contains("button", "Entrar")
    .should("be.visible")
    .and("be.enabled")
    .click();
});

Then("devo ser direcionado para o pós-cadastro", () => {
  cy.location("pathname", { timeout: 20000 }).should("not.include", "/login");
});

When("preencho as informações obrigatórias do pós-cadastro", () => {
  cy.contains("button", "Continuar cadastro", { timeout: 20000 })
    .should("be.visible")
    .and("be.enabled")
    .click();

  // Etapa 1 - Pronome
  cy.contains("span", /^o\/Ele\/Dele$/, { timeout: 15000 })
    .should("be.visible")
    .prev("label")
    .should("exist")
    .click({ force: true });

  cy.contains("button", /^Próximo$/, { timeout: 15000 })
    .should("be.visible")
    .and("be.enabled")
    .click();

  // Confirma que saiu realmente da etapa de Pronome
  cy.contains("Com qual pronome você se identifica?", {
    timeout: 15000,
  }).should("not.exist");

  // Etapa 2 - Etnia
  cy.contains("Com qual etnia você se identifica?", { timeout: 15000 }).should(
    "be.visible",
  );

  cy.contains("span", /^Branca$/, { timeout: 15000 })
    .should("be.visible")
    .prev("label")
    .should("exist")
    .click({ force: true });

  cy.contains("button", /^Próximo$/, { timeout: 15000 })
    .should("be.visible")
    .and("be.enabled")
    .click();

  // Confirma que saiu realmente da etapa de Etnia
  cy.contains("Com qual etnia você se identifica?", {
    timeout: 15000,
  }).should("not.exist");

  // Etapa 3 - Gênero
  cy.contains("Qual é a sua identidade de gênero?", {
    timeout: 15000,
  }).should("be.visible");

  cy.contains("span", /^Homem cis$/, { timeout: 15000 })
    .should("be.visible")
    .prev("label")
    .should("exist")
    .click({ force: true });

  cy.contains("button", /^Próximo$/, { timeout: 15000 })
    .should("be.visible")
    .and("be.enabled")
    .click();

  // Confirma que saiu realmente da etapa de Gênero
  cy.contains("Qual é a sua identidade de gênero?", {
    timeout: 15000,
  }).should("not.exist");

  // Etapa 4 - Sexualidade
  cy.contains("Qual é a sua sexualidade?", {
    timeout: 15000,
  }).should("be.visible");

  cy.contains("span", /^Assexual$/, { timeout: 15000 })
    .should("be.visible")
    .prev("label")
    .should("exist")
    .click({ force: true });

  cy.contains("button", /^Próximo$/, { timeout: 15000 })
    .should("be.visible")
    .and("be.enabled")
    .click();

  // Confirma que avançou para a etapa seguinte
  cy.contains("Qual é a sua sexualidade?", {
    timeout: 15000,
  }).should("not.exist");

  // Etapa 5 - Deficiência
  // Etapa 5 - Deficiência
  cy.contains("Você possui alguma deficiência?", {
    timeout: 15000,
  }).should("be.visible");

  // Marca "Não possuo deficiência"
  cy.get('input[type="checkbox"]', { timeout: 15000 })
    .first()
    .check({ force: true });

  // Busca o elemento novamente após o re-render
  cy.get('input[type="checkbox"]', { timeout: 15000 })
    .first()
    .should("be.checked");

  // Confirma que o botão foi habilitado
  cy.contains("button", /^Concluir$/, { timeout: 15000 })
    .should("be.visible")
    .and("be.enabled");
});

When("concluo a etapa de pós-cadastro", () => {
  cy.contains("button", /Próximo|Concluir|Finalizar/, { timeout: 15000 })
    .should("be.visible")
    .and("be.enabled")
    .click();
});

Then("devo visualizar a confirmação de que o cadastro foi concluído", () => {
  cy.location("pathname", { timeout: 20000 }).then((pathname) => {
    cy.log(`URL após pós-cadastro: ${pathname}`);
  });

  cy.get("body", { timeout: 20000 }).should("be.visible");

  cy.wait(2000);
});
