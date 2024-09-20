'use strict';

module.exports = function (req, res) {
    var response = {};
    var sess = req.session;
    var note_title = req.body.note_title;
    var note_description = req.body.note_description;
    var note_favorite = req.body.note_favorite;
    var note_file = req.body.note_file;

    if (sess.users_id == undefined) {
        response = {
            message: "Session doesn't exists",
            status: 401,

        };
        res.status(response.status);
        return res.json(response);
    }
    var query = "INSERT INTO note(users_id, note_title, note_description, note_favorite, note_position, note_date_created, note_file) VALUES (?,?,?,?,?,?,?)";
    var query2 = "SELECT now()";
    var query3 = "SELECT *FROM note WHERE users_id = ?";

    connection.query(query3, [sess.users_id], function (error3, result3, field3) {
        if (error3) {
            response = {
                status: 500,
                message: 'Internal Server Error'
            }

            res.status(response.status);
            return res.json(response);
        } else {
            connection.query(query2, [], function (error2, result2, field2) {
                if (error2) {
                    response = {
                        status: 500,
                        message: 'Internal Server Error'
                    }

                    res.status(response.status);
                    return res.json(response);
                } else {
                    connection.query(query, [sess.users_id, note_title, note_description, note_favorite, result3.length, result2[0]['now()'], note_file], function (error, result, fields) {
                        if (error) {
                            response = {
                                status: 500,
                                message: 'Unknown Error'
                            }
                            res.status(response.status);
                            return res.json(response);
                        } else {
                           
                            response = {
                                status: 200,
                                message: 'Note created!'
                            }
                            res.status(response.status);
                            return res.json(response);
                        }
                    });
                }
            });
        }
    });

}