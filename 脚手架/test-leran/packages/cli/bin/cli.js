#!/usr/bin/env node
const importLocal = require("import-local");
const { log } = require("@zhang/utils");
const entry = require("../lib/index.js");
if (importLocal(__filename)) {
  log.info("cli", "正在使用cli本地版本");
} else {
  entry(process.argv);
}
