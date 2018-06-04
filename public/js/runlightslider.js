$(document).ready(function() {
	$("#lightSlider").lightSlider({
	  gallery: true,
	  item: 1,
	  loop: true,
	  slideMargin: 0,
	  thumbItem: 9
	});

	$('.drag-wrapper img').on('click', function() {
			$('.enlargeImageModalSource').attr('src', $(this).attr('src'));
			$('#enlargeImageModal').modal('show');
		});

})