/* HYEW glossary — transliterated Hebrew/Aramaic terms used in English text.
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
  never: ["bar", "that", "shot", "beat", "sit", "bat", "bet", "set", "mat", "ask", "rabbi", "parsha", "parshas", "shabbos", "shabbat", "torah"],
  /* Common English words that must never be fuzzy-matched. */
  stoplist: ["bar","that","shot","beat","sit","bat","bet","set","mat","bit","sat","shut","her","here","heat","bread","bride","brush","brooch","brash","mitts","mist","matter","shiver","sheet","shout","state","kill","lever","levy","china","chime","maser","shine","shiny","brisk","brit","ravs","ever","even","other","about","above","after","again","alive","along","these","those","there","their","where","which","while","shall","still","safe","sake","rush","rasher","berate","border","boredom","later","litter","libel","liver","lather","heater","hater","hither","mitten","tariff","tariffs","hatter","hatters","issuer","issuers","lining","linings","messer","masser","preve","acheron","brays","berries","baris","barit","britt","brist","shekel","prove","barrier","bearer","briar","brier"],
  maxPhraseWords: 6
};
HYEW.glossaryTerms = [
 {
  "id": "berachah",
  "term": "berachah",
  "variants": [
   "bracha",
   "brocha",
   "brachah",
   "beracha",
   "brochah",
   "brachos",
   "berachos",
   "brochos",
   "brachot"
  ],
  "he": "ברכה",
  "def": "A blessing, recited before or after eating, or before performing a mitzvah."
 },
 {
  "id": "berachah-acharonah",
  "term": "berachah acharonah",
  "variants": [
   "bracha achrona",
   "bracha acharona",
   "brocha achrona",
   "brachah achronah",
   "beracha acharona",
   "bracha achronah",
   "brocha achronah",
   "berachos acharonos",
   "brachos achronos"
  ],
  "he": "ברכה אחרונה",
  "def": "The blessing recited after eating or drinking, such as Al HaMichyah or Borei Nefashos."
 },
 {
  "id": "berachah-rishonah",
  "term": "berachah rishonah",
  "variants": [
   "bracha rishona",
   "brocha rishona",
   "brachah rishonah",
   "beracha rishona"
  ],
  "he": "ברכה ראשונה",
  "def": "The blessing recited before eating or drinking."
 },
 {
  "id": "safek-berachos-lehakel",
  "term": "safek berachos lehakel",
  "variants": [
   "safek berachah lehakel",
   "safek bracha lehakel",
   "safek brachos lehakel",
   "sofek brochos lehakel",
   "safek berachos l'hakel"
  ],
  "he": "ספק ברכות להקל",
  "def": "The principle that when it is doubtful whether a blessing is required, one does not recite it."
 },
 {
  "id": "bein-hashmashos",
  "term": "bein hashmashos",
  "variants": [
   "bein hashemashos",
   "bein hashmashot",
   "bain hashmashos",
   "ben hashmashos",
   "bein hashemashot"
  ],
  "he": "בין השמשות",
  "def": "The twilight period between sunset and nightfall, whose status as day or night is in doubt."
 },
 {
  "id": "melachah",
  "term": "melachah",
  "variants": [
   "melacha",
   "melocho",
   "melachos",
   "melachot",
   "melochos"
  ],
  "he": "מלאכה",
  "def": "One of the thirty-nine categories of creative work forbidden on Shabbos."
 },
 {
  "id": "melachah-sheeinah-tzerichah-legufah",
  "term": "melachah she'einah tzerichah legufah",
  "variants": [
   "melacha sheeina tzricha legufa",
   "melacha she'aina tzericha l'gufa",
   "melachah she'einah tzerichah l'gufah",
   "melocho she'eino tzricho l'gufo"
  ],
  "he": "מלאכה שאינה צריכה לגופה",
  "def": "A forbidden Shabbos act done for a purpose other than the one it served in the Mishkan; authorities disagree whether it is forbidden by the Torah or only rabbinically."
 },
 {
  "id": "chametz-sheavar-alav-hapesach",
  "term": "chametz she'avar alav haPesach",
  "variants": [
   "chometz she'avar alav hapesach",
   "chametz sheavar alav hapesach",
   "chometz sheovar olov hapesach"
  ],
  "he": "חמץ שעבר עליו הפסח",
  "def": "Chametz owned by a Jew during Pesach, which the Sages forbade eating or benefiting from even after Pesach."
 },
 {
  "id": "muktzeh",
  "term": "muktzeh",
  "variants": [
   "muktza",
   "muktzah",
   "muktze"
  ],
  "he": "מוקצה",
  "def": "Items the Sages forbade moving on Shabbos or Yom Tov."
 },
 {
  "id": "kezayis",
  "term": "kezayis",
  "variants": [
   "k'zayis",
   "kezayit",
   "kzayis",
   "k'zayit",
   "kezayis"
  ],
  "he": "כזית",
  "def": "The volume of an olive, the minimum amount of food for many halachos, such as a berachah acharonah."
 },
 {
  "id": "reviis",
  "term": "revi'is",
  "variants": [
   "reviis",
   "revi'it",
   "reviit",
   "reviyis"
  ],
  "he": "רביעית",
  "def": "A liquid measure (a quarter of a log), the minimum amount of wine for Kiddush and of a drink for a berachah acharonah."
 },
 {
  "id": "shiur",
  "term": "shiur",
  "variants": [
   "shiurim",
   "shiurin"
  ],
  "he": "שיעור",
  "def": "A set halachic measurement of size, volume, or time; also, a Torah class."
 },
 {
  "id": "kiddush",
  "term": "Kiddush",
  "variants": [
   "kidush"
  ],
  "he": "קידוש",
  "def": "The blessing over wine that sanctifies Shabbos or Yom Tov."
 },
 {
  "id": "havdalah",
  "term": "Havdalah",
  "variants": [
   "havdala",
   "havdoloh"
  ],
  "he": "הבדלה",
  "def": "The blessing that marks the end of Shabbos or Yom Tov, separating it from the weekday."
 },
 {
  "id": "motzaei-shabbos",
  "term": "Motzaei Shabbos",
  "variants": [
   "motzei shabbos",
   "motzoei shabbos",
   "motzaei shabbat",
   "motzei shabbat"
  ],
  "he": "מוצאי שבת",
  "def": "Saturday night, after Shabbos has ended."
 },
 {
  "id": "erev-shabbos",
  "term": "Erev Shabbos",
  "variants": [
   "erev shabbat"
  ],
  "he": "ערב שבת",
  "def": "Friday, the day before Shabbos."
 },
 {
  "id": "yom-tov",
  "term": "Yom Tov",
  "variants": [
   "yomtov",
   "yom-tov",
   "yamim tovim"
  ],
  "he": "יום טוב",
  "def": "A festival day on which work is forbidden as on Shabbos, except for certain food preparation."
 },
 {
  "id": "chol-hamoed",
  "term": "Chol HaMoed",
  "variants": [
   "chol hamoed",
   "chol hamoad"
  ],
  "he": "חול המועד",
  "def": "The intermediate days of Pesach and Sukkos."
 },
 {
  "id": "eruv",
  "term": "eruv",
  "variants": [
   "eiruv",
   "eruvin"
  ],
  "he": "עירוב",
  "def": "An enclosure, made according to halachah, that allows carrying within it on Shabbos."
 },
 {
  "id": "eruv-tavshilin",
  "term": "eruv tavshilin",
  "variants": [
   "eiruv tavshilin"
  ],
  "he": "עירוב תבשילין",
  "def": "Food set aside before a Yom Tov that falls on Friday, which allows cooking on Yom Tov for Shabbos."
 },
 {
  "id": "kashrus",
  "term": "kashrus",
  "variants": [
   "kashrut"
  ],
  "he": "כשרות",
  "def": "The laws of which foods are kosher and how they are prepared."
 },
 {
  "id": "hechsher",
  "term": "hechsher",
  "variants": [
   "hechsherim",
   "hechsheirim",
   "hecsher"
  ],
  "he": "הכשר",
  "def": "Kosher certification from a supervising rabbi or agency."
 },
 {
  "id": "fleishig",
  "term": "fleishig",
  "variants": [
   "fleishigs",
   "fleishik",
   "fleishiks"
  ],
  "he": "בשרי",
  "def": "Meat, or food and utensils with the status of meat (Yiddish)."
 },
 {
  "id": "milchig",
  "term": "milchig",
  "variants": [
   "milchigs",
   "milchik",
   "milchiks"
  ],
  "he": "חלבי",
  "def": "Dairy, or food and utensils with the status of dairy (Yiddish)."
 },
 {
  "id": "pareve",
  "term": "pareve",
  "variants": [
   "parve",
   "parev"
  ],
  "he": "פרווה",
  "def": "Neither meat nor dairy, so it may be eaten with either."
 },
 {
  "id": "bishul-akum",
  "term": "bishul akum",
  "variants": [
   "bishul akum",
   "bishul akkum"
  ],
  "he": "בישול עכו״ם",
  "def": "Food cooked by a non-Jew, which the Sages forbade in certain cases."
 },
 {
  "id": "chalav-yisrael",
  "term": "chalav Yisrael",
  "variants": [
   "cholov yisroel",
   "chalav yisroel",
   "cholov yisrael",
   "chalav yisroel"
  ],
  "he": "חלב ישראל",
  "def": "Milk whose milking was supervised by a Jew."
 },
 {
  "id": "pas-yisrael",
  "term": "pas Yisrael",
  "variants": [
   "pas yisroel",
   "pat yisrael"
  ],
  "he": "פת ישראל",
  "def": "Bread baked by a Jew, or with a Jew’s participation in the baking."
 },
 {
  "id": "tevilas-keilim",
  "term": "tevilas keilim",
  "variants": [
   "tevilat kelim",
   "tevilas kelim",
   "tvilas keilim"
  ],
  "he": "טבילת כלים",
  "def": "Immersing new food utensils acquired from a non-Jew in a mikvah before using them."
 },
 {
  "id": "hagalah",
  "term": "hagalah",
  "variants": [
   "hag'alah",
   "hagala",
   "hag'ala"
  ],
  "he": "הגעלה",
  "def": "Kashering a utensil by immersing it in boiling water."
 },
 {
  "id": "libun",
  "term": "libun",
  "variants": [
   "libbun"
  ],
  "he": "ליבון",
  "def": "Kashering a utensil with direct, intense heat."
 },
 {
  "id": "treif",
  "term": "treif",
  "variants": [
   "treife",
   "treifa",
   "traif",
   "tereifah"
  ],
  "he": "טריפה",
  "def": "Not kosher."
 },
 {
  "id": "bitul",
  "term": "bitul",
  "variants": [
   "bittul",
   "bitul b'shishim"
  ],
  "he": "ביטול",
  "def": "Nullification of a small amount of a forbidden substance within a larger permitted mixture."
 },
 {
  "id": "bdieved",
  "term": "b'dieved",
  "variants": [
   "bedieved",
   "bedi'eved",
   "b'di'eved",
   "bediavad"
  ],
  "he": "בדיעבד",
  "def": "After the fact: what is acceptable once something has already been done."
 },
 {
  "id": "lchatchilah",
  "term": "l'chatchilah",
  "variants": [
   "lechatchilah",
   "lechatchila",
   "l'chatchila",
   "lchatchila",
   "lekhatchila"
  ],
  "he": "לכתחילה",
  "def": "From the outset: the preferred way to act before the fact."
 },
 {
  "id": "minhag",
  "term": "minhag",
  "variants": [
   "minhagim",
   "minhogim",
   "minhog"
  ],
  "he": "מנהג",
  "def": "An established custom of a family or community."
 },
 {
  "id": "psak",
  "term": "psak",
  "variants": [
   "p'sak",
   "psak halachah",
   "psak halacha"
  ],
  "he": "פסק",
  "def": "A halachic ruling."
 },
 {
  "id": "posek",
  "term": "posek",
  "variants": [
   "poskim",
   "poseik"
  ],
  "he": "פוסק",
  "def": "A halachic authority who issues rulings."
 },
 {
  "id": "rav",
  "term": "rav",
  "variants": [
   "rabbonim",
   "rabbanim"
  ],
  "he": "רב",
  "def": "A rabbi, especially the one a person turns to with halachic questions."
 },
 {
  "id": "machlokes",
  "term": "machlokes",
  "variants": [
   "machlokess",
   "machloket",
   "machlokos"
  ],
  "he": "מחלוקת",
  "def": "A dispute between halachic authorities."
 },
 {
  "id": "chumra",
  "term": "chumra",
  "variants": [
   "chumrah",
   "chumros",
   "chumrot"
  ],
  "he": "חומרא",
  "def": "A stringency beyond what the halachah strictly requires."
 },
 {
  "id": "kula",
  "term": "kula",
  "variants": [
   "kulah",
   "kulos",
   "kulot"
  ],
  "he": "קולא",
  "def": "A leniency."
 },
 {
  "id": "safek",
  "term": "safek",
  "variants": [
   "sofek",
   "safeik",
   "sfeikos"
  ],
  "he": "ספק",
  "def": "A doubt; a case whose halachic status is uncertain."
 },
 {
  "id": "doraisa",
  "term": "d'Oraisa",
  "variants": [
   "deoraisa",
   "de'oraisa",
   "d'oraysa",
   "de'oraita",
   "doraisa",
   "d'oraita"
  ],
  "he": "דאורייתא",
  "def": "Of Torah origin."
 },
 {
  "id": "drabbanan",
  "term": "d'Rabbanan",
  "variants": [
   "derabanan",
   "d'rabanan",
   "derabbanan",
   "drabanan",
   "d'rabbonon"
  ],
  "he": "דרבנן",
  "def": "Of rabbinic origin."
 },
 {
  "id": "mitzvah",
  "term": "mitzvah",
  "variants": [
   "mitzva",
   "mitzvos",
   "mitzvot",
   "mitzvoh"
  ],
  "he": "מצוה",
  "def": "A commandment of the Torah or of the Sages."
 },
 {
  "id": "mitzvas-asei",
  "term": "mitzvas asei",
  "variants": [
   "mitzvas aseh",
   "mitzvat aseh",
   "mitzvas asay"
  ],
  "he": "מצות עשה",
  "def": "A positive commandment: an act one is obligated to do."
 },
 {
  "id": "lo-saaseh",
  "term": "lo sa'aseh",
  "variants": [
   "lo saaseh",
   "lo ta'aseh",
   "lo taaseh"
  ],
  "he": "לא תעשה",
  "def": "A negative commandment: an act one is forbidden to do."
 },
 {
  "id": "aveirah",
  "term": "aveirah",
  "variants": [
   "aveira",
   "aveiros",
   "aveirot",
   "avera"
  ],
  "he": "עבירה",
  "def": "A transgression."
 },
 {
  "id": "issur",
  "term": "issur",
  "variants": [
   "issurim",
   "isur"
  ],
  "he": "איסור",
  "def": "A prohibition."
 },
 {
  "id": "heter",
  "term": "heter",
  "variants": [
   "heteirim",
   "hetter"
  ],
  "he": "היתר",
  "def": "A permission or lenient ruling."
 },
 {
  "id": "maris-ayin",
  "term": "mar'is ayin",
  "variants": [
   "maris ayin",
   "mar'it ayin",
   "marit ayin"
  ],
  "he": "מראית עין",
  "def": "Avoiding a permitted act because onlookers may think it forbidden."
 },
 {
  "id": "pikuach-nefesh",
  "term": "pikuach nefesh",
  "variants": [
   "pikuach nefesh",
   "pikuach nefesh"
  ],
  "he": "פיקוח נפש",
  "def": "Saving a life, which overrides nearly all mitzvos."
 },
 {
  "id": "krias-shema",
  "term": "Krias Shema",
  "variants": [
   "kriyas shema",
   "kerias shema",
   "krias shma",
   "kriat shema",
   "keriat shema"
  ],
  "he": "קריאת שמע",
  "def": "The recital of the Shema, said every morning and evening."
 },
 {
  "id": "shemoneh-esrei",
  "term": "Shemoneh Esrei",
  "variants": [
   "shmoneh esrei",
   "shemona esrei",
   "shmone esre",
   "shemoneh esreh"
  ],
  "he": "שמונה עשרה",
  "def": "The Amidah, the central standing prayer of each service."
 },
 {
  "id": "tefillah",
  "term": "tefillah",
  "variants": [
   "tefila",
   "tefilla",
   "tefilah",
   "tefillos",
   "tefilos",
   "tefillot"
  ],
  "he": "תפילה",
  "def": "Prayer."
 },
 {
  "id": "minyan",
  "term": "minyan",
  "variants": [
   "minyanim"
  ],
  "he": "מנין",
  "def": "A quorum of ten men for communal prayer."
 },
 {
  "id": "kavanah",
  "term": "kavanah",
  "variants": [
   "kavana",
   "kavanos",
   "kavono",
   "kavonoh"
  ],
  "he": "כוונה",
  "def": "Intention and concentration, especially in prayer and in performing mitzvos."
 },
 {
  "id": "tefillas-haderech",
  "term": "Tefillas HaDerech",
  "variants": [
   "tefilas haderech",
   "tefillat haderech",
   "tefilat haderech"
  ],
  "he": "תפילת הדרך",
  "def": "The traveler’s prayer, said when setting out on a journey."
 },
 {
  "id": "netilas-yadayim",
  "term": "netilas yadayim",
  "variants": [
   "netilat yadayim",
   "netilas yodayim"
  ],
  "he": "נטילת ידים",
  "def": "Ritual washing of the hands, as before eating bread."
 },
 {
  "id": "hamotzi",
  "term": "HaMotzi",
  "variants": [
   "hamotzie",
   "hamoitzi"
  ],
  "he": "המוציא",
  "def": "The blessing recited over bread."
 },
 {
  "id": "mezonos",
  "term": "mezonos",
  "variants": [
   "mezonot",
   "mezonois"
  ],
  "he": "מזונות",
  "def": "The blessing Borei Minei Mezonos, recited over grain foods other than bread."
 },
 {
  "id": "shehakol",
  "term": "Shehakol",
  "variants": [
   "she'hakol",
   "shehakol",
   "sh'hakol"
  ],
  "he": "שהכל",
  "def": "The general blessing, recited over foods such as meat, fish, eggs, and most drinks."
 },
 {
  "id": "borei-nefashos",
  "term": "Borei Nefashos",
  "variants": [
   "borei nefashot",
   "boreh nefashos",
   "borei nefoshos"
  ],
  "he": "בורא נפשות",
  "def": "The berachah acharonah recited after most foods and drinks not covered by Birchas HaMazon or Al HaMichyah."
 },
 {
  "id": "al-hamichyah",
  "term": "Al HaMichyah",
  "variants": [
   "al hamichya",
   "al hamichyah",
   "al hamichye"
  ],
  "he": "על המחיה",
  "def": "The berachah acharonah after grain foods other than bread; similar forms are said after wine and certain fruits."
 },
 {
  "id": "birchas-hamazon",
  "term": "Birchas HaMazon",
  "variants": [
   "birkas hamazon",
   "birkat hamazon",
   "bentching",
   "benching",
   "bentsching"
  ],
  "he": "ברכת המזון",
  "def": "Grace after meals, recited after eating bread."
 },
 {
  "id": "borei-meorei-haeish",
  "term": "Borei Me'orei Ha'eish",
  "variants": [
   "borei meorei haeish",
   "borei m'orei ha'eish",
   "borei meorei haesh"
  ],
  "he": "בורא מאורי האש",
  "def": "The Havdalah blessing over the flame."
 },
 {
  "id": "sukkah",
  "term": "sukkah",
  "variants": [
   "succah",
   "sukka",
   "succa",
   "sukkos"
  ],
  "he": "סוכה",
  "def": "The temporary booth lived in during the festival of Sukkos."
 },
 {
  "id": "sechach",
  "term": "sechach",
  "variants": [
   "schach",
   "s'chach",
   "sekhakh"
  ],
  "he": "סכך",
  "def": "The roof covering of a sukkah, made of detached plant material."
 },
 {
  "id": "esrog",
  "term": "esrog",
  "variants": [
   "etrog",
   "esrogim",
   "esroig"
  ],
  "he": "אתרוג",
  "def": "The citron, one of the Four Species taken on Sukkos."
 },
 {
  "id": "chametz",
  "term": "chametz",
  "variants": [
   "chometz",
   "chomets",
   "chamets",
   "hametz"
  ],
  "he": "חמץ",
  "def": "A leavened grain product, forbidden on Pesach."
 },
 {
  "id": "matzah",
  "term": "matzah",
  "variants": [
   "matza",
   "matzo",
   "matzos",
   "matzot"
  ],
  "he": "מצה",
  "def": "Unleavened bread."
 },
 {
  "id": "bedikas-chametz",
  "term": "bedikas chametz",
  "variants": [
   "bedikat chametz",
   "bedikas chometz"
  ],
  "he": "בדיקת חמץ",
  "def": "The search for chametz on the night before Pesach."
 },
 {
  "id": "chuppah",
  "term": "chuppah",
  "variants": [
   "chupah",
   "chupa",
   "chuppa",
   "chupoh"
  ],
  "he": "חופה",
  "def": "The wedding canopy, and the marriage ceremony held under it."
 },
 {
  "id": "kesubah",
  "term": "kesubah",
  "variants": [
   "kesuba",
   "ketubah",
   "ketuba",
   "kesubos"
  ],
  "he": "כתובה",
  "def": "The marriage contract, which sets out the husband’s obligations to his wife."
 },
 {
  "id": "bris-milah",
  "term": "bris milah",
  "variants": [
   "bris",
   "brit milah",
   "bris mila"
  ],
  "he": "ברית מילה",
  "def": "Circumcision, performed on a baby boy’s eighth day."
 },
 {
  "id": "pidyon-haben",
  "term": "pidyon haben",
  "variants": [
   "pidyon ha'ben",
   "pidyon habben"
  ],
  "he": "פדיון הבן",
  "def": "The redemption of a firstborn son from a kohen, once he is thirty days old."
 },
 {
  "id": "kohen",
  "term": "kohen",
  "variants": [
   "kohanim",
   "koihen"
  ],
  "he": "כהן",
  "def": "A male descendant of Aharon, of the priestly family."
 },
 {
  "id": "mikvah",
  "term": "mikvah",
  "variants": [
   "mikveh",
   "mikva",
   "mikvaos",
   "mikvaot"
  ],
  "he": "מקוה",
  "def": "A ritual bath."
 },
 {
  "id": "aveilus",
  "term": "aveilus",
  "variants": [
   "aveilut",
   "availus"
  ],
  "he": "אבלות",
  "def": "The laws and periods of mourning."
 },
 {
  "id": "shivah",
  "term": "shivah",
  "variants": [
   "shiva"
  ],
  "he": "שבעה",
  "def": "The seven days of mourning after the burial of a close relative."
 },
 {
  "id": "shloshim",
  "term": "shloshim",
  "variants": [
   "sheloshim",
   "shloshim"
  ],
  "he": "שלושים",
  "def": "The thirty days of mourning, counted from the burial."
 },
 {
  "id": "kaddish",
  "term": "Kaddish",
  "variants": [
   "kadish"
  ],
  "he": "קדיש",
  "def": "A prayer sanctifying Hashem’s Name, said by a mourner and at set points in the service."
 },
 {
  "id": "levayah",
  "term": "levayah",
  "variants": [
   "levaya",
   "levoyah",
   "levaye"
  ],
  "he": "לויה",
  "def": "A funeral."
 },
 {
  "id": "yahrtzeit",
  "term": "yahrtzeit",
  "variants": [
   "yahrzeit",
   "yartzeit",
   "yortzeit",
   "yohrtzeit"
  ],
  "he": "יארצייט",
  "def": "The anniversary of a death (Yiddish)."
 },
 {
  "id": "tzedakah",
  "term": "tzedakah",
  "variants": [
   "tzedaka",
   "tzedokah",
   "tzedoko"
  ],
  "he": "צדקה",
  "def": "Charity."
 },
 {
  "id": "maaser-kesafim",
  "term": "ma'aser kesafim",
  "variants": [
   "maaser kesafim",
   "ma'aser kesofim",
   "maaser kesofim"
  ],
  "he": "מעשר כספים",
  "def": "Giving a tenth of one’s earnings to tzedakah."
 },
 {
  "id": "maaser",
  "term": "ma'aser",
  "variants": [
   "maaser",
   "ma'asros",
   "maasros"
  ],
  "he": "מעשר",
  "def": "A tenth; tithes."
 },
 {
  "id": "hashkafah",
  "term": "hashkafah",
  "variants": [
   "hashkafa",
   "hashkofo",
   "hashkafos"
  ],
  "he": "השקפה",
  "def": "Torah outlook; a Torah perspective on life."
 },
 {
  "id": "halachah",
  "term": "halachah",
  "variants": [
   "halacha",
   "halocho",
   "halachos",
   "halachot",
   "halochos"
  ],
  "he": "הלכה",
  "def": "Jewish law; also, a single law."
 },
 {
  "id": "shulchan-aruch",
  "term": "Shulchan Aruch",
  "variants": [
   "shulchan oruch",
   "shulhan arukh"
  ],
  "he": "שולחן ערוך",
  "def": "The code of Jewish law by Rav Yosef Karo, with the glosses of the Rema."
 },
 {
  "id": "mishnah-berurah",
  "term": "Mishnah Berurah",
  "variants": [
   "mishna berura",
   "mishnah berura",
   "mishne berura"
  ],
  "he": "משנה ברורה",
  "def": "The Chofetz Chaim’s commentary on the Orach Chaim section of the Shulchan Aruch."
 },
 {
  "id": "gemara",
  "term": "Gemara",
  "variants": [
   "gemora",
   "gemorah",
   "gemarah"
  ],
  "he": "גמרא",
  "def": "The Talmud."
 },
 {
  "id": "rishonim",
  "term": "Rishonim",
  "variants": [
   "rishon"
  ],
  "he": "ראשונים",
  "def": "The early halachic authorities, before the Shulchan Aruch."
 },
 {
  "id": "acharonim",
  "term": "Acharonim",
  "variants": [
   "achronim",
   "acharon"
  ],
  "he": "אחרונים",
  "def": "The later halachic authorities, from the time of the Shulchan Aruch onward."
 },
 {
  "id": "pasuk",
  "term": "pasuk",
  "variants": [
   "posuk",
   "pesukim",
   "p'sukim"
  ],
  "he": "פסוק",
  "def": "A verse of Tanach."
 },
 {
  "id": "chazal",
  "term": "Chazal",
  "variants": [
   "chaza\"l",
   "chazzal"
  ],
  "he": "חז״ל",
  "def": "The Sages of the Mishnah and Talmud."
 },
 {
  "id": "mesorah",
  "term": "mesorah",
  "variants": [
   "mesora",
   "mesoiro",
   "mesoro"
  ],
  "he": "מסורה",
  "def": "The tradition handed down from teacher to student."
 },
 {
  "id": "shimush",
  "term": "shimush",
  "variants": [
   "shimmush"
  ],
  "he": "שימוש",
  "def": "Learning practical halachah by serving and observing a posek."
 },
 {
  "id": "haskamah",
  "term": "haskamah",
  "variants": [
   "haskama",
   "haskamos",
   "haskamot"
  ],
  "he": "הסכמה",
  "def": "A rabbi’s letter of approbation for a work."
 },
 {
  "id": "shlita",
  "term": "shlita",
  "variants": [
   "shlit\"a",
   "shlit'a"
  ],
  "he": "שליט״א",
  "def": "An acronym added after the name of a living sage: may he live long and good days, amen."
 },
 {
  "id": "zechus",
  "term": "zechus",
  "variants": [
   "zchus",
   "b'zchus",
   "bezchus",
   "zechut",
   "b'zechus",
   "zechusim"
  ],
  "he": "זכות",
  "def": "Merit."
 },
 {
  "id": "refuah-shleimah",
  "term": "refuah shleimah",
  "variants": [
   "refuah shleima",
   "refuah sheleimah",
   "refua shleima",
   "refuah shelaimah"
  ],
  "he": "רפואה שלמה",
  "def": "A complete recovery; also, a prayer for one."
 },
 {
  "id": "liluy-nishmas",
  "term": "l'iluy nishmas",
  "variants": [
   "l'ilui nishmas",
   "leilui nishmas",
   "l'ilui nishmat",
   "lilui nishmas"
  ],
  "he": "לעילוי נשמת",
  "def": "For the elevation of the soul of someone who has passed away."
 },
 {
  "id": "rosh-chodesh",
  "term": "Rosh Chodesh",
  "variants": [
   "rosh chodesh",
   "roshe chodesh"
  ],
  "he": "ראש חודש",
  "def": "The first day (or two days) of a Hebrew month."
 },
 {
  "id": "kiddush-levanah",
  "term": "kiddush levanah",
  "variants": [
   "kiddush levana",
   "kidush levana"
  ],
  "he": "קידוש לבנה",
  "def": "The monthly blessing recited over the new moon."
 },
 {
  "id": "borer",
  "term": "borer",
  "variants": [
   "boreir"
  ],
  "he": "בורר",
  "def": "The Shabbos melachah of selecting, such as separating unwanted items from wanted ones."
 },
 {
  "id": "bishul",
  "term": "bishul",
  "variants": [],
  "he": "בישול",
  "def": "The Shabbos melachah of cooking."
 },
 {
  "id": "kli-rishon",
  "term": "kli rishon",
  "variants": [
   "keli rishon",
   "k'li rishon"
  ],
  "he": "כלי ראשון",
  "def": "The pot or vessel in which food was heated, which can cook other food."
 },
 {
  "id": "kli-sheini",
  "term": "kli sheini",
  "variants": [
   "keli sheni",
   "kli sheni",
   "k'li sheini"
  ],
  "he": "כלי שני",
  "def": "A vessel into which hot food was poured from a kli rishon, with less ability to cook."
 },
 {
  "id": "shinui",
  "term": "shinui",
  "variants": [
   "shinuy",
   "b'shinui"
  ],
  "he": "שינוי",
  "def": "Doing an act in an unusual way, which can reduce the severity of a prohibition."
 },
 {
  "id": "amirah-lakum",
  "term": "amirah l'akum",
  "variants": [
   "amira l'akum",
   "amirah lakum",
   "amira lenochri",
   "amirah l'nochri"
  ],
  "he": "אמירה לעכו״ם",
  "def": "The rabbinic prohibition against asking a non-Jew to do forbidden work for a Jew on Shabbos."
 },
 {
  "id": "psik-reisha",
  "term": "p'sik reisha",
  "variants": [
   "psik reisha",
   "pesik reisha",
   "p'sik reishei"
  ],
  "he": "פסיק רישא",
  "def": "An act whose forbidden result is certain to happen, even if it is not intended."
 },
 {
  "id": "davar-sheeino-miskavein",
  "term": "davar she'eino miskavein",
  "variants": [
   "davar sheino miskaven",
   "dovor she'eino miskaven",
   "davar she'eino miskaven"
  ],
  "he": "דבר שאינו מתכוין",
  "def": "An unintended forbidden result that is not certain to happen, so the permitted act may be done."
 },
 {
  "id": "chazzan",
  "term": "Chazzan",
  "variants": [
   "chazan",
   "chazanim",
   "chazzanim"
  ],
  "he": "חזן",
  "def": "The leader of the prayer service."
 },
 {
  "id": "aliyah",
  "term": "aliyah",
  "variants": [
   "aliya",
   "aliyos",
   "aliyot"
  ],
  "he": "עליה",
  "def": "Being called up to the Torah reading."
 },
 {
  "id": "leining",
  "term": "leining",
  "variants": [
   "leyning",
   "laining"
  ],
  "he": "קריאת התורה",
  "def": "The public reading from the Torah (Yiddish)."
 },
 {
  "id": "mar-ukva",
  "term": "Mar Ukva",
  "variants": [],
  "he": "מר עוקבא",
  "def": "An Amora of the Talmud whose practice of waiting between meat and dairy is recorded in Chullin 105a."
 }
];
