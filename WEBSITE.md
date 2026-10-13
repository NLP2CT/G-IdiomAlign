# Paper website

The project website is designed for https://nlp2ct.github.io/G-IdiomAlign/.
All website files are stored in this repository under `docs/`.

## Publishing

In repository **Settings → Pages**, select **Deploy from a branch**, then
choose the **main** branch and **/docs** folder. Save the settings.
Enabling Pages requires a repository administrator or a role with permission
to manage Pages. After setup, commits to `main` automatically update the site.

## Editing

- `docs/index.html`: page text, authors, links, static result tables and citation.
- `docs/styles.css`: colors, typography and responsive layouts.
- `docs/data.js`: released examples, language-pair counts and chart values.
- `docs/script.js`: example selection, coverage explorer, quiz, charts and citation copying.
- `docs/assets/`: paper PDF, original Figure 1, local font, BibTeX and social preview.

No package installation or build step is required. Open `docs/index.html`
directly to preview the site locally. If changing result values or examples,
keep the static HTML and `data.js` consistent. Keep the displayed citation and
`assets/g-idiomalign.bib` consistent as well.

You can edit these files on GitHub or in a local clone. GitHub edits do not
automatically update a local clone: run `git pull --ff-only` before editing
locally. Commit and push local changes to publish them after Pages is enabled.

The page reports the paper's core benchmark (18,785 alignments, 9 languages,
36 unordered pairs), not the combined record count across all release subsets.
Generation scores follow Table 4 and are explicitly labeled as semantic proxies.
