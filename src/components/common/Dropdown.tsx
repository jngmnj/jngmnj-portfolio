import { cn } from '@/utils/style';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { IoChevronDown } from 'react-icons/io5';

interface DropdownContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  triggerId: string;
  menuId: string;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error('Dropdown components must be used within Dropdown.Root');
  }
  return ctx;
}

interface DropdownRootProps {
  children: ReactNode;
  className?: string;
}

function Root({ children, className }: DropdownRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const menuId = useId();

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        close();
      }
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider
      value={{ isOpen, toggle, close, triggerId, menuId }}
    >
      <div className={cn('relative', className)} ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

interface TriggerProps {
  children: ReactNode;
  ariaLabel: string;
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
  showArrow?: boolean;
}

const triggerVariantClasses = {
  default: 'border border-gray-200 bg-white hover:bg-gray-50',
  ghost: 'border-none bg-transparent',
  outline: 'border border-gray-200 bg-transparent hover:bg-gray-50',
};

function Trigger({
  children,
  ariaLabel,
  variant = 'default',
  className,
  showArrow = true,
}: TriggerProps) {
  const { isOpen, toggle, triggerId, menuId } = useDropdownContext();

  return (
    <button
      id={triggerId}
      type="button"
      onClick={toggle}
      className={cn(
        'flex cursor-pointer items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors',
        triggerVariantClasses[variant],
        className
      )}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={menuId}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {showArrow && (
        <IoChevronDown
          className={cn('size-4 transition-transform', isOpen && 'rotate-180')}
        />
      )}
    </button>
  );
}

interface MenuProps {
  children: ReactNode;
  className?: string;
}

function Menu({ children, className }: MenuProps) {
  const { isOpen, menuId, triggerId } = useDropdownContext();
  if (!isOpen) return null;

  return (
    <ul
      id={menuId}
      className={cn(
        'absolute top-full right-0 z-50 mt-1 min-w-28 rounded-md border border-gray-200 bg-white py-1 shadow-lg',
        className
      )}
      role="listbox"
      aria-labelledby={triggerId}
    >
      {children}
    </ul>
  );
}

interface ItemProps {
  children: ReactNode;
  selected?: boolean;
  onSelect: () => void;
  className?: string;
}

function Item({ children, selected = false, onSelect, className }: ItemProps) {
  const { close } = useDropdownContext();

  const handleClick = () => {
    close();
    onSelect();
  };

  return (
    <li role="option" aria-selected={selected}>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'w-full px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100',
          selected && 'text-seagull-600 bg-gray-50 font-medium',
          className
        )}
      >
        {children}
      </button>
    </li>
  );
}

const Dropdown = {
  Root,
  Trigger,
  Menu,
  Item,
};

export default Dropdown;
