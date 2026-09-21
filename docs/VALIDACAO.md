# Validação do protótipo

Realizada em 21/09/2026 com Chromium por Playwright CLI e servidor HTTP local.

- 23 páginas verificadas em larguras de 320, 390, 768 e 1440 px. Os problemas encontrados em 320 px no cabeçalho e na grade de benefícios foram corrigidos e verificados novamente.
- Uma única marcação `h1` por página.
- 1.131 referências locais verificadas: arquivos e âncoras existentes.
- Sintaxe dos dois arquivos JavaScript verificada com `node --check`.
- 18 verificações de comportamento aprovadas: abertura/fechamento do menu mobile, Escape, expansão/recolhimento do FAQ, duas páginas de posts, filtros de categoria/tag, envio de busca, equivalência de acentos e caixa, ausência de resultados, entrada HTML tratada como texto, página inválida, abertura de artigo, navegação por tags, retorno pela 404 e carregamento das imagens.
- Sem erros de JavaScript nos fluxos verificados.
- Capturas desktop e mobile disponíveis em `output/playwright/` no projeto de desenvolvimento.

Não foram enviados contatos externos nem efetuada publicação. A integração WordPress e o comportamento do servidor de produção estão fora desta etapa. A revisão de responsividade não substitui uma auditoria completa de acessibilidade.
