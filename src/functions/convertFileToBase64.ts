export const convertFileToBase64 = (
  file: File,
  withPrefix: boolean = false
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (withPrefix) {
        resolve(result);
      } else {
        const base64Content = result.split(",")[1];
        resolve(base64Content);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
