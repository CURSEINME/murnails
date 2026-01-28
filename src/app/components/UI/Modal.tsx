interface ModalProps {
  children: React.ReactNode;
  overlayClassName?: string;
  onClose: () => void;
}

export default function Modal({ children, onClose, overlayClassName }: ModalProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 md:px-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full
          max-w-lg
          max-h-[90dvh]
          overflow-y-auto
          ${overlayClassName ?? ''}
        `}
      >
        {children}
      </div>
    </div>
  );
}
