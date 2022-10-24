import React from 'react';

import { DialogueBox } from '../components/DialogueBox';
//import '../components/DialogueBox/DialogueBox.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Alert',
  component: DialogueBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <DialogueBox {...args}></DialogueBox>

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  message: "Custom message for alert",
  isCancelConfirm: false,
  title: "Standard Alert"
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   message: "Custom message for alert",
//   isCancelConfirm: true,
//   title: "Cancel/Confirm"
// };
