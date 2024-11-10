import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  slideDirection?: 'top' | 'bottom' | 'left' | 'right'
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, slideDirection = 'top' }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const width = window.innerHeight;

  const getTransform = () => {
    switch (slideDirection) {
      case 'top':
        return isOpen ? 'translateY(0)' : 'translateY(-100%)';
      case 'bottom':
        return isOpen ? 'translateY(0)' : 'translateY(100%)';
      case 'left':
        return isOpen ? 'translateX(0)' : 'translateX(-100%)';
      case 'right':
        return isOpen ? 'translateX(0)' : 'translateX(100%)';
      default:
        return 'translateY(0)';
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-50 transition-all duration-300 ease-in-out`}
      style={{
        transform: getTransform(),
      }}
    >
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 backdrop-blur-3xl bg-black bg-opacity-30`}
      />
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 max-w-5/6 -translate-y-1/2 p-10 bg-bg rounded-xl overflow-y-scroll no-scrollbar"
        style={{ maxHeight: width * 0.8 }}
      >
        <h1 className='text-primary font-bold text-xl text-center'>
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Modal;