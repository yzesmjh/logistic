import { useState } from "react";
import PropTypes from "prop-types";

// ── Inner modal shell ────────────────────────────────────────────────────────
const MyModal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[200] p-4">
      {/* Backdrop — click to close */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content card — `relative` is required so z-index beats the backdrop */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
};

// ── Public Modal wrapper ─────────────────────────────────────────────────────
const Modal = ({ caption, captionButton, modalContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {captionButton ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {caption}
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full text-left text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors py-1"
        >
          {caption}
        </button>
      )}

      <MyModal isOpen={isOpen} title={caption} onClose={() => setIsOpen(false)}>
        {modalContent}
      </MyModal>
    </>
  );
};

Modal.propTypes = {
  caption:       PropTypes.string.isRequired,
  captionButton: PropTypes.bool,
  modalContent:  PropTypes.node.isRequired,
};

Modal.defaultProps = {
  captionButton: false,
};

export default Modal;
