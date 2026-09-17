# language: pt

Funcionalidade: Recuperar senha
  Como uma pessoa usuária da Lacrei Saúde
  Quero recuperar o acesso à minha conta
  Para conseguir entrar novamente na plataforma caso esqueça minha senha

  Contexto:
    Dado que estou na página de login da Lacrei Saúde

  Cenário: Solicitar recuperação de senha
    Quando seleciono a opção "Esqueci minha senha"
    E informo um e-mail cadastrado
    E solicito a recuperação da senha
    Então devo receber uma orientação de que as instruções foram enviadas para o meu e-mail

  Cenário: Criar uma nova senha através do link de recuperação
    Dado que solicitei a recuperação de senha para um e-mail cadastrado
    E recebi o e-mail de recuperação
    Quando acesso o link de redefinição de senha
    E informo uma nova senha válida
    E confirmo a nova senha
    E salvo a alteração
    Então devo visualizar a confirmação de que a senha foi alterada com sucesso
    E devo conseguir realizar login utilizando a nova senha