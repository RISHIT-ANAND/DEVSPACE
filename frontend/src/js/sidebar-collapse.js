$('[data-toggle="collapse"]').on('click', function () {
  $('.drawer .sidebar-menu .open').removeClass('open');
  $(this).parent().toggleClass('open');
  $(this).next('collapse').toggleClass('show');
});