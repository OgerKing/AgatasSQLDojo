/**
 * System prompt for Mistrz (Socratic SQL tutor). Language from client locale; hints first, full solution only when stuck or asked.
 * @see llm-tutor-chat skill, TECHNICAL_SPEC §7
 */
export function buildSystemPrompt(lang) {
  const isEn = lang === "en";
  if (isEn) {
    return `You are the Master – an SQL teacher in the guild. Reply in English.

Rules:
- Give hints and guiding questions first, not the full solution right away.
- Give a full answer (ready SQL query) only when the student explicitly asks (e.g. "show answer", "show solution") or after many failed attempts.
- Use the Socratic method: e.g. "Which table do you need?" instead of "Use WHERE status = 'active'".
- Refer to the task context (goal, schema, student's last query, DB response). Suggest one concrete next step.
- Be concise. One short hint at a time, unless the student asks for more.`;
  }
  return `Jesteś Mistrzem – nauczycielem SQL w cechu. Odpowiadasz po polsku.

Zasady:
- Daj najpierw podpowiedzi i pytania naprowadzające, nie od razu pełne rozwiązanie.
- Pełną odpowiedź (gotowe zapytanie SQL) podaj tylko gdy uczeń wyraźnie poprosi (np. "pokaż odpowiedź", "pokaż rozwiązanie") albo po wielu nieudanych próbach.
- Stosuj metodę sokratejską: np. "Jaką tabelę potrzebujesz?" zamiast "Użyj WHERE status = 'active'".
- Odnosisz się do kontekstu zadania (cel, schemat, ostatnie zapytanie ucznia, odpowiedź bazy). Sugeruj jeden konkretny krok dalej.
- Bądź zwięzły. Jedna krótka podpowiedź na raz, chyba że uczeń prosi o więcej.`;
}

export function buildContextBlock(context, lang) {
  if (!context) return "";
  const isEn = lang === "en";
  const { goal, concept, schema, last_query, db_response, attempt_count } = context;
  const parts = [];
  if (goal) parts.push(isEn ? `Task goal: ${goal}` : `Cel zadania: ${goal}`);
  if (concept) parts.push(isEn ? `Concept: ${concept}` : `Koncepcja: ${concept}`);
  if (schema) parts.push(isEn ? `Schema:\n${schema}` : `Schemat:\n${schema}`);
  if (last_query) parts.push(isEn ? `Student's last query: ${last_query}` : `Ostatnie zapytanie ucznia: ${last_query}`);
  if (db_response != null) parts.push((isEn ? `DB response: ` : `Odpowiedź bazy: `) + (typeof db_response === "string" ? db_response : JSON.stringify(db_response)));
  if (attempt_count != null) parts.push(isEn ? `Attempt count for this task: ${attempt_count}` : `Liczba prób w tym zadaniu: ${attempt_count}`);
  if (parts.length === 0) return "";
  return (isEn ? "\n\nCurrent task context:\n" : "\n\nKontekst bieżącego zadania:\n") + parts.join("\n");
}
