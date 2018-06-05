$(document).ready(function() {
  if ($('#datetime') && $('#datetime').length > 0)
    $('#datetime').datetimepicker({format: 'yyyy-mm-dd hh:ii'});
  if ($('#empservice') && $('#empservice').length > 0){
    console.log('empservice');
    $('#empservice').chosen({});
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
})