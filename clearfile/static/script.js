function addResults(query) {
    $.get('/search?query=' + query, function (text, status) {
        $(".search-result-container").html(text);
        $('.materialboxed').materialbox();
        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
        });

    });
}

$(document).ready(function() {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('#upload-button').click(function (){
        $('#upload').modal();
        $('#upload').modal('open');
    });

    $('#upload-file').click(function () {
        $('#upload-form').submit();
    })
    $("#search-form").submit(function(e) {
        e.preventDefault();
        $(".search-results").each(function (index) {
            $(this).empty();
        });
        addResults($("#clearfile-search-input").val());
    });
    $("#clearfile-search-input").val("");
    $('.search-result-container').on('click', '.delete-note', function (event) {
        event.preventDefault();
        $.get($(this).attr("href"), function (text, status) {
            let response = JSON.parse(text);
            if (response.status === "ok") {
                Materialize.toast("Note Deleted.", 1000);
            } else {
                Materialize.toast("Error deleting note.", 1000);
            }
            addResults("");
        });
    });
    $('.search-result-container').on('click', '.update-notebook', function (event) {
        event.preventDefault();
        $.get($(this).attr("href"), function (text, status) {
            addResults("");
        });
    });

    $('.search-result-container').on('click', '.add-notebook-button', function (event){
        $('#add-notebook').modal();
        $('#add-notebook').modal('open');
    });

    $('#notebook-add-button').on('click', function() {
        $.get("/add/notebook?" + $('#notebook-form').serialize(), function (data, status) {
            addResults("");
        });
    });
    $('#form-upload-button').on('click', function() {
        $.ajax({
            // Your server script to process the upload
            url: '/upload',
            type: 'POST',

            // Form data
            data: new FormData($('#upload-form')[0]),

            // Tell jQuery not to process data or worry about content-type
            // You *must* include these options!
            cache: false,
            contentType: false,
            processData: false,
        }).done(function (data) {
            addResults("");
        });
    });
    $('.search-result-container').on('click', '.kill-tag', function(e){
        let dataId = $(this).attr("data-tag-id");
        $.get("/delete/tag/" + dataId, function (data) {
            Materialize.toast("Tag Deleted.", 1000);
        }).fail(function() {
            Materialize.toast("Error deleting tag.", 1000);
        });
    });

    addResults("");
});
