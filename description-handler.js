document.addEventListener('DOMContentLoaded', function() {
    var gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(function(item) {
        item.addEventListener('mouseover', function() {
            var descriptionFile = item.getAttribute('data-description-file');
            fetch(descriptionFile)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Description not found');
                    }
                    return response.text();
                })
                .then(text => {
                    item.querySelector('.grid-item-description').textContent = text;
                    item.querySelector('.grid-item-description').innerHTML = text.replace(/\n/g, '<br>');
                })
                .catch(error => {
                    //console.log(error.message); // Handle the error without showing it to the user
                    item.querySelector('.grid-item-description').textContent = ''; // Clear any previous description
                });
            const title = item.querySelector('.grid-item-title');
            title.style.top = '10px';
            title.style.bottom = 'auto';
        });
        item.addEventListener('mouseout', function() {
            item.querySelector('.grid-item-description').textContent = ''; // Hide the description
            // Move the title back
            const title = item.querySelector('.grid-item-title');
            title.style.top = '';
            title.style.bottom = '10px';
        });
    });
});
