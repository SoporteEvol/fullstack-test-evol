import { ReactNode } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        
                        {/* Header con botón de cierre */}
                        <div className="flex justify-between items-center bg-gray-100 px-4 py-3">
                            <h2 id="modal-title" className="text-lg font-medium text-gray-900">Modal</h2>
                            <button 
                                onClick={onClose} 
                                type="button" 
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label="Close"
                            >
                                ✖
                            </button>
                        </div>

                        {/* Contenido del modal */}
                        <div className="bg-white px-4 py-4 sm:p-6 sm:pb-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
