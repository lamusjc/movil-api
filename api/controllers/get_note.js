'use strict';

module.exports = function (req, res) {
    var response = {};
    var sess = req.session;
    var bydate = req.query.bydate;

    if (sess.users_id == undefined) {
        response = {
            message: "Session doesn't exists",
            status: 401,

        };
        res.status(response.status);
        return res.json(response);
    }
    if (bydate) {
        var query = "SELECT *FROM note WHERE users_id = ? ORDER BY note_date_created ASC;";
    } else {
        var query = "SELECT *FROM note WHERE users_id = ? ORDER BY note_position ASC;";
    }

    connection.query(query, [sess.users_id], function (error, result, fields) {
        if (error) {
            response = {
                status: 500,
                message: 'Internal Server Error'
            }

            res.status(response.status);
            return res.json(response);
        } else {
            response = {
                status: 200,
                message: 'Success',
                data: result
            }

            res.status(response.status);
            return res.json(response);

        }
    });
}