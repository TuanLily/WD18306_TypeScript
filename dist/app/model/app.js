"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fruitImagesList = [
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
const flippedCards = [];
const matchedCards = [];
let isFlipping = false;
let gameStarted = false; // Biến để theo dõi trạng thái của trò chơi
// Hàm shuffleArray dùng để xáo trộng một mảng ngẫu nhiên
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
// Hàm duplicateArrayElements dùng để nhân đôi các phần tử trong mảng
function duplicateArrayElements(array) {
    return array.flatMap((item) => [item, item]);
}
// Hàm createCardElements dùng để tạo các thẻ card từ một mảng các URL hình ảnh
function createCardElements(imageUrls) {
    const container = document.getElementById('grid');
    if (container) {
        const duplicatedImages = duplicateArrayElements(imageUrls);
        // Xáo trộn các URL hình ảnh
        shuffleArray(duplicatedImages);
        let htmlContent = '';
        duplicatedImages.forEach((imageUrl) => {
            const cardHtml = `
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
    var _a, _b;
    if (!gameStarted)
        return;
    if (isFlipping || card.getAttribute('isOpen') === 'true' || card.style.backgroundColor === 'green')
        return;
    const img = card.querySelector('.card-img-top');
    if (img) {
        img.style.opacity = '1'; // Hiển thị ảnh trong card
    }
    card.classList.toggle('clicked');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
        const firstImgSrc = (_a = flippedCards[0].querySelector('.card-img-top')) === null || _a === void 0 ? void 0 : _a.getAttribute('src');
        const secondImgSrc = (_b = flippedCards[1].querySelector('.card-img-top')) === null || _b === void 0 ? void 0 : _b.getAttribute('src');
        if (firstImgSrc === secondImgSrc) {
            flippedCards.forEach((flippedCard) => {
                const cardImg = flippedCard.querySelector('.card-img-top');
                if (cardImg) {
                    cardImg.style.backgroundColor = 'green';
                }
                matchedCards.push(flippedCard);
                // Bổ sung: Ngăn chặn sự kiện click cho các thẻ đã được tô màu xanh
                flippedCard.classList.add('matched');
            });
            // Tăng điểm số lên 5 khi tìm được cặp thẻ giống nhau và tô màu xanh
            score += 5;
            // Cập nhật điểm số
            updateScore();
            if (matchedCards.length === fruitImagesList.length * 2) {
                clearInterval(countdownInterval); // Dừng countdown
                setTimeout(() => {
                    Swal.default.fire({
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
        }
        else {
            isFlipping = true; // Đặt trạng thái đang lật thành true
            await new Promise(resolve => setTimeout(resolve, 500)); // Chờ 0.5 giây
            flippedCards.forEach(async (flippedCard) => {
                const flippedImg = flippedCard.querySelector('.card-img-top');
                if (flippedImg) {
                    flippedImg.style.backgroundColor = 'red'; // Đặt màu nền thành màu đỏ cho các thẻ không khớp
                }
                await new Promise(resolve => setTimeout(resolve, 500)); // Chờ 500ms
                if (flippedImg) {
                    flippedImg.style.opacity = '0'; // Ẩn ảnh đi
                    flippedImg.style.backgroundColor = ''; // Đặt lại màu nền
                }
                flippedCard.setAttribute('isOpen', 'false'); // Đặt lại trạng thái của thẻ thành đã đóng
            });
            isFlipping = false;
        }
        flippedCards.length = 0;
    }
    else {
        card.setAttribute('isOpen', 'true');
    }
}
// Hàm cập nhật điểm số và hiển thị lên nút "Score"
function updateScore() {
    const scoreButton = document.querySelector('.score');
    if (scoreButton) {
        scoreButton.textContent = `Score: ${score}`;
    }
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
        if (hoursSpan && minutesSpan && secondsSpan) {
            hoursSpan.textContent = hours < 10 ? '0' + hours : String(hours);
            minutesSpan.textContent = minutes < 10 ? '0' + minutes : String(minutes);
            secondsSpan.textContent = seconds < 10 ? '0' + seconds : String(seconds);
        }
        // Giảm thời gian còn lại đi 1 giây
        totalTimeInSeconds--;
        // Khi đến 0, dừng countdown và hiển thị thông báo
        if (totalTimeInSeconds < 0) {
            clearInterval(countdownInterval);
            // Thực hiện các hành động khi countdown kết thúc ở đây
            Swal.default.fire({
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
                }
                else {
                    // Thoát game
                    alert('Cảm ơn bạn đã tham gia!');
                }
            });
        }
    }, 1000);
}
const startGame = document.querySelector('.start');
if (startGame) {
    startGame.addEventListener('click', () => {
        // Hiển thị thông báo trò chơi sẽ bắt đầu sau 3 giây
        Swal.default.fire({
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
}
const resetButton = document.querySelector('.restart');
if (resetButton) {
    resetButton.addEventListener('click', () => {
        gameStarted = false;
        // Hủy bỏ countdown nếu đang chạy
        clearInterval(countdownInterval);
        // Đặt thời gian quay trở lại 0
        const hoursSpan = document.querySelector('.hours');
        const minutesSpan = document.querySelector('.minutes');
        const secondsSpan = document.querySelector('.seconds');
        if (hoursSpan && minutesSpan && secondsSpan) {
            hoursSpan.textContent = '00';
            minutesSpan.textContent = '00';
            secondsSpan.textContent = '00';
        }
        // Hiển thị cửa sổ thông báo xác nhận chơi lại
        Swal.default.fire({
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
                const clickHandler = (event) => {
                    toggleImageSize(event.currentTarget);
                };
                cards.forEach((card) => {
                    card.removeEventListener('click', clickHandler);
                });
                ;
                // Xóa bỏ sự kiện click cho nút "Reset Game"
                if (resetButton) {
                    resetButton.removeEventListener('click', () => { });
                }
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
}
const exitButton = document.querySelector('.exit');
if (exitButton) {
    exitButton.addEventListener('click', () => {
        // Hiển thị cửa sổ thông báo xác nhận thoát trò chơi
        Swal.default.fire({
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
}
