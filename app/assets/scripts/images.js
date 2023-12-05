
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
                console.log(location);

                //nie może być tak jak poniżej bo to metoda get, a ja chcę post
                window.location.href = `/app/views/pages/image/create.liquid?location=${location}`;
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
    fetch(`app\views\pages\image\create.liquid?location=${location}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: 'value' }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
}