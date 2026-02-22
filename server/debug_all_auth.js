async function checkAllTransactions() {
    const API_URL = 'https://thurman-unexpropriable-mesmerizingly.ngrok-free.dev';
    let token = '';

    // 1. Login
    try {
        console.log('Logging in...');
        const loginRes = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@ethree.com', password: 'admin123' })
        });

        if (!loginRes.ok) {
            throw new Error(`Login failed: ${loginRes.status} ${loginRes.statusText}`);
        }

        const loginData = await loginRes.json();
        token = loginData.token;
        console.log('Login successful. Token received.');
    } catch (error) {
        console.error('Authentication Error:', error.message);
        return;
    }

    // 2. Query Endpoints
    const endpoints = [
        { name: 'Tickets', url: `${API_URL}/api/tickets` },
        { name: 'Bookings', url: `${API_URL}/api/bookings` },
        { name: 'Orders', url: `${API_URL}/api/orders` }
    ];

    for (const endpoint of endpoints) {
        try {
            console.log(`Fetching ${endpoint.name}...`);
            const response = await fetch(endpoint.url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                console.log(`Failed to fetch ${endpoint.name}: ${response.status}`);
                continue;
            }

            const data = await response.json();
            console.log(`Found ${data.length} ${endpoint.name}`);

            data.sort((a, b) => (b.totalAmount || b.amount || 0) - (a.totalAmount || a.amount || 0));

            const top = data.slice(0, 5);
            if (top.length > 0) {
                console.log(`--- Top 5 ${endpoint.name} ---`);
                top.forEach(item => {
                    const amount = item.totalAmount || item.amount;
                    console.log(`ID: ${item.id || item._id}, Amount: ${amount}, Date: ${item.createdAt || item.date}`);
                });
            }

            // Search for target value (18000, 180000, 1800)
            const targets = data.filter(item => {
                const amt = item.totalAmount || item.amount;
                return amt == 18000 || amt == 180000 || amt == 1800; // Check for exact matches
            });

            if (targets.length > 0) {
                console.log(`\n*** FOUND MATCHING ${endpoint.name.toUpperCase()} ***`);
                targets.forEach(t => console.log(JSON.stringify(t, null, 2)));
            }

        } catch (error) {
            console.error(`Error checking ${endpoint.name}:`, error.message);
        }
    }
}

checkAllTransactions();
