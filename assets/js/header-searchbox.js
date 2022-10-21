document.querySelector('.navbar > .header-search .header-search-btn').addEventListener('click', function () {
    if (document.querySelector('.navbar.active-search') != null)
        redirectToAdvSearch(document.querySelector('.navbar > .header-search .header-search-textbox').value);
});

/*
document.querySelector('.navbar > .header-search .advanced-search').addEventListener('click', function () {
        redirectToAdvSearch(document.querySelector('.navbar > .header-search .header-search-textbox').value);
});



document.querySelector('.navbar > .header-search .header-search-textbox').addEventListener('keyup', function () {
    if (event.keyCode === 13) {
        redirectToAdvSearch(this.value);
    }
});
*/

document.querySelector('#header-search-input').addEventListener('keyup', function () {
	
		 var value= event.target.value; 
        if (event.keyCode != 8 && event.keyCode != 9 && event.keyCode != 37 && event.keyCode != 13
        && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40 && event.keyCode != 20 ){
             mainHeaderSearch(document.documentElement.lang,value);
        }else if(event.keyCode == 13){
            window.location.href = "/wps/portal/snp/pages/Search?q=" + value;
        } else  if (event.keyCode === 27 && document.querySelector('.navbar.active-search') != null) {
        deactivateSearch();
		}
        
});

/*
document.addEventListener('keyup', function () {
    if (event.keyCode === 27 && document.querySelector('.navbar.active-search') != null) {
        deactivateSearch();
    }
});
*/
document.querySelector('.header-search-btn').addEventListener('click', function () {
	if(document.querySelector('.autocomplete-items') !== null){
     document.querySelector('.autocomplete-items').classList.add('d-none');
	}
	activateSearch();
});

document.querySelector('.header-search-closure-btn').addEventListener('click', function () {
    deactivateSearch();
});

document.querySelector('.navbar > .modal-backdrop').addEventListener('click', function () {
    deactivateSearch();
});

document.querySelector('.navbar > .header-search .header-search-clear-btn').addEventListener('click', function () {
    document.querySelector('.navbar > .header-search .header-search-textbox').value = "";
    document.querySelector('.navbar > .header-search .header-search-clear-btn').classList.add('d-none');
});

document.querySelector('.navbar > .header-search .header-search-textbox').addEventListener('input', function () {
    toggleSearchClear();
});

function redirectToAdvSearch(keyword) {
    window.location.href = "/wps/portal/snp/pages/Search?q=" + keyword;
}

function activateSearch() {
    $('#navbarSupportedContent').collapse('hide');
    if (!document.querySelector('.navbar').classList.contains('active-search')) {
        toggleSearch();
        document.querySelector('.navbar > .header-search .header-search-textbox').focus();
    }
   // document.querySelector('.advanced-search').classList.remove('d-none');
   // document.querySelector('.header-search > div').classList.toggle('pt-4');

}

function deactivateSearch() {
    if (document.querySelector('.navbar').classList.contains('active-search')) {
        toggleSearch();
	   document.querySelector('.navbar > .header-search .header-search-textbox').value ="";
     document.querySelector('.header-search .header-search-clear-btn').classList.add('d-none');
		 if(document.querySelector('.autocomplete-items') !== null){
		 document.querySelector("#search-input").value ="";
         document.querySelector('.autocomplete-items').classList.add('d-none');
		
	   }
    }
}

function toggleSearch() {
    // document.body.classList.toggle('modal-open'); //MDB overwrite it
    document.body.classList.toggle('no-overflow');
    document.querySelector('.navbar > .modal-backdrop').classList.toggle('d-none');
    document.querySelector('.navbar > .modal-backdrop').classList.toggle('show');
    document.querySelector('.navbar').classList.toggle('active-search');
    document.querySelector('.header-search').classList.toggle('mx-1');
    document.querySelector('.header-search').children[0].classList.toggle('input-group');
    document.querySelector('.header-search .header-search-closure-btn').classList.toggle('d-none');
    //document.querySelector('.advanced-search').classList.toggle('d-none');
    //document.querySelector('.header-search > div').classList.remove('pt-4');
    toggleSearchClear();
}

function toggleSearchClear() {
    if (document.querySelector('.navbar > .header-search .header-search-textbox').value == "")
        document.querySelector('.navbar > .header-search .header-search-clear-btn').classList.add('d-none');
    else
        document.querySelector('.navbar > .header-search .header-search-clear-btn').classList.remove('d-none');
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
function mainHeaderSearch(lang,val) {
    var Keyword = val;

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
						
					   autocomplete1(document.getElementById("header-search-input"), wlen);
                    } 
                },
                dataType: 'jsonp',
                jsonp: 'json.wrf'
            });
	
    } 
	
}
function autocomplete1(inp, arr) {
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
      a.setAttribute("class", "autocomplete-items-header");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
     // if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
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
	   window.location.href = "/wps/portal/snp/pages/Search?q="+$("#header-search-input").val().trim();
		
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
      document.getElementById("header-search-input").value=valInput;
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
    var x = document.getElementsByClassName("autocomplete-items-header");
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
   
  $(document).ready(function () {
  document.querySelector('#search-input').addEventListener('input', function () {
    document.querySelector('.autocomplete-items').classList.remove('d-none');
});
  }); 
/*$('body').on('click','.serch-results-icon',function(){
	
   var valInput= $(this).parent().prev().text();
   $("#header-search-input").val(valInput);
}); */