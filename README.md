# Descrição do MVP Clínicas

Este projeto foi criado com o objetivo de oferecer uma solução para a gestão da agenda de uma amiga fisioterapeuta. Desenvolvido como parte do currículo do curso de Pós-Graduação em Engenharia de Software da PUC-Rio, seu desenvolvimento inicial ocorreu no módulo de Desenvolvimento Full Stack Básico. Atualmente, o projeto inclui implementações realizadas para o módulo de Arquitetura de Software.

Este é o repositório do Frontend do MVP de Clínicas. O MVP é dividido em quatro componentes principais: dois componentes internos e dois componentes externos.

![Diagrama do MVP](https://github.com/valkcastellani/mvp_clinica_frontend_react/blob/master/img/esquema_mvp.png)

## Componentes Internos

1.  **Frontend:**
    
    -   Desenvolvido com React, TypeScript, PrimeReact, PrimeFlex e PrimeIcons.
    -   Realiza a comunicação com o Auth0 para autenticação de usuários.
    -   Após a autenticação, o frontend se conecta com a API de Pacientes.
    -   Permite ao usuário:
        -   Buscar todos os pacientes (GET).
        -   Buscar um paciente específico pelo CPF (GET).
        -   Deletar um paciente (DELETE).
        -   Incluir um novo paciente (POST).
        -   Alterar informações de um paciente (PUT).
    -   Realiza consultas ao VIACEP para obter informações de endereço com base no CEP informado pelo usuário.

2.  **API de Pacientes:**
    
    -   Desenvolvida com a linguagem Python e o framework web Flask.
    -   Expõe endpoints para operações CRUD (Create, Read, Update, Delete) de pacientes.
    -   Não inclui a autenticação do token do Auth0 por fins didáticos.
    -   Nas consultas, a API também realiza chamadas ao VIACEP para retornar dados de endereço.
    -   A documentação desta API é fornecida seguindo o padrão OpenAPI através do Swagger.

## Componentes Externos

1.  **Auth0:**
    
    -   Responsável pela autenticação de usuários.
    -   O frontend se comunica com este serviço para autenticar os usuários antes de permitir o acesso à API de Pacientes.
    
2.  **VIACEP:**
    
    -   Serviço externo utilizado para obter informações de endereço com base no CEP.
    -   Tanto o frontend quanto a API de Pacientes realizam chamadas a este serviço para obter dados de endereço.

## Fluxo da Aplicação

1.  O usuário acessa o frontend e é redirecionado para o Auth0 para autenticação.
2.  Após a autenticação, o frontend se conecta à API de Pacientes.
3.  O usuário pode realizar operações CRUD na API de Pacientes.
4.  Ao informar um CEP, o frontend consulta o VIACEP para obter os dados de endereço.
5.  A API de Pacientes também consulta o VIACEP ao retornar dados de endereço nas suas respostas.