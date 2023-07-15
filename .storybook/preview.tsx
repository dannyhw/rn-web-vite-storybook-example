import type { Preview } from "@storybook/react";
import { View } from "react-native";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <View style={{ alignItems: "flex-start" }}>
      <Story />
    </View>
  ),
];

export default preview;
