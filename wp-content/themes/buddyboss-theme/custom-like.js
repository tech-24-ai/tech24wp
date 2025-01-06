// custom-like.js
jQuery(document).ready(function($) {
    $('#like-button').on('click', function(event) {
        event.preventDefault();
        var button = $(this);
        
        // Example AJAX request (customize URL and data as needed)
        $.ajax({
            url: ajaxurl, // WordPress AJAX URL
            type: 'POST',
            data: {
                action: 'handle_like', // Custom action name
                post_id: button.data('post-id') // Pass necessary data
            },
            success: function(response) {
                if (response.success) {
                    // Update button state
                    button.toggleClass('liked');
                    button.text(button.hasClass('liked') ? 'Liked' : 'Like');
                } else {
                    // Handle error
                    alert('Error: ' + response.data.message);
                }
            }
        });
    });
});
