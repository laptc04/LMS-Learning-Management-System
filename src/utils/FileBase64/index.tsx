
export const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === "string") {
                let base64String = reader.result.split(",")[1] || "";
                while (base64String.length % 4 !== 0) {
                    base64String += "=";
                }
                resolve(base64String);
            } else {
                reject(new Error("Không thể chuyển đổi file sang Base64"));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};
