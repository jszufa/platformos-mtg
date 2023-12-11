
function uploadFile() {
    let form = document.getElementById('uploadForm');
    let formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        mode: "cors",
        body: formData
    })
        .then(response => response.text())
        .then(async xmlResponse => {
            //console.log('XML Response:', xmlResponse);
            const xmlDocument = new DOMParser().parseFromString(xmlResponse, "text/xml");

            if (!xmlDocument.querySelector("Error")) {
                const imageUrl = xmlDocument.querySelector("Location").textContent;
                await saveUrl(imageUrl);
                //window.location.reload() //jak odświeżyć / zadzaiałać tak, żeby pojawiał się od razu zapisany obraz
            }
            else {
                const errorMessage = xmlDocument.querySelector("Message").textContent;
                console.log(errorMessage);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function saveUrl(imageUrl) {
    //w pliku liquid mogę definiować slug
    fetch(`/image/create_record`, {
        method: 'POST',
        vcredentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json' //??
        },
        body: JSON.stringify({ direct_url: imageUrl})
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error('Error:', error);
        });
}

/* function saveUrl2(imageUrl) {
  console.log("Saveurl2 initialized");
  let imageUrlForm = document.getElementById('crete-image-record');
  let imageUrlFormInput = document.getElementById('imageUrlInput');
  
  imageUrlFormInput.value = imageUrl;

  imageUrlForm.submit();
} */