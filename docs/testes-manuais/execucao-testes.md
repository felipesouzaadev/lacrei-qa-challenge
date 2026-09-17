# Execução de Testes Manuais

Este documento registra a execução manual dos principais fluxos funcionais avaliados no projeto.

## Ambiente de teste

- Aplicação: Lacrei Saúde
- Tipo de teste: Funcional manual
- Plataforma: Web
- Navegador: Google Chrome
- Status geral: Concluída

---

## CT-01 — Cadastro completo de pessoa usuária

**Objetivo:**  
Validar o fluxo completo de criação de conta até a conclusão do pós-cadastro.

**Pré-condições:**

- Possuir um e-mail válido e ainda não cadastrado.
- Estar na página de cadastro.

**Passos:**

1. Preencher os dados obrigatórios com informações válidas.
2. Informar uma senha que atenda aos requisitos de segurança.
3. Confirmar a senha.
4. Aceitar os Termos de Uso e a Política de Privacidade.
5. Confirmar idade igual ou superior a 18 anos.
6. Submeter o cadastro.
7. Acessar o e-mail de confirmação recebido.
8. Confirmar a conta pelo link disponibilizado.
9. Realizar login.
10. Preencher as informações obrigatórias do pós-cadastro.
11. Concluir o pós-cadastro.

**Resultado esperado:**  
A conta deve ser criada, confirmada e o fluxo de pós-cadastro deve ser concluído com sucesso.

**Resultado obtido:**  
O cadastro foi realizado com sucesso. O e-mail de confirmação foi recebido, a conta foi confirmada, o login foi concluído e o fluxo de pós-cadastro foi finalizado sem erros.

**Status:** Aprovado

**Evidência:**  
`docs/testes-manuais/evidencias/CT01-09-pos-cadastro-concluido.png`

---

## CT-02 — Buscar profissional após conclusão do cadastro

**Objetivo:**  
Validar se uma pessoa usuária com cadastro concluído consegue acessar a busca de profissionais.

**Pré-condições:**

- Possuir uma conta válida e confirmada.
- Ter concluído o pós-cadastro.
- Estar autenticado na plataforma.

**Passos:**

1. Acessar a opção de busca de profissionais.
2. Utilizar os filtros disponíveis.
3. Realizar uma busca.
4. Analisar os profissionais retornados.
5. Acessar os detalhes de um profissional.

**Resultado esperado:**  
A plataforma deve apresentar profissionais compatíveis com os critérios utilizados e permitir acesso aos detalhes do profissional.

**Resultado obtido:**  
A área de busca de profissionais foi acessada com sucesso e a listagem foi carregada. Foi possível visualizar e acessar um profissional. Entretanto, foi identificado problema de responsividade no viewport mobile, documentado no BUG-001.

**Status:** Aprovado com ressalva — BUG-001

**Evidência:**  
`docs/testes-manuais/evidencias/BUG-001-responsividade-listagem-profissionais.png`

---

## CT-03 — Contatar profissional

**Objetivo:**  
Validar o fluxo para iniciar contato com um profissional encontrado na plataforma.

**Pré-condições:**

- Estar autenticado.
- Possuir cadastro concluído.
- Estar visualizando os detalhes de um profissional.

**Passos:**

1. Selecionar a opção para agendar atendimento.
2. Solicitar a confirmação do número de celular.
3. Solicitar o envio do código por SMS.
4. Informar um código válido.
5. Prosseguir no fluxo de contato.

**Resultado esperado:**  
Após a validação do celular, a pessoa usuária deve conseguir prosseguir para as opções de contato com o profissional.

**Resultado obtido:**  
O fluxo avançou até a etapa de confirmação do número de celular. Ao informar um número de celular brasileiro válido, a aplicação exibiu a mensagem "Número de celular incorreto. Digite novamente." e não permitiu o envio do código de confirmação por SMS.

**Status:** Bloqueado — BUG-002

**Evidência:**  
`docs/testes-manuais/evidencias/BUG-002-celular-valido-rejeitado.png`

---

## CT-04 — Recuperação de senha

**Objetivo:**  
Validar o fluxo completo de recuperação de acesso à conta.

**Pré-condições:**

- Possuir uma conta cadastrada.
- Ter acesso ao e-mail associado à conta.
- Estar na página de login.

**Passos:**

1. Selecionar a opção "Esqueci minha senha".
2. Informar o e-mail cadastrado.
3. Solicitar a recuperação da senha.
4. Acessar o e-mail recebido.
5. Abrir o link de redefinição.
6. Informar uma nova senha válida.
7. Confirmar a nova senha.
8. Salvar a alteração.
9. Retornar à página de login.
10. Realizar login com a nova senha.

**Resultado esperado:**  
A senha deve ser redefinida com sucesso e o acesso à conta deve funcionar utilizando a nova senha.

**Resultado obtido:**  
A solicitação de recuperação foi realizada com sucesso. O e-mail de redefinição foi recebido, o link permitiu cadastrar uma nova senha e a aplicação exibiu a confirmação da alteração. Em seguida, foi possível realizar login normalmente utilizando a nova senha.

**Status:** Aprovado

**Evidência:**  
`docs/testes-manuais/evidencias/CT04-06-login-nova-senha-sucesso.png`

---

## Resumo da execução

| Caso de teste                 | Status                          |
| ----------------------------- | ------------------------------- |
| CT-01 — Cadastro completo     | Aprovado                        |
| CT-02 — Buscar profissional   | Aprovado com ressalva — BUG-001 |
| CT-03 — Contatar profissional | Bloqueado — BUG-002             |
| CT-04 — Recuperação de senha  | Aprovado                        |

## Observações

Defeitos, inconsistências, sugestões de melhoria e demais evidências identificadas durante a execução serão documentados separadamente.
