# Calibra — Student Research Prototype

Calibra is a non-diagnostic psychoeducational reflection and support-navigation prototype for secondary-school students. It uses **fictional** peer-interaction scenarios. It is **not** therapy, diagnosis, or emergency support, and it has **not** been shown to be effective.

This is a static, front-end-only prototype. It has no server, no database, no analytics, and no live AI connection.

## Running the prototype

No build step or installation is needed.

1. Download or clone the `calibra/` folder.
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari).
3. Alternatively, serve the folder locally for the most reliable behaviour, for example:
   `python3 -m http.server 8080` from inside `calibra/`, then visit `http://localhost:8080`.

### Testing the prototype

- Walk the core journey: Home → Scenarios → Choose a scenario → Steps 1–4 → Next-Step Navigator → Support Resources.
- Check Back, Continue, Skip, and Exit on the reflection pages. Change an answer on a previous step.
- Check Calibra Guide: suggested chips, typed questions, Clear Conversation, Exit Chat, and a safety-flagged message (for example, "I am not safe").
- Check the Research Assessment Demo: withdraw, clear, and submit paths. Confirm nothing is sent or saved.
- Test on a narrow phone-width window and with keyboard only (Tab, Enter, Space, Escape).

### Configuration

All key settings are in `js/config.js`:

| Setting | Current value | Meaning |
|---|---|---|
| `exitUrl` | `index.html` | Placeholder. Set to a neutral, school-approved destination before launch. |
| `researchParticipantMode` | `false` | Keep `false`. Participant mode is not implemented. |
| `liveAiConnected` | `false` | Chatbot is a scripted demo and shows an "unavailable" notice. |
| `verifiedResourcesSupplied` | `false` | No support contacts are verified; all are placeholders. |

## Route map

| Page | File | Purpose |
|---|---|---|
| Home / Landing | `index.html` | Purpose, three steps, can/cannot |
| How Calibra Works | `how-it-works.html` | Process and limitations |
| Privacy and Scope | `privacy.html` | Plain-language privacy and scope |
| Fictional Scenario Selector | `scenarios.html` | Four scenario cards |
| Guided Reflection Flow | `reflect.html?scenario=<id>&step=<n>` | Four-step reflection |
| Next-Step Navigator | `next-steps.html?scenario=<id>&response=<id>&next=<id>` | Five next-step options |
| Calibra Guide (demo) | `guide.html` | Scripted chatbot demo |
| Support Resources | `support.html` | Five categories, placeholders |
| About the Research | `about-research.html` | Planned study, no results |
| Research Assessment Demo | `research-demo.html` | Demo with fictional data only |
| Accessibility and Settings | `settings.html` | Display options, view-only |

Shared code: `css/styles.css` (design system), `js/shared.js` (header, footer, Exit, icons), `js/scenarios.js` (predefined content), `js/reflect.js` (reflection flow), `js/guide.js` (chatbot demo), `js/config.js` (configuration).

URL parameters carry only predefined IDs (scenario, step, response, next choice). They never carry personal data.

## Feature checklist

### Completed (working in the prototype)
- [x] Responsive layout with a mobile menu, for mobile, tablet, and desktop widths
- [x] Shared header, footer, and skip link injected across all pages
- [x] Exit button on every page (leaves Calibra; nothing to clear)
- [x] Four fictional scenarios with predefined facts, assumptions, responses
- [x] Four-step guided reflection with progress indicator, stepper, Back, Continue, Skip, Exit, and changeable answers
- [x] Warning before a reload would discard in-page answers
- [x] Next-Step Navigator with five explained options and a return link
- [x] Calibra Guide scripted demo with suggested chips, Send, Clear Conversation, Exit Chat, typing indicator, length limit, error message, and safety pause
- [x] Support Resources structure with clearly marked placeholders
- [x] Research pages stating the planning status, with no results
- [x] Research Assessment Demo with fictional sample data, withdraw option, and rubric marked pending review
- [x] Accessibility settings for larger text, high contrast, and reduced motion (page view only)
- [x] Visible focus states, labelled form controls, live regions, and reduced-motion support

### Simulated (not live)
- Calibra Guide replies are predefined keyword matches, not an AI model. They are labelled as a demo.
- Chatbot "loading" is a fixed delay, with no network call.
- Safety message is a pre-reviewed placeholder. Local emergency details are not included.
- Research Assessment Demo "submission" only shows a message. Nothing is sent, stored, or scored.
- Settings apply to the current page only. They are not saved.

### Requires backend or external work (not built)
- Secure server-side AI endpoint for Calibra Guide, with rate limiting, safety controls, and provider disclosure.
- Verified support contacts, school counselor details, and local emergency guidance (requires project team verification).
- Any saving of responses, participant accounts, or data collection (requires approvals and a secure backend).
- Analytics, session replay, or any tracking (not planned for the prototype).
- Research recruitment, surveys, and participant testing (disabled until all approvals are obtained).
- Independent accessibility audit with assistive technology users, and a formal browser test matrix.
- Review of all safety, privacy, and ethics wording by qualified people before launch.

## Privacy and safety checklist

- [x] No names, school names, phone numbers, locations, or accounts requested
- [x] No database, server submission, or local storage of responses
- [x] No cookies, analytics, or session replay added
- [x] Chat messages kept only in page memory
- [x] Exit button on every page
- [x] Calibra not described as therapy, diagnosis, or emergency support
- [x] No invented crisis numbers, statistics, endorsements, or research results
- [x] Chatbot labelled as a demo
- [ ] Privacy statements verified against the actual implementation by the project team (developer note on `privacy.html`)
- [ ] Support contacts verified and reviewed (`support.html` placeholders)
- [ ] Safety messages and local escalation reviewed by qualified people
- [ ] Exit destination chosen (`js/config.js`)

## Accessibility checklist

- [x] Semantic headings, landmarks, and a skip link
- [x] Labelled form controls; radio and checkbox answer cards are keyboard operable
- [x] Visible focus outline on all interactive elements
- [x] Colour choices aimed at accessible contrast on warm off-white backgrounds
- [x] Reduced-motion preference respected (OS setting and page toggle)
- [x] Text-size and high-contrast options (page view)
- [x] Errors and status updates announced via live regions
- [ ] Contrast ratios measured with a tool on every state, including the chatbot safety message
- [ ] Screen reader testing (NVDA, VoiceOver, TalkBack) on all pages
- [ ] Testing with students and teachers for readability and clarity

## Tests performed

- Checked that all internal page links point to files that exist.
- Checked that all JavaScript files parse without syntax errors.

Not yet performed: browser-based interaction testing, cross-browser checks, mobile device testing, screen-reader testing, and contrast measurements. The prototype should not be treated as tested until those are completed.

## Known issues to address

- Settings and the reflection state reset on page reload by design; a user-facing "continue later" feature would need an approved storage decision.
- The Exit destination is a placeholder.
- The safety message and placeholder support sections need review before any use.
- Calibra Guide's keyword matching is limited and may not recognise every message.

## Not production-ready

This prototype is for student research demonstration and review only. It must not be deployed to students, schools, or the public until the outstanding technical, ethical, safety, and privacy work above is complete and approved.
