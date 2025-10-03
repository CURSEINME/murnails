interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
