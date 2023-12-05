
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
                console.log(location)
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