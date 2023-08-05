// 현재 경로 기준으로 User 모듈의 경로를 설정합니다.
const { User } = require("../models/User");


let auth = (req, res, next) => {
    // 인증 처리를 하는곳

    // 클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) {
            // 에러 처리: 적절한 응답을 클라이언트에게 보낸다.
            return res.status(500).json({ isAuth: false, error: true, message: "서버 에러 발생" });
        }
        if (!user) {
            // 유저가 없으면 인증 X
            return res.status(401).json({ isAuth: false, error: true, message: "인증되지 않은 사용자입니다." });
        }

        req.token = token;
        req.user = user;
        next();
    });

    // 유저가 있으면 인증 O
};

module.exports = auth;
