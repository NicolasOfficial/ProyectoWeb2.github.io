// Registro
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        firstName: document.getElementById('firstName').value,
        fatherLastName: document.getElementById('fatherLastName').value,
        motherLastName: document.getElementById('motherLastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
        window.location.href = 'login.html';
    } else {
        alert(result.error);
    }
});

// Acceso
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        username: document.getElementById('loginUsername').value,
        password: document.getElementById('loginPassword').value
    };

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
        window.location.href = 'https://www.aragon.unam.mx/fes-aragon/#!/inicio';
    } else {
        alert(result.error);
    }
});

