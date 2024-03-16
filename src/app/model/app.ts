import Swal from "sweetalert2";

const fruitImagesList: string[] = [
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

const flippedCards: HTMLElement[] = [];
const matchedCards: HTMLElement[] = [];
let isFlipping = false;
let gameStarted = false; // Biến để theo dõi trạng thái của trò chơi

// Hàm shuffleArray dùng để xáo trộng một mảng ngẫu nhiên
function shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        const temp: any = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Hàm duplicateArrayElements dùng để nhân đôi các phần tử trong mảng
function duplicateArrayElements(array: any[]): any[] {
    return array.flatMap((item) => [item, item]);
}

// Hàm createCardElements dùng để tạo các thẻ card từ một mảng các URL hình ảnh
function createCardElements(imageUrls: string[]): void {
    const container: HTMLElement | null = document.getElementById('grid');
    if (container) {
        const duplicatedImages: string[] = duplicateArrayElements(imageUrls);
        // Xáo trộn các URL hình ảnh
        shuffleArray(duplicatedImages);
        let htmlContent: string = '';
        duplicatedImages.forEach((imageUrl) => {
            const cardHtml: string = `
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
let score: number = 0;

async function toggleImageSize(card: HTMLElement): Promise<void> {
    if (!gameStarted) return;
    if (isFlipping || card.getAttribute('isOpen') === 'true' || card.style.backgroundColor === 'green') return;

    const img: HTMLImageElement | null = card.querySelector('.card-img-top');
    if (img) {
        img.style.opacity = '1'; // Hiển thị ảnh trong card
    }

    card.classList.toggle('clicked');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        const firstImgSrc: string | any = flippedCards[0].querySelector('.card-img-top')?.getAttribute('src');
        const secondImgSrc: string | any = flippedCards[1].querySelector('.card-img-top')?.getAttribute('src');

        if (firstImgSrc === secondImgSrc) {
            flippedCards.forEach((flippedCard) => {
                const cardImg: HTMLImageElement | null = flippedCard.querySelector('.card-img-top');
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
            flippedCards.forEach(async (flippedCard) => {
                const flippedImg: HTMLImageElement | null = flippedCard.querySelector('.card-img-top');
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
    } else {
        card.setAttribute('isOpen', 'true');
    }
}

// Hàm cập nhật điểm số và hiển thị lên nút "Score"
function updateScore(): void {
    const scoreButton: HTMLElement | null = document.querySelector('.score');
    if (scoreButton) {
        scoreButton.textContent = `Score: ${score}`;
    }
}

// Chạy màn chơi
createCardElements(fruitImagesList);

let countdownInterval: NodeJS.Timeout; // Biến để lưu trạng thái của countdown

// Bắt đầu countdown
function startCountdown(): void {
    const hoursSpan: HTMLElement | null = document.querySelector('.hours');
    const minutesSpan: HTMLElement | null = document.querySelector('.minutes');
    const secondsSpan: HTMLElement | null = document.querySelector('.seconds');

    // Đặt thời gian bắt đầu là 2 phút (120 giây)
    let totalTimeInSeconds: number = 120;

    // Cập nhật giá trị của countdown mỗi giây
    countdownInterval = setInterval(() => {
        // Tính toán giờ, phút và giây
        const hours: number = Math.floor(totalTimeInSeconds / 3600);
        const minutes: number = Math.floor((totalTimeInSeconds % 3600) / 60);
        const seconds: number = totalTimeInSeconds % 60;

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

const startGame: HTMLElement | null = document.querySelector('.start');
if (startGame) {
    startGame.addEventListener('click', () => {
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
}

const resetButton: HTMLElement | null = document.querySelector('.restart');
if (resetButton) {
    resetButton.addEventListener('click', () => {
        gameStarted = false;

        // Hủy bỏ countdown nếu đang chạy
        clearInterval(countdownInterval);

        // Đặt thời gian quay trở lại 0
        const hoursSpan: HTMLElement | null = document.querySelector('.hours');
        const minutesSpan: HTMLElement | null = document.querySelector('.minutes');
        const secondsSpan: HTMLElement | null = document.querySelector('.seconds');
        if (hoursSpan && minutesSpan && secondsSpan) {
            hoursSpan.textContent = '00';
            minutesSpan.textContent = '00';
            secondsSpan.textContent = '00';
        }

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
                const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card');

                const clickHandler = (event: Event) => {
                    toggleImageSize(event.currentTarget as HTMLElement);
                };
                
                cards.forEach((card) => {
                    card.removeEventListener('click', clickHandler);
                });
                ;

                // Xóa bỏ sự kiện click cho nút "Reset Game"
                if (resetButton) {
                    resetButton.removeEventListener('click', () => {});
                }

                score = 0;
                updateScore();
                // Xáo trộn lại vị trí các thẻ ngẫu nhiên
                const container: HTMLElement | null = document.getElementById('grid');
                if (container) {
                    container.innerHTML = ''; // Xóa nội dung container
                    createCardElements(fruitImagesList); // Tạo lại các thẻ card
                }
            }
        });
    });
}

const exitButton: HTMLElement | null = document.querySelector('.exit');
if (exitButton) {
    exitButton.addEventListener('click', () => {

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
}

