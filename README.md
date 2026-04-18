# G-IdiomAlign

This repository is the open-source release package for the G-IdiomAlign, a gloss-pivoted benchmark for evaluating cross-lingual idiom alignment and generation with explicit semantic grounding.

## Abstract

Idioms are difficult to transfer across languages due to their non-compositionality and weak surface-form grounding, making literal mappings unreliable. We present G-IdiomAlign, a gloss-pivoted benchmark where each idiom is anchored by an English gloss from Wiktionary. We further construct a high-confidence reference alignment set for reproducible evaluation. G-IdiomAlign supports two protocols: (1) a controlled Multiple-Choice Idiom Equivalence with typed distractors for error attribution; and (2) a Gloss-Contrastive Generation contrasting No-gloss and With-gloss inputs to isolate the effect of an explicit semantic pivot. Across diverse LLMs, a bias to literal translation is a dominant failure mode, especially when the target is a low-resource language. Glosses consistently improve Gloss-Contrastive Generation under an embedding-based semantic proxy, but performance remains modest, indicating substantial headroom in the open output space. Subsequent analysis on Qwen3-8B further suggests that cross-condition differences concentrated more in attention heads than in layers, while better With-gloss generations coincide with stronger gloss anchoring.

## Directory Structure

```text
G-IdiomAlign/
|- README.md
|- Gloss_pivoted_Original/
|- Multiple-Choice_IdiomEquivalence/
|- Additional_language pairs/
|- schema/
|  |- dataset_schema.json
|  |- field_definitions.md
|- metadata/
   |- dataset_info.json
   |- language_pairs.json
   |- version.json
```

## Data Files

- `Gloss_pivoted_Original/`: The main constrcuted data of G-IdiomAlign, covering nine languages: De, En, Es, Fi, Fr, Ja, Pl, Zh, and Pt, spanning multiple language families and scripts, which enables evaluation under typologically and orthographically diverse conditions.

- `Multiple-Choice_IdiomEquivalence/`: This folder contains the data for Task 1: Multiple-Choice Idiom Equivalence, where the model selects the correct target-language idiom matching the figurative meaning of the source idiom. We construct three types of distractors—Literal Translation Trap (LT), Lexical Cue Trap (LC), and Contextual Association Trap (CA)—to support error analysis. Distractors are generated using Qwen-Max under unified prompts. The dataset covers 30 translation directions and includes shuffled options, correct answers, and their positions for evaluation.

- `Additional_language pairs/`:  We additionally include a small number of extra language pairs to broaden coverage. This extension introduces four new languages: Arabic (Ar), Korean (Ko), Thai (Th), and Vietnamese (Vi). We matches them with both the original benchmark languages and one another using the same gloss-pivoted pipeline. Because coverage remains limited after precision-oriented filtering, we do not include these pairs in the main evaluation; instead, we release them to support future research on broader cross-lingual idiom alignment.

## Schema

Detailed field definitions are provided in:

- `schema/*.json`
- `schema/field_definitions.md`

## Metadata

Dataset-level metadata is provided in:

- `metadata/dataset_info.json`
- `metadata/language_pairs.json`

## Other information

The paper has been accepted by ACL 2026 main.