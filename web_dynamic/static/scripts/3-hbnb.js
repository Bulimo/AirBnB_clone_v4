/* global $ */

$(document).ready(function () {
    // Initialize an empty dictionary to store Amenity IDs
    const amenityIds = {};

    // Function to update the h4 tag with the list of Amenities checked
    function updateAmenitiesList() {
        const checkedAmenities = Object.values(amenityIds);
        const amenitiesList = checkedAmenities.join(', ');

        // Update the h4 tag inside the div Amenities
        $('div.amenities h4').text(amenitiesList);
    }

    // Function to check the API status and update the div#api_status
    function checkApiStatus() {
        $.get('http://0.0.0.0:5001/api/v1/status', function (data) {
            if (data.status === 'OK') {
                // If the API status is "OK," add the class "available" to the div#api_status
                $('#api_status').addClass('available');
            } else {
                // If the API status is not "OK," remove the class "available" from the div#api_status
                $('#api_status').removeClass('available');
            }
        });
    }

    // Call the checkApiStatus function when the page loads
    checkApiStatus();

    // Listen for changes on each input checkbox tag
    $('input[type=checkbox]').change(function () {
        const amenityId = $(this).parent('li').data('id');
        const amenityName = $(this).parent('li').data('name');

        if (this.checked) {
            // If the checkbox is checked, store the Amenity ID in the dictionary
            amenityIds[amenityId] = amenityName;
        } else {
            // If the checkbox is unchecked, remove the Amenity ID from the dictionary
            delete amenityIds[amenityId];
        }

        // Update the h4 tag with the list of Amenities checked
        updateAmenitiesList();
    });

    // Function to create and append an article element for a place
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        data: '{}',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let place = data[i];
                $('.places').append(`
          <article>
            <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">
                  <p>$${place.price_by_night}</p>
                </div>
            </div>
            <div class="information">
              <div class="max_guest">
                ${place.max_guest} Guest(s)
              </div>
              <div class="number_rooms">
                ${place.number_rooms} Bedroom(s)
              </div>
              <div class="number_bathrooms">
                ${place.number_rooms} Bathroom(s)
              </div>
            </div>
            <div class="description">
              <p>${place.description}</p>
            </div>
          </article>
        `);
            }
        }
    });
});