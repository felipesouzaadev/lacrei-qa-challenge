# Teste Não Funcional — Responsividade

## Objetivo

Validar o comportamento visual e funcional da aplicação Lacrei Saúde em diferentes tamanhos de tela, verificando adaptação do layout em dispositivos móveis e desktop.

## Ambiente

- Aplicação: Lacrei Saúde — Staging
- Navegador: Google Chrome
- Método: Teste exploratório com emulação de dispositivos pelo DevTools

## Cenários avaliados

### Mobile — 390 x 844

#### Página de Login

**Resultado: APROVADO**

O layout apresentou adaptação adequada ao tamanho de tela avaliado.

Durante a validação não foram identificados:

- Elementos sobrepostos.
- Conteúdo cortado.
- Necessidade de rolagem horizontal indevida.
- Impedimentos para utilização dos campos e botões.

#### Busca de profissionais

**Resultado: REPROVADO**

Durante a validação da busca de profissionais em viewport de 390 x 844 foi identificado comportamento inadequado do layout.

O conteúdo da página foi apresentado de forma excessivamente reduzida, prejudicando a legibilidade e a experiência de utilização em dispositivo móvel.

O comportamento foi registrado como **BUG-001**.

### Desktop — 1366 x 768

**Resultado: APROVADO**

No ambiente desktop, o fluxo de busca de profissionais apresentou disposição adequada dos componentes e não foram identificadas falhas visuais impeditivas durante a validação exploratória.

## Resultado consolidado

| Tela / Fluxo | Resolução | Resultado |
|---|---:|---|
| Login | 390 x 844 | Aprovado |
| Busca de profissionais | 390 x 844 | Reprovado — BUG-001 |
| Busca de profissionais | 1366 x 768 | Aprovado |

## Conclusão

A aplicação apresentou comportamento responsivo adequado nos fluxos de login e na visualização desktop avaliada.

Entretanto, foi identificada uma falha de responsividade na busca de profissionais em resolução mobile de 390 x 844.

A inconsistência pode prejudicar principalmente a legibilidade e a experiência de usuários que acessam o serviço por dispositivos móveis.

Recomenda-se revisar os breakpoints, dimensões e regras de escala utilizadas na página de busca de profissionais.
