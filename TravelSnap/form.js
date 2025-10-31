$(function()
{
  const $form   = $("#contactForm");
  const $thanks = $("#thanks");

  function setError($el, show, msg)
  {
    const $row = $el.closest(".row");
    $el.toggleClass("invalid", show);
    $row.find(".error").text(msg || $row.find(".error").text()).toggle(show);
  }

  function isPast(dateStr)
  {
    if(!dateStr) return false;
    const d = new Date(dateStr);
    const today = new Date(); today.setHours(0,0,0,0);
    return d < today;
  }

  const $date = $("#date");
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth()+1).padStart(2,"0");
  const day = String(today.getDate()).padStart(2,"0");
  $date.attr("min", `${y}-${m}-${day}`);

  $("#theme").on("input", function()
  {
    document.querySelector(".site-header").style.background = this.value;
  });

  $form.on("submit", function(e)
  {
    e.preventDefault();

    const $name  = $("#name");
    const $email = $("#email");
    const $date  = $("#date");

    let ok = true;

    if(!$name.val().trim())
    {
      setError($name, true, "Add meg a neved!");
      ok = false;
    } else setError($name, false);

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!re.test($email.val().trim()))
    {
      setError($email, true, "Érvényes e-mail címet adj meg!");
      ok = false;
    } else setError($email, false);

    if(isPast($date.val()))
    {
      setError($date, true, "A dátum nem lehet múltbeli.");
      ok = false;
    } else setError($date, false);

    if(!ok) return;

    $thanks.hide().text("Köszönjük! Hamarosan felvesszük veled a kapcsolatot.").fadeIn(200);
    this.reset();
  });

  $form.on("input change", "input, select, textarea", function()
  {
    setError($(this), false);
  });

  $("#bookingBtn").on("click", function()
  {
    const city = $("#bookingCity").val();
    if(!city){ alert("Válassz várost a kereséshez!"); return; }
    const url = "https://www.booking.com/searchresults.html?ss=" + encodeURIComponent(city);
    window.open(url, "_blank");
  });
});
