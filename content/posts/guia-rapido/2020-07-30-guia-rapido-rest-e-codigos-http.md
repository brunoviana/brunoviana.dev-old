---
title: "Guia Rápido: REST e Códigos HTTP"
slug: ""
description: ""
date: 2020-07-30 18:35:50
author: bruno-viana
tags: ['guia-rapido', 'git']
cover: /images/posts/guia-rapido-git/oliver-sjostrom-6iH-qD2kPLk-unsplash.jpg
fullscreen: false
---

## Como funciona o protocolo HTTP? (O REST e os navegaores usam ele loucamente)

## Qual a importancia dos status HTTP?

Importancia:
- Cache
- Cookies
- Segurança
- Comunicação
  - Se a requisição mandar um login e senha inválido ovcê não pode retornar 200. Caso contrário a aplicação vai tentar redirecionar para a página restrita.
- Saber onde procurar os problemas
  - Até no NGINX da um problema que sabendo o significado do status http você vai mais em cima do problema. (pegar exemplos sou energy)

## Qual a importancia dos verbos do REST? Por que é importante implementá-los corretamente?

GET: Buscas
POST: Inserções
PUT: Atualizações
DELETE: Exclusões

# Status Codes

https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

Mais comuns:

200 OK: Deu tudo certo! Sem erros.

3xx: Não são erros, mas sim respostas do servidor indicando redirecionamento.
301 Moved Permanetly: Movido permanentemente - Os navegadores e o Google irão guardar essa resposta e não contaram mais com a URL que informou o status 301.
302 Moved Temporarily: Movido temporariamente. Não é guardado pois come sse status você está dizendo que está URL um dia voltará a responder novamente.

4xx: São erros produzidos pelo cliente. Geralmente ele mandou alguma informações errada e o servidor recusou a requisição.
400 Bad Request: O servidor não entendeu a requisição. Pode ser usado para validação (ex. a requisição não mandou o id da entidade a ser tratada): https://www.quora.com/Which-HTTP-code-is-best-suited-for-validation-errors-400-or-422
403 Forbidden: Você não tem permissão para acessar o endereço. Pode ser falta de chave de api, regra de bloqueio da URI no NGINX, login ou senha inválido, etc.
404 Not Found: Famosinho. Indica que a entidade não foi encontrda. Pode ser a página que a URI devia exibir ou um usuário com id não existente.
422 Unprocessable Entity: A resição não é aceita por conta de erro semantico (Ex. casa decimal com ponto no lugar de virgula). Bastante usando para validação.
429 Too Manu Requests: O usuário enviou mais requisições do que poderia. Geralmente há algum limite no servidor que bloqueia. Já passei por problema disso nos correios mas sempre recebia status 200 e não sabia o que estava errado.

5XX: Geralmente indicam erros que aconteceram dentro do servidor. O "geralmente" é por que pode ser que o erro não seja o servidor mas um serviço externo que o servidor precisa e não está funcionando, porém para o cliente da requisição o erro não é dele, logo é encarado como erro no servidor.
500 Internal Server Erro: Geralmente é algum erro de código do serviço. Exception disparada, erro de sintaxe na configuração ou até mesmo Segmentation Fault de um processo.
502 Bad Gateway: O servidor não conseguiu contato com um serviço. Ex. NGINX não consegue conversar com PHP. Já tive vários problemas por não conseguir conectar com correios e sempre mandava 500 quando deveria mandar 502. Sempre ficava achando que a culpa era minha.
503 Service Unavailabe: O servidor não está disponivel para uso no momento. Geralmente por uma manutenção ou o servidor está tão ocupado que não pode processar a requisição
504 Gateway Timeout: Um serviço externo demorou muito pra responder. Exemplo NGINX espera resposta do PHP e ele não responde. Pode significar que o PHP está com gargalos.

