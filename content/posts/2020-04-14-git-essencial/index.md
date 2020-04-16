---
title: "Git Essencial: Como trabalhar e resolver problemas do dia-a-dia"
slug: git-essencial
author: Bruno Viana
date: 2020-04-14
hero: ./images/hero.jpg
excerpt: Entenda o básico para trabalhar com Git e resolver os problemas que vão aparecer no dia a dia
---

Quem me conhece bem sabe que minha memória é tão boa quanto a de um peixinho dourado. Só que por algum motivo obscuro minha cabeça guarda algumas coisas de uma forma tão viva que eu não consigo entender.

Recentemente eu lembrei de um pobre colega de trabalho que ficou uma noite inteira trabalhando para refazer um trabalho que ele tinha levado uma fucking semana para fazer. 

Sim, ele foi forçado a fazer em uma noite o trabalho de uma semana!!

O ano era mais ou menos 2007-2008, e nessa época todo o código de todos os projetos ficavam em um servidor compartilhado na rede e a gente programava direto dentro do servidor. 

Isso tem uma explicação simples: era a forma que a gente conhecia de trabalhar mais de uma pessoa no mesmo projeto.

Imagina a merda que seria cada um ter o projeto na sua máquina e depois ter que consolidar tudo que foi feito e modificado em cada arquivo antes de subir para produção!

Acontece que um outro ~~jumento~~ nobre colega achou que alguns arquivos não eram mais essenciais e saiu sapecando o DELETE neles e quando você exclui arquivos pela rede, meu amigo e minha amiga, não tem lixeira não, tudo é apagado real oficial.

Não importa quanto tempo de experiência ou a linguagem de programação, todos nós vamos sempre passar pelos mesmos problemas:

* Seu computador var dar pau no HD e você vai perder todo trabalho;
* Você vai subir uma nova feature para produção, perceber que ela está com vários bugs e não vai ter uma maneira rápida voltar ao último estado em que o código funcionava corretamente;
* Você vai começar a programar uma nova feature e do nada vão mandar você parar para resolver um problema e vai ser um parto mandar isso para produção pois no meio da correção do bug tem código da feature inacabada;
* Você vai fazer modificações em um arquivo e alguém da sua equipe vai editar o mesmo arquivo e vai sobrescrever o que você fez;
* Você vai começar a trabalhar em uma solução e vai ver que ela não funciona como imaginava, porém você já modificou tantos arquivos que fica extremamente dificil voltar atrás;

A gente sabe que a vida de programador é cheia de emoções, mas é sempre bom evitar mais uma, né? 

![Programar não é estressante, afirma João de 25 anos](./images/programar-nao-e-estressante.png)

Por isso a comunidade criou o que chamamos de Sistema de Controle de Versão e o principal deles é o **Git**.

## Conteúdo

O objetivo principal desse artigo é servir de um guia para sempre que eu precisar lembrar de algum detalhe do funcionamento do Git ou de algum comando eu tenha uma forma fácil de pegar a informação.

Para facilitar a leitura e posteriormente a busca do que preciso, dividi o artigo da seguinte forma.

1. **O que é Git**:<br />
Aqui eu explico o que é e falo beeeem por cima dos primeiros conceitos;<br />
2. **O básico para você começar a usar**:<br />
Aqui eu começo a destrinchar os comandos básicos, aqueles que a gente sempre vê em todo artigo sobre Git, mas eu vou explicar da forma que ficou mais fácil eu entender;
3. **Trabalhando com Git do jeito certo**:<br />
Nessa seção eu falo de fluxos de trabalho e organização. Nem tudo no Git são comandos. Se você não seguir esses passos você e sua equipe terão vários problemas;<br />
4. **Aprendendo a consertar cagadas**:<br />
Já aqui eu vou explicar comandos que podem salvar seu dia ou que vão te dar apoio para você aplicar os conceitos da seção anterior;<br />
5. **Referências rápidas**:<br />
Como a ideia do artigo é servir de guia eu vou dedicar essa seção para listagem de comandos e explicação rápida para apenas copiar e colar 😬<br />

## O que é Git 

Como os problemas que você tem hoje são os mesmos que eu tive em 2008, e que são os mesmos que as pessoas tem desde a década de 80, começou a surgir o que chamamos de Sistemas de Controle de Versão (em inglês Version Control System - VCS).

Eu não vou gastar meus dedos escrevendo sobre a história do Git e qual a sua diferença em relação os demais VCS's. Não é o objetivo desse artigo e você pode ver isso muito bem explicado [nesse vídeo do Fabio Akita](https://www.youtube.com/watch?v=6Czd1Yetaac).

O importante aqui é você saber que o Git é uma ferramenta que te permite **gerenciar versões do seu código**. 

Isso significa que cada vez que você começa a escrever e informa ao Git que concluiu a modificação no código, ele guarda uma foto do projeto inteiro naquele momento. Isso seria uma *versão* do código.

Se por qualquer motivo você precisa resgatar o estado do projeto em um determinado ponto, você só precisa dizer para o Git qual foto que você deseja e ele recria o projeto inteiro com todos os arquivos exatamente como eles estavam no momento que a foto foi tirada.

Daí você me pergunta "*Beleza, então como eu faço para retirar essas fotos e usá-las quando preciso?*". É aí que vem a segunda parte desse artigo.

## O básico para você começar a usar

Eu disse que essa seção eu falaria do básico mas não falei 100% a verdade.

Eu não vou te explicar como instalar o Git pois esse passo já está cheio de tutoriais na Internet, [inclusive no site oficial da ferramenta](https://git-scm.com/downloads).

### Iniciando o Git

Uma vez instalado o primeiro passo é você informar ao Git que você quer começar a versionar o seu projeto. Para isso você deve entrar na pasta do projeto e dentro dele digitar o comando `git init`.

**Exemplo:**

```bash
$ cd projeto-garotão 

$ git init
Initialized empty Git repository in /Users/brunoviana/htdocs/projeto-garotão/.git/
```

Isso vai criar uma pasta `.git` na raíz do projeto. Como o nome do diretório começa com ponto ele ficará naturalmente oculto, mas se executar `ls -1a` para exibir os arquivos em lista incluindo os ocultos você consegue vê-lo.

```bash
$ ls -1a
.
..
.git
```

Nesse diretório fica todo o controle do projeto, isso significa que se você copiar e colar em outro diretório, ou até mesmo em outro computador, você tem acesso ao histórico do projeto inteiro.

### Estados dos arquivos e sessões

Enquanto você trabalha no projeto o Git define diferentes estados aos arquivos para controlá-los. Entender isso é essencial pois é através desses estados que o Git vai te informar o que está acontecendo no projeto enquanto você modifica.

#### Sessões

Mas antes de falar dos estados eu vou explicar as sessões, que são áreas onde o Git distribui os arquivos dependento do estado que ele tem. Existem 3 sessões principais:

* **Working Tree**:<br />
Essa área é simplesmente a sua área de trabalho onde estão os arquivos que você quer...<br /><br />
*...wait for it*<br /><br />
...trabalhar.  <br /><br />
Ou seja, aqui estão todos os arquivos do projeto com a foto que você disse ao Git que quer ver. Isso significa que toda vida que você manda o Git recuperar uma foto ele vai mudar todo o Working Tree para como os arquivos estavam no momento que a foto foi tirada.<br /><br />
Obviamente se o seu projeto é novo você terá nenhum arquivo e não estará trabalhando em cima de nenhuma foto;<br />
* **Staging Area**:<br />
Nessa área o Git guarda todos os arquivos candidatos a serem guardados na próxima foto.<br /><br />
Isso te da liberdade de escolher o que quer guardar para ter uma organização melhor da linha do tempo de modificações.<br /><br />
Em outras palavras, se você trabalhou em uma correção de um bug que modificou 2 arquivos e depois você modificou um terceiro arquivo para corrigir outro bug, você pode eleger os 2 primeiros arquivos para serem guardados na foto que você vai tirar agora e, posteriormente, você tira outra foto com apenas o terceiro arquivo modificado.<br /><br />
Isso te da a oportunidade de no futuro entender por que cada arquivo modificado e até voltar naquela modificação específica caso você perceba que aquele código não resolveu o bug como você esperava.
* **Diretório .git**:<br />
Sim, essa sessão é exatamente o diretório que mostrei anteriormente.<br /><br />
O que acontece aqui é que uma vez que você confirmou para o Git que queria guardar as modificações que estavam em Staging Area ele finalmente bateu a foto do projeto inteiro com essas modificações adicionadas e guardou dentro do seu banco de dados interno.

#### Estados

Uma vez que você começa a trabalhar o Git vai definindo estados aos arquivos.

Vou usar o meu projeto de exemplo para poder explicar. Antes de começar eu vou usar o comando `git status` para me dar uma visão geral de como estão os meus arquivos.

```bash
$ git status   

On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```
Basicamento o Git me disse, na linha 5, que não tem nenhuma foto batida (que ele chama de commits) e que não tenho nenhum arquivo modificado. Vamos começar a modificar para ver o que ele vai dizer.

Por enquanto ignora as demais informações que elas farão sentido mais pra frente.

```bash
$ echo 'versão 1' > teste.txt

$ git status

On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	teste.txt

nothing added to commit but untracked files present (use "git add" to track)
```
Na linha 9 o Git lista todos os arquivos que estão "Untracked" e me diz, bem ali na linha 12, que o meu arquivo `teste.txt` é um deles.

Arquivos **Untracked** são todos os arquivos que você modificou mas ainda não foram eleitos a serem gravados na próxima foto. Para fazer isso use o comando `git add nome-do-arquivo`.

```bash
$ git add teste.txt

$ git status       

On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   teste.txt

```

Agora o Git está me informando que o arquivo `teste.txt` possui modificações prontas para irem na próxima foto. Agora o seu estado é **Staged**, ou seja, este arquivo esta na **Staging Area** que eu falei mais acima.

Agora eu estou satisfeito com as modificações que fiz e finalmente vou bater a foto do projeto. O Git chama essa foto de **Commit** e usamos o comando `git commit -m 'mensagem do commit'`.

```bash
$ git commit -m "criado teste.txt com versao 1"

[master (root-commit) b13ed54] criado teste.txt com versao 1
 1 file changed, 1 insertion(+)
 create mode 100644 teste.txt
```

Preste atenção na mensagem que passei no commit. Ela deve ser uma mensagem curta que informe de maneira clara o que você fez naquele commit.

Isso é extremamente importante pois quando você precisar ver o que foi feito para voltar para algum commit, você entender exatamente o contexto das modificações que tem lá.

Usando o comando `git log` a gente tem acesso a todos os commits feitos até aqui.

```bash
$ git log

commit b13ed54d3b9f92d7d4e5e0dc98e0d57798655c21 (HEAD -> master)
Author: Bruno Viana <brunoviana@gmail.com>
Date:   Thu Apr 16 10:30:13 2020 -0300

    criado teste.txt com versao 1
(END)
```

Vamos olhar o status do nosso projeto novamente para ver como ele ficou.

```bash
$ git status

On branch master
nothing to commit, working tree clean
```

Agora eu decidi fazer uma segunda modificação. Vamos ver como vai ficar o status do projeto novamente.

```bash
$ git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   teste.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

Ótimo. 

Podemos ver que meu arquivo possui um novo estado chamado de **Modified**, isso significa que ele já existe no último commit, porém ele não é mais ou mesmo pois sofreu alterações.

Isso significa que eu preciso usar o `git add` novamente para as alterações irem no próximo commit.

```bash
$ git add teste.txt

$ git commit -m "modifiquei arquivo teste.txt"

[master b49edc5] modifiquei arquivo teste.txt
 1 file changed, 1 insertion(+), 1 deletion(-)
```

Se eu rodar `git log` de novo verei que tem um novo commit.

```bash
$ git log

commit b49edc52ed20107b673ca9eae008527ef61c8091 (HEAD -> master)
Author: Bruno Viana <brunoviana@gmail.com>
Date:   Thu Apr 16 10:45:27 2020 -0300

    modifiquei arquivo teste.txt

commit b13ed54d3b9f92d7d4e5e0dc98e0d57798655c21
Author: Bruno Viana <brunoviana@gmail.com>
Date:   Thu Apr 16 10:30:13 2020 -0300

    criado teste.txt com versao 1
(END)
```