---
name: gamified-training-software
description: Applies expertise in building gamified training and learning software: progress systems, learning-flow integration, persistence, onboarding, and UX patterns. Use when implementing progression, streaks, achievements, or integrating game mechanics with learning content in AgatasSQLDojo.
---

# Gamified Training Software Development

Build gamification so it reinforces learning rather than distracts. Align mechanics with [gamification-learning](.cursor/skills/gamification-learning/SKILL.md) and [motivation-psychology](.cursor/skills/motivation-psychology/SKILL.md); this skill focuses on implementation.

## Progress and state

- **Persist progress:** Store completed zadania, current stopień, XP, streaks, and achievements. Design for offline or flaky networks if relevant (e.g. optimistic UI, sync later).
- **Idempotent updates:** Completing the same zadanie again should not double-count XP or break streaks; define rules (e.g. first completion only, or repeat for practice without XP).
- **Streak logic:** Encode "day in a row" in a timezone-aware way; decide whether streak resets at midnight or on a 24h window. Surface "streak at risk" (e.g. no activity today) in UI.

## Learning flow first

- **Unlock by learning, not only by points:** Gate zadania by stopień or by completing prerequisites; avoid gates that feel arbitrary. Use [sql-teaching-progression](.cursor/skills/sql-teaching-progression/SKILL.md) order.
- **Feedback before points:** Show "correct/incorrect" and optional explanation before or alongside XP; the learner should feel the win from understanding, not only from a number.
- **Onboarding:** First session should do one zadanie and one reward (e.g. first completion, first stopień). Avoid long setup; get to "I did it" quickly.

## UX patterns

- **Progress visibility:** Always show "where I am" (e.g. 3 z 12 zadań, Czeladnik 2/5). Use progress bars or lists; make the next step obvious.
- **Celebration:** Short, skippable celebration on milestone (zadanie complete, stopień unlock); avoid long animations or repeated modal dialogs.
- **Low friction for retry:** One-click "try again" or "next zadanie"; no punitive cooldowns. Hints (Mistrz) and retries support learning.

## Technical considerations

- **Data model:** Separate "learner progress" (completions, XP, streaks) from "content" (zadania, schemas, expected results). Version content so progress remains valid when zadania change.
- **Analytics (optional):** If tracking, focus on learning signals (attempts per zadanie, time to success, drop-off) to tune difficulty and pacing, not only on engagement metrics.
- **Accessibility:** Progress and rewards must be readable by screen readers; avoid reward feedback that is only visual or only auditory.

## Polonia theme and tone

- **Content theme:** Practice DB and zadania use the **Polonia** (Polish community in America) setting—events, members, attendance, donations, clubs. See [agatas-dojo-conventions](.cursor/skills/agatas-dojo-conventions/SKILL.md).
- **Heroic professional:** The learner (e.g. Agata) is an **incredible technical professional** building real SQL skills. Tone must be **heroic and professional**—never patronizing, cute, or diminishing. The Polonia setting (community, belonging) supports her identity; it does not soften or reduce her to "just a mom" or "learning for fun." Celebrations and copy should reflect mastery, craft, and serious progression (cech = guild of professionals). When implementing progress UI, copy, or celebrations, ask: "Does this make Agata feel like the technical professional she is?"

## Anti-patterns

- **Points as the main loop:** The core loop is "read zadanie → write SQL → see result → get feedback"; points/streaks support that, they are not the goal.
- **Grinding:** Do not require many repetitions of the same zadanie to advance; allow progression through variety.
- **Surprise resets:** Do not reset progress or streaks without clear user action or explicit rule (e.g. "start over" button).
