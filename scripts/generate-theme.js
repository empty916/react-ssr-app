#!/usr/bin/env node
const { exec } = require("child_process");
const path = require("path");
const rimraf = require('rimraf');

const cwd = process.cwd();

const scriptVariables = {
	customThemeFilePath: path.join(cwd, "./theme/antd-theme-var.less"),
	generatedThemeFilePath: path.join(cwd, "./node_modules/antd/dist/antd.css"),
	antdLibraryPath: path.join(cwd, "./node_modules/antd"),
	theme: "default",
};

const content = `
  @import url("${scriptVariables.antdLibraryPath}/lib/style/themes/${scriptVariables.theme}.less");
  @import url("${scriptVariables.antdLibraryPath}/dist/antd.less");
  @import url("${scriptVariables.customThemeFilePath}");
`;

const generatedThemePath = './scripts/generated-theme.less';

module.exports = () => {
    exec(
        `echo "${content}" > ${generatedThemePath}`,
        { cwd },
        (error1, stdout, stderr) => {
            if (!error1) {
                exec(
                    `node_modules/less/bin/lessc --js ${generatedThemePath} ${scriptVariables.generatedThemeFilePath}`,
                    { cwd },
                    (error2, stdout, stderr) => {
                        if (!error2) {
                            if (process.env.NODE_ENV !== 'development') {
                                rimraf.sync(generatedThemePath);
                            }
                        } else {
                            console.error('生成antd.css错误: ', error2);
                        }
                    }
                );
            } else {
                console.error(error1);
            }
        }
    );
}

