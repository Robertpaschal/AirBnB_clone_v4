$(document).ready(function () {
  let selectedAmenities = [];

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).prop('checked')) {
      selectedAmenities.push({ id: amenityId, name: amenityNam });
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
