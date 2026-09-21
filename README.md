# M&F Renova Vida — protótipo HTML

Landing page e blog responsivos, inspirados no site original e na captura fornecida. HTML, CSS e JavaScript puros, sem instalação de dependências e sem framework em execução.

## Visualização

Abra `index.html` diretamente no navegador. A navegação, busca e paginação usam arquivos locais e parâmetros de URL, sem chamadas a uma API.

Para servir por HTTP no Windows, execute na pasta do projeto:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:8000/`. Com o Apache do Laragon ativo, também pode usar `http://localhost/mef/`.

## Páginas

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Landing completa e três últimas publicações demonstrativas |
| `blog.html` | Oito artigos, seis por página |
| `post.html` e `post-*.html` | Oito exemplos de artigo, com tags e relacionados |
| `categoria.html` | Categoria Família |
| `categoria-acolhimento.html` e `categoria-bem-estar.html` | Demais categorias |
| `tag.html` | Tag Escuta |
| `tag-dialogo.html`, `tag-apoio.html`, `tag-rotina.html` | Demais tags |
| `busca.html?s=familia` | Busca sem distinção de acento ou caixa |
| `busca.html?s=xyz` | Estado sem resultados |
| `pagina.html` | Modelo institucional “Nossa essência” |
| `404.html` | Modelo de página não encontrada |
| `privacidade.html`, `termos.html`, `cookies.html` | Modelos visuais de documentos institucionais |

## Organização

- `assets/css/styles.css`: estilos compartilhados, cores, tipografia e adaptações de tela.
- `assets/js/main.js`: menu mobile, busca e paginação.
- `assets/js/posts.js`: dados demonstrativos usados na busca e listagem.
- `assets/images/`: imagens obtidas do site original, hospedadas localmente neste protótipo.
- `assets/fonts/`: Inter e Cormorant Garamond locais; licenças na mesma pasta.
- `scripts/build.py`: gerador opcional dos HTMLs e de `posts.js`, usando apenas a biblioteca padrão do Python.
- `docs/WORDPRESS.md`: orientações de conversão.
- `output/playwright/`: capturas de validação no navegador.

Para manter consistência entre páginas, altere os textos, modelos e dados em `scripts/build.py` e execute `python scripts/build.py`. O gerador sobrescreve os HTMLs e `posts.js`; não sobrescreve o CSS nem `main.js`. Os arquivos entregues já estão gerados: Python não é necessário para visualizar ou hospedar o resultado.

## Comportamento e limites desta etapa

- Menu mobile com estado acessível, fechamento por Escape e links de navegação; FAQ com `details` e `summary` nativos.
- Links de WhatsApp, telefone e e-mail preservam os contatos do site consultado. Não houve envio de mensagens nem publicação remota.
- Artigos, datas e estimativas de leitura são demonstrativos e estão identificados nas páginas. Substituir por conteúdo revisado na implantação.
- As páginas de privacidade e termos são modelos, não documentos jurídicos definitivos.
- Sem rastreadores, formulários de coleta ou cookies próprios; por isso não há um banner de consentimento fictício.
- As páginas têm `noindex, nofollow` para evitar indexação acidental do protótipo. Remover na implantação após revisar conteúdo e configurar URLs canônicas.
- `404.html` é um layout navegável. A resposta HTTP 404 para URLs inexistentes depende da configuração da hospedagem; na conversão, o WordPress passa a tratá-la.
- O número de WhatsApp e a informação de experiência foram reaproveitados do site original. Conferir os dados institucionais antes de publicar.
- O conteúdo principal é HTML estático. A busca e a paginação desta demonstração precisam de JavaScript; na versão WordPress passam a ser processadas pelo servidor.

O protótipo não é ainda um tema WordPress instalável. A integração PHP, edição no painel, consultas de posts e implantação constituem a próxima etapa.
