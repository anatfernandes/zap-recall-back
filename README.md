# :zap: Zap Recall Backend

![Badge Finalizado](https://img.shields.io/static/v1?label=STATUS&message=FINALIZADO&color=success&style=for-the-badge)

# Índice

- [Sobre](#Sobre)
- [Rotas](#Rotas)
  - [Rotas não autenticadas:](#Rotas-não-autenticadas)
    - [Cadastro](#Cadastro)
    - [Login](#Login)
    - [Listar baralhos](#Listar-baralhos)
  - [*Rotas autenticadas*:](#Rotas-autenticadas)
    - [Criar baralho](#Criar-baralho)
- [Como rodar em desenvolvimento](#Como-rodar-em-desenvolvimento)

<br/>

# Sobre
API do [Zap Recall](https://github.com/anatfernandes/zap-recall), uma página web de revisão por flashcards.

<br/>

# Rotas

## Rotas não autenticadas

## Cadastro
- Rota: `/sign-up`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "username": "cartman",
    "password": "cartmanomaior"
  }
  ```

- Possíveis erros:
	- Campos ausentes ou vazios
	- Já existe um usuário com os dados informados

## Login
- Rota: `/sign-in`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "username": "cartman",
    "password": "cartmanomaior"
  }
  ```
- Exemplo de Resposta:

  ```json
  {
    "key_access": "pwoehfcnmçksh.dflkjskbckjl.jfoakspfoiwujknfcç",
  }
  ```
- Possíveis erros:
	- Campos ausentes ou vazios
	- Não existe um usuário com os dados informados

## Listar baralhos

**Atenção:** essa rota lista os baralhos públicos. Para listar os baralhos de um usuário essa rota é autenticada, vide a seção [*Rotas autenticadas*](#Rotas-autenticadas) para ver requisitos.

- Rota: `/decks`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
        "_id": "6331ff556d1fe703d7f8fe38",
        "name": "React",
        "cards": [
            {
                "question": "O que é JSX?",
                "answer": "Uma extensão de linguagem do JavaScript"
            }
        ]
    }
  ]
  ```

## Rotas autenticadas
- Enviar Header `Key_Access` com a chave enviada no Login
- Possíveis erros:
	- Header `Key_Access` ausente
	- Chave inválida

## Criar baralho
- Rota: `/decks`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "name": "Nodejs",
    "cards":  [
      {
        "question": "O que é NodeJS?",
        "answer": "Um ambiente de execução de JavaScript"
      }
    ],
    "password": "cartmanomaior"
  }
  ```
- Possíveis erros:
	- Campos do body ausentes ou vazios
	- Campo *cards* deve ter entre 4 e 10 flashcards
	- Senha inválida

<br/>

# Como rodar em desenvolvimento

**Atenção:** para rodar o projeto é preciso ter o [MongoDB](https://www.mongodb.com/docs/manual/installation/) instalado em sua máquina.

1. Clone esse repositório:
>```ruby
> git clone https://github.com/anatfernandes/zap-recall-back.git
>```

2. Instale as dependências:
>```ruby
> npm install
>```

3. Configure o arquivo .env com base no arquivo .env.example

4. Inicie o projeto:
>```ruby
> npm run dev
>```

5. Instale e configure o frontend em https://github.com/anatfernandes/zap-recall

6. Divirta-se nas rotas usando de URL base: `http://localhost:{ENV_PORT}`
