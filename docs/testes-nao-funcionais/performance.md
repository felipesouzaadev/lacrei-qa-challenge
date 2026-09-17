# Teste Não Funcional — Performance

## Objetivo

Validar o comportamento da API de busca de profissionais sob carga concorrente, considerando o cenário de 30 usuários simultâneos e o critério de tempo de resposta inferior a 500 ms.

## Ambiente

- Aplicação: Lacrei Saúde — Staging
- Endpoint: `GET /v1/lacreisaude/professionals/`
- Ferramenta: k6
- Tipo de teste: Carga
- Usuários virtuais: 30
- Iterações: 1 por usuário
- Total de requisições: 30

## Pré-validação

Antes da execução do teste de carga, foi realizado um smoke test com 1 usuário virtual para confirmar que a autenticação e o endpoint estavam funcionando corretamente.

Resultado:

- HTTP Status: 200
- Tempo de resposta: 298,09 ms
- Falhas HTTP: 0%

## Critérios de aceitação

- Todas as requisições devem retornar HTTP 200.
- Taxa de falhas HTTP deve ser 0%.
- Tempo de resposta deve permanecer abaixo de 500 ms.
- p95 deve permanecer abaixo de 500 ms.

## Resultado do teste com 30 usuários simultâneos

| Métrica | Resultado |
|---|---:|
| Requisições realizadas | 30 |
| HTTP 200 | 30/30 |
| Falhas HTTP | 0% |
| Respostas abaixo de 500 ms | 0/30 |
| Tempo mínimo | 542,82 ms |
| Tempo médio | 2,89 s |
| Mediana | 2,93 s |
| p90 | 4,77 s |
| p95 | 5,06 s |
| Tempo máximo | 5,22 s |

## Resultado dos thresholds

- `http_req_failed rate == 0`: APROVADO
- `http_req_duration p(95) < 500 ms`: REPROVADO
- `http_req_duration max < 500 ms`: REPROVADO

## Conclusão

A API permaneceu funcional durante o teste, retornando HTTP 200 em todas as 30 requisições e sem apresentar erros HTTP.

Entretanto, o requisito de performance não foi atendido.

Nenhuma das 30 requisições respondeu em menos de 500 ms. O tempo médio foi de 2,89 segundos, o p95 atingiu 5,06 segundos e o maior tempo observado foi de 5,22 segundos.

O resultado demonstra degradação significativa do tempo de resposta quando a API é submetida a 30 requisições concorrentes.

---

# BUG-003 — Degradação de performance na busca de profissionais sob carga

## Título

API de busca de profissionais ultrapassa 500 ms com 30 usuários simultâneos.

## Pré-condições

- Usuário autenticado.
- API de busca de profissionais disponível.
- Sessão válida.
- k6 configurado para execução do teste.

## Passos para reproduzir

1. Autenticar-se na aplicação de staging.
2. Validar que o endpoint de profissionais retorna HTTP 200.
3. Executar smoke test com 1 usuário.
4. Configurar 30 usuários virtuais simultâneos no k6.
5. Realizar uma requisição por usuário para o endpoint de busca de profissionais.
6. Analisar os tempos de resposta.

## Resultado esperado

As requisições devem retornar HTTP 200 e apresentar tempo de resposta inferior a 500 ms.

## Resultado obtido

Todas as 30 requisições retornaram HTTP 200, porém nenhuma ficou abaixo de 500 ms.

- Mínimo: 542,82 ms
- Média: 2,89 s
- p95: 5,06 s
- Máximo: 5,22 s

## Severidade

Alta.

Justificativa: o endpoint permanece funcional, porém 100% das requisições ultrapassaram o limite de desempenho definido para o cenário de 30 usuários concorrentes, com p95 superior a 5 segundos.

## Status

Aberto.
