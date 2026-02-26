import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import type { AboutTab } from '../../data/MyData';
import { icons } from '../../data/MyData';

type TabContentProps = {
  tabIndex: number;
  tabs: AboutTab[];
};

const TabContent = ({ tabIndex, tabs }: TabContentProps) => {
  const data = tabs[tabIndex];

  if (!data) return null;

  const renderContent = () => {
    if (data.id === 'career' || data.id === 'education') {
      const items = data.content;
      return (
        <div className="-mx-2 flex flex-wrap">
          {items.map((content, index) => (
            <div className="w-full p-2 sm:w-1/2" key={index}>
              <div className="h-full rounded-2xl border border-gray-400 px-3 py-4 sm:px-4 sm:py-6">
                <div className="mb-2 text-base sm:text-lg md:text-xl lg:text-2xl">
                  {`${content.startDate} - ${content.endDate}`}
                </div>
                <div className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl">
                  {content.title}
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <div className="bg-seagull-500 size-[8px] shrink-0 rounded-full sm:size-[12px]"></div>
                  <div className="flex flex-wrap gap-2">
                    {content.list.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-sm sm:text-base">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (data.id === 'skills') {
      const items = data.content;
      return (
        <div className="-mx-2 flex flex-wrap sm:h-3/5">
          {items.map((content, index) => {
            const IconComponent = icons[content.icon];
            return (
              <div className="w-1/2 p-2 sm:w-1/3 md:w-1/4" key={index}>
                <div className="group relative flex h-full min-h-[120px] items-center justify-center rounded-2xl border border-gray-400 px-3 py-4 sm:px-4 sm:py-6">
                  {IconComponent && (
                    <IconComponent
                      className="text-4xl sm:text-5xl md:text-6xl"
                      {...(IconComponent as React.HTMLAttributes<SVGElement>)}
                    />
                  )}
                  <div className="absolute right-2 bottom-2 rounded-md bg-gray-50 px-2 py-1 text-xs opacity-0 transition group-hover:opacity-80 sm:text-sm">
                    {content.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (data.id === 'profile') {
      const items = data.content;
      return (
        <div className="flex flex-col flex-wrap gap-6 md:flex-row md:gap-4">
          {items.map((content, index) => (
            <div
              className="h-fit w-full rounded-lg md:w-[calc(50%-0.5rem)]"
              key={index}
            >
              <div className="text-seagull-600 mb-2 text-sm font-semibold tracking-wide uppercase sm:text-base">
                {content.label}
              </div>
              <div className="text-sm leading-relaxed text-gray-800 sm:text-base">
                {Array.isArray(content.value) ? (
                  <ul className="space-y-1.5">
                    {content.value.map((value, valueIndex) => (
                      <li key={valueIndex} className="flex gap-2">
                        <div className="bg-seagull-500 mt-1.5 size-1.5 shrink-0 rounded-full" />
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  content.value
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      <motion.div
        className="mb-4 text-2xl sm:mb-6 sm:text-3xl md:text-4xl"
        key={`title-${tabIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {data.name}
      </motion.div>
      <motion.p
        className="mb-4 text-sm leading-6 sm:mb-6 sm:text-base"
        key={`description-${tabIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {data.description}
      </motion.p>
      <AnimatePresence mode="wait">
        <motion.div
          key={tabIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TabContent;
