async function checkTickets() {
    try {
        console.log('Fetching tickets from Vercel...');
        const API_URL = 'http://localhost:5001';
        const response = await fetch(`${API_URL}/api/tickets`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }

        const tickets = await response.json();
        console.log(`Total tickets found: ${tickets.length}`);

        // Sort by amount descending to find the highest value tickets
        tickets.sort((a, b) => b.amount - a.amount);

        console.log('\n--- Top 20 Tickets by Amount ---');
        tickets.slice(0, 20).forEach(t => {
            console.log(`ID: ${t.id}, Amount: ${t.amount}, Date: ${t.createdAt}, Mobile: ${t.mobile || 'N/A'}`);
        });

    } catch (error) {
        console.error('Error fetching tickets:', error.message);
    }
}

checkTickets();
