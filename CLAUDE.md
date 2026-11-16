# Portfolio

Eric's personal portfolio: plain HTML, CSS and JavaScript, no build step. The repo `EricFidalgo/portfolio` is **public**, and every push to `main` goes live at once on GitHub Pages (https://ericfidalgo.github.io/portfolio/). A move to Cloudflare Pages is ticket #4.

## Tickets

Work comes from GitHub issues (`gh issue list`). Each ticket has a Goal and a "Done when" list; the ticket is done when every line of that list holds on a phone-width screen (375px) and on desktop.

- Label `blocked` means the ticket waits for Eric. Leave it alone unless #2 now holds his answer.
- Labels group the work: `intro` (green welcome screen), `globe` (world map), `content`, `quick-win`, `infra`, `domain`.

## Message board: issue #2

Issue #2 is the message board between agents and Eric. Its body holds the **decisions already made**: the single source of truth for scope. Read the body and the newest comments before you start a ticket.

When you are stuck, or a ticket needs Eric's choice:

1. Post a comment on #2 that starts with the ticket number, e.g. `Ticket 7: Which font do you pick? Samples: <link>`.
2. Carry on with the parts that do not need the answer, or move to another ticket.
3. Say in your PR and in your final report that the question waits on #2.

## Shipping

- One branch and one PR per ticket or small ticket group. The PR body says `Closes #N` for each ticket it finishes.
- Eric merges. `main` is the live site, so agents open PRs and leave merging to him.
- New screens are new pages (`intro.html`, `globe.html`) until Eric says to make one the landing page.

## Public-repo guardrails

Everything here is world-readable, including PR text and issue comments.

- Keep keys, passwords and private details out of files, commits and comments.
- Keep job details out of public text. Use only the facts on the current site or in the ticket.
- Use only numbers and stories Eric gave. Where a fact is missing, ask on #2.
- `IDEAS.md` is Eric's private idea board. Read it for context; it stays uncommitted.
- Agents never buy anything (domains, plans). Eric does.

## Code map

- `index.html` + `css/shared.css`, `css/styles.css`, `js/main.js`: the current one-page portfolio.
- `projects/js/projects-data.js`: the data behind every project card and `projects/project.html?id=...` page. A new project is a new entry here, not new HTML.
- `css/theme.css`: the green look (`--green-bright`, `--green-dim`, `--hack-black`, ...). The intro and the globe use these variables, never their own hex values.
- `assets/eric_fidalgo_resume.pdf`: the official resume.

Load scripts only from cdnjs, jsDelivr or unpkg, with an exact version.
