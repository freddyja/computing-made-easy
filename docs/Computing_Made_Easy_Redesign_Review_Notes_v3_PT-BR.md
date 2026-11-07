# Computing Made Easy — Notas de revisão v3

**Data:** 7 de novembro de 2026  
**Substitui** as notas v2 e o arquivo `Computing_Made_Easy_Redesign_v2.zip`.  
**Não foi publicado.** Não há demonstração pública nem mudança de DNS, e-mail, hospedagem ou WordPress.

## Cor

Azul da Força Aérea `#00308F` no cabeçalho, na página inicial e nas aberturas de serviço. Ouro `#FFCD00` em botões e destaques sobre azul, com texto azul escuro no botão. Ouro claro não é texto sobre branco. Em fundo claro, os links usam ouro escuro `#6B4F00`. O fundo de apoio é gelo `#E4ECF7`. O branco fica na base da bandeira, no retrato e nos campos do formulário.

A bandeira dos Estados Unidos não foi recolorida: continua vermelho `#B22234`, branco e azul `#3C3B6E`, com 13 faixas e 50 estrelas. Não há um emblema militar novo.

## App Center, página própria

Uma única aba no menu do desktop e no menu móvel leva a `/app-center` (em português, `/pt-br/app-center`). O rodapé e as páginas de início, serviços e contato não incluem o diretório nem links para esses apps. O parágrafo proposto de IA não cita mais as ferramentas do diretório. Continua sem calendário de aulas e sem preço.

A página `/app-center` conserva os 32 links e os textos originais. Tem um retorno para a Computing Made Easy e a troca de idioma. Os apps filhos do domínio não são apagados nem movidos.

## Verificações

`npx vitest run`: 13 testes aprovados. `npx eslint .`: sem erros. `npx next build`: aprovado. Num servidor local de produção, a página inicial tem um único link para o App Center, dentro do cabeçalho.
