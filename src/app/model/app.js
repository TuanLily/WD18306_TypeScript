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

var flippedCards = [];
var matchedCards = [];
var isFlipping = false;


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
                    <div class="card" onclick="toggleImageSize(this)" isOpen="false">
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
async function toggleImageSize(card) {
    if (isFlipping || card.isOpen || card.parentNode.style.backgroundColor === 'green') return; // Nếu ảnh đang lật, thẻ đã mở ra trước đó hoặc thẻ đã được tô xanh, không làm gì cả

    var img = card.querySelector('.card-img-top');
    img.classList.remove('hidden');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        var firstImgSrc = flippedCards[0].querySelector('.card-img-top').getAttribute('src');
        var secondImgSrc = flippedCards[1].querySelector('.card-img-top').getAttribute('src');

        if (firstImgSrc === secondImgSrc) {
            flippedCards.forEach(function (flippedCard) {
                flippedCard.style.backgroundColor = 'green'; // Đặt màu nền thành màu xanh cho các thẻ đã khớp
                matchedCards.push(flippedCard);
            });

            // Kiểm tra xem tất cả các cặp đã được tìm thấy chưa
            if (matchedCards.length === fruitImagesList.length * 2) {
                setTimeout(function () {
                    // Sử dụng SweetAlert để hiển thị thông báo
                    Swal.fire({
                        title: 'Chúc mừng!',
                        text: 'Bạn đã chiến thắng trò chơi!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        // Kiểm tra xem người dùng đã bấm vào nút "OK" chưa
                        if (result.isConfirmed) {
                            // Tải lại trang
                            location.reload();
                        }
                    });
                }, 500);
            }
        } else {
            isFlipping = true; // Đặt trạng thái đang lật thành true
            await new Promise(resolve => setTimeout(resolve, 500)); // Chờ 0.5 giây
            flippedCards.forEach(async function (flippedCard) {
                var flippedImg = flippedCard.querySelector('.card-img-top');
                flippedImg.style.backgroundColor = 'red'; // Đặt màu nền thành màu đỏ cho các thẻ không khớp
                await new Promise(resolve => setTimeout(resolve, 500)); // Chờ 500ms
                flippedImg.classList.add('hidden'); // Ẩn ảnh đi
                flippedImg.classList.remove('hidden'); // Hiển thị ảnh lại để vòng lặp tiếp theo
                flippedImg.style.backgroundColor = ''; // Đặt lại màu nền
                flippedCard.isOpen = false; // Đặt lại trạng thái của thẻ thành đã đóng
            });
            isFlipping = false; // Đặt trạng thái đang lật thành false
        }
        flippedCards = []; // Đặt lại danh sách các thẻ đã lật cho vòng lặp tiếp theo
    } else {
        card.isOpen = true; // Đặt trạng thái của thẻ thành đã mở
    }
}




// Chạy màn chơi
createCardElements(fruitImagesList);
