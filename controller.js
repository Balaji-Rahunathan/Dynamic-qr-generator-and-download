//get Data from file
function getDataArray() {
  let dataArray = []
  fetch('./Keeladi.json')
    .then((response) => response.json())
    .then((json) => {
      json.map(data => {
        if (data["Artefact Name / Number (Scanned File Number)"] !== "") {
          dataArray.push(data["Artefact Name / Number (Scanned File Number)"].toLowerCase())
        }
      })
      // console.log(dataArray)
      generateQR(dataArray)
    });
}

async function generateQR(qrData) {
  // Loop through data and generate QR code for each item
  await qrData.map((data, index) => {
    let qrContainer = document.createElement("div")
    qrContainer.className = "qr-code-container"
    qrContainer.id = "container" + index

    let qrImageContainer = document.createElement("div")
    qrImageContainer.className = "qrcode-image-container"
    qrImageContainer.id = "qrimage" + index

    qrContainer.appendChild(qrImageContainer)
    document.body.appendChild(qrContainer)

    new QRCode(document.getElementById("qrimage" + index), {
      text: data,
      width: 610,
      height: 610,
      colorDark: "#000000",
      colorLight: "#fff9f2",
      correctLevel: QRCode.CorrectLevel.H
    });

    const qrCodeContainer = document.getElementById("container" + index);
    printToDiv(qrCodeContainer, data)
  });
}

function printToDiv(div, name) {
  html2canvas(div).then(function (canvas) {
    var img = canvas.toDataURL();
    startDownload("data:" + img, name + ".png");
  });
}
function startDownload(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}


getDataArray()