# Teste Não Funcional — Acessibilidade

## Objetivo

Avaliar aspectos básicos de acessibilidade da aplicação Lacrei Saúde, considerando auditoria automatizada, navegação por teclado e uso de leitor de tela.

## Ambiente

- Aplicação: Lacrei Saúde — Staging
- Página avaliada: Login
- Navegador: Google Chrome
- Ferramentas:
  - Lighthouse
  - NVDA
  - Navegação manual por teclado

## Teste automatizado — Lighthouse

Foi executada auditoria de acessibilidade utilizando o Lighthouse.

### Resultado

- Pontuação de acessibilidade: **96/100**
- Auditorias aprovadas: 24
- Itens para verificação manual: 10
- Falha identificada:
  - `Elements use prohibited ARIA attributes`

### Análise

A aplicação apresentou resultado geral positivo na auditoria automatizada, porém foi identificada uma inconsistência relacionada ao uso de atributos ARIA.

A presença de atributos ARIA não permitidos pode impactar a interpretação correta dos componentes por tecnologias assistivas e deve ser revisada pela equipe de desenvolvimento.

## Teste com leitor de tela — NVDA

Foi realizada validação exploratória utilizando o leitor de tela NVDA.

### Resultado

**APROVADO**

Durante a navegação realizada, os elementos necessários para utilização do fluxo avaliado foram identificados e o leitor de tela apresentou funcionamento adequado.

Não foi identificado bloqueio funcional durante o teste.

## Navegação por teclado

Foi realizada navegação sem utilização do mouse, utilizando principalmente as teclas:

- `Tab`
- `Shift + Tab`
- `Enter`
- `Espaço`

### Resultado

**APROVADO**

Foi possível:

- Navegar entre elementos interativos.
- Identificar visualmente o elemento em foco.
- Percorrer campos, links e botões.
- Acionar elementos utilizando o teclado.

Não foi identificado bloqueio de navegação no fluxo avaliado.

## Contraste

Durante a auditoria automatizada realizada pelo Lighthouse não foi apontada falha de contraste entre texto e plano de fundo no fluxo analisado.

Essa verificação foi considerada como apoio automatizado e não substitui uma avaliação completa baseada em todos os critérios WCAG.

## Conclusão

Os testes exploratórios demonstraram que o fluxo avaliado possui bom nível básico de acessibilidade.

### Resultados consolidados

| Validação | Resultado |
|---|---|
| Lighthouse | 96/100 |
| Navegação por teclado | Aprovado |
| Leitor de tela NVDA | Aprovado |
| Contraste automático | Sem falha identificada |
| Uso de ARIA | Necessita melhoria |

O principal ponto de atenção identificado foi o uso de atributos ARIA não permitidos, apontado pelo Lighthouse.

Recomenda-se revisar a implementação dos atributos ARIA para melhorar a compatibilidade com tecnologias assistivas e a aderência às boas práticas de acessibilidade.
