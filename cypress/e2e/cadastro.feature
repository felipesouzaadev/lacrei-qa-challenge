# language: pt

@cadastro @regressao
Funcionalidade: Cadastro completo da pessoa usuária
  Como uma pessoa usuária da Lacrei Saúde
  Quero criar uma conta e concluir meu cadastro
  Para acessar os recursos disponíveis na plataforma

  Contexto:
    Dado que acesso a página de cadastro da Lacrei Saúde

  @cadastro-sucesso
  Cenário: Realizar cadastro completo com dados válidos
    Quando preencho os dados obrigatórios do cadastro com informações válidas
    E informo uma senha que atende aos requisitos de segurança
    E confirmo a mesma senha
    E aceito os Termos de Uso e a Política de Privacidade
    E confirmo que tenho 18 anos ou mais
    E submeto o cadastro
    Então devo receber a confirmação de criação da conta

    Quando confirmo a conta através do fluxo de validação disponibilizado
    E realizo login com a conta confirmada
    Então devo ser direcionado para o pós-cadastro

    Quando preencho as informações obrigatórias do pós-cadastro
    E concluo a etapa de pós-cadastro
    Então devo visualizar a confirmação de que o cadastro foi concluído