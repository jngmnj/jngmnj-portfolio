import { motion } from 'framer-motion';
import myData from '../../data/MyData';

type TabMenuProps = {
  activeTabIndex: number;
  onTabChange: (index: number) => void;
};

const TabMenu = ({ activeTabIndex, onTabChange }: TabMenuProps) => {
  return (
    <div className="flex flex-col gap-4">
      {myData.map((data, index) => (
        <motion.button
          type="button"
          key={data.name}
          className={`w-full rounded-xl border px-6 py-3 text-center transition-colors ${
            activeTabIndex === index
              ? 'border-seagull-500 bg-seagull-50 text-seagull-700'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onClick={() => onTabChange(index)}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
        >
          {data.name}
        </motion.button>
      ))}
    </div>
  );
};

export default TabMenu;
