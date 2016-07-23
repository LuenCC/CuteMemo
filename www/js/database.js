/**
 * Created by Jane
 *              on 4/7/2016.
 */

var db;

function errorHandler(tx, error) {
    console.error("SQL error: " + tx +
        " (" + error.code + ") -- " + error.message);
}

function successTransaction() {
    console.info("Success: Transaction is successful");
}

var DB = {
    CreateDatabase: function () {
        var shortName = "YourHealthRecorderDB";
        var version = "1.0";
        var displayName = "DB for Your Health Recorder app";
        var dbSize = 1 * 1024 * 1024;

        console.info("Creating database ...");

        db = openDatabase(shortName, version, displayName,
            dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success: Database creation successful.");
        }
    },
    CreateTables: function () {

        function successCreate() {
            console.info("Success: Table created successfully.");
        }

        function txFunction(tx) {
            var options = [];

            console.info("Creating table tblMain ...");
            var sql = "CREATE TABLE IF NOT EXISTS tblMain( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "sleeping INTEGER," +
                "weight INTEGER," +
                "dinner NVARCHAR (100)," +
                "sports INTEGER," +
                "notes NVARCHAR (500)," +
                "periodColor NVARCHAR (100)," +
                "periodStatus NVARCHAR (100)," +
                "peeStatus NVARCHAR (100)," +
                "date DATE);";
            tx.executeSql(sql, options, successCreate, errorHandler);

            console.info("Creating table tblMap ...");
            sql = "CREATE TABLE IF NOT EXISTS tblMap( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "location NVARCHAR (500)," +
                "locationDistrict NVARCHAR (500)," +
                "date DATE);";
            tx.executeSql(sql, options, successCreate, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    DropTables: function () {
        function successDrop() {
            console.info("Success: Dropping table successful");
        }

        function txFunction(tx) {
            var options = [];
            console.info("Dropping table: tblMain");
            var sql = "DROP TABLE IF EXISTS tblMain;";
            tx.executeSql(sql, options, successDrop, errorHandler);

            sql = "DROP TABLE IF EXISTS tblMap;";
            tx.executeSql(sql, options, successDrop, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};