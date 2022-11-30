// Get the cookie out of the cookie store
window.addEventListener('DOMContentLoaded', async () => {

    const payloadCookie = await cookieStore.get('jwt_access_payload')// FINISH THIS
    console.log(payloadCookie)
    console.log(payloadCookie.value)
    if (payloadCookie) {
      // The cookie value is a JSON-formatted string, so parse it
      const encodedPayload = JSON.parse(payloadCookie.value);
      // Convert the encoded payload from base64 to normal string
      const decodedPayload = atob(encodedPayload)// FINISH THIS
      // The payload is a JSON-formatted string, so parse it
      const payload = JSON.parse(decodedPayload)// FINISH THIS
      // Print the payload
    //   console.log(payload);
    
    if (payload.user.perms.includes("events.add_conference") && (payload.user.perms.includes("events.add_location")) && (payload.user.perms.includes("presentations.add_presentation"))){
        const locationRemove = document.getElementById('hidden-location')
        locationRemove.classList.remove("d-none")
        const conferenceRemove = document.getElementById('hidden-conference')
        conferenceRemove.classList.remove("d-none")
        const presentationRemove = document.getElementById('hidden-presentation')
        presentationRemove.classList.remove("d-none")
    }
      // Check if "events.add_conference" is in the permissions.
      // If it is, remove 'd-none' from the link
    
    
      // Check if "events.add_location" is in the permissions.
      // If it is, remove 'd-none' from the link
    
    }
    })