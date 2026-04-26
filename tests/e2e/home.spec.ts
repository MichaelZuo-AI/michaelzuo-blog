import { expect, test } from "@playwright/test";

test("home page renders posts and tag-specific hero art", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Michael thinks in public." }),
  ).toBeVisible();

  const cards = page.locator(".mz-card");
  await expect(cards).toHaveCount(12);
  await expect(page.locator(".mz-card-illustration")).toHaveCount(12);

  await expect(
    page.locator('a[href="/post/causality-vs-correlation"] .mz-card-hero'),
  ).toHaveClass(/mz-hero--cognition/);
  await expect(page.locator(".mz-hero--sage").first()).toBeVisible();
  await expect(page.locator(".mz-hero--terracotta").first()).toBeVisible();
  await expect(page.locator(".mz-hero--lavender").first()).toBeVisible();
  await expect(page.locator(".mz-hero--rose").first()).toBeVisible();
});

test("tag filter narrows the post index without navigation reload", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "agents" }).click();

  await expect(page).toHaveURL(/\?tag=agents$/);
  await expect(page.locator(".mz-card")).toHaveCount(2);
  await expect(page.locator(".mz-card-tag")).toHaveText(["agents", "agents"]);
});
