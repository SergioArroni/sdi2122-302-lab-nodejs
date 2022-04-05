const {ObjectId} = require("mongodb");
module.exports = function (app, commentsRepository) {
    app.post('/comments/:song_id', function (req, res) {
        let comment = {
            author: req.session.user, text: req.body.text, song_id: ObjectId(req.params.song_id)
        }
        commentsRepository.insertComments(comment).then(commentId => {
            res.send('Commentario añadido ' + commentId);
        }).catch(error => {
            res.send("Error al insertar el usuario");
        });
    })
}