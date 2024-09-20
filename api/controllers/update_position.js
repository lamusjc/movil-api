'use strict';

module.exports = function (req, res) {
    var response = {};
    var sess = req.session;
    var arr = req.body.arr;

    if (sess.users_id == undefined) {
        response = {
            message: "Session doesn't exists",
            status: 401,

        };
        res.status(response.status);
        return res.json(response);
    }

    arr.forEach((element, index) => {
        var query = "UPDATE note SET note_position = ? WHERE note_id = ? AND users_id = ?";

        connection.query(query, [element.note_position, element.note_id, element.users_id], function (error, result, field) {
            if (error) {
                if (arr.length - 1 == index) {
                    response = {
                        status: 500,
                        message: 'Internal Server Error'
                    }

                    res.status(response.status);
                    return res.json(response);
                }
            } else {
                if (arr.length - 1 == index) {
                    response = {
                        status: 200,
                        message: 'Note position modified!'
                    }
                    res.status(response.status);
                    return res.json(response);
                }
            }
        });
    });




}