// modelHandler.js
const MODEL_URL = "model.json";
const METADATA_URL = "metadata.json";
let model;

async function initializeModelAndCamera() {
    try {
        model = await tmImage.load(MODEL_URL, METADATA_URL);

        // Start the webcam
        const webcamElement = document.getElementById("webcam");
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcamElement.srcObject = stream;
        await webcamElement.play();

        // Start the loop for predictions
        window.requestAnimationFrame(predictionLoop);
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Could not start the model or the webcam. Check the console for more information.");
    }
}

async function predictionLoop() {
    await makePrediction();
    window.requestAnimationFrame(predictionLoop);
}

async function makePrediction() {
    const webcamElement = document.getElementById("webcam");
    if (!model || webcamElement.readyState !== 4) return;

    const canvas = document.createElement('canvas');
    canvas.width = webcamElement.videoWidth;
    canvas.height = webcamElement.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(webcamElement, 0, 0, canvas.width, canvas.height);

    const predictions = await model.predict(canvas);

    // Uppdatera UI
    updatePredictionsUI(predictions);
}

// Starta appen automatiskt när sidan laddas
window.onload = initializeModelAndCamera;
