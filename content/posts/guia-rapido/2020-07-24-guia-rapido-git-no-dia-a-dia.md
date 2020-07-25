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

Isso acontece comigo direto e como eu sou preguiçoso resolvi reunir nesse post os principais problemas do dia-a-dia e como resolvê-los via linha de comando, assim quando eu precisar, eu posso apenas copiar e colar os comandos. :stuck_out_tongue_winking_eye:

## Conteúdo

- [Como mudar a mensagem do último commit](#como-mudar-a-mensagem-do-ultimo-commit)
- [Como adicionar mais arquivos no último commit](#como-adicionar-mais-arquivos-no-ultimo-commit)
- [Como apagar commits errados para refazer do jeito certo](#como-apagar-commits-errados-para-refazer-do-jeito-certo)
- [Como reorganizar vários commits de uma só vez](#como-reorganizar-varios-commits-de-uma-so-vez)
- [Como remover um arquivo do Staging Area (desfazer git add)](#como-remover-um-arquivo-do-staging-area-desfazer-git-add)
- [Como remover vários arquivos do Staging Area (desfazer git add)](#como-remover-arquivos-do-staging-area-desfazer-git-add)
- [Como separar várias modificações no mesmo arquivo em commits diferentes](#como-separar-varias-modificacoes-no-mesmo-arquivo-em-commits-diferentes)

## Como mudar a mensagem do último commit {id="como-mudar-a-mensagem-do-ultimo-commit"}

Para isso commit novamente usando a opção `--amend`.

```bash
$ git commit -m "nova mensagem de commit" --amend
```

## Como adicionar mais arquivos no último commit {id="como-adicionar-mais-arquivos-no-ultimo-commit"}

Adicione os arquivos ao Staging Area.

```bash
$ git add arquivo1.txt arquivo2.txt
```

Commit usando a opção `--amend`.

```bash
$ git commit --amend
```

Será aberto um editor com a última mensagem de commit. Se deseja manter a mesma apenas salve e feche o editor.


## Como apagar commits errados para refazer do jeito certo

Nesse exemplo eu tenho os arquivos `modificacao1.txt` no **primeiro** commit e os arquivos `modificacao1.2.txt` e `modificacao2.txt` que foram no **segundo** commit. 

Eu quero desfazer este último commit para que `modificacao1.2.txt` vá em um commit e `modificacao2.txt` vá em outro commit.

Utilize o comando `git log` para ver a lista de commits e conte quantos a partir do `HEAD` (último commit registrado) você irá apagar.

```bash
$ git log
```

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

## Como reorganizar vários commits de uma só vez {id="como-reorganizar-varios-commits-de-uma-so-vez"}

Nesse exemplo eu tenho a seguinte lista de commits.

- **Commit 1:** Finalizando funcionalidade X
- **Commit 2:** Commitando composer.json que eu esqueci
- **Commit 3:** Resolvendo bug encontrado na funcionalidade X
- **Commit 4:** *Refantorando* código depois de corrigir o bug

Nesse caso quero colocar as modificações do `Commit 2` dentro do `Commit 1`, manter o `Commit 3` e corrigir a palavra *"Refantorando"* do `Commit 4`.

Execute rebase em modo interativo informado quantos commits a partir do `HEAD` (último commit registrado) será trabalhado.

```
$ git rebase -i HEAD~4
```

Será aberto um editor com a lista de commits para você dizer o que deseja fazer escrevendo a instrução na frente do commit. 

Por exemplo, se você escrever `pick` o commit será mantido, já se você escrever `squash` ele será mesclado com o commit anterior.

Leia as instruções na tela para entender melhor.

No meu caso ficou assim:

```bash
pick 59d4134 Finalizando funcionalidade X
squash 78bb2da Resolvendo bug encontrado na funcionalidade X
pick 29c4568 Refatorando código depois de corrigir o bug
reword 177e9ed apagando arquivos antigos
```

Salve e feche o editor. Em seguida abrirá novas telas do editor para você configurar as novas mensagens nos commits que decidiu alterar.

> :warning: Não execute esta ação em commits que já sofreram `push`

## Como remover um arquivo do Staging Area (desfazer git add)

Execute `git reset` informando o arquivo.

```bash
$ git reset -- README.md
```

## Como remover vários arquivos do Staging Area (desfazer git add) {id="como-remover-arquivos-do-staging-area-desfazer-git-add"}

Abra o modo interativo da Staging Area executando:

```bash
$ git add -i
```

No menu aparece várias opções do que você pode fazer. Para remover os arquivos digite o número `3` e aperte `Enter`.

Em seguida veja na lista o número do arquivo que você deseja remover, digite-o e aparte `Enter`. Repita esse passo até remover todos os arquivos que deseja.

Ao terminar aperte `Enter` sem digitar nada para voltar à lista de comandos e depois informe `7` para sair.

## Como separar várias modificações no mesmo arquivo em commits diferentes {id="como-separar-varias-modificacoes-no-mesmo-arquivo-em-commits-diferentes"}

Execute o comando:

```bash
$ git add -p
```

Na primeira vez será mostrado todas as modificações juntas, então digite a opção `s` de "split" para dizer que quer dividir.

Após isso será perguntando de modificação em modificação o que você deseja fazer. Se quiser jogar a modificação na Staging Area informe `y`, caso contrário informe `n`.

Repita esse passo até passar por todas as modificações.

Se tiver duvidas sobre os comandos aperte `Enter` sem digitar nenhuma opção para ver as instruções.

No final execute `git commit` para finalizar e repita o processo para adicionar as modificações que ficaram de fora.