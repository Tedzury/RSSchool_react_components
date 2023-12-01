export function encodeToBase64(fileList: FileList | undefined) {
  return new Promise((resolve, reject) => {
    if (!fileList) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
} 
