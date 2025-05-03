import test, { expect, Page } from "@playwright/test";

test.describe("[UI] [Demo Shopping Cart] [E2E]", async () => {
    test.only("Successfull checkout with 5 products", async ({ page }) => {
        await page.goto("https://anatoly-karpovich.github.io/demo-shopping-cart/");
        //Add products to cart
        const products = ["Product 2", "Product 4", "Product 6", "Product 8", "Product 10"];
        for (const product of products) {
            await getAddToCardButton(product, page).click();
        }
        const productPrices = await Promise.all(
            products.map(product => getProductPrice(product, page))
        );
        const totalPriceBeforeDiscount = calculateTotalPrice(productPrices);
        await expect(page.locator("#badge-number")).toHaveText("5");
        await page.getByRole("button", { name: "Shopping Cart" }).click();
        await expect(page.locator("#total-price")).toHaveText(`$${totalPriceBeforeDiscount}.00`);
        //Apply promocodes
        const promocodes = [
            { code: "HelloThere", discount: 20 },
            { code: "15-PERCENT-FOR-CSS", discount: 15 },
            { code: "HOT-COURSE", discount: 10 },
            { code: "10-PERCENT-FOR-REDEEM", discount: 10 },
            { code: "NO-PYTHON", discount: 8 },
            { code: "JAVA-FOR-BOOMERS", discount: 7 },
            { code: "5-PERCENT-FOR-UTILS", discount: 5 }
        ];
        const expectedFinalPrice = calculateFinalPriceAfterDiscount(totalPriceBeforeDiscount, promocodes);
        for (const promocode of promocodes) {
            await applyPromocode(promocode.code, page);
        }
        await expect(page.locator("#total-price")).toHaveText(new RegExp(`^\\${expectedFinalPrice}`));
        //continue to checkout
        await page.locator("#continue-to-checkout-button").click();
        await expect(page.getByText("Thanks for ordering!")).toBeVisible();
        await expect(page.locator('.text-muted')).toHaveText(expectedFinalPrice);
    });
});

// Helper functions to interact with the page elements

function getAddToCardButton(productName: string, page: Page) {
    return page
        .locator("div.card-body")
        .filter({
            has: page.getByText(productName, { exact: true }),
        })
        .getByRole("button", { name: "Add to card" });
}

function getProductPriceSpan(productName: string, page: Page) {
    return page
        .locator("div.card-body")
        .filter({
            has: page.getByText(productName, { exact: true }),
        })
        .locator("span");
}

async function getProductPrice(productName: string, page: Page): Promise<number> {
    const productPriceSpan = getProductPriceSpan(productName, page);
    const priceText = await productPriceSpan.innerText();
    const price = priceText.replace("$", "");
    return +price;
}

async function applyPromocode(promocode: string, page: Page) {
    await page.locator("#rebate-input").fill(promocode);
    await page.locator("#apply-promocode-button").click();
    await expect(page.locator(".spinner-border")).toBeHidden();
}

// Helper functions to calculate prices and discounts

function calculateTotalPrice(productPrices: number[]): number {
    return productPrices.reduce((acc, price) => acc + price, 0);
};

function calculateFinalPriceAfterDiscount(
    totalPriceBeforeDiscount: number,
    promocodes: { discount: number }[]
): string {
    const finalPrice = promocodes.reduce((currentPrice, promocode) => currentPrice - calculateDiscountAmount(totalPriceBeforeDiscount, promocode), totalPriceBeforeDiscount);
    return `$${finalPrice.toFixed(2)}`;
}

function calculateDiscountAmount(
    price: number,
    promocode: { discount: number }
): number {
    return price * promocode.discount / 100;
}


