'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle, IoWarning } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // fade out 애니메이션 대기
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const toastConfig = {
    success: {
      bg: 'bg-white border-emerald-300',
      text: 'text-gray-900',
      icon: IoCheckmarkCircle,
      iconColor: 'text-emerald-300',
      shadow: 'shadow-[0_10px_38px_-10px_rgba(0,0,0,0.1),0_10px_20px_-15px_rgba(0,0,0,0.05)]',
    },
    error: {
      bg: 'bg-white border-red-300',
      text: 'text-gray-900',
      icon: IoCloseCircle,
      iconColor: 'text-red-300',
      shadow: 'shadow-[0_10px_38px_-10px_rgba(0,0,0,0.1),0_10px_20px_-15px_rgba(0,0,0,0.05)]',
    },
    info: {
      bg: 'bg-white border-sky-300',
      text: 'text-gray-900',
      icon: IoInformationCircle,
      iconColor: 'text-sky-300',
      shadow: 'shadow-[0_10px_38px_-10px_rgba(0,0,0,0.1),0_10px_20px_-15px_rgba(0,0,0,0.05)]',
    },
    warning: {
      bg: 'bg-white border-amber-300',
      text: 'text-gray-900',
      icon: IoWarning,
      iconColor: 'text-amber-300',
      shadow: 'shadow-[0_10px_38px_-10px_rgba(0,0,0,0.1),0_10px_20px_-15px_rgba(0,0,0,0.05)]',
    },
  };

  const config = toastConfig[type];
  const IconComponent = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className={`fixed top-4 left-1/2 z-9999 flex w-full max-w-md -translate-x-1/2 items-center gap-3 rounded-lg border px-4 py-3 sm:px-5 sm:py-4 ${config.bg} ${config.shadow}`}
        >
          <div className={`shrink-0 ${config.iconColor}`}>
            <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <p className={`flex-1 text-sm font-medium sm:text-base ${config.text}`}>
            {message}
          </p>
          <button
            onClick={handleClose}
            className="shrink-0 rounded-md p-1 transition-colors hover:bg-gray-100 text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label="Close toast"
          >
            <MdClose className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
