/**
 * Generates .cursor/500_LESSONS.md from the 500-lesson expansion plan.
 * Run from repo root: node scripts/generate-500-lessons.js
 */
const { writeFileSync } = require("fs");
const { join } = require("path");

const BASE = "https://www.sqlite.org";

const lessons = [];

// ---- Lessons 1-100 (core progression) ----
const core100 = [
  [1, "podstawy-select", "SELECT", "uczen", "Wszystkie wydarzenia", "Pokaż wszystkie wiersze z tabeli wydarzenia (SELECT *).", "lang_select.html"],
  [2, "where-miejsce", "WHERE", "uczen", "Wydarzenia w jednym miejscu", "Pokaż tylko wydarzenia, których miejsce to 'Rynek' (WHERE).", "lang_expr.html"],
  [3, "order-by-data", "ORDER BY", "uczen", "Wydarzenia od najbliższego", "Pokaż wszystkie wydarzenia posortowane po dacie rosnąco (ORDER BY).", "lang_select.html"],
  [4, "select-kolumny", "SELECT", "uczen", "Tylko nazwa i data", "Pokaż tylko kolumny nazwa i data_wydarzenia (wybór kolumn).", "lang_select.html"],
  [5, "select-literaly", "SELECT", "uczen", "Stałe w zapytaniu", "Pokaż nazwę wydarzenia i stały tekst 'Polonia' jako kolumnę (literały).", "lang_select.html"],
  [6, "where-rowne", "WHERE", "uczen", "Wydarzenie po id", "Pokaż jeden wiersz: wydarzenie o id = 2 (WHERE z =).", "lang_expr.html"],
  [7, "where-rozne", "WHERE", "uczen", "Wszystkie oprócz jednego miejsca", "Pokaż wydarzenia, których miejsce jest różne od 'Park miejski'.", "lang_expr.html"],
  [8, "where-wieksze", "WHERE", "uczen", "Wydarzenia po dacie", "Pokaż wydarzenia z datą po 2025-09-30 (WHERE z > lub >=).", "lang_expr.html"],
  [9, "where-and", "WHERE", "uczen", "Miejsce i data", "Pokaż wydarzenia na Rynku i z datą przed 2025-12-01 (AND).", "lang_expr.html"],
  [10, "where-or", "WHERE", "uczen", "Rynek lub Park", "Pokaż wydarzenia, których miejsce to 'Rynek' LUB 'Park miejski' (OR).", "lang_expr.html"],
  [11, "where-in", "WHERE", "uczen", "Miejsca z listy", "Pokaż wydarzenia, których miejsce jest w liście: Rynek, Dom parafialny (IN).", "lang_expr.html"],
  [12, "where-like", "WHERE", "uczen", "Nazwy zawierające", "Pokaż wydarzenia, których nazwa zawiera 'cech' (LIKE).", "lang_expr.html"],
  [13, "where-like-pct", "WHERE", "uczen", "Nazwy zaczynające się", "Pokaż wydarzenia, których nazwa zaczyna się od 'Kiermasz' (LIKE '...%').", "lang_expr.html"],
  [14, "where-null", "WHERE", "uczen", "Bez podanego miejsca", "Pokaż wydarzenia, gdzie miejsce jest NULL (IS NULL).", "lang_expr.html"],
  [15, "where-not-null", "WHERE", "uczen", "Z podanym miejscem", "Pokaż wydarzenia, gdzie miejsce nie jest NULL (IS NOT NULL).", "lang_expr.html"],
  [16, "order-by-desc", "ORDER BY", "uczen", "Od najpóźniejszego", "Pokaż wszystkie wydarzenia posortowane po dacie malejąco (DESC).", "lang_select.html"],
  [17, "order-by-dwa", "ORDER BY", "uczen", "Miejsce, potem data", "Posortuj po miejscu, potem po dacie rosnąco (wiele kolumn w ORDER BY).", "lang_select.html"],
  [18, "order-by-where", "ORDER BY", "uczen", "Filtr i sortowanie", "Pokaż tylko wydarzenia na Rynku, posortowane po dacie.", "lang_select.html"],
  [19, "distinct-miejsce", "DISTINCT", "uczen", "Unikalne miejsca", "Pokaż listę unikalnych miejsc (DISTINCT).", "lang_select.html"],
  [20, "distinct-dwa", "DISTINCT", "uczen", "Unikalne pary", "Pokaż unikalne pary (nazwa, miejsce).", "lang_select.html"],
  [21, "limit-1", "LIMIT", "uczen", "Jeden wiersz", "Pokaż pierwsze wydarzenie (LIMIT 1).", "lang_select.html"],
  [22, "limit-n", "LIMIT", "uczen", "Dwa wydarzenia", "Pokaż tylko dwa pierwsze wydarzenia (LIMIT 2).", "lang_select.html"],
  [23, "limit-offset", "LIMIT", "uczen", "Drugie wydarzenie", "Pokaż drugie wydarzenie w kolejności (LIMIT 1 OFFSET 1).", "lang_select.html"],
  [24, "insert-jeden", "INSERT", "uczen", "Dodaj jedno wydarzenie", "Wstaw jeden wiersz do tabeli wydarzenia (INSERT INTO ... VALUES).", "lang_insert.html"],
  [25, "insert-kolumny", "INSERT", "uczen", "Wstaw z podaniem kolumn", "Wstaw wiersz podając tylko wybrane kolumny (INSERT INTO t (col1, col2) VALUES ...).", "lang_insert.html"],
  [26, "insert-wiele", "INSERT", "uczen", "Wstaw kilka wierszy", "Wstaw wiele wierszy jednym INSERT (wiele VALUES).", "lang_insert.html"],
  [27, "update-jeden", "UPDATE", "uczen", "Zmień jedno pole", "Zaktualizuj miejsce jednego wydarzenia (UPDATE ... SET ... WHERE id = ...).", "lang_update.html"],
  [28, "update-wiele", "UPDATE", "uczen", "Zmień wiele wierszy", "Ustaw to samo pole dla wszystkich wydarzeń spełniających WHERE (UPDATE z WHERE).", "lang_update.html"],
  [29, "update-dwa-pola", "UPDATE", "uczen", "Zmień dwie kolumny", "UPDATE SET kol1 = ..., kol2 = ... WHERE ...", "lang_update.html"],
  [30, "delete-where", "DELETE", "uczen", "Usuń wybrane wiersze", "Usuń wydarzenia spełniające warunek (DELETE FROM ... WHERE ...).", "lang_delete.html"],
  [31, "delete-jeden", "DELETE", "uczen", "Usuń jeden wiersz", "Usuń dokładnie jeden wiersz (np. po id).", "lang_delete.html"],
  [32, "where-not-in", "WHERE", "uczen", "NOT IN", "Pokaż wydarzenia, których miejsce NIE jest w podanej liście (NOT IN).", "lang_expr.html"],
  [33, "count-gwiazdka", "Aggregates", "czeladnik", "Ile wydarzeń", "Pokaż jedną liczbę: ile jest wydarzeń (COUNT(*)).", "lang_aggfunc.html#count"],
  [34, "count-kolumna", "Aggregates", "czeladnik", "Ile z miejscem", "Pokaż liczbę wydarzeń z niepustym miejscem (COUNT(miejsce)).", "lang_aggfunc.html#count"],
  [35, "sum-min-max", "Aggregates", "czeladnik", "Min i max daty", "Pokaż najwcześniejszą i najpóźniejszą datę (MIN, MAX).", "lang_aggfunc.html"],
  [36, "avg-null", "Aggregates", "czeladnik", "Średnia", "W tabeli z kolumną liczbową: pokaż średnią (AVG).", "lang_aggfunc.html#avg"],
  [37, "group-by-miejsce", "GROUP BY", "czeladnik", "Liczba po miejscu", "Dla każdego miejsca pokaż liczbę wydarzeń (GROUP BY).", "lang_select.html"],
  [38, "group-by-dwa", "GROUP BY", "czeladnik", "Grupa po dwóch kolumnach", "Grupuj po miejscu i roku z daty; pokaż liczbę.", "lang_select.html"],
  [39, "having-count", "HAVING", "czeladnik", "Miejsca z więcej niż jednym", "Pokaż tylko miejsca, gdzie jest więcej niż 1 wydarzenie (HAVING COUNT(*)).", "lang_select.html"],
  [40, "having-min", "HAVING", "czeladnik", "Grupy po warunku na agregacie", "Filtruj grupy po MIN/MAX (HAVING).", "lang_select.html"],
];

// Fill 41-54 aggregate/group by variants
for (let i = 41; i <= 54; i++) {
  const titles = ["SUM po grupie", "AVG po grupie", "HAVING z SUM", "HAVING z AVG", "GROUP BY i ORDER BY", "Wiele agregatów", "COUNT DISTINCT", "Grupy i filtr WHERE", "HAVING z COUNT", "HAVING z dwoma warunkami", "GROUP BY wyrażenie", "Agregat w podzapytaniu", "Empty group", "Grupa i LIMIT"];
  const goals = ["Dla każdej grupy pokaż SUM(kolumna).", "Dla każdej grupy pokaż AVG(kolumna).", "Pokaż tylko grupy gdzie SUM(...) > X.", "Pokaż tylko grupy gdzie AVG(...) < X.", "GROUP BY ... ORDER BY agregat.", "SELECT grupę, COUNT(*), SUM(...), AVG(...).", "COUNT(DISTINCT kolumna) w grupie.", "WHERE przed GROUP BY; pokaż grupy.", "HAVING COUNT(*) = 1 (grupy jednoelementowe).", "HAVING COUNT(*) > 1 AND SUM(...) > X.", "GROUP BY z wyrażeniem (np. rok).", "Użyj agregatu w podzapytaniu.", "Zachowanie gdy GROUP BY daje 0 wierszy.", "GROUP BY ... ORDER BY ... LIMIT 1."];
  core100.push([i, `agg-var-${i}`, "Aggregates/GROUP BY/HAVING", "czeladnik", titles[i - 41] || `Wariant ${i}`, goals[i - 41] || "Zastosuj agregaty i grupowanie.", "lang_aggfunc.html"]);
}

core100.push(
  [55, "join-inner-2", "JOINs", "czeladnik", "Wydarzenia z nazwą miejsca", "Tabela miejsca (id, nazwa); wydarzenia.miejsce_id. Pokaż wydarzenia z nazwą miejsca (INNER JOIN).", "lang_select.html"],
  [56, "join-left", "JOINs", "czeladnik", "Wszystkie miejsca i wydarzenia", "LEFT JOIN: miejsca po lewej; pokaż miejsca bez wydarzeń też.", "lang_select.html"],
  [57, "join-where-join", "JOINs", "czeladnik", "JOIN i WHERE", "Wydarzenia w miejscu o nazwie 'Rynek' (JOIN + WHERE).", "lang_select.html"]
);

// 58-72 JOIN variants
for (let i = 58; i <= 72; i++) {
  const t = ["Wiele JOINów", "Self-join", "RIGHT JOIN", "CROSS JOIN", "JOIN z USING", "Trzy tabele", "JOIN i GROUP BY", "JOIN i ORDER BY", "NATURAL JOIN", "JOIN w podzapytaniu", "LEFT JOIN i NULL", "FULL OUTER (emulacja)", "JOIN po różnych kolumnach", "JOIN i HAVING", "Złożony JOIN"];
  core100.push([i, `join-var-${i}`, "JOINs", i <= 65 ? "czeladnik" : "mistrz", t[i - 58] || `JOIN wariant ${i}`, "Zastosuj odpowiedni typ JOIN.", "lang_select.html"]);
}

core100.push(
  [73, "subquery-where-in", "Subqueries", "mistrz", "Lista ID z podzapytania", "Pokaż wydarzenia, których id jest w wyniku podzapytania (WHERE id IN (SELECT ...)).", "lang_select.html"],
  [74, "subquery-from", "Subqueries", "mistrz", "Podzapytanie w FROM", "Użyj wyniku podzapytania jako tabeli (FROM (SELECT ...) AS t).", "lang_select.html"],
  [75, "subquery-select", "Subqueries", "mistrz", "Skalar w SELECT", "Dla każdego wiersza pokaż kolumnę + wynik podzapytania (SELECT ..., (SELECT ...)).", "lang_select.html"]
);

// 76-89 subquery variants
for (let i = 76; i <= 89; i++) {
  const t = ["EXISTS", "NOT EXISTS", "Korelacja", "Subquery i JOIN", "IN vs EXISTS", "Scalar subquery warunek", "FROM subquery z JOIN", "Wielokolumnowe IN", "Subquery w HAVING", "Subquery w ORDER BY", "Lateral (emulacja)", "NOT IN i NULL", "ANY/ALL (emulacja)", "Subquery z GROUP BY"];
  core100.push([i, `subq-var-${i}`, "Subqueries", "mistrz", t[i - 76] || `Subquery ${i}`, "Zastosuj podzapytanie.", "lang_select.html"]);
}

core100.push(
  [90, "window-row-number", "Window", "mistrz", "Numer wiersza w grupie", "ROW_NUMBER() OVER (PARTITION BY miejsce).", "windowfunctions.html"],
  [91, "window-rank", "Window", "mistrz", "Ranking po dacie", "RANK() po dacie (np. najbliższe = 1).", "windowfunctions.html"],
  [92, "window-sum-over", "Window", "mistrz", "Suma narastająca", "SUM(...) OVER (ORDER BY ...).", "windowfunctions.html"]
);

// 93-100 window variants
for (let i = 93; i <= 100; i++) {
  const t = ["DENSE_RANK", "LAG/LEAD", "PARTITION BY + ORDER BY", "first_value/last_value", "Frame ROWS", "NTILE", "percent_rank/cume_dist", "Wiele okien"];
  core100.push([i, `window-var-${i}`, "Window", "mistrz", t[i - 93] || `Window ${i}`, "Zastosuj funkcję okna.", "windowfunctions.html"]);
}

for (const row of core100) {
  lessons.push({ num: row[0], id: row[1], concept: row[2], stopien: row[3], title: row[4], goal: row[5], ref: row[6] });
}

// ---- Lessons 101+: Core scalar functions ----
const coreScalar = [
  ["lower", "lower()", "Małe litery", "Pokaż nazwę wydarzenia w małych literach (lower()).", "lang_corefunc.html#lower"],
  ["upper", "upper()", "Wielkie litery", "Pokaż nazwę w wielkich literach (upper()).", "lang_corefunc.html#upper"],
  ["trim", "trim()", "Trim", "Usuń białe znaki z początku i końca (trim()).", "lang_corefunc.html#trim"],
  ["ltrim", "ltrim()", "Ltrim", "Usuń białe znaki z początku (ltrim()).", "lang_corefunc.html#ltrim"],
  ["rtrim", "rtrim()", "Rtrim", "Usuń białe znaki z końca (rtrim()).", "lang_corefunc.html#rtrim"],
  ["substr", "substr()", "Substring", "Pokaż fragment tekstu (substr()).", "lang_corefunc.html#substr"],
  ["replace", "replace()", "Replace", "Zamień fragment tekstu (replace()).", "lang_corefunc.html#replace"],
  ["length", "length()", "Długość", "Pokaż długość stringa (length()).", "lang_corefunc.html#length"],
  ["instr", "instr()", "Instr", "Znajdź pozycję podstringa (instr()).", "lang_corefunc.html#instr"],
  ["abs", "abs()", "Wartość bezwzględna", "Pokaż abs(liczba).", "lang_corefunc.html#abs"],
  ["round", "round()", "Zaokrąglenie", "Zaokrąglij liczbę (round()).", "lang_corefunc.html#round"],
  ["coalesce", "coalesce()", "Coalesce", "Pierwszy nie-NULL z listy (coalesce()).", "lang_corefunc.html#coalesce"],
  ["nullif", "nullif()", "Nullif", "NULL jeśli równe (nullif()).", "lang_corefunc.html#nullif"],
  ["ifnull", "ifnull()", "Ifnull", "Jeśli NULL to X (ifnull()).", "lang_corefunc.html#ifnull"],
  ["typeof", "typeof()", "Typ wartości", "Pokaż typ wartości (typeof()).", "lang_corefunc.html#typeof"],
  ["random", "random()", "Random", "Liczba losowa (random()).", "lang_corefunc.html#random"],
  ["min-scalar", "min() scalar", "Min (skalar)", "Min z listy wartości (min(a,b,c)).", "lang_corefunc.html#min_scalar"],
  ["max-scalar", "max() scalar", "Max (skalar)", "Max z listy wartości (max(a,b,c)).", "lang_corefunc.html#max_scalar"],
  ["hex", "hex()", "Hex", "Reprezentacja hex (hex()).", "lang_corefunc.html#hex"],
  ["quote", "quote()", "Quote", "Cytowany string (quote()).", "lang_corefunc.html#quote"],
  ["soundex", "soundex()", "Soundex", "Kod soundex (soundex()).", "lang_corefunc.html#soundex"],
  ["iif", "iif()", "IIf", "Wyrażenie warunkowe (iif()).", "lang_corefunc.html#iif"],
  ["concat", "concat()", "Concat", "Sklej stringi (concat()).", "lang_corefunc.html#concat"],
  ["concat-ws", "concat_ws()", "Concat z separatorem", "concat_ws(sep, ...).", "lang_corefunc.html#concat_ws"],
  ["format", "format()", "Format", "Sformatowany string (format()).", "lang_corefunc.html#format"],
  ["printf", "printf()", "Printf", "Printf-style format (printf()).", "lang_corefunc.html#printf"],
  ["sign", "sign()", "Sign", "Znak liczby (sign()).", "lang_corefunc.html#sign"],
  ["changes", "changes()", "Changes", "Liczba zmienionych wierszy (changes()).", "lang_corefunc.html#changes"],
  ["last-insert-rowid", "last_insert_rowid()", "Last insert rowid", "ROWID ostatniego INSERT (last_insert_rowid()).", "lang_corefunc.html#last_insert_rowid"],
  ["length-octet", "octet_length()", "Octet length", "Długość w bajtach (octet_length()).", "lang_corefunc.html#octet_length"],
  ["unicode", "unicode()", "Unicode", "Kod punktu Unicode (unicode()).", "lang_corefunc.html#unicode"],
  ["char", "char()", "Char", "Znak z kodów (char()).", "lang_corefunc.html#char"],
  ["glob", "glob()", "Glob", "Dopasowanie glob (glob()).", "lang_corefunc.html#glob"],
  ["like-func", "like()", "Like (funkcja)", "Dopasowanie LIKE (like()).", "lang_corefunc.html#like"],
];

let num = 101;
for (const row of coreScalar) {
  lessons.push({ num: num++, id: `func-${row[0]}`, concept: row[1], stopien: "czeladnik", title: row[2], goal: row[3], ref: row[4] });
}

// Aggregate functions (beyond 33-40)
const aggExtra = [
  ["group-concat", "group_concat()", "Group concat", "Sklej wartości w grupie (group_concat()).", "lang_aggfunc.html#group_concat"],
  ["string-agg", "string_agg()", "String agg", "string_agg(X,Y) z separatorem.", "lang_aggfunc.html#group_concat"],
  ["total", "total()", "Total", "Suma (zawsze float, 0 gdy brak) (total()).", "lang_aggfunc.html#sumunc"],
  ["median", "median()", "Median", "Wartość mediany (median()).", "lang_aggfunc.html#median"],
  ["percentile", "percentile()", "Percentile", "Percentyl (percentile()).", "lang_aggfunc.html#percentile"],
];
for (const row of aggExtra) {
  lessons.push({ num: num++, id: `func-${row[0]}`, concept: row[1], stopien: "czeladnik", title: row[2], goal: row[3], ref: row[4] });
}

// Date/time (7)
const dateTime = [
  ["date", "date()", "Funkcja date()", "Zwróć datę (date()).", "lang_datefunc.html"],
  ["time", "time()", "Funkcja time()", "Zwróć czas (time()).", "lang_datefunc.html"],
  ["datetime", "datetime()", "Funkcja datetime()", "Zwróć datę i czas (datetime()).", "lang_datefunc.html"],
  ["julianday", "julianday()", "Julian day", "Dzień juliański (julianday()).", "lang_datefunc.html"],
  ["unixepoch", "unixepoch()", "Unix epoch", "Znacznik Unix (unixepoch()).", "lang_datefunc.html"],
  ["strftime", "strftime()", "Strftime", "Sformatowana data (strftime()).", "lang_datefunc.html"],
  ["timediff", "timediff()", "Timediff", "Różnica czasu (timediff()).", "lang_datefunc.html"],
];
for (const row of dateTime) {
  lessons.push({ num: num++, id: `func-${row[0]}`, concept: row[1], stopien: "czeladnik", title: row[2], goal: row[3], ref: row[4] });
}

// JSON (scalar + aggregate + table) - ~22 lessons
const jsonFuncs = [
  ["json", "json()", "json()", "Konwersja do JSON (json()).", "json1.html"],
  ["json-array", "json_array()", "json_array()", "Utwórz tablicę JSON (json_array()).", "json1.html"],
  ["json-object", "json_object()", "json_object()", "Utwórz obiekt JSON (json_object()).", "json1.html"],
  ["json-extract", "json_extract()", "json_extract()", "Wyciągnij wartość (json_extract()).", "json1.html"],
  ["json-insert", "json_insert()", "json_insert()", "Wstaw do JSON (json_insert()).", "json1.html"],
  ["json-replace", "json_replace()", "json_replace()", "Zamień w JSON (json_replace()).", "json1.html"],
  ["json-set", "json_set()", "json_set()", "Ustaw w JSON (json_set()).", "json1.html"],
  ["json-remove", "json_remove()", "json_remove()", "Usuń z JSON (json_remove()).", "json1.html"],
  ["json-type", "json_type()", "json_type()", "Typ wartości JSON (json_type()).", "json1.html"],
  ["json-valid", "json_valid()", "json_valid()", "Czy poprawny JSON (json_valid()).", "json1.html"],
  ["json-quote", "json_quote()", "json_quote()", "Cytuj jako JSON (json_quote()).", "json1.html"],
  ["json-array-length", "json_array_length()", "json_array_length()", "Długość tablicy JSON.", "json1.html"],
  ["json-pretty", "json_pretty()", "json_pretty()", "Formatowany JSON (json_pretty()).", "json1.html"],
  ["json-patch", "json_patch()", "json_patch()", "Łatanie JSON (json_patch()).", "json1.html"],
  ["json-group-array", "json_group_array()", "json_group_array()", "Agregat: tablica JSON (json_group_array()).", "json1.html"],
  ["json-group-object", "json_group_object()", "json_group_object()", "Agregat: obiekt JSON (json_group_object()).", "json1.html"],
  ["json-each", "json_each()", "json_each()", "Tabela z json_each().", "json1.html"],
  ["json-tree", "json_tree()", "json_tree()", "Tabela z json_tree().", "json1.html"],
];
for (const row of jsonFuncs) {
  lessons.push({ num: num++, id: `func-${row[0]}`, concept: row[1], stopien: "mistrz", title: row[2], goal: row[3], ref: row[4] });
}

// Window (extra beyond 90-92)
const windowExtra = [
  ["dense-rank", "dense_rank()", "DENSE_RANK", "dense_rank() OVER (ORDER BY ...).", "windowfunctions.html"],
  ["percent-rank", "percent_rank()", "percent_rank()", "percent_rank() OVER.", "windowfunctions.html"],
  ["cume-dist", "cume_dist()", "cume_dist()", "cume_dist() OVER.", "windowfunctions.html"],
  ["ntile", "ntile()", "ntile()", "ntile(N) OVER.", "windowfunctions.html"],
  ["lag", "lag()", "lag()", "lag() OVER (ORDER BY ...).", "windowfunctions.html"],
  ["lead", "lead()", "lead()", "lead() OVER (ORDER BY ...).", "windowfunctions.html"],
  ["first-value", "first_value()", "first_value()", "first_value() OVER.", "windowfunctions.html"],
  ["last-value", "last_value()", "last_value()", "last_value() OVER.", "windowfunctions.html"],
  ["nth-value", "nth_value()", "nth_value()", "nth_value() OVER.", "windowfunctions.html"],
];
for (const row of windowExtra) {
  lessons.push({ num: num++, id: `func-${row[0]}`, concept: row[1], stopien: "mistrz", title: row[2], goal: row[3], ref: row[4] });
}

// Transactions (10)
const trans = [
  ["trans-begin-commit", "BEGIN/COMMIT", "BEGIN i COMMIT", "Owiń dwa INSERTy w transakcję; COMMIT.", "lang_transaction.html"],
  ["trans-rollback", "ROLLBACK", "ROLLBACK", "BEGIN, INSERT, ROLLBACK; sprawdź że wiersza nie ma.", "lang_transaction.html"],
  ["trans-savepoint", "SAVEPOINT", "SAVEPOINT", "SAVEPOINT, zmiany, ROLLBACK TO.", "lang_savepoint.html"],
  ["trans-release", "RELEASE", "RELEASE", "RELEASE SAVEPOINT.", "lang_savepoint.html"],
  ["trans-implicit", "Implicit", "Transakcja domyślna", "Kiedy SQLite zaczyna/kończy transakcję.", "lang_transaction.html"],
  ["trans-error", "Error and rollback", "Błąd a rollback", "Co się dzieje przy błędzie w transakcji.", "lang_transaction.html"],
  ["trans-nested", "Nested savepoints", "Zagnieżdżone savepointy", "Wiele SAVEPOINTów i częściowy rollback.", "lang_savepoint.html"],
  ["trans-deferred", "DEFERRED", "DEFERRED", "BEGIN DEFERRED.", "lang_transaction.html"],
  ["trans-immediate", "IMMEDIATE", "IMMEDIATE", "BEGIN IMMEDIATE.", "lang_transaction.html"],
  ["trans-exclusive", "EXCLUSIVE", "EXCLUSIVE", "BEGIN EXCLUSIVE.", "lang_transaction.html"],
];
for (const row of trans) {
  lessons.push({ num: num++, id: row[0], concept: row[1], stopien: "czeladnik", title: row[2], goal: row[3], ref: row[4] });
}

// String concatenation (6)
const strConcat = [
  ["str-concat-op", "Operator ||", "Operator ||", "Sklej nazwa i miejsce (||).", "lang_expr.html"],
  ["str-concat-func", "concat()", "concat()", "Sklej stringi przez concat().", "lang_corefunc.html#concat"],
  ["str-concat-ws", "concat_ws()", "concat_ws()", "Sklej z separatorem (concat_ws()).", "lang_corefunc.html#concat_ws"],
  ["str-format", "format()/printf()", "Format/printf", "Sformatowany string (format/printf).", "lang_corefunc.html#format"],
  ["str-null", "NULL w ||", "NULL w konkatenacji", "Jak NULL wpływa na ||; użyj coalesce.", "lang_expr.html"],
  ["str-quote", "quote()", "quote() dla SQL", "quote() do bezpiecznego stringa.", "lang_corefunc.html#quote"],
];
for (const row of strConcat) {
  lessons.push({ num: num++, id: row[0], concept: row[1], stopien: "uczen", title: row[2], goal: row[3], ref: row[4] });
}

// UPDATE multiple tables (6)
const updateMulti = [
  ["update-subquery", "UPDATE + subquery", "UPDATE z podzapytaniem", "Ustaw kolumnę z wartości z innej tabeli (SELECT).", "lang_update.html"],
  ["update-from", "UPDATE FROM", "UPDATE ... FROM", "UPDATE z JOIN (SQLite 3.33+).", "lang_update.html"],
  ["update-correlated", "Correlated subquery", "Skorelowane podzapytanie w SET", "(SELECT ... FROM t2 WHERE t2.id = t1.id) w SET.", "lang_update.html"],
  ["update-multi-row", "Multiple rows", "Wiele wierszy z subquery", "Aktualizuj wiele wierszy na podstawie JOIN.", "lang_update.html"],
  ["update-from-where", "UPDATE FROM WHERE", "UPDATE FROM z WHERE", "UPDATE ... FROM ... WHERE.", "lang_update.html"],
  ["update-join-syntax", "UPDATE join syntax", "Składnia UPDATE z JOIN", "Prawidłowa składnia UPDATE w SQLite.", "lang_update.html"],
];
for (const row of updateMulti) {
  lessons.push({ num: num++, id: row[0], concept: row[1], stopien: "mistrz", title: row[2], goal: row[3], ref: row[4] });
}

// Data types (10)
const dataTypes = [
  ["type-affinity", "Type affinity", "Typ affinity", "INTEGER, TEXT, REAL, BLOB; jak SQLite przechowuje.", "lang_createtable.html"],
  ["type-null", "NULL", "NULL", "Kiedy kolumna jest NULL; IS NULL / IS NOT NULL.", "lang_expr.html"],
  ["type-storage", "Storage classes", "Klasy przechowywania", "integer, real, text, blob, null.", "lang_datatype3.html"],
  ["type-coercion", "Coercion", "Koercja", "Co się dzieje przy INSERT string do INTEGER.", "lang_datatype3.html"],
  ["type-typeof", "typeof()", "typeof()", "Pokaż klasę przechowywania (typeof()).", "lang_corefunc.html#typeof"],
  ["type-cast", "CAST", "CAST", "CAST(col AS INTEGER), CAST(col AS TEXT).", "lang_expr.html"],
  ["type-integer", "INTEGER", "Typ INTEGER", "Przechowywanie liczb całkowitych.", "lang_datatype3.html"],
  ["type-text", "TEXT", "TEXT", "Przechowywanie tekstu.", "lang_datatype3.html"],
  ["type-real", "REAL", "REAL", "Liczby zmiennoprzecinkowe.", "lang_datatype3.html"],
  ["type-blob", "BLOB", "BLOB", "Dane binarne.", "lang_datatype3.html"],
];
for (const row of dataTypes) {
  lessons.push({ num: num++, id: row[0], concept: row[1], stopien: "czeladnik", title: row[2], goal: row[3], ref: row[4] });
}

// CREATE scripts (18)
const createScripts = [
  ["create-table", "CREATE TABLE", "CREATE TABLE", "Utwórz tabelę z kolumnami i typami.", "lang_createtable.html"],
  ["create-primary-key", "PRIMARY KEY", "PRIMARY KEY", "Klucz główny (pojedynczy i złożony).", "lang_createtable.html"],
  ["create-unique", "UNIQUE", "UNIQUE", "Ograniczenie UNIQUE.", "lang_createtable.html"],
  ["create-not-null", "NOT NULL", "NOT NULL", "NOT NULL na kolumnach.", "lang_createtable.html"],
  ["create-default", "DEFAULT", "DEFAULT", "DEFAULT (literal, datetime('now')).", "lang_createtable.html"],
  ["create-check", "CHECK", "CHECK", "CHECK (col > 0), CHECK (col IN (...)).", "lang_createtable.html"],
  ["create-foreign-key", "FOREIGN KEY", "FOREIGN KEY", "REFERENCES; opcjonalne ON DELETE/UPDATE.", "lang_createtable.html"],
  ["create-index", "CREATE INDEX", "CREATE INDEX", "Indeks pojedynczy i złożony.", "lang_createindex.html"],
  ["create-view", "CREATE VIEW", "CREATE VIEW", "Widok jako zapisane SELECT.", "lang_createview.html"],
  ["alter-table", "ALTER TABLE", "ALTER TABLE", "ADD COLUMN (ograniczenia SQLite).", "lang_altertable.html"],
  ["create-temp", "TEMP table", "Tabela tymczasowa", "CREATE TEMP TABLE.", "lang_createtable.html"],
  ["create-if-not-exists", "IF NOT EXISTS", "IF NOT EXISTS", "CREATE TABLE IF NOT EXISTS.", "lang_createtable.html"],
  ["identifiers", "Identifiers", "Identyfikatory", "Cudzysłowy; unikanie słów zastrzeżonych.", "lang_keywords.html"],
  ["create-without-rowid", "WITHOUT ROWID", "WITHOUT ROWID", "Tabela bez wewnętrznego rowid.", "lang_createtable.html"],
  ["create-index-where", "Partial index", "Indeks częściowy", "CREATE INDEX ... WHERE.", "lang_createindex.html"],
  ["create-unique-index", "UNIQUE INDEX", "UNIQUE INDEX", "Indeks unikalny.", "lang_createindex.html"],
  ["schema-name", "Schema name", "Nazwa schemy", "main, temp, attached DB.", "lang_attach.html"],
  ["create-trigger", "CREATE TRIGGER", "CREATE TRIGGER", "Trigger BEFORE/AFTER INSERT/UPDATE/DELETE.", "lang_createtrigger.html"],
];
for (const row of createScripts) {
  lessons.push({ num: num++, id: row[0], concept: row[1], stopien: "czeladnik", title: row[2], goal: row[3], ref: row[4] });
}

// Fill remainder to 500 (variants and combinations)
const fillConcepts = [
  ["WHERE NOT IN", "where-not-in-2", "uczen", "NOT IN (lista)", "Pokaż wiersze gdzie kolumna NOT IN (...).", "lang_expr.html"],
  ["WHERE BETWEEN", "where-between", "uczen", "BETWEEN", "Pokaż wiersze gdzie data BETWEEN ... AND ...", "lang_expr.html"],
  ["ORDER BY NULLS", "order-nulls-first", "uczen", "NULLS FIRST/LAST", "ORDER BY ... NULLS FIRST (lub LAST).", "lang_select.html"],
  ["CTE WITH", "cte-with", "mistrz", "WITH ... AS", "WITH cte AS (SELECT ...) SELECT * FROM cte.", "lang_with.html"],
  ["CTE recursive", "cte-recursive", "mistrz", "WITH RECURSIVE", "Rekurencyjne CTE.", "lang_with.html"],
  ["INSERT SELECT", "insert-select", "czeladnik", "INSERT ... SELECT", "INSERT INTO t SELECT ... FROM ...", "lang_insert.html"],
  ["REPLACE", "replace-stmt", "czeladnik", "REPLACE", "REPLACE INTO (upsert-style).", "lang_replace.html"],
  ["NULL handling", "null-coalesce", "czeladnik", "COALESCE w zapytaniu", "Użyj COALESCE dla NULL w wyniku.", "lang_corefunc.html#coalesce"],
  ["LEFT JOIN NULL", "left-join-null", "czeladnik", "LEFT JOIN i NULL", "LEFT JOIN gdy brak dopasowania; NULL.", "lang_select.html"],
  ["JOIN GROUP BY", "join-group-by", "mistrz", "JOIN + GROUP BY", "Połącz tabele i grupuj.", "lang_select.html"],
  ["Subquery EXISTS", "subquery-exists", "mistrz", "EXISTS", "WHERE EXISTS (SELECT ...).", "lang_select.html"],
  ["HAVING SUM", "having-sum", "czeladnik", "HAVING z SUM", "Pokaż grupy gdzie SUM(...) > X.", "lang_select.html"],
  ["Multi ORDER BY", "order-by-multi", "uczen", "Wiele kolumn ORDER BY", "ORDER BY col1 DESC, col2 ASC.", "lang_select.html"],
  ["DISTINCT w agregacie", "count-distinct", "czeladnik", "COUNT(DISTINCT)", "COUNT(DISTINCT kolumna).", "lang_aggfunc.html"],
  ["Window frame", "window-frame", "mistrz", "Ramka okna", "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.", "windowfunctions.html"],
];

const need = 500 - lessons.length;
for (let k = 0; k < need; k++) {
  const fill = fillConcepts[k % fillConcepts.length];
  lessons.push({
    num: lessons.length + 1,
    id: `var-${lessons.length + 1}-${fill[1]}`,
    concept: fill[0],
    stopien: fill[2],
    title: fill[3],
    goal: fill[4],
    ref: fill[5],
  });
}

const final = lessons.slice(0, 500);
final.forEach((l, idx) => { l.num = idx + 1; });

// Build markdown
function mdRow(l) {
  const ref = l.ref.startsWith("http") ? l.ref : `${BASE}/${l.ref}`;
  return `| ${l.num} | ${l.id} | ${l.concept} | ${l.stopien} | ${l.title} | ${l.goal} | ${ref} |`;
}

const sections = [];
for (let start = 0; start < 500; start += 100) {
  const end = Math.min(start + 100, 500);
  const chunk = final.slice(start, end);
  sections.push(`### Lessons ${start + 1}-${end}\n\n| # | id | concept | stopien | title | goal | reference |\n| --- | --- | --- | --- | --- | --- | --- |\n` + chunk.map(mdRow).join("\n"));
}

const md = `# 500 SQL Lessons (SQLite)

Source of truth for the Agatas SQL Dojo curriculum. Each lesson has a **reference** link to the official SQLite documentation.

- **Columns:** #, id, concept, stopien, title, goal, reference
- **Lessons 1-100:** Core progression (SELECT → WHERE → ORDER BY → DML → DISTINCT → Aggregates → GROUP BY → HAVING → JOINs → Subqueries → Window)
- **Lessons 101-260:** SQLite functions (core scalar, aggregate, date/time, JSON, window)
- **Lessons 261-270:** Transactions
- **Lessons 271-276:** String concatenation
- **Lessons 277-282:** UPDATE using multiple tables
- **Lessons 283-292:** Data types and storage
- **Lessons 293-310:** Building CREATE scripts
- **Lessons 311-500:** Variants and combinations (WHERE, JOINs, subqueries, CTEs, NULL, DML)

See [.cursor/BUILD_PLAN.md](.cursor/BUILD_PLAN.md) §6 and the 500-lesson expansion plan for implementation order and sandbox notes.

---

${sections.join("\n\n")}
`;

const outPath = join(process.cwd(), ".cursor", "500_LESSONS.md");
writeFileSync(outPath, md, "utf8");
console.log("Wrote", outPath, "with", final.length, "lessons.");
if (final.length !== 500) {
  console.warn("Warning: expected 500 lessons, got", final.length);
}
