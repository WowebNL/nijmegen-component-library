const { updateChangelog } = require('./update');
const { getReleaseVersion } = require('./update.helpers');
const path = require('path');

const changelogPath = path.join(__dirname, '../../../../docs/03-Changelog.md');
const changeDirectory = path.join(__dirname, '../../../../changelogs/unreleased');
const releaseVersion = getReleaseVersion(process.argv[2]);

// TODO: look at caching
// TODO: add the version dynamically with testers/2 (just support major versions for now?)
// TODO: tidy up ci putting back commented out and switching to release
// TODO: merge back into 155
// TODO: add tests to pipeline
// TODO: update readme and changelog

updateChangelog(changelogPath, changeDirectory, releaseVersion, true, error => {
    if (error) {
        throw error;
    } else {
        console.log('=================================================');
        console.log(`Release ${releaseVersion} Changelog Updated`);
        console.log('=================================================');
    }
});
