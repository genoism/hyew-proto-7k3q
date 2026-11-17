# WordPress plan — Have You Ever Wondered

A plugin-free custom theme. All of this uses core WordPress APIs only: custom post types, a shared taxonomy, term meta, `pre_get_posts`, a theme admin page, and an optional WP-CLI command. No SearchWP, Relevanssi, WP All Import, ACF, or other plugins.

Recommended hosting: WordPress.com (Personal plan or higher). Per WordPress.com's own theme-upload guide (reviewed Oct 2026), custom theme upload, SFTP, SSH and WP-CLI are available starting at the Personal plan, and the official WordPress.com connector allows direct management. Self-hosted WordPress (DreamHost, IONOS, etc.) also works, using core's REST API with an Application Password.

## Content model

Two custom post types, registered in `functions.php`:

- `qa` — one post per question. Post title = the question. Post content = the answer. Public, has an archive, `show_in_rest` true, `exclude_from_search` false. Permalinks such as `/questions/does-bottled-water-need-a-hechsher/`.
- `parsha_sheet` — one post per weekly HYEW paper. Title = the paper’s question-title. Content = the body of the paper. Post meta (registered with `register_post_meta`): `issue_number`, `parsha`, `hebrew_year`, `week_of`, `sponsor_line`. Public, has an archive, searchable. Permalinks such as `/papers/why-we-wait-six-hours/`.

One shared flat taxonomy, `topic`, attached to both post types:

- `hierarchical => false`. A single flat list. A Q&A or a paper may have one or more topics.
- Hebrew name stored as term meta, key `hebrew_name`, via `register_term_meta`. Add a “Hebrew name” field on the term edit screen with the core hooks `topic_add_form_fields`, `topic_edit_form_fields`, `created_topic`, and `edited_topic`. No ACF.
- Term slug is the English name (`shabbos`, `kashrus`). Archive at `/topics/shabbos/`.

The homepage featured paper is the latest `parsha_sheet`, or a theme-mod override so a specific issue can be pinned.

## Search (core only)

Native WordPress search already looks through title and content. Set `exclude_from_search => false` on both post types so they are included.

In `pre_get_posts`, when `is_search()` and the main query:

- Limit `post_type` to `qa` and `parsha_sheet` (do not return ordinary posts or pages in this search).
- Optionally also match topic names by finding terms in `topic` whose name or Hebrew meta contains the query, then adding a `tax_query` with an `OR` relation against the keyword search. This can be done with a `posts_clauses` or a two-step query; keep it simple and documented in the theme.

Do not try to replace the main search with a plugin index. Native search is literal word matching, not fuzzy. That is acceptable for this site if questions and paper bodies are stored as post content (so the words are actually in the database).

Grouped results live in `search.php`. Ignore or replace the main loop and run two `WP_Query` calls with the same `s` parameter, one for `qa` and one for `parsha_sheet`. Render two labeled sections: “Questions & Answers” and “Parsha Sheets.” Highlighting can be a small bit of theme PHP/CSS, not a plugin.

## CSV import (inside the theme, one-time)

The Q&A spreadsheet columns are `question,answer,topic1,topic2,topic3`. A topic column may be empty. The file `sample-qa.csv` in this prototype is a stand-in and will be replaced with the real sheet.

Add a Tools admin page (`add_management_page`) in the theme: upload a CSV, verify a nonce, parse with `fgetcsv`, and for each row:

1. Find or create each named topic term (`term_exists` / `wp_insert_term`). Hebrew names can be filled in later on the term edit screen, or from a second column if the real sheet includes them.
2. Insert a `qa` post (`wp_insert_post`) with the question as title and the answer as content.
3. Assign all present topic terms with `wp_set_object_terms`.
4. Skip or update a row if a `qa` with the same title already exists, and report a count of created / skipped / failed rows.

Also register a WP-CLI command when `WP_CLI` is defined, for example:

    wp hyew import-qa /path/to/questions.csv

Same logic as the admin page, no browser required. This is a one-time (or occasional) importer, not a standing plugin.

## Parsha sheets from Word documents

Each weekly paper will later arrive as a Word document and become one `parsha_sheet` post. Still no plugins (no Mammoth or similar).

Practical plugin-free path:

1. Convert each `.docx` outside WordPress — paste into the block editor (usually good enough), or convert with a local tool such as pandoc to HTML, then import.
2. Optional: a second theme WP-CLI command, `wp hyew import-sheet`, that takes an HTML or Markdown file plus flags for `--title`, `--parsha`, `--number`, and `--topics`, and creates the post with meta and term assignment.

Store the full paper body as post content so homepage excerpts, the single-paper template, and native search all read from the same place.

## Theme templates (map from this prototype)

- `front-page.php` — topic grid (all `topic` terms, English name + `hebrew_name` meta) and the featured `parsha_sheet`. Layout options (search in the header vs. below; paper in a rail vs. below) can be theme-mod settings if you want to keep the choice; otherwise pick one after review.
- `taxonomy-topic.php` — that topic’s Q&As and papers, in the same two labeled groups.
- `single-qa.php` — question, answer, and clickable topic chips (term links).
- `single-parsha_sheet.php` — see “Parsha sheets: taxonomy, archive, single, sharing” below.
- `search.php` — grouped results, as above.
- `archive-qa.php` / `archive-parsha_sheet.php` if useful.
- Static pages for About, Haskamos, Ask a Question, Donate, Subscribe, Sponsor — ordinary WordPress Pages with page templates as needed. The ask form can start as a simple `mailto:` or a theme `admin-post.php` handler; a full ticketing flow is later work.
- `header.php` / `footer.php` — full “Have You Ever Wondered” wordmark, search form (`get_search_form`), nav, mobile menu.


## Parsha sheets: taxonomy, archive, single, sharing (prototype v3)

- **`parsha` taxonomy** on `parsha_sheet`, `hierarchical => true`: five parent terms (the chumashim: Bereishis, Shemos, Vayikra, Bamidbar, Devarim) with the 54 parshiyos as children, in order. Term meta: `hebrew_name` and `menu_order` (for correct sequence). A sheet gets exactly one parsha term; a parsha can hold many sheets across years. `hebrew_year` stays post meta. Seeded once by the theme on activation (`after_switch_theme`) with `wp_insert_term`. Combined parshiyos are simply two separate terms.
- **Archive page** (`archive-parsha_sheet.php`, `/parsha-sheets/`): loops the five parent terms and their children (`get_terms` with `parent`, ordered by `menu_order` meta). A parsha with no sheets (`count === 0`) is still listed, styled muted.
- **`taxonomy-parsha.php`** (`/parsha/lech-lecha/`): all sheets on that parsha, newest first, with previous/next parsha links.
- **`single-parsha_sheet.php`** (`/papers/<slug>/`): masthead, title, full body with footnotes and bottom line, topic chips (`get_the_terms( …, 'topic' )`), parsha + date meta, `previous_post_link` / `next_post_link`, and a “More on Parshas X” `WP_Query` on the same parsha term excluding the current post. The homepage featured sheet, past weeks, search results and topic archives all link to this permalink (no modal).
- **Share links, no plugin:** plain links built in the template with `rawurlencode( get_permalink() )`: WhatsApp (`https://wa.me/?text=`), email (`mailto:?subject=&body=`), print (`window.print()`), plus a ~30-line theme JS for Copy link (Clipboard API with a fallback) and the Web Share API (`navigator.share`) when the browser supports it. No third-party scripts or tracking.
- **Print stylesheet** in the theme so a sheet prints as the single paper.

## Glossary of transliterated terms (no plugin)

- Storage: a `glossary_term` custom post type (title = canonical term; meta `variants` (one per line), `hebrew`, and the content or excerpt = the short definition), or, for a smaller setup, one JSON theme option. The prototype’s `glossary.csv` (term, variants, hebrew, definition) can be imported with the same theme CSV tool used for Q&As.
- Output: the theme prints the terms as one small cached JS object (`wp_add_inline_script` or a transient-cached `glossary.js`), and `glossary-ui.js` does the matching in the browser, on content areas only (`.gl-scope`: sheet body, Q&A question and answer, homepage excerpt). Nothing is written into post content, so the glossary can change without touching posts.
- Matching rules (same as `js/glossary-ui.js`): exact variant match first (case-insensitive; straight/curly apostrophes and hyphens ignored), longest phrase first. Then a normalized key: kh→ch, doubled letters collapsed, ai/ay→ei, a final h after a vowel dropped, and a final t→s (-os/-ot, -is/-it). Then a vowel-dropped key for words longer than 4 letters (inner a/e removed). Fuzzy matches need every word to be at least 4 letters after normalization and not on the English stoplist; a `never` list blocks a word entirely. Only the first occurrence per paragraph is marked (configurable: paragraph, whole section, or every occurrence).

## What this theme will not do

It will not install or depend on plugins. If native search later proves too weak, that is a separate conversation; the first build stays on core `WP_Query`.
