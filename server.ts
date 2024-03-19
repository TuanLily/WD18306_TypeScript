const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Sử dụng body-parser trong ứng dụng Express
app.use(bodyParser.json()); // Xử lý dữ liệu JSON từ yêu cầu HTTP
app.use(bodyParser.urlencoded({ extended: false })); // Xử lý dữ liệu từ form HTML

app.use(express.static(path.join(__dirname, "../src")));
app.use(express.static(path.join(__dirname, "../dist")));


app.set("views", path.join(__dirname, "../src", "app", "views"));
app.set("view engine", "ejs");

app.get('/', (req :any, res:any) => {
    res.render('login/login.component.ejs');
})
app.get('/login', (req :any, res:any) => {
    res.render('login/login.component.ejs');
})
app.get('/main-game', (req :any, res:any) => {
    res.render('main/mainGame.ejs');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port 127.0.0.1:${PORT}`);
});
