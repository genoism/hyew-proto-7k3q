/* HYEW prototype sample data.
 * Topics: the first 10 are from the existing site outline.
 * The last 5 (tefillah, brachos, yom-tov, tzedakah, medical) are
 * PLACEHOLDER extras pending the author's full topic list. The final
 * list will be longer than 10 and is a single flat list (no hierarchy).
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

HYEW.qa = [
  {
    id: "qa-01",
    question: "If I only tasted meat and did not swallow, must I wait before eating dairy?",
    answer: "Sample answer (placeholder, not a psak): This is a commonly asked kashrus question. A full answer would distinguish between tasting, chewing, and swallowing, and would note that family custom and a rav’s guidance matter. Please ask your rav for a personal ruling.",
    topics: ["kashrus"]
  },
  {
    id: "qa-02",
    question: "May I set a timer before Shabbos to turn lights on or off?",
    answer: "Sample answer (placeholder, not a psak): Many households use pre-set timers for lights. A full answer would cover what may be set before Shabbos, what should not be adjusted on Shabbos itself, and common household cases. Please ask your rav for a personal ruling.",
    topics: ["shabbos"]
  },
  {
    id: "qa-03",
    question: "Can Kiddush be recited over grape juice?",
    answer: "Sample answer (placeholder, not a psak): Grape juice is widely used for Kiddush. A full answer would address whether wine is preferred, when juice is fully acceptable, and differences between Friday night and the day meal. Please ask your rav for a personal ruling.",
    topics: ["shabbos", "yom-tov"]
  },
  {
    id: "qa-04",
    question: "Does ordinary bottled water need a hechsher?",
    answer: "Sample answer (placeholder, not a psak): Plain water is often treated differently from flavored or processed drinks. A full answer would distinguish unflavored water from seltzer and added-ingredient beverages, and note that local practice can vary. Please ask your rav for a personal ruling.",
    topics: ["kashrus", "daily-living"]
  },
  {
    id: "qa-05",
    question: "How do I keep Shabbos when flying across time zones?",
    answer: "Sample answer (placeholder, not a psak): Travel across time zones raises questions about when Shabbos begins and ends. A full answer would depend on the flight path, departure and arrival times, and when twilight is observed. This needs a rav who can work through the itinerary with you.",
    topics: ["shabbos", "jewish-calendar"]
  },
  {
    id: "qa-06",
    question: "May maaser money be given to a close relative?",
    answer: "Sample answer (placeholder, not a psak): Supporting family and giving maaser can overlap, and poskim discuss when a relative is a fitting recipient. A full answer would consider the relative’s need and whether other tzedakah obligations have been met. Please ask your rav for a personal ruling.",
    topics: ["tzedakah", "monetary"]
  },
  {
    id: "qa-07",
    question: "When may a mourner return to work after the burial?",
    answer: "Sample answer (placeholder, not a psak): The days of shivah, and work during that period, follow a set of well-known halachos, with limited exceptions for financial need. A full answer would depend on the mourner’s relationship to the deceased and the type of work. Please ask your rav for a personal ruling.",
    topics: ["mourning"]
  },
  {
    id: "qa-08",
    question: "Is breaking a glass under the chuppah required?",
    answer: "Sample answer (placeholder, not a psak): Breaking a glass is a widespread wedding custom recalling the destruction of the Beis Hamikdash. A full answer would describe the custom’s place in the ceremony and whether it is treated as obligatory practice. Please ask your rav for a personal ruling.",
    topics: ["life-cycle", "marital-family"]
  },
  {
    id: "qa-09",
    question: "May I take medicine on Shabbos for a mild headache?",
    answer: "Sample answer (placeholder, not a psak): Medicine on Shabbos depends on the severity of the condition and the form of the remedy. A full answer would distinguish serious illness from minor discomfort, and prepared liquid or pill forms from crushing or mixing. Please ask your rav for a personal ruling.",
    topics: ["shabbos", "medical"]
  },
  {
    id: "qa-10",
    question: "What bracha is said on granola or a mixed cereal?",
    answer: "Sample answer (placeholder, not a psak): Mixed foods can take the blessing of the main ingredient, or more than one blessing, depending on how they are eaten. A full answer would consider oats, clusters, flakes, and added fruit. Please ask your rav for a personal ruling.",
    topics: ["brachos", "daily-living"]
  },
  {
    id: "qa-11",
    question: "Can mincha still be davened after sunset?",
    answer: "Sample answer (placeholder, not a psak): The close of the mincha window is debated, and some communities are more lenient in pressing circumstances between sunset and nightfall. A full answer would depend on the clock time, the season, and your community’s practice. Please ask your rav for a personal ruling.",
    topics: ["tefillah", "jewish-calendar"]
  },
  {
    id: "qa-12",
    question: "May I cook on Yom Tov for Shabbos if I did not make an eruv tavshilin?",
    answer: "Sample answer (placeholder, not a psak): An eruv tavshilin is the usual way to cook on Yom Tov for Shabbos when the two days meet. A full answer would cover what to do if it was forgotten, who can make it, and until when. Please ask your rav for a personal ruling.",
    topics: ["yom-tov", "shabbos"]
  },
  {
    id: "qa-13",
    question: "Does a sukkah standing under a tree fulfill the mitzvah?",
    answer: "Sample answer (placeholder, not a psak): Sechach generally must be open to the sky, and a tree overhead is a classic problem. A full answer would discuss how much of the sukkah is covered, the density of the branches, and whether the sukkah can be used. Please ask your rav for a personal ruling.",
    topics: ["yom-tov"]
  },
  {
    id: "qa-14",
    question: "Why do we cover our eyes for the first verse of Shema?",
    answer: "Sample answer (placeholder, not a psak): Covering the eyes during the first pasuk is a widespread practice of kavanah, so that one accepts ol malchus Shamayim without distraction. A full answer would describe the custom and when it is done. This is a sample explanation only.",
    topics: ["tefillah", "hashkafa"]
  },
  {
    id: "qa-15",
    question: "May I open a fold-up umbrella on Shabbos?",
    answer: "Sample answer (placeholder, not a psak): Opening a portable umbrella on Shabbos is commonly treated as a problem of making a tent-like covering. A full answer would address umbrellas, strollers, and similar cases. Please ask your rav for a personal ruling.",
    topics: ["shabbos"]
  },
  {
    id: "qa-16",
    question: "What is the earliest time of day for a bris milah?",
    answer: "Sample answer (placeholder, not a psak): A bris is performed by day, and communities often prefer the morning. A full answer would cover the earliest clock time, delaying for a medical reason, and a bris on Shabbos. Please ask your rav for a personal ruling.",
    topics: ["life-cycle", "jewish-calendar"]
  },
  {
    id: "qa-17",
    question: "Must I wash netilas yadayim immediately upon waking?",
    answer: "Sample answer (placeholder, not a psak): Morning netilas yadayim is a well-established daily practice. A full answer would discuss washing before walking four amos, keeping water at the bedside, and what to do if water is not nearby. Please ask your rav for a personal ruling.",
    topics: ["daily-living", "tefillah"]
  },
  {
    id: "qa-18",
    question: "May the same microwave be used for milchig and fleishig foods?",
    answer: "Sample answer (placeholder, not a psak): Shared appliances raise questions of residue, steam, and how food is covered. A full answer would consider dairy and meat use, waiting times, and whether a microwave can be kashered. Please ask your rav for a personal ruling.",
    topics: ["kashrus", "daily-living"]
  },
  {
    id: "qa-19",
    question: "How is maaser calculated on a salary?",
    answer: "Sample answer (placeholder, not a psak): Maaser is commonly taken from net income, though some give from gross and some give a fifth. A full answer would address taxes, deductions, and household expenses. Please ask your rav for a personal ruling.",
    topics: ["tzedakah", "monetary"]
  },
  {
    id: "qa-20",
    question: "May I visit the sick on Shabbos?",
    answer: "Sample answer (placeholder, not a psak): Bikur cholim is a mitzvah, and visiting on Shabbos is often encouraged when it comforts the patient. A full answer would note what not to say, traveling to a hospital, and carrying. Please ask your rav for a personal ruling.",
    topics: ["medical", "shabbos"]
  },
  {
    id: "qa-21",
    question: "May a will assign property differently than din Torah?",
    answer: "Sample answer (placeholder, not a psak): Inheritance in halacha follows a set order, and civil wills sometimes need additional halachic instruments to take effect. A full answer is highly individual and should be prepared with a rav and, where needed, a lawyer familiar with these documents.",
    topics: ["monetary", "life-cycle"]
  },
  {
    id: "qa-22",
    question: "Why is the challah covered during Kiddush?",
    answer: "Sample answer (placeholder, not a psak): Covering the challah during Kiddush is a familiar Shabbos practice, often explained as a matter of honor for the bread and the order of blessings. A full answer would present the usual reasons and when the cover is removed. This is a sample explanation only.",
    topics: ["shabbos", "hashkafa"]
  },
  {
    id: "qa-23",
    question: "May I eat or drink before morning davening?",
    answer: "Sample answer (placeholder, not a psak): Eating a meal before shacharis is generally avoided; drinking and cases of weakness are often treated more leniently. A full answer would distinguish water, coffee, and food, and address someone who is unwell. Please ask your rav for a personal ruling.",
    topics: ["tefillah", "daily-living"]
  },
  {
    id: "qa-24",
    question: "Does a hotel room require a mezuzah?",
    answer: "Sample answer (placeholder, not a psak): A mezuzah depends on the kind of dwelling and how long one stays. A full answer would distinguish a hotel room, a rented apartment, and a longer stay, and who is responsible for affixing it. Please ask your rav for a personal ruling.",
    topics: ["commandments", "daily-living"]
  },
  {
    id: "qa-25",
    question: "What bracha is recited on seeing fruit trees in bloom?",
    answer: "Sample answer (placeholder, not a psak): There is a seasonal blessing said on blossoming fruit trees in the spring, with conditions about when and how often it is said. A full answer would cover the time of year, whether the trees must be fruit-bearing, and if it can be said in a city. Please ask your rav for a personal ruling.",
    topics: ["brachos", "jewish-calendar"]
  }
];

HYEW.sheets = [
  {
    id: "sheet-47",
    number: 47,
    title: "…why we wait six hours between meat and milk?",
    parsha: "Lech Lecha",
    year: "5787",
    date: "Week of 3 November 2026",
    topics: ["kashrus"],
    sponsored: "This week’s paper is sponsored l’iluy nishmas [Name]",
    excerpt: "Most of us learned the rule as small children: after a fleishig meal, we wait six hours before eating anything milchig. Yet the Torah says nothing of a wait, and the Gemara records only the practice of Mar Ukva, who waited “from one meal to the next.” How did that become six hours — and why do some families wait one, or three?",
    featured: true
  },
  {
    id: "sheet-46",
    number: 46,
    title: "…why we cover our eyes for the first pasuk of Shema?",
    parsha: "Bereishis",
    year: "5787",
    date: "Week of 27 October 2026",
    topics: ["tefillah", "hashkafa"],
    excerpt: "A familiar motion: the right hand rises, the eyes are covered, and the first verse of Shema is said. Sample excerpt (placeholder): this week’s paper would look at why the custom took hold, and what it is meant to help us do in those few seconds."
  },
  {
    id: "sheet-45",
    number: 45,
    title: "…why a sukkah may not stand beneath a tree?",
    parsha: "Sukkos",
    year: "5787",
    date: "Week of 6 October 2026",
    topics: ["yom-tov"],
    excerpt: "The sechach must be the roof, and the sky must be above it. Sample excerpt (placeholder): this week’s paper would explain why branches of a tree overhead are a problem, and which cases can still be used."
  },
  {
    id: "sheet-44",
    number: 44,
    title: "…whether you may open an umbrella on Shabbos?",
    parsha: "Ha’azinu",
    year: "5787",
    date: "Week of 29 September 2026",
    topics: ["shabbos"],
    excerpt: "A sudden rain, a fold-up umbrella in the coat closet — and a pause at the door. Sample excerpt (placeholder): this week’s paper would set out why opening an umbrella is commonly avoided on Shabbos, and what people do instead."
  },
  {
    id: "sheet-43",
    number: 43,
    title: "…why we break a glass under the chuppah?",
    parsha: "Vayeilech",
    year: "5787",
    date: "Week of 22 September 2026",
    topics: ["life-cycle", "marital-family"],
    excerpt: "The ceremony ends with a sharp sound and a mazel tov. Sample excerpt (placeholder): this week’s paper would look at why a glass is broken under the chuppah, and what the custom is meant to recall."
  },
  {
    id: "sheet-42",
    number: 42,
    title: "…whether bottled water needs a hechsher?",
    parsha: "Nitzavim",
    year: "5787",
    date: "Week of 15 September 2026",
    topics: ["kashrus", "daily-living"],
    excerpt: "A plastic bottle from a rest-stop cooler seems simple enough. Sample excerpt (placeholder): this week’s paper would distinguish plain water from flavored drinks, and when a hechsher is usually sought."
  }
];
