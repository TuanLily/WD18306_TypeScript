var loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Lấy các phần tử cần thiết
    var gameNameInput = document.getElementById('gameName');
    var errorMessage = document.querySelector('.errorMessage');
    if (gameNameInput && errorMessage) {
        var inputValue = gameNameInput.value.trim();
        var specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const fruitGameKeyword = "Fruit Game";

        if (!inputValue) {
            errorMessage.innerHTML = '<span class="text-danger">Tên game không được để trống</span>';
        }
        else if (inputValue.length < 2) {
            errorMessage.innerHTML = '<span class="text-danger">Tên game không được dưới 2 ký tự</span>';
        }
        else if (specialCharsRegex.test(inputValue)) {
            errorMessage.innerHTML = '<span class="text-danger">Tên game không được chứa ký tự đặc biệt</span>';
        }
        else if (inputValue.toLowerCase().trim().startsWith(fruitGameKeyword.toLowerCase())) {
            Swal.fire({
                title: 'Success!',
                text: 'Redirecting to Fruit Game...',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.replace("../../module/main/mainGame.html");
            });
        }

        else {
            errorMessage.innerHTML = '<span class="text-danger">Tên game không hợp lệ</span>';
        }
    }
});


