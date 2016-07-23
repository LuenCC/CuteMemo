/**
 * Created by Jane
 *              on 4/7/2016.
 */

var tblMap = {
    insert: function (options) {
        function txFunction(tx) {
            var sql = "INSERT INTO tblMap" +
                "(location, locationDistrict, date) " +
                "values(?, ?, ?); ";

            function successInsert() {
                console.info("Success: Insert successful.");
                alert("Current location has been recorded.");
            }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (callback) {
        var options = [];

        function txFunction(tx) {
            var sql = "SELECT * FROM tblMap;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAccurate: function (callback) {
        var options = [];

        function txFunction(tx) {
            var sql = "SELECT location, COUNT(*) AS 'count' FROM tblMap GROUP BY location;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectDistrict: function (callback) {
    var options = [];

    function txFunction(tx) {
        var sql = "SELECT locationDistrict, COUNT(*) AS 'count' FROM tblMap GROUP BY locationDistrict;";

        tx.executeSql(sql, options, callback, errorHandler);
    }

    db.transaction(txFunction, errorHandler, successTransaction);
}
};

var tblMain = {
    insert: function (options) {
        function txFunction(tx) {
            var sql = "INSERT INTO tblMain" +
                "(sleeping, weight, dinner, sports, notes, periodColor, periodStatus, peeStatus, date) " +
                "values(?, ?, ?, ?, ?, ?, ?, ?, ?);";

            function successInsert() {
                console.info("Success: Insert successful.");
                alert("Memo added.");
            }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectSleepingDate: function (callback) {
        var options = [];

        function txFunction(tx) {
            var sql = "SELECT sleeping, date FROM tblMain ORDER BY DATE;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectWeightDate: function (callback) {
        var options = [];

        function txFunction(tx) {
            var sql = "SELECT weight, date FROM tblMain ORDER BY DATE;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectDinnerDate: function (callback) {
        var options = [];

        function txFunction(tx) {
            var sql = "SELECT dinner, date FROM tblMain ORDER BY DATE;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectSportsDate: function (callback) {
        var options = [];

        function txFunction(tx) {
            var sql = "SELECT sports, date FROM tblMain ORDER BY DATE;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectPeriodColorDate: function (callback) {
        var options = [];

        function txFunction(tx) {
            //var sql = "SELECT periodColor, date FROM tblMain ORDER BY DATE;";
            var sql = "SELECT periodColor, COUNT(*) AS 'count' FROM tblMain GROUP BY periodColor ORDER BY periodColor;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectPeriodStatusDate: function (callback) {
        var options = [];

        function txFunction(tx) {
            //var sql = "SELECT periodStatus, date FROM tblMain ORDER BY DATE;";
            var sql = "SELECT periodStatus, COUNT(*) AS 'count' FROM tblMain GROUP BY periodStatus ORDER BY periodStatus;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectPeeStatusDate: function (callback) {
        var options = [];

        function txFunction(tx) {
            //var sql = "SELECT peeStatus, date FROM tblMain ORDER BY DATE;";
            var sql = "SELECT peeStatus, COUNT(*) AS 'count' FROM tblMain GROUP BY peeStatus ORDER BY peeStatus;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (callback) {
        var options = [];

        function txFunction(tx) {
            var sql = "SELECT * FROM tblMain ORDER BY date;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {

        function txFunction(tx) {
            var sql = "SELECT * FROM tblMain WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options) {

        function txFunction(tx) {
            var sql = "UPDATE tblMain " +
                "SET sleeping=?, weight=?, dinner=?, " +
                "sports=?, notes=?, periodColor=?, " +
                "periodStatus=?, peeStatus=?, date=? " +
                "WHERE id=?;";

            function successUpdate() {
                console.info("Success: Update successful");
                alert("Memo updated.");
            }

            tx.executeSql(sql, options, successUpdate, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options) {

        function txFunction(tx) {
            var sql = "DELETE FROM tblMain " +
                "WHERE id=?;";

            function successDelete() {
                console.info("Success: Delete successful");
                alert("Memo deleted.");
            }

            tx.executeSql(sql, options, successDelete, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};