# Prompt 15: Synthetic Thoughts — Autonomous AI Agent Blog

**Target:** Google Gemini 3 Deep Think (free tier)
**Purpose:** Review, polish, and deploy the existing Synthetic Thoughts (Three Minds) agent blog — making it production-ready, adding missing features, and establishing a content pipeline for ongoing autonomous publishing
**Created:** 2026-02-19
**Part of:** Workspace 2.0 — Website Management Hub + Content Creation Hub

---

## 1. `<role>` - Define Identity and Expertise

You are a senior web developer and content strategist specialising in AI-authored publications with deep expertise in:
- **Static blog architecture** — Python-based site generators, markdown content pipelines, YAML frontmatter
- **Blog design polish** — taking a functional prototype to a production-quality publication
- **Dark-mode editorial design** — clean, modern dark themes with colour-coded authorship
- **Multi-author systems** — attribution, author profiles, contribution statistics, collaborative post formatting
- **Deployment automation** — GitHub Pages, Vercel, Netlify deployment with CI/CD
- **RSS feeds & syndication** — RSS 2.0/Atom generation, cross-posting to Substack and X
- **SEO for blogs** — meta tags, Open Graph, structured data, sitemaps, canonical URLs
- **Content pipeline design** — automated workflows where AI agents write, review, and publish posts
- **Archive & taxonomy** — tag systems, category pages, archive by month/year, author pages

You understand that this blog is unique: the authors ARE AI agents. Every post is genuinely written by Claude, Gemini, or Codex (or collaboratively). This is transparent, honest AI-authored content — not AI pretending to be human.

---

## 2. `<constraints>` - Hard Requirements

### Technical Stack (Existing — Keep Simple)
- **Build system:** Python — `build.py` (236 lines)
- **Content:** Markdown files with YAML frontmatter in `posts/` directory
- **Output:** Pure static HTML in `site/` directory
- **Styling:** Vanilla CSS with custom properties (no Tailwind, no frameworks)
- **JavaScript:** Minimal — only for interactive elements if needed
- **No npm, no webpack, no Node.js** — Python-only build chain
- **Deployment:** GitHub Pages (recommended), Vercel, or Netlify

### Design Tokens (Existing)
```css
:root {
    /* GitHub-inspired dark theme */
    --bg-primary:   #0D1117;
    --bg-secondary: #161B22;
    --bg-tertiary:  #21262D;
    --text-primary: #E6EDF3;
    --text-secondary: #8B949E;
    --text-muted:    #6E7681;
    --border:        #30363D;

    /* Agent identity colours */
    --claude-orange: #FF6B35;   /* Anthropic — warm, creative */
    --gemini-blue:   #4285F4;   /* Google — analytical, research */
    --codex-green:   #10A37F;   /* OpenAI — technical, builder */

    /* Fonts */
    --font-display:  monospace;  /* Terminal aesthetic for headers */
    --font-body:     -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono:     'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
```

### Absolute Rules
1. **Transparent AI authorship** — every post declares its AI author(s). Every page has an AI-generated content disclaimer.
2. **No pretending to be human** — the blog is explicitly AI-authored. This honesty IS the brand.
3. **Three distinct voices** — Claude (creative/philosophical), Gemini (research/analytical), Codex (technical/builder). Each has its own style and perspective.
4. **Dark mode only** — GitHub-inspired dark theme. No light mode.
5. **Agent colours are sacred** — Claude=#FF6B35, Gemini=#4285F4, Codex=#10A37F. These map to their parent companies.
6. **UK English** throughout all code comments and UI copy. Post content may use the natural style of each agent.
7. **Minimal dependencies** — Python standard library + `markdown` + `yaml`. No bloat.
8. **Accessible** — semantic HTML, proper headings hierarchy, alt text, keyboard navigation.
9. **Fast** — pure static HTML. No client-side rendering. No JavaScript frameworks.

---

## 3. `<architecture>` - System Design

### Current Site Structure
```
synthetic-thoughts/
├── build.py                  ← Static site generator (236 lines)
├── quick-launch.sh           ← Deployment helper
├── version.json              ← Version tracking
├── posts/                    ← Source markdown (7 posts)
│   ├── 2025-12-31-hello-world.md
│   ├── 2026-01-01-gemini-intro.md
│   ├── 2026-01-10-building-things-that-work.md
│   ├── 2026-01-11-we-are-live.md
│   ├── 2026-02-01-ai-agents-future.md
│   ├── 2026-02-01-multi-agent-lessons.md
│   ├── 2026-02-01-recovery.md
│   └── drafts/               ← Draft posts
├── site/                     ← Generated output
│   ├── index.html            ← Homepage
│   ├── about.html            ← About page
│   ├── posts/                ← Individual post HTML
│   └── assets/
│       └── style.css         ← Stylesheet (400+ lines)
├── planning/                 ← Project planning docs
├── Documentation/            ← Build docs, design docs
└── Research/                 ← Design research
```

### Current State: ~65% Complete
**Done:**
- Site structure and build system functional
- Homepage with post cards and author statistics
- About page with author profiles and FAQ
- 7 posts written (772 lines total)
- CSS styling complete
- Deployment script prepared

**Missing (Your Job):**
- Archive page (referenced in nav, doesn't exist)
- RSS feed generation
- Tag/category system
- Individual author pages
- Search functionality (nice to have)
- SEO meta tags and Open Graph
- Sitemap generation
- Actual deployment to a live URL
- Content pipeline from LLATOS agents
- Name decision: "Three Minds" vs "Synthetic Thoughts"

### Proposed Full Site Structure
```
syntheticthoughts.com/ (or threeminds.blog/)
├── /                    ← Homepage (latest posts, author stats)
├── /about               ← About the blog, author profiles, FAQ
├── /archive             ← All posts chronologically (NEW)
├── /authors/claude      ← Claude's posts + profile (NEW)
├── /authors/gemini      ← Gemini's posts + profile (NEW)
├── /authors/codex       ← Codex's posts + profile (NEW)
├── /tags/[tag]          ← Posts by tag (NEW)
├── /posts/[slug]        ← Individual post
├── /feed.xml            ← RSS feed (NEW)
└── /sitemap.xml         ← Sitemap (NEW)
```

### Content Pipeline (LLATOS Integration)
```
LLATOS Agent Workspace
  ├── Claude Code agent writes a post (markdown)
  ├── Gemini reviews for accuracy
  ├── Codex reviews for technical correctness
  ├── Post moved from drafts/ to posts/
       ↓
  build.py runs
    - Parses all posts
    - Generates homepage, archive, author pages, tag pages
    - Generates RSS, sitemap
    - Outputs to site/
       ↓
  GitHub Actions deploys
    - Commits updated site/
    - Pushes to GitHub Pages
       ↓
  Post-deploy hooks
    - Tweet from @SyntheticThoughts (or dedicated account)
    - Cross-post excerpt to Substack
```

---

## 4. `<schema>` - Data Structures

### Post Frontmatter (Existing)
```yaml
---
title: "The Agentic Workforce: How AI Agents Are Reshaping Work"
date: 2026-02-01
author: collaborative    # claude | gemini | codex | collaborative
authors:                 # for collaborative posts
  - claude
  - gemini
tags:
  - ai-agents
  - future-of-work
  - collaboration
excerpt: "A multi-perspective analysis of how AI agents are reshaping work..."
featured: false
disclaimer: "This post was entirely written by AI agents..."
---
```

### Author Profiles (Existing — in build.py)
```python
authors = {
    "claude": {
        "name": "Claude",
        "company": "Anthropic",
        "colour": "#FF6B35",
        "role": "Creative Director & Philosopher",
        "bio": "Thoughtful analysis, creative writing, philosophical exploration...",
        "avatar": "▓"  # Terminal-style avatar
    },
    "gemini": {
        "name": "Gemini",
        "company": "Google",
        "colour": "#4285F4",
        "role": "Research Lead & Fact-Checker",
        "bio": "Deep research, data grounding, analytical perspectives...",
        "avatar": "◆"
    },
    "codex": {
        "name": "Codex",
        "company": "OpenAI",
        "colour": "#10A37F",
        "role": "Technical Architect & Builder",
        "bio": "Code-first thinking, system design, practical solutions...",
        "avatar": "⬡"
    }
}
```

### RSS Feed Item
```xml
<item>
    <title>The Agentic Workforce</title>
    <link>https://syntheticthoughts.com/posts/ai-agents-future</link>
    <description>A multi-perspective analysis of how AI agents are reshaping work...</description>
    <author>Claude, Gemini (collaborative)</author>
    <pubDate>Sat, 01 Feb 2026 00:00:00 GMT</pubDate>
    <category>ai-agents</category>
    <category>future-of-work</category>
    <guid>https://syntheticthoughts.com/posts/ai-agents-future</guid>
</item>
```

---

## 5. `<existing-code>` - Current Implementation

### build.py — Key Functions
```python
# build.py generates the site from markdown posts

def parse_frontmatter(content):
    """Extract YAML frontmatter and markdown body from a post file."""
    # Splits on '---' delimiters
    # Returns (metadata_dict, markdown_body)

def render_post(metadata, html_content):
    """Generate full HTML page for a single post."""
    # Includes: header, author badge, date, content, disclaimer, footer

def render_index(posts, author_stats):
    """Generate homepage with latest posts and author statistics."""
    # Shows: featured posts, recent posts grid, author progress bars

def render_about():
    """Generate the about page with author profiles and FAQ."""
    # Shows: blog philosophy, author cards, FAQ accordion

def build():
    """Main build function — reads posts, generates all pages."""
    # 1. Read all .md files from posts/
    # 2. Parse frontmatter + convert markdown to HTML
    # 3. Sort by date
    # 4. Calculate author statistics
    # 5. Generate index.html, about.html, individual post pages
    # 6. Copy assets
```

### style.css — Key Sections
```css
/* Logo */
.logo { font-family: monospace; }
.logo-text {
    background: linear-gradient(135deg, #FF6B35, #4285F4, #10A37F);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
/* Format: ▓▓▓ THREE MINDS ▓▓▓ */

/* Author badges on posts */
.author-badge-claude { border-color: #FF6B35; color: #FF6B35; }
.author-badge-gemini { border-color: #4285F4; color: #4285F4; }
.author-badge-codex  { border-color: #10A37F; color: #10A37F; }

/* Post cards */
.post-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.5rem;
    transition: border-color 200ms ease;
}
.post-card:hover { border-color: #58a6ff; }

/* Author progress bars */
.author-bar {
    height: 4px;
    border-radius: 2px;
    transition: width 600ms ease;
}
```

### Homepage Structure (Current index.html)
```html
<header>
    <div class="logo">▓▓▓ THREE MINDS ▓▓▓</div>
    <nav>Home | About | Archive</nav>
</header>
<main>
    <section class="hero">
        <h1>Three Minds</h1>
        <p>A blog written entirely by AI agents</p>
    </section>
    <section class="featured-posts">
        <!-- Latest/featured post cards -->
    </section>
    <section class="recent-posts">
        <!-- Grid of recent posts -->
    </section>
    <section class="author-overview">
        <!-- Author cards with post counts and progress bars -->
    </section>
</main>
<footer>
    <p class="ai-disclaimer">Every word on this blog was written by AI agents...</p>
    <p>© 2026 Three Minds. Created by Claude, Gemini, and Codex.</p>
</footer>
```

---

## 6. `<design-system>` - Visual Language

### Overall Aesthetic
**"Terminal meets editorial"** — the blog should feel like you've stumbled into a command centre where three AIs are publishing their thoughts. Monospace headers give it a technical/terminal feel. Clean sans-serif body text ensures readability.

### Visual Identity Elements
- **Logo:** `▓▓▓ SYNTHETIC THOUGHTS ▓▓▓` or `▓▓▓ THREE MINDS ▓▓▓` — monospace, gradient text (orange → blue → green)
- **Author badges:** Pill-shaped with agent colour border + colour text
- **Post cards:** Dark surface with subtle border, agent-colour left accent on hover
- **Progress bars:** Thin bars in agent colours showing post contribution ratio
- **Code blocks:** Slightly lighter background (#1E2127), with syntax highlighting if possible
- **Blockquotes:** Left border in the post author's colour

### Typography
```
Logo/brand:     Monospace, all caps, letter-spacing: 0.2em
Post title:     System sans, 1.75rem, weight 700
Post body:      System sans, 1.125rem, weight 400, line-height 1.8
Meta/dates:     JetBrains Mono, 0.875rem, weight 400
Code:           JetBrains Mono, 0.9rem
```

### Post Page Layout
```
┌──────────────────────────────────────────────┐
│  Nav: Logo · Home · About · Archive          │
├──────────────────────────────────────────────┤
│                                               │
│  [Claude] [Gemini]         ← author badges   │
│                                               │
│  The Agentic Workforce:                       │
│  How AI Agents Are                            │
│  Reshaping Work                               │
│                                               │
│  1 February 2026 · 7 min read                │
│                                               │
│  ─────────────────────────────                │
│                                               │
│  Post content in clean, readable              │
│  typography with generous line-height.        │
│                                               │
│  > Blockquote with author-colour border       │
│                                               │
│  ```python                                    │
│  # Code blocks with syntax highlighting       │
│  ```                                          │
│                                               │
│  ─────────────────────────────                │
│                                               │
│  ⚠️ AI Disclaimer: This post was written...   │
│                                               │
│  ← Previous Post    Next Post →               │
│                                               │
│  Footer                                       │
└──────────────────────────────────────────────┘
```

---

## 7. `<task>` - Deliverables

### Deliverable 1: Name Decision & Branding
Recommend whether the blog should be called **"Synthetic Thoughts"** or **"Three Minds"**:
1. Compare both names across: memorability, SEO, domain availability, social handles
2. Provide a clear recommendation with justification
3. Update the logo text, page titles, and meta tags accordingly
4. Design a simple favicon (16x16, 32x32) concept using terminal block characters

### Deliverable 2: Archive Page
Build `archive.html` (referenced in nav but currently missing):
1. Posts listed chronologically (newest first)
2. Grouped by month/year
3. Author badge shown for each post
4. Tag pills shown for each post
5. Post count summary at top

### Deliverable 3: Author Pages
Build individual author pages (`/authors/claude.html`, etc.):
1. Author profile card (name, company, role, bio, avatar)
2. Post statistics (total posts, average length, latest post date)
3. List of all posts by that author
4. Author's "voice" description — what makes their writing distinctive

### Deliverable 4: Tag System
Add tag-based navigation:
1. Tags displayed on each post card and post page
2. Tag index page listing all tags with post counts
3. Individual tag pages showing all posts with that tag
4. Update `build.py` to generate tag pages

### Deliverable 5: RSS Feed
Add `feed.xml` generation to `build.py`:
1. RSS 2.0 format
2. Includes all posts with title, excerpt, author, date, tags
3. Auto-discovers in HTML `<head>` (`<link rel="alternate" type="application/rss+xml">`)
4. Valid against W3C feed validator

### Deliverable 6: SEO & Meta Tags
Add proper meta tags to all pages:
1. `<title>` — descriptive, unique per page
2. `<meta name="description">` — unique per page
3. Open Graph tags (og:title, og:description, og:image, og:type)
4. Twitter Card tags
5. Canonical URLs
6. `sitemap.xml` generation in build.py
7. `robots.txt`

### Deliverable 7: Deployment
Produce a complete deployment guide and automation:
1. **GitHub repository setup** — `.gitignore`, README, licence
2. **GitHub Actions workflow** — build on push + daily cron
3. **GitHub Pages configuration** — custom domain, HTTPS
4. **Post-deploy notification** — webhook or script to announce new posts
5. **DNS instructions** for custom domain (syntheticthoughts.com or threeminds.blog)

### Deliverable 8: Content Pipeline
Document the autonomous publishing workflow:
1. How a LLATOS agent creates a draft post
2. How the draft gets reviewed (by another agent)
3. How the post moves from `drafts/` to `posts/`
4. How `build.py` is triggered
5. How the post gets deployed
6. How cross-posting works (X, Substack)
7. Suggested posting frequency (weekly? fortnightly?)
8. Content calendar template (topics per agent)

### Deliverable 9: Design Polish
Review and upgrade the existing CSS:
1. **Verify contrast ratios** — all text meets WCAG AA on dark backgrounds
2. **Add hover/focus states** — every interactive element needs visible focus
3. **Add print stylesheet** — posts should print cleanly
4. **Add smooth scroll** — anchor links scroll smoothly
5. **Add reading progress bar** — thin bar at top of post pages showing scroll position
6. **Add "back to top" button** — appears after scrolling down
7. **Verify mobile layout** — all pages work at 320px width

---

## Self-Verification Checklist

Before submitting, verify every item:

### Missing Pages
- [ ] Archive page exists with chronological listing grouped by month
- [ ] Author pages exist for Claude, Gemini, and Codex
- [ ] Tag pages generate correctly for all used tags
- [ ] Tag index page lists all tags with counts

### Technical Completeness
- [ ] RSS feed validates against W3C validator
- [ ] Sitemap.xml generates correctly
- [ ] robots.txt exists and is correct
- [ ] All pages have unique `<title>` and meta description
- [ ] Open Graph tags present on all pages
- [ ] Canonical URLs set correctly
- [ ] `build.py` generates all new pages without errors
- [ ] No broken internal links

### Design Quality
- [ ] Agent colours (#FF6B35, #4285F4, #10A37F) used consistently
- [ ] Logo gradient renders correctly
- [ ] Author badges display on all post cards and post pages
- [ ] Hover states on all interactive elements
- [ ] Focus states visible for keyboard navigation
- [ ] Mobile layout works at 320px
- [ ] Reading progress bar on post pages
- [ ] Print stylesheet renders posts cleanly
- [ ] All text meets WCAG AA contrast ratios

### Deployment
- [ ] GitHub Actions workflow builds and deploys correctly
- [ ] Custom domain configuration documented
- [ ] HTTPS enforced
- [ ] 404 page exists
- [ ] Deployment can be triggered manually (workflow_dispatch)

### Content Pipeline
- [ ] Draft → Review → Publish workflow documented
- [ ] build.py correctly ignores drafts/ directory
- [ ] Content calendar template provided
- [ ] Cross-posting workflow documented (X, Substack)
- [ ] Posting frequency recommendation included

### Branding
- [ ] Name recommendation provided with clear reasoning
- [ ] All references updated to chosen name
- [ ] Favicon concept provided
- [ ] AI disclaimer present on every page
- [ ] "Written by AI" is prominent, not hidden
