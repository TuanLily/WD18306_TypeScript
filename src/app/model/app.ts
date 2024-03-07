
const fruitImagesList: string[] = [
    '../../assets/images/cam.png',
    '../../assets/images/canhvang.png',
    '../../assets/images/chanhxanh.png',
    '../../assets/images/dau.png',
    '../../assets/images/luu.png',
    '../../assets/images/tao.png',
];

// Shuffle function to randomize array elements
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Duplicate array elements
function duplicateArrayElements(array: any[]) {
    return array.flatMap(item => [item, item]);
}

function createCardElements(imageUrls: string[]) {
    const container = document.getElementById('grid');
    if (container) {
        // Duplicate image array
        const duplicatedImages = duplicateArrayElements(imageUrls);

        // Shuffle images randomly
        shuffleArray(duplicatedImages);

        // Create a string to hold the HTML content
        let htmlContent = '';

        // Loop through duplicated and shuffled images to create cards
        duplicatedImages.forEach(imageUrl => {
            // Create HTML string for each image
            const cardHtml = `
                <div class="col-md-auto">
                    <div class="card">
                        <img src="${imageUrl}" alt="Fruit" width="120" height="120" class="card-img-top">
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
