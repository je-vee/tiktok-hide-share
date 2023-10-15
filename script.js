document.addEventListener("DOMContentLoaded", function() {
    const linkInput = document.getElementById("linkInput");
    const transformButton = document.getElementById("transformButton");
    const resultTextarea = document.getElementById("resultTextarea");
    const resultContainer = document.querySelector(".result-container");
	
	transformButton.addEventListener("click", function() {
		const inputText = linkInput.value;
		
		const linkPattern = 'vm.tiktok.com';
		
		if (inputText != "" && inputText.match(linkPattern)) {
			resultContainer.style.display = "block";
			resultTextarea.value = "Loading the link...";
			
			// Automatically adjust the textarea's height to fit the content
			resultTextarea.style.height = "auto";
			resultTextarea.style.height = (resultTextarea.scrollHeight) + "px";
			
			// Make an API request to unshorten.me to expand the shortened link
			//vm.tiktok.com/ZMjLCdn2V
			$.ajax({
				url: `https://unshorten.me/json/${encodeURIComponent(inputText)}`,
				type: 'GET',
				success: function(data) {
					// Check if the response contains a long_url
					console.log(data)
					data = JSON.parse(data);
					
					if (data.success == true) {
						if (data['resolved_url']) {
							// Get the expanded link
							const expandedLink = data['resolved_url'];
							
							// Resolve the link (use your API logic here)
							const resolvedText = expandedLink.split("?")[0];

							// Display the result container and resolved link
							resultTextarea.value = resolvedText;
						}
					} else {
						// Handle the case where the link cannot be expanded
						alert("Link could not be expanded.");
					}
				}
			});
		} else {
			alert("Invalid link")
		}
	});
});

/*
document.addEventListener("DOMContentLoaded", function() {
    const linkInput = document.getElementById("linkInput");
    const transformButton = document.getElementById("transformButton");
    const resultTextarea = document.getElementById("resultTextarea");
    const resultContainer = document.querySelector(".result-container");

    transformButton.addEventListener("click", function() {
        const inputText = linkInput.value;

        // Replace this API request with your actual logic
        //const resolvedText = "This is the resolved link: " + inputText;
		const resolvedText = "This is the resolved link: " + inputText;

        // Display the result container and resolved link
        resultContainer.style.display = "block";
        resultTextarea.value = resolvedText;

        // Automatically adjust the textarea's height to fit the content
        resultTextarea.style.height = "auto";
        resultTextarea.style.height = (resultTextarea.scrollHeight) + "px";
    });
});
*/