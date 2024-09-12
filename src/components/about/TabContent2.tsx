import { myData } from '../../pages/about/MyData';

const TabContent2 = () => {
  return (
    <div className="w-2/3 overflow-y-auto overflow-x-hidden">
      <div className="mb-6 text-4xl">{myData[1].name}</div>
      <p className="mb-6 leading-6">{myData[1].description}</p>
      <div className="-mx-2 flex flex-wrap">
        {myData[1].content.map((content, index) => (
          <div className="w-1/2 p-2" key={index}>
            <div className="rounded-2xl border px-4 py-6">
              <div className="mb-2 text-2xl">
                {'startDate' in content && 'endDate' in content
                  ? `${content.startDate} - ${content.endDate}`
                  : ''}
              </div>
              <div className="mb-4 text-3xl">
                {'title' in content && content.title}
              </div>
              <div className="flex items-center gap-3">
                <div className="size-[12px] rounded-full bg-seagull-500"></div>
                {'list' in content &&
                  content.list.map((item: string, index: number) => (
                    <div key={index}>{item}</div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabContent2;
