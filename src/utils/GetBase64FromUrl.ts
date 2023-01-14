async function GetBase64FromUrl(url: string): Promise<string | ArrayBuffer | null> {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
}

export default GetBase64FromUrl;
