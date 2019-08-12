# Tic tac toe (jogo da velha)
O objetivo deste projeto é desenvolver uma api para um jogo multiplayer de Jogo da Velha.

|    |    |    |
|---|---|---|
|:wink:|:x:|:x:|
|:x:|:wink:|   |
||:x:|:wink:|
|    |    |    |

## Premissas
- [x] Poderá ser feito em qualquer linguagem;
- [x] Deverá conter um README com instruções claras de build e dependências;
- [x] Build automatizado é opcional mas desejável;
- [x] Não pode haver dependência de banco de dados ou serviços externos. A persistência dos dados pode Ser feita por exemplo in-memory ou baseada em arquivos;
- [x] Não é necessária preocupação com autenticação dos métodos;
- [x] **Será avaliado além do funcionamento da API boas práticas de desenvolvimento de software**.

## Dependências de desenvolvimento
* Node.js 10.16 +
    * chai
    * cors
    * dotenv
    * eslint
    * eslint-plugin-prettier
    * mocha
    * prettier
    * request

## Dependências de produção
* Node.js 10.16 +
    * express
    * uuid

## Variáveis de ambiente
* HTTP_PORT=3000 `(default 3000)`
* NODE_ENV=development
## Setup
```bash
npm install
```

## Test TDD
```bash
npm test
```

## Start
```bash
npm start
```

## Docker
```bash
sudo docker image build -t tic_tac_toe .
sudo docker container run -d --name jogo_da_velha -p 3000:3000 tic_tac_toe
```

## Curl
```bash
curl -X POST http://0.0.0.0:3000/game

# output:  
# {"id":"68fb90c1-9cd6-41b9-b267-2ad0a5dbe2f6","firstPlayer":"X"}

curl -i -X POST \
-d '{"id" : "68fb90c1-9cd6-41b9-b267-2ad0a5dbe2f6", "player": "X", "position": { "x": 0, "y": 1 }}' \
-H "Content-Type: application/json" http://0.0.0.0:3000/game/68fb90c1-9cd6-41b9-b267-2ad0a5dbe2f6/movement

# output:
# HTTP/1.1 200 OK
# Access-Control-Allow-Origin: *
# Content-Type: application/json; charset=utf-8
# Date: Sun, 11 Aug 2019 23:46:44 GMT
# Connection: keep-alive
# Content-Length: 0

curl -X POST \
-d '{"id" : "68fb90c1-9cd6-41b9-b267-2ad0a5dbe2f6", "player": "O", "position": { "x": 2, "y": 1 }}' \
-H "Content-Type: application/json" http://0.0.0.0:3000/game/68fb90c1-9cd6-41b9-b267-2ad0a5dbe2f6/movement

# output: 
# {"msg":"Não é turno do jogador"}

curl -X POST \
-d '{"id" : "68fb90c1-9cd6-41b9-b267-2ad0a5dbe2f8", "player": "O", "position": { "x": 2, "y": 1 }}' \
-H "Content-Type: application/json" http://0.0.0.0:3000/game/68fb90c1-9cd6-41b9-b267-2ad0a5dbe2f8/movement

# output: 
# {"msg":"Partida não encontrada"}
```
