//new WOW().init();

const isRtl = document.getElementsByTagName("html")[0].getAttribute("lang") == 'ar' ? true : false;
const isMobile = window.innerWidth >= 992 ? false : true;
const langUrl = isRtl ? '/ar/' : '/en/';
let langTog = $('.lang-tog a');
$(langTog).on('click', function () {
    if (isRtl)
        window.location.href = window.location.pathname.replace('/ar/', '/en/');
    else
        window.location.href = window.location.pathname.replace('/en/', '/ar/');
});

$(function () {
 /*    setTimeout(function () {
        $(".no-waves").removeClass('waves-effect');
        jarallax(document.querySelectorAll('.jarallax'), {
            speed: 0.7
        });
    }, 1);
 */
    $('.dd-social-share a.btn-close').on('click', function () {
        let $this = $(this);

        // $this.parent().animate({
        //     width: 0
        // }).promise().done(function () {
        //     $this.parent().find('a').css('opacity', 0);
        // });

        $this.parent().find('a').animate({ opacity: 0 }, 400)
            .promise()
            .done(function () {
                $this.parent().animate({ width: 0 }, 500);
                $this.parents('.dd-social-share').removeClass('active');
            });

    });
    $('.dd-social-share div.label').on('click', function () {
        let $this = $(this);
        $this.parents('.dd-social-share').addClass('active');
        $this.parent().find('.social-links>a').show();
        $this.parent().find('.social-links').animate({
            width: '180px'
        }, 500, function () {
            $this.parent().find('.social-links>a').css('opacity', 1).show();
        });
    });

  /*   $('.mdb-select').material_select(); */

    var menuUrl = window.location.pathname;
    $('header .navbar .my-nav>li a[href="' + menuUrl + '"]').parent('li').addClass('active');
    $('header .navbar .my-nav>li a[href="' + menuUrl + '"]').parent('li').parents('li').addClass('active');

    $('.js-hamburger').on('click', function () {
        $(this).hasClass('is-active') ? $(this).removeClass('is-active') : $(this).addClass('is-active');
    });
    /*****************************************************/
    /***************** DISCLAIMER COOKIE *****************/
    /*****************************************************/

    if (document.getElementsByClassName("cookie-desclaimer").length > 0) {
        let isCdd = getCookie("cookieAccept");
        if (isCdd == "" || isCdd != "accepted") {
            setCookie("cookieAccept", "displayed");
        }
        setTimeout(function () {
            if (isCdd == "" || isCdd != "accepted") {
                document.getElementsByClassName("cookie-desclaimer")[0].classList.add("active");
            }
        }, 5000);
        $(".cookie-desclaimer .fa,.cookie-desclaimer a").on("click", function () {
            document.getElementsByClassName("cookie-desclaimer")[0].classList.remove("active");
            setCookie("cookieAccept", "accepted", 365);
        });
    }

    let textScale = parseInt(getCookie("isScaled"));
    if (textScale == 1)
        $("body").addClass('scale1');


    /*****************************************************/
    /************** NEWSLETTER SUBSCRIPTION **************/
    /*****************************************************/
    var nlCategoryselected = [];
    $("#modalNewsletterSubscription .btn-grd").on("click", function () {
        let $this = $(this).parents("#modalNewsletterSubscription");
        $this.find('input:checked').each(function () {
            nlCategoryselected.push($(this).next('label').text());
        });
        if (nlCategoryselected.length > 0 && $this.find('.md-form input').val().length > 0) {
            $this.find('.modal-form-fields').hide();
            $this.find('.succ-msg').removeClass('d-none');
            setTimeout(function () {
                $this.find('[data-dismiss=modal]').click();
            }, 2000);

            setTimeout(function () {
                $this.find('.modal-form-fields').show();
                $this.find('.succ-msg').addClass('d-none');
                $this.find('.err-msg').addClass('d-none');
                $this.find('.md-form input').val('');
                $this.find('input:checked').click();
                nlCategoryselected = [];
            }, 3000);
        }
        else {
            $this.find('.err-msg').removeClass('d-none');
        }
    });
	
	
})


/*****************************************************/
/***************** TEXT SCALE COOKIE *****************/
/*****************************************************/
function setScale() {
    if ($("body").hasClass('scale1')) {
        $("body").removeClass('scale1');
        setCookie('isScaled', 0);
    }
    else {
        $("body").addClass('scale1');
        setCookie('isScaled', 1);
    }
    return false;
}

function showSearch(e) {
    let searchIcon = e.currentTarget;
    searchIcon.classList.add('search-icon-active');

    $("#header-search").animate({
        width: isRtl ? "260px" : "220px",
        opacity: 1,
        left: isRtl ? "auto" : "-180px"
    }, 200, function () {
        $("#header-search>input").focus();
        if (isRtl)
            $(searchIcon).css('right', "-220px").css('opacity', 1);
        else
            $(searchIcon).css('left', "-175px").css('opacity', 1);
    });

    let sq = $("#header-search>input").val();
    if (sq.length > 2)
        window.location.href = langUrl + 'search/?query=' + sq;
}
function hitSearchContainer(e) {
    if (e.which === 13)
        window.location.href = langUrl + 'search/?query=' + e.currentTarget.value;
}
function hideSearch() {
    let searchIcon = document.getElementsByClassName('search-icon-active')[0];
    searchIcon.classList.remove('search-icon-active');
    $("#header-search").animate({
        width: 0,
        opacity: 0,
    }, 200, function () {
        $("#header-search>input").val('');
        if (isRtl)
            $(searchIcon).css('right', "0px").css('opacity', 1);
        else
            $(searchIcon).css('left', "0px").css('opacity', 1);
    });
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/***************************************************/
/**************** BROWSER DETECTION ****************/
/***************************************************/
var html = document.getElementsByTagName("html")[0]; var na = navigator, ua = na.userAgent; var isIE11 = ua.indexOf('Trident/') != -1 && (ua.indexOf('rv:') != -1 || na.appName.indexOf('Netscape') != -1); var isWebKit = /WebKit/.test(ua); var isIE = !isWebKit && (/MSIE/gi).test(ua) && (/Explorer/gi).test(na.appName) || isIE11; var isIE6 = isIE && /MSIE [56]/.test(ua); var isIE7 = isIE && /MSIE [7]/.test(ua); var isIE8 = isIE && /MSIE [8]/.test(ua); var isIE9 = isIE && /MSIE [9]/.test(ua); var isIE10 = isIE && /MSIE [10]/.test(ua); var isGecko = !isWebKit && !isIE11 && /Gecko/.test(ua); var isMac = ua.indexOf('Mac') != -1; var isAir = /adobeair/i.test(ua); var isIDevice = /(iPad|iPhone)/.test(ua); var isIOS5 = isIDevice && ua.match(/AppleWebKit\/(\d*)/)[1] >= 534; if (isIE11) html.className += " site-ie site-ie11"; if (isIE10) html.className += " site-ie site-ie10"; if (isIE9) html.className += " site-ie site-ie9"; if (isIE6) html.className += " site-ie site-ie6"; if (isIE7) html.className += " site-ie site-ie7"; if (isIE8) html.className += " site-ie site-ie8"; if (na.appVersion.indexOf("Apple") > -1) { if (ua.indexOf("Version/5.1") > -1) { html.className += " safari-win"; } } function iOSversion() { if (/iP(hone|od|ad)/.test(na.appVersion)) { var v = (na.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/); return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)]; } } var ver = iOSversion(); if (iOSversion() !== undefined) { if (ver[0] <= 8) { html.className += " nupd"; } }
if (na.userAgent.indexOf("Edge/")) html.className += " site-edge";

/***************************************************/
/************* CONTACT FORM VALIDATION *************/
/***************************************************/

var site = {};
site = {
    utils: {
        language: function () {
            return {
                value: 0,
                langId: 1,
                url: site.utils.isRTL() ? 'ar' : 'en',
                locale: site.utils.isRTL() ? 'Arabic' : 'English',
                dir: site.utils.isRTL() ? 'rtl' : 'ltr'
            };
        },
        isMobile: function () {
            return document.body.clientWidth <= 992 ? true : false;
        },
        checkSize: function (_size) {
            return document.body.clientWidth <= _size ? true : false;
        },
        isRTL: function () {
            return document.getElementsByTagName("html")[0].getAttribute("lang") == 'ar' ? true : false;
        }
    },
    messages: function () {
        return site.utils.isRTL() ? site.messages_ar : site.messages_en;
    },
    messages_en: {
        required: "required",
        maxChars: "max {0} characters",
        charLimits: "must be {0} - {1} characters",
        invalidEmail: "invalid email",
        invalidMobile: "invalid mobile number",
        searchBoxPlaceholder: "قم بالبحث عن طريق النشاط أو الترخيص أو خدمة إلكترونية",
        noRecords: "No records",
        noSplChars: "Only letters are allowed",
		noSplNumbers: "Only numbers are allowed",
		onlyAlphaNumeric: "Only letters and numbers",
        mirRobot: "Please verify that you are not a robot",
        iisMalformed: "The secret parameter is invalid or malformed",
        iirResponse: "The secret parameter is invalid or malformed",
        misSecret: "The secret parameter is missing"
    },
    messages_ar: {
        required: "مطلوب",
        maxChars: "ماكس {0} حرفا",
        charLimits: "يجب أن يكون {0} - {1} حرفا",
        invalidEmail: "بريد إلكتروني خاطئ",
        invalidMobile: "رقم الجوال غير صالح",
        searchBoxPlaceholder: "قم بالبحث عن طريق النشاط أو الترخيص أو خدمة إلكترونية",
        noRecords: "لا توجد نتائج",
        noSplChars: "الرجاء إدخال أحرف فقط",
		noSplNumbers: "الرجاء إدخال أرقام فقط",
		onlyAlphaNumeric: "الرجاء إدخال أحرف وأرقام فقط",
        mirRobot: "يرجى التحقق من أنك لست روبوت",
        iisMalformed: "المعلمة السرية غير صالحة أو غير صحيحة",
        iirResponse: "المعلمة السرية غير صالحة أو غير صحيحة",
        misSecret: "المعلمة السرية مفقودة"
    }
}

function validateForm(ctrl) {
    var valid = true;
    if (ctrl.length == 0) {
        valid = false;
        return valid;
    }
    $.each($('.required', ctrl), function (i, e) {
        $(this).parent().find("label em").remove();
        var _label = $(this).parent().find("label").html();
        if ($(this).val() == null || $(this).val() == 0) {
            $(this).addClass('error');
            $(this).parent().find("label").html(_label + " <em><span>" + site.messages().required + "</span></em>");
            valid = false;
        }
        else if (!$(this).hasClass("md-textarea") && ($(this).val().length < 1 || $(this).val().length > 30)) {
            $(this).addClass('error');
            $(this).parent().find("label").html(_label + " <em><span>" + site.messages().charLimits.replace("{0}", 1).replace("{1}", 30) + "</span></em>");
            valid = false;
        }
        else {
            $(this).parent().find("label em").remove();
            $(this).removeClass('error');
            valid = true;
        }
    });
    $.each($('.validate-name', ctrl), function (i, e) {
        var pattern = new RegExp(/^[-\sa-zA-Z,\u0600-\u06FF]+$/);
        var _label = $(this).parent().find("label").html();
        if (pattern.test($(this).val())) {
            $(this).removeClass('error');
            $(this).parent().find("label em").remove();
            $(this).parents("div." + ctrl.attr("id")).find(".validation-name").hide();
            valid = true;
        }
        else {
            $(this).addClass('error');
            if ($(this).parent().find("label").find("em").length == 0) {
                $(this).parent().find("label").html(_label + " <em><span>" + site.messages().noSplChars + "</span></em>");
            }
            $(this).parents("div." + ctrl.attr("id")).find(".validation-name").show();
            valid = false;
        }
        console.log(valid);

    });
    $.each($('.validate-text', ctrl), function (i, e) {
        var pattern = new RegExp(/^[-\sa-zA-Z,\u0600-\u06FF]+$/);
        var _label = $(this).parent().find("label").html();
        if (pattern.test($(this).val())) {
            $(this).removeClass('error');
            $(this).parent().find("label em").remove();
            $(this).parents("div." + ctrl.attr("id")).find(".validate-text").hide();
            valid = true;
        }
        else {
            $(this).addClass('error');
            if ($(this).parent().find("label").find("em").length == 0) {
                $(this).parent().find("label").html(_label + " <em><span>" + site.messages().noSplChars + "</span></em>");
            }
            $(this).parents("div." + ctrl.attr("id")).find(".validate-text").show();
            valid = false;
        }
    });
    $.each($('.validate-email', ctrl), function (i, e) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        var _label = $(this).parent().find("label").html();
        
        if (pattern.test($(this).val())) {
            $(this).removeClass('error');
            $('#error_label_email').remove();
            $(this).parents("div." + ctrl.attr("id")).find(".validation-email").hide();
        }
        else {
            $(this).addClass('error');
            if ($('#error_label_email').length == 0) {
            $("<label id=\"error_label_email\" class=\"error\">" + site.messages().invalidEmail + "</label>").insertAfter($(this))
                //$(this).children().find("label").html(_label + " <em><span>" + site.messages().invalidMobile + "</span></em>");
            }
            $(this).parents("div." + ctrl.attr("id")).find(".validation-email").show();
            valid = false;
        }
        
        console.log(valid);

    });
    $.each($('.validate-mobile', ctrl), function (i, e) {
        var pattern = /^(\+\d{1,3}[- ]?)?\d{9}$/;
        var _label = $(this).parent().find("label").html();
        if (pattern.test((parseInt($(this).val())))) {
            $(this).removeClass('error');
            $('#error_label_mobile').remove();
            $(this).parents("div." + ctrl.attr("id")).find(".validation-mobile").hide();
        }
        else {
            $(this).addClass('error');
            if ($('#error_label_mobile').length == 0) {
            $("<label id=\"error_label_mobile\" class=\"error\">" + site.messages().invalidMobile + "</label>").insertAfter($(this))
                //$(this).children().find("label").html(_label + " <em><span>" + site.messages().invalidMobile + "</span></em>");
            }
            $(this).parents("div." + ctrl.attr("id")).find(".validation-mobile").show();
            valid = false;
        }
    });
    $.each($('.validate-url', ctrl), function (i, e) {
        if ($(this).val() != "") {
            var pattern = new RegExp('https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}');

            if (pattern.test($(this).val())) {
                $(this).removeClass('error');
                $(".validation-url").hide();
            }
            else {
                $(this).addClass('error');
                $(".validation-url").show();
                valid = false;
            }
        }
        else {
            $(".validation-url").hide();
        }
    });
    return valid;
}


/****************************************/
/**************** COOKIE ****************/
/****************************************/

function setCookie(cname, cvalue, exdays) {
    let date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString() + "; path=/";
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
} function getUtcOffset() {
    return new Date().getTimezoneOffset();
}
function timeZoneCookie() {
    let timeOffset = getCookie("TimeZoneOffset");
    if (timeOffset == null || timeOffset == "") {
        setCookie("TimeZoneOffset", getUtcOffset(), 365);
        window.location.reload();
    }
}

var bodyClass={};
$(function() {
        if (localStorage.getItem('bodyClass')) {
                bodyClass = JSON.parse(localStorage.getItem('bodyClass'));
                if(bodyClass.grayscale){
                        $('body').addClass('grayscale');
                        $('a.visibility-btn .fa').removeClass('icon-invert').addClass('icon-invert'); console.log('grayscale');
                }else if(bodyClass.invert){
                        $('body').addClass('invert');
                        $('a.visibility-btn .fa').removeClass('icon-invert').addClass('icon-refresh'); console.log('invert');
                }
                if(bodyClass.scale){$('body').addClass('scale'); $('a.zoom-btn .icon').removeClass('icon-zoom-in').addClass('icon-zoom-out');}
        }

        var bodyClass={};
        $( document).on('click', '.visibility-btn', function(){
	        if($('body').hasClass('grayscale')){
	                $('body').removeClass('grayscale').addClass('invert');
	                bodyClass.grayscale=false;
	                bodyClass.invert=true;
	                $('a.visibility-btn .icon').removeClass('icon-invert icon-refresh').addClass('icon-refresh');
	        }else if($('body').hasClass('invert')){
	                $('body').removeClass('invert');
	                bodyClass.grayscale=false;
	                bodyClass.invert=false;
	                $('a.visibility-btn .icon').removeClass('icon-invert icon-eye').addClass('icon-eye');
	        }else{
	                $('body').addClass('grayscale');
	                bodyClass.grayscale=true;
	                bodyClass.invert=false;
	                $('a.visibility-btn .fa-eye').removeClass('icon-eye icon-refresh').addClass('icon-invert');
	        }
	        localStorage.setItem("bodyClass", JSON.stringify(bodyClass));
        });
});

