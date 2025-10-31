$(function()
{
    const QUESTIONS = 
    [
      {
        q: "Melyik városban található az Eiffel-torony?",
        choices: ["Párizs","Róma","Barcelona","Amszterdam"],
        a: 0,
        expl: "Az Eiffel-torony Párizs jelképe, 1889 óta áll a Champs de Mars-on."
      },
      {
        q: "Melyik folyó szeli ketté Budapestet?",
        choices: ["Szajna","Duna","Visztula","Temze"],
        a: 1,
        expl: "Budapestet a Duna választja ketté Budára és Pestre."
      },
      {
        q: "Hol találod a Károly hidat?",
        choices: ["Krakkó","Bécs","Prága","Koppenhága"],
        a: 2,
        expl: "A Károly híd Prága egyik leghíresebb látványossága."
      },
      {
        q: "Melyik város híres a Schönbrunn kastélyról?",
        choices: ["Bécs","Barcelona","Amszterdam","Róma"],
        a: 0,
        expl: "A Schönbrunn császári rezidencia Bécsben található."
      },
      {
        q: "Melyik város főtere a Rynek Główny?",
        choices: ["Krakkó","Párizs","Budapest","Róma"],
        a: 0,
        expl: "A krakkói főtér Európa egyik legnagyobb középkori tere."
      },
      {
        q: "Gaudí ikonikus bazilikája a Sagrada Família – melyik városban?",
        choices: ["Barcelona","Róma","Párizs","Koppenhága"],
        a: 0,
        expl: "A Sagrada Família Barcelona egyik jelképe, 1882 óta épül."
      },
      {
        q: "Melyik várost nevezik a csatornák városának a listánkból?",
        choices: ["Amszterdam","Bécs","Prága","Krakkó"],
        a: 0,
        expl: "Amszterdam híres csatornahálózata az UNESCO világörökség része."
      },
      {
        q: "A Colosseum melyik város ókori amfiteátruma?",
        choices: ["Párizs","Róma","Budapest","Bécs"],
        a: 1,
        expl: "A Colosseum Róma ikonikus ókori építménye."
      },
      {
        q: "Nyhavn színes házai melyik skandináv város kikötőjét díszítik?",
        choices: ["Koppenhága","Oslo","Stockholm","Helsinki"],
        a: 0,
        expl: "Nyhavn Koppenhága hangulatos csatornaparti negyede."
      }
    ];
  
    let index = 0, score = 0;
    const bestKey = "travelsnap_best_score";
    const $panel = $("#panel");
    const $bar = $("#bar");
    const $score = $("#score");
    const $best = $("#best");
    const $next = $("#nextBtn");
  
    const best = Number(localStorage.getItem(bestKey) || 0);
    $best.text(best);
  
    function render()
    {
      $next.prop("disabled", true);
  
      if(index >= QUESTIONS.length)
      {
        const msg = score === QUESTIONS.length
          ? "Tökéletes!"
          : score >= 7 ? "Nagyon szép!" : "Megy ez még jobban is";
  
        $panel.html(`
          <h3>Eredmény</h3>
          <p>${msg}</p>
          <p><strong>${score}</strong> / ${QUESTIONS.length} pont</p>
        `);
  
        if(score > best)
        {
          localStorage.setItem(bestKey, String(score));
          $best.text(score);
        }
        $bar.css("width", "100%");
        return;
      }
  
      const q = QUESTIONS[index];
      $bar.css("width", ((index)/QUESTIONS.length*100) + "%");
  
      const answersHtml = q.choices.map((c,i)=>`<button class="answer" data-i="${i}">${c}</button>`).join("");
      $panel.html(`
        <h3>${index+1}. ${q.q}</h3>
        <div class="answers">${answersHtml}</div>
        <div class="expl" style="display:none"></div>
      `);
    }
  
    $panel.on("click", ".answer", function()
    {
      const q = QUESTIONS[index];
      const pick = Number($(this).data("i"));
      const $buttons = $panel.find(".answer");
      $buttons.prop("disabled", true);
  
      if(pick === q.a)
      {
        $(this).addClass("correct");
        score++;
        $score.text(score);
      }
      else
      {
        $(this).addClass("wrong");
        $buttons.eq(q.a).addClass("correct");
      }
  
      $panel.find(".expl").html(q.expl).slideDown(150);
      $next.prop("disabled", false);
    });
  
    $next.on("click", function()
    {
      index++;
      render();
    });
  
    $("#restartBtn").on("click", function()
    {
      index = 0; score = 0; $score.text(score);
      render();
    });
  
    render();
  });
  