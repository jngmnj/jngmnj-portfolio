import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import myData, { icons } from '../../data/MyData';

type TabContentProps = {
  tabIndex: number;
};

const TabContent = ({ tabIndex }: TabContentProps) => {
  const data = myData[tabIndex];

  if (!data) return null;

  const renderContent = () => {
    switch (tabIndex) {
      case 0:
      case 1:
        return (
          <div className="-mx-2 flex flex-wrap">
            {data.content.map((content, index) => (
              <div className="w-1/2 p-2" key={index}>
                <div className="h-full rounded-2xl border border-gray-400 px-4 py-6">
                  <div className="mb-2 text-2xl">
                    {'startDate' in content && 'endDate' in content
                      ? `${content.startDate} - ${content.endDate}`
                      : ''}
                  </div>
                  <div className="mb-4 text-3xl">
                    {'title' in content && content.title}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-seagull-500 size-[12px] rounded-full"></div>
                    {'list' in content &&
                      content.list.map((item: string, itemIndex: number) => (
                        <div key={itemIndex}>{item}</div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="-mx-2 flex h-3/5 flex-wrap">
            {data.content.map((content, index) => {
              const IconComponent =
                'icon' in content && icons[content.icon as keyof typeof icons];
              return (
                <div className="w-1/4 p-2" key={index}>
                  <div className="group relative flex h-full items-center justify-center rounded-2xl border border-gray-400 px-4 py-6">
                    {IconComponent && (
                      <IconComponent
                        className="text-6xl"
                        {...(IconComponent as React.HTMLAttributes<SVGElement>)}
                      />
                    )}
                    <div className="absolute right-2 bottom-2 rounded-md bg-gray-50 px-2 py-1 opacity-0 transition group-hover:opacity-80">
                      {'title' in content && content.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 3:
        return (
          <div className="-mx-2 flex flex-wrap">
            {data.content.map((content, index) => (
              <div className="w-1/2 p-2" key={index}>
                <div className="flex items-center gap-4">
                  <div className="w-20 shrink-0 text-base text-gray-500">
                    {'label' in content && content.label}
                  </div>
                  <div className="text-xl font-medium text-gray-700">
                    {'value' in content && Array.isArray(content.value)
                      ? content.value.map((value, valueIndex) => (
                          <div key={valueIndex} className="flex gap-2">
                            <div className="bg-seagull-500 relative top-2 size-[12px] shrink-0 rounded-full"></div>
                            {value}
                          </div>
                        ))
                      : 'value' in content && content.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      <motion.div
        className="mb-6 text-4xl"
        key={`title-${tabIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {data.name}
      </motion.div>
      <motion.p
        className="mb-6 leading-6"
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
