'use strict';

module.exports = function (req, res) {
    var response = {};
    var sess = req.session;
    var username = req.body.username;
    var password = req.body.password;

    var query = "SELECT *FROM users WHERE users_username = ? AND users_password = ?";

    connection.query(query, [username, password], function (error, result, fields) {
        if (error) {
            response = {
                status: 500,
                message: 'Internal Server Error'
            }
            res.status(response.status);
            return res.json(response);
        } else {
            if (result.length > 0) {
                response = {
                    status: 200,
                    message: 'Success'
                }
                sess.username = req.body.username;
                sess.users_id = result[0].users_id;

                res.status(response.status);
                return res.json(response);
            } else {
                response = {
                    status: 403,
                    message: 'Incorrect data'
                }
                res.status(response.status);
                return res.json(response);
            }
        }
    });


    console.log("Metodo POST-LOGIN realizado.");
}