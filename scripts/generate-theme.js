#!/usr/bin/env node
const { exec, execSync } = require("child_process");
const path = require("path");
const rimraf = require("rimraf");
const fs = require('fs');

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

const generatedThemePath = "./scripts/generated-theme.less";

module.exports = () => {
	try {
		fs.writeFileSync(generatedThemePath, content);
		execSync(
			`node_modules/less/bin/lessc --js ${generatedThemePath} ${scriptVariables.generatedThemeFilePath}`,
			{ cwd }
		);
		if (process.env.NODE_ENV !== "development") {
			rimraf.sync(generatedThemePath);
		}
	} catch (error) {
		console.log("generate theme error: ", error);
	}
};
