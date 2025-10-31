$(function () {
  const $cards = $("#cards");
  const $search = $("#searchInput");
  const $country = $("#countryFilter");
  const $reset = $("#resetBtn");
  let data = { cities: [] };

  // Egyszerű placeholder, ha egy kép nem létezne
  const PLACEHOLDER = 'data:image/svg+xml;utf8,' +
    encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">' +
      '<rect width="100%" height="100%" fill="#e5e7eb"/>' +
      '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6b7280" font-size="24">Kép nem elérhető</text>' +
      '</svg>');

  // ékezet- és kisbetű-független összehasonlításhoz
  const norm = s => (s || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // diakritikák törlése

  // JSON betöltése (a fájl legyen ugyanabban a mappában)
  $.getJSON("cities.json")
    .done(json => {
      data = json || { cities: [] };

      // Országok a lenyílóhoz (a 4 városhoz illesztve is működik)
      const countries = [...new Set(data.cities.map(c => c.country))].sort();
      countries.forEach(c => $country.append(`<option value="${c}">${c}</option>`));

      render();
      $(".city-card").hide().each(function(i){ $(this).delay(70*i).fadeIn(220); });
    })
    .fail(() => {
      $cards.html('<p class="empty">Nem sikerült betölteni a városokat. Futtasd helyi webszerverről (pl. XAMPP, Live Server).</p>');
    });

  function render() {
    const q = norm($search.val());
    const f = $country.val() || "";

    const list = data.cities.filter(c =>
      (!q || norm(c.name).includes(q)) &&
      (!f || c.country === f)
    );

    $cards.empty();

    if (list.length === 0) {
      $cards.html('<div class="empty">Nincs találat a megadott szűrők alapján.</div>');
      return;
    }

    list.forEach(city => {
      const $card = $(`
        <article class="city-card">
          <img src="${city.image}" alt="${city.name}">
          <div class="content">
            <h3>${city.name}</h3>
            <span class="badge">${city.country}</span>
            <p>${city.description}</p>
          </div>
          <div class="more">
            <button type="button" aria-expanded="false">További infó</button>
          </div>
          <div class="details" aria-hidden="true">
            <p>${city.details}</p>
          </div>
        </article>
      `);

      // Ha nincs meg a kép, tegyen placeholdert
      $card.find("img").on("error", function(){ $(this).attr("src", PLACEHOLDER); });

      $cards.append($card);
    });
  }

  // Interakciók
  $search.on("input", render);
  $country.on("change", render);
  $reset.on("click", function(){
    $search.val("");
    $country.val("");
    render();
    $("html, body").animate({scrollTop:0}, 300);
  });

  // Lenyitható rész
  $cards.on("click", ".more button", function(){
    const $btn = $(this);
    const $details = $btn.closest(".city-card").find(".details");
    $details.stop(true, true).slideToggle(180);
    const expanded = $btn.attr("aria-expanded") === "true";
    $btn.attr("aria-expanded", !expanded);
    $details.attr("aria-hidden", expanded);
  });
});
