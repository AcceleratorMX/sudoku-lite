# Privacy Policy

**Last Updated:** February 15, 2026

## 1. Introduction

This Privacy Policy describes how **Sudoku Lite** ("the Application", "we", "our") handles user information. Sudoku Lite is an open-source, client-side web application that runs entirely in your browser. We are committed to protecting your privacy and being transparent about how data is handled.

## 2. Data Controller

- **Name:** Oleksandr Karpinskyi
- **Project:** Sudoku Lite
- **Repository:** [GitHub — Sudoku Lite](https://github.com/AcceleratorMX/sudoku-lite)

## 3. Data We Collect

Sudoku Lite operates **entirely on the client side**. No data is transmitted to any server. All information is stored locally in your browser using the Web Storage API (`localStorage`).

The following data is stored locally:

| Data               | Purpose                                                            | Storage Key            |
| ------------------ | ------------------------------------------------------------------ | ---------------------- |
| Player name        | Identify the player during a game session                          | `sudoku-players`       |
| Game progress      | Save and restore unfinished games (board state, timer, statistics) | `sudoku-game-storage`  |
| Game settings      | Remember selected difficulty level                                 | `sudoku-game-settings` |
| Leaderboard scores | Display top scores with player names, scores, and game statistics  | `sudoku-scores`        |

### Data NOT collected

- ❌ No personal identification data (email, phone, address)
- ❌ No IP addresses or geolocation
- ❌ No usage analytics or tracking
- ❌ No cookies (only `localStorage` is used)
- ❌ No data sent to external servers or third parties

## 4. How We Use the Data

All stored data is used exclusively for the following purposes:

- **Gameplay functionality** — saving and restoring game progress
- **Personalization** — remembering your chosen difficulty level
- **Leaderboard** — displaying top scores locally in your browser

## 5. Data Storage and Security

- All data is stored in your browser's `localStorage`.
- Data never leaves your device.
- Data persists until you manually clear it or clear your browser data.
- No encryption is applied to localStorage data, as it remains local to your device and browser profile.

## 6. Data Retention

- **Game progress** is retained until the game is completed or you start a new game.
- **Leaderboard scores** are retained indefinitely until manually cleared (maximum 100 entries).
- **Game settings** are retained until manually changed.
- All data can be removed at any time (see Section 7).

## 7. Your Rights

In accordance with data protection principles (GDPR, Ukrainian Law No. 2297-VI "On Personal Data Protection"), you have the following rights:

### Right to Access

All your data is stored locally in your browser. You can view it via browser Developer Tools (Application → Local Storage).

### Right to Deletion

You can delete your data at any time through:

- **In-app:** Click the "Exit" button to clear all current game and player data.
- **Browser settings:** Clear localStorage for the application's domain.
- **Developer Tools:** Manually remove specific keys from localStorage.

### Right to Restriction of Processing

You can disable localStorage in your browser settings to prevent any data from being stored.

### Right to Data Portability

Data stored in localStorage can be exported via browser Developer Tools in JSON format.

## 8. Third-Party Services

Sudoku Lite does **not** integrate with any third-party services, APIs, analytics tools, or advertising networks. No data is shared with or transmitted to any third party.

## 9. Children's Privacy

Sudoku Lite does not knowingly collect any personal information. The only user-provided data is a player name (which can be any alias or pseudonym). No age verification is required or performed.

## 10. Cookie Policy

Sudoku Lite does **not** use HTTP cookies. The application uses the browser's `localStorage` API exclusively, which is a client-side storage mechanism and is not transmitted with HTTP requests.

However, we provide a consent banner for transparency purposes, informing users about what data is stored locally.

## 11. Changes to This Policy

We may update this Privacy Policy from time to time. Any changes will be reflected in the "Last Updated" date at the top of this document. The latest version is always available in the project repository.

## 12. Contact

If you have any questions about this Privacy Policy, please open an issue on the project's [GitHub repository](https://github.com/AcceleratorMX/sudoku-lite/issues).

---

_This Privacy Policy is part of the Sudoku Lite open-source project, licensed under the [MIT License](./LICENSE)._
