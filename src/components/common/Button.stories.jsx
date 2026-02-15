import Button from "./Button";

export default {
  title: "Common/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A reusable button component with multiple visual variants and sizes. " +
          "Used throughout the application for actions like starting a game, " +
          "navigating, and submitting forms.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "danger"],
      description: "Visual style variant of the button",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size of the button",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      table: {
        defaultValue: { summary: false },
      },
    },
    children: {
      control: "text",
      description: "Button label text",
    },
    onClick: {
      action: "clicked",
      description: "Click event handler",
    },
  },
};

/** Primary button — used for main actions like "Start Game" or "Play Again". */
export const Primary = {
  args: {
    children: "Start Game",
    variant: "primary",
    size: "medium",
  },
};

/** Secondary button — used for alternative or less prominent actions. */
export const Secondary = {
  args: {
    children: "Cancel",
    variant: "secondary",
    size: "medium",
  },
};

/** Success button — used for positive confirmations like "Save" or "Complete". */
export const Success = {
  args: {
    children: "Save Progress",
    variant: "success",
    size: "medium",
  },
};

/** Danger button — used for destructive actions like "Exit" or "Clear Data". */
export const Danger = {
  args: {
    children: "Exit Game",
    variant: "danger",
    size: "medium",
  },
};

/** Disabled state — demonstrates the disabled appearance across variants. */
export const Disabled = {
  args: {
    children: "Unavailable",
    variant: "primary",
    size: "medium",
    disabled: true,
  },
};

/** All sizes — shows small, medium, and large button sizes side by side. */
export const AllSizes = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button size="small" variant="primary">Small</Button>
      <Button size="medium" variant="primary">Medium</Button>
      <Button size="large" variant="primary">Large</Button>
    </div>
  ),
};

/** All variants — shows every button variant side by side for comparison. */
export const AllVariants = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
