
function uploadFile() {
    let form = document.getElementById('uploadForm');
    let formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        mode: "cors",
        body: formData
    })
        .then(response => response.text())
        .then(xmlResponse => {
            //console.log('XML Response:', xmlResponse);
            const xmlDocument = new DOMParser().parseFromString(xmlResponse, "text/xml");

            if (!xmlDocument.querySelector("Error")) {
                const location = xmlDocument.querySelector("Location").textContent;
                saveUrl(location);
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

function saveUrl(location) {
    console.log("Save url initialized");

    //w pliku liquid mogę definiować slug
    fetch(`/image/create_record`, {
        method: 'POST',
        vcredentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json' //??
        },
        body: JSON.stringify({ direct_url: location})
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error('Error:', error);
        });
}