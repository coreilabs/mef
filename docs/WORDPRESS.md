# Conversão para WordPress

## Arquivos do tema

| Protótipo | Tema clássico |
| --- | --- |
| `index.html` | `front-page.php` |
| `blog.html` | `home.php` |
| `post.html` e variantes | Um único `single.php` |
| Páginas de categoria | Um único `category.php` |
| Páginas de tag | Um único `tag.php` |
| `busca.html` | `search.php` |
| `pagina.html` e documentos institucionais | `page.php` |
| `404.html` | `404.php` |
| Cabeçalho compartilhado | `header.php` |
| Rodapé compartilhado | `footer.php` |
| Cards de artigos | `template-parts/content-card.php` |
| Arquivos genéricos | `archive.php` e `index.php` como fallback |

Acrescentar `style.css` com identificação do tema, `functions.php`, imagem de apresentação e, se adequado, `theme.json` para alinhar as opções do editor de blocos à identidade visual.

## Conteúdo dinâmico

1. Definir uma página inicial estática e uma página de posts em Configurações → Leitura.
2. Na inicial, substituir os três cards demonstrativos por `WP_Query` de três posts publicados, ordenados por data decrescente; não deixar posts fixos alterarem a ordem. Após o loop, restaurar os dados com `wp_reset_postdata()`.
3. Em blog, categorias, tags e busca, usar a consulta principal do WordPress com a paginação nativa, preservando os filtros e os termos de busca nas URLs.
4. Imagem destacada, título, resumo, data, autor, categorias e tags vêm das funções do WordPress, com escaping apropriado ao contexto. Artigos usam `the_content()` com suporte ao editor de blocos.
5. Relacionados: consultar posts da mesma categoria excluindo o post atual, com fallback para recentes quando necessário.
6. Trocar todos os links `.html` por permalinks e URLs de taxonomias. Usar `home_url()` para âncoras da inicial quando o visitante estiver em páginas internas.
7. Remover `posts.js` e o código de listagem/busca do `main.js` depois de migrar as consultas. Manter as interações de menu; o FAQ já é nativo.
8. Preparar o estado vazio de blog, categoria e tag, além de resultados de busca inexistentes. O modelo visual está disponível em `.empty-state`.

## Edição da landing

Transformar as seções da inicial em partes de template e disponibilizar campos para títulos, descrições, imagens, perguntas frequentes e botões. Manter telefone, WhatsApp, e-mail e horário em uma configuração central. Decidir na integração entre blocos personalizados/padrões do editor ou campos estruturados, conforme a experiência desejada para a equipe.

Menus, logo e imagem destacada devem usar os recursos nativos. Carregar CSS/JS com `wp_enqueue_style`/`wp_enqueue_script`, usando versão dos arquivos para atualização de cache. Incluir `wp_head()`, `wp_footer()`, `wp_body_open()`, `body_class()` e suporte a `title-tag`.

## Antes de publicar

- Substituir os oito exemplos por artigos reais aprovados e revisar imagens, dados institucionais e documentos de privacidade.
- Preservar URLs existentes ou planejar redirecionamentos permanentes quando mudarem.
- Configurar metadados e canonical para o domínio definitivo; remover `noindex` somente quando apropriado.
- Garantir HTTP 404 em URLs inexistentes e testar busca, paginação e arquivos sem posts com dados reais.
- Validar editor de blocos, imagens responsivas, navegação por teclado e telas pequenas com o tema integrado.
- Introduzir consentimento e políticas correspondentes se a versão final adicionar ferramentas que o exijam.

Referência: https://developer.wordpress.org/themes/classic-themes/basics/template-hierarchy/
