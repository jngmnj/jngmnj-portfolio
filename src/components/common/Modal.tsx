import { AnimatePresence, motion } from 'framer-motion';
import { RiCloseLine } from 'react-icons/ri';

interface ModalProps {
  id: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal = ({ id: _id, setIsModalOpen }: ModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="fixed top-0 left-0 z-40 size-full cursor-pointer bg-black/50"
          onClick={() => setIsModalOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative rounded-lg bg-white p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.button
              className="absolute top-4 right-4 rounded-full p-2 transition-colors hover:bg-gray-100"
              onClick={() => setIsModalOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RiCloseLine className="text-2xl" />
              <span className="text-transparent">Close</span>
            </motion.button>
            <motion.div
              className="mb-4 border-b border-b-gray-50 pb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-bold">프로젝트제목</h2>
            </motion.div>
            {/* Project details */}
            {/* Project images */}
            {/* Project stack */}
            {/* Project links */}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
