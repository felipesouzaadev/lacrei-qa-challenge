# Lacrei QA Challenge

[![CI - Cypress E2E](https://github.com/felipesouzaadev/lacrei-qa-challenge/actions/workflows/ci.yml/badge.svg)](https://github.com/felipesouzaadev/lacrei-qa-challenge/actions/workflows/ci.yml)

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

## Pipeline CI/CD com GitHub Actions

O projeto possui integração contínua configurada com GitHub Actions.

O workflow é executado automaticamente em:

- Pushes para a branch `main`
- Pull Requests direcionados para a branch `main`
- Execuções manuais pelo GitHub Actions

Durante a execução do pipeline são realizadas as seguintes etapas:

- Checkout do código
- Configuração do Node.js
- Instalação das dependências com `npm ci`
- Execução dos testes E2E com Cypress
- Geração de relatório de testes no formato JUnit XML
- Armazenamento do relatório como artifact no GitHub Actions por 14 dias

O relatório é armazenado mesmo em caso de falha nos testes, facilitando a análise dos resultados da execução.

As credenciais utilizadas durante os testes são armazenadas com segurança utilizando GitHub Actions Secrets.

### Estratégia de rollback

O pipeline deste projeto é responsável pela validação automatizada dos testes e não realiza deploy da aplicação.

Caso uma alteração enviada para a branch `main` cause falhas no pipeline ou introduza um comportamento indesejado, a estratégia recomendada é reverter o commit responsável utilizando `git revert`.

Exemplo:

```bash
git revert <hash-do-commit>
git push origin main
```

O uso de `git revert` cria um novo commit desfazendo as alterações anteriores, preservando o histórico do repositório e evitando a reescrita da branch compartilhada.

Após o push da reversão, o GitHub Actions executará novamente o pipeline para validar que o projeto retornou a um estado estável.

## Documentação e evidências

Os artefatos produzidos durante o desafio estão organizados nas seções abaixo.

### Testes manuais

- [Execução dos testes manuais](docs/testes-manuais/execucao-testes.md)
- [Bugs encontrados](docs/testes-manuais/bugs.md)

### Cenários BDD / Gherkin

- [Busca de profissionais](docs/gherkin/buscar-profissional.feature)
- [Cadastro e busca após cadastro](docs/gherkin/cadastro-pos-cadastro-busca.feature)
- [Recuperação de senha](docs/gherkin/recuperar-senha.feature)

### Testes não funcionais

- [Performance e carga com k6](docs/testes-nao-funcionais/performance.md)
- [Acessibilidade](docs/testes-nao-funcionais/acessibilidade.md)
- [Responsividade](docs/testes-nao-funcionais/responsividade.md)

### Scripts de performance

- [Smoke test com k6](tests/performance/k6-smoke.js)
- [Teste com 30 usuários simultâneos](tests/performance/k6-30-users.js)

### Bugs registrados no GitHub

- [BUG-001 — Responsividade na busca de profissionais](https://github.com/felipesouzaadev/lacrei-qa-challenge/issues/1)
- [BUG-002 — Número de celular válido rejeitado na confirmação por SMS](https://github.com/felipesouzaadev/lacrei-qa-challenge/issues/2)
- [BUG-003 — Performance acima de 500 ms com 30 usuários simultâneos](https://github.com/felipesouzaadev/lacrei-qa-challenge/issues/3)

### CI/CD

O projeto possui pipeline automatizado com GitHub Actions para execução dos testes E2E, geração de relatório JUnit e armazenamento do relatório como artifact.

## Como reproduzir a entrega

### 1. Clonar e instalar o projeto

```bash
git clone https://github.com/felipesouzaadev/lacrei-qa-challenge.git
cd lacrei-qa-challenge
npm ci
```

### 2. Configurar as variáveis de ambiente

O arquivo `.env` não é versionado por segurança. Utilize `.env.example` como referência e crie um arquivo `.env` local.

Windows / PowerShell:

```powershell
Copy-Item .env.example .env
```

Linux / macOS:

```bash
cp .env.example .env
```

Preencha o arquivo `.env` com uma conta de e-mail de teste própria:

```env
CYPRESS_EMAIL_TESTE=seu-email-de-teste
CYPRESS_EMAIL_APP_PASSWORD=sua-senha-de-aplicativo
```

O cenário automatizado de cadastro valida a confirmação recebida por e-mail. Por isso, é necessária uma conta de teste compatível com IMAP. Em contas Gmail, deve ser utilizada uma senha de aplicativo em vez da senha principal da conta.

### 3. Executar os testes E2E

Executar o cenário automatizado em modo headless:

```bash
npm test
```

Abrir o Cypress em modo interativo:

```bash
npm run cy:open
```

Executar o Cypress em modo headless:

```bash
npm run cy:run
```

### 4. Executar os testes de performance

Os testes de performance utilizam k6 e acessam um endpoint autenticado da aplicação de staging.

Antes da execução, é necessário possuir o k6 instalado e disponibilizar em variável de ambiente o cookie de uma sessão autenticada válida.

PowerShell:

```powershell
$env:LACREI_COOKIE="<cookie-de-uma-sessao-autenticada>"
k6 run tests/performance/k6-smoke.js
k6 run tests/performance/k6-30-users.js
```

Linux / macOS:

```bash
export LACREI_COOKIE="<cookie-de-uma-sessao-autenticada>"
k6 run tests/performance/k6-smoke.js
k6 run tests/performance/k6-30-users.js
```

Nenhum cookie, senha, token ou credencial utilizada nos testes deve ser adicionada ao repositório.

### 5. CI/CD

O GitHub Actions executa automaticamente o teste E2E em pushes e Pull Requests configurados no workflow.

As credenciais utilizadas pela pipeline são armazenadas em GitHub Actions Secrets e não fazem parte do código-fonte.

Ao realizar um fork do projeto, os Secrets do repositório original não são copiados. Para executar a pipeline em outro repositório, devem ser cadastradas credenciais próprias.

As execuções já realizadas podem ser consultadas na aba `Actions` do repositório.

### Observação para Windows / PowerShell

Em alguns ambientes Windows, a política de execução do PowerShell pode bloquear o arquivo `npm.ps1` e impedir a execução direta de comandos como `npm ci` ou `npm test`.

Caso isso ocorra, utilize os comandos equivalentes através do executável `npm.cmd`:

```powershell
npm.cmd ci
npm.cmd test
```

Essa situação está relacionada à política de execução do PowerShell e não ao funcionamento do projeto.
