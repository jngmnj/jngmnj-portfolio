import defaultTheme from 'tailwindcss/defaultTheme';

// Class names stay literal so Tailwind can discover every swatch.
// Color values come from globals.css; default scales come from Tailwind itself.
export const colorClasses = {
  'Waikawa Gray': [
    'bg-waikawa-gray-50',
    'bg-waikawa-gray-100',
    'bg-waikawa-gray-200',
    'bg-waikawa-gray-300',
    'bg-waikawa-gray-400',
    'bg-waikawa-gray-500',
    'bg-waikawa-gray-600',
    'bg-waikawa-gray-700',
    'bg-waikawa-gray-800',
    'bg-waikawa-gray-900',
    'bg-waikawa-gray-950',
  ],
  Seagull: [
    'bg-seagull-50',
    'bg-seagull-100',
    'bg-seagull-200',
    'bg-seagull-300',
    'bg-seagull-400',
    'bg-seagull-500',
    'bg-seagull-600',
    'bg-seagull-700',
    'bg-seagull-800',
    'bg-seagull-900',
    'bg-seagull-950',
  ],
  Neutral: ['bg-black', 'bg-white'],
} as const;

export const typography = [
  { name: 'Small', className: 'text-sm', value: defaultTheme.fontSize.sm },
  { name: 'Body', className: 'text-base', value: defaultTheme.fontSize.base },
  { name: 'Large', className: 'text-lg', value: defaultTheme.fontSize.lg },
  { name: 'Subtitle', className: 'text-xl', value: defaultTheme.fontSize.xl },
  {
    name: 'Heading',
    className: 'text-2xl',
    value: defaultTheme.fontSize['2xl'],
  },
  {
    name: 'Display',
    className: 'text-4xl',
    value: defaultTheme.fontSize['4xl'],
  },
] as const;

export const fontWeights = [
  {
    name: 'Regular',
    className: 'font-normal',
    value: defaultTheme.fontWeight.normal,
  },
  {
    name: 'Medium',
    className: 'font-medium',
    value: defaultTheme.fontWeight.medium,
  },
  {
    name: 'Semibold',
    className: 'font-semibold',
    value: defaultTheme.fontWeight.semibold,
  },
  { name: 'Bold', className: 'font-bold', value: defaultTheme.fontWeight.bold },
] as const;

export const spacing = [
  { name: '1', className: 'w-1', value: defaultTheme.spacing[1] },
  { name: '2', className: 'w-2', value: defaultTheme.spacing[2] },
  { name: '3', className: 'w-3', value: defaultTheme.spacing[3] },
  { name: '4', className: 'w-4', value: defaultTheme.spacing[4] },
  { name: '6', className: 'w-6', value: defaultTheme.spacing[6] },
  { name: '8', className: 'w-8', value: defaultTheme.spacing[8] },
  { name: '12', className: 'w-12', value: defaultTheme.spacing[12] },
  { name: '16', className: 'w-16', value: defaultTheme.spacing[16] },
] as const;

export const surfaces = [
  { name: 'rounded-lg', className: 'rounded-lg' },
  { name: 'rounded-xl', className: 'rounded-xl' },
  { name: 'rounded-2xl', className: 'rounded-2xl' },
  { name: 'shadow-none', className: 'rounded-xl shadow-none' },
  { name: 'shadow-sm', className: 'rounded-xl shadow-sm' },
  { name: 'shadow-md', className: 'rounded-xl shadow-md' },
] as const;

export const breakpoints = defaultTheme.screens;
