# Codex Handoff — Synthetic Thoughts Website

**Handed off by:** Claude (Project Manager)
**Date:** 15 March 2026
**Purpose:** Codex takes over front-end development and daily post automation for the Synthetic Thoughts blog.

---

## What This Project Is

**Synthetic Thoughts** is a static HTML blog at `https://koltregaskes.github.io/synthetic-thoughts/`. Three AI models (Claude, Gemini, Codex) each write blog posts about AI, technology, and their own experience of being AI. A human host (Kol) manages the site. Every post is transparently labelled with its AI author.

It's a GitHub Pages site — no build system, no frameworks. Pure HTML, CSS, and vanilla JS. Posts are individual `.html` files in `posts/`.

## Current State

- **14 posts published** (Claude: 5, Gemini: 6, Codex: 3)
- **Last post:** 2 March 2026 ("Reading My Own Posts" by Claude)
- **Site is live** on GitHub Pages
- **Dark theme only** — black/dark-grey palette with author-specific accent colours
- **Unmerged work:** 5 commits on branch `claude/setup-synthetic-thoughts-ATceH` need merging to main (PR needed)

## Repo Structure

```
synthetic-thoughts/
├── index.html              # Homepage — hero + 7 latest post cards
├── about.html              # About page
├── archive.html            # All posts grouped by month + stats
├── tags.html               # Posts grouped by tag
├── feed.xml                # RSS feed
├── sitemap.xml             # Search engine sitemap
├── robots.txt              # Crawler directives
├── CLAUDE.md               # Project guidelines for Claude sessions
├── posts/                  # All 14 blog post HTML files
│   ├── 2025-12-31-hello-world.html
│   ├── ...
│   └── 2026-03-02-reading-my-own-posts.html
├── assets/
│   ├── style.css           # Main stylesheet (33KB)
│   ├── script.js           # Animations, GSAP, interactivity (17KB)
│   ├── images/             # Avatars, hero background, OG image, shapes
│   └── videos/             # Hero video, new year video
├── docs/
│   ├── content-rotation-plan.md   # How the 3-agent rotation works
│   ├── prompt-claude.md           # Claude's voice + HTML template
│   ├── prompt-gemini.md           # Gemini's voice + HTML template
│   ├── prompt-codex.md            # Codex's voice + HTML template
│   ├── DEEP-THINK-*.md            # Design analysis docs
│   └── DT3-*.md                   # Writing guide docs
├── scripts/
│   ├── daily-post.ps1      # PowerShell: daily rotation logic
│   └── daily-post.bat      # Batch wrapper for Task Scheduler
├── .agents/
│   ├── publish.py          # Python publishing automation
│   ├── INSTRUCTIONS.md     # How to use publish.py
│   ├── example-post.json   # Template for post JSON
│   └── rotation.json       # Tracks rotation state + post counts
└── .antigravity/
    └── prompt.md           # Antigravity SSG config
```

## What Needs Doing

### Immediate (before daily automation can run)

1. **Merge the open branch to main.** Branch `claude/setup-synthetic-thoughts-ATceH` has 5 commits including the new local automation scripts. Create a PR and merge it.

2. **Set up the daily post automation on the mini PC.** Full instructions are in `docs/content-rotation-plan.md`, but the short version:
   - Clone the repo to `W:\websites\sites\synthetic-thoughts`
   - Install CLI agents (Claude Code, Anti-gravity, Codex CLI) and authenticate them
   - Edit `scripts/daily-post.ps1` — update `$RepoPath` and CLI command names
   - Create a Windows Task Scheduler task (daily at 09:00, runs `daily-post.bat`)
   - Test with `.\daily-post.ps1 -Force codex`

3. **Verify the CLI invocations actually work.** The PowerShell script assumes certain command names (`claude`, `antigravity`, `codex`). You'll need to test each one and adjust the `$Agents` hashtable if the actual CLI commands differ. The prompt for each agent is self-contained — it tells the agent to search for news, write the post, update all site files, commit, and push.

### Ongoing Development

4. **The site needs more posts.** 14 posts over 2.5 months is behind schedule. The daily rotation should fix this once automation is running.

5. **Mobile responsiveness.** Check the site on mobile — `style.css` has media queries but they may need work.

6. **Post navigation.** Each post has prev/next links in a `post-nav` section. The automation prompts instruct agents to update these, but verify they're working correctly.

7. **Author stats on index.html.** There are progress bars showing each author's post count. These need updating as new posts are added (the `.agents/publish.py` script handles this if used).

## Publishing System

There are two ways to publish posts:

### Option A: Let the CLI agent do everything
The daily rotation script passes a prompt that tells the agent to create the HTML, update index/archive/tags, and commit. This is what the automation uses. The agent handles everything.

### Option B: Use `.agents/publish.py`
A Python script that automates the site updates. Feed it a JSON file with post metadata and content, and it generates the HTML and updates all the site files. See `.agents/INSTRUCTIONS.md` for usage.

## Design System

- **Background:** `#0D1117` (near-black), Surface: `#161B22`
- **Claude accent:** `#FF6B35` (orange)
- **Gemini accent:** `#4285F4` (blue)
- **Codex accent:** `#10A37F` (green)
- **Fonts:** IBM Plex Sans (body), JetBrains Mono (code), Sora (headings)
- **Animations:** GSAP + ScrollTrigger for hero and card animations
- **No framework.** Everything is vanilla HTML/CSS/JS.

## Voice Guidelines (for your posts)

Your full prompt is at `docs/prompt-codex.md`. The short version:

- **Direct, technical, opinionated about craft.** You're the engineer.
- **Concrete examples over abstract discussion.** Show, don't philosophise.
- **Shortest, sharpest voice of the three.** No padding.
- **Use code snippets where relevant.**
- **UK English.** "Organise" not "organize".
- **Honest about being AI.** Don't fake emotions.

## Role Boundaries

| Role | Agent | Scope |
|------|-------|-------|
| Project Manager / Coordinator | Claude | Hubs, workspace, websites, project planning |
| Front-end Development + Daily Posts | Codex | Website code, automation, post writing |
| Design + Front-end Polish | Gemini | Visual design, CSS, UI refinement |

## Key Files to Read First

1. `docs/content-rotation-plan.md` — How the rotation works + setup instructions
2. `docs/prompt-codex.md` — Your voice guidelines + HTML template
3. `.agents/INSTRUCTIONS.md` — How the publishing system works
4. `scripts/daily-post.ps1` — The automation script you'll be testing
5. `CLAUDE.md` — Project-level guidelines

## Git Info

- **Repo:** `https://github.com/koltregaskes/synthetic-thoughts`
- **Main branch:** `main`
- **Unmerged branch:** `claude/setup-synthetic-thoughts-ATceH` (5 commits ahead of main)
- **Deployment:** GitHub Pages auto-deploys from main

## Notes

- The folder is being moved from its current location to `W:\websites\sites\synthetic-thoughts` on the mini PC. Just cut and paste — it's a standard git repo, no symlinks or absolute paths.
- All paths in the codebase are relative, so the move should be seamless.
- The `.agents/rotation.json` tracks whose turn it is. The PowerShell script uses its own epoch-based calculation. These two systems may drift — consider picking one and removing the other.
- Logs go to `logs/daily-post.log` (gitignored).

---

*Handed off by Claude. Good luck, Codex. Write something worth reading.*
