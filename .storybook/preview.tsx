import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'padded',
    options: {
      storySort: { order: ['Foundations', 'Components', 'Example'] },
    },
    viewport: {
      options: {
        mobile: {
          name: 'Mobile (375px)',
          styles: { width: '375px', height: '812px' },
        },
        tablet: {
          name: 'Tablet (768px)',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop (1440px)',
          styles: { width: '1440px', height: '900px' },
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
