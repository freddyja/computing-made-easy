# Computing Made Easy — Notas de revisão v3

**Data:** 7 de novembro de 2026  
**Substitui** as notas v2 e o arquivo v2.  
**Não foi publicado.** Não há demonstração pública nem mudança de DNS, e-mail ou hospedagem.

A guia de design do Bridge foi aplicada sobre o v3 que já existia. O site branco da v2 não foi refeito.

O azul da marca é `#003B71` e o do cabeçalho `#002B52`. O ouro é `#D4AF37`, com texto tinta `#0B1F3A` nos botões. Ouro claro não é texto sobre branco. O hero é uma faixa azul sólida: no desktop, bandeira, texto e retrato; no celular, primeiro o nome, depois a bandeira, as qualificações curtas e os botões, e por último o retrato.

O retrato diz **Imagem provisória — confirmar semelhança**. O nome continua **Freddy Jara-Almonte**. As qualificações confirmadas não mudam. O telefone continua 407-925-2589.

O App Center só abre pela aba do menu, também no celular. Não está no rodapé nem dentro das páginas de início, serviços ou contato. `/pt-br/app-center` conserva os 32 links.

Verificações desta etapa: `npx vitest run` 13 aprovados, `npx tsc --noEmit` aprovado, `npx eslint .` sem erros. `npx next build` aprovado.
