document.querySelector('.toggleChevron').addEventListener('click', function () {
    var contactMenu = document.querySelector('.contactMenu');
    
    // Toggle the display of the contact menu
    if (contactMenu.style.display === 'none' || contactMenu.style.display === '') {
      contactMenu.style.display = 'flex'; // Show the list
    } else {
      contactMenu.style.display = 'none'; // Hide the list
    }
  });