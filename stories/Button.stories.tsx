import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta = {
  title: "components/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

export const Basic: StoryObj<typeof meta> = {
  args: {
    text: "helloworld",
  },
};
