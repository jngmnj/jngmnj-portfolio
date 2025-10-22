import { useAuth } from '@/utils/hooks';
import { FiLogOut } from 'react-icons/fi';
import { GoArrowLeft } from 'react-icons/go';
import { RiMenuLine } from 'react-icons/ri';

type AdminHeaderProps = {
  isOpen: boolean;
  handleToggle: () => void;
};

const AdminHeader = ({ isOpen, handleToggle }: AdminHeaderProps) => {
  const { logOut } = useAuth();

  return (
    <div className="flex justify-between border-b border-b-gray-200 px-4 py-2">
      <button
        type="button"
        onClick={handleToggle}
        className="cursor-pointer p-2"
      >
        {isOpen ? <GoArrowLeft /> : <RiMenuLine />}
      </button>
      <button
        type="button"
        onClick={logOut}
        className="hover:text-seagull-500 flex items-center gap-4 p-4"
      >
        <FiLogOut />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminHeader;
