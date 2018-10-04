"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseService_1 = require("./DatabaseService");
var GoogleDriveService_1 = require("./GoogleDriveService");
var globalNode;
DatabaseService_1.DatabaseService.createDatabaseWithTableNodes().then(function () {
    var url = new URL(window.location.href);
    var nodeId = url.searchParams.get("id");
    DatabaseService_1.DatabaseService.queryForId(nodeId).then(function (nodes) {
        var node = nodes[0];
        globalNode = node;
        console.log('node===', node);
        $('title').text(node.name);
        $('#nodeIcon').attr('src', '../icon/' + node.icon);
        $('#nodeName').text(node.name);
        $('#mainIcon').attr('href', '../icon/' + node.icon);
        GoogleDriveService_1.GoogleDriveService.ACCESS_TOKEN = localStorage.getItem('t');
        GoogleDriveService_1.GoogleDriveService.readFile(node.file).then(function (data) {
            $('#textarea').val(data);
        });
    });
});
var flagChange = false;
function fontMax() {
    var fontSize = parseInt($('#textarea').css('font-size'));
    $('#textarea').css('font-size', fontSize + 1 + 'px');
}
function fontMin() {
    var fontSize = parseInt($('#textarea').css('font-size'));
    if (fontSize > 2) {
        $('#textarea').css('font-size', fontSize - 1 + 'px');
    }
}
function colorBlack() {
    $('body').css("background-color", '#000000'); // #2B2B2B
    $('#textarea').css("background-color", '#000000');
    $('body').css("color", '#00ff00');
}
function colorWhite() {
    $('body').css("background-color", '#ffffff');
    $('#textarea').css("background-color", '#ffffff');
    $('body').css("color", '#000000');
}
/*************************************************
 *               textarea changes
 *************************************************/
$('#textarea').bind('input propertychange', function () {
    $('#button-save').removeClass('btn-success').removeClass('btn-danger').addClass('btn-primary');
    // $('#button-save').css('background-color', '')
    // $('#button-save').css('color', '')
    $('#button-save').html('&nbsp&nbsp&nbspSave&nbsp&nbsp&nbsp');
    $('#span-result').text('');
    flagChange = true;
}).css('font-family', 'consolas');
$('#button-save').unbind('click').bind('click', function () {
    if (!flagChange) {
        $('#button-save').text('No changes');
        return;
    }
    GoogleDriveService_1.GoogleDriveService.uploadFileContent(globalNode.file, $('#textarea').val())
        .then(function (data) {
        $('#button-save').removeClass('btn-primary').addClass('btn-success');
        $('#button-save').text('Success');
        flagChange = false;
    });
    // var jsonData = JSON.stringify({
    //     nodeId: '${node.id?string("##")}',
    //     text: $('#textarea').val()
    // });
    // $.ajax({
    //     xhr: function () {
    //         var xhr = new XMLHttpRequest();
    //         xhr.upload.addEventListener("progress", function (evt) {
    //             $('.progress').removeClass('hide');
    //             if (evt.lengthComputable) {
    //                 var percentComplete = evt.loaded / evt.total;
    //                 console.log(percentComplete);
    //                 $('.progress').css({
    //                     width: percentComplete * 100 + '%'
    //                 });
    //                 if (percentComplete === 1) {
    //                     $('.progress').addClass('hide');
    //                 }
    //             }
    //         }, false);
    //         xhr.addEventListener("progress", function (evt) {
    //             if (evt.lengthComputable) {
    //                 var percentComplete = evt.loaded / evt.total;
    //                 console.log(percentComplete);
    //                 $('.progress').css({
    //                     width: percentComplete * 100 + '%'
    //                 });
    //             }
    //         }, false);
    //         return xhr;
    //     },
    //     type: 'POST',
    //     url: "/posttxt",
    //     data: jsonData,
    //     contentType: "application/json; charset=utf-8",
    //     success: function (data, textStatus, jqXHR) {
    //         // $('#button-save').css('color', 'white')
    //         if(data == 'SUCCESS') {
    //             $('#button-save').removeClass('btn-primary').addClass('btn-success')
    //             // $('#button-save').css('background-color', 'green')
    //             $('#button-save').text('Success')
    //             flagChange = false;
    //         } else {
    //             $('#span-result').text(data)
    //             $('#button-save').removeClass('btn-primary').addClass('btn-danger')
    //             // $('#button-save').css('background-color', 'red')
    //             $('#button-save').text('Error')
    //         }
    //     },
    //     error: function(jqXHR, textStatus, errorThrown) {
    //         console.log('--fail')
    //         $('#span-result').text(jqXHR.responseText)
    //         $('#button-save').removeClass('btn-primary').addClass('btn-danger')
    //         // $('#button-save').css('color', 'white')
    //         // $('#button-save').css('background-color', 'red')
    //         $('#button-save').text('Error')
    //     }
    // });
});
$(window).bind('keydown', function (event) {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
            case 's':
                event.preventDefault();
                // alert('ctrl-s');
                $('#button-save').click();
                break;
            case 'f':
                event.preventDefault();
                // alert('ctrl-f');
                break;
            case 'g':
                event.preventDefault();
                // alert('ctrl-g');
                break;
        }
    }
});
function textWrap() {
    var wrap = $('#textarea').attr('wrap');
    if (wrap == 'soft') {
        $('#textarea').attr('wrap', 'off');
    }
    else {
        $('#textarea').attr('wrap', 'soft');
    }
}
