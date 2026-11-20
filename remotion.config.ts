/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.overrideRspackConfig((config) => {
  config.module ??= {};
  config.module.rules ??= [];
  config.module.rules.push({ test: /\.ogg$/, type: "asset/resource" });
  return config;
});
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
