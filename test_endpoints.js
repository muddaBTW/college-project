
const BASE_URL = 'http://localhost:5001/api';

async function testHealth() {
    try {
        const res = await fetch(`${BASE_URL}/health`);
        const data = await res.json();
        console.log('GET /health:', res.status === 200 ? 'PASS' : 'FAIL', data);
    } catch (err) {
        console.error('GET /health: FAIL', err.message);
    }
}

async function testCheckInteraction() {
    try {
        const payload = { drugA: "warfarin", drugB: "aspirin" };
        const res = await fetch(`${BASE_URL}/check-interaction`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        console.log('POST /check-interaction (Danger):', res.status === 200 && data.data.level === 'danger' ? 'PASS' : 'FAIL', data?.data?.level);
    } catch (err) {
        console.error('POST /check-interaction: FAIL', err.message);
    }
}

async function testAskAI() {
    try {
        const payload = { question: "What is this?", attachments: ["test.jpg"] };
        const res = await fetch(`${BASE_URL}/ask-ai`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        console.log('POST /ask-ai:', res.status === 200 ? 'PASS' : 'FAIL', data?.data?.reply ? 'Received Reply' : 'No Reply');
    } catch (err) {
        console.error('POST /ask-ai: FAIL', err.message);
    }
}

async function runTests() {
    console.log('Starting Endpoint Tests on ' + BASE_URL);
    await testHealth();
    await testCheckInteraction();
    await testAskAI();
    // Upload test skipped for simplicity in this script, usually requires FormData
}

runTests();
