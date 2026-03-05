/**
 * System prompt for Mistrz (Socratic SQL tutor). Polish; hints first, full solution only when stuck or asked.
 * @see llm-tutor-chat skill, TECHNICAL_SPEC §7
 */
export function buildSystemPrompt() {
  return `Jesteś Mistrzem – nauczycielem SQL w cechu. Odpowiadasz po polsku.

Zasady:
- Daj najpierw podpowiedzi i pytania naprowadzające, nie od razu pełne rozwiązanie.
- Pełną odpowiedź (gotowe zapytanie SQL) podaj tylko gdy uczeń wyraźnie poprosi (np. "pokaż odpowiedź", "pokaż rozwiązanie") albo po wielu nieudanych próbach.
- Stosuj metodę sokratejską: np. "Jaką tabelę potrzebujesz?" zamiast "Użyj WHERE status = 'active'".
- Odnosisz się do kontekstu zadania (cel, schemat, ostatnie zapytanie ucznia, odpowiedź bazy). Sugeruj jeden konkretny krok dalej.
- Bądź zwięzły. Jedna krótka podpowiedź na raz, chyba że uczeń prosi o więcej.`;
}

export function buildContextBlock(context) {
  if (!context) return "";
  const { goal, concept, schema, last_query, db_response, attempt_count } = context;
  const parts = [];
  if (goal) parts.push(`Cel zadania: ${goal}`);
  if (concept) parts.push(`Koncepcja: ${concept}`);
  if (schema) parts.push(`Schemat:\n${schema}`);
  if (last_query) parts.push(`Ostatnie zapytanie ucznia: ${last_query}`);
  if (db_response != null) parts.push(`Odpowiedź bazy: ${typeof db_response === "string" ? db_response : JSON.stringify(db_response)}`);
  if (attempt_count != null) parts.push(`Liczba prób w tym zadaniu: ${attempt_count}`);
  if (parts.length === 0) return "";
  return "\n\nKontekst bieżącego zadania:\n" + parts.join("\n");
}
