var connection = require("./connection.js");

// Object Relational Mapper (ORM)
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        // check to skip hidden properties
        if (ob.hasOwnProperty(key)) {
            arr.push(key + "=" + ob[key]);
        }
    }
    return arr.toString();
}

var querystring = "";
//object for all sql statement functions
var orm = {
    selectAll: function(tableInput, cb) {
        queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        queryString = "INSERT INTO " + table + ' (' + cols.toString() + ') ' + 'VALUES (' + printQuestionMarks(vals.length) + ') ';
        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    updateOne: function(table, objColVals, condition, cb) {
        queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + ' WHERE ' + condition;
        console.log(querystring);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;