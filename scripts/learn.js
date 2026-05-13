var srcs = ["S1S2_Apex", "S1S2_Base", "S3", "S4", "Mechanical_Valve", "Murmur", "Friction_Rub"];
	
	  var maxVolume = 0.8;
	  var volume = maxVolume;
	  var target = {x: 270, y: 270};
	  var maxDist = 80;
	  var audioobj;
	
	  var debug;
	  var events = 'abort,canplay,canplaythrough,durationchange,emptied,ended,error,loadeddata,loadedmetadata,loadstart,pause,play,playing,progress,ratechange,seeked,seeking,stalled,suspend,timeupdate,volumechange,waiting'.split(',');
	
	  $(document).ready(function(){
		  Init();
	  });
	  
	  function Init() {
	    // assign audio obj
	    audioobj = $('#audio').get()[0];
		audioobj.autoplay = false;
	
	    // create buttons
	    CreateBtns();
	
	    // events
	    $("#img").mousemove(function( e ) {
	      	var pos = {x: e.pageX , y: e.pageY};
	      	GetDistance(pos);
	      	e.preventDefault();
	    });
	  
	  }
	  
	  function CreateBtns() {
	    for (var i = 0 ; i < srcs.length ; i ++ ) {
	      var label = ParseTxt(srcs[i]);
	      var $btn = $('<button/>', {
	        text: label,
	        id: i,
	        class: 'btn btn-large',
	        click: function (e) {
	            $("button").removeClass('btn-primary');
	            PlayAudio(this.id, this);
	            $(e.target).addClass('btn-primary');
	          }
	      });
	
	      $('#btns').append($btn);
	
	    }
	
	    $("button").css("-webkit-user-select", "none");
	
	  }
	
	  function ParseTxt(s) {
	    var splitTxt = s.replace("_", " ");
	    return splitTxt;
	
	  }
	  function GetDistance(pos) {
	    var dx = (target.x - pos.x) * (target.x - pos.x);
	    var dy =  (target.y - pos.y) *  (target.y - pos.y);
	    var d = Math.sqrt(dx + dy);
	
	    if (d > 70) {
	      	audioobj.pause();
	      	$("#img").addClass("nostetho");
			$("#img").removeClass("stetho");
	    }else{
	    	audioobj.play();
	    	$("#img").removeClass("nostetho");
			$("#img").addClass("stetho");
	    }
		  
	  }
	
	  function PlayAudio(i){
	    var srcurl = "assets/" + srcs[i];
	    
	    srcurl += (audioobj.canPlayType('audio/ogg') === "")? ".m4a":".ogg";
	    
	    audioobj.src = srcurl;
	    audioobj.pause();
	    audioobj.load();
		//$('#debug').html(audioobj.src);
	  }