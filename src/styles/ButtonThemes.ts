// ButtonThemes.ts
export const buttonThemes = {
  common: {
    className: 'cursor-pointer transition-all',
  },
  colors: {
    primary: {
      className: 'bg-seagull-400 text-black',
      hoverClassName: 'hover:bg-seagull-500',
    },
    linePrimary: {
      className: 'bg-white border border-seagull-400 text-seagull-400',
      hoverClassName: 'hover:bg-seagull-100',
    },
    secondary: {
      className: 'bg-seagull-300 text-black',
      hoverClassName: '',
    },
    danger: {
      className: 'bg-red-400 text-white',
      hoverClassName: '',
    },
    lineDanger: {
      className: 'text-red-400 border border-red-400',
      hoverClassName: '',
    },
  },
  sizes: {
    small: {
      className: 'py-2 px-2 text-sm rounded-sm',
    },
    medium: {
      className: 'px-4 py-3',
    },
    large: {
      className: 'px-4 py-3',
    },
  },
};
