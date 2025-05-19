"use client";

import { Toaster, toast } from "react-hot-toast";

const Toasted = () => {
    return <Toaster position="top-right" reverseOrder={false} />;
};

export const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
        toast.success(message);
    } else {
        toast.error(message);
    }
};

export default Toasted;
