$(document).ready(function() {
  if ($('#datetime') && $('#datetime').length > 0)
    $('#datetime').datetimepicker({format: 'yyyy-mm-dd hh:ii'});
  if ($('#empservice') && $('#empservice').length > 0){
    $('#empservice').chosen({});
    $('#reminder').chosen({placeholder_text_single: "Select Project/Initiative..."});
  }
  if ($('#book_form') && $('#book_form').length > 0)
  {
    $('#book_form').validate({ // initialize the plugin
      rules: {
        empservice: {
          required: true,
        },
        datetime: {
          required: true,
        },
        customername: {
          required: true,
        },
        number: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        description: {
          required: true,
        },
        reminder: {
          required: true
        },
        reminder: {
          required: true
        }
      }
    });
  }
  $('#book_form').submit(function(e) {
    var $this = $(this); // `this` refers to the current form element
    e.preventDefault();
    $.post(
        $this.attr("action"), // Gets the URL to sent the post to
        $this.serialize(), // Serializes form data in standard format
        function(data) {
          if (data.Error){
            alert(data.Error)
            document.location.reload();
          }
          else
            document.location.href = "/book";
        },
        "json" // The format the response should be in
    );
  })
})