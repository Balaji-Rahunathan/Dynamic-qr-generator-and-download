// Get the QR code container

// Sample data
const qrData = [
  'agr-1-111',
  'agr-2-111',
  // 'charlie@example.com',
];


async function generateQR() {
  // Loop through data and generate QR code for each item
  await qrData.map((data, index) => {
    let qrContainer = document.createElement("div")
    qrContainer.className = "qr-code-container"
    qrContainer.id = "container"+index

    let qrImageContainer = document.createElement("div")
    qrImageContainer.className = "qrcode-image-container"
    qrImageContainer.id = "qrimage"+index

    qrContainer.appendChild(qrImageContainer)
    document.body.appendChild(qrContainer)

    new QRCode(document.getElementById("qrimage"+index), {
      text: data,
      width: 610,
      height: 610,
      colorDark: "#000000",
      colorLight: "#fff9f2",
      correctLevel: QRCode.CorrectLevel.H
    });

    const qrCodeContainer = document.getElementById("container" + index);
    printDiv2(qrCodeContainer)
  });
}

function printDiv2(div) {
  html2canvas(div).then(function (canvas) {
    var img = canvas.toDataURL();
    downloadURI("data:" + img, "yourImage.png");
  });
}
function downloadURI(uri, name) {
  var link = document.createElement("a");
  console.log(link)
  link.download = name;
  link.href = uri;
  link.click();
  //after creating link you should delete dynamic link
  // setTimeout(() => {
  //   document.body.removeChild(link);
  // }, 100);
}

generateQR()