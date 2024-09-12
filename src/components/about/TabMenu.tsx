import { myData } from '../../pages/about/MyData';

type TabMenuProps = {
  setTabIndex: (index: number) => void;
};

const TabMenu = ({ setTabIndex }: TabMenuProps) => {
  return (
    <div className="flex flex-col gap-4">
      {myData.map((data, index) => (
        <button
          type="button"
          key={index}
          className="w-full gap-2 rounded-xl border border-gray-300 px-6 py-3 text-center"
          onClick={() => setTabIndex(index)}
        >
          {data.name}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
