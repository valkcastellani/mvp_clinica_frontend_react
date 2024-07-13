
# Descrição do MVP Clínicas

Este projeto foi criado com o objetivo de oferecer uma solução para a gestão da agenda de uma amiga fisioterapeuta. Desenvolvido como parte do currículo do curso de Pós-Graduação em Engenharia de Software da PUC-Rio, seu desenvolvimento inicial ocorreu no módulo de Desenvolvimento Full Stack Básico. Atualmente, o projeto inclui implementações realizadas para o módulo de Arquitetura de Software.

Este é o repositório da API de Pacientes do MVP de Clínicas. O MVP é dividido em quatro componentes principais: dois componentes internos e dois componentes externos.

![Diagrama do MVP](https://github.com/valkcastellani/mvp_clinica_frontend_react/blob/master/img/esquema_mvp.png)

## Componentes Internos

1.  **Frontend:**

    - Desenvolvido com React, TypeScript, PrimeReact, PrimeFlex e PrimeIcons.
    - Realiza a comunicação com o Auth0 para autenticação de usuários.
    - Após a autenticação, o frontend se conecta com a API de Pacientes.
    - Permite ao usuário:
      - Buscar todos os pacientes (GET).
      - Buscar um paciente específico pelo CPF (GET).
      - Deletar um paciente (DELETE).
      - Incluir um novo paciente (POST).
      - Alterar informações de um paciente (PUT).
    - Realiza consultas ao VIACEP para obter informações de endereço com base no CEP informado pelo usuário.


2.  **API de Pacientes:**

    - Desenvolvida com a linguagem Python e o framework web Flask.
    - Expõe endpoints para operações CRUD (Create, Read, Update, Delete) de pacientes.
    - Não inclui a autenticação do token do Auth0 por fins didáticos.
    - Nas consultas, a API também realiza chamadas ao VIACEP para retornar dados de endereço.
    - A documentação desta API é fornecida seguindo o padrão OpenAPI através do Swagger.

   Para utilizar o frontend deste MVP, você deve utilizar também a API de Pacientes que foi disponibilizada no endereço [https://github.com/valkcastellani/python_paciente_api](https://github.com/valkcastellani/python_paciente_api).
   
## Componentes Externos

1.  **Auth0:**

    - Responsável pela autenticação de usuários.
    - O frontend se comunica com este serviço para autenticar os usuários antes de permitir o acesso à API de Pacientes.

2.  **VIACEP:**

    - Serviço externo utilizado para obter informações de endereço com base no CEP.
    - Tanto o frontend quanto a API de Pacientes realizam chamadas a este serviço para obter dados de endereço.

## Fluxo da Aplicação

1.  O usuário acessa o frontend e é redirecionado para o Auth0 para autenticação.
2.  Após a autenticação, o frontend se conecta à API de Pacientes.
3.  O usuário pode realizar operações CRUD na API de Pacientes.
4.  Ao informar um CEP, o frontend consulta o VIACEP para obter os dados de endereço.
5.  A API de Pacientes também consulta o VIACEP ao retornar dados de endereço nas suas respostas.

---

# Configuração de Variáveis de Ambiente para Auth0

Para utilizar a autenticação pelo Auth0 nesta aplicação React, você precisa configurar duas variáveis de ambiente: `REACT_APP_AUTH0_DOMAIN` e `REACT_APP_AUTH0_CLIENT_ID`. Estas variáveis são utilizadas para conectar a sua aplicação com o serviço de autenticação Auth0.

## Obtendo os Valores do Auth0

1.  **Crie uma Conta no Auth0**
    
    Se você ainda não tem uma conta no Auth0, crie uma em [auth0.com](https://auth0.com).
    
2.  **Crie uma Aplicação no Auth0**
    
    Depois de fazer login no Auth0, siga estes passos:
    
    -   Vá para o painel de controle do Auth0.
    -   Clique em "Applications" no menu lateral.
    -   Clique no botão "Create Application".
    -   Escolha um nome para a sua aplicação e selecione "Single Page Web Applications".
    -   Clique em "Create".
    - 
3.  **Obtenha o Domínio e o Client ID**
    
    Após criar a aplicação, você será redirecionado para a página de configurações da aplicação. Aqui você encontrará os valores necessários:
    
    -   **Domain**: Este é o seu `REACT_APP_AUTH0_DOMAIN`.
    -   **Client ID**: Este é o seu `REACT_APP_AUTH0_CLIENT_ID`.

## Passos para Configurar Variáveis de Ambiente

1.	**Definir Variáveis de Ambiente no Sistema**
    
    Defina as variáveis de ambiente no seu sistema ou no arquivo `.profile` (se você estiver utilizando Linux).
    
    ```bash
	export REACT_APP_AUTH0_DOMAIN=your-auth0-domain
	export REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
      ```

2.	 **Adicionar Variáveis de Ambiente no docker-compose.yml**
		
		Edite o arquivo docker-compose.yml para incluir as variáveis de ambiente:      

		    environment:
		      - REACT_APP_AUTH0_DOMAIN=your-auth0-domain
		      - REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id

Substitua your-auth0-domain e your-auth0-client-id pelos valores corretos. 

	   
---

# Como executar

Será necessário ter todos pacotes listados no `package.json` instalados.
Após clonar o repositório, é necessário ir ao diretório raiz, pelo terminal, para poder executar os comandos descritos abaixo.

```
npm install
```

Este comando instala todas as dependências/bibliotecas, descritas no arquivo `package.json`.

Para executar o Frontend do MVP, basta executar:

```
npm start
```

Abra o [http://localhost:3000/#/](http://localhost:3000/#/) no navegador para verificar o Frontend em execução.

---

# Executando Frontend em Contêineres Docker

## Docker Build e Run

Para construir e executar uma imagem Docker a partir de um Dockerfile, siga os passos abaixo:

1. Construindo a imagem com Docker Build:

   Primeiro, navegue até o diretório onde está localizado o Dockerfile e execute o seguinte comando para construir a imagem:

   ```bash
   docker build -t frontend_paciente:latest .
   ```

   - **frontend_paciente** é o nome da imagem.
   - **latest** é a tag de identificação da versão da imagem. Nessa caso, foi utilizado latest, pois é a versão mais recente disponibilizada.
   - **.** indica que o Dockerfile está no diretório atual.

2. Iniciando a Imagem com Docker Run:

   Após construir a imagem, você pode iniciar um contêiner a partir dessa imagem com o comando:

   ```bash
   docker run -d -p 3000:3000 -e REACT_APP_AUTH0_DOMAIN=your-auth0-domain -e REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id frontend_paciente:latest
   ```

   - **-d** inicia o contêiner em modo _detached_ (em segundo plano).
   - **-p 3000:3000** mapeia a porta do host para a porta do contêiner, no formato _porta-do-host:porta-do-contêiner_.
   - **-e REACT_APP_AUTH0_DOMAIN=your-auth0-domain -e REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id** faz com que as variáveis de ambiente do Auth0 sejam definidas no contêiner.
   - **frontend_paciente:latest** é a imagem que criamos com o comando _docker build_ no item 1, no format _nome-da-imagem:tag_.

3. Verificando o Contêiner em Execução:

   Para verificar se o contêiner está em execução, use:

   ```bash
   docker ps
   ```

   Ou

   ```bash
   docker container ls -a
   ```

   Isso mostrará uma lista dos contêineres em execução.

## Docker Compose

O Docker Compose simplifica a definição e execução de aplicativos Docker de múltiplos contêineres. Ele usa um arquivo docker-compose.yml para configurar os serviços da sua aplicação.

1. Criando e Iniciando os Serviços:

   Para construir e iniciar todos os serviços definidos no arquivo `docker-compose.yml`, use:

   ```bash
   docker-compose up --build -d
   ```

   - **--build** reconstrói as imagens se necessário.
   - **-d** inicia os contêineres em segundo plano (_detached mode_).

2. Parando os Serviços:

   Para parar e remover os contêineres definidos no arquivo `docker-compose.yml`, execute:

   ```bash
   docker-compose down
   ```

   Isso irá parar todos os contêineres e remover os recursos criados pelo _docker-compose up_.

---

# Contribuindo

Se você encontrar qualquer problema ou tiver sugestões para melhorar este Frontend, sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.