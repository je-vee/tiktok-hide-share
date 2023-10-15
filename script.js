document.addEventListener("DOMContentLoaded", function() {
	const linkInput = document.getElementById("linkInput");
	const transformButton = document.getElementById("transformButton");

	transformButton.addEventListener("click", function() {
		const inputText = linkInput.value;

		// Make an API request to unshorten.me to expand the shortened link
		//vm.tiktok.com/ZMjLCdn2V
		$.ajax({
			url: `https://unshorten.me/json/${encodeURIComponent(inputText)}`,
			type: 'GET',
			success: function(data) {
				// Check if the response contains a long_url
				data = JSON.parse(data);
				
				if (data.success == true) {
					if (data['resolved_url']) {
						// Get the expanded link
						const expandedLink = data['resolved_url'];

						// Update the input with the resolved link
						linkInput.value = expandedLink.split("?")[0];
					}
				} else {
					// Handle the case where the link cannot be expanded
					alert("Link could not be expanded.");
				}
			}
		});
	});
});