const { execSync } = require('child_process');
const { version } = require('../package.json');

console.log(`Starting publish for version ${version}...`);

try {
    execSync('vsce publish', { stdio: 'inherit' });

    const tagName = `v${version}`;
    console.log(`Creating git tag ${tagName}...`);
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });

    console.log('Successfully completed!');
} catch (error) {
    console.error('Error publishing or tagging.', error);
    process.exit(1);
}
