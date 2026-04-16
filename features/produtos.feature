# language: pt
Funcionalidade: Gestão de Produtos

  Cenário: Verificar detalhes do primeiro produto
    Dado que eu navego até a página de produtos
    Quando eu seleciono o primeiro produto para ver detalhes
    Então devo ver as informações de nome, categoria, preço e marca

  Cenário: Buscar por um produto específico
    Dado que eu navego até a página de produtos
    Quando eu busco pelo produto "Blue Top"
    Então o sistema deve exibir os produtos encontrados