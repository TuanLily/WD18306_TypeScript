"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const Swal = require("sweetalert2");
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Lấy các phần tử cần thiết
    const gameNameInput = document.getElementById('gameName');
    const errorMessage = document.querySelector('.errorMessage');
    if (gameNameInput && errorMessage) {
        const inputValue = gameNameInput.value.trim();
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!inputValue) {
            errorMessage.innerHTML = '<span class="text-danger">Tên người chơi không được để trống</span>';
        }
        else if (inputValue.length < 2) {
            errorMessage.innerHTML = '<span class="text-danger">Tên người chơi không được dưới 2 ký tự</span>';
        }
        else if (specialCharsRegex.test(inputValue)) {
            errorMessage.innerHTML = '<span class="text-danger">Tên người chơi không được chứa ký tự đặc biệt</span>';
        }
        else {
            Swal.default.fire({
                title: 'Đăng nhập thành công',
                text: 'Đang được chuyển đến trang chơi game...',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.replace("/main-game");
            });
        }
    }
});
