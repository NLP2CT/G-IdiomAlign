# Field Definitions

## Multiple-Choice Idiom Equivalence

Each record represents a multiple-choice item where the model selects the correct target-language idiom matching the figurative meaning of the source idiom.

- `instruction`: The task instruction provided to the model.
- `source_idiom`: The idiom in the source language.
- `source_language`: The source language.
- `target_language`: The target language.
- `target_idiom`: The correct idiom in the target language.
- `target_meaning`: The meaning of the target idiom.
- `options_detail`: A dictionary of multiple-choice options (e.g., A–E).
- `correct_option`: The correct answer label after shuffling.
- `correct_position`: The position index of the correct answer in the shuffled options.
- `original_positions`: Mapping from shuffled options to their original order before shuffling.

---

## Additional Language Pairs

Each record represents a cross-lingual idiom alignment pair with semantic descriptions.

- `source_idiom`: The idiom in the source language.
- `target_idiom`: The idiom in the target language that shares the same figurative meaning.
- `source_meaning`: A short gloss describing the meaning of the source idiom.
- `target_meaning`: A natural language description of the target idiom's meaning and usage.

---

## Gloss Pivoted Original

Each record represents a gloss-pivoted idiom alignment pair used as the original data source.

- `source_idiom`: The idiom in the source language.
- `target_idiom`: The idiom in the target language that shares the same figurative meaning.
- `source_meaning`: A short gloss describing the meaning of the source idiom.
- `target_meaning`: A natural language description of the target idiom's meaning and usage.
