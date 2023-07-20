async function GetKitty() {
    const url = "https://cataas.com/cat?json=true";
    const loader = document.querySelector(".main-box div div");
    const catImageDiv = document.getElementById("catImage");

    try {
        loader.classList.add("blurred"); // Apply the blur and opacity to the old image
        loader.style.display = "block"; // Show the loader

        const response = await fetch(url);
        const data = await response.json();

        if (data && data.url) {
            // Create a new image element
            const newImage = new Image();
            newImage.onload = function () {
                // Once the image is fully loaded, set it as the background
                catImageDiv.style.backgroundImage = `url(${this.src})`;
                loader.classList.remove("blurred"); // Remove the blur and opacity from the old image
                loader.style.display = "none"; // Hide the loader when the image is loaded
            };
            newImage.src = `https://cataas.com${data.url}`;
        } else {
            throw new Error("Invalid response from the server.");
        }
    } catch (error) {
        console.error("Error fetching the cat image:", error);
        // Handle the error appropriately (e.g., show an error message to the user).
        loader.classList.remove("blurred"); // Remove the blur and opacity in case of an error
        loader.style.display = "none"; // Hide the loader in case of an error
    }
}

document.addEventListener("DOMContentLoaded", function () {
    GetKitty();
    $('[data-toggle="tooltip"]').tooltip();
});
