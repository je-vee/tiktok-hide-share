document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById("darkModeToggle");
	const darkModeIcon = document.getElementById("darkModeIcon");
	const gh_logolink = document.getElementById("gh_logolink");
    let isDarkMode = false;
	
	darkModeIcon.classList.toggle("inverted");
	document.documentElement.style.setProperty("--background-color", "var(--background-color-light)");
	document.documentElement.style.setProperty("--primary-color", "var(--primary-color-light)");
	document.documentElement.style.setProperty("--secondary-color", "var(--secondary-color-light)");
	document.documentElement.style.setProperty("--accent-color", "var(--accent-color-light)");
	document.documentElement.style.setProperty("--text-color", "var(--text-color-light)");
	document.documentElement.style.setProperty("--shadow-color", "var(--shadow-color-light)");
			
    darkModeToggle.addEventListener("click", function() {
        isDarkMode = !isDarkMode;
		
		darkModeIcon.classList.toggle("inverted");
		gh_logolink.classList.toggle("inverted");
		
        if (isDarkMode) {
            document.documentElement.style.setProperty("--background-color", "var(--background-color-dark)");
            document.documentElement.style.setProperty("--primary-color", "var(--primary-color-dark)");
            document.documentElement.style.setProperty("--secondary-color", "var(--secondary-color-dark)");
            document.documentElement.style.setProperty("--accent-color", "var(--accent-color-dark)");
            document.documentElement.style.setProperty("--text-color", "var(--text-color-dark)");
			document.documentElement.style.setProperty("--shadow-color", "var(--shadow-color-dark)");
        } else {
            // Reset to light mode colors
            document.documentElement.style.setProperty("--background-color", "var(--background-color-light)");
            document.documentElement.style.setProperty("--primary-color", "var(--primary-color-light)");
            document.documentElement.style.setProperty("--secondary-color", "var(--secondary-color-light)");
            document.documentElement.style.setProperty("--accent-color", "var(--accent-color-light)");
            document.documentElement.style.setProperty("--text-color", "var(--text-color-light)");
			document.documentElement.style.setProperty("--shadow-color", "var(--shadow-color-light)");
        }
    });
	
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
							
							// Select the text in the result text area
							resultTextarea.select();
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