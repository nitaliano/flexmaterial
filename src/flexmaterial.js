// styles
require('./less/flexmaterial.less');

// polyfills
if (typeof MutationObserver === 'undefined') {
    require('webcomponents.js/dist/MutationObserver');
}

// scripts
require('./js/Button');