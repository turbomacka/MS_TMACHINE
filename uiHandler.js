function updatePredictionsUI(predictions) {
    // Get the video element and the popup text element
    const videoElement = document.getElementById("webcam");
    const popupTextElement = document.getElementById("popup-text");

    // Find the prediction for the target object (assuming "Class 2" is the target)
    const targetPrediction = predictions.find(prediction => prediction.className === "Class 2");

    // Update the border and show popup text based on confidence level
    if (targetPrediction) {
        const probability = targetPrediction.probability;

        if (probability > 0.995) {  // Lowered threshold to 60%
            // High confidence - set to green and show popup text
            videoElement.classList.remove("low-confidence");
            videoElement.classList.add("high-confidence");

            // Show the popup text briefly
            popupTextElement.style.display = "block";
            setTimeout(() => {
                popupTextElement.style.display = "none";
            }, 1500); // Display for 1.5 seconds
        } else if (probability > 0.3) {  // Adjusted medium threshold
            // Medium confidence - set to yellow-red
            videoElement.classList.remove("high-confidence");
            videoElement.classList.add("low-confidence");

            // Hide popup text
            popupTextElement.style.display = "none";
        } else {
            // Low confidence - set to default (black border)
            videoElement.classList.remove("low-confidence", "high-confidence");

            // Hide popup text
            popupTextElement.style.display = "none";
        }
    } else {
        // If no target is detected, remove any confidence class and hide popup text
        videoElement.classList.remove("low-confidence", "high-confidence");
        popupTextElement.style.display = "none";
    }
}
