/**
 * Created by Jane
 *              on 4/7/2016.
 */

function chkOthers_change() {
    var chkOthers = $("#chkOthers");
    if (chkOthers.prop("checked")) {
        $("#divOther").prop("hidden", false);
    }
    else {
        $("#divOther").prop("hidden", true);
    }
}

function chkEditOthers_change() {
    var chkOthers = $("#chkEditOthers");
    if (chkOthers.prop("checked")) {
        $("#divEditOther").prop("hidden", false);
    }
    else {
        $("#divEditOther").prop("hidden", true);
    }
}

function chkOtherCharts_change() {
    var chkOtherCharts = $("#chkOtherCharts");
    if (chkOtherCharts.prop("checked")) {
        $("#divOtherCharts").prop("hidden", false);
    }
    else {
        $("#divOtherCharts").prop("hidden", true);
    }
}

function HomePage_pageshow() {
    google.charts.setOnLoadCallback(drawSleeping);
    google.charts.setOnLoadCallback(drawWeight);
    google.charts.setOnLoadCallback(drawSports);
    google.charts.setOnLoadCallback(drawPeriodColor);
    google.charts.setOnLoadCallback(drawPeriodStatus);
    google.charts.setOnLoadCallback(drawPeeStatus);
    google.charts.setOnLoadCallback(drawPieChartDinner);
}

function btnSave_click() {
    recordTodaysStatus();
    $(location).prop('href', "#HomePage");
}


function AddTodayHealthStatus_pageshow() {
    updateWeightDropdown();
    updateCurrentDate();
    createSleepingTimeDropdown();
    createSportsTimeDropdown();
}

function EditTodayHealthStatus_pageshow() {
    createEditSportsTimeDropdown();
    createEditSleepingTimeDropdown();
    updateEditWeightDropdown();

    getSelectedMemo();
}

function btnEditSave_click() {
    updateMemo();
}

function btnEditCancel_click() {
    $(location).prop('href', "#Detail");
}

function btnClearDatabase_click() {
    clearDatabase();
    setTimeout(function(){location.reload();}, 1000);
}

function ViewAllHealthRecords_pageshow() {
    getRecorderDetailLists();
}

function mappage_pageshow() {
    getPosition();
}

function btnMapRecord_click() {
    recordPosition();
}

//function btnListRecord_click() {
//    recordPosition();
//    setTimeout(function(){location.reload();}, 4000);
//}

function MoreFunctions_pageshow() {
    getHistoryLocation();
    google.charts.setOnLoadCallback(drawPieChartMapAccurate);
    google.charts.setOnLoadCallback(drawPieChartMapCommunity);
}

function Detail_pageshow() {
    getDetail();
}

function btnDelete_click() {
    deleteSelectedMemo();
}

function btnCancel_click() {
    $(location).prop('href', "#ViewAllHealthRecords");
}

function btnUpdate_click() {
    $(location).prop('href', "#EditTodayHealthStatus");
}

//$(function(){
//    $( "div.box" ).bind( "taphold", tapholdHandler );
//
//    function tapholdHandler( event ){
//        $( event.target ).addClass( "taphold" );
//    }
//});



function init() {
    addFooterInnerHTML();

    $("#HomePage").on("pageshow", HomePage_pageshow);
    $("#AddTodayHealthStatus").on("pageshow", AddTodayHealthStatus_pageshow);
    $("#ViewAllHealthRecords").on("pageshow", ViewAllHealthRecords_pageshow);
    $("#MoreFunctions").on("pageshow", MoreFunctions_pageshow);
    $("#Detail").on("pageshow", Detail_pageshow);
    $("#EditTodayHealthStatus").on("pageshow", EditTodayHealthStatus_pageshow);

    $("#btnSave").on("click", btnSave_click);
    $("#btnClearDatabase").on("click", btnClearDatabase_click);
    $("#btnDelete").on("click", btnDelete_click);
    $("#btnCancel").on("click", btnCancel_click);
    $("#btnUpdate").on("click", btnUpdate_click);
    $("#btnEditCancel").on("click", btnEditCancel_click);
    $("#btnEditSave").on("click", btnEditSave_click);
    $("#btnMapRecord").on("click", btnMapRecord_click);
    //$("#btnListRecord").on("click", btnListRecord_click);

    $("#chkOthers").on("change", chkOthers_change);
    $("#chkEditOthers").on("change", chkEditOthers_change);
    $("#chkOtherCharts").on("change", chkOtherCharts_change);

    $("#map-page").on("pageshow", mappage_pageshow);
    $("#radRoad").on("change", mappage_pageshow);
    $("#radSatellite").on("change", mappage_pageshow);
    $("#radHybrid").on("change", mappage_pageshow);
    $("#radTerrain").on("change", mappage_pageshow);

    google.charts.setOnLoadCallback(drawSleeping);
    google.charts.setOnLoadCallback(drawWeight);
    google.charts.setOnLoadCallback(drawSports);
    google.charts.setOnLoadCallback(drawPeriodColor);
    google.charts.setOnLoadCallback(drawPeriodStatus);
    google.charts.setOnLoadCallback(drawPeeStatus);
    google.charts.setOnLoadCallback(drawPieChartDinner);
}

function initDB() {
    console.info("Creating Database.");
    try {
        DB.CreateDatabase();
        if (db) {
            console.info("Creating tables ...");
            DB.CreateTables();
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB. " +
            "Can not proceed");

    }
}

$(document).ready(function () {
    initDB();
    init();
});
