---
title: "Guia Rápido: Git no dia-a-dia"
slug: ""
description: ""
date: 2020-07-24 17:17:58
author: bruno-viana
tags: ['guia-rapido', 'git']
cover: /images/posts/guia-rapido-git/oliver-sjostrom-6iH-qD2kPLk-unsplash.jpg
fullscreen: false
---
O PHPStorm tem uma puta ferramenta para trabalhar com Git. Talvez o editor/IDE que você usa também tenha.

Mas vai dizer que nunca aconteceu com você aquele problema de que tinha tanto arquivo para atualizar que travou o editor ou surgiu aquela mensagem de erro que você simplesmente não sabe como resolver por dentro do editor e precisa recorrer ao Stack Overflow pra resolver na mão?

Isso acontece comigo direto, e como eu sou preguiçoso resolvi reunir nesse post os principais problemas do dia-a-dia e como resolvê-los via linha de comando, assim quando eu precisar, eu posso apenas copiar e colar os comandos. :stuck_out_tongue_winking_eye:

## Conteúdo

- [Editei uma cacetada de arquivos mas quero fazer commits separados](#editei-uma-cacetada-de-arquivos-mas-quero-fazer-commits-separados)
- [Preciso apagar commits que fiz errado para refazer do jeito certo](#preciso-apagar-commits-que-fiz-errado-para-refazer-do-jeito-certo)
- Reorganizando commits pra ficar bonito no Code Review
- Preciso reescrever um commit que não ficou bom
- Commitei mas depois percebi que faltou algo
- Comitei na master quando devia ter criado outra branch

## Editei uma cacetada de arquivos mas quero fazer commits separados

A primeira coisa a fazer é verificar quais arquivos foram editados e estão esperando entrarem em um commit.

```bash
$ git status
```

Como exemplo eu tenho os arquivos `modificacao1.txt` e `modificacao1.2.txt` que vão no **primeiro** commit e o arquivo `modificacao2.txt` irá em um **segundo** commit.

Primeiro adiciono os dois primeiros arquivos à `Staging Area`:

```bash
$ git add modificacao1.txt modificacao1.2.txt
```

Depois realizo o commit deles:

```bash
$ git commit -m "Modificações da funcionalidade X"
```

Em seguinda jogo a próxima modificação na `Staging Area` e commito também.

```bash
$ git add modificacao2.txt

$ git commit -m "Modificação na Funcionalidade Y"
```

## Preciso apagar commits que fiz errado para refazer do jeito certo

Nesse exemplo eu tenho os arquivos `modificacao1.txt` no **primeiro** commit e os arquivos `modificacao1.2.txt` e `modificacao2.txt` que foram no **segundo** commit. 

Eu quero desfazer este último commit para que `modificacao1.2.txt` vá em um commit e `modificacao2.txt` vá em outro commit.

Utilize o comando `git log` para ver a lista de commits e saber quantos deles deseja desfazer.

No meu caso quero apagar apenas 1 commit. Logo vou executar:

```bash
$ git reset HEAD~1
```

Depois realizo os commits da forma correta.

```bash
$ git add modificacao1.2.txt

$ git commit -m "Apenas modificacao1.2.txt"

$ git add modificacao2.txt

$ git commit -m "Apenas modificacao2.txt"
```

> :warning: Não apague commits que já sofreram `push`