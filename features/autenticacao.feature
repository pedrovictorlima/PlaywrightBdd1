# language: pt
Funcionalidade: Autenticação de Usuário

  Contexto:
    Dado que eu acesso a página de login

  Cenário: Registrar usuário com sucesso (TC-01)
    Quando eu realizo o cadastro completo de um novo usuário
    Então a conta deve ser criada com sucesso
    E eu excluo a conta
    Então a conta deve ser excluída com sucesso

  Cenário: Login com usuário correto (TC-02)
    Quando eu cadastro e faço login com um usuário válido
    Então devo visualizar o usuário logado
    Quando eu excluo a conta
    Então a conta deve ser excluída com sucesso

  Cenário: Login com usuário incorreto (TC-03)
    Quando eu faço login com "email_invalido@teste.com" e "senha123"
    Então devo ver a mensagem de erro "Your email or password is incorrect!"

  Cenário: Logout de usuário (TC-04)
    Quando eu cadastro e faço login com um usuário válido
    E eu clico no botão de logout
    Então devo ser redirecionado para a página de login

  Cenário: Registrar usuário com e-mail já existente (TC-05)
    Dado que eu acesso a página de login
    Quando eu realizo o cadastro completo de um novo usuário
    E eu clico no botão de logout
    E eu inicio o cadastro com "Pedro" e "email_repetido@teste.com"
    Então devo ver o erro de e-mail duplicado "Email Address already exist!"