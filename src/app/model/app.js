var fruitImagesList = [
    'cam.png',
    'canhvang.png',
    'chanhxanh.png',
    'dau.png',
    'luu.png',
    'tao.png',
    'duahau.png',
    'dualeo.png',
    'bo.png',
];

// Hàm shuffleArray dùng để xáo trộng hình ảnh ngẫu nhiên
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Nhân đôi vật thể
function duplicateArrayElements(array) {
    return array.flatMap(function (item) { return [item, item]; });
}

function createCardElements(imageUrls) {
    var container = document.getElementById('grid');
    if (container) {
        var duplicatedImages = duplicateArrayElements(imageUrls);
        shuffleArray(duplicatedImages);
        var htmlContent = '';
        duplicatedImages.forEach(function (imageUrl) {
            var cardHtml = `
                <div class="col-md-2">
                    <div class="card" onclick="toggleImageSize(this)">
                        <img src="../../../assets/images/${imageUrl}" alt="Fruit" width="120" height="120" class="card-img-top hidden">
                    </div>
                </div>
            `;
            htmlContent += cardHtml;
        });
        container.innerHTML = htmlContent;
    }
}

// Function to toggle image visibility
function toggleImageSize(card) {
    var img = card.querySelector('.card-img-top');
    if (img.classList.contains('hidden')) {
        img.classList.remove('hidden');
        setTimeout(function () {
            img.style.opacity = '1'; // thay đổi opacity của ảnh thành 1 sau 10ms để kích hoạt transition
        }, 10);
    } else {
        img.style.opacity = '0'; // thay đổi opacity của ảnh thành 0 để ẩn đi
        setTimeout(function () {
            img.classList.add('hidden'); // sau khi opacity của ảnh thành 0, thêm lớp hidden để ẩn ảnh
        }, 10); // thời gian delay 0.5s để chờ transition kết thúc
    }
}




createCardElements(fruitImagesList);
