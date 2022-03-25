module.exports = function (app) {

    app.get('/authors/add', function (req, res) {
        res.render("authors/add.twig");
    });
    app.post('/authors/add', function (req, res) {
            let respose = "Autor añadido: " + req.body.name + "<br>"
                + "grupo: " + req.body.group + "<br>"
                + "rol: " + req.body.rol
            res.send(respose);
        }
    );
    app.get("/authors", function (req, res) {
            let authors = [{
                "name": "Manolo Lama",
                "group": "Los Manolos",
                "rol": "Cantante",
            }, {
                "name": "Mano Carreño",
                "group": "Los Manolos",
                "rol": "Guitarrista",
            }, {
                "name": "Ozelot",
                "group": "Cielo",
                "rol": "Cantante",
            }];
            let response = {
                seller: "Authors Lists",
                authors: authors
            };
            res.render("authors/authors.twig", response);
        }
    );
    app.get('/authors/*', function (req, res) {
        res.redirect("/authors");
    });
};




