// API auth and endpoint
const API_URL =
	'https://api.unsplash.com/search/photos/?client_id=Lfaj-H84zRuUnaH8ZLPRcrCWuchnxGZU6HF5T3c_hoE&query=';

// form and input data for event handling
const form = document.querySelector('form');
const input = document.querySelector('input');
const loadingImage = document.getElementById('loadingImage');
const imageSection = document.querySelector('.images');

loadingImage.style.display = 'none'; // Loading image state

form.addEventListener('submit', formSubmitted, false); // Submit event

// Event handler
function formSubmitted(event) {
	event.preventDefault();
	const searchTerm = input.value; // Fetch the search value from the input element.

	search(searchTerm).then((result) => {
		displayImages(result);
	}); //The search function will return a promise from FETCH, and the results will be passed to the displayImages function.
}

// Search handler
function search(searchTerm) {
	imageSection.innerHTML = ''; // Empty previous image searches
	loadingImage.style.display = ''; // Display loading
	const url = `${API_URL}${searchTerm}`;

	//Fetch is promise based, JSON also returns a promise.
	return fetch(url) // Return a promise so we can handle the images outside the search function.
		.then((response) => response.json())
		.then((result) => {
			return result;
		});
}

//Image handler
function displayImages(images) {
	images.results.forEach((image) => {
		// Loop through all images
		const imageElement = document.createElement('img'); // Create an HTML image element
		imageElement.src = image.urls.regular; // Set the src of the image to the URL from the API
		imageSection.appendChild(imageElement); // Append the image to the image section
	});
	loadingImage.style.display = 'none'; // Hide the loading screen
}
