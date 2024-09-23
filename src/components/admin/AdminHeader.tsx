import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { RiMenuLine } from 'react-icons/ri';

type AdminHeaderProps = {
  handleToggle: () => void;
};

const AdminHeader = ({ handleToggle }: AdminHeaderProps) => {
  return (
    <div className="flex justify-between border-b border-b-gray-200 px-4 py-2">
      <button
        type="button"
        onClick={handleToggle}
        className="cursor-pointer p-2"
      >
        <RiMenuLine />
      </button>
      <Link href="/logout">
        <div className="flex items-center gap-4 p-4 hover:text-seagull-500">
          <FiLogOut />
          <span>Logout</span>
        </div>
      </Link>
    </div>
  );
};

export default AdminHeader;
