import myData from '../../data/MyData';

type TabMenuProps = {
  activeTabIndex: number;
  onTabChange: (index: number) => void;
};

const TabMenu = ({ activeTabIndex, onTabChange }: TabMenuProps) => {
  return (
    <div className="flex flex-col gap-4">
      {myData.map((data, index) => (
        <button
          type="button"
          key={data.name}
          className={`w-full rounded-xl border px-6 py-3 text-center transition-colors ${
            activeTabIndex === index
              ? 'border-seagull-500 bg-seagull-50 text-seagull-700'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onClick={() => onTabChange(index)}
        >
          {data.name}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
