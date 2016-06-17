function slide() {
    var personel_info = document.getElementById('personel-info');
    var personel_info_list = document.getElementById('personel-info-list');
    var delay = 0;


    if (personel_info.className == "personel-info visible") {
        personel_info.className = "personel-info";
        $('.item:lt(5)').each(function() {
            $(this).animate({
                opacity: 0
            });
        });
    } else {
        personel_info.className = "personel-info visible";
        $('.item:lt(5)').each(function() {
            //^^ do for every instance less than the 16th (starting at 0)
            $(this).delay(delay).animate({
                opacity: 1
            }, 500);
            delay += 500;
        });
    }
}

$(document).ready(function() {
    /* Every time the window is scrolled ... */
    $(window).scroll(function() {
        /* Check the location of each desired element */
        $('.hideme').each(function(i) {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight() - 100;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            /* If the object is completely visible in the window, fade it it */
            if (bottom_of_window > bottom_of_object) {
                $(this).addClass('in-view');
            } else {
                $(this).removeClass('in-view');
            }
        });
    });
    $(window).trigger('scroll');

    $.scrollify({
      section : "section,footer",
      sectionName : "",
      interstitialSection : "",
      easing: "easeOutExpo",
      scrollSpeed: 1000,
      offset : 0,
      scrollbars: true,
      standardScrollElements: "",
      setHeights: false,
      before:function() {},
      after:function() {},
      afterResize:function() {},
      afterRender:function() {}
    });
});
