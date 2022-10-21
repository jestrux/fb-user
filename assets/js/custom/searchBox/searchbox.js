function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus = -1;
     
  /*execute a function when someone writes in the text field:*/
  
  inp.addEventListener("input", function(e) {
      var a, b, c ,d ,i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
    //  if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          d= b = document.createElement("Div");
          d.setAttribute("class", "row mx-0");

          b = document.createElement("DIV");
          b.setAttribute("class", "autocomplete-list-item col-10");
          /*make the matching letters bold:*/
          b.innerHTML =  arr[i].substr(0, val.length) ;
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
     
          c=document.createElement("Div");  
          c.setAttribute("class", "col-2");
          c.innerHTML += "<i class='fa fa-external-link-square serch-results-icon pt-1'></i>"       
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              var currentValue = this.getElementsByTagName("input")[0].value;
              window.location.href = "/wps/portal/snp/pages/Search?q=" + currentValue;
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(d);
          d.appendChild(b);
          d.appendChild(c);
       // }
      }
  });

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByClassName("row");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
		//console.log("currentFocus ---"+currentFocus);
		//console.log("x length --"+x.length);
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
       // e.preventDefault();
	   window.location.href = "/wps/portal/snp/pages/Search?q="+$("#home-hero-search").val().trim();
		
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
   // if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
	//console.log(currentFocus);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
	  var valInput = document.getElementsByClassName("autocomplete-active")[0].innerText;
      document.getElementById("home-hero-search").value=valInput;
   
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}
  

	function mainPageSearch(lang ,value) {
    var Keyword = value;
    var URL_PREFIX = "/solr/services_" + lang + "/suggest?suggest.build=true&suggest.q=";
    if (Keyword.length != 0) {
        var URL = URL_PREFIX + Keyword ;
		console.log(URL);
           $.ajax({ 
                url: URL,
                success: function (data) {
                    var docs = JSON.stringify(data.suggest.textSuggester);
				    docs=docs.replace(Keyword,"abc");
				    var jsonData = JSON.parse(docs);
					var wlen =jsonData.abc.suggestions;
					wlen = wlen.map(a=>a.term).filter(s=> s.includes(Keyword));
					console.log("wlen -->"+wlen);
				    var docs1 = JSON.stringify(data.suggest.serviceSuggester); 
					docs1=docs1.replace(Keyword,"abc");
				    var jsonData1 = JSON.parse(docs1);
					var slen =jsonData1.abc.suggestions;
					slen = slen.map(a => a.term);
					Array.prototype.push.apply(wlen,slen)
					
                    if (wlen.length >0) {
						
						console.log("beore remove duplicates " +wlen);
						wlen =removeDuplicates(wlen);
						console.log(wlen);
					   autocomplete(document.getElementById("home-hero-search"), wlen);
                    } 
                },
                dataType: 'jsonp',
                jsonp: 'json.wrf'
            });
    } 
	
}

function removeDuplicates(array){
	 var outputArray = []; 
          var count = 0; 
         var start = false; 
        for (j = 0; j < array.length; j++) { 
            for (k = 0; k < outputArray.length; k++) { 
                if ( array[j].toLowerCase() == outputArray[k].toLowerCase() ) { 
                    start = true; 
                } 
            } 
            count++; 
            if (count == 1 && start == false) { 
                outputArray.push(array[j]); 
            } 
            start = false; 
            count = 0; 
        } 
	return outputArray;
}

$('body').on('click','.serch-results-icon',function(){
   var valInput= $(this).parent().prev().text();
   $("#home-hero-search").val(valInput);
});

$(document).ready(function () {
//change icon
/*$('#home-hero-search').on('input', function () {
    if ($('#home-hero-search').val() == '') {
        $('#search-container > button').removeClass('cross');
        $('#search-container > button').addClass('magnifier');
    } else {
        $('#search-container > button').addClass('cross');
        $('#search-container > button').removeClass('magnifier');
    }
});



$('.btn-unstyle').click(function () {
    if ($(this).attr('class').indexOf('cross') != -1) {
        $('#home-hero-search').val('');
        $('#search-container-results').css("display", "none");
        $('#search-container > button').removeClass('cross');
        $('#search-container > button').addClass('magnifier');
        $('.advanced-search-home-page').removeClass('d-none');
    }else{
		redirectToAdvSearch(document.querySelector('#home-hero-search').value);
	}
});*/
$('.btn-unstyle').click(function () {
   
		redirectToAdvSearch(document.querySelector('#home-hero-search').value);
	
});

}); 


//on click remove text  
function redirectToAdvSearch(keyword) {
    window.location.href = "/wps/portal/snp/pages/Search?q=" + keyword;
} 