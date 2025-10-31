$(function()
{
    const IMAGES = 
    {
      "Budapest":   ["budapest1.jpg","budapest2.jpg"],
      "Prága":      ["prague1.jpg","prague2.jpg"],
      "Bécs":       ["vienna1.jpg","vienna2.jpg"],
      "Krakkó":     ["krakow1.jpg","krakow2.jpg"],
      "Párizs":     ["paris1.jpg"],
      "Róma":       ["rome1.jpg"],
      "Amszterdam": ["amsterdam1.jpg"],
      "Barcelona":  ["barcelona1.jpg"],
      "Koppenhága": ["copenhagen1.jpg"]
    };
  
    const QUOTES = 
    [
      "„Az utazás megtanít arra, hogy mennyire kevésre van igazán szükségünk.” — ismeretlen",
      "„A világ egy könyv, és aki nem utazik, az csak egyetlen oldalt olvas el.” — Szent Ágoston",
      "„Nem az számít, hova mész, hanem hogy mit látsz.” — Henry David Thoreau",
      "„Az utazás az egyetlen dolog, amit megveszel, mégis gazdagabbá tesz.” — ismeretlen",
      "„Élj úgy, mintha holnap meghalnál. Utazz úgy, mintha örökké élnél.” — ismeretlen",
      "„A távolság perspektívát ad.” — ismeretlen"
    ];
  
    const TIPS = 
    [
      "Aranyóra: napkelte után/napnyugta előtt fotózz a legszebb fényekért.",
      "Vigyél mindig újratölthető kulacsot és egy kis harapnivalót.",
      "Offline térkép letöltése = megnyugtató biztonsági háló.",
      "Válassz központi szállást: időt és pénzt spórolsz közlekedésen.",
      "Ha lehet, hétköznap látogasd a népszerű helyeket."
    ];
  
    const $backdrop = $("#backdrop");
    const $cityOut  = $("#cityOut");
    const $quoteBox = $("#quoteBox");
    const $tipOut   = $("#tipOut");
    const $chipList = $("#chipList");
  
    const cities = Object.keys(IMAGES);
  
    cities.forEach(c => 
      {
      const chip = $(`<label><input type="radio" name="chipCity" value="${c}"><span>${c}</span></label>`);
      chip.on("click", () => setInspiration(c));
      $chipList.append(chip);
    });
  
    const randOf = arr => arr[Math.floor(Math.random()*arr.length)];
  
    function setInspiration(city)
    {
      const pickCity = city || randOf(cities);
      const img = randOf(IMAGES[pickCity]) || "";
      $cityOut.text(pickCity);
  
      $quoteBox.text(randOf(QUOTES));
      $tipOut.text(randOf(TIPS));
  
      if(img)
      {
        $backdrop.css("background-image", `url('${img}')`);
      }
      else
      {
        $backdrop.css("background-image", "none");
      }
  
      $backdrop.stop(true,true).css("transform","scale(1.08)").animate({opacity:1}, 200, () => {
        $backdrop.css("transform","scale(1.06)");
      });
    }
  
    $("#newInspo").on("click", () => setInspiration());
    $("#autoPlay").on("change", function()
    {
      if(this.checked)
      {
        window.inspoTimer = setInterval(setInspiration, 6000);
      }
      else
      {
        clearInterval(window.inspoTimer);
      }
    });
  
    $("#hero").on("mousemove", function(e)
    {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top)  / rect.height - .5;
      $backdrop.css("transform", `scale(1.08) translate(${x*8}px, ${y*6}px)`);
    }).on("mouseleave", function()
    {
      $backdrop.css("transform","scale(1.06) translate(0,0)");
    });
  
    setInspiration();
  });
  