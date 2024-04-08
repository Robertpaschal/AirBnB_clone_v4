window.addEventListener('DOMContentloaded', function () {
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

  const selectedAmenities = [];
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

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (response) {
      $('section.places').empty();
      $.each(response, function (index, place) {
        const article = $('<article>');
        const titleBox = $('<div class="title_box">');
        titleBox.append('<h2>' + place.name + '</h2>');
        titleBox.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
        article.append(titleBox);

        const information = $('<div class="information">');
        information.append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>');
        information.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
        information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
        information.append('<div class-"number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>');
        article.append(information);

        const description = $('<div class="description">').html(place.description);
        article.append(description);

        $('section.places').append(article);
      });
    }
  });
});
