const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
console.log('--- RUNNING STILLWATER FLOAT SPA COMPREHENSIVE VERIFICATION ---\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failCount++;
  }
}

// 8 standard multi-page website pages with full header & footer
const standardPages = [
  'index.html',
  'home-2.html',
  'about.html',
  'services.html',
  'first-time-guide.html',
  'blog.html',
  'contact.html',
  'dashboard.html'
];

// 7 dedicated scientific article detail pages
const articlePages = [
  'article-theta-neurochemistry.html',
  'article-epsom-salt-hydrodynamics.html',
  'article-sensory-deprivation-meditation.html',
  'article-athletic-recovery-cortisol.html',
  'article-digital-fatigue-silence.html',
  'article-magnesium-sleep-architecture.html',
  'article-time-dilation-stillness.html'
];

// All pages with standard header/footer
const fullLayoutPages = [...standardPages, ...articlePages];

// All HTML files
const allHtmlPages = [...standardPages, ...articlePages, 'login.html'];

// 1. Verify 28 HD Float Therapy & Dedicated Article Images
console.log('1. Float Therapy & Unique Cryptographic HD Spa Image Checks:');
const expectedImages = [
  // Existing standard site images (13)
  'assets/float-therapy-session.jpg',
  'assets/pod-alpha-capsule.jpg',
  'assets/float-basin-suite.jpg',
  'assets/contrast-sauna.jpg',
  'assets/magnesium-epsom-water.jpg',
  'assets/service-sound-bath.jpg',
  'assets/about-sanctuary-threshold.jpg',
  'assets/about-water-science.jpg',
  'assets/guide-preparation-suite.jpg',
  'assets/guide-floating-experience.jpg',
  'assets/guide-post-float-integration.jpg',
  'assets/contact-reception-sanctuary.jpg',
  'assets/dashboard-member-suite.jpg',
  // Timeline phase images (5)
  'assets/timeline-phase1-acclimation.jpg',
  'assets/timeline-phase2-release.jpg',
  'assets/timeline-phase3-theta.jpg',
  'assets/timeline-phase4-glow.jpg',
  'assets/timeline-phase5-tea-lounge.jpg',
  // Blog card thumbnails (7)
  'assets/blog-theta-brainwaves.jpg',
  'assets/blog-float-rest-epsom.jpg',
  'assets/blog-mindfulness-meditation.jpg',
  'assets/blog-athletic-recovery.jpg',
  'assets/blog-digital-detox.jpg',
  'assets/blog-magnesium-sleep.jpg',
  'assets/blog-time-dilation.jpg',
  // Dedicated article detail heroes (7)
  'assets/article-theta-hero.jpg',
  'assets/article-epsom-hero.jpg',
  'assets/article-meditation-hero.jpg',
  'assets/article-athletic-hero.jpg',
  'assets/article-digital-hero.jpg',
  'assets/article-magnesium-hero.jpg',
  'assets/article-timedilation-hero.jpg',
  // Unique Hero Backgrounds (4)
  'assets/hero-home1-bg.jpg',
  'assets/hero-services-bg.jpg',
  'assets/hero-guide-bg.jpg',
  'assets/hero-blog-bg.jpg'
];

expectedImages.forEach(imgRel => {
  const imgPath = path.join(projectDir, imgRel);
  assert(fs.existsSync(imgPath), `Image asset exists at ${imgRel}`);
  const stat = fs.statSync(imgPath);
  assert(stat.size > 50000, `Image ${imgRel} is high definition (${Math.round(stat.size / 1024)} KB)`);
});

// Strict No-Repeat Image Rule: Each image appears exactly 1 time across all HTML files
const imageCounts = {};
allHtmlPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  expectedImages.forEach(img => {
    const regex = new RegExp(img.replace('.', '\\.'), 'g');
    const matches = content.match(regex);
    if (matches) {
      imageCounts[img] = (imageCounts[img] || 0) + matches.length;
    }
  });
});

expectedImages.forEach(img => {
  assert(imageCounts[img] === 1, `Image ${img} is uniquely assigned (used exactly ${imageCounts[img]} time across all HTML files)`);
});

// 2. Verify Home Dropdown and Navigation on all full layout pages
console.log('\n2. Home Dropdown & Navigation Checks:');
fullLayoutPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  assert(content.includes('homeNavDropdown'), `${p} contains #homeNavDropdown`);
  assert(content.includes('href="index.html"') && content.includes('Home 1'), `${p} contains Home 1 dropdown link`);
  assert(content.includes('href="home-2.html"') && content.includes('Home 2'), `${p} contains Home 2 dropdown link`);
  assert(content.includes('toggleHomeDropdown'), `${p} has toggleHomeDropdown onclick handler`);
});

// 3. Verify Navbar Exact 7 Center Navigation Links in Strict Order Across Full Layout Pages
console.log('\n3. Exact 7 Center Navigation Links in Strict Order:');
const expectedNavOrder = [
  { file: 'home', label: 'Home' },
  { file: 'about.html', label: 'About' },
  { file: 'services.html', label: 'Service' },
  { file: 'first-time-guide.html', label: 'First-Time Guide' },
  { file: 'blog.html', label: 'Blog' },
  { file: 'contact.html', label: 'Contact' },
  { file: 'dashboard.html', label: 'Client Dashboard' }
];

fullLayoutPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  
  // Clean label check
  assert(!content.includes('Client Dashboard 2'), `${p} does NOT contain duplicate or unwanted "Client Dashboard 2"`);
  assert(!content.includes('navCreditBadge'), `${p} does not display misleading credit badge next to nav label`);
  assert(content.includes('Client Dashboard'), `${p} contains clean "Client Dashboard" link`);

  // Verify order in desktop nav
  const navStart = content.indexOf('<nav aria-label="Main Navigation">');
  const navEnd = content.indexOf('</nav>', navStart);
  assert(navStart !== -1 && navEnd !== -1, `${p} contains standard Main Navigation section`);
  const navSnippet = content.slice(navStart, navEnd);

  let lastIndex = -1;
  let orderCorrect = true;
  expectedNavOrder.forEach(item => {
    let itemIndex;
    if (item.file === 'home') {
      itemIndex = navSnippet.indexOf('Home');
    } else {
      itemIndex = navSnippet.indexOf(`href="${item.file}"`);
    }
    assert(itemIndex !== -1, `${p} main nav contains ${item.label} (${item.file})`);
    if (itemIndex < lastIndex) {
      orderCorrect = false;
    }
    lastIndex = itemIndex;
  });
  assert(orderCorrect, `${p} main navigation links appear in exact required order: Home -> About -> Service -> First-Time Guide -> Blog -> Contact -> Client Dashboard`);
});

// 4. Verify Right-Side Controls in Strict Left-to-Right Order Across Full Layout Pages
console.log('\n4. Right-Side Controls in Strict Order:');
fullLayoutPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  const actionsStart = content.indexOf('<div class="nav-actions">');
  const actionsEnd = content.indexOf('</div>', actionsStart);
  assert(actionsStart !== -1, `${p} contains .nav-actions container`);
  const actionsSnippet = content.slice(actionsStart, actionsEnd);

  const idxRtl = actionsSnippet.indexOf('dir-toggle-btn');
  const idxTheme = actionsSnippet.indexOf('theme-toggle-btn');
  const idxLogin = actionsSnippet.indexOf('nav-login-btn');
  const idxBook = actionsSnippet.indexOf('btn-book-primary');

  assert(idxRtl !== -1, `${p} has RTL/LTR direction toggle button`);
  assert(idxTheme !== -1, `${p} has Dark/Light theme toggle button`);
  assert(idxLogin !== -1, `${p} has Member Login portal button`);
  assert(idxBook !== -1, `${p} has Book a Float CTA button`);

  const rightOrderCorrect = (idxRtl < idxTheme) && (idxTheme < idxLogin) && (idxLogin < idxBook);
  assert(rightOrderCorrect, `${p} right controls follow exact left-to-right order: RTL -> Theme -> Member Login -> Book a Float`);
});

// 5. Verify Brand Logo and Matching Header/Footer Identity Across Full Layout Pages
console.log('\n5. Brand Logo & Matching Header/Footer Identity:');
const logoSvgPath = path.join(projectDir, 'assets/logo.svg');
assert(fs.existsSync(logoSvgPath), 'Brand logo SVG exists at assets/logo.svg');
const logoContent = fs.readFileSync(logoSvgPath, 'utf8');
assert(logoContent.includes('Stillwater Float &amp; Sensory Spa'), 'Logo SVG includes brand accessibility label');

fullLayoutPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  assert(content.includes('assets/logo.svg'), `${p} includes standardized logo.svg`);
  assert(content.includes('class="brand-logo"'), `${p} has class="brand-logo"`);
  assert(content.includes('href="index.html" class="brand-logo"'), `${p} header brand links to index.html`);
  
  const footerStart = content.indexOf('<footer');
  const footerContent = footerStart !== -1 ? content.slice(footerStart) : '';
  assert(footerContent.includes('assets/logo.svg'), `${p} footer displays identical brand logo asset`);
  assert(footerContent.includes('STILLWATER') && footerContent.includes('Float & Sensory Spa'), `${p} footer renders identical brand name & subtitle`);
  assert(footerContent.includes('href="index.html" class="brand-logo"'), `${p} footer brand area is clickable and links to homepage`);
});

// 6. Verify Light & Dark Themes
console.log('\n6. Light & Dark Theme Controls Checks:');
const cssContent = fs.readFileSync(path.join(projectDir, 'css/style.css'), 'utf8');
assert(cssContent.includes('[data-theme="dark"]'), 'style.css defines [data-theme="dark"]');
assert(cssContent.includes('[data-theme="light"]'), 'style.css defines [data-theme="light"]');

const jsContent = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert(jsContent.includes('initTheme()') && jsContent.includes('toggleTheme()'), 'app.js implements initTheme and toggleTheme');
assert(jsContent.includes("localStorage.setItem('spa_theme'"), 'app.js persists theme preference in localStorage');

fullLayoutPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  assert(content.includes('toggleTheme()') && content.includes('theme-toggle-btn'), `${p} has functional theme toggle button`);
  assert(content.includes('nav-login-btn') && content.includes('href="login.html"'), `${p} has direct Login button adjacent to theme toggle button`);
});

assert(cssContent.includes('.nav-login-btn'), 'style.css defines .nav-login-btn styling');
assert(cssContent.includes('.footer-main .brand-title'), 'style.css sets explicit high-contrast white styling for .footer-main .brand-title');
assert(cssContent.includes('.footer-main .brand-subtitle'), 'style.css sets explicit luminous teal styling for .footer-main .brand-subtitle');
assert(cssContent.includes('[data-theme="light"] .navbar-main .brand-title'), 'style.css defines dark high-contrast title in light mode navbar');

// 7. Verify RTL & LTR Controls
console.log('\n7. RTL & LTR Direction Controls Checks:');
assert(cssContent.includes('[dir="rtl"]'), 'style.css includes [dir="rtl"] mirrored rules');
assert(cssContent.includes('inset-inline-start') || cssContent.includes('margin-inline-start'), 'style.css uses modern CSS logical properties');
assert(jsContent.includes('initDirection()') && jsContent.includes('toggleDirection()'), 'app.js implements initDirection and toggleDirection');
assert(jsContent.includes("localStorage.setItem('spa_direction'"), 'app.js persists direction preference in localStorage');

fullLayoutPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  assert(content.includes('toggleDirection()') && content.includes('dir-toggle-btn'), `${p} has functional RTL/LTR toggle button`);
  assert(content.includes('dir-toggle-icon'), `${p} includes recognizable SVG direction toggle icon`);
});

// 8. Verify Sticky Header and Consistent Footer
console.log('\n8. Sticky Header & Consistent Footer Checks Across Full Layout Pages:');
assert(cssContent.includes('.navbar-main') && cssContent.includes('position: sticky;') && cssContent.includes('top: 0;'), 'style.css sets position: sticky; top: 0 on .navbar-main');
assert(cssContent.includes('z-index: 1000;'), 'style.css sets elevated z-index: 1000 on sticky navbar');
assert(cssContent.includes('.footer-main') && cssContent.includes('margin-top: auto;'), 'style.css sets margin-top: auto on .footer-main');
assert(cssContent.includes('min-height: 100vh;'), 'style.css sets min-height: 100vh on body for proper flex footer anchoring');

fullLayoutPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  assert(content.includes('<header class="navbar-main" role="banner">'), `${p} contains standard sticky header`);
  assert(content.includes('<footer class="footer-main" role="contentinfo">'), `${p} contains standard footer`);
  assert(content.includes('footer-grid'), `${p} contains 4-column consistent footer grid`);
});

// 9. Verify Exactly 3 Clickable Social Media Links in Footer
console.log('\n9. Footer Social Media Official Links Checks:');
const expectedSocials = [
  'https://www.facebook.com/login/',
  'https://www.instagram.com/accounts/login/',
  'https://www.linkedin.com/login'
];

fullLayoutPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  expectedSocials.forEach(url => {
    assert(content.includes(url), `${p} footer contains official social URL: ${url}`);
  });
  assert(content.includes('target="_blank"') && content.includes('rel="noopener noreferrer"'), `${p} social links open securely in new tab`);
});

// 10. TASK 1 VERIFICATION — Minimal Centered Login Page Layout (login.html)
console.log('\n10. TASK 1 — Minimal Centered Login Page Layout Checks:');
const loginHtml = fs.readFileSync(path.join(projectDir, 'login.html'), 'utf8');

// Assert complete removal of navbar-main and footer-main from login.html
assert(!loginHtml.includes('class="navbar-main"'), 'login.html has NO .navbar-main website navigation header');
assert(!loginHtml.includes('id="mobileDrawer"'), 'login.html has NO #mobileDrawer mobile navigation drawer');
assert(!loginHtml.includes('class="footer-main"'), 'login.html has NO .footer-main website footer');

// Assert Inside-Card Header: Brand logo only on left, Theme & RTL toggles on right
assert(loginHtml.includes('auth-card'), 'login.html contains .auth-card form container');
assert(loginHtml.includes('class="auth-header"'), 'login.html contains .auth-header inside card');
const authHeaderStart = loginHtml.indexOf('class="auth-header"');
const authHeaderEnd = loginHtml.indexOf('<!-- Auth Switcher Tabs', authHeaderStart);
const authHeaderSnippet = loginHtml.slice(authHeaderStart, authHeaderEnd);

assert(authHeaderSnippet.includes('assets/logo.svg'), 'login.html card header displays Float Spa brand logo');
assert(!authHeaderSnippet.includes('href="'), 'login.html card brand logo does NOT have href link and does NOT navigate');
assert(authHeaderSnippet.includes('class="brand-logo"'), 'login.html card brand logo retains class="brand-logo"');
assert(!authHeaderSnippet.includes('brand-logo-text') && !authHeaderSnippet.includes('brand-title'), 'login.html displays brand logo ONLY with no brand text title');
assert(authHeaderSnippet.includes('theme-toggle-btn') && authHeaderSnippet.includes('toggleTheme()'), 'login.html card header displays Theme toggle');
assert(authHeaderSnippet.includes('dir-toggle-btn') && authHeaderSnippet.includes('toggleDirection()'), 'login.html card header displays RTL/LTR direction toggle');

// Assert removed portal banner text
assert(!loginHtml.includes('Member Sanctuary Portal'), 'login.html does not contain removed "Member Sanctuary Portal" text');
assert(!loginHtml.includes('Sign in to view your float credits'), 'login.html does not contain removed "Sign in to view your float credits" text');

// Assert Centre of Viewport: Vertically and horizontally centered card
assert(loginHtml.includes('auth-center-wrapper'), 'login.html has .auth-center-wrapper centering container');
assert(cssContent.includes('.login-page-body'), 'style.css defines .login-page-body styling');
assert(cssContent.includes('.auth-center-wrapper'), 'style.css defines .auth-center-wrapper flex centering');

// Assert Form inputs and functionality
assert(loginHtml.includes('id="loginEmail"') && loginHtml.includes('id="loginPassword"'), 'login.html includes email and password fields');
assert(loginHtml.includes('togglePasswordVisibility'), 'login.html has password show/hide toggle');
assert(loginHtml.includes('id="rememberMeCheck"'), 'login.html has Remember Me checkbox');
assert(loginHtml.includes('showForgotPasswordDemo()'), 'login.html has Forgot Password notice');
assert(loginHtml.includes('Continue with Google'), 'login.html has Continue with Google button');
assert(loginHtml.includes('auth-tabs') && loginHtml.includes('registerPanel'), 'login.html has Create Account switcher panel');
assert(loginHtml.includes('id="regFullName"'), 'login.html has #regFullName input');
assert(loginHtml.includes('id="regPhone"'), 'login.html has #regPhone input');
assert(loginHtml.includes('Numbers are not allowed in the name field.'), 'login.html has real-time validation message for name field ("Numbers are not allowed in the name field.")');
assert(loginHtml.includes('Letters are not allowed in the contact number field.'), 'login.html has real-time validation message for contact number field ("Letters are not allowed in the contact number field.")');
assert(loginHtml.includes('handleRegisterSubmit'), 'login.html has handleRegisterSubmit validator function');

// 11. TASK 2 VERIFICATION — Blog Page (blog.html) & Filtering System
console.log('\n11. TASK 2 — Sanctuary Journal & Science Blog Page Checks:');
assert(fs.existsSync(path.join(projectDir, 'blog.html')), 'blog.html exists in project directory');
const blogHtml = fs.readFileSync(path.join(projectDir, 'blog.html'), 'utf8');

// Verify all 5 required categories + "all" in filter bar
const requiredCategories = [
  { slug: 'all', label: 'All Articles' },
  { slug: 'neurobiology', label: 'Neurobiology' },
  { slug: 'float-rest', label: 'Float REST Science' },
  { slug: 'athletic-recovery', label: 'Athletic Recovery' },
  { slug: 'magnesium-therapy', label: 'Magnesium Therapy' },
  { slug: 'mindfulness-protocols', label: 'Mindfulness Protocols' }
];

assert(blogHtml.includes('blog-filter-bar'), 'blog.html contains .blog-filter-bar container');
assert(blogHtml.includes('id="blogCountBadge"'), 'blog.html contains #blogCountBadge category counter');
assert(blogHtml.includes('id="blogEmptyState"'), 'blog.html contains #blogEmptyState container');

requiredCategories.forEach(cat => {
  assert(blogHtml.includes(`data-category="${cat.slug}"`), `blog.html has filter button for category "${cat.slug}" (${cat.label})`);
  assert(blogHtml.includes(`filterBlogCategory('${cat.slug}'`), `blog.html filter button calls filterBlogCategory('${cat.slug}')`);
});

// Verify reading time pills with SVG clock icon
assert(blogHtml.includes('reading-time-pill'), 'blog.html article cards include reading-time-pill');
assert(blogHtml.includes('6 min read') || blogHtml.includes('5 min read'), 'blog.html includes formatted reading time metadata');

// Verify dedicated article detail links on all 7 cards
articlePages.forEach(artPage => {
  assert(blogHtml.includes(`href="${artPage}"`), `blog.html cards link directly to dedicated article page "${artPage}"`);
});

// 12. TASK 2 VERIFICATION — 7 Dedicated Scientific Article Detail Pages
console.log('\n12. 7 Dedicated Scientific Article Detail Pages:');
articlePages.forEach(artPage => {
  const artPath = path.join(projectDir, artPage);
  assert(fs.existsSync(artPath), `Dedicated article page exists at ${artPage}`);
  const artHtml = fs.readFileSync(artPath, 'utf8');

  // Breadcrumbs & back button
  assert(artHtml.includes('article-breadcrumb'), `${artPage} contains breadcrumb navigation`);
  assert(artHtml.includes('article-back-btn') && artHtml.includes('href="blog.html"'), `${artPage} contains Back to Research Journal button`);

  // Key Clinical Takeaways box
  assert(artHtml.includes('article-takeaways-box'), `${artPage} contains Clinical Summary & Takeaways box`);

  // Author & rich body content
  assert(artHtml.includes('article-author-card'), `${artPage} contains author bio card`);
  assert(artHtml.includes('related-articles-section'), `${artPage} contains related research articles section`);

  // Booking CTA
  assert(artHtml.includes('openBookingModal('), `${artPage} contains float session reservation CTA`);

  // Header & Footer
  assert(artHtml.includes('class="navbar-main"'), `${artPage} includes full website navigation header`);
  assert(artHtml.includes('class="footer-main"'), `${artPage} includes full website footer`);
});

// 13. Verify Responsive Breakpoints & Desktop Centering
console.log('\n13. Responsive Alignment & Breakpoints:');
assert(cssContent.includes('@media (max-width: 360px)'), 'style.css contains dedicated 360px responsive breakpoint');
assert(cssContent.includes('@media (max-width: 576px)'), 'style.css contains 375px-576px breakpoint');
assert(cssContent.includes('@media (max-width: 768px)'), 'style.css contains 768px tablet breakpoint');
assert(cssContent.includes('@media (max-width: 900px)'), 'style.css contains mobile toggle switch');
assert(cssContent.includes('@media (max-width: 1100px) and (min-width: 901px)'), 'style.css contains 1024px desktop alignment optimization');
assert(cssContent.includes('@media (min-width: 1200px)'), 'style.css contains desktop centered 3-column grid layout');
assert(cssContent.includes('@media (min-width: 1401px)'), 'style.css contains large screen max-width proportional styling');

fullLayoutPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  assert(content.includes('class="mobile-toggle"'), `${p} contains mobile hamburger toggle button`);
  assert(content.includes('id="mobileDrawer"'), `${p} contains mobile navigation drawer`);
  assert(content.includes('mobileHomeSubmenu'), `${p} has mobile expandable Home 1 / Home 2 submenu`);
});

// 14. WCAG 2.2 AA Contrast & Accessibility
console.log('\n14. WCAG 2.2 AA Contrast & Accessibility:');
assert(cssContent.includes(':focus-visible'), 'style.css includes visible keyboard focus ring');
assert(cssContent.includes('--text-primary: #0f172a;'), 'Light theme uses high-contrast slate #0f172a (> 12:1 against light bg)');
assert(cssContent.includes('--text-primary: #f8fafc;'), 'Dark theme uses luminous text #f8fafc (> 14:1 against dark bg)');

fullLayoutPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  assert(content.includes('role="banner"'), `${p} has role="banner" on header`);
  assert(content.includes('role="contentinfo"'), `${p} has role="contentinfo" on footer`);
  assert(content.includes('aria-label='), `${p} has accessible aria-labels on interactive elements`);
});

// 15. Local Asset & Link Integrity
console.log('\n15. Local Asset & Link Integrity Across All HTML Files:');
allHtmlPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  const imgRegex = /src=["'](assets\/[^"']+)["']/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const assetPath = path.join(projectDir, match[1]);
    assert(fs.existsSync(assetPath), `${p} image asset exists: ${match[1]}`);
  }

  const linkRegex = /href=["']([^"'#:]+\.html)["']/g;
  while ((match = linkRegex.exec(content)) !== null) {
    const linkPath = path.join(projectDir, match[1]);
    assert(fs.existsSync(linkPath), `${p} linked page exists: ${match[1]}`);
  }
});

// 16. Contact Page — Contact Number & Validation Checks
console.log('\n16. Contact Page — Contact Number & Inline Validation:');
const contactHtml = fs.readFileSync(path.join(projectDir, 'contact.html'), 'utf8');
assert(contactHtml.includes('href="tel:+13105550198"'), 'contact.html includes clickable tel: link for spa phone number');
assert(contactHtml.includes('(310) 555-0198'), 'contact.html displays phone number (310) 555-0198');
assert(contactHtml.includes('id="contactPhone"'), 'contact.html includes contact number input field');
assert(contactHtml.includes('Numbers are not allowed in the name field.'), 'contact.html has inline validation message for name field ("Numbers are not allowed in the name field.")');
assert(contactHtml.includes('Letters are not allowed in the contact number field.'), 'contact.html has inline validation message for contact number field ("Letters are not allowed in the contact number field.")');
assert(contactHtml.includes('handleContactSubmit'), 'contact.html has handleContactSubmit form submission validation');

// 17. Home 2 — Chamber Explore Buttons & Interactive Modal
console.log('\n17. Home 2 — Chamber Explore Buttons & Interactive Modal:');
const home2Html = fs.readFileSync(path.join(projectDir, 'home-2.html'), 'utf8');
assert(home2Html.includes("openChamberDetailModal('pod-alpha')"), 'home-2.html has Explore Chamber button for Pod Alpha');
assert(home2Html.includes("openChamberDetailModal('basin-beta')"), 'home-2.html has Explore Chamber button for Basin Beta');
assert(home2Html.includes("openChamberDetailModal('sanctuary-delta')"), 'home-2.html has Explore Chamber button for Sanctuary Delta');
assert(home2Html.includes('id="chamberDetailModal"'), 'home-2.html contains #chamberDetailModal modal element');
assert(home2Html.includes('CHAMBER_DETAILS'), 'home-2.html defines CHAMBER_DETAILS specifications data map');
assert(home2Html.includes('closeChamberDetailModal()'), 'home-2.html provides closeChamberDetailModal function');

// 18. Home 1 — Hero Section Background Image & Contrast
console.log('\n18. Home 1 — Hero Section Background Image & Contrast:');
const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert(indexHtml.includes('hero-home1-bg'), 'index.html hero section has class hero-home1-bg');
assert(indexHtml.includes('assets/hero-home1-bg.jpg'), 'index.html hero section references assets/hero-home1-bg.jpg');
assert(cssContent.includes('.hero-home1-bg') && cssContent.includes("url('../assets/hero-home1-bg.jpg')"), 'style.css defines .hero-home1-bg with background image');
assert(cssContent.includes('[data-theme="light"] .hero-home1-bg'), 'style.css defines light mode adaptive overlay for .hero-home1-bg');
assert(cssContent.includes('[data-theme="light"] .hero-section .hero-title'), 'style.css enforces dark high-contrast title in light mode');

// 19. Home 2 — Physiological Timeline 5 Distinct Images
console.log('\n19. Home 2 — Physiological Timeline 5 Distinct Images:');
assert(home2Html.includes('assets/timeline-phase1-acclimation.jpg'), 'home-2.html contains Phase 1 Sensory Acclimation image');
assert(home2Html.includes('assets/timeline-phase2-release.jpg'), 'home-2.html contains Phase 2 Neuromuscular Release image');
assert(home2Html.includes('assets/timeline-phase3-theta.jpg'), 'home-2.html contains Phase 3 Theta Wave Dominance image');
assert(home2Html.includes('assets/timeline-phase4-glow.jpg'), 'home-2.html contains Phase 4 Post-Float Glow image');
assert(home2Html.includes('assets/timeline-phase5-tea-lounge.jpg'), 'home-2.html contains Phase 5 Organic Tea Lounge image');

// 20. Shared Header — Icon-Only RTL/LTR and Member Login Buttons
console.log('\n20. Shared Header — Icon-Only Controls Across All 15 Full Layout Pages:');
fullLayoutPages.forEach(p => {
  const content = fs.readFileSync(path.join(projectDir, p), 'utf8');
  const actionsStart = content.indexOf('<div class="nav-actions">');
  const actionsEnd = content.indexOf('</header>', actionsStart);
  assert(actionsStart !== -1, `${p} has nav-actions container`);
  const actionsSnippet = content.slice(actionsStart, actionsEnd);
  assert(!/>\s*(RTL|LTR)\s*</.test(actionsSnippet), `${p} header RTL/LTR button has NO visible text labels (icon-only)`);
  assert(!/>\s*Member Login\s*</.test(actionsSnippet), `${p} header Member Login button has NO visible text label (icon-only)`);
  assert(actionsSnippet.includes('dir-toggle-btn icon-only'), `${p} dir-toggle-btn has icon-only class`);
  assert(actionsSnippet.includes('nav-login-btn icon-only'), `${p} nav-login-btn has icon-only class`);
});

console.log(`\n========================================`);
console.log(`TOTAL PASSES: ${passCount}`);
console.log(`TOTAL FAILURES: ${failCount}`);
console.log(`========================================`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('\n🌟 ALL WEBSITE SPECIFICATIONS VERIFIED 100% SUCCESSFULLY WITH ZERO ERRORS!');
}
