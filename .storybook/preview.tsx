import type { Preview } from "@storybook/react-vite";
import { View } from "react-native";

const preview: Preview = {
  parameters: {
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
