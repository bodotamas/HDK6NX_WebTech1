$(function() 
{
  const $lightbox = $('#lightbox');
  const $img = $('#lbImg');

  $('.gallery img').on('click', function() 
  {
    $img.attr('src', $(this).attr('src'));
    $lightbox.fadeIn(200).attr('aria-hidden', 'false');
  });

  $('#closeLb').on('click', function() 
  {
    $lightbox.fadeOut(200).attr('aria-hidden', 'true');
  });

  $lightbox.on('click', function(e) 
  {
    if (e.target === this) $lightbox.fadeOut(200);
  });

  $(document).on('keydown', function(e)
  {
    if(e.key === 'Escape' && $lightbox.is(':visible')) 
    {
      $lightbox.fadeOut(200);
    }
  });
});
