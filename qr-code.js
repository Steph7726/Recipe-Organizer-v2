qr - code.js;

function generateQRCode() {
  let qrCodeCanvas = document.getElementById("qr-code");
  let qr = new QRious({
    element: qrCodeCanvas,
    value: window.location.href,
  });
}
