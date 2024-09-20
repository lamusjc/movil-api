'use strict';

module.exports = function (req, res) {
    var response = {};
    var sess = req.session;
    var note_id = req.body.note_id;
    var note_title = req.body.note_title;
    var note_description = req.body.note_description;
    var note_favorite = req.body.note_favorite;
    var note_file = req.body.note_file;
    var note_position = req.body.note_position;

    if (sess.users_id == undefined) {
        response = {
            message: "Session doesn't exists",
            status: 401,

        };
        res.status(response.status);
        return res.json(response);
    }
    var query = "UPDATE note SET note_title = ?, note_description = ?, note_favorite = ?, note_position = ?, note_file = ? WHERE note_id = ? AND users_id = ?";


    connection.query(query, [note_title, note_description, note_favorite, note_position, note_file, note_id, sess.users_id], function (error, result, field) {
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
                message: 'Note modified!'
            }
            res.status(response.status);
            return res.json(response);
        }
    });

}