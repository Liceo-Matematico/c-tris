$(document).ready(function () {
  $("#abbandona").on("click", function () {
    window.location.href = "/";
  });

  if (
    $(location).attr("pathname") == "/lobby" ||
    $(location).attr("pathname") == "/lobby.html"
  ) {
    //lobby.html
    var infoParams = new URLSearchParams($(location).attr("search"));
    var nome = infoParams.get("username");
    // console.log(nome)
    $("#username").text("Ciao " + nome);
  } else if (
    $(location).attr("pathname") == "/partita" ||
    $(location).attr("pathname") == "/partita.html"
  ) {
    //partita.html
    // mostraValore();
    console.log('programma partito')
    newCard();
    setTimeout(() => {
      $(".faccia").hide();
    }, 1000)
          // $(".dorso").css("backface-visibility", "hidden");
    setTimeout(() => {
      $(".faccia").show();
      newCard();
    }, 2000)
    

    function newCard() {
      var valori = ["1", "-1", "i", "-i"];

      if ($("#carta1").css("display") == "none") {
        console.log("sono entrato nel primo if")
        var valore = valori[Math.floor(Math.random() * valori.length)];
        console.log("valore casuale: " + valore);
        var cartaMazzo = $(".carta.faccia");
        $(cartaMazzo).html(valore);
        $("#carta1").html(valore);
        $(".inner").css("transform", "rotateY(-180deg)");
        setTimeout(() => {
        $(".dorso").css("backface-visibility", "visible");
        $(".faccia").hide();
          $("#carta1").show();
        }, 1000)
        $(".faccia").show();
        $(".dorso").css("backface-visibility", "hidden");
        
      } else if ($("#carta2").css("display") == "none") {
        console.log("sono entrato nel secondo if")
          var valore = valori[Math.floor(Math.random() * valori.length)];
          console.log("valore casuale: " + valore);
          var cartaMazzo = $(".carta.faccia");
          $(cartaMazzo).html(valore);
          $("#carta2").html(valore);
          $(".inner").css("transform", "rotateY(-180deg)");
          setTimeout(() => {
          $(".dorso").css("backface-visibility", "visible");
          $(".faccia").hide();
          $("#carta2").show();
        }, 1000)
          $(".faccia").show();
          $(".dorso").css("backface-visibility", "hidden");
  }
    }

    
    // var coperta = $('[coperta="true"]');
    // coperta.on("click", function () {
    //   console.log("hai cliccato una carta coperta");
    //   // console.log(this)
    //   $(this).attr("coperta", "false");
    //   // console.log($(this).attr('coperta'))
    //   mostraValore();
    //   drag();
    // });

    // function mostraValore() {
    //   for (carta of carte) {
    //     // console.log(carta)
    //     if ($(carta).attr("coperta") == "true") {
    //       $(carta).html(
    //         '<img src="carta da gioco.png" style="max-height: 40px; text-align: center;">',
    //       );
    //     } else {
    //       // console.log($(carta).attr('value'))
    //       $(carta).html($(carta).attr("value"));
    //     }
    //   }
    // }

    // mostraValore();
    
    drag();

    function drag() {
      
    var carta = $(".tappetino").find(".carta");
      carta.attr("draggable", "true");
      carta.on({
        dragstart: function (e) {
          dropped = false;
          $(this).hide(60);
          console.log("drag iniziato");
          dragItem = $(this);
        },
        dragend: function (e) {
          if (!dropped) {
            $(this).show();
          }
          console.log("drag terminato");
          dragItem = null;
        },
      });
      $("td").on({
        dragover: function (e) {
          e.preventDefault();
          console.log("drag over");
        },
        dragleave: function (e) {
          console.log("drag leave");
        },
        dragenter: function (e) {
          console.log("drag enter");
        },
        drop: function (e) {
          // e.preventDefault();
          e.stopImmediatePropagation();
          console.log("drop");
          dropped = true;
          var valStart = $(dragItem).html();
          console.log("cella: ", `${$(this).html()}`);
          console.log("carta: ", `${valStart}`);
          $(this).html(
            regole(`${$(this).html()}`, `${dragItem.html()}`),
          );
          newCard();

          console.log(tableToJson());
          arrayToTable(tableToJson().field);
        },
      });
    }
    // regole
    function regole(primo, secondo) {
      var risultato = 0;
      var regole = {
        uno: [
          ["1", "1"],
          ["-1", "-1"],
          ["i", "-i"],
          ["-i", "i"],
        ],
        _uno: [
          ["-1", "1"],
          ["1", "-1"],
          ["i", "i"],
          ["-i", "-i"],
        ],
        i: [
          ["1", "i"],
          ["i", "1"],
          ["-i", "-1"],
          ["-1", "-i"],
        ],
        _i: [
          ["-1", "i"],
          ["i", "-1"],
          ["-i", "1"],
          ["1", "-i"],
        ],
      };
      for (j = 0; j < 4; j++) {
        // console.log((j + 1) + '° attributo: ' + regole.i[j])
        if ([primo, secondo] == `${regole.uno[j]}`) {
          console.log([primo, secondo]);
          risultato = 1;
          break;
        } else if ([primo, secondo] == `${regole._uno[j]}`) {
          console.log([primo, secondo]);
          risultato = -1;
          break;
        } else if ([primo, secondo] == `${regole.i[j]}`) {
          console.log([primo, secondo]);
          risultato = "i";
          break;
        } else if ([primo, secondo] == `${regole._i[j]}`) {
          console.log([primo, secondo]);
          risultato = "-i";
          break;
        }
      }
      console.log("risultato: ", risultato);
      return risultato;
    }
    function tableToJson() {
      var field = [];
      var rows = $("tr");
      for (var i = 0; i < rows.length; i++) {
        var row = [],
          cols = $("td");
        for (var j = i * 3; j < i * 3 + 3; j++) {
          row.push($(cols[j]).html());
        }
        field.push(row);
      }
      return { field };
    }
    function arrayToTable(field) {
      $("#campo").empty();
      var table = $("#campo");
      var row, cell;

      body = $("<tbody />");
      table.append(body);

      for (var i = 0; i < field.length; i++) {
        row = $("<tr />");
        table.append(row);
        for (var j = 0; j < field[i].length; j++) {
          cell = $("<td>" + field[i][j] + "</td>");
          row.append(cell);
        }
      }
      drag();
    }

    var percentuale = 30;
    setInterval(function () {
      var interno = $("#interno");
      interno.css("width", percentuale * (10 / 3) + "%");
      interno.html(percentuale-- + "s");
      if (percentuale < 0) percentuale = 30;
    }, 1000);
  }
});
