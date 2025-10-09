# Casos de teste que atingiram os resultados esperados

## Funcionalidade: Autenticação

### CT01 - Permitir login com credenciais válidas | **Tipo:** Positivo

**Pré-condições:** Usuário possui credenciais válidas e está na página de login.

**Passos para Reprodução:**
1. Inserir email válido.
2. Inserir senha válida.
3. Clicar no botão “Entrar”.

**Resultado esperado:** O sistema realiza o login e redireciona para a página "/dashboard".
***
### CT02 - Exibir pop-up de erro ao tentar login com credenciais inválidas | **Tipo:** Negativo

**Pré-condições:** Usuário está na página de login.

**Passos para Reprodução:**
1. Inserir e-mail inválido.
2. Inserir senha inválida.
3. Clicar no botão "Entrar".

**Resultado esperado:** O sistema exibe um pop-up com a mensagem "Credenciais inválidas" e não redireciona o usuário.
***
### CT03 - Exibir mensagens de validação do navegador para campos obrigatórios vazios | **Tipo:** Negativo

**Pré-condições:** Usuário está na página de login.

**Passos para Reprodução:**
1. Clicar diretamente no botão.
2. Entrar sem preencher email e senha.

**Resultado esperado:** O navegador exibe mensagens de validação nos campos obrigatórios.
***
### CT04 - Exibir erro de validação para email com formato inválido | **Tipo:** Negativo

**Pré-condições:** Usuário está na página de login.

**Passos para Reprodução:**
1. Inserir email inválido e qualquer senha.
2. Clicar em Entrar.

**Resultado esperado:** O campo de email é marcado como inválido e o sistema não redireciona para o dashboard.
***
### CT05 - Permitir login mesmo com espaços extras antes e depois do email | **Tipo:** Positivo

**Pré-condições:** Usuário possui credenciais válidas e está na página de login.

**Passos para Reprodução:**
1. Inserir email válido com espaços extras e senha válida.
2. Clicar em Entrar.

**Resultado esperado:** O sistema realiza o login normalmente, redirecionando para /dashboard.
***

## Funcionalidade: Dashboard

### CT06 - Filtrar veículos pelo modelo digitado | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e na tela de dashboard.

**Passos para Reprodução:**
1. Digitar algum nome de veículo válido no campo de busca.
2. Observar os resultados.

**Resultado esperado:** Exibir apenas o veículo com o nome digitado.
***
### CT07 - Filtrar veículos pela placa digitada | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e na tela de dashboard.

**Passos para Reprodução:**
1. Digitar alguma placa de veículo válida no campo de busca.
2. Observar os resultados.

**Resultado esperado:** Exibir apenas o veículo com a placa digitada.
***
### CT08 - Exibir nenhum card ao realizar busca inválida | **Tipo:** Negativo

**Pré-condições:** O usuário está autenticado e na tela de dashboard.

**Passos para Reprodução:**
1. Digitar “abcdef” no campo de busca.
2. Observar os resultados.

**Resultado esperado:** Exibir nenhum veículo.
***
### CT09 - Exibir todos os veículos ao limpar o filtro | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e na tela de dashboard.

**Passos para Reprodução:**
1. Digitar nome de veículo válido no campo de busca.
2. Verificar que apenas 1 veículo é exibido.
3. Limpar o campo de busca.

**Resultado esperado:** Voltar a exibir todos os veículos.
***
### CT10 - Exibir no card “Total de Veículos” a quantidade correta de veículos listados | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e na tela de dashboard.

**Passos para Reprodução:**
1. Contar o número de cards de veículos exibidos.
2. Verificar se o número mostrado no card “Total de Veículos” corresponde à contagem.

**Resultado esperado:** A contagem no card “Total de Veículos” é igual à quantidade de cards de veículos exibidos.
***
### CT11 - Habilitar botão “Alugar” para veículos com status “Disponível” | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e na tela de dashboard.

**Passos para Reprodução:**
1. Localizar um veículo com status “Disponível”.
2. Verificar o estado do botão “Alugar”.

**Resultado esperado:** O botão “Alugar” está habilitado.
***
### CT12 - Desabilitar botão “Alugar” para veículos com status “Alugado” | **Tipo:** Negativo

**Pré-condições:** O usuário está autenticado e na tela de dashboard.

**Passos para Reprodução:**
1. Localizar um veículo com status “Alugado”.
2. Verificar o estado do botão “Alugar”.

**Resultado esperado:** O botão “Alugar” está desabilitado.
***
### CT13 - Desabilitar botão “Alugar” para veículos com status “Manutenção” | **Tipo:** Negativo

**Pré-condições:** O usuário está autenticado e na tela de dashboard.

**Passos para Reprodução:**
1. Localizar um veículo com status “Manutenção”.
2. Verificar o estado do botão “Alugar”.

**Resultado esperado:** O botão “Alugar” está desabilitado.
***

## Funcionalidade: Modal de Aluguel (1º Modal)

### CT14 - Verificar se o modal exibe as informações corretas ao selecionar um veículo | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e na tela de dashboard.

**Passos para Reprodução:**
1. Clicar em “Alugar” em um card específico de um veículo.
2. Verificar se os dados correspondem ao veículo escolhido.

**Resultado esperado:** Exibir corretamente o nome, valor diário e detalhes do veículo selecionado.
***
### CT15 - Calcular valor total corretamente | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e com o modal de aluguel aberto.

**Passos para Reprodução:**
1. Inserir o valor “3” no campo “Dias”.
2. Verificar o total calculado.

**Resultado esperado:** O campo de total deve exibir em reais o valor correto, ou seja, 3 dias × R$ valor do aluguel.
***
### CT16 - Exibir descrição do cálculo corretamente | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e com o modal de aluguel aberto.

**Passos para Reprodução:**
1. Inserir o valor “3” no campo “Dias”.
2. Verificar a mensagem de descrição do cálculo.

**Resultado esperado:** A mensagem deve ser “3 dias × R$ valor do aluguel”.
***
### CT17 - Fechar modal com botão “Cancelar” | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e com o modal de aluguel aberto.

**Passos para Reprodução:**
1. Clicar no botão “Cancelar”.

**Resultado esperado:** O modal é fechado e não deve mais estar visível na tela.
***
### CT18 - Fechar modal com botão “X” | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e com o modal de aluguel aberto.

**Passos para Reprodução:**
1. Clicar no botão “X”.

**Resultado esperado:** O modal é fechado e não deve mais estar visível na tela.
***
### CT19 - Incrementar número de dias | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e com o modal de aluguel aberto.

**Passos para Reprodução:**
1. Focar no campo “Dias”.
2. Pressionar a seta ↑.

**Resultado esperado:** O valor no campo deve ser incrementado em 1.
***
### CT20 - Decrementar número de dias | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e com o modal de aluguel aberto.

**Passos para Reprodução:**
1. Digitar “2” no campo “Dias”.
2. Pressionar a seta ↓.

**Resultado esperado:** O valor deve diminuir de 2 para 1.
***
### CT21 - Impedir valor menor que 1 | **Tipo:** Negativo

**Pré-condições:** O usuário está autenticado e com o modal de aluguel aberto.

**Passos para Reprodução:**
1. Pressionar a seta ↓.

**Resultado esperado:** O valor deve permanecer “1”.
***
### CT22 - Confirmar aluguel com sucesso | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e com o modal de aluguel aberto.

**Passos para Reprodução:**
1. Clicar no botão “Confirmar Aluguel”.

**Resultado esperado:** O sistema deve fechar o modal de aluguel e abrir o modal “Resumo do Pedido”.
***

## Funcionalidade: Modal de Checkout (2º Modal)

### CT23 - Aplicar cupom válido e recalcular valor final | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e com o modal de pagamento aberto.

**Passos para Reprodução:**
1. Inserir o cupom “DESCONTO50” no campo de cupom.
2. Clicar no botão “Aplicar”.
3. Verificar se o desconto é aplicado e o valor final atualizado.

**Resultado esperado:** O sistema deve exibir a mensagem “Cupom Aplicado!”. O valor final deve ser recalculado com o desconto de R$50, sem permitir valores negativos (mínimo R$0).
***
### CT24 - Manter valor final ao aplicar cupom inválido | **Tipo:** Negativo

**Pré-condições:** O usuário está autenticado e com o modal de pagamento aberto.

**Passos para Reprodução:**
1. Inserir um cupom inválido no campo de cupom.
2. Clicar em “Aplicar”.
3. Verificar se o valor final permanece o mesmo do subtotal.

**Resultado esperado:** O sistema não deve aceitar o cupom inválido. O valor final deve permanecer igual ao subtotal. O campo de cupom e o botão “Aplicar” continuam visíveis.
***
### CT25 - Alternar forma de pagamento entre Cartão de Crédito e Pix | **Tipo:** Positivo

**Pré-condições:** O usuário está autenticado e com o modal de pagamento aberto.

**Passos para Reprodução:**
1. Verificar que a opção “Cartão de Crédito” está selecionada por padrão.
2. Clicar na opção “Pix” e verificar a mudança de seleção.
3. Retornar para “Cartão de Crédito” e validar a alternância.

**Resultado esperado:** Ao selecionar “Pix”, a opção “Cartão de Crédito” é desmarcada. Ao voltar para “Cartão de Crédito”, “Pix” é desmarcado. Apenas uma forma de pagamento pode estar ativa por vez.
***