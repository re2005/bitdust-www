

$(document).ready(function(){
    
    $('.popup .close_order, .overlay').click(function (){
        $('.popup, .overlay').css({'opacity':'0','visibility':'hidden'});
        $('#contactform input:checkbox').removeAttr("checked");
        $("#contactform input[type=submit]").attr('disabled','disabled');
        $('#contactform input[type=hidden].valTrFal').val('valTrFal_disabled');
    });
    
    $(function () {
        $('#contactform input:checkbox').change(function() {
            if($(this).is(':checked')){
                $("#contactform input[type=submit]").removeAttr('disabled');
                $('#contactform input[type=hidden].valTrFal').val('valTrFal_true');
            }
            else {
                $("#contactform input[type=submit]").attr('disabled','disabled');
                $('#contactform input[type=hidden].valTrFal').val('valTrFal_disabled');
            }
        });
    });
    
    $('#top_search_button, #top_search_button_short').click(function(e) {
        $('.popup, .overlay').css('opacity','1');
        $('.popup, .overlay').css('visibility','visible');
        $('#feedback_panel').show();
        $('.feedback_alert').html('');
        $('.feedback_alert').hide();
        if ($('#top_search_input').val()) {
            $('#feedback_message').val($('#top_search_input').val());
        }
        e.preventDefault();
    });

    $('#top_search_input').bind("enterKey", function(e) {
        e.preventDefault();    
        $('.popup, .overlay').css('opacity','1');
        $('.popup, .overlay').css('visibility','visible');
        $('#feedback_panel').show();
        $('#feedback_head').show();
        $('.feedback_alert').html('');
        $('.feedback_alert').hide();
        if ($('#top_search_input').val()) {
            $('#feedback_message').val($('#top_search_input').val());
        }
    });

    $('#top_search_input').keyup(function(e){
        debug.log(e);
        if(e.keyCode == 13) {
            $(this).trigger("enterKey");
            e.preventDefault();
        }
    });  
    
    $("#top_search_panel form").submit(function (e) {
        debug.log(e);
        e.preventDefault(); 
        $(this).trigger("enterKey");
    });
    
    var form = $('#contactform'); // contact form
    var submit = $('#feedback_submit_button');  // submit button
    var alert = $('.feedback_alert'); // alert div for show alert message

    // form submit event
    form.on('submit', function(e) {
        e.preventDefault(); // prevent default form submit

        $.ajax({
          url: 'https://bitdust.io/feedback.php', // form action url
          type: 'POST', // form submit method get/post
          dataType: 'html', // request type html/json/xml
          data: form.serialize(), // serialize form data 
          beforeSend: function() {
            $('.feedback_alert').html('');
            $('.feedback_alert').fadeOut();
            $('#feedback_panel').show();
            submit.html('&nbsp;&nbsp;Sending....&nbsp;&nbsp;'); // change submit button text
          },
          success: function(data) {
            $('.feedback_alert').html("<h4 align=center>Great thanks for your feedback!</h4>BitDust Team will create a new Q.A. page from your request or answer your question directly.<br>We'll contact you soon, let's keep contact!");
            $('.feedback_alert').fadeIn(); // fade in response data
            $('#feedback_panel').hide();
            $('#feedback_head').hide();
            form.trigger('reset'); // reset form
            submit.html('&nbsp;&nbsp;Submit&nbsp;&nbsp;'); // reset submit button text
          },
          error: function(e) {
            $('.feedback_alert').html("<h4 style='color: red;' align=center>Error happened while sending ...</h4>");
            $('.feedback_alert').fadeIn(); // fade in response data
            $('#feedback_panel').hide();
            $('#feedback_head').hide();
            form.trigger('reset'); // reset form
            submit.html('&nbsp;&nbsp;Submit&nbsp;&nbsp;'); // reset submit button text
          }
        });
    });    
    
});
