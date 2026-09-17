# language: pt

Funcionalidade: Buscar e contatar profissional
  Como uma pessoa usuária da Lacrei Saúde
  Quero buscar e entrar em contato com um profissional
  Para encontrar atendimento de acordo com a minha necessidade

  Contexto:
    Dado que estou autenticado na plataforma da Lacrei Saúde

  Cenário: Buscar um profissional
    Quando acesso a opção de buscar profissionais
    E realizo uma busca utilizando os filtros disponíveis
    Então devo visualizar profissionais correspondentes aos critérios informados
    E devo conseguir acessar os detalhes de um profissional

  Cenário: Contatar um profissional
    Dado que estou visualizando os detalhes de um profissional
    Quando seleciono a opção de agendar atendimento
    Então devo ser solicitado a confirmar meu número de celular por SMS
    Quando solicito o envio do código de confirmação
    E informo um código de confirmação válido
    Então devo conseguir prosseguir para as opções de contato com o profissional