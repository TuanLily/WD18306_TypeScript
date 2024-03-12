var fruitImagesList = [
    'cam.png',
    'chanhvang.png',
    'chanhxanh.png',
    'dau.png',
    'dao.png',
    'tao.png',
    'duahau.png',
    'khom.png',
    'nho.png',
    'cachua.png',
    'cherry.png',
    'chuoi.png',
];

var flippedCards = [];
var matchedCards = [];
var isFlipping = false;
let gameStarted = false; // Biến để theo dõi trạng thái của trò chơi



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
                <div class="col-md-1_5">
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

    if (!gameStarted) return;
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


let countdownInterval; // Biến để lưu trạng thái của countdown

// Bắt đầu countdown
function startCountdown() {
    const hoursSpan = document.querySelector('.hours');
    const minutesSpan = document.querySelector('.minutes');
    const secondsSpan = document.querySelector('.seconds');

    // Đặt thời gian bắt đầu là 2 phút (120 giây)
    let totalTimeInSeconds = 120;

    // Cập nhật giá trị của countdown mỗi giây
    countdownInterval = setInterval(() => {
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

        // Khi đến 0, dừng countdown và hiển thị thông báo
        if (totalTimeInSeconds < 0) {
            clearInterval(countdownInterval);
            // Thực hiện các hành động khi countdown kết thúc ở đây
            Swal.fire({
                title: "Hết thời gian!",
                text: "Bạn muốn chơi lại?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Chơi lại",
                cancelButtonText: "Thoát",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    // Thêm mã xử lý cho việc chơi lại ở đây
                    location.reload();
                } else {
                    // Thoát game
                    alert('Cảm ơn bạn đã tham gia!');
                }
            });
        }
    }, 1000);
}

const startGame = document.querySelector('.start');
startGame.addEventListener('click', function () {
    // Hiển thị thông báo trò chơi sẽ bắt đầu sau 3 giây
    Swal.fire({
        title: "Trò chơi sẽ bắt đầu sau 3 giây!",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
    }).then(() => {
        // Bắt đầu countdown sau khi thông báo kết thúc
        startCountdown();
        // Đặt trạng thái của trò chơi thành true
        gameStarted = true;
    });
});

const resetButton = document.querySelector('.restart');
resetButton.addEventListener('click', function () {
    gameStarted = false;

    // Hủy bỏ countdown nếu đang chạy
    clearInterval(countdownInterval);

    // Đặt thời gian quay trở lại 0
    let hoursSpan = document.querySelector('.hours');
    let minutesSpan = document.querySelector('.minutes');
    let secondsSpan = document.querySelector('.seconds');
    hoursSpan.textContent = '00';
    minutesSpan.textContent = '00';
    secondsSpan.textContent = '00';

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
            const cards = document.querySelectorAll('.card');
            cards.forEach((card) => {
                card.removeEventListener('click', toggleImageSize);
            });

            // Xóa bỏ sự kiện click cho nút "Reset Game"
            resetButton.removeEventListener('click', this);

            score = 0;
            updateScore();
            // Xáo trộn lại vị trí các thẻ ngẫu nhiên
            const container = document.getElementById('grid');
            if (container) {
                container.innerHTML = ''; // Xóa nội dung container
                createCardElements(fruitImagesList); // Tạo lại các thẻ card
            }
        }
    });
});


const exitButton = document.querySelector('.exit');

exitButton.addEventListener('click', function () {

    // Hiển thị cửa sổ thông báo xác nhận thoát trò chơi
    Swal.fire({
        title: 'Bạn có chắc muốn thoát trò chơi?',
        text: 'Mọi tiến trình hiện tại sẽ bị mất!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Thoát ',
        cancelButtonText: 'Ở lại'
    }).then((result) => {
        if (result.isConfirmed) {
            // Chuyển đến trang đăng nhập hoặc trang chính của trò chơi
            // Đặt đường dẫn đích ở đây
            window.location.href = "http://127.0.0.1:5501/src/app/module/login/login.component.html";
        }
    });
});
