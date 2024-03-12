const Swal = require('sweetalert2');
const fruitImagesList: string[] = [
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

let flippedCards: HTMLElement[] = [];
const matchedCards: HTMLElement[] = [];
let isFlipping: boolean = false;

// Hàm shuffleArray dùng để xáo trộng hình ảnh ngẫu nhiên
function shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        const temp: T = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Nhân đôi vật thể
function duplicateArrayElements<T>(array: T[]): T[] {
    return array.flatMap((item) => [item, item]);
}

function createCardElements(imageUrls: string[]): void {
    const container: HTMLElement | null = document.getElementById('grid');
    if (container) {
        const duplicatedImages: string[] = duplicateArrayElements(imageUrls);
        shuffleArray(duplicatedImages);
        let htmlContent: string = '';
        duplicatedImages.forEach((imageUrl) => {
            const cardHtml: string = `
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
let score: number = 0;

async function toggleImageSize(card: HTMLElement): Promise<void> {
    if (isFlipping || card.getAttribute('isOpen') === 'true' || card.style.backgroundColor === 'green') return;

    const img: HTMLElement | null = card.querySelector('.card-img-top');
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
                const flippedImg: HTMLElement | null = flippedCard.querySelector('.card-img-top');
                if (flippedImg) {
                    flippedImg.style.backgroundColor = 'green';
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
                setTimeout(() => {
                    Swal.fire({
                        title: 'Chúc mừng!',
                        text: 'Bạn đã chiến thắng trò chơi!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result:any) => {
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
                const flippedImg: HTMLElement | null = flippedCard.querySelector('.card-img-top');
                if (flippedImg) {
                    flippedImg.style.backgroundColor = 'red'; // Đặt màu nền thành màu đỏ cho các thẻ không khớp
                    flippedImg.style.opacity = '0'; // Ẩn ảnh đi
                }
                // Đặt lại trạng thái của thẻ thành đã đóng
                flippedCard.setAttribute('isOpen', 'false');
            });
            isFlipping = false;
        }
        flippedCards = [];
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

const resetButton: HTMLElement | null = document.querySelector('.restart');

// Gắn sự kiện click cho nút "Reset Game"
if (resetButton) {
    resetButton.addEventListener('click', () => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn chơi lại?',
            text: 'Mọi tiến trình hiện tại sẽ bị mất!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Chơi lại',
            cancelButtonText: 'Hủy'
        }).then((result:any) => {
            if (result.isConfirmed) {
                location.reload();
            }
        });
    });
}
