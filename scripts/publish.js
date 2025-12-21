const { execSync } = require('child_process');
const { version } = require('../package.json');

console.log(`Starting publish for version ${version}...`);

try {
    const status = execSync('git status --porcelain').toString().trim();
    if (status) {
        console.error('Error: There are uncommitted git changes. Please commit or stash them before publishing.');
        process.exit(1);
    }

    execSync('vsce publish', { stdio: 'inherit' });

    const tagName = `v${version}`;
    console.log(`Creating git tag ${tagName}...`);
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });

    console.log('Successfully completed!');
} catch (error) {
    console.error('Error publishing or tagging.', error);
    process.exit(1);
}
