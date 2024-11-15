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
