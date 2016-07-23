/**
 * Created by Jane
 *              on 4/7/2016.
 */

function clearDatabase() {
    var result = confirm("Really want to reset ? This will clear all memos and locations. " +
        "All data will be lost !");
    try {
        if (result) {
            DB.DropTables();
            alert("Application has been reset.");
        }

    } catch (e) {
        alert(e);
    }
}

function createSportsTimeDropdown() {
    var htmlCode = "";
    var cboSportsTime = $("#cboSportsTime");
    var maxTime = 10;
    var defaultTime = 1;
    cboSportsTime.empty();

    for (var i = 0; i <= maxTime; i++) {
        htmlCode += "<option value='" + i +
            "'>" + i + "</option>";
    }

    cboSportsTime.append(htmlCode);
    cboSportsTime.val(defaultTime);
    cboSportsTime.selectmenu("refresh");
}

function createEditSportsTimeDropdown() {
    var htmlCode = "";
    var cboSportsTime = $("#cboEditSportsTime");
    var maxTime = 10;
    var defaultTime = 1;
    cboSportsTime.empty();

    for (var i = 0; i <= maxTime; i++) {
        htmlCode += "<option value='" + i +
            "'>" + i + "</option>";
    }

    cboSportsTime.append(htmlCode);
    cboSportsTime.val(defaultTime);
    cboSportsTime.selectmenu("refresh");
}

function createSleepingTimeDropdown() {
    var htmlCode = "";
    var cboSleepTime = $("#cboSleepTime");
    var maxTime = 24;
    var defaultTime = 8;
    cboSleepTime.empty();

    for (var i = 0; i <= maxTime; i++) {
        htmlCode += "<option value='" + i +
            "'>" + i + "</option>";
    }

    cboSleepTime.append(htmlCode);
    cboSleepTime.val(defaultTime);
    cboSleepTime.selectmenu("refresh");
}

function createEditSleepingTimeDropdown() {
    var htmlCode = "";
    var cboSleepTime = $("#cboEditSleepTime");
    var maxTime = 24;
    var defaultTime = 8;
    cboSleepTime.empty();

    for (var i = 0; i <= maxTime; i++) {
        htmlCode += "<option value='" + i +
            "'>" + i + "</option>";
    }

    cboSleepTime.append(htmlCode);
    cboSleepTime.val(defaultTime);
    cboSleepTime.selectmenu("refresh");
}

function updateWeightDropdown() {
    var htmlCode = "";
    var cboWeight = $("#cboWeight");
    var maxWeight = 300;
    var defaultWeight = 100;
    cboWeight.empty();

    for (var i = 1; i <= maxWeight; i++) {
        htmlCode += "<option value='" + i +
            "'>" + i + "</option>";
    }

    cboWeight.append(htmlCode);
    cboWeight.val(defaultWeight);
    cboWeight.selectmenu("refresh");
}

function updateEditWeightDropdown() {
    var htmlCode = "";
    var cboWeight = $("#cboEditWeight");
    var maxWeight = 300;
    var defaultWeight = 100;
    cboWeight.empty();

    for (var i = 1; i <= maxWeight; i++) {
        htmlCode += "<option value='" + i +
            "'>" + i + "</option>";
    }

    cboWeight.append(htmlCode);
    cboWeight.val(defaultWeight);
    cboWeight.selectmenu("refresh");
}

function updateCurrentDate() {
    var txtDate = $("#txtDate");
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;

    txtDate.val(today)
}

function recordTodaysStatus() {
    console.info("Form is valid");

    var periodColor;
    var periodStatus;
    var peeStatus;

    if ($("#chkOthers").prop("checked")) {
        periodColor = $("#cboPeriodColor").val();
        periodStatus = $("#cboPeriodMuchOrLittle").val();
        peeStatus = $("#cboPee").val();
    }
    var sleeping = $("#cboSleepTime").val();
    var weight = $("#cboWeight").val();
    var dinner = $("#cboDinner").val();
    var sports = $("#cboSportsTime").val();
    var notes = escapeHtml($("#rtxNotes").val());
    var date = $("#txtDate").val();

    var options = [sleeping, weight, dinner, sports, notes, periodColor, periodStatus, peeStatus, date];

    tblMain.insert(options);
    //location.reload();
}

function updateMemo() {
    var id = localStorage.getItem("id");

    var sleeping = $("#cboEditSleepTime").val();
    var weight = $("#cboEditWeight").val();
    var dinner = $("#cboEditDinner").val();
    var sports = $("#cboEditSportsTime").val();
    var notes = $("#rtxEditNotes").val();
    var others = $("#chkEditOthers").prop("checked");
    var periodColor;
    var periodStatus;
    var peeStatus;
    var date = $("#txtEditDate").val();

    if (others) {
        periodColor = $("#cboEditPeriodColor").val();
        periodStatus = $("#cboEditPeriodMuchOrLittle").val();
        peeStatus = $("#cboEditPee").val();
    }

    var options = [sleeping, weight, dinner,
        sports, notes, periodColor,
        periodStatus, peeStatus, date, id];

    tblMain.update(options);
    $(location).prop('href', "#Detail");
}

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

//function HTMLescape(html){
//    return document.createElement('div')
//        .appendChild(document.createTextNode(html))
//        .parentNode
//        .innerHTML;
//}

function deleteSelectedMemo() {
    var id = localStorage.getItem("id");
    var options = [id];
    tblMain.delete(options);


    function successSelectAllLists(tx, results) {

        if (!(results.length > 0)) {

            $(".clearDiv").empty();
        }
    }

    tblMain.selectAll(successSelectAllLists);
    $(location).prop('href', "#ViewAllHealthRecords");
}

function getDetail() {

    var id = localStorage.getItem("id");
    var options = [id];

    function successSelectCurrentRecord(tx, results) {
        var row = results.rows[0];
        var htmlCode = "";

        var peeStatus = "";
        var periodColor = "";
        var periodStatus = "";

        if (row['peeStatus'] != "undefined" && row['peeStatus'] != "N/A") {
            peeStatus = "Pee status: " + row['peeStatus'];
        }

        if (row['periodColor'] != "undefined" && row['periodColor'] != "N/A") {
            periodColor = "Period Color: " + row['periodColor'];
        }

        if (row['periodStatus'] != "undefined" && row['periodStatus'] != "N/A") {
            periodStatus = "Period Status: " + row['periodStatus'];
        }

        htmlCode = "<li><h3>Date: " + row['date'] + "</h3>" +
            "<p>Sleeping Hours: Slept " + row['sleeping'] + " hour(s). </p>" +
            "<p>Weight: " + row['weight'] + " Kg. </p>" +
            "<p>Diet: Had " + row['dinner'] + " Meal(s). </p>" +
            "<p>Sports: Done " + row['sports'] + " hour(s) sports. </p>" +
            "<p>Notes: " + row['notes'] + "</p>" +
            "<p>" + periodColor + "</p>" +
            "<p>" + periodStatus + "</p>" +
            "<p>" + peeStatus + "</p>" +
            "</li>";

        var detail = $("#lvwDetail");
        detail.html(htmlCode);
    }

    tblMain.select(options, successSelectCurrentRecord);
}

function getSelectedMemo() {
    var id = localStorage.getItem("id");
    var options = [id];

    function successSelectMemo(tx, results) {
        var row = results.rows[0];

        $("#txtEditDate").val(row['date']);
        $("#rtxEditNotes").val(row['notes']);
        $("#cboEditSleepTime").val(row['sleeping']).selectmenu("refresh");
        $("#cboEditWeight").val(row['weight']).selectmenu("refresh");
        $("#cboEditDinner").val(row['dinner']).selectmenu("refresh");
        $("#cboEditSportsTime").val(row['sports']).selectmenu("refresh");

        if (row['peeStatus'] != "undefined") {
            $("#chkEditOthers").prop("checked", true);
            $("#cboEditPeriodColor").val(row['periodColor']).selectmenu("refresh");
            $("#cboEditPeriodMuchOrLittle").val(row['periodStatus']).selectmenu("refresh");
            $("#cboEditPee").val(row['peeStatus']).selectmenu("refresh");
        }
        else {
            $("#chkEditOthers").prop("checked", false);
        }

        $("#frmEditStatusToday :checkbox").checkboxradio("refresh");

        if ($("#chkEditOthers").prop("checked")) {
            $("#divEditOther").prop("hidden", false);
        }
        else {
            $("#divEditOther").prop("hidden", true);
        }
    }

    tblMain.select(options, successSelectMemo);
}

function getRecorderDetailLists() {

    function successSelectAllLists(tx, results) {

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {

            var row = results.rows[i];

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] +
                " href='#' title=" + row['notes'] + ">" +
                "<span>" + row['date'] + " : " + row['notes'] +
                "</span><br><span style='font-size: small;'>" +
                "Slept " + row['sleeping'] + " hours. Had " +
                row['dinner'] + " meals, " + row['sports'] +
                " hour(s) sports. " + "</span></a></li>";
        }

        //<a href="#" data-role="button" data-icon="delete" data-iconpos="notext">Delete</a>

        var detailList = $("#lvwRecorderDetailList");
        detailList = detailList.html(htmlCode);
        detailList.listview("refresh");

        $("#lvwRecorderDetailList a").on("click", clickHandler);
        //$(".toDelete").on("click", deleteSelectedMemo);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', "#Detail");
        }
    }

    tblMain.selectAll(successSelectAllLists);
}

function getHistoryLocation() {
    function successSelectAllLists(tx, results) {

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {

            var row = results.rows[i];
            var url = "https://www.google.ca/maps/place/" + row['location'];

            htmlCode += "<li><a style='font-size: small' data-role='button' data-row-id=" + row['id'] +
                " href='" + url + "' target='_blank' =" + ">" +
                row['date'] + " : <br>" + row['location'] + "</a></li>";
        }

        var detailList = $("#lvwHistoryLocation");
        detailList = detailList.html(htmlCode);
        detailList.listview("refresh");
        $("#lvwHistoryLocation a").on("dblclick", doubleClickHandler);

        function doubleClickHandler() {
            var id = $(this).attr("data-row-id");
            var options = [id];
            var result = confirm("Do you really want to delete the record ?");
            if (result) {
                tblMap.delete(options);
            }
        }
    }

    tblMap.selectAll(successSelectAllLists);
}

google.charts.load('current', {'packages': ['corechart']});

function drawPieChartMapAccurate() {

    function successSelectAll(tx, results) {

        var length = results.rows.length;
        if (!(length > 0)) {
            return;
        }

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'accurate');
        data.addColumn('number', 'Persent');

        for (var i = 0; i < length; i++) {

            var row = results.rows[i];

            data.addRows([
                //[row['locationDistrict'], row['count']]
                [row['location'], row['count']]
            ]);
        }


        var options = {
            'backgroundColor': '#f0f8ff',
            'width': '100%',
            'height': '300',
            'chartArea': {
                left: 0, right: 0, bottom: 0, width: '90%', height: '90%'
            },
            'is3D': true,
            'legend': {
                position: 'top',
                maxLines: 5,
                textStyle: {fontSize: 12}
            },
            'colors': ['#ffdae0', '#ffd700', '#ff7373', '#b0e0e6', '#cccccc', '#d3ffce', '#003366', '#ffa500',
                '#40e0d0', '#ffc0cb', '#ffd700', '#ff7373', '#b0e0e6', '#cccccc', '#d3ffce', '#003366', '#ffa500',
                '#40e0d0']
        };

        var chart = new google.visualization.PieChart(document.getElementById('divMapChartAccurate'));
        chart.draw(data, options);
    }

    tblMap.selectAccurate(successSelectAll);
}

function drawPieChartMapCommunity() {

    function successSelectAll(tx, results) {

        var length = results.rows.length;
        if (!(length > 0)) {
            return;
        }

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'district');
        data.addColumn('number', 'Persent');

        for (var i = 0; i < length; i++) {

            var row = results.rows[i];

            data.addRows([
                [row['locationDistrict'], row['count']]
            ]);
        }


        var options = {
            'backgroundColor': '#f0f8ff',
            'width': '100%',
            'height': '300',
            'chartArea': {
                left: 0, right: 0, bottom: 0, width: '90%', height: '90%'
            },
            'is3D': true,
            'legend': {
                position: 'top',
                maxLines: 5,
                textStyle: {fontSize: 12}
            },
            'colors': ['#c0fff4', '#cccccc', '#d3ffce', '#003366', '#ffa500',
                '#40e0d0', '#ffc0cb', '#ffd700', '#ff7373', '#b0e0e6', '#cccccc', '#d3ffce', '#003366', '#ffa500',
                '#40e0d0', '#ffc0cb', '#ffd700', '#ff7373']
        };

        var chart = new google.visualization.PieChart(document.getElementById('divMapChart'));
        chart.draw(data, options);
    }

    tblMap.selectDistrict(successSelectAll);
}

function drawPieChartDinner() {

    function successSelectAll(tx, results) {

        var length = results.rows.length;
        if (!(length > 0)) {
            return;
        }

        var data = new google.visualization.DataTable();

        var oneMeal = 0;
        var twoMeals = 0;
        var threeMeals = 0;

        for (var i = 0; i < length; i++) {
            var row = results.rows[i];
            if (row['dinner'] == 1) {
                oneMeal++;
                continue;
            }

            if (row['dinner'] == 2) {
                twoMeals++;
                continue;
            }

            if (row['dinner'] == 3) {
                threeMeals++;
            }
        }

        data.addColumn('string', 'Meals');
        data.addColumn('number', 'Persent');
        data.addRows([
            ['One Meal', oneMeal],
            ['Two Meals', twoMeals],
            ['Three Meals', threeMeals]
        ]);

        var options = {
            'backgroundColor': '#f1f8e9',
            'width': '100%',
            'height': '300',
            'chartArea': {
                left: 0, right: 0, bottom: 0, width: '90%', height: '90%'
            },
            'is3D': true,
            'legend': {
                position: 'right',
                textStyle: {fontSize: 12}
            },
            'pieSliceTextStyle': {color: '#000c00'},
            'colors': ['#ccff00', '#ffb6c1', '#fff68f']
        };

        var chart = new google.visualization.PieChart(document.getElementById('divDinnerChart'));
        chart.draw(data, options);
    }

    tblMain.selectDinnerDate(successSelectAll);
}

function drawSleeping() {
    function successSelectAll(tx, results) {

        var length = results.rows.length;
        if (!(length > 0)) {
            return;
        }

        var TextA = "Actual sleeping time";
        var TextB = "8 hours standard";

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'X');
        data.addColumn('number', TextA);
        data.addColumn({type: 'string', role: 'annotation'});
        data.addColumn({type: 'string', role: 'annotationText'});
        data.addColumn('number', TextB);

        for (var i = 0; i < length; i++) {

            var row = results.rows[i];
            var annotationText = row['date'] + ' Sleeping Hours: ' + row['sleeping'];

            data.addRows([
                [null, row['sleeping'], row['sleeping'].toString(), annotationText, 8]
            ]);
        }

        var startDate = results.rows[0]['date'];
        var endDate = results.rows[length - 1]['date'];
        var options = {
            hAxis: {
                title: 'From ' + startDate + ' to ' + endDate
            },
            vAxis: {
                title: 'Time (Unit: hour)'
                //, format:'0'
            },
            backgroundColor: '#f1f8e9',
            colors: ['3388cc', '008000'],
            'legend': {
                position: 'top',
                maxLines: 2,
                textStyle: {fontSize: 12}
            },
            'chartArea': {
                top: 20, left: 35, right: 35, bottom: 35, width: '100%', height: '100%'
            }
        };
        var chart = new google.visualization.LineChart(document.getElementById('divSleepingChart'));
        chart.draw(data, options);
    }

    tblMain.selectSleepingDate(successSelectAll);
}

function drawWeight() {
    function successSelectAll(tx, results) {

        var length = results.rows.length;
        if (!(length > 0)) {
            return;
        }

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'X');
        data.addColumn('number', 'A');
        data.addColumn({type: 'string', role: 'annotation'});
        data.addColumn({type: 'string', role: 'annotationText'});

        for (var i = 0; i < length; i++) {

            var row = results.rows[i];
            var annotationText = row['date'] + ' Weight: ' + row['weight'];

            data.addRows([
                [null, row['weight'], row['weight'].toString(), annotationText]
            ]);
        }

        var startDate = results.rows[0]['date'];
        var endDate = results.rows[length - 1]['date'];
        var options = {
            'legend': 'none',
            hAxis: {
                title: 'From ' + startDate + ' to ' + endDate
            },
            vAxis: {
                title: 'Weight (Unit: kg)'
                //, format:'0'
            },
            backgroundColor: '#f1f8e9',
            'chartArea': {
                top: 20, left: 55, right: 35, bottom: 35, width: '100%', height: '100%'
            }
        };
        var chart = new google.visualization.LineChart(document.getElementById('divWeightChart'));
        chart.draw(data, options);
    }

    tblMain.selectWeightDate(successSelectAll);
}

function drawSports() {
    function successSelectAll(tx, results) {

        var length = results.rows.length;
        if (!(length > 0)) {
            return;
        }

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'X');
        data.addColumn('number', 'A');
        data.addColumn({type: 'string', role: 'annotation'});
        data.addColumn({type: 'string', role: 'annotationText'});

        for (var i = 0; i < length; i++) {

            var row = results.rows[i];
            var annotationText = row['date'] + ' Sports: ' + row['sports'];

            data.addRows([
                [null, row['sports'], row['sports'].toString(), annotationText]
            ]);
        }

        var startDate = results.rows[0]['date'];
        var endDate = results.rows[length - 1]['date'];
        var options = {
            'legend': 'none',
            hAxis: {
                title: 'From ' + startDate + ' to ' + endDate
            },
            vAxis: {
                title: 'Time (Unit: hour)'
                //, format:'0'
            },
            backgroundColor: '#f1f8e9',
            'chartArea': {
                top: 20, left: 35, right: 35, bottom: 35, width: '100%', height: '100%'
            }
        };
        var chart = new google.visualization.LineChart(document.getElementById('divSportsChart'));
        chart.draw(data, options);
    }

    tblMain.selectSportsDate(successSelectAll);
}

function drawPeriodColor() {

    function successSelectAll(tx, results) {

        var length = results.rows.length;
        if (!(length > 0)) {
            return;
        }

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'periodColor');
        data.addColumn('number', 'Persent');

        for (var i = 0; i < length; i++) {

            var row = results.rows[i];

            if (row['periodColor'] == "N/A" || row['periodColor'] == "undefined") {
                continue;
            }

            data.addRows([
                [row['periodColor'], row['count']]
            ]);
        }


        var options = {
            'backgroundColor': '#f0f8ff',
            'width': '100%',
            'height': '300',
            'chartArea': {
                left: 0, right: 0, bottom: 0, width: '90%', height: '90%'
            },
            'is3D': true,
            'legend': {
                position: 'right',
                textStyle: {fontSize: 12}
            },
            'colors': [
                'ffe4e1', '#fff68f', '#ccff00', '#00ced1', '#800080', '#d3ffce', '#c39797', '#3399ff'
            ],
            'pieSliceTextStyle': {color: '#228b22'}
        };

        var chart = new google.visualization.PieChart(document.getElementById('divPeriodColorChart'));
        chart.draw(data, options);
    }

    tblMain.selectPeriodColorDate(successSelectAll);
}

function drawPeriodStatus() {

    function successSelectAll(tx, results) {

        var length = results.rows.length;
        if (!(length > 0)) {
            return;
        }

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'periodStatus');
        data.addColumn('number', 'Persent');

        for (var i = 0; i < length; i++) {

            var row = results.rows[i];

            if (row['periodStatus'] == "N/A" || row['periodStatus'] == "undefined") {
                continue;
            }

            data.addRows([
                [row['periodStatus'], row['count']]
            ]);
        }


        var options = {
            'backgroundColor': '#f0f8ff',
            'width': '100%',
            'height': '300',
            'chartArea': {
                left: 0, right: 0, bottom: 0, width: '90%', height: '90%'
            },
            'is3D': true,
            'legend': {
                position: 'right',
                textStyle: {fontSize: 12}
            },
            'colors': [
                '#cbffc0', '#ffff66', '#3399ff', '#fff68f', '#ccff00', '#00ced1'
            ],
            'pieSliceTextStyle': {color: '#228b22'}
        };

        var chart = new google.visualization.PieChart(document.getElementById('divPeriodStatusChart'));
        chart.draw(data, options);
    }

    tblMain.selectPeriodStatusDate(successSelectAll);
}

function drawPeeStatus() {

    function successSelectAll(tx, results) {

        var length = results.rows.length;
        if (!(length > 0)) {
            return;
        }

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'peeStatus');
        data.addColumn('number', 'Persent');

        for (var i = 0; i < length; i++) {

            var row = results.rows[i];

            if (row['peeStatus'] == "undefined" || row['peeStatus'] == "N/A") {
                continue;
            }

            data.addRows([
                [row['peeStatus'], row['count']]
            ]);
        }


        var options = {
            'backgroundColor': '#f0f8ff',
            'width': '100%',
            'height': '300',
            'chartArea': {
                left: 0, right: 0, bottom: 0, width: '90%', height: '90%'
            },
            'is3D': true,
            'legend': {
                position: 'right',
                textStyle: {fontSize: 12}
            },
            'colors': [
                '#a4ffff', '#ffdae0', '#d3ffce', '#7fffd4', '#ccff00'
            ],
            'pieSliceTextStyle': {color: '#228b22'}
        };

        var chart = new google.visualization.PieChart(document.getElementById('divPeeStatusChart'));
        chart.draw(data, options);
    }

    tblMain.selectPeeStatusDate(successSelectAll);
}