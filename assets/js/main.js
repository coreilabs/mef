/* Interações progressivas. O conteúdo principal já existe no HTML. */
(() => {
  "use strict";
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#menu-principal");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("is-open", open);
  };
  toggle?.addEventListener("click", () =>
    setMenu(toggle.getAttribute("aria-expanded") !== "true"),
  );
  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle?.getAttribute("aria-expanded") === "true"
    ) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (toggle && !event.target.closest(".site-header")) setMenu(false);
  });
  window
    .matchMedia("(min-width: 801px)")
    .addEventListener("change", () => setMenu(false));

  const listing = document.querySelector("[data-listing]");
  if (!listing) return;
  const posts = window.RENOVA_POSTS || [];
  const params = new URLSearchParams(window.location.search);
  const kind = listing.dataset.listing;
  const value = listing.dataset.value;
  const query = (params.get("s") || "").trim().slice(0, 150);
  const normalize = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("pt-BR");
  const escape = (text) =>
    String(text).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  let results = posts;
  if (kind === "category")
    results = posts.filter((post) => post.category === value);
  if (kind === "tag")
    results = posts.filter((post) => post.tags.includes(value));
  if (kind === "search") {
    const input = listing.querySelector('[name="s"]');
    input.value = query;
    if (!query) return;
    document.querySelector("#listing-title").textContent =
      `Resultados para “${query}”`;
    document.title = `Busca: ${query} | Renova Vida`;
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    results = posts.filter((post) => {
      const haystack = normalize(
        [
          post.title,
          post.excerpt,
          post.categoryLabel,
          ...post.tags,
          ...post.sections.flat(),
        ].join(" "),
      );
      return terms.every((term) => haystack.includes(term));
    });
  }
  const size = 6;
  const pages = Math.max(1, Math.ceil(results.length / size));
  const requested = Number(params.get("pagina"));
  const page =
    Number.isSafeInteger(requested) && requested > 0
      ? Math.min(requested, pages)
      : 1;
  const first = (page - 1) * size;
  const grid = document.querySelector("#post-results");
  const count = document.querySelector("#result-count");
  count.textContent = results.length
    ? `${results.length} ${results.length === 1 ? "artigo encontrado" : "artigos encontrados"} · Exibindo ${first + 1}–${Math.min(first + size, results.length)}`
    : "Nenhum artigo encontrado";
  if (!results.length) {
    grid.className = "";
    grid.innerHTML =
      '<div class="empty-state"><span class="eyebrow">Vamos tentar de outro jeito?</span><h2>Nenhuma leitura por aqui, ainda.</h2><p>Tente uma palavra diferente ou explore todos os conteúdos do nosso blog.</p><a class="button outline" href="blog.html">Ver todos os artigos <span aria-hidden="true">↗</span></a></div>';
    return;
  }
  grid.className = "post-grid";
  grid.innerHTML = results
    .slice(first, first + size)
    .map(
      (post) => `
    <article class="post-card">
      <a class="post-image" href="${escape(post.url)}" tabindex="-1" aria-hidden="true"><img src="assets/images/${escape(post.image)}.jpg" alt="" loading="lazy" width="600" height="400"></a>
      <div class="post-meta"><a class="post-category" href="${escape(post.categoryUrl)}">${escape(post.categoryLabel)}</a><time datetime="${escape(post.date)}">${escape(post.label)}</time></div>
      <h3><a href="${escape(post.url)}">${escape(post.title)}</a></h3><p>${escape(post.excerpt)}</p>
      <a class="text-link" href="${escape(post.url)}" aria-label="Ler artigo: ${escape(post.title)}">Ler artigo <span class="arrow" aria-hidden="true">↗</span></a>
    </article>`,
    )
    .join("");
  const pagination = document.querySelector("#pagination");
  if (pages > 1) {
    pagination.innerHTML = Array.from({ length: pages }, (_, index) => {
      const number = index + 1;
      const url = new URL(window.location.href);
      url.searchParams.set("pagina", number);
      url.hash = "post-results";
      return `<a href="${escape(url.pathname.split("/").pop() + url.search + url.hash)}" aria-label="Página ${number}" ${number === page ? 'aria-current="page"' : ""}>${number}</a>`;
    }).join("");
  }
})();
