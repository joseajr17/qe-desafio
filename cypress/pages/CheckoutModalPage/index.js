import { elements as el } from './elements'

class CheckoutModalPage {
    hasModalTitle() {
        cy.contains('h3', el.modalTitle).should('be.visible');
    }

    extractValue(text) {
        return parseFloat(text.replace(el.realSymbol, '').trim());
    }

    getSubtotalValue() {
        return cy.contains('span', el.subtotalLabel)
            .next('span')
            .invoke('text')
            .then(this.extractValue);
    }

    typeCoupon(couponCode) {
        cy.get(el.inputCouponPlaceholder).clear().type(couponCode);
    }

    clickApplyButton() {
        cy.contains('button', el.applyBtn).click();
    }

    verifyCouponAppliedMessage() {
        cy.contains(el.applyCouponMsg).should('be.visible');
    }

    getFinalValue() {
        return cy.contains('span', el.finalValueLabel)
            .next('span')
            .invoke('text')
            .then(this.extractValue);
    }

    verifyDiscountApplied(subtotalValue, discountValue) {
        this.getFinalValue().then((finalValue) => {
            const expectedValue = Math.max(subtotalValue - discountValue, 0);
            expect(finalValue).to.eq(expectedValue);
        });
    }

    verifyCouponInputIsVisible() {
        cy.get(el.inputCouponPlaceholder).should('be.visible');
    }

    verifyCouponBtnIsVisible() {
        cy.contains('button', el.applyBtn).should('be.visible');
    }

    applyInvalidCouponAndVerifyFinalValue(couponCode) {
        this.getSubtotalValue().then((subtotalValue) => {
            this.typeCoupon(couponCode);
            this.clickApplyButton();

            this.verifyCouponInputIsVisible();
            this.verifyCouponBtnIsVisible();

            this.getFinalValue().then((finalValue) => {
                expect(finalValue).to.eq(subtotalValue);
            });
        });
    }

    applyValidCouponAndVerifyDiscount(couponCode, discountValue) {
        this.getSubtotalValue().then((subtotalValue) => {
            this.typeCoupon(couponCode);
            this.clickApplyButton();
            this.verifyCouponAppliedMessage();
            this.verifyDiscountApplied(subtotalValue, discountValue);
        });
    }

    verifyRadioBtnStatus(value, status) {
        cy.get(`${el.radioBtn}[value=${value}]`)
            .should('have.attr', 'aria-checked', `${status}`);
    }

    clickRadioBtn(value) {
        cy.get(`${el.radioBtn}[value=${value}]`)
            .should('have.attr', 'aria-checked', 'false')
            .click()
            .should('have.attr', 'aria-checked', 'true');
    }
}

export default new CheckoutModalPage;