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
        // Placeholder API URLs (replace with actual APIs)
        const rugCheckAPI = `https://rugcheck.xyz/api/check?address=${coinAddress}`;
        const dexCheckAPI = `https://checkdex.xyz/api/check?address=${coinAddress}`;
        const holderAnalysisAPI = `https://trench.bot/api/holders?address=${coinAddress}`;

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
        errorDiv.innerText = 'An error occurred while analyzing the coin. Please try again later.';
        errorDiv.style.display = 'block';
        console.error(error);
    }
}
