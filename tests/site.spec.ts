import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  '',
  'platform/',
  'approach/',
  'offerings/',
  'pricing/',
  'industries/',
  'insights/',
  'insights/ten-year-tco/',
  'insights/open-ran-after-the-pilot/',
  'insights/reading-spectrum-positions/',
  'about/',
  'contact/',
  'contact/thanks/',
  'ecosystem/',
  'careers/',
  'trust/',
  'partners/',
  'changelog/',
  'privacy/',
  'terms/',
];

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function blockThirdParties(page: Page): Promise<void> {
  await page.route(/^https?:\/\/(?!localhost)/, (route) => route.abort());
}

async function preConsent(page: Page, choice: 'granted' | 'denied'): Promise<void> {
  await page.addInitScript((c) => localStorage.setItem('ipj-consent', c), choice);
}

test.describe('every route', () => {
  for (const route of ROUTES) {
    test(`/${route} renders, has one h1, no console errors, passes axe`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(e.message));
      await blockThirdParties(page);
      await preConsent(page, 'denied');

      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/IPJunction/);
      expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();
      expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toContain('/ip-junction/');

      const axe = await new AxeBuilder({ page }).withTags(WCAG).analyze();
      expect(axe.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
});

test('stays light when the system prefers dark', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await blockThirdParties(page);
  await preConsent(page, 'denied');
  await page.goto('');
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(244, 246, 249)');
  const axe = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  expect(axe.violations.map((v) => v.id)).toEqual([]);
});

test('unknown route serves the custom 404', async ({ page }) => {
  const res = await page.goto('does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('That page is not on this network.');
});

test('internal links resolve', async ({ page, request }) => {
  const seen = new Set<string>();
  for (const route of ROUTES) {
    await page.goto(route);
    const hrefs = await page.$$eval('a[href^="/"]', (as) => as.map((a) => (a as HTMLAnchorElement).pathname));
    hrefs.forEach((h) => seen.add(h));
  }
  for (const href of seen) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
  }
});

test('skip link moves focus to main content', async ({ page }) => {
  await preConsent(page, 'denied');
  await page.goto('');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test.describe('consent', () => {
  test('banner shows on first visit; decline loads no analytics', async ({ page }) => {
    await blockThirdParties(page);
    await page.goto('');
    const banner = page.getByRole('region', { name: 'Analytics' });
    await expect(banner).toBeVisible();
    await banner.getByRole('button', { name: 'Decline' }).click();
    await expect(banner).toBeHidden();
    await expect(page.locator('script[data-website-id]')).toHaveCount(0);
    await page.reload();
    await expect(banner).toBeHidden();
  });

  test('accept loads analytics; footer reopens settings', async ({ page }) => {
    await blockThirdParties(page);
    await page.goto('');
    const banner = page.getByRole('region', { name: 'Analytics' });
    await banner.getByRole('button', { name: 'Accept' }).click();
    await expect(page.locator('script[data-website-id="test-site-id"]')).toHaveCount(1);
    await page.getByRole('button', { name: 'Cookie settings' }).click();
    await expect(banner).toBeVisible();
  });
});

test.describe('contact form', () => {
  test('required fields block submission until valid', async ({ page }) => {
    await blockThirdParties(page);
    await preConsent(page, 'denied');
    await page.goto('contact/');
    const form = page.locator('form');
    expect(await form.evaluate((f: HTMLFormElement) => f.checkValidity())).toBe(false);

    await page.getByLabel('Name').fill('Priya Raman');
    await page.getByLabel('Work email').fill('not-an-email');
    await page.getByLabel('Topic').selectOption('Network strategy');
    await page.getByLabel('Message').fill('We are planning an O-RAN rollout.');
    expect(await form.evaluate((f: HTMLFormElement) => f.checkValidity())).toBe(false);

    await page.getByLabel('Work email').fill('priya@example.com');
    expect(await form.evaluate((f: HTMLFormElement) => f.checkValidity())).toBe(true);
    await expect(page.locator('input[name="botcheck"]')).toBeHidden();
  });
});

test('bio modal opens, is labelled, closes with Escape and returns focus', async ({ page }) => {
  await preConsent(page, 'denied');
  await page.goto('about/');
  const open = page.getByRole('button', { name: 'Full bio' });
  await open.click();
  const dialog = page.getByRole('dialog', { name: 'Deepak Kataria' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('Bell Laboratories');
  const axe = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  expect(axe.violations.map((v) => v.id)).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(open).toBeFocused();
});

test('desktop nav lists all nine pages', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop only');
  await preConsent(page, 'denied');
  await page.goto('');
  const links = await page.getByRole('navigation', { name: 'Main' }).locator('ul.desktop a').allInnerTexts();
  expect(links).toEqual(['Home', 'Platform', 'Approach', 'Offerings', 'Pricing', 'Industries', 'Insights', 'About', 'Contact']);
});

test('mobile menu opens and navigates', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  await preConsent(page, 'denied');
  await page.goto('');
  await page.getByText('Menu', { exact: true }).click();
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Offerings' }).click();
  await expect(page).toHaveURL(/\/offerings\/$/);
  await expect(page.locator('h1')).toContainText('Five practices');
});

test('no horizontal overflow at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await preConsent(page, 'denied');
  for (const route of ['', 'offerings/', 'contact/', 'about/', 'insights/ten-year-tco/']) {
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, route).toBeLessThanOrEqual(0);
  }
});

test.describe('redesign visuals', () => {
  test('home layer cross-section shows five layers with engagements pinned', async ({ page }) => {
    await preConsent(page, 'denied');
    await page.goto('');
    const layers = page.getByRole('list', { name: 'IPJunction across the network stack' }).locator('> li.layer');
    await expect(layers).toHaveCount(5);
    await expect(layers.locator('h3')).toHaveText(['Radio', 'Transport IP/MPLS', 'Core', 'Cloud and edge', 'OSS/BSS']);
    for (const client of ['Verizon', 'Charter', 'Vesta', 'Fujitsu', 'SPO Partners']) {
      await expect(page.locator('.pin', { hasText: client })).toHaveCount(1);
    }
  });

  test('traffic animation is hidden under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await preConsent(page, 'denied');
    await page.goto('');
    await expect(page.locator('.rail')).toBeHidden();
  });

  test('decorative animations stop within 5 seconds', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await preConsent(page, 'denied');
    for (const route of ['', 'industries/', 'insights/']) {
      await page.goto(route);
      const infinite = await page.evaluate(() =>
        document.getAnimations().filter((a) => a.effect?.getComputedTiming().iterations === Infinity && !(a instanceof CSSTransition)).length,
      );
      expect(infinite, route).toBe(0);
    }
  });

  test('traffic rail animates when motion is allowed', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await preConsent(page, 'denied');
    await page.goto('');
    const name = await page.locator('.rail i').evaluate((el) => getComputedStyle(el).animationName);
    expect(name).not.toBe('none');
  });

  for (const route of ['', 'platform/', 'approach/', 'offerings/', 'pricing/', 'industries/', 'insights/', 'about/']) {
    test(`/${route} stays under the visible word budget`, async ({ page }) => {
      await preConsent(page, 'denied');
      await page.goto(route);
      const words = await page.locator('main').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
      expect(words).toBeLessThanOrEqual(260);
    });
  }

  test('no horizontal overflow at 320px on redesigned pages', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await preConsent(page, 'denied');
    for (const route of ['', 'platform/', 'approach/', 'offerings/', 'pricing/', 'industries/', 'insights/', 'about/']) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), route).toBeLessThanOrEqual(0);
    }
  });

  test('no em dashes in page copy', async ({ page }) => {
    await preConsent(page, 'denied');
    for (const route of ['', 'platform/', 'approach/', 'offerings/', 'pricing/', 'industries/', 'insights/', 'about/']) {
      await page.goto(route);
      expect(await page.locator('main').innerText(), route).not.toContain('\u2014');
    }
  });
});
