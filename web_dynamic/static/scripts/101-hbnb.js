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

  const selectedAmenities = [];
  let selectedStates = [];
  let selectedCities = [];

  $('input[type="checkbox"]').change(function () {
    const dataType = $(this).data('type');
    const dataId = $(this).data('id');
    const dataName = $(this).data('name');

    if ($(this).prop('checked')) {
      if (dataType === 'state') {
        selectedStates.push({ id: dataId, name: dataName });
      } else if (dataType === 'city') {
        selectedCities.push({ id: dataId, name: dataName });
      }
    } else {
      if (dataType === 'state') {
        selectedStates = selectedStates.filter(function (state) {
          return state.id !== dataId;
        });
      } else if (dataType === 'city') {
        selectedCities = selectedCities.filter(function (city) {
          return city.id !== dataId;
        });
      }
    }

    const statesList = selectedStates.map(function (state) {
      return state.name;
    }).join(', ');

    const citiesList = selectedCities.map(function (city) {
      return city.name;
    }).join(', ');

    $('#locations h4').text('Selected States: ' + statesList + ' | Selected Cities: ' + citiesList);
  });

  $('#search-button').click(function () {
    const selectedAmenitiesIds = selectedAmenities.map(function (amenity) {
      return amenity.id;
    });

    const selectedStatesIds = selectedStates.map(function (state) {
      return state.id;
    });

    const selectedCitiesIds = selectedCities.map(function (city) {
      return city.id;
    });

    const requestData = {
      amenities: selectedAmenitiesIds,
      states: selectedStatesIds,
      cities: selectedCitiesIds
    };

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestData),
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

  $('#toggle-reviews').click(function () {
    const buttonText = $(this).text().trim();
    if (buttonText === 'show') {
      $(this).text('hide');
    } else {
      $(this).text('show');
      $('#reviews-list').empty();
    }
  });
});
