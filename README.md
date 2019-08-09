# tic-tac-toe
O objetivo deste projeto é desenvolver uma api para um jogo multiplayer de Jogo da Velha.

## Premissas
- [x] Poderá ser feito em qualquer linguagem;
- [x] Deverá conter um README com instruções claras de build e dependências;
- [x] Build automatizado é opcional mas desejável;
- [x] Não pode haver dependência de banco de dados ou serviços externos. A persistência dos dados pode
- [x] Ser feita por exemplo in-memory ou baseada em arquivos;
- [x] Não é necessária preocupação com autenticação dos métodos;
- [x] **Será avaliado além do funcionamento da API boas práticas de desenvolvimento de software**.

## Dependências
* Node.js 10.16 +
    * express
    * uuid

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
sudo docker image buid -t tic-tac-toe .
sudo docker container -d -name tictactoe -p 3000:3000 tic-tac-toe
```
