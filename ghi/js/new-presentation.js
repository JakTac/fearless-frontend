window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }
    }
    const alertTag = document.getElementById('success-message');
    const formTag = document.getElementById('create-presentation-form')
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const conferenceUrl = JSON.parse(json).conference;
        const presentationUrl = `http://localhost:8000${conferenceUrl}presentations/`;
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newPresentation = await response.json();
            console.log(newPresentation);
            alertTag.classList.remove('d-none');
        } else {
            console.error("response was not ok")
        }
    });
  });