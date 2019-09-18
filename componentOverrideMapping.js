const path = require('path');
const parentComponents = path.resolve(
    process.cwd() + '/../../pwa-studio/packages/venia-ui/lib/components'
);

module.exports = componentOverride = {
    [`${parentComponents}/Main`]: `src/components/Main`,
    [`${parentComponents}/Footer`]: 'src/components/Footer'
};
