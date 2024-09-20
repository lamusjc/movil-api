'use strict';

module.exports = function (req, res) {
    var response = {};
    var sess = req.session;
    var note_id = req.params.note_id;

    if (sess.users_id == undefined) {
        response = {
            message: "Session doesn't exists",
            status: 401,

        };
        res.status(response.status);
        return res.json(response);
    }
    var query = "DELETE FROM note WHERE note_id = ? AND users_id = ?";

    connection.query(query, [note_id, sess.users_id], function (error, result, field) {
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
                message: 'Note deleted!'
            }
            res.status(response.status);
            return res.json(response);
        }
    });

}