const chokidar = require('chokidar');
const path = require('path');
const gt = require('../generate-theme');

if (process.env.NODE_ENV === 'development') {
    chokidar.watch(path.resolve('./theme/antd-theme-var.less'))
        .on('all', gt);
} else {
    gt();
}
