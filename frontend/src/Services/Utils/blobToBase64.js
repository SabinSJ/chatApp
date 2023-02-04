const blobToBase64 = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      resolve(reader.result);
    };
  });
};

const convertToBase64 = async (file) => {
  const b64 = await blobToBase64(file);
  const jsonString = JSON.stringify({ blob: b64 });

  return jsonString;
};

const parseFromBase64 = async (base64) => {
  const parsed = JSON.parse(base64);
  const blob = await fetch(parsed.blob).then((res) => res.blob());

  return blob;
};

export { convertToBase64, parseFromBase64 };
