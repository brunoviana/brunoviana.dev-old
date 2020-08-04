---
title: "Guia Rápido (ou quase): REST e Códigos HTTP"
slug: ""
description: ""
date: 2020-07-30 18:35:50
author: bruno-viana
tags: ['guia-rapido', 'git']
cover: /images/posts/guia-rapido-git/oliver-sjostrom-6iH-qD2kPLk-unsplash.jpg
fullscreen: false
---

Depois de uns dois anos trabalhando como "desenvolvedor-faz-tudo" (é Full Stack que chama hoje?) dando manutenção em sites eu finalmente entrei no meu primeiro projeto para desenvolver um sistema e eu era o programador mais experiente do projeto...

... na verdade eu era o único programador do projeto. :shrug:

Com o tempo que mais programadores foram entrando (todos menos experiêntes que eu) e obviamente com mais código gerado, mais mãos mexendo e experiência de menos as coisas começaram a ficar tensas.

Durante um bom tempo a gente tinha uma regra que era **"Nunca confie na mensagem de sucesso"** por que geralmente o sistema exibia uma mensagem de sucesso ao salvar mas no fundo não salvava nada.

Flash-foward pra hoje em dia e eu vejo constantemente algo que até pouco tempo atrás eu mesmo fazia: API's REST que mandam Status Code `200 OK` com um JSON como esse:

```json
{
  "success": false,
  "mensagem": "Não foi possível salvar"
}
```

<div style="width:100%;height:0;padding-bottom:74%;position:relative;"><iframe src="https://giphy.com/embed/12J1QXPeD10z9m" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/12J1QXPeD10z9m">via GIPHY</a></p>

Se você não sabe o problema disso aproveita que nesse artigo eu vou explicar tintin por tintin tudo que aprendi sobre códigos HTTP, a relação que o REST tem com o protocolo HTTP e como saber tudo isso me fez escrever API's do jeito certo.


## A relação entre REST e o protocolo HTTP

Imagina que eu te pedi pra mandar um recado pra um amigo que mora do outro lado do mundo mas não te dei nenhum detalhe de como você deve mandar essa mensagem (via carta, email, whatsapp, etc) e nem qual o idioma que meu amigo fala.

Para garantir que a comunicação entre 2 serviços (computadores/softwares) ocorra da forma correta padrões (ou protocolos) são criados.

O HTTP é um protocolo de **transferência de dados**. Ele diz como um conjunto de dados vai ser enviado e interpretado entre dois serviços. É como se eu te falasse que você vai mandar a mensagem pro meu amigo via email.

Mas para você enviar o email é preciso de algumas informações importantes: o email do meu amigo, a mensgem que quero enviar e que você terá que mandá-la em alemão se não ele não conseguirá ler

Para que 2 serviços se comuniquem da forma correta o protocolo HTTP define que a algumas informações devem estar presentes para que a mensagem seja enviada do modo certo, e que ao ser recebida seja interpretada do jeito certo.

Já o REST é um protocolo de **comunicação** entre dois serviços. Ele não define padrões de como a comunicação deve ser enviada, muito menos de como a mensagem deve ser formatada por que ele já usa do protocolo HTTP para isso. 

Isso significa que não importa se você vai mandar dados em JSON ou XML por que você vai dizer usando o próprio HTTP qual o formato da mensagem. Quem recebe na outra ponta usa essa informação para interpretar do jeito certo.

## Como usar o HTTP para mandar mensagens do jeito certo

Toda comunicação HTTP é formada por 2 partes quando enviada: Cabeçalhos (Headers) e Corpo da Mensagem (Body). 

O Corpo é a mensagem propriamente dita e os Cabeçalhos são as informações que os serviços vão usar para entender como eles devem interpretar a comunicação. Isso significa que a gente tem Cabeçalhos enviados por quem envia a mensagem (Request Headers) e por quem responde (Response Headers).

Para exemplificar eu escrevi essa linha de código em PHP:

```php
<?php

echo '<?xml version="1.0" encoding="UTF-8"?>
    <exemplo>
        <hello>world</hello>
    </exemplo>
';
```

Isso me gerou uma tela como essa:

![](/images/posts/guia-rapido-rest/exemplo-cabecalhos.png)

Observe como o XML foi renderizado pelo navegador (o "1" vermelho na imagem). 

Ao abrir a inspeção de rede do próprio navegador a gente consegue ver os cabeçalhos enviados pelo navegador (2) e os respondidos pelo meu serviço (3).

Como eu não defini no código o tipo de conteúdo o servidor mandou o padrão (aquele cabeçalho escrito "Content-type"). Logo o navegador entendeu que estava recebendo um HTML e mandou exibir apenas o texto que estava entre tags.

Agora eu vou colocar um cabeçalho informando que o conteúdo da mensagem se trata de um XML:

```php
<?php

header('Content-type: application/xml');

echo '<?xml version="1.0" encoding="UTF-8"?>
    <exemplo>
        <hello>world</hello>
    </exemplo>
';
```

Agora o navegador renderizou assim:

![](/images/posts/guia-rapido-rest/exemplo-cabecalhos2.png)

Olhando o inspecionador a gente consegue ver que o cabeçalho foi recebido corretamente e agora o navegador interpretou a mensagem da forma correta.

Até aqui tudo bem, mas vamos transformar a nossa resposta em algo mais próximo da realidade do dia-a-dia.

Para isso vou fazer o serviço esperar um `id` ser enviado por parâmetro e ele vai responder um JSON com o usuário ou com um erro.

```php
<?php

header('Content-type: application/json');

$idDoUsuario = $_GET['id'];

$usuarios = [
    1 => [
        'nome' => 'Bruno'
    ]
];

if(isset($usuarios[ $idDoUsuario ])){

  echo json_encode($usuarios[ $idDoUsuario ]);

}
else{

  echo json_encode([
      'erro' => 'Este usuário não existe'
  ]);

}
```

Agora eu rodei pelo Insomnia que é uma ferramenta aproprioada para execução de API's, e ao enviar o `id` o retorno veio correto.

![](/images/posts/guia-rapido-rest/exemplo-status-code.png)

Quando eu removo o `id` do parâmetro o código também retorna o esperado. Mas perceba uma coisa muito importante:

![](/images/posts/guia-rapido-rest/exemplo-status-code2.png)

Mesma o serviço me respondendo que houve um erro o Insomnia está me informando que está tudo **OK**.

Esse tipo de comportamento pode acarretar vários problemas. Por exemplo, quem vai consumir a API não sabe se o tipo de JSON retornado é o usuário consultado ou uma mensagem de erro.

É para ajudar nesse tipo de situação que o protocolo HTTP define que quem responde também deve enviar um terceiro item que é o Status Code.

O Status Code é um código que dá um detalhe maior do que aconteceu para que o serviço desse aquela resposta. Esses códigos são padronizados e mais abaixo eu vou falar os principais deles. 

Por hora vamos consertar o meu código para ver o que acontece.

![](/images/posts/guia-rapido-rest/exemplo-status-code3.png)

Agora sim temos uma resposta descente!

Além de informar da mensagem estou também informando o código da resposta dando muito mais contexto para quem vai usar minha API.

## Qual a importancia do Status Code?

*"Ah mas eu posso procurar na mensagem se a chave "erro" existe na resposta e assim eu fico sabendo se é um erro"*

Sim, você pode, assim como eu também posso passar 1 semana sem tomar banho. 

É possivel? Sim. É aconselhável? Não.

Lembre-se que o Corpo é feito para quem vai interpretar a comunicação na ponta. Na maior parte das vezes será o usuário ou o algoritmo que vai salvar a informação no banco de dados.

O seu código que salva a informação no banco de dados, o código que trata erros e o código que faz a requisição à API são (ou deveriam ser) diferentes. O Status Code ajuda o serviço entender o que está acontecendo para decidir quem é responsável interno por tratar a resposta.

Outro motivo muitisisisisisisisisisimo importante é que diferentes serviços usam o Status Code para tratamentos internos.

Os navegadores, por exemplo, usam o Status Code para defidir quando devem manter ou apagar cache, ou para garantir a segurança do usuário que está navegando.

Servidores web como Apache ou NGINX usam o Status Code para te dar mais detalhes do tipo de erro que fez algo parar e você poder decidir como tratar.









## Qual a importancia dos verbos do REST? Por que é importante implementá-los corretamente?

**This is because our HTTP request method already has the verb.** Having verbs in our API endpoint paths isn’t useful and it makes it unnecessarily long since it doesn’t convey any new information. The chosen verbs could vary by the developer’s whim. For instance, some like ‘get’ and some like ‘retrieve’, so it’s just better to let the HTTP GET verb tell us what and endpoint does.

GET: Buscas
POST: Inserções
PUT: Atualizações
DELETE: Exclusões

# Status Codes

https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

Mais comuns:

2XX: Indicam sucesso com a requisição. Porém dependendo da requisição os tipos de sucesso podem variar.
200 OK: Sucesso genérico. Significa que a requisição foi bem recebida e processada com sucesso.
201 Created: Significa que um novo recurso foi criado. Por exemplo, você solicitou a criação de um usuário. Se a requisição alem de ser recebida e processada com sucesso ela também criou uma nova entidade ela vai retornar 201.
204 No Content: Quando não há nada para ser retornado mas é importante o cliente saber que a requisição chegou com sucesso.

3xx: Não são erros, mas sim respostas do servidor indicando redirecionamento.
301 Moved Permanetly: Movido permanentemente - Os navegadores e o Google irão guardar essa resposta e não contaram mais com a URL que informou o status 301.
302 Moved Temporarily: Movido temporariamente. Não é guardado pois come sse status você está dizendo que está URL um dia voltará a responder novamente.

4xx: São erros produzidos pelo cliente. Geralmente ele mandou alguma informações errada e o servidor recusou a requisição.
400 Bad Request: O servidor não entendeu a requisição. Pode ser usado para validação (ex. a requisição não mandou o id da entidade a ser tratada): https://www.quora.com/Which-HTTP-code-is-best-suited-for-validation-errors-400-or-422
401 Unauthorized: Não tem autorização para acessar o recurso. Geralmente o usuário não está autenticado.
403 Forbidden: Você não tem permissão para acessar o endereço. Pode ser falta de chave de api, regra de bloqueio da URI no NGINX, login ou senha inválido, etc.
404 Not Found: Famosinho. Indica que a entidade não foi encontrda. Pode ser a página que a URI devia exibir ou um usuário com id não existente.
422 Unprocessable Entity: A resição não é aceita por conta de erro semantico (Ex. casa decimal com ponto no lugar de virgula). Bastante usando para validação.
429 Too Manu Requests: O usuário enviou mais requisições do que poderia. Geralmente há algum limite no servidor que bloqueia. Já passei por problema disso nos correios mas sempre recebia status 200 e não sabia o que estava errado.

5XX: Geralmente indicam erros que aconteceram dentro do servidor. O "geralmente" é por que pode ser que o erro não seja o servidor mas um serviço externo que o servidor precisa e não está funcionando, porém para o cliente da requisição o erro não é dele, logo é encarado como erro no servidor.
500 Internal Server Erro: Geralmente é algum erro de código do serviço. Exception disparada, erro de sintaxe na configuração ou até mesmo Segmentation Fault de um processo.
502 Bad Gateway: O servidor não conseguiu contato com um serviço. Ex. NGINX não consegue conversar com PHP. Já tive vários problemas por não conseguir conectar com correios e sempre mandava 500 quando deveria mandar 502. Sempre ficava achando que a culpa era minha.
503 Service Unavailabe: O servidor não está disponivel para uso no momento. Geralmente por uma manutenção ou o servidor está tão ocupado que não pode processar a requisição
504 Gateway Timeout: Um serviço externo demorou muito pra responder. Exemplo NGINX espera resposta do PHP e ele não responde. Pode significar que o PHP está com gargalos.

## Headers

Toda requisição HTTP é formada por:
- Status Code
- Headers
- Body

O Body é apenas de interesse do cliente. Headers e Status Code são as informações que os programas e o navegador usa para conversar com o servidor. Alguns frameworks já fazem isso automático.

Para que as duas pontas se entendam você deve mandar "Accept" e "Content-type".

## Dicas

Pare de usar jQuery e use fetch
Use substantivos nos endpoints (explicar o que é um endpoint) para ficar explicito qual entidade está sendo trabalhada (nada de "/buscarUsuario?id=1", tem que ser "/usuarios/1" - entidade "usuarios" de id 1)
Use plural para coleções