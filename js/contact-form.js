
//first add event listener onto contact form
document.getElementById('contact-form').addEventListener('submit', async (e) => { 
    e.preventDefault(); //preventing screen refreshing
    
    const formData = new FormData(e.target); //initiate a FormData object for efficiency from event
    const data = Object.fromEntries(formData.entries());

    //console.log(data);
    //console.log(JSON.stringify(data));

    try {
        const response = await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Email sent successfully!');
        } else {
            alert('Failed to send email');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to send email');
    }
});