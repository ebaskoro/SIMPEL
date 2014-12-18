/*
 * api.js
 */

module.exports = function (app, connection) {
    
    app.get("/api/v1/pemilih", function (request, response) {
        response.set({
            "X-Powered-By": "Melbournian"
        });
        
        var limitCount = request.query.limitCount || 10;
        var fullName = request.query.fullName;
        var address = request.query.address;
        var passport = request.query.passport;
        var sessionId = request.get('sessionId');
        
        if (sessionId) {
            var command = "SELECT ID FROM Pengguna WHERE ID = " + sessionId + " AND Aktif = 1";
            connection.query(command, function (error, rows, fields) {
                var validSession = rows && (rows.length > 0);
                
                if (validSession) {
                    if (fullName ||
						address ||
						passport) {
                        var command = "SELECT * FROM Pemilih WHERE Nama LIKE '%" + fullName +
							"%' AND CONCAT(Alamat, ' ', Suburb, ' ', KodePos) LIKE '%" + address +
							"%' AND NomorPengenal LIKE '%" + passport + "%' LIMIT " + limitCount;
                        connection.query(command, function (error, rows, fields) {
                            if (rows) {
                                var result = [];
                                
                                for (var i = 0; i < rows.length; i ++) {
                                    var row = rows[i];
                                    result.push({
                                        fullName: row.Nama,
                                        address: row.Alamat,
                                        suburb: row.Suburb,
                                        postcode: row.KodePos,
                                        gender: row.Gender,
                                        passport: row.NomorPengenal,
                                        tps: row.TPS,
                                        sequenceNumber: row.NomorUrut,
                                        category: row.Tipe
                                    });
                                }
                                
                                response.json(result);
                            }
                            else {
                                response.json();
                            }
                        });
                    }
                    else {
                        response.json();
                    }
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