const API_URL = 'http://localhost:5001/api/auth';
const EMAIL = 'admin@ethree.com';
const PASSWORD = 'admin123';

const testLogin = async () => {
    try {
        console.log(`Attempting login for ${EMAIL}...`);

        const loginRes = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: EMAIL, password: PASSWORD })
        });

        if (!loginRes.ok) {
            const err = await loginRes.text();
            throw new Error(`Login Failed: ${loginRes.status} - ${err}`);
        }

        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('Login successful! Token received.');
        console.log('Token:', token.substring(0, 20) + '...');
        console.log('User Role:', loginData.user.role);

        console.log('\nAttempting to fetch users (Protected Route)...');

        const usersRes = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!usersRes.ok) {
            const err = await usersRes.text();
            throw new Error(`Fetch Users Failed: ${usersRes.status} - ${err}`);
        }

        const usersData = await usersRes.json();
        console.log('Fetch Users Success!');
        console.log('User count:', usersData.length);

    } catch (err) {
        console.error(err.message);
    }
};

testLogin();
