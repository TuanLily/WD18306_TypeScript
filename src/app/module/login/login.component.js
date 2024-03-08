var loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Lấy các phần tử cần thiết
    var gameNameInput = document.getElementById('gameName');
    var errorMessage = document.querySelector('.errorMessage');
    if (gameNameInput && errorMessage) {
        var inputValue = gameNameInput.value.trim();
        var specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;

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
    }
});


