$(document).foundation();

//hide page content
$('body').css('display', 'none');

$(document).ready(function(){
    //fix orbit issue of images not showing on load.
    //fade in page when loaded
    $('body').fadeIn(400, resize);
    function resize(){
        $(window).trigger('resize');
    }

    $('a.link').click(function(event) {
            // stop the default link behavior
            event.preventDefault();
            //grab the link from 'this' href
            newLocation = this.href;
            $('body').fadeOut(400, newpage);
    });

    function newpage() {
        window.location = newLocation;
    }
    //menu fadein
    $('#menu-icon').click(function(event){
            event.preventDefault();
            $(this).toggleClass('active');
            $('#menu').toggleClass('trigger');
    });

        //Check that we are not on mobile and if not then add class 'parallax' to header
        if($(window).width() > 481){
            $('#page-header').addClass('parallax');
        }
        //Parallax bg
        var parallaxBg = $('.parallax');
        $(document).on('scroll', function(){
            var currScrollPos = $(document).scrollTop();
            parallaxBg.css('background-position', '0 ' + -currScrollPos/4 + 'px');
        });

    //workpage sidebar links
    $('ul.sidebar-subnav:first').slideDown();
    $('ul.sidebar-subnav > li a:first').addClass('active');

    $('ul#sidebar-links > li > a').click(function(e){

        e.preventDefault();
        $('ul#sidebar-links li a').removeClass('active');
        $(this).addClass('active');

        $('ul.sidebar-subnav').slideUp();
        // CHeck to see if there us a child UL
         if( $(this).has('ul.sidebar-subnav') ){
                var selectedLink = $(this).next('ul.sidebar-subnav');

                //Check to see if subnav is currently open
                if(selectedLink.is(":hidden")){
                    $('ul.sidebar-subnav').slideUp();
                    selectedLink.slideDown();
                } else {
                    selectedLink.slideUp();
                }
         }
    });

     $('#sidebar-links a').click(function(){
            // add active class
            $('.sidebar-subnav a').removeClass('active');
            $(this).addClass('active');

            // Grab href att
            var link = $(this).attr('href').replace('#', '');

            // load content via ajax
            $.ajax({
                method: 'GET',
                url: link+'.html',
                beforeSend: function(){
                    $('#work-content').html('').hide();
                    $('#work-content').addClass('loading');
                },
                success: function(data){
                    $('#work-content').html(data);
                    $(document).foundation();
                    $('#work-content').fadeIn();
                },
                error: function(){
                    $('#work-content').html('<p>Sorry there was an error</p>');
                },
                complete: function(){
                    $('#work-content').removeClass('loading');
                }
            });
     });

     var email_add = "";
        $("#launch-equiry").click(function(e){
            e.preventDefault();
            email_add = $("input#email_add").val();
            if(email_add != "" && email_add.indexOf("@")>-1){
                    localStorage.setItem('email_address', email_add);

                    window.location.href = 'contact.html';
                    return false;
            } else {
                $('#error-warning').fadeIn();
            }
        });

    if(localStorage.getItem('email_address')) {
      $('#_replyto').val(localStorage.getItem('email_address'));
    }
    $('#contact-form #send-btn').click(function(){
        localStorage.clear();
    });

    $("#contact-form").validate();
});

