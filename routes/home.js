module.exports = function (app) {

    app.get("/", function (request, response) {
        response.set({
            "X-Powered-By": "Melbournian"
        });
        
        response.render("home/index", {
            title: "SIMPEL > Pencarian"
        });
    });
    
};