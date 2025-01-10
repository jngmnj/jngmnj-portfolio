import myData from '../../data/MyData';

const TabContent4 = () => {
  return (
    <div className="w-2/3 overflow-y-auto overflow-x-hidden">
      <div className="mb-6 text-4xl">{myData[3].name}</div>
      <p className="mb-6 leading-6">{myData[3].description}</p>
      <div className="-mx-2 flex flex-wrap">
        {myData[3].content.map((content, index) => {
          return (
            <div className="w-1/2 p-2" key={index}>
              <div className="flex items-center gap-4">
                <div className="w-20 shrink-0 text-base text-gray-500">
                  {'label' in content && content.label}
                </div>
                <div className="text-xl font-medium text-gray-700">
                  {'value' in content && Array.isArray(content.value)
                    ? content.value.map((value, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="relative top-2 size-[12px] shrink-0 rounded-full bg-seagull-500"></div>
                          {value}
                        </div>
                      ))
                    : 'value' in content && content.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabContent4;
