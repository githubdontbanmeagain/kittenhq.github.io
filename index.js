let oldImageUrl = null;

async function getKitty() {
    const radios = document.getElementsByName("main-radio");
    let selectedRadioValue = "all"; // Default value

    // Find the checked radio button and get its value
    for (const radio of radios) {
        if (radio.checked) {
            selectedRadioValue = radio.value;
            break;
        }
    }

    // Use the selected value to form the new URL
    let url = "https://api.thecatapi.com/v1/images/search?limit=1";
    if (selectedRadioValue === "beng") {
        url += "&breed_ids=beng";
    } else if (selectedRadioValue === "chee") {
        url += "&breed_ids=chee";
    } else if (selectedRadioValue === "lihu") {
        url += "&breed_ids=lihu";
    }

    const loader = document.querySelector(".main-box div div");
    const catImageDiv = document.getElementById("catImage");

    try {
        loader.classList.add("blurred");
        loader.style.display = "block";

        const response = await fetch(url);
        const data = await response.json();

        if (data && data[0] && data[0].url) {

            // Check if the old image URL is the same as the current one
            if (oldImageUrl === data[0].url) {
                // Rerun the function
                getKitty();
                return;
            }

            oldImageUrl = data[0].url; // Update the old image URL

            const newImage = new Image();
            newImage.onload = function () {

                catImageDiv.style.backgroundImage = `url(${this.src})`;
                loader.classList.remove("blurred");
                loader.style.display = "none";
            };
            newImage.src = data[0].url;
        } else {
            throw new Error("Invalid response from the server.");
        }
    } catch (error) {
        console.error("Error fetching the cat image:", error);

        loader.classList.remove("blurred");
        loader.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getKitty();
    $('[data-toggle="tooltip"]').tooltip();
});
