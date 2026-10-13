(() => {
  'use strict';
  const data = window.G_IDIOMALIGN;
  if (!data) return;
  const get = id => document.getElementById(id);
  const datasetURL = 'https://github.com/NLP2CT/G-IdiomAlign/blob/main/Gloss_pivoted_Original/';
  const number = new Intl.NumberFormat('en-US');

  document.querySelectorAll('[data-example]').forEach(button => {
    button.addEventListener('click', () => {
      const example = data.examples[Number(button.dataset.example)];
      get('source-language').textContent = example.languages[0].toUpperCase();
      get('target-language').textContent = example.languages[1].toUpperCase();
      get('source-idiom').textContent = example.source_idiom;
      get('source-idiom').lang = example.codes[0];
      get('target-idiom').textContent = example.target_idiom;
      get('target-idiom').lang = example.codes[1];
      get('source-gloss').textContent = example.source_meaning;
      get('target-gloss').textContent = example.target_meaning;
      get('example-source').href = datasetURL + example.file;
      document.querySelectorAll('[data-example]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
  });

  const pairButtons = document.querySelectorAll('[data-pair]');
  pairButtons.forEach(button => {
    button.addEventListener('click', () => {
      const pair = data.coverage.find(item => item.key === button.dataset.pair);
      get('pair-name').textContent = pair.codes.map(code => data.languages[code]).join(' ↔ ');
      get('pair-count').textContent = number.format(pair.count);
      get('pair-share').textContent = (pair.count / 18785 * 100).toFixed(2) + '%';
      get('pair-link').href = datasetURL + pair.file;
      pairButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
  });

  const answers = {
    A: 'Correct. “Wide of the mark” is the reference equivalent: far from what is required or accurate.',
    B: 'Contextual association (CA). “Hit the nail on the head” means being exactly right, reversing the source meaning. The reference is A.',
    C: 'Lexical cue (LC). “Measure twice, cut once” shares measurement imagery but means planning carefully before acting. The reference is A.',
    D: 'Literal translation (LT). This preserves the measurement words but misses the figurative meaning. The reference is A.'
  };
  const quizButtons = document.querySelectorAll('[data-answer]');
  quizButtons.forEach(button => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      quizButtons.forEach(item => {
        item.classList.toggle('correct', item.dataset.answer === 'A');
        item.classList.toggle('incorrect', item === button && item.dataset.answer !== 'A');
        item.setAttribute('aria-pressed', String(item === button));
      });
      const correct = button.dataset.answer === 'A';
      get('quiz-feedback').textContent = answers[button.dataset.answer];
      get('quiz-feedback').className = 'quiz-feedback ' + (correct ? 'correct' : 'incorrect');
    });
  });

  get('metric-select').addEventListener('change', event => {
    const index = event.target.value === 'a70' ? 1 : 2;
    document.querySelectorAll('.model-row').forEach((row, modelIndex) => {
      const model = data.models[modelIndex];
      row.querySelectorAll('.score-row').forEach((scoreRow, conditionIndex) => {
        const value = (conditionIndex ? model.withGloss : model.no)[index];
        scoreRow.querySelector('.score-fill').style.width = (value / 60 * 100) + '%';
        scoreRow.querySelector(':scope > span').textContent = value.toFixed(2);
        scoreRow.setAttribute('aria-label', (conditionIndex ? 'With-gloss' : 'No-gloss') + ': ' + value.toFixed(2) + '%');
      });
    });
    get('chart-live').textContent = 'Showing ' + (index === 1 ? 'Acc@0.70' : 'Acc@0.80') + ' for all seven configurations. The horizontal scale remains 0 to 60 percent.';
  });

  get('copy-citation').addEventListener('click', async () => {
    const citation = get('bibtex').textContent;
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(citation);
        copied = true;
      }
    } catch (_) { /* Fall back for local files or denied clipboard permission. */ }
    if (!copied) {
      const textarea = document.createElement('textarea');
      textarea.value = citation;
      textarea.setAttribute('readonly', '');
      textarea.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.appendChild(textarea);
      textarea.select();
      try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
      textarea.remove();
      get('copy-citation').focus({ preventScroll: true });
    }
    get('copy-citation').querySelector('.copy-label').textContent = copied ? 'Copied!' : 'Copy citation';
    get('copy-status').textContent = copied ? 'BibTeX copied to clipboard.' : 'Copy unavailable. Select the citation text or download the BibTeX file.';
  });

  const dialog = get('figure-dialog');
  let figureOpener;
  document.querySelectorAll('[data-figure]').forEach(button => {
    button.addEventListener('click', () => {
      figureOpener = button;
      get('dialog-image').src = button.dataset.figure;
      get('dialog-image').alt = button.querySelector('img').alt;
      dialog.showModal();
      document.body.classList.add('dialog-open');
    });
  });
  get('close-figure').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    if (figureOpener) figureOpener.focus({ preventScroll: true });
  });
})();
