var srcs = [
  "S1S2_Apex",
  "S1S2_Base",
  "S3",
  "S4",
  "Mechanical_Valve",
  "Murmur",
  "Friction_Rub",
];
var defaulttxt =
  "Click <span class='t'>'New Patient'</span>, then touch and hold the patient's chest to listen to the heart sounds. Choose the corresponding condition.";
var listenCount = 0;
var maxVolume = 0.8;
var volume = maxVolume;
var target = { x: 270, y: 270 };
var maxDist = 60;
var audioobj;

$(document).ready(function () {
  // instructions
  $("#info").html(defaulttxt);

  // assign audio obj
  audioobj = $("#audio").get(0);
  audioobj.autoplay = false;

  // create buttons
  CreateBtns();

  // events
  $("#img").mousemove(function (e) {
    var pos = { x: e.pageX, y: e.pageY };
    GetDistance(pos);
    //console.log(pos);
    e.preventDefault();
  });
});

function CreateBtns() {
  for (var i = 0; i < srcs.length; i++) {
    var label = srcs[i].replace("_", " ");
    var $btn = $("<button/>", {
      text: label,
      id: i,
      class: "btn btn-large",
      click: function (e) {
        $("button").removeClass("btn-primary");

        // check answer

        if (listenCount == 1) {
          var file = e.target.innerHTML.replace(" ", "_");
          $(e.target).addClass("btn-primary");

          // correct choice
          if (audioobj.src.search(file) != -1) {
            $("#info").html(
              "<span class='t'>Correct!</span> The Answer is " +
                e.target.innerHTML +
                ". <br><br>Click <span class='t'>'New Patient'</span> to load another file.",
            );
          } else {
            $("#info").html("<b>Incorrect!</b> Try again.");
          }
        } else {
          // user has not listened
          $("#info").html(
            "You must listen to the heart sound before choosing. Touch and hold the patient's chest to listen to the heart sounds.",
          );
        }

        // no audio file chosen yet
        if (
          audioobj.src.search(".m4a") == -1 &&
          audioobj.src.search(".ogg") == -1
        ) {
          console.log(audioobj.src.search(".m4a"));
          $("#info").html(
            "Click <span class='t'>'New Patient'</span> first to load heart sound. ",
          );
          $("button").removeClass("btn-primary");
        }
      },
    });

    $("#btns").append($btn);
  }

  $("button").css("-webkit-user-select", "none");
  //$(".btn-large").css("visibility", "hidden");
}

function GetDistance(pos) {
  var dx = (target.x - pos.x) * (target.x - pos.x);
  var dy = (target.y - pos.y) * (target.y - pos.y);
  var d = Math.sqrt(dx + dy);

  if (d > 100) {
    audioobj.pause();
    $("#img").addClass("nostetho");
    $("#img").removeClass("stetho");
  } else {
    $("#img").removeClass("nostetho");
    $("#img").addClass("stetho");
    audioobj.play();
    listenCount = 1;
  }
}

function PlayAudio() {
  var i = Math.floor(Math.random() * (srcs.length - 1));
  var srcurl = "assets/" + srcs[i];
  srcurl += audioobj.canPlayType("audio/ogg") === "" ? ".m4a" : ".ogg";
  audioobj.src = srcurl;
  audioobj.pause();
  audioobj.load();

  $("#info").html(
    "Touch the patient's chest to listen to the heart sounds, then choose the corresponding condition.",
  );
  $("button").removeClass("btn-primary");

  //reset feedback
  listenCount = 0;
  //$(".btn-large").css("visibility", "visible");
}
