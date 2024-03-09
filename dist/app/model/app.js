"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sweetalert2_1 = require("sweetalert2");
const fruitImagesList = [
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
let flippedCards = [];
const matchedCards = [];
let isFlipping = false;
// Hàm shuffleArray dùng để xáo trộng hình ảnh ngẫu nhiên
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
// Nhân đôi vật thể
function duplicateArrayElements(array) {
    return array.flatMap((item) => [item, item]);
}
function createCardElements(imageUrls) {
    const container = document.getElementById('grid');
    if (container) {
        const duplicatedImages = duplicateArrayElements(imageUrls);
        shuffleArray(duplicatedImages);
        let htmlContent = '';
        duplicatedImages.forEach((imageUrl) => {
            const cardHtml = `
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
function toggleImageSize(card) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
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
                    const flippedImg = flippedCard.querySelector('.card-img-top');
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
                        sweetalert2_1.default.fire({
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
                yield new Promise(resolve => setTimeout(resolve, 500)); // Chờ 0.5 giây
                flippedCards.forEach((flippedCard) => __awaiter(this, void 0, void 0, function* () {
                    const flippedImg = flippedCard.querySelector('.card-img-top');
                    if (flippedImg) {
                        flippedImg.style.backgroundColor = 'red'; // Đặt màu nền thành màu đỏ cho các thẻ không khớp
                        flippedImg.style.opacity = '0'; // Ẩn ảnh đi
                    }
                    // Đặt lại trạng thái của thẻ thành đã đóng
                    flippedCard.setAttribute('isOpen', 'false');
                }));
                isFlipping = false;
            }
            flippedCards = [];
        }
        else {
            card.setAttribute('isOpen', 'true');
        }
    });
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
const resetButton = document.querySelector('.restart');
// Gắn sự kiện click cho nút "Reset Game"
if (resetButton) {
    resetButton.addEventListener('click', () => {
        sweetalert2_1.default.fire({
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
                location.reload();
            }
        });
    });
}
