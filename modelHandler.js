const MODEL_URL = "https://turbomacka.github.io/teachablemachine/";

let model;

async function initializeModelAndCamera() {
    try {
        console.log("Attempting to load model from:", MODEL_URL + "model.json");

        // Load the model
        model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
        console.log("Model loaded successfully!");

        // Start the webcam via navigator
        console.log("Attempting to start the webcam...");
        const webcamElement = document.getElementById("webcam");
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcamElement.srcObject = stream;
        await webcamElement.play();
        console.log("Webcam is now playing!");

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
    const canvas = document.createElement('canvas');
    canvas.width = webcamElement.videoWidth;
    canvas.height = webcamElement.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(webcamElement, 0, 0, canvas.width, canvas.height);

    // Make a prediction based on the canvas content
    const predictions = await model.predict(canvas);
    console.log("Predictions:", predictions);

    // Send the predictions to the UI handler to update the user interface
    updatePredictionsUI(predictions);
}

// Start the application by calling this function
initializeModelAndCamera();
