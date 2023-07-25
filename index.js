const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const { User } = require('./models/User');
const mongoose = require('mongoose');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://jyj1289:abcd1234@board.abbggdo.mongodb.net/', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.post('/register', (req, res) => {

    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.

    
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success: true
        });
    });

});

app.listen(port, () => console.log(`express listening on port ${port}`));