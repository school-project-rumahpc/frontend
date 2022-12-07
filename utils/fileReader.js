const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const toBase64 = (file) => {
  return Buffer.from(file).toString('base64');
};
export { getBase64, toBase64 };
