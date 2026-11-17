import sys, json, csv, re
sys.path.insert(0, 'tools')
from glossary_src import G, NEVER
def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower().replace("'", "")).strip('-')
entries = [{"id": slug(t), "term": t, "variants": v, "he": h, "def": d} for t, v, h, d in G]
js = """/* HYEW glossary — transliterated Hebrew/Aramaic terms used in English text.
 * GENERATED from tools/glossary_src.py (also writes glossary.csv). In WordPress
 * this file would be printed by the theme from a `glossary_term` CPT (or a JSON
 * option) — see WORDPRESS-PLAN.md. Matching rules are documented in
 * js/glossary-ui.js. Definitions are short, standard, plain-English glosses.
 */
window.HYEW = window.HYEW || {};
HYEW.glossaryConfig = {
  /* "block": underline only the first occurrence of a term per paragraph/list item
     "scope": only the first occurrence per content area (e.g. the whole sheet)
     "all":   every occurrence */
  once: "block",
  fuzzy: true,          /* allow normalized (spelling-flexible) matches */
  minFuzzyLength: 4,    /* each word must be >= 4 chars after normalization to fuzzy-match */
  /* Never underline these words, even if a variant or a fuzzy key matches. */
  never: %s,
  /* Common English words that must never be fuzzy-matched. */
  stoplist: ["bar","that","shot","beat","sit","bat","bet","set","mat","bit","sat","shut","her","here","heat","bread","bride","brush","brooch","brash","mitts","mist","matter","shiver","sheet","shout","state","kill","lever","levy","china","chime","maser","shine","shiny","brisk","brit","ravs","ever","even","other","about","above","after","again","alive","along","these","those","there","their","where","which","while","shall","still","safe","sake","rush","rasher","berate","border","boredom","later","litter","libel","liver","lather","heater","hater","hither","mitten","tariff","tariffs","hatter","hatters","issuer","issuers","lining","linings","messer","masser","preve","acheron","brays","berries","baris","barit","britt","brist","shekel","prove","barrier","bearer","briar","brier"],
  maxPhraseWords: 6
};
HYEW.glossaryTerms = %s;
""" % (json.dumps(NEVER), json.dumps(entries, ensure_ascii=False, indent=1))
open('js/glossary.js', 'w').write(js)
with open('glossary.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f); w.writerow(["term", "variants", "hebrew", "definition"])
    for e in entries: w.writerow([e["term"], "; ".join(e["variants"]), e["he"], e["def"]])
print(len(entries))
