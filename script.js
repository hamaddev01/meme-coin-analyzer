// CORS proxy for handling cross-origin requests
const corsProxy = 'https://cors-anywhere.herokuapp.com/';

async function analyzeCoin() {
    const coinAddress = document.getElementById('coin-address').value.trim();
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error-message');

    resultsDiv.style.display = 'none';
    errorDiv.style.display = 'none';

    if (!coinAddress) {
        errorDiv.innerText = 'Please enter a valid coin address.';
        errorDiv.style.display = 'block';
        return;
    }

    try {
        // Replace these with actual APIs when available
        const rugCheckAPI = `${corsProxy}https://rugcheck.xyz/api/check?address=${coinAddress}`;
        const dexCheckAPI = `${corsProxy}https://checkdex.xyz/api/check?address=${coinAddress}`;
        const holderAnalysisAPI = `${corsProxy}https://trench.bot/api/holders?address=${coinAddress}`;

        // Fetching Rug Check
        const rugResponse = await fetch(rugCheckAPI);
        const rugData = await rugResponse.json();

        // Fetching DEX Check
        const dexResponse = await fetch(dexCheckAPI);
        const dexData = await dexResponse.json();

        // Fetching Holder Analysis
        const holderResponse = await fetch(holderAnalysisAPI);
        const holderData = await holderResponse.json();

        // Update Results
        document.getElementById('rug-check-result').innerText = rugData.status || 'No Data';
        document.getElementById('dex-check-result').innerText = dexData.status || 'No Data';
        document.getElementById('holder-analysis-result').innerText = holderData.details || 'No Data';

        resultsDiv.style.display = 'block';
    } catch (error) {
        if (error instanceof TypeError) {
            errorDiv.innerText = 'The API endpoint might be incorrect or down. Please check the address or try again later.';
        } else {
            errorDiv.innerText = 'An unexpected error occurred: ' + error.message;
        }
        errorDiv.style.display = 'block';
        console.error('Error:', error);
    }
}
