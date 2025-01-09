import { RiCloseLine } from 'react-icons/ri';

interface ModalProps {
  id: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal = ({ id, setIsModalOpen }: ModalProps) => {
  return (
    <div>
      <div
        className="fixed left-0 top-0 z-40 size-full cursor-pointer bg-black opacity-50"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <div className="relative rounded-lg bg-white p-8">
          <button
            className="absolute right-4 top-4"
            onClick={() => setIsModalOpen(false)}
          >
            <RiCloseLine className="text-2xl" />
            <span className="text-transparent">Close</span>
          </button>
          <div className="mb-4 border-b border-b-gray-50 pb-4">
            <h2 className="text-xl font-bold">프로젝트제목</h2>
          </div>
          {/* Project details */}
          {/* Project images */}
          {/* Project stack */}
          {/* Project links */}
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Modal;
