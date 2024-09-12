import React from 'react';
import { icons, myData } from '../../pages/about/MyData';

const TabContent3 = () => {
  return (
    <div className="w-2/3 overflow-y-auto overflow-x-hidden">
      <div className="mb-6 text-4xl">{myData[2].name}</div>
      <p className="mb-6 leading-6">{myData[2].description}</p>
      <div className="-mx-2 flex h-3/5 flex-wrap">
        {myData[2].content.map((content, index) => {
          const IconComponent =
            'icon' in content && icons[content.icon as keyof typeof icons];
          return (
            <div className="w-1/4 p-2" key={index}>
              <div className="group relative flex h-full items-center justify-center rounded-2xl border px-4 py-6">
                {IconComponent && (
                  <IconComponent
                    className="text-6xl"
                    {...(IconComponent as React.HTMLAttributes<SVGElement>)}
                  />
                )}
                <div className="absolute bottom-2 right-2 rounded-md bg-gray-50 px-2 py-1 opacity-0 transition group-hover:opacity-80">
                  {'title' in content && content.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabContent3;
