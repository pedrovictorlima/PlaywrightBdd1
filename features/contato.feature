# language: pt
Funcionalidade: Formulário de Contato

  Cenário: Enviar mensagem com sucesso
    Dado que eu acesso a página de contato
    Quando eu preencho o formulário com "Pedro Victor" e "pedro@teste.com"
    E clico no botão de enviar
    Então devo ver a mensagem de sucesso