export function encodeToBase64(file: File | undefined) {
  return new Promise((resolve, reject) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
} 
