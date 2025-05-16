import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

let toastId = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = (type, message) => {
        const id = toastId++;
        setToasts((prev) => [...prev, { id, type, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 2000);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-4 right-4 space-y-2 z-50">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`px-4 py-3 rounded-md shadow text-white ${
                            toast.type === "success"
                                ? "bg-green-500"
                                : toast.type === "error"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                        }`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const { addToast } = useContext(ToastContext);
    return {
        success: (msg) => addToast("success", msg),
        error: (msg) => addToast("error", msg),
        warn: (msg) => addToast("warn", msg),
    };
}
