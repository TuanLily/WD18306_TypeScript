var fruitImagesList = [
    'cam.png',
    'canhvang.png',
    'chanhxanh.png',
    'dau.png',
    'luu.png',
    'tao.png',
];

// Shuffle function to randomize array elements
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Duplicate array elements
function duplicateArrayElements(array) {
    return array.flatMap(function (item) { return [item, item]; });
}

function createCardElements(imageUrls) {
    var container = document.getElementById('grid');
    if (container) {
        // Duplicate image array
        var duplicatedImages = duplicateArrayElements(imageUrls);
        console.log(duplicatedImages);
        // Shuffle images randomly
        shuffleArray(duplicatedImages);
        // Create a string to hold the HTML content
        var htmlContent = '';
        // Loop through duplicated and shuffled images to create cards
        duplicatedImages.forEach(function (imageUrl) {
            // Create HTML string for each image
            var cardHtml = `
                <div class="col-md-2">
                    <div class="card">
                        <img src="../../../assets/images/${imageUrl}" alt="Fruit" width="120" height="120" class="card-img-top">
                    </div>
                </div>
            `;
            // Append card HTML to the main HTML content
            htmlContent += cardHtml;
        });
        // Add the HTML content to the container
        container.innerHTML = htmlContent;
    }
}

// Call the function with the image array
createCardElements(fruitImagesList);
