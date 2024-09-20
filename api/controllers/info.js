'use strict';

module.exports = function (req, res) {
    var response = {};
    var sess = req.session;

    if (sess.users_id == undefined) {
        response = {
            message: "Session doesn't exists",
            status: 401,

        };
        res.status(response.status);
        return res.json(response);
    }else{
        response = {
            data: {
                users_id: sess.users_id,
                username: sess.username,
            },
            message: "Success!",
            status: 200,

        };
        res.status(response.status);
        return res.json(response);
    }

}