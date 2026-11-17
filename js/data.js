/* HYEW prototype sample data.
 * Topics: the first 10 are from the existing site outline.
 * The last 5 (tefillah, brachos, yom-tov, tzedakah, medical) are
 * PLACEHOLDER extras pending the author's full topic list. The final
 * list will be longer than 10. Topics themselves stay a flat list;
 * optional subtopics (children of a topic) are used by the prototype's
 * “Topic → Subtopics → Q&As” drilldown.
 * All Q&A answers are SAMPLE PLACEHOLDERS — not psak, no real citations.
 */
window.HYEW = window.HYEW || {};

/* Topic groups: display order on the homepage index. A topic belongs to
 * exactly one display group (for layout only). Q&As and sheets still tag
 * any number of topics — the list itself stays flat. */
HYEW.topicGroups = [
  { id: "year",        en: "The Jewish Year" },
  { id: "daily",       en: "Daily Life" },
  { id: "family",      en: "Family & Life Cycle" },
  { id: "people",      en: "Between People" },
  { id: "foundations", en: "Foundations" }
];

/* Topics, in display order within each group. "placeholder" marks the 5
 * extras pending the author's full list. */
HYEW.topics = [
  { id: "shabbos",         group: "year",          en: "Shabbos",                      he: "שבת" },
  { id: "yom-tov",         group: "year",          en: "Yom Tov",                      he: "יום טוב" },  /* placeholder */
  { id: "jewish-calendar", group: "year",          en: "Jewish Calendar",              he: "הלוח העברי" },
  { id: "daily-living",    group: "daily",         en: "Daily Living",                 he: "הלכות יום יום" },
  { id: "tefillah",        group: "daily",         en: "Tefillah",                     he: "תפילה" },  /* placeholder */
  { id: "brachos",         group: "daily",         en: "Brachos",                      he: "ברכות" },  /* placeholder */
  { id: "kashrus",         group: "daily",         en: "Kashrus",                      he: "כשרות" },
  { id: "life-cycle",      group: "family",        en: "Life Cycle Events",            he: "מעגל החיים" },
  { id: "marital-family",  group: "family",        en: "Marital & Family Laws",        he: "הלכות אישות ומשפחה" },
  { id: "mourning",        group: "family",        en: "Mourning & Burial",            he: "אבלות" },
  { id: "medical",         group: "family",        en: "Medical Halacha",              he: "הלכות רפואה" },  /* placeholder */
  { id: "monetary",        group: "people",        en: "Monetary Laws",                he: "הלכות ממונות" },
  { id: "tzedakah",        group: "people",        en: "Tzedakah",                     he: "צדקה" },  /* placeholder */
  { id: "hashkafa",        group: "foundations",   en: "Hashkafa / Jewish Outlook",    he: "השקפה" },
  { id: "commandments",    group: "foundations",   en: "Commandments & Prohibitions",  he: "מצוות ואיסורים" }
];


/* Subtopics, in display order within each parent topic. Hebrew names
 * and the groupings themselves are PLACEHOLDERS pending the author. */
HYEW.subtopics = [
  /* shabbos */
  { id: "shabbos-melacha",  parent: "shabbos",         en: "Melacha",                     he: "מלאכה" },
  { id: "shabbos-kiddush",  parent: "shabbos",         en: "Kiddush & the Seudah",        he: "קידוש וסעודה" },
  { id: "shabbos-refuah",   parent: "shabbos",         en: "Medicine & Visiting",         he: "רפואה בשבת" },
  { id: "shabbos-zmanim",   parent: "shabbos",         en: "Times & Preparations",        he: "זמנים והכנות" },
  /* yom-tov */
  { id: "yom-tov-kiddush",  parent: "yom-tov",         en: "Kiddush",                     he: "קידוש" },
  { id: "yom-tov-cooking",  parent: "yom-tov",         en: "Cooking & Eruv Tavshilin",    he: "בישול ועירוב תבשילין" },
  { id: "yom-tov-sukkah",   parent: "yom-tov",         en: "Sukkah",                      he: "סוכה" },
  { id: "yom-tov-shofar",   parent: "yom-tov",         en: "Shofar",                      he: "שופר" },
  /* jewish-calendar */
  { id: "calendar-zmanim",  parent: "jewish-calendar", en: "Zmanim",                      he: "זמנים" },
  { id: "calendar-mitzvos", parent: "jewish-calendar", en: "Dates of Mitzvos",            he: "זמני מצוות" },
  { id: "calendar-seasons", parent: "jewish-calendar", en: "Seasons & Special Days",      he: "תקופות" },
  /* daily-living */
  { id: "daily-morning",    parent: "daily-living",    en: "Morning Routine",             he: "הלכות השכמה" },
  { id: "daily-kitchen",    parent: "daily-living",    en: "Kitchen & Food",              he: "המטבח" },
  { id: "daily-home",       parent: "daily-living",    en: "The Home",                    he: "דיני הבית" },
  /* tefillah */
  { id: "tefillah-shema",   parent: "tefillah",        en: "Shema",                       he: "קריאת שמע" },
  { id: "tefillah-times",   parent: "tefillah",        en: "Times of Tefillah",           he: "זמני תפילה" },
  { id: "tefillah-before",  parent: "tefillah",        en: "Before Davening",             he: "לפני התפילה" },
  /* brachos */
  { id: "brachos-food",     parent: "brachos",         en: "Brachos on Food",             he: "ברכות הנהנין" },
  { id: "brachos-reiyah",   parent: "brachos",         en: "Blessings on Seeing",         he: "ברכות הראייה" },
  /* kashrus */
  { id: "kashrus-basar-chalav", parent: "kashrus",     en: "Meat & Dairy",                he: "בשר בחלב" },
  { id: "kashrus-hechsher", parent: "kashrus",         en: "Hechsherim",                  he: "הכשרים" },
  { id: "kashrus-kelim",    parent: "kashrus",         en: "Kelim & Appliances",          he: "כלים" },
  /* life-cycle */
  { id: "lifecycle-wedding", parent: "life-cycle",     en: "Weddings",                    he: "נישואין" },
  { id: "lifecycle-bris",   parent: "life-cycle",      en: "Bris Milah",                  he: "ברית מילה" },
  { id: "lifecycle-yerusha", parent: "life-cycle",     en: "Inheritance",                 he: "ירושה" },
  /* marital-family */
  { id: "family-wedding",   parent: "marital-family",  en: "The Wedding",                 he: "הנישואין" },
  { id: "family-minhagim",  parent: "marital-family",  en: "Minhagim in Marriage",        he: "מנהגי אישות" },
  /* mourning */
  { id: "mourning-shivah",  parent: "mourning",        en: "Shivah & Shloshim",           he: "שבעה ושלושים" },
  { id: "mourning-kaddish", parent: "mourning",        en: "Kaddish",                     he: "קדיש" },
  /* medical */
  { id: "medical-shabbos",  parent: "medical",         en: "Treatment on Shabbos",        he: "רפואה בשבת" },
  { id: "medical-fasts",    parent: "medical",         en: "Illness & Fast Days",         he: "חולה בתענית" },
  /* monetary */
  { id: "monetary-maaser",  parent: "monetary",        en: "Maaser Kesafim",              he: "מעשר כספים" },
  { id: "monetary-yerusha", parent: "monetary",        en: "Inheritance & Wills",         he: "ירושה וצוואות" },
  /* tzedakah */
  { id: "tzedakah-maaser",  parent: "tzedakah",        en: "Maaser Kesafim",              he: "מעשר כספים" },
  { id: "tzedakah-giving",  parent: "tzedakah",        en: "How to Give",                 he: "נתינת צדקה" },
  /* hashkafa */
  { id: "hashkafa-minhagim", parent: "hashkafa",       en: "Reasons for Minhagim",        he: "טעמי המנהגים" },
  { id: "hashkafa-bitachon", parent: "hashkafa",       en: "Bitachon",                    he: "בטחון" },
  /* commandments */
  { id: "mitzvos-mezuzah",  parent: "commandments",    en: "Mezuzah",                     he: "מזוזה" },
  { id: "mitzvos-tzitzis",  parent: "commandments",    en: "Tzitzis & Tallis",            he: "ציצית" },
  { id: "mitzvos-shofar",   parent: "commandments",    en: "Shofar",                      he: "שופר" },
  { id: "mitzvos-fasts",    parent: "commandments",    en: "Fasts",                       he: "תעניות" }
];

HYEW.qa = [
  {
    id: "qa-01",
    slug: "if-i-only-tasted-meat-and-did-not-swallow",
    question: "If I only tasted meat and did not swallow, must I wait before eating dairy?",
    answer: "Sample answer (placeholder, not a psak): This is a commonly asked kashrus question. A full answer would distinguish between tasting, chewing, and swallowing, whether less than a kezayis makes a difference, and would note that family minhag and a rav’s guidance matter. Please ask your rav for a personal ruling.",
    topics: ["kashrus"],
    subtopics: ["kashrus-basar-chalav"]
  },
  {
    id: "qa-02",
    slug: "may-i-set-a-timer-before-shabbos",
    question: "May I set a timer before Shabbos to turn lights on or off?",
    answer: "Sample answer (placeholder, not a psak): Many households use pre-set timers for lights. A full answer would cover what may be set before Shabbos, what should not be adjusted on Shabbos itself, and common household cases. Please ask your rav for a personal ruling.",
    topics: ["shabbos"],
    subtopics: ["shabbos-melacha"]
  },
  {
    id: "qa-03",
    slug: "can-kiddush-be-recited-over-grape-juice",
    question: "Can Kiddush be recited over grape juice?",
    answer: "Sample answer (placeholder, not a psak): Grape juice is widely used for Kiddush. A full answer would address whether wine is preferred l’chatchilah, how much must be drunk (a revi’is or less), when juice is fully acceptable, and which berachah acharonah follows it. Please ask your rav for a personal ruling.",
    topics: ["shabbos", "yom-tov"],
    subtopics: ["shabbos-kiddush", "yom-tov-kiddush"]
  },
  {
    id: "qa-04",
    slug: "does-ordinary-bottled-water-need-a-hechsher",
    question: "Does ordinary bottled water need a hechsher?",
    answer: "Sample answer (placeholder, not a psak): Plain water is often treated differently from flavored or processed drinks. A full answer would distinguish unflavored water from seltzer and added-ingredient beverages, and note that local practice can vary. Please ask your rav for a personal ruling.",
    topics: ["kashrus", "daily-living"],
    subtopics: ["kashrus-hechsher", "daily-kitchen"]
  },
  {
    id: "qa-05",
    slug: "how-do-i-keep-shabbos-when-flying",
    question: "How do I keep Shabbos when flying across time zones?",
    answer: "Sample answer (placeholder, not a psak): Travel across time zones raises questions about when Shabbos begins and ends. A full answer would depend on the flight path, departure and arrival times, and when twilight is observed. This needs a rav who can work through the itinerary with you.",
    topics: ["shabbos", "jewish-calendar"],
    subtopics: ["shabbos-zmanim", "calendar-zmanim"]
  },
  {
    id: "qa-06",
    slug: "may-maaser-money-be-given-to-a-close-relative",
    question: "May maaser money be given to a close relative?",
    answer: "Sample answer (placeholder, not a psak): Supporting family and giving maaser can overlap, and poskim discuss when a relative is a fitting recipient. A full answer would consider the relative’s need and whether other tzedakah obligations have been met. Please ask your rav for a personal ruling.",
    topics: ["tzedakah", "monetary"],
    subtopics: ["tzedakah-maaser", "monetary-maaser"]
  },
  {
    id: "qa-07",
    slug: "when-may-a-mourner-return-to-work",
    question: "When may a mourner return to work after the burial?",
    answer: "Sample answer (placeholder, not a psak): The days of shivah, and work during that period, follow a set of well-known halachos, with limited exceptions for financial need. A full answer would depend on the mourner’s relationship to the deceased and the type of work. Please ask your rav for a personal ruling.",
    topics: ["mourning"],
    subtopics: ["mourning-shivah"]
  },
  {
    id: "qa-08",
    slug: "is-breaking-a-glass-under-the-chuppah-required",
    question: "Is breaking a glass under the chuppah required?",
    answer: "Sample answer (placeholder, not a psak): Breaking a glass is a widespread wedding custom recalling the destruction of the Beis Hamikdash. A full answer would describe the custom’s place in the ceremony and whether it is treated as obligatory practice. Please ask your rav for a personal ruling.",
    topics: ["life-cycle", "marital-family"],
    subtopics: ["lifecycle-wedding", "family-wedding"]
  },
  {
    id: "qa-09",
    slug: "may-i-take-medicine-on-shabbos",
    question: "May I take medicine on Shabbos for a mild headache?",
    answer: "Sample answer (placeholder, not a psak): Medicine on Shabbos depends on the severity of the condition and the form of the remedy. A full answer would distinguish serious illness from minor discomfort, and prepared liquid or pill forms from crushing or mixing. Please ask your rav for a personal ruling.",
    topics: ["shabbos", "medical"],
    subtopics: ["shabbos-refuah", "medical-shabbos"]
  },
  {
    id: "qa-10",
    slug: "what-bracha-is-said-on-granola",
    question: "What bracha is said on granola or a mixed cereal?",
    answer: "Sample answer (placeholder, not a psak): Mixed foods can take the blessing of the main ingredient, or more than one blessing, depending on how they are eaten. A full answer would consider oats, clusters, flakes, and added fruit. Please ask your rav for a personal ruling.",
    topics: ["brachos", "daily-living"],
    subtopics: ["brachos-food", "daily-kitchen"]
  },
  {
    id: "qa-11",
    slug: "can-mincha-still-be-davened-after-sunset",
    question: "Can mincha still be davened after sunset?",
    answer: "Sample answer (placeholder, not a psak): The close of the mincha window is debated, and some communities are more lenient in pressing circumstances between sunset and nightfall. A full answer would depend on the clock time, the season, and your community’s practice. Please ask your rav for a personal ruling.",
    topics: ["tefillah", "jewish-calendar"],
    subtopics: ["tefillah-times", "calendar-zmanim"]
  },
  {
    id: "qa-12",
    slug: "may-i-cook-on-yom-tov-for-shabbos",
    question: "May I cook on Yom Tov for Shabbos if I did not make an eruv tavshilin?",
    answer: "Sample answer (placeholder, not a psak): An eruv tavshilin is the usual way to cook on Yom Tov for Shabbos when the two days meet. A full answer would cover what to do if it was forgotten, who can make it, and until when. Please ask your rav for a personal ruling.",
    topics: ["yom-tov", "shabbos"],
    subtopics: ["yom-tov-cooking", "shabbos-zmanim"]
  },
  {
    id: "qa-13",
    slug: "does-a-sukkah-standing-under-a-tree-fulfill",
    question: "Does a sukkah standing under a tree fulfill the mitzvah?",
    answer: "Sample answer (placeholder, not a psak): Sechach generally must be open to the sky, and a tree overhead is a classic problem. A full answer would discuss how much of the sukkah is covered, the density of the branches, and whether the sukkah can be used. Please ask your rav for a personal ruling.",
    topics: ["yom-tov"],
    subtopics: ["yom-tov-sukkah"]
  },
  {
    id: "qa-14",
    slug: "why-do-we-cover-our-eyes-for-shema",
    question: "Why do we cover our eyes for the first verse of Shema?",
    answer: "Sample answer (placeholder, not a psak): Covering the eyes during the first pasuk is a widespread practice of kavanah, so that one accepts ol malchus Shamayim without distraction. A full answer would describe the custom and when it is done. This is a sample explanation only.",
    topics: ["tefillah", "hashkafa"],
    subtopics: ["tefillah-shema", "hashkafa-minhagim"]
  },
  {
    id: "qa-15",
    slug: "may-i-open-a-fold-up-umbrella-on-shabbos",
    question: "May I open a fold-up umbrella on Shabbos?",
    answer: "Sample answer (placeholder, not a psak): Opening a portable umbrella on Shabbos is commonly treated as a problem of making a tent-like covering. A full answer would address umbrellas, strollers, and similar cases. Please ask your rav for a personal ruling.",
    topics: ["shabbos"],
    subtopics: ["shabbos-melacha"]
  },
  {
    id: "qa-16",
    slug: "what-is-the-earliest-time-for-a-bris-milah",
    question: "What is the earliest time of day for a bris milah?",
    answer: "Sample answer (placeholder, not a psak): A bris is performed by day, and communities often prefer the morning. A full answer would cover the earliest clock time, delaying for a medical reason, and a bris on Shabbos. Please ask your rav for a personal ruling.",
    topics: ["life-cycle", "jewish-calendar"],
    subtopics: ["lifecycle-bris", "calendar-mitzvos"]
  },
  {
    id: "qa-17",
    slug: "must-i-wash-netilas-yadayim-upon-waking",
    question: "Must I wash netilas yadayim immediately upon waking?",
    answer: "Sample answer (placeholder, not a psak): Morning netilas yadayim is a well-established daily practice. A full answer would discuss washing before walking four amos, keeping water at the bedside, and what to do if water is not nearby. Please ask your rav for a personal ruling.",
    topics: ["daily-living", "tefillah"],
    subtopics: ["daily-morning", "tefillah-before"]
  },
  {
    id: "qa-18",
    slug: "may-the-same-microwave-be-used-for-milchig-and-fleishig",
    question: "May the same microwave be used for milchig and fleishig foods?",
    answer: "Sample answer (placeholder, not a psak): Shared appliances raise questions of residue, steam, and how food is covered. A full answer would consider dairy and meat use, waiting times, and whether a microwave can be kashered. Please ask your rav for a personal ruling.",
    topics: ["kashrus", "daily-living"],
    subtopics: ["kashrus-kelim", "daily-kitchen"]
  },
  {
    id: "qa-19",
    slug: "how-is-maaser-calculated-on-a-salary",
    question: "How is maaser calculated on a salary?",
    answer: "Sample answer (placeholder, not a psak): Maaser is commonly taken from net income, though some give from gross and some give a fifth. A full answer would address taxes, deductions, and household expenses. Please ask your rav for a personal ruling.",
    topics: ["tzedakah", "monetary"],
    subtopics: ["tzedakah-maaser", "monetary-maaser"]
  },
  {
    id: "qa-20",
    slug: "may-i-visit-the-sick-on-shabbos",
    question: "May I visit the sick on Shabbos?",
    answer: "Sample answer (placeholder, not a psak): Bikur cholim is a mitzvah, and visiting on Shabbos is often encouraged when it comforts the patient. A full answer would note what not to say, traveling to a hospital, and carrying. Please ask your rav for a personal ruling.",
    topics: ["medical", "shabbos"],
    subtopics: ["shabbos-refuah", "medical-shabbos"]
  },
  {
    id: "qa-21",
    slug: "may-a-will-assign-property-differently-than-din-torah",
    question: "May a will assign property differently than din Torah?",
    answer: "Sample answer (placeholder, not a psak): Inheritance in halacha follows a set order, and civil wills sometimes need additional halachic instruments to take effect. A full answer is highly individual and should be prepared with a rav and, where needed, a lawyer familiar with these documents.",
    topics: ["monetary", "life-cycle"],
    subtopics: ["monetary-yerusha", "lifecycle-yerusha"]
  },
  {
    id: "qa-22",
    slug: "why-is-the-challah-covered-during-kiddush",
    question: "Why is the challah covered during Kiddush?",
    answer: "Sample answer (placeholder, not a psak): Covering the challah during Kiddush is a familiar Shabbos practice, often explained as a matter of honor for the bread and the order of blessings. A full answer would present the usual reasons and when the cover is removed. This is a sample explanation only.",
    topics: ["shabbos", "hashkafa"],
    subtopics: ["shabbos-kiddush", "hashkafa-minhagim"]
  },
  {
    id: "qa-23",
    slug: "may-i-eat-or-drink-before-morning-davening",
    question: "May I eat or drink before morning davening?",
    answer: "Sample answer (placeholder, not a psak): Eating a meal before shacharis is generally avoided; drinking and cases of weakness are often treated more leniently. A full answer would distinguish water, coffee, and food, and address someone who is unwell. Please ask your rav for a personal ruling.",
    topics: ["tefillah", "daily-living"],
    subtopics: ["tefillah-before", "daily-morning"]
  },
  {
    id: "qa-24",
    slug: "does-a-hotel-room-require-a-mezuzah",
    question: "Does a hotel room require a mezuzah?",
    answer: "Sample answer (placeholder, not a psak): A mezuzah depends on the kind of dwelling and how long one stays. A full answer would distinguish a hotel room, a rented apartment, and a longer stay, and who is responsible for affixing it. Please ask your rav for a personal ruling.",
    topics: ["commandments", "daily-living"],
    subtopics: ["mitzvos-mezuzah", "daily-home"]
  },
  {
    id: "qa-25",
    slug: "what-bracha-is-recited-on-seeing-fruit-trees-in-bloom",
    question: "What bracha is recited on seeing fruit trees in bloom?",
    answer: "Sample answer (placeholder, not a psak): There is a seasonal blessing said on blossoming fruit trees in the spring, with conditions about when and how often it is said. A full answer would cover the time of year, whether the trees must be fruit-bearing, and if it can be said in a city. Please ask your rav for a personal ruling.",
    topics: ["brachos", "jewish-calendar"],
    subtopics: ["brachos-reiyah", "calendar-seasons"]
  },
  {
    id: "qa-26",
    slug: "what-bracha-is-said-on-chocolate",
    question: "What bracha is said on chocolate?",
    answer: "Sample answer (placeholder, not a psak): Chocolate can take different blessings depending on how it is made — whether it is mostly cocoa, has a filling, or is eaten as a candy. A full answer would distinguish a plain bar from nuts, wafers, and filled chocolates. Please ask your rav for a personal ruling.",
    topics: ["brachos"],
    subtopics: ["brachos-food"]
  },
  {
    id: "qa-27",
    slug: "may-a-married-couple-keep-different-family-minhagim",
    question: "May a married couple keep different family minhagim?",
    answer: "Sample answer (placeholder, not a psak): After marriage, couples often need to decide whose family customs to follow for waiting between meat and dairy, kitniyos, and similar practices. A full answer would depend on the couple’s communities and which customs are treated as binding. Please ask your rav for a personal ruling.",
    topics: ["marital-family"],
    subtopics: ["family-minhagim"]
  },
  {
    id: "qa-28",
    slug: "is-a-ketubah-required-at-every-jewish-wedding",
    question: "Is a ketubah required at every Jewish wedding?",
    answer: "Sample answer (placeholder, not a psak): A ketubah is a standard and required part of a Jewish wedding, and the wording and witnesses follow set rules. A full answer would cover when it is written, who may sign, and what to do if it is lost. Please ask your rav for a personal ruling.",
    topics: ["marital-family", "life-cycle"],
    subtopics: ["family-wedding", "lifecycle-wedding"]
  },
  {
    id: "qa-29",
    slug: "may-a-mourner-attend-a-wedding-during-shloshim",
    question: "May a mourner attend a wedding during shloshim?",
    answer: "Sample answer (placeholder, not a psak): A mourner’s attendance at a wedding is limited during shivah and shloshim, with some distinctions between close relatives and other simchos. A full answer would depend on the relationship to the deceased, the type of celebration, and whether the mourner has a role in the wedding. Please ask your rav for a personal ruling.",
    topics: ["mourning", "life-cycle"],
    subtopics: ["mourning-shivah", "lifecycle-wedding"]
  },
  {
    id: "qa-30",
    slug: "how-long-is-kaddish-recited-for-a-parent",
    question: "How long is kaddish recited for a parent?",
    answer: "Sample answer (placeholder, not a psak): Kaddish for a parent is commonly recited for eleven months, and the calendar counting has a few well-known details. A full answer would cover who recites it, when a leap year changes the count, and yahrzeit. Please ask your rav for a personal ruling.",
    topics: ["mourning"],
    subtopics: ["mourning-kaddish"]
  },
  {
    id: "qa-31",
    slug: "may-a-person-who-is-ill-eat-on-a-fast-day",
    question: "May a person who is ill eat on a fast day?",
    answer: "Sample answer (placeholder, not a psak): Fast days have different levels of obligation, and a person who is ill is often treated more leniently, especially if fasting would cause harm. A full answer would distinguish Yom Kippur, Tishah B’Av, and the minor fasts, and should be decided with a rav who knows the person’s condition. Please ask your rav for a personal ruling.",
    topics: ["medical", "commandments"],
    subtopics: ["medical-fasts", "mitzvos-fasts"]
  },
  {
    id: "qa-32",
    slug: "must-i-give-tzedakah-to-every-person-who-asks",
    question: "Must I give tzedakah to every person who asks?",
    answer: "Sample answer (placeholder, not a psak): There is a mitzvah to give to the poor, and also guidance about how much to give and when one may decline. A full answer would discuss giving in one’s city first, organized collections, and a person whose need is uncertain. Please ask your rav for a personal ruling.",
    topics: ["tzedakah"],
    subtopics: ["tzedakah-giving"]
  },
  {
    id: "qa-33",
    slug: "why-do-we-say-im-yirtzeh-hashem",
    question: "Why do we say im yirtzeh Hashem when speaking about the future?",
    answer: "Sample answer (placeholder, not a psak): Adding “im yirtzeh Hashem” when speaking of the future is a familiar expression of bitachon, that plans depend on Heaven. A full answer would describe the custom and when people are particular about it. This is a sample explanation only.",
    topics: ["hashkafa"],
    subtopics: ["hashkafa-bitachon"]
  },
  {
    id: "qa-34",
    slug: "does-a-borrowed-tallis-fulfill-the-mitzvah-of-tzitzis",
    question: "Does a borrowed tallis fulfill the mitzvah of tzitzis?",
    answer: "Sample answer (placeholder, not a psak): A man may often fulfill the mitzvah with a borrowed tallis, though some distinguish a synagogue tallis from one taken without permission, and a blessing may depend on the case. A full answer would also address a borrowed tallis gadol versus tzitzis worn all day. Please ask your rav for a personal ruling.",
    topics: ["commandments"],
    subtopics: ["mitzvos-tzitzis"]
  },
  {
    id: "qa-35",
    slug: "must-i-hear-the-shofar-myself",
    question: "Must I hear the shofar myself, or may someone else blow it for me?",
    answer: "Sample answer (placeholder, not a psak): The mitzvah is to hear the shofar, and one person commonly blows for many others. A full answer would cover intention, hearing through a hearing aid or a wall, and someone who cannot get to shul. Please ask your rav for a personal ruling.",
    topics: ["commandments", "yom-tov"],
    subtopics: ["mitzvos-shofar", "yom-tov-shofar"]
  }
];

/* Chumashim and parshiyos, in order (54). Combined parshiyos
 * (Vayakhel-Pekudei, Nitzavim-Vayeilech, etc.) are listed separately. */
HYEW.books = [
  { id: "bereishis", en: "Bereishis", he: "בראשית", parshiyos: [
    ["bereishis","Bereishis","בראשית"],["noach","Noach","נח"],["lech-lecha","Lech Lecha","לך לך"],
    ["vayeira","Vayeira","וירא"],["chayei-sarah","Chayei Sarah","חיי שרה"],["toldos","Toldos","תולדות"],
    ["vayeitzei","Vayeitzei","ויצא"],["vayishlach","Vayishlach","וישלח"],["vayeishev","Vayeishev","וישב"],
    ["mikeitz","Mikeitz","מקץ"],["vayigash","Vayigash","ויגש"],["vayechi","Vayechi","ויחי"] ] },
  { id: "shemos", en: "Shemos", he: "שמות", parshiyos: [
    ["shemos","Shemos","שמות"],["vaeira","Va’eira","וארא"],["bo","Bo","בא"],["beshalach","Beshalach","בשלח"],
    ["yisro","Yisro","יתרו"],["mishpatim","Mishpatim","משפטים"],["terumah","Terumah","תרומה"],
    ["tetzaveh","Tetzaveh","תצוה"],["ki-sisa","Ki Sisa","כי תשא"],["vayakhel","Vayakhel","ויקהל"],
    ["pekudei","Pekudei","פקודי"] ] },
  { id: "vayikra", en: "Vayikra", he: "ויקרא", parshiyos: [
    ["vayikra","Vayikra","ויקרא"],["tzav","Tzav","צו"],["shemini","Shemini","שמיני"],["tazria","Tazria","תזריע"],
    ["metzora","Metzora","מצורע"],["acharei-mos","Acharei Mos","אחרי מות"],["kedoshim","Kedoshim","קדושים"],
    ["emor","Emor","אמור"],["behar","Behar","בהר"],["bechukosai","Bechukosai","בחקתי"] ] },
  { id: "bamidbar", en: "Bamidbar", he: "במדבר", parshiyos: [
    ["bamidbar","Bamidbar","במדבר"],["nasso","Nasso","נשא"],["behaaloscha","Beha’aloscha","בהעלתך"],
    ["shelach","Shelach","שלח"],["korach","Korach","קרח"],["chukas","Chukas","חקת"],["balak","Balak","בלק"],
    ["pinchas","Pinchas","פינחס"],["matos","Matos","מטות"],["masei","Masei","מסעי"] ] },
  { id: "devarim", en: "Devarim", he: "דברים", parshiyos: [
    ["devarim","Devarim","דברים"],["vaeschanan","Va’eschanan","ואתחנן"],["eikev","Eikev","עקב"],
    ["reeh","Re’eh","ראה"],["shoftim","Shoftim","שופטים"],["ki-seitzei","Ki Seitzei","כי תצא"],
    ["ki-savo","Ki Savo","כי תבוא"],["nitzavim","Nitzavim","נצבים"],["vayeilech","Vayeilech","וילך"],
    ["haazinu","Ha’azinu","האזינו"],["vzos-haberachah","V’zos HaBerachah","וזאת הברכה"] ] }
];
HYEW.parshaBySlug = {};
HYEW.books.forEach(function (b) {
  b.parshiyos = b.parshiyos.map(function (p) {
    var o = { slug: p[0], en: p[1], he: p[2], book: b.id };
    HYEW.parshaBySlug[o.slug] = o;
    return o;
  });
});

/* Full sample body of the featured paper (No. 147). Other sheets get a
 * clearly-labelled placeholder body built from their excerpt (see site.js). */
var FEATURED_BODY = [
  '<p class="dc">Most of us learned the rule as small children: after a fleishig meal, we wait six hours before eating anything milchig. Yet the Torah says nothing of a wait, and the Gemara records only the practice of Mar Ukva, who waited “from one meal to the next.”<sup>1</sup> How did that become six hours — and why do some families wait one, or three?</p>',
  '<h3>Two reasons, two approaches</h3>',
  '<p>Rashi understands the wait as a measure of time: the span that separated the morning and evening meals of the Talmudic era.<sup>2</sup> The Rambam offers a physical reason — meat lodged between the teeth retains its taste for roughly six hours.<sup>3</sup> The Shulchan Aruch rules six hours, citing both explanations, and this is the prevalent practice today.<sup>4</sup></p>',
  '<p class="q">Q: If I only chewed meat for a baby, and didn’t swallow, must I wait?</p>',
  '<p>Here the two reasons diverge. According to the Rambam, meat in the mouth is the concern, so chewing alone would require a wait; according to Rashi, one who did not eat a meal has nothing to wait for.<sup>5</sup> The Shach rules stringently, in deference to both.<sup>6</sup></p>',
  '<div class="bl"><b>Bottom line</b><ul><li>Wait six hours after meat before dairy.</li><li>Chewing without swallowing — also wait.</li><li>Follow an established family minhag of one or three hours.</li><li>Ask your rav about children and illness.</li></ul></div>',
  '<h3>Where the one-hour minhag comes from</h3>',
  '<p>The Rema records a custom to wait one hour, recite a berachah acharonah, and clean the mouth — a practice preserved in many Dutch and German communities.<sup>7</sup> Those who keep it are following a legitimate opinion, not a leniency.</p>',
  '<p>Sample text (placeholder): the full paper would go on to discuss what counts as a fleishig meal, whether pareve food cooked in a fleishig pot requires a wait, whether the bracha achrona must be said before the wait begins, and how a safek is treated l’chatchilah and b’dieved.</p>',
  '<div class="fn"><p><sup>1</sup>Chullin 105a.</p><p><sup>2</sup>Rashi, ibid., s.v. l’seudasa.</p><p><sup>3</sup>Rambam, Hil. Ma’achalos Asuros 9:28.</p><p><sup>4</sup>Shulchan Aruch, Y.D. 89:1.</p><p><sup>5</sup>See Pri Megadim, Sifsei Da’as 89:1.</p><p><sup>6</sup>Shach, Y.D. 89:2.</p><p><sup>7</sup>Rema, ibid.; Darchei Moshe 89:2.</p></div>'
].join("");

/* Sheets: id, issue number, parsha slug, Hebrew year, Shabbos date (ISO).
 * Dates are the real Shabbos of that parsha in that year. Content is SAMPLE. */
HYEW.sheets = [
  {
    id: "147", number: 147, parsha: "vayeitzei", year: "5787", date: "2026-11-21",
    title: "…why we wait six hours between meat and milk?",
    topics: ["kashrus"],
    sponsored: "This week’s paper is sponsored l’iluy nishmas [Name]",
    excerpt: "Most of us learned the rule as small children: after a fleishig meal, we wait six hours before eating anything milchig. Yet the Torah says nothing of a wait, and the Gemara records only the practice of Mar Ukva, who waited “from one meal to the next.” How did that become six hours — and why do some families wait one, or three?",
    body: FEATURED_BODY,
    featured: true
  },
  {
    id: "146", number: 146, parsha: "toldos", year: "5787", date: "2026-11-14",
    title: "…why we cover our eyes for the first pasuk of Shema?",
    topics: ["tefillah", "hashkafa"],
    excerpt: "A familiar motion: the right hand rises, the eyes are covered, and the first pasuk of Krias Shema is said. Sample excerpt (placeholder): this week’s paper would look at why the custom took hold, and what kavanah it is meant to help us have in those few seconds."
  },
  {
    id: "145", number: 145, parsha: "chayei-sarah", year: "5787", date: "2026-11-07",
    title: "…why we break a glass under the chuppah?",
    topics: ["life-cycle", "marital-family"],
    excerpt: "The ceremony ends with a sharp sound and a mazel tov. Sample excerpt (placeholder): this week’s paper would look at why a glass is broken under the chuppah, and what the minhag is meant to recall."
  },
  {
    id: "144", number: 144, parsha: "vayeira", year: "5787", date: "2026-10-31",
    title: "…whether bottled water needs a hechsher?",
    topics: ["kashrus", "daily-living"],
    excerpt: "A plastic bottle from a rest-stop cooler seems simple enough. Sample excerpt (placeholder): this week’s paper would distinguish plain water from flavored drinks, when a hechsher is usually sought, and which brocha rishona and brocha achronah apply."
  },
  {
    id: "143", number: 143, parsha: "lech-lecha", year: "5787", date: "2026-10-24",
    title: "…when Tefillas HaDerech is said on a flight?",
    topics: ["tefillah", "daily-living"],
    excerpt: "The seatbelt sign goes off, and a few passengers stand to daven. Sample excerpt (placeholder): this week’s paper would look at when Tefillas HaDerech is said on a journey, and how a flight compares to a drive out of the city."
  },
  {
    id: "142", number: 142, parsha: "noach", year: "5787", date: "2026-10-17",
    title: "…whether you may open an umbrella on Shabbos?",
    topics: ["shabbos"],
    excerpt: "A sudden rain, a fold-up umbrella in the coat closet — and a pause at the door. Sample excerpt (placeholder): this week’s paper would set out why opening an umbrella is commonly avoided on Shabbos, how it relates to the melachos and to muktzeh, and what people do instead."
  },
  {
    id: "141", number: 141, parsha: "bereishis", year: "5787", date: "2026-10-10",
    title: "…why Havdalah is made over a flame?",
    topics: ["shabbos", "brachos"],
    excerpt: "The candle is lit, the fingers are raised toward its light, and a bracha is said. Sample excerpt (placeholder): this week’s paper would explain the bracha of borei me’orei ha’eish at Motzaei Shabbos, and why we look at our fingernails by its light."
  },
  {
    id: "140", number: 140, parsha: "haazinu", year: "5787", date: "2026-09-19",
    title: "…why a sukkah may not stand beneath a tree?",
    topics: ["yom-tov"],
    excerpt: "The sechach must be the roof, and the sky must be above it. Sample excerpt (placeholder): this week’s paper would explain why branches of a tree overhead are a problem, and which cases can still be used l’chatchilah or b’dieved."
  },
  {
    id: "91", number: 91, parsha: "lech-lecha", year: "5786", date: "2025-11-01",
    title: "…whether ma’aser may be given from a gift?",
    topics: ["tzedakah", "monetary"],
    excerpt: "Avraham Avinu gave a tenth to Malki-Tzedek — but what of money that arrives as a gift? Sample excerpt (placeholder): this paper would look at which income is included in ma’aser kesafim, and how gifts and inheritances are treated."
  },
  {
    id: "90", number: 90, parsha: "noach", year: "5786", date: "2025-10-25",
    title: "…what bracha is said on seeing a rainbow?",
    topics: ["brachos", "hashkafa"],
    excerpt: "After the storm, a rainbow over the parking lot. Sample excerpt (placeholder): this paper would set out the bracha said on seeing a rainbow, and why some are careful not to point it out to others."
  },
  {
    id: "39", number: 39, parsha: "lech-lecha", year: "5785", date: "2024-11-09",
    title: "…why a bris is performed on Shabbos?",
    topics: ["life-cycle", "shabbos"],
    excerpt: "The bris milah of a baby born the Shabbos before is done on Shabbos itself. Sample excerpt (placeholder): this paper would look at why a bris on its proper day overrides Shabbos, and when a bris that has been pushed off does not."
  }
];
