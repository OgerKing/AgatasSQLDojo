# 500 SQL Lessons (SQLite)

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

### Lessons 1-100

| # | id | concept | stopien | title | goal | reference |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | podstawy-select | SELECT | uczen | Wszystkie wydarzenia | Pokaż wszystkie wiersze z tabeli wydarzenia (SELECT *). | https://www.sqlite.org/lang_select.html |
| 2 | where-miejsce | WHERE | uczen | Wydarzenia w jednym miejscu | Pokaż tylko wydarzenia, których miejsce to 'Rynek' (WHERE). | https://www.sqlite.org/lang_expr.html |
| 3 | order-by-data | ORDER BY | uczen | Wydarzenia od najbliższego | Pokaż wszystkie wydarzenia posortowane po dacie rosnąco (ORDER BY). | https://www.sqlite.org/lang_select.html |
| 4 | select-kolumny | SELECT | uczen | Tylko nazwa i data | Pokaż tylko kolumny nazwa i data_wydarzenia (wybór kolumn). | https://www.sqlite.org/lang_select.html |
| 5 | select-literaly | SELECT | uczen | Stałe w zapytaniu | Pokaż nazwę wydarzenia i stały tekst 'Polonia' jako kolumnę (literały). | https://www.sqlite.org/lang_select.html |
| 6 | where-rowne | WHERE | uczen | Wydarzenie po id | Pokaż jeden wiersz: wydarzenie o id = 2 (WHERE z =). | https://www.sqlite.org/lang_expr.html |
| 7 | where-rozne | WHERE | uczen | Wszystkie oprócz jednego miejsca | Pokaż wydarzenia, których miejsce jest różne od 'Park miejski'. | https://www.sqlite.org/lang_expr.html |
| 8 | where-wieksze | WHERE | uczen | Wydarzenia po dacie | Pokaż wydarzenia z datą po 2025-09-30 (WHERE z > lub >=). | https://www.sqlite.org/lang_expr.html |
| 9 | where-and | WHERE | uczen | Miejsce i data | Pokaż wydarzenia na Rynku i z datą przed 2025-12-01 (AND). | https://www.sqlite.org/lang_expr.html |
| 10 | where-or | WHERE | uczen | Rynek lub Park | Pokaż wydarzenia, których miejsce to 'Rynek' LUB 'Park miejski' (OR). | https://www.sqlite.org/lang_expr.html |
| 11 | where-in | WHERE | uczen | Miejsca z listy | Pokaż wydarzenia, których miejsce jest w liście: Rynek, Dom parafialny (IN). | https://www.sqlite.org/lang_expr.html |
| 12 | where-like | WHERE | uczen | Nazwy zawierające | Pokaż wydarzenia, których nazwa zawiera 'cech' (LIKE). | https://www.sqlite.org/lang_expr.html |
| 13 | where-like-pct | WHERE | uczen | Nazwy zaczynające się | Pokaż wydarzenia, których nazwa zaczyna się od 'Kiermasz' (LIKE '...%'). | https://www.sqlite.org/lang_expr.html |
| 14 | where-null | WHERE | uczen | Bez podanego miejsca | Pokaż wydarzenia, gdzie miejsce jest NULL (IS NULL). | https://www.sqlite.org/lang_expr.html |
| 15 | where-not-null | WHERE | uczen | Z podanym miejscem | Pokaż wydarzenia, gdzie miejsce nie jest NULL (IS NOT NULL). | https://www.sqlite.org/lang_expr.html |
| 16 | order-by-desc | ORDER BY | uczen | Od najpóźniejszego | Pokaż wszystkie wydarzenia posortowane po dacie malejąco (DESC). | https://www.sqlite.org/lang_select.html |
| 17 | order-by-dwa | ORDER BY | uczen | Miejsce, potem data | Posortuj po miejscu, potem po dacie rosnąco (wiele kolumn w ORDER BY). | https://www.sqlite.org/lang_select.html |
| 18 | order-by-where | ORDER BY | uczen | Filtr i sortowanie | Pokaż tylko wydarzenia na Rynku, posortowane po dacie. | https://www.sqlite.org/lang_select.html |
| 19 | distinct-miejsce | DISTINCT | uczen | Unikalne miejsca | Pokaż listę unikalnych miejsc (DISTINCT). | https://www.sqlite.org/lang_select.html |
| 20 | distinct-dwa | DISTINCT | uczen | Unikalne pary | Pokaż unikalne pary (nazwa, miejsce). | https://www.sqlite.org/lang_select.html |
| 21 | limit-1 | LIMIT | uczen | Jeden wiersz | Pokaż pierwsze wydarzenie (LIMIT 1). | https://www.sqlite.org/lang_select.html |
| 22 | limit-n | LIMIT | uczen | Dwa wydarzenia | Pokaż tylko dwa pierwsze wydarzenia (LIMIT 2). | https://www.sqlite.org/lang_select.html |
| 23 | limit-offset | LIMIT | uczen | Drugie wydarzenie | Pokaż drugie wydarzenie w kolejności (LIMIT 1 OFFSET 1). | https://www.sqlite.org/lang_select.html |
| 24 | insert-jeden | INSERT | uczen | Dodaj jedno wydarzenie | Wstaw jeden wiersz do tabeli wydarzenia (INSERT INTO ... VALUES). | https://www.sqlite.org/lang_insert.html |
| 25 | insert-kolumny | INSERT | uczen | Wstaw z podaniem kolumn | Wstaw wiersz podając tylko wybrane kolumny (INSERT INTO t (col1, col2) VALUES ...). | https://www.sqlite.org/lang_insert.html |
| 26 | insert-wiele | INSERT | uczen | Wstaw kilka wierszy | Wstaw wiele wierszy jednym INSERT (wiele VALUES). | https://www.sqlite.org/lang_insert.html |
| 27 | update-jeden | UPDATE | uczen | Zmień jedno pole | Zaktualizuj miejsce jednego wydarzenia (UPDATE ... SET ... WHERE id = ...). | https://www.sqlite.org/lang_update.html |
| 28 | update-wiele | UPDATE | uczen | Zmień wiele wierszy | Ustaw to samo pole dla wszystkich wydarzeń spełniających WHERE (UPDATE z WHERE). | https://www.sqlite.org/lang_update.html |
| 29 | update-dwa-pola | UPDATE | uczen | Zmień dwie kolumny | UPDATE SET kol1 = ..., kol2 = ... WHERE ... | https://www.sqlite.org/lang_update.html |
| 30 | delete-where | DELETE | uczen | Usuń wybrane wiersze | Usuń wydarzenia spełniające warunek (DELETE FROM ... WHERE ...). | https://www.sqlite.org/lang_delete.html |
| 31 | delete-jeden | DELETE | uczen | Usuń jeden wiersz | Usuń dokładnie jeden wiersz (np. po id). | https://www.sqlite.org/lang_delete.html |
| 32 | where-not-in | WHERE | uczen | NOT IN | Pokaż wydarzenia, których miejsce NIE jest w podanej liście (NOT IN). | https://www.sqlite.org/lang_expr.html |
| 33 | count-gwiazdka | Aggregates | czeladnik | Ile wydarzeń | Pokaż jedną liczbę: ile jest wydarzeń (COUNT(*)). | https://www.sqlite.org/lang_aggfunc.html#count |
| 34 | count-kolumna | Aggregates | czeladnik | Ile z miejscem | Pokaż liczbę wydarzeń z niepustym miejscem (COUNT(miejsce)). | https://www.sqlite.org/lang_aggfunc.html#count |
| 35 | sum-min-max | Aggregates | czeladnik | Min i max daty | Pokaż najwcześniejszą i najpóźniejszą datę (MIN, MAX). | https://www.sqlite.org/lang_aggfunc.html |
| 36 | avg-null | Aggregates | czeladnik | Średnia | W tabeli z kolumną liczbową: pokaż średnią (AVG). | https://www.sqlite.org/lang_aggfunc.html#avg |
| 37 | group-by-miejsce | GROUP BY | czeladnik | Liczba po miejscu | Dla każdego miejsca pokaż liczbę wydarzeń (GROUP BY). | https://www.sqlite.org/lang_select.html |
| 38 | group-by-dwa | GROUP BY | czeladnik | Grupa po dwóch kolumnach | Grupuj po miejscu i roku z daty; pokaż liczbę. | https://www.sqlite.org/lang_select.html |
| 39 | having-count | HAVING | czeladnik | Miejsca z więcej niż jednym | Pokaż tylko miejsca, gdzie jest więcej niż 1 wydarzenie (HAVING COUNT(*)). | https://www.sqlite.org/lang_select.html |
| 40 | having-min | HAVING | czeladnik | Grupy po warunku na agregacie | Filtruj grupy po MIN/MAX (HAVING). | https://www.sqlite.org/lang_select.html |
| 41 | agg-var-41 | Aggregates/GROUP BY/HAVING | czeladnik | SUM po grupie | Dla każdej grupy pokaż SUM(kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 42 | agg-var-42 | Aggregates/GROUP BY/HAVING | czeladnik | AVG po grupie | Dla każdej grupy pokaż AVG(kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 43 | agg-var-43 | Aggregates/GROUP BY/HAVING | czeladnik | HAVING z SUM | Pokaż tylko grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_aggfunc.html |
| 44 | agg-var-44 | Aggregates/GROUP BY/HAVING | czeladnik | HAVING z AVG | Pokaż tylko grupy gdzie AVG(...) < X. | https://www.sqlite.org/lang_aggfunc.html |
| 45 | agg-var-45 | Aggregates/GROUP BY/HAVING | czeladnik | GROUP BY i ORDER BY | GROUP BY ... ORDER BY agregat. | https://www.sqlite.org/lang_aggfunc.html |
| 46 | agg-var-46 | Aggregates/GROUP BY/HAVING | czeladnik | Wiele agregatów | SELECT grupę, COUNT(*), SUM(...), AVG(...). | https://www.sqlite.org/lang_aggfunc.html |
| 47 | agg-var-47 | Aggregates/GROUP BY/HAVING | czeladnik | COUNT DISTINCT | COUNT(DISTINCT kolumna) w grupie. | https://www.sqlite.org/lang_aggfunc.html |
| 48 | agg-var-48 | Aggregates/GROUP BY/HAVING | czeladnik | Grupy i filtr WHERE | WHERE przed GROUP BY; pokaż grupy. | https://www.sqlite.org/lang_aggfunc.html |
| 49 | agg-var-49 | Aggregates/GROUP BY/HAVING | czeladnik | HAVING z COUNT | HAVING COUNT(*) = 1 (grupy jednoelementowe). | https://www.sqlite.org/lang_aggfunc.html |
| 50 | agg-var-50 | Aggregates/GROUP BY/HAVING | czeladnik | HAVING z dwoma warunkami | HAVING COUNT(*) > 1 AND SUM(...) > X. | https://www.sqlite.org/lang_aggfunc.html |
| 51 | agg-var-51 | Aggregates/GROUP BY/HAVING | czeladnik | GROUP BY wyrażenie | GROUP BY z wyrażeniem (np. rok). | https://www.sqlite.org/lang_aggfunc.html |
| 52 | agg-var-52 | Aggregates/GROUP BY/HAVING | czeladnik | Agregat w podzapytaniu | Użyj agregatu w podzapytaniu. | https://www.sqlite.org/lang_aggfunc.html |
| 53 | agg-var-53 | Aggregates/GROUP BY/HAVING | czeladnik | Empty group | Zachowanie gdy GROUP BY daje 0 wierszy. | https://www.sqlite.org/lang_aggfunc.html |
| 54 | agg-var-54 | Aggregates/GROUP BY/HAVING | czeladnik | Grupa i LIMIT | GROUP BY ... ORDER BY ... LIMIT 1. | https://www.sqlite.org/lang_aggfunc.html |
| 55 | join-inner-2 | JOINs | czeladnik | Wydarzenia z nazwą miejsca | Tabela miejsca (id, nazwa); wydarzenia.miejsce_id. Pokaż wydarzenia z nazwą miejsca (INNER JOIN). | https://www.sqlite.org/lang_select.html |
| 56 | join-left | JOINs | czeladnik | Wszystkie miejsca i wydarzenia | LEFT JOIN: miejsca po lewej; pokaż miejsca bez wydarzeń też. | https://www.sqlite.org/lang_select.html |
| 57 | join-where-join | JOINs | czeladnik | JOIN i WHERE | Wydarzenia w miejscu o nazwie 'Rynek' (JOIN + WHERE). | https://www.sqlite.org/lang_select.html |
| 58 | join-var-58 | JOINs | czeladnik | Wiele JOINów | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 59 | join-var-59 | JOINs | czeladnik | Self-join | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 60 | join-var-60 | JOINs | czeladnik | RIGHT JOIN | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 61 | join-var-61 | JOINs | czeladnik | CROSS JOIN | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 62 | join-var-62 | JOINs | czeladnik | JOIN z USING | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 63 | join-var-63 | JOINs | czeladnik | Trzy tabele | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 64 | join-var-64 | JOINs | czeladnik | JOIN i GROUP BY | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 65 | join-var-65 | JOINs | czeladnik | JOIN i ORDER BY | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 66 | join-var-66 | JOINs | mistrz | NATURAL JOIN | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 67 | join-var-67 | JOINs | mistrz | JOIN w podzapytaniu | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 68 | join-var-68 | JOINs | mistrz | LEFT JOIN i NULL | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 69 | join-var-69 | JOINs | mistrz | FULL OUTER (emulacja) | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 70 | join-var-70 | JOINs | mistrz | JOIN po różnych kolumnach | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 71 | join-var-71 | JOINs | mistrz | JOIN i HAVING | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 72 | join-var-72 | JOINs | mistrz | Złożony JOIN | Zastosuj odpowiedni typ JOIN. | https://www.sqlite.org/lang_select.html |
| 73 | subquery-where-in | Subqueries | mistrz | Lista ID z podzapytania | Pokaż wydarzenia, których id jest w wyniku podzapytania (WHERE id IN (SELECT ...)). | https://www.sqlite.org/lang_select.html |
| 74 | subquery-from | Subqueries | mistrz | Podzapytanie w FROM | Użyj wyniku podzapytania jako tabeli (FROM (SELECT ...) AS t). | https://www.sqlite.org/lang_select.html |
| 75 | subquery-select | Subqueries | mistrz | Skalar w SELECT | Dla każdego wiersza pokaż kolumnę + wynik podzapytania (SELECT ..., (SELECT ...)). | https://www.sqlite.org/lang_select.html |
| 76 | subq-var-76 | Subqueries | mistrz | EXISTS | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 77 | subq-var-77 | Subqueries | mistrz | NOT EXISTS | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 78 | subq-var-78 | Subqueries | mistrz | Korelacja | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 79 | subq-var-79 | Subqueries | mistrz | Subquery i JOIN | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 80 | subq-var-80 | Subqueries | mistrz | IN vs EXISTS | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 81 | subq-var-81 | Subqueries | mistrz | Scalar subquery warunek | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 82 | subq-var-82 | Subqueries | mistrz | FROM subquery z JOIN | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 83 | subq-var-83 | Subqueries | mistrz | Wielokolumnowe IN | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 84 | subq-var-84 | Subqueries | mistrz | Subquery w HAVING | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 85 | subq-var-85 | Subqueries | mistrz | Subquery w ORDER BY | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 86 | subq-var-86 | Subqueries | mistrz | Lateral (emulacja) | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 87 | subq-var-87 | Subqueries | mistrz | NOT IN i NULL | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 88 | subq-var-88 | Subqueries | mistrz | ANY/ALL (emulacja) | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 89 | subq-var-89 | Subqueries | mistrz | Subquery z GROUP BY | Zastosuj podzapytanie. | https://www.sqlite.org/lang_select.html |
| 90 | window-row-number | Window | mistrz | Numer wiersza w grupie | ROW_NUMBER() OVER (PARTITION BY miejsce). | https://www.sqlite.org/windowfunctions.html |
| 91 | window-rank | Window | mistrz | Ranking po dacie | RANK() po dacie (np. najbliższe = 1). | https://www.sqlite.org/windowfunctions.html |
| 92 | window-sum-over | Window | mistrz | Suma narastająca | SUM(...) OVER (ORDER BY ...). | https://www.sqlite.org/windowfunctions.html |
| 93 | window-var-93 | Window | mistrz | DENSE_RANK | Zastosuj funkcję okna. | https://www.sqlite.org/windowfunctions.html |
| 94 | window-var-94 | Window | mistrz | LAG/LEAD | Zastosuj funkcję okna. | https://www.sqlite.org/windowfunctions.html |
| 95 | window-var-95 | Window | mistrz | PARTITION BY + ORDER BY | Zastosuj funkcję okna. | https://www.sqlite.org/windowfunctions.html |
| 96 | window-var-96 | Window | mistrz | first_value/last_value | Zastosuj funkcję okna. | https://www.sqlite.org/windowfunctions.html |
| 97 | window-var-97 | Window | mistrz | Frame ROWS | Zastosuj funkcję okna. | https://www.sqlite.org/windowfunctions.html |
| 98 | window-var-98 | Window | mistrz | NTILE | Zastosuj funkcję okna. | https://www.sqlite.org/windowfunctions.html |
| 99 | window-var-99 | Window | mistrz | percent_rank/cume_dist | Zastosuj funkcję okna. | https://www.sqlite.org/windowfunctions.html |
| 100 | window-var-100 | Window | mistrz | Wiele okien | Zastosuj funkcję okna. | https://www.sqlite.org/windowfunctions.html |

### Lessons 101-200

| # | id | concept | stopien | title | goal | reference |
| --- | --- | --- | --- | --- | --- | --- |
| 101 | func-lower | lower() | czeladnik | Małe litery | Pokaż nazwę wydarzenia w małych literach (lower()). | https://www.sqlite.org/lang_corefunc.html#lower |
| 102 | func-upper | upper() | czeladnik | Wielkie litery | Pokaż nazwę w wielkich literach (upper()). | https://www.sqlite.org/lang_corefunc.html#upper |
| 103 | func-trim | trim() | czeladnik | Trim | Usuń białe znaki z początku i końca (trim()). | https://www.sqlite.org/lang_corefunc.html#trim |
| 104 | func-ltrim | ltrim() | czeladnik | Ltrim | Usuń białe znaki z początku (ltrim()). | https://www.sqlite.org/lang_corefunc.html#ltrim |
| 105 | func-rtrim | rtrim() | czeladnik | Rtrim | Usuń białe znaki z końca (rtrim()). | https://www.sqlite.org/lang_corefunc.html#rtrim |
| 106 | func-substr | substr() | czeladnik | Substring | Pokaż fragment tekstu (substr()). | https://www.sqlite.org/lang_corefunc.html#substr |
| 107 | func-replace | replace() | czeladnik | Replace | Zamień fragment tekstu (replace()). | https://www.sqlite.org/lang_corefunc.html#replace |
| 108 | func-length | length() | czeladnik | Długość | Pokaż długość stringa (length()). | https://www.sqlite.org/lang_corefunc.html#length |
| 109 | func-instr | instr() | czeladnik | Instr | Znajdź pozycję podstringa (instr()). | https://www.sqlite.org/lang_corefunc.html#instr |
| 110 | func-abs | abs() | czeladnik | Wartość bezwzględna | Pokaż abs(liczba). | https://www.sqlite.org/lang_corefunc.html#abs |
| 111 | func-round | round() | czeladnik | Zaokrąglenie | Zaokrąglij liczbę (round()). | https://www.sqlite.org/lang_corefunc.html#round |
| 112 | func-coalesce | coalesce() | czeladnik | Coalesce | Pierwszy nie-NULL z listy (coalesce()). | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 113 | func-nullif | nullif() | czeladnik | Nullif | NULL jeśli równe (nullif()). | https://www.sqlite.org/lang_corefunc.html#nullif |
| 114 | func-ifnull | ifnull() | czeladnik | Ifnull | Jeśli NULL to X (ifnull()). | https://www.sqlite.org/lang_corefunc.html#ifnull |
| 115 | func-typeof | typeof() | czeladnik | Typ wartości | Pokaż typ wartości (typeof()). | https://www.sqlite.org/lang_corefunc.html#typeof |
| 116 | func-random | random() | czeladnik | Random | Liczba losowa (random()). | https://www.sqlite.org/lang_corefunc.html#random |
| 117 | func-min-scalar | min() scalar | czeladnik | Min (skalar) | Min z listy wartości (min(a,b,c)). | https://www.sqlite.org/lang_corefunc.html#min_scalar |
| 118 | func-max-scalar | max() scalar | czeladnik | Max (skalar) | Max z listy wartości (max(a,b,c)). | https://www.sqlite.org/lang_corefunc.html#max_scalar |
| 119 | func-hex | hex() | czeladnik | Hex | Reprezentacja hex (hex()). | https://www.sqlite.org/lang_corefunc.html#hex |
| 120 | func-quote | quote() | czeladnik | Quote | Cytowany string (quote()). | https://www.sqlite.org/lang_corefunc.html#quote |
| 121 | func-soundex | soundex() | czeladnik | Soundex | Kod soundex (soundex()). | https://www.sqlite.org/lang_corefunc.html#soundex |
| 122 | func-iif | iif() | czeladnik | IIf | Wyrażenie warunkowe (iif()). | https://www.sqlite.org/lang_corefunc.html#iif |
| 123 | func-concat | concat() | czeladnik | Concat | Sklej stringi (concat()). | https://www.sqlite.org/lang_corefunc.html#concat |
| 124 | func-concat-ws | concat_ws() | czeladnik | Concat z separatorem | concat_ws(sep, ...). | https://www.sqlite.org/lang_corefunc.html#concat_ws |
| 125 | func-format | format() | czeladnik | Format | Sformatowany string (format()). | https://www.sqlite.org/lang_corefunc.html#format |
| 126 | func-printf | printf() | czeladnik | Printf | Printf-style format (printf()). | https://www.sqlite.org/lang_corefunc.html#printf |
| 127 | func-sign | sign() | czeladnik | Sign | Znak liczby (sign()). | https://www.sqlite.org/lang_corefunc.html#sign |
| 128 | func-changes | changes() | czeladnik | Changes | Liczba zmienionych wierszy (changes()). | https://www.sqlite.org/lang_corefunc.html#changes |
| 129 | func-last-insert-rowid | last_insert_rowid() | czeladnik | Last insert rowid | ROWID ostatniego INSERT (last_insert_rowid()). | https://www.sqlite.org/lang_corefunc.html#last_insert_rowid |
| 130 | func-length-octet | octet_length() | czeladnik | Octet length | Długość w bajtach (octet_length()). | https://www.sqlite.org/lang_corefunc.html#octet_length |
| 131 | func-unicode | unicode() | czeladnik | Unicode | Kod punktu Unicode (unicode()). | https://www.sqlite.org/lang_corefunc.html#unicode |
| 132 | func-char | char() | czeladnik | Char | Znak z kodów (char()). | https://www.sqlite.org/lang_corefunc.html#char |
| 133 | func-glob | glob() | czeladnik | Glob | Dopasowanie glob (glob()). | https://www.sqlite.org/lang_corefunc.html#glob |
| 134 | func-like-func | like() | czeladnik | Like (funkcja) | Dopasowanie LIKE (like()). | https://www.sqlite.org/lang_corefunc.html#like |
| 135 | func-group-concat | group_concat() | czeladnik | Group concat | Sklej wartości w grupie (group_concat()). | https://www.sqlite.org/lang_aggfunc.html#group_concat |
| 136 | func-string-agg | string_agg() | czeladnik | String agg | string_agg(X,Y) z separatorem. | https://www.sqlite.org/lang_aggfunc.html#group_concat |
| 137 | func-total | total() | czeladnik | Total | Suma (zawsze float, 0 gdy brak) (total()). | https://www.sqlite.org/lang_aggfunc.html#sumunc |
| 138 | func-median | median() | czeladnik | Median | Wartość mediany (median()). | https://www.sqlite.org/lang_aggfunc.html#median |
| 139 | func-percentile | percentile() | czeladnik | Percentile | Percentyl (percentile()). | https://www.sqlite.org/lang_aggfunc.html#percentile |
| 140 | func-date | date() | czeladnik | Funkcja date() | Zwróć datę (date()). | https://www.sqlite.org/lang_datefunc.html |
| 141 | func-time | time() | czeladnik | Funkcja time() | Zwróć czas (time()). | https://www.sqlite.org/lang_datefunc.html |
| 142 | func-datetime | datetime() | czeladnik | Funkcja datetime() | Zwróć datę i czas (datetime()). | https://www.sqlite.org/lang_datefunc.html |
| 143 | func-julianday | julianday() | czeladnik | Julian day | Dzień juliański (julianday()). | https://www.sqlite.org/lang_datefunc.html |
| 144 | func-unixepoch | unixepoch() | czeladnik | Unix epoch | Znacznik Unix (unixepoch()). | https://www.sqlite.org/lang_datefunc.html |
| 145 | func-strftime | strftime() | czeladnik | Strftime | Sformatowana data (strftime()). | https://www.sqlite.org/lang_datefunc.html |
| 146 | func-timediff | timediff() | czeladnik | Timediff | Różnica czasu (timediff()). | https://www.sqlite.org/lang_datefunc.html |
| 147 | func-json | json() | mistrz | json() | Konwersja do JSON (json()). | https://www.sqlite.org/json1.html |
| 148 | func-json-array | json_array() | mistrz | json_array() | Utwórz tablicę JSON (json_array()). | https://www.sqlite.org/json1.html |
| 149 | func-json-object | json_object() | mistrz | json_object() | Utwórz obiekt JSON (json_object()). | https://www.sqlite.org/json1.html |
| 150 | func-json-extract | json_extract() | mistrz | json_extract() | Wyciągnij wartość (json_extract()). | https://www.sqlite.org/json1.html |
| 151 | func-json-insert | json_insert() | mistrz | json_insert() | Wstaw do JSON (json_insert()). | https://www.sqlite.org/json1.html |
| 152 | func-json-replace | json_replace() | mistrz | json_replace() | Zamień w JSON (json_replace()). | https://www.sqlite.org/json1.html |
| 153 | func-json-set | json_set() | mistrz | json_set() | Ustaw w JSON (json_set()). | https://www.sqlite.org/json1.html |
| 154 | func-json-remove | json_remove() | mistrz | json_remove() | Usuń z JSON (json_remove()). | https://www.sqlite.org/json1.html |
| 155 | func-json-type | json_type() | mistrz | json_type() | Typ wartości JSON (json_type()). | https://www.sqlite.org/json1.html |
| 156 | func-json-valid | json_valid() | mistrz | json_valid() | Czy poprawny JSON (json_valid()). | https://www.sqlite.org/json1.html |
| 157 | func-json-quote | json_quote() | mistrz | json_quote() | Cytuj jako JSON (json_quote()). | https://www.sqlite.org/json1.html |
| 158 | func-json-array-length | json_array_length() | mistrz | json_array_length() | Długość tablicy JSON. | https://www.sqlite.org/json1.html |
| 159 | func-json-pretty | json_pretty() | mistrz | json_pretty() | Formatowany JSON (json_pretty()). | https://www.sqlite.org/json1.html |
| 160 | func-json-patch | json_patch() | mistrz | json_patch() | Łatanie JSON (json_patch()). | https://www.sqlite.org/json1.html |
| 161 | func-json-group-array | json_group_array() | mistrz | json_group_array() | Agregat: tablica JSON (json_group_array()). | https://www.sqlite.org/json1.html |
| 162 | func-json-group-object | json_group_object() | mistrz | json_group_object() | Agregat: obiekt JSON (json_group_object()). | https://www.sqlite.org/json1.html |
| 163 | func-json-each | json_each() | mistrz | json_each() | Tabela z json_each(). | https://www.sqlite.org/json1.html |
| 164 | func-json-tree | json_tree() | mistrz | json_tree() | Tabela z json_tree(). | https://www.sqlite.org/json1.html |
| 165 | func-dense-rank | dense_rank() | mistrz | DENSE_RANK | dense_rank() OVER (ORDER BY ...). | https://www.sqlite.org/windowfunctions.html |
| 166 | func-percent-rank | percent_rank() | mistrz | percent_rank() | percent_rank() OVER. | https://www.sqlite.org/windowfunctions.html |
| 167 | func-cume-dist | cume_dist() | mistrz | cume_dist() | cume_dist() OVER. | https://www.sqlite.org/windowfunctions.html |
| 168 | func-ntile | ntile() | mistrz | ntile() | ntile(N) OVER. | https://www.sqlite.org/windowfunctions.html |
| 169 | func-lag | lag() | mistrz | lag() | lag() OVER (ORDER BY ...). | https://www.sqlite.org/windowfunctions.html |
| 170 | func-lead | lead() | mistrz | lead() | lead() OVER (ORDER BY ...). | https://www.sqlite.org/windowfunctions.html |
| 171 | func-first-value | first_value() | mistrz | first_value() | first_value() OVER. | https://www.sqlite.org/windowfunctions.html |
| 172 | func-last-value | last_value() | mistrz | last_value() | last_value() OVER. | https://www.sqlite.org/windowfunctions.html |
| 173 | func-nth-value | nth_value() | mistrz | nth_value() | nth_value() OVER. | https://www.sqlite.org/windowfunctions.html |
| 174 | trans-begin-commit | BEGIN/COMMIT | czeladnik | BEGIN i COMMIT | Owiń dwa INSERTy w transakcję; COMMIT. | https://www.sqlite.org/lang_transaction.html |
| 175 | trans-rollback | ROLLBACK | czeladnik | ROLLBACK | BEGIN, INSERT, ROLLBACK; sprawdź że wiersza nie ma. | https://www.sqlite.org/lang_transaction.html |
| 176 | trans-savepoint | SAVEPOINT | czeladnik | SAVEPOINT | SAVEPOINT, zmiany, ROLLBACK TO. | https://www.sqlite.org/lang_savepoint.html |
| 177 | trans-release | RELEASE | czeladnik | RELEASE | RELEASE SAVEPOINT. | https://www.sqlite.org/lang_savepoint.html |
| 178 | trans-implicit | Implicit | czeladnik | Transakcja domyślna | Kiedy SQLite zaczyna/kończy transakcję. | https://www.sqlite.org/lang_transaction.html |
| 179 | trans-error | Error and rollback | czeladnik | Błąd a rollback | Co się dzieje przy błędzie w transakcji. | https://www.sqlite.org/lang_transaction.html |
| 180 | trans-nested | Nested savepoints | czeladnik | Zagnieżdżone savepointy | Wiele SAVEPOINTów i częściowy rollback. | https://www.sqlite.org/lang_savepoint.html |
| 181 | trans-deferred | DEFERRED | czeladnik | DEFERRED | BEGIN DEFERRED. | https://www.sqlite.org/lang_transaction.html |
| 182 | trans-immediate | IMMEDIATE | czeladnik | IMMEDIATE | BEGIN IMMEDIATE. | https://www.sqlite.org/lang_transaction.html |
| 183 | trans-exclusive | EXCLUSIVE | czeladnik | EXCLUSIVE | BEGIN EXCLUSIVE. | https://www.sqlite.org/lang_transaction.html |
| 184 | str-concat-op | Operator || | uczen | Operator || | Sklej nazwa i miejsce (||). | https://www.sqlite.org/lang_expr.html |
| 185 | str-concat-func | concat() | uczen | concat() | Sklej stringi przez concat(). | https://www.sqlite.org/lang_corefunc.html#concat |
| 186 | str-concat-ws | concat_ws() | uczen | concat_ws() | Sklej z separatorem (concat_ws()). | https://www.sqlite.org/lang_corefunc.html#concat_ws |
| 187 | str-format | format()/printf() | uczen | Format/printf | Sformatowany string (format/printf). | https://www.sqlite.org/lang_corefunc.html#format |
| 188 | str-null | NULL w || | uczen | NULL w konkatenacji | Jak NULL wpływa na ||; użyj coalesce. | https://www.sqlite.org/lang_expr.html |
| 189 | str-quote | quote() | uczen | quote() dla SQL | quote() do bezpiecznego stringa. | https://www.sqlite.org/lang_corefunc.html#quote |
| 190 | update-subquery | UPDATE + subquery | mistrz | UPDATE z podzapytaniem | Ustaw kolumnę z wartości z innej tabeli (SELECT). | https://www.sqlite.org/lang_update.html |
| 191 | update-from | UPDATE FROM | mistrz | UPDATE ... FROM | UPDATE z JOIN (SQLite 3.33+). | https://www.sqlite.org/lang_update.html |
| 192 | update-correlated | Correlated subquery | mistrz | Skorelowane podzapytanie w SET | (SELECT ... FROM t2 WHERE t2.id = t1.id) w SET. | https://www.sqlite.org/lang_update.html |
| 193 | update-multi-row | Multiple rows | mistrz | Wiele wierszy z subquery | Aktualizuj wiele wierszy na podstawie JOIN. | https://www.sqlite.org/lang_update.html |
| 194 | update-from-where | UPDATE FROM WHERE | mistrz | UPDATE FROM z WHERE | UPDATE ... FROM ... WHERE. | https://www.sqlite.org/lang_update.html |
| 195 | update-join-syntax | UPDATE join syntax | mistrz | Składnia UPDATE z JOIN | Prawidłowa składnia UPDATE w SQLite. | https://www.sqlite.org/lang_update.html |
| 196 | type-affinity | Type affinity | czeladnik | Typ affinity | INTEGER, TEXT, REAL, BLOB; jak SQLite przechowuje. | https://www.sqlite.org/lang_createtable.html |
| 197 | type-null | NULL | czeladnik | NULL | Kiedy kolumna jest NULL; IS NULL / IS NOT NULL. | https://www.sqlite.org/lang_expr.html |
| 198 | type-storage | Storage classes | czeladnik | Klasy przechowywania | integer, real, text, blob, null. | https://www.sqlite.org/lang_datatype3.html |
| 199 | type-coercion | Coercion | czeladnik | Koercja | Co się dzieje przy INSERT string do INTEGER. | https://www.sqlite.org/lang_datatype3.html |
| 200 | type-typeof | typeof() | czeladnik | typeof() | Pokaż klasę przechowywania (typeof()). | https://www.sqlite.org/lang_corefunc.html#typeof |

### Lessons 201-300

| # | id | concept | stopien | title | goal | reference |
| --- | --- | --- | --- | --- | --- | --- |
| 201 | type-cast | CAST | czeladnik | CAST | CAST(col AS INTEGER), CAST(col AS TEXT). | https://www.sqlite.org/lang_expr.html |
| 202 | type-integer | INTEGER | czeladnik | Typ INTEGER | Przechowywanie liczb całkowitych. | https://www.sqlite.org/lang_datatype3.html |
| 203 | type-text | TEXT | czeladnik | TEXT | Przechowywanie tekstu. | https://www.sqlite.org/lang_datatype3.html |
| 204 | type-real | REAL | czeladnik | REAL | Liczby zmiennoprzecinkowe. | https://www.sqlite.org/lang_datatype3.html |
| 205 | type-blob | BLOB | czeladnik | BLOB | Dane binarne. | https://www.sqlite.org/lang_datatype3.html |
| 206 | create-table | CREATE TABLE | czeladnik | CREATE TABLE | Utwórz tabelę z kolumnami i typami. | https://www.sqlite.org/lang_createtable.html |
| 207 | create-primary-key | PRIMARY KEY | czeladnik | PRIMARY KEY | Klucz główny (pojedynczy i złożony). | https://www.sqlite.org/lang_createtable.html |
| 208 | create-unique | UNIQUE | czeladnik | UNIQUE | Ograniczenie UNIQUE. | https://www.sqlite.org/lang_createtable.html |
| 209 | create-not-null | NOT NULL | czeladnik | NOT NULL | NOT NULL na kolumnach. | https://www.sqlite.org/lang_createtable.html |
| 210 | create-default | DEFAULT | czeladnik | DEFAULT | DEFAULT (literal, datetime('now')). | https://www.sqlite.org/lang_createtable.html |
| 211 | create-check | CHECK | czeladnik | CHECK | CHECK (col > 0), CHECK (col IN (...)). | https://www.sqlite.org/lang_createtable.html |
| 212 | create-foreign-key | FOREIGN KEY | czeladnik | FOREIGN KEY | REFERENCES; opcjonalne ON DELETE/UPDATE. | https://www.sqlite.org/lang_createtable.html |
| 213 | create-index | CREATE INDEX | czeladnik | CREATE INDEX | Indeks pojedynczy i złożony. | https://www.sqlite.org/lang_createindex.html |
| 214 | create-view | CREATE VIEW | czeladnik | CREATE VIEW | Widok jako zapisane SELECT. | https://www.sqlite.org/lang_createview.html |
| 215 | alter-table | ALTER TABLE | czeladnik | ALTER TABLE | ADD COLUMN (ograniczenia SQLite). | https://www.sqlite.org/lang_altertable.html |
| 216 | create-temp | TEMP table | czeladnik | Tabela tymczasowa | CREATE TEMP TABLE. | https://www.sqlite.org/lang_createtable.html |
| 217 | create-if-not-exists | IF NOT EXISTS | czeladnik | IF NOT EXISTS | CREATE TABLE IF NOT EXISTS. | https://www.sqlite.org/lang_createtable.html |
| 218 | identifiers | Identifiers | czeladnik | Identyfikatory | Cudzysłowy; unikanie słów zastrzeżonych. | https://www.sqlite.org/lang_keywords.html |
| 219 | create-without-rowid | WITHOUT ROWID | czeladnik | WITHOUT ROWID | Tabela bez wewnętrznego rowid. | https://www.sqlite.org/lang_createtable.html |
| 220 | create-index-where | Partial index | czeladnik | Indeks częściowy | CREATE INDEX ... WHERE. | https://www.sqlite.org/lang_createindex.html |
| 221 | create-unique-index | UNIQUE INDEX | czeladnik | UNIQUE INDEX | Indeks unikalny. | https://www.sqlite.org/lang_createindex.html |
| 222 | schema-name | Schema name | czeladnik | Nazwa schemy | main, temp, attached DB. | https://www.sqlite.org/lang_attach.html |
| 223 | create-trigger | CREATE TRIGGER | czeladnik | CREATE TRIGGER | Trigger BEFORE/AFTER INSERT/UPDATE/DELETE. | https://www.sqlite.org/lang_createtrigger.html |
| 224 | var-224-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 225 | var-225-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 226 | var-226-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 227 | var-227-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 228 | var-228-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 229 | var-229-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 230 | var-230-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 231 | var-231-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 232 | var-232-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 233 | var-233-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 234 | var-234-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 235 | var-235-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 236 | var-236-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 237 | var-237-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 238 | var-238-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 239 | var-239-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 240 | var-240-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 241 | var-241-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 242 | var-242-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 243 | var-243-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 244 | var-244-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 245 | var-245-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 246 | var-246-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 247 | var-247-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 248 | var-248-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 249 | var-249-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 250 | var-250-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 251 | var-251-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 252 | var-252-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 253 | var-253-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 254 | var-254-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 255 | var-255-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 256 | var-256-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 257 | var-257-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 258 | var-258-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 259 | var-259-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 260 | var-260-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 261 | var-261-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 262 | var-262-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 263 | var-263-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 264 | var-264-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 265 | var-265-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 266 | var-266-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 267 | var-267-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 268 | var-268-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 269 | var-269-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 270 | var-270-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 271 | var-271-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 272 | var-272-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 273 | var-273-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 274 | var-274-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 275 | var-275-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 276 | var-276-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 277 | var-277-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 278 | var-278-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 279 | var-279-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 280 | var-280-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 281 | var-281-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 282 | var-282-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 283 | var-283-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 284 | var-284-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 285 | var-285-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 286 | var-286-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 287 | var-287-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 288 | var-288-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 289 | var-289-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 290 | var-290-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 291 | var-291-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 292 | var-292-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 293 | var-293-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 294 | var-294-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 295 | var-295-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 296 | var-296-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 297 | var-297-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 298 | var-298-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 299 | var-299-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 300 | var-300-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |

### Lessons 301-400

| # | id | concept | stopien | title | goal | reference |
| --- | --- | --- | --- | --- | --- | --- |
| 301 | var-301-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 302 | var-302-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 303 | var-303-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 304 | var-304-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 305 | var-305-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 306 | var-306-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 307 | var-307-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 308 | var-308-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 309 | var-309-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 310 | var-310-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 311 | var-311-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 312 | var-312-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 313 | var-313-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 314 | var-314-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 315 | var-315-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 316 | var-316-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 317 | var-317-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 318 | var-318-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 319 | var-319-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 320 | var-320-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 321 | var-321-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 322 | var-322-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 323 | var-323-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 324 | var-324-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 325 | var-325-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 326 | var-326-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 327 | var-327-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 328 | var-328-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 329 | var-329-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 330 | var-330-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 331 | var-331-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 332 | var-332-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 333 | var-333-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 334 | var-334-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 335 | var-335-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 336 | var-336-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 337 | var-337-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 338 | var-338-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 339 | var-339-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 340 | var-340-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 341 | var-341-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 342 | var-342-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 343 | var-343-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 344 | var-344-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 345 | var-345-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 346 | var-346-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 347 | var-347-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 348 | var-348-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 349 | var-349-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 350 | var-350-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 351 | var-351-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 352 | var-352-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 353 | var-353-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 354 | var-354-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 355 | var-355-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 356 | var-356-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 357 | var-357-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 358 | var-358-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 359 | var-359-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 360 | var-360-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 361 | var-361-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 362 | var-362-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 363 | var-363-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 364 | var-364-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 365 | var-365-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 366 | var-366-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 367 | var-367-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 368 | var-368-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 369 | var-369-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 370 | var-370-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 371 | var-371-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 372 | var-372-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 373 | var-373-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 374 | var-374-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 375 | var-375-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 376 | var-376-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 377 | var-377-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 378 | var-378-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 379 | var-379-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 380 | var-380-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 381 | var-381-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 382 | var-382-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 383 | var-383-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 384 | var-384-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 385 | var-385-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 386 | var-386-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 387 | var-387-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 388 | var-388-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 389 | var-389-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 390 | var-390-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 391 | var-391-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 392 | var-392-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 393 | var-393-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 394 | var-394-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 395 | var-395-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 396 | var-396-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 397 | var-397-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 398 | var-398-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 399 | var-399-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 400 | var-400-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |

### Lessons 401-500

| # | id | concept | stopien | title | goal | reference |
| --- | --- | --- | --- | --- | --- | --- |
| 401 | var-401-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 402 | var-402-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 403 | var-403-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 404 | var-404-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 405 | var-405-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 406 | var-406-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 407 | var-407-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 408 | var-408-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 409 | var-409-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 410 | var-410-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 411 | var-411-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 412 | var-412-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 413 | var-413-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 414 | var-414-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 415 | var-415-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 416 | var-416-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 417 | var-417-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 418 | var-418-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 419 | var-419-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 420 | var-420-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 421 | var-421-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 422 | var-422-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 423 | var-423-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 424 | var-424-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 425 | var-425-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 426 | var-426-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 427 | var-427-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 428 | var-428-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 429 | var-429-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 430 | var-430-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 431 | var-431-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 432 | var-432-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 433 | var-433-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 434 | var-434-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 435 | var-435-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 436 | var-436-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 437 | var-437-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 438 | var-438-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 439 | var-439-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 440 | var-440-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 441 | var-441-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 442 | var-442-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 443 | var-443-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 444 | var-444-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 445 | var-445-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 446 | var-446-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 447 | var-447-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 448 | var-448-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 449 | var-449-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 450 | var-450-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 451 | var-451-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 452 | var-452-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 453 | var-453-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 454 | var-454-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 455 | var-455-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 456 | var-456-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 457 | var-457-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 458 | var-458-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 459 | var-459-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 460 | var-460-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 461 | var-461-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 462 | var-462-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 463 | var-463-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 464 | var-464-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 465 | var-465-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 466 | var-466-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 467 | var-467-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 468 | var-468-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 469 | var-469-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 470 | var-470-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 471 | var-471-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 472 | var-472-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 473 | var-473-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 474 | var-474-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 475 | var-475-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 476 | var-476-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 477 | var-477-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 478 | var-478-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 479 | var-479-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 480 | var-480-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 481 | var-481-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 482 | var-482-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 483 | var-483-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 484 | var-484-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 485 | var-485-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
| 486 | var-486-null-coalesce | NULL handling | czeladnik | COALESCE w zapytaniu | Użyj COALESCE dla NULL w wyniku. | https://www.sqlite.org/lang_corefunc.html#coalesce |
| 487 | var-487-left-join-null | LEFT JOIN NULL | czeladnik | LEFT JOIN i NULL | LEFT JOIN gdy brak dopasowania; NULL. | https://www.sqlite.org/lang_select.html |
| 488 | var-488-join-group-by | JOIN GROUP BY | mistrz | JOIN + GROUP BY | Połącz tabele i grupuj. | https://www.sqlite.org/lang_select.html |
| 489 | var-489-subquery-exists | Subquery EXISTS | mistrz | EXISTS | WHERE EXISTS (SELECT ...). | https://www.sqlite.org/lang_select.html |
| 490 | var-490-having-sum | HAVING SUM | czeladnik | HAVING z SUM | Pokaż grupy gdzie SUM(...) > X. | https://www.sqlite.org/lang_select.html |
| 491 | var-491-order-by-multi | Multi ORDER BY | uczen | Wiele kolumn ORDER BY | ORDER BY col1 DESC, col2 ASC. | https://www.sqlite.org/lang_select.html |
| 492 | var-492-count-distinct | DISTINCT w agregacie | czeladnik | COUNT(DISTINCT) | COUNT(DISTINCT kolumna). | https://www.sqlite.org/lang_aggfunc.html |
| 493 | var-493-window-frame | Window frame | mistrz | Ramka okna | ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. | https://www.sqlite.org/windowfunctions.html |
| 494 | var-494-where-not-in-2 | WHERE NOT IN | uczen | NOT IN (lista) | Pokaż wiersze gdzie kolumna NOT IN (...). | https://www.sqlite.org/lang_expr.html |
| 495 | var-495-where-between | WHERE BETWEEN | uczen | BETWEEN | Pokaż wiersze gdzie data BETWEEN ... AND ... | https://www.sqlite.org/lang_expr.html |
| 496 | var-496-order-nulls-first | ORDER BY NULLS | uczen | NULLS FIRST/LAST | ORDER BY ... NULLS FIRST (lub LAST). | https://www.sqlite.org/lang_select.html |
| 497 | var-497-cte-with | CTE WITH | mistrz | WITH ... AS | WITH cte AS (SELECT ...) SELECT * FROM cte. | https://www.sqlite.org/lang_with.html |
| 498 | var-498-cte-recursive | CTE recursive | mistrz | WITH RECURSIVE | Rekurencyjne CTE. | https://www.sqlite.org/lang_with.html |
| 499 | var-499-insert-select | INSERT SELECT | czeladnik | INSERT ... SELECT | INSERT INTO t SELECT ... FROM ... | https://www.sqlite.org/lang_insert.html |
| 500 | var-500-replace-stmt | REPLACE | czeladnik | REPLACE | REPLACE INTO (upsert-style). | https://www.sqlite.org/lang_replace.html |
