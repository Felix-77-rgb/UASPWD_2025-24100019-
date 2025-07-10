document.querySelectorAll('.select-tutor').forEach(button => {
  button.addEventListener('click', (e) => {
    const tutorName = e.target.closest('.tutor-card').dataset.name;
    const tutorInputElement = document.getElementById('tutorInput');

    tutorInputElement.value = tutorName;
    tutorInputElement.focus();
  });
});

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const form = e.target;
  const responseMsg = document.getElementById('responseMsg');
  
  const data = new URLSearchParams(new FormData(form));

  responseMsg.textContent = 'Mengirim...';
  responseMsg.style.color = 'gray';

  try {
    const response = await fetch('/contact', {
      method: 'POST',
      body: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const resultText = await response.text();

    if (response.ok) {
        responseMsg.textContent = resultText;
        responseMsg.style.color = 'green';
        form.reset();
    } else {
        responseMsg.textContent = `Error: ${resultText}`;
        responseMsg.style.color = 'red';
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    responseMsg.textContent = 'Gagal terhubung ke server.';
    responseMsg.style.color = 'red';
  }
});