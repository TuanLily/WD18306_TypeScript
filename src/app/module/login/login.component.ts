var loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var gameNameInput = document.getElementById('gameName') as HTMLInputElement;
        var errorMessage = document.getElementById('errorMessage');

        if (gameNameInput && errorMessage) {
            const inputValue = gameNameInput.value.trim(); // Xóa các khoảng trắng ở đầu và cuối chuỗi
            const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/; // Biểu thức chính quy để kiểm tra ký tự đặc biệt

            if (!inputValue) {
                errorMessage.innerHTML = 'Please enter the game name';
            } else if (inputValue.length < 2) {
                errorMessage.innerHTML = 'Game name must be at least 2 characters long';
            } else if (specialCharsRegex.test(inputValue)) {
                errorMessage.innerHTML = 'Game name cannot contain special characters';
            } else {
                errorMessage.innerHTML = ''; // Clear error message if input is valid
            }
        }
    });
}
