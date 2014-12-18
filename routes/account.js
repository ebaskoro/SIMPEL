/*
 * account.js
 */

module.exports = function (app, connection) {

    app.post('/login', function (request, response) {
        response.set({
            "X-Powered-By": "Melbournian"
        });
        
        var userName = request.body.userName;
        var password = request.body.password;
        var inputValid = userName && password;
        
        if (inputValid) {
            var command = "SELECT ID FROM Pengguna WHERE Nama = '" + userName +
				"' AND KataSandi = '" + password + "' AND Aktif = 1";
            connection.query(command, function (error, rows, fields) {
                var userFound = rows && (rows.length == 1);
                
                if (userFound) {
                    user = rows[0];
                    response.send({
                        id: user.ID,
                        userId: user.ID,
                        role: 'admin'
                    });
                }
                else {
                    response.send(401);
                }
            });
        }
        else {
            response.send(401);
        }
    });
    
};