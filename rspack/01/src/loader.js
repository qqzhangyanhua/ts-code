const BANNER = `/**
 * MIT Licensed
 * Copyright (c) 2022-present ByteDance, Inc. and its affiliates.
 * https://github.com/web-infra-dev/rspack/blob/main/LICENSE
 */`;

module.exports = function (content) {
    console.log('cccccccccccccccccccccccccccccccc');
  return `${BANNER}\n${content}`;

};