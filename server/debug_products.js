async function debugProducts() {
    try {
        const response = await fetch('http://localhost:5001/api/products');
        console.log('Status:', response.status);
        if (!response.ok) {
            console.error('Fetch failed:', response.statusText);
            return;
        }
        const data = await response.json();
        console.log('Number of products:', data.length);
        if (data.length > 0) {
            console.log('First product sample (keys):', Object.keys(data[0]));
            console.log('Sample Product:', JSON.stringify(data[0], null, 2));
        } else {
            console.log('No products found.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

debugProducts();
