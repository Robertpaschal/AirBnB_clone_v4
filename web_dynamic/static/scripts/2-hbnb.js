$(document).ready(function () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: function (response) {
      if (response.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  let selectedAmenities = [];
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).prop('checked')) {
      selectedAmenities.push({ id: amenityId, name: amenityName });
    } else {
      selectedAmenities = selectedAmenities.filter(function (amenity) {
        return amenity.id !== amenityId;
      });
    }

    const amenitiesList = selectedAmenities.map(function (amenity) {
      return amenity.name;
    }).join(', ');

    $('#amenities h4').text('Selected Amenities: ' + amenitiesList);
  });
});
