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


// Biến để lưu điểm số
let score = 0;

async function toggleImageSize(card) {
    if (isFlipping || card.isOpen || card.style.backgroundColor === 'green') return;

    var img = card.querySelector('.card-img-top');
    img.style.opacity = '1'; // Hiển thị ảnh trong card

    card.classList.toggle('clicked');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        var firstImgSrc = flippedCards[0].querySelector('.card-img-top').getAttribute('src');
        var secondImgSrc = flippedCards[1].querySelector('.card-img-top').getAttribute('src');

        if (firstImgSrc === secondImgSrc) {
            flippedCards.forEach(function (flippedCard) {
                flippedCard.querySelector('.card-img-top').style.backgroundColor = 'green';
                matchedCards.push(flippedCard);
                // Bổ sung: Ngăn chặn sự kiện click cho các thẻ đã được tô màu xanh
                flippedCard.classList.add('matched');
            });

            // Tăng điểm số lên 5 khi tìm được cặp thẻ giống nhau và tô màu xanh
            score += 5;
            // Cập nhật điểm số
            updateScore();

            if (matchedCards.length === fruitImagesList.length * 2) {
                setTimeout(function () {
                    Swal.fire({
                        title: 'Chúc mừng!',
                        text: 'Bạn đã chiến thắng trò chơi!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
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
                flippedImg.style.opacity = '0'; // Ẩn ảnh đi
                flippedImg.style.backgroundColor = ''; // Đặt lại màu nền
                flippedCard.isOpen = false; // Đặt lại trạng thái của thẻ thành đã đóng
            });
            isFlipping = false;
        }
        flippedCards = [];
    } else {
        card.isOpen = true;
    }
}

// Hàm cập nhật điểm số và hiển thị lên nút "Score"
function updateScore() {
    let scoreButton = document.querySelector('.score');
    scoreButton.textContent = `Score: ${score}`;
}


// Chạy màn chơi
createCardElements(fruitImagesList);



// Lấy thẻ nút "Reset Game"
var resetButton = document.querySelector('.restart');

// Gắn sự kiện click cho nút "Reset Game"
// Gắn sự kiện click cho nút "Reset Game"
resetButton.addEventListener('click', function () {
    // Hiển thị cửa sổ thông báo xác nhận chơi lại
    Swal.fire({
        title: 'Bạn có chắc chắn muốn chơi lại?',
        text: 'Mọi tiến trình hiện tại sẽ bị mất!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Chơi lại',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.isConfirmed) {
            // Xóa bỏ sự kiện click cho các thẻ card
            var cards = document.querySelectorAll('.card');
            cards.forEach(function (card) {
                card.removeEventListener('click', toggleImageSize);
            });

            // Xóa bỏ sự kiện click cho nút "Reset Game"
            resetButton.removeEventListener('click', this);

            // Xóa bỏ các sự kiện khác nếu cần

            // Xáo trộn lại vị trí các thẻ ngẫu nhiên
            var container = document.getElementById('grid');
            if (container) {
                container.innerHTML = ''; // Xóa nội dung container
                createCardElements(fruitImagesList); // Tạo lại các thẻ card
            }
        }
    });
});


const startGame = document.querySelector('.start');

startGame.addEventListener('click', function () {
    // Lấy các thẻ span chứa giờ, phút, giây
    const hoursSpan = document.querySelector('.hours');
    const minutesSpan = document.querySelector('.minutes');
    const secondsSpan = document.querySelector('.seconds');

    // Đặt thời gian bắt đầu là 2 phút (120 giây)
    let totalTimeInSeconds = 10;

    // Cập nhật giá trị của countdown mỗi giây
    const countdown = setInterval(() => {
        // Tính toán giờ, phút và giây
        const hours = Math.floor(totalTimeInSeconds / 3600);
        const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
        const seconds = totalTimeInSeconds % 60;

        // Hiển thị giá trị đã tính toán trong các thẻ span
        hoursSpan.textContent = hours < 10 ? '0' + hours : hours;
        minutesSpan.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsSpan.textContent = seconds < 10 ? '0' + seconds : seconds;

        // Giảm thời gian còn lại đi 1 giây
        totalTimeInSeconds--;

        // Khi đến 0, dừng countdown
        if (totalTimeInSeconds < 0) {
            clearInterval(countdown);
            // Thực hiện các hành động khi countdown kết thúc ở đây
            alert('Countdown đã kết thúc!');
        }
    }, 1000); // Cập nhật mỗi 1 giây

});
