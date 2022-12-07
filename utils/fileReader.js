const reader = new FileReader();

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const getUint8Array = (file) =>
  new Promise((resolve, reject) => {
    let int8View;
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(new Uint8Array(reader.result));
    reader.onerror = () => reject(error);
  });

export { getBase64, getUint8Array };
