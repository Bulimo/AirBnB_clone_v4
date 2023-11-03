/* global $ */

$(document).ready(function () {
  // Initialize an empty dictionary to store Amenity IDs
  const amenityIds = {};

  // Function to update the h4 tag with the list of Amenities checked
  function updateAmenitiesList () {
    const checkedAmenities = Object.values(amenityIds);
    const amenitiesList = checkedAmenities.join(', ');

    // Update the h4 tag inside the div Amenities
    $('div.amenities h4').text(amenitiesList);
  }

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
});
