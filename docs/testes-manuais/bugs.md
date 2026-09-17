# Relatório de Bugs

## BUG-001 — Telas do fluxo de profissionais são exibidas em escala reduzida no viewport mobile

**Ambiente:**

- Aplicação: Lacrei Saúde
- Ambiente: Staging
- Navegador: Google Chrome
- Viewport: 390 × 844
- Plataforma: Web responsiva

**Pré-condições:**

- Usuário autenticado.
- Pós-cadastro concluído.
- Estar na tela de busca de profissionais.

**Passos para reproduzir:**

1. Acessar a área de busca de profissionais.
2. Manter o campo de busca vazio.
3. Clicar no ícone de lupa para listar os profissionais disponíveis.

**Resultado esperado:**  
A listagem de profissionais deve ser exibida de forma responsiva, ocupando adequadamente a largura disponível do viewport e mantendo textos, botões e demais elementos legíveis e utilizáveis.

**Resultado obtido:**  
As telas do fluxo de profissionais são exibidas em escala extremamente reduzida no viewport mobile. O comportamento foi observado na listagem de profissionais, nos detalhes do profissional e na etapa de contato/agendamento, deixando grande área em branco e prejudicando significativamente a leitura e a interação.

**Reprodutibilidade:**  
2 de 2 execuções.

**Severidade:**  
Média.

**Justificativa da severidade:**  
A funcionalidade de busca continua disponível, porém a apresentação incorreta compromete fortemente a usabilidade no viewport mobile e dificulta a interação com os resultados retornados.

**Evidências:**

- `docs/testes-manuais/evidencias/BUG-001-responsividade-listagem-profissionais.png`
- `docs/testes-manuais/evidencias/CT03-01-detalhes-profissional-agendamento.png`
- `docs/testes-manuais/evidencias/CT03-02-confirmacao-celular-sms.png`

**Status:**  
Aberto

---

## BUG-002 — Número de celular válido é rejeitado na confirmação por SMS

**Ambiente:**

- Aplicação: Lacrei Saúde
- Ambiente: Staging
- Navegador: Google Chrome
- Viewport: 390 × 844
- Plataforma: Web responsiva

**Pré-condições:**

- Usuário autenticado.
- Cadastro e pós-cadastro concluídos.
- Profissional selecionado.
- Estar no fluxo de agendamento/contato.

**Passos para reproduzir:**

1. Acessar a busca de profissionais.
2. Selecionar um profissional.
3. Acessar a opção de agendamento.
4. Clicar em "Agendar atendimento".
5. Informar um número de celular brasileiro válido com DDD.
6. Tentar prosseguir para o envio do código por SMS.

**Resultado esperado:**  
O sistema deve aceitar o número de celular válido e permitir o envio do código de confirmação por SMS.

**Resultado obtido:**  
Mesmo com um número de celular válido, o sistema exibe a mensagem "Número de celular incorreto. Digite novamente." e impede o avanço para o envio do código SMS.

**Observação:**  
A máscara do número é aplicada automaticamente pela própria aplicação, não sendo possível informar o telefone sem a formatação exibida pelo sistema.

**Severidade:**  
Alta.

**Justificativa da severidade:**  
O problema bloqueia o fluxo de confirmação do celular e impede que a pessoa usuária prossiga para o contato/agendamento com o profissional, sem alternativa aparente na interface.

**Evidência:**  
`docs/testes-manuais/evidencias/BUG-002-celular-valido-rejeitado.png`

**Status:**  
Aberto
