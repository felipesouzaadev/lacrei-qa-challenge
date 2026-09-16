# Lacrei QA Challenge

Projeto de automação de testes E2E desenvolvido para o desafio técnico de QA da Lacrei Saúde.

## Objetivo

Automatizar o fluxo completo de cadastro de uma pessoa usuária, desde o preenchimento dos dados iniciais até a confirmação da conta e conclusão do pós-cadastro.

## Tecnologias utilizadas

- Cypress
- Cucumber / Gherkin
- JavaScript
- Node.js
- Mailparser
- IMAPFlow
- Dotenv

## Cenário automatizado

O teste realiza:

- Acesso à página de cadastro
- Preenchimento dos dados obrigatórios
- Criação de e-mail único para execução
- Aceite dos termos
- Envio do cadastro
- Consulta automática do e-mail de confirmação
- Extração do link de verificação
- Confirmação da conta
- Preenchimento do fluxo de pós-cadastro
- Validação da conclusão do cadastro

## Estrutura do projeto

```text
cypress/
├── e2e/
│   └── cadastro.feature
├── support/
│   ├── step_definitions/
│   │   └── cadastro.js
│   └── e2e.js
└── tasks/
    └── email.js

cypress.config.js
package.json
.env.example
```

## Pré-requisitos

- Node.js
- npm
- Git

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto utilizando o `.env.example` como referência.

As seguintes variáveis são necessárias:

- `CYPRESS_EMAIL_TESTE`: e-mail utilizado durante os testes automatizados.
- `CYPRESS_EMAIL_APP_PASSWORD`: senha de aplicativo utilizada para acessar o e-mail de confirmação.

O arquivo `.env` contém informações sensíveis e não deve ser versionado.

## Executando os testes

Para executar o cenário automatizado em modo headless:

`npm test`

Para abrir a interface gráfica do Cypress:

`npm run cy:open`

Para executar todos os testes configurados:

`npm run cy:run`

## BDD com Cucumber

O projeto utiliza Cucumber com Gherkin para estruturar os cenários de teste seguindo a abordagem BDD.

O cenário automatizado está definido em:

`cypress/e2e/cadastro.feature`

As implementações dos passos estão localizadas em:

`cypress/support/step_definitions/cadastro.js`

## Segurança

As credenciais utilizadas pelos testes são armazenadas em variáveis de ambiente e não são versionadas no repositório.

O arquivo `.env` está incluído no `.gitignore`.

O arquivo `.env.example` contém apenas exemplos das variáveis necessárias para configurar o projeto.
