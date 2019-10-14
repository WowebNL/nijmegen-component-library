const { When } = require('cucumber');
const clickElement = require('cucumber-puppeteer/features/support/action/clickElement');
const waitFor = require('cucumber-puppeteer/features/support/action/waitFor');

When('I pause the carousel on slide nr {int}', async function(slideId) {
    await clickElement.call(this, '.carousel-control-pause');
    await clickElement.call(
        this,
        `.carousel-indicators > li:nth-child(${slideId})`,
        `.carousel-inner > .carousel-item:nth-child(${slideId + 1})`,
    );
    await waitFor.call(this, 0.6);
});
