# Storybook Next.js webpack cache bug demo

The [Storybook Next.js framework](https://storybook.js.org/docs/get-started/frameworks/nextjs) uses webpack internally to build Storybooks for Next.js projects.

The [Storybook webpack builder](https://storybook.js.org/docs/builders/webpack) supports an `fsCache` option to enable disk-based caching, which greatly improves incremental build performance in webpack-based Storybook projects.

When the `fsCache` option is enabled in a Storybook project that uses the Next.js framework, however, the disk-based cache does not work, and the Storybook build outputs a large number of `webpack.cache.packFileCacheStrategy` warnings. As a result, Next.js projects cannot benefit from the significant speed boost afforded by the webpack disk cache.

To reproduce this, clone this repo and run Storybook:

```
pnpm i
pnpm storybook dev
```

## Storybook config

```ts
import { StorybookConfig } from "@storybook/nextjs"

export default {
  stories: ["../example/**/*.stories.(ts|tsx)"],
  framework: {
    name: "@storybook/nextjs",
    options: {
      builder: {
        fsCache: true,
      },
    },
  },
  addons: [],
} satisfies StorybookConfig
```

## Sample warnings

```
<w> [webpack.cache.PackFileCacheStrategy] Skipped not serializable cache item 'SourceMapDevToolPlugin|AvatarWithName-AvatarWithName-stories.iframe.bundle.js': No serializer registered for ConcatSource
<w> while serializing webpack/lib/cache/PackFileCacheStrategy.PackContentItems -> Object { assets, assetsInfo } -> Object [null prototype] { AvatarWithName-AvatarWithName-stories.iframe.bundle.js, AvatarWithName-AvatarWithName-stories.iframe.bundle.js.map } -> ConcatSource
<w> [webpack.cache.PackFileCacheStrategy] Skipped not serializable cache item 'SourceMapDevToolPlugin|node_modules_pnpm_storybook_react-dom-shim_8_4_3_react-dom_18_3_1_react_18_3_1__react_18_3_1_-4694ac.iframe.bundle.js': No serializer registered for ConcatSource
<w> while serializing webpack/lib/cache/PackFileCacheStrategy.PackContentItems -> Object { assets, assetsInfo } -> Object [null prototype] { node_modules_pnpm_storybook_react-dom-shim_8_4_3_react-dom_18_3_1_react_18_3_1__react_18_3_1_-4694ac.iframe.bundle.js, node_modules_pnpm_storybook_react-dom-shim_8_4_3_react-dom_18_3_1_react_18_3_1__react_18_3_1_-4694ac.iframe.bundle.js.map } -> ConcatSource
<w> [webpack.cache.PackFileCacheStrategy] Skipped not serializable cache item 'SourceMapDevToolPlugin|vendors-node_modules_pnpm_pmmmwh_react-refresh-webpack-plugin_0_5_11__types_webpack_5_28_5__s-e8a23e.iframe.bundle.js': No serializer registered for ConcatSource
<w> while serializing webpack/lib/cache/PackFileCacheStrategy.PackContentItems -> Object { assets, assetsInfo } -> Object [null prototype] { vendors-node_modules_pnpm_pmmmwh_react-refresh-webpack-plugin_0_5_11__types_webpack_5_28_5__s-e8a23e.iframe.bundle.js, vendors-node_modules_pnpm_pmmmwh_react-refresh-webpack-plugin_0_5_11__types_webpack_5_28_5__s-e8a23e.iframe.bundle.js.map } -> ConcatSource
<w> [webpack.cache.PackFileCacheStrategy] Skipped not serializable cache item 'SourceMapDevToolPlugin|vendors-node_modules_pnpm_next_14_2_5__babel_core_7_24_4__opentelemetry_api_1_9_0_react-dom_1-ea17df.iframe.bundle.js': No serializer registered for ConcatSource
<w> while serializing webpack/lib/cache/PackFileCacheStrategy.PackContentItems -> Object { assets, assetsInfo } -> Object [null prototype] { vendors-node_modules_pnpm_next_14_2_5__babel_core_7_24_4__opentelemetry_api_1_9_0_react-dom_1-ea17df.iframe.bundle.js, vendors-node_modules_pnpm_next_14_2_5__babel_core_7_24_4__opentelemetry_api_1_9_0_react-dom_1-ea17df.iframe.bundle.js.map } -> ConcatSource
<w> [webpack.cache.PackFileCacheStrategy] Skipped not serializable cache item 'SourceMapDevToolPlugin|runtime~main.11c4afab890e318b994d.hot-update.js': No serializer registered for ConcatSource
<w> while serializing webpack/lib/cache/PackFileCacheStrategy.PackContentItems -> Object { assets, assetsInfo } -> Object [null prototype] { runtime~main.11c4afab890e318b994d.hot-update.js, runtime~main.11c4afab890e318b994d.hot-update.js.map } -> ConcatSource
```
