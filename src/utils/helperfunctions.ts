export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const byteArray = new Uint8Array(buffer);
  const binaryString = byteArray.reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  return window.btoa(binaryString);
};
