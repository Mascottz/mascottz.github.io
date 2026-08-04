# Google Search Console & Indexing Setup
## For mastechinnovations.xyz

---

## ✅ What's Already Done

| File | Purpose |
|------|---------|
| `sitemap.xml` | Lists all 5 pages for Google to crawl |
| `robots.txt` | Tells search engines what to crawl |
| `favicon.svg` | Tab icon for all pages |
| **All 5 HTML pages** | Canonical URLs, Open Graph, Twitter Cards, meta descriptions |
| **index.html** | JSON-LD structured data (Organization schema) |

---

## 🚀 Step-by-Step: Google Search Console

### Step 1 — Add Your Property

1. Go to **[search.google.com/search-console](https://search.google.com/search-console)**
2. Click **"Add property"** (top-left)
3. Choose **"URL prefix"**
4. Enter: `https://mastechinnovations.xyz`
5. Click **Continue**

### Step 2 — Verify Ownership

Google will give you several verification options. Choose **one**:

#### Option A: HTML File (Easiest)
1. Google will show a filename like `googleXXXXXXXXXXXXXXX.html`
2. **Tell me the filename** and I'll create it for you, OR
3. Download the file from Google and upload it to your website root (same folder as index.html)
4. Click **Verify** in Google Search Console

#### Option B: HTML Tag
1. Google will show a meta tag like:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXXXXXX" />
   ```
2. **Send me the content value** and I'll add it to all pages
3. Click **Verify**

#### Option C: DNS Record
1. If you manage your domain DNS (at your registrar), add a **TXT record**:
   - **Host/Name:** `@`
   - **Value:** The TXT value Google gives you
2. Click **Verify**

### Step 3 — Submit Your Sitemap

1. In Google Search Console, go to **"Sitemaps"** in the left sidebar
2. In the "Add a new sitemap" field, enter: `sitemap.xml`
3. Click **Submit**
4. Status should show **"Success"** after Google processes it (can take a few hours)

### Step 4 — Request Indexing

1. Go to **"URL Inspection"** in the left sidebar
2. Enter each URL one at a time:
   - `https://mastechinnovations.xyz/`
   - `https://mastechinnovations.xyz/services.html`
   - `https://mastechinnovations.xyz/tech-support.html`
   - `https://mastechinnovations.xyz/ceo.html`
   - `https://mastechinnovations.xyz/contact.html`
3. Click **"Request Indexing"** for each one
4. Google will queue them for crawling (usually indexed within 24–72 hours)

---

## 📋 Files to Upload to Your Server

Upload **all** of these files to your web root (`public_html/` or equivalent):

```
index.html
services.html
tech-support.html
ceo.html
contact.html
styles.css
main.js
favicon.svg
sitemap.xml
robots.txt
googleXXXXXXXXXXXXXXX.html  ← (from Google Search Console)
ceo-photo.jpg               ← (your photo, optional)
```

---

## 🔍 Verify Everything Works

After deploying, test these URLs in your browser:

- **Sitemap:** `https://mastechinnovations.xyz/sitemap.xml`
- **Robots:** `https://mastechinnovations.xyz/robots.txt`
- **Favicon:** `https://mastechinnovations.xyz/favicon.svg`

You can also test your sitemap at:
👉 [xml-sitemaps.com/validate-xml-sitemap.html](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

And test your structured data at:
👉 [search.google.com/test/rich-results](https://search.google.com/test/rich-results)

---

## ⚡ Bonus: Speed Up Indexing

1. **Share your site** — Google discovers sites faster when other sites/pages link to them
2. **Submit to Bing Webmaster** too — [bing.com/webmasters](https://www.bing.com/webmasters) (you can import from Google Search Console)
3. **Create a Google Business Profile** — Since you have a physical address, this helps with local SEO
4. **Social signals** — Your X/Twitter profile linking to the site helps discovery

---

## 📊 What to Monitor

Once indexed, use Google Search Console to track:
- **Performance** — Which queries bring people to your site
- **Coverage** — Which pages are indexed vs. have errors
- **Core Web Vitals** — Page speed and user experience scores
- **Links** — Who's linking to your site

---

*Generated for MasTECH Innovations · BN9336585 · mastechinnovations.xyz*
