(function (W, D) {
    var longDelay = 750
      , shortDelay = 500
      , custom = window.location.host.replace(/[^\w]/g,'-')
      , bg = 'gklst-bg' + custom
      , close = 'gklst-close' + custom
      , frame = 'gklst-frame' + custom
      , iframe = 'gklst-iframe' + custom
      , loading = 'gklst-loading' + custom
      , style = 'gklst-style' + custom
      , host = 'geekli.st'
      , http = 'https://'+host+'/'
      , relink = W.context && W.context.link ? context.link.slug : false
      , $

  function loadCss () {
    if ($('#'+style).length === 0) {
      $('<style id="'+style+'">').html("\
#gklst-bg"+   custom+" { display:none; position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(0,0,0,.4); cursor: pointer; z-index: 100000; overflow-y: scroll }\
#gklst-frame"+custom+" { text-align:left !important; width: 400px; height: 43px; margin:10% auto; background-color: #F5F3F4; cursor: z-index: 900; border-radius: 6px; box-shadow: 0 0 15px #7C7D7D; padding:10px 10px 0; }\
#gklst-frame"+custom+" #gklst-close"+  custom+" { position:absolute; margin-top:-16px; margin-left:390px; background: #F5F3F4; border-radius:12px; padding:3px; height:20px; width:20px; }\
#gklst-frame"+custom+" #gklst-close"+  custom+" img { opacity: .3 !important; }\
#gklst-frame"+custom+" #gklst-close"+  custom+" img:hover { opacity:1 !important; }\
#gklst-frame"+custom+" #gklst-loading"+custom+" { margin-left:48%; }\
#gklst-frame"+custom+" #gklst-iframe"+ custom+" { display:none; width: 100%; height: 100%; border:none; }\
      ").appendTo('head')
    }
  }

  function createFrame () {
    var query = ''
    if (host !== W.location.host || relink) {
      query += 'url='+encodeURIComponent(W.location.href)
      query += '&title='+escape(encodeURIComponent(document.title))
      if (relink) {
        query += '&relink='+relink
      }
    }
    $('body').append("\
    <div id='"+bg+"'>\
      <div id='"+frame+"'>\
        <a id='"+close+"'><img src='"+http+"images/facebox/closelabel.png' alt='Close' /></a>\
        <iframe id='"+iframe+"' src='"+http+"link/modal/?"+query+"'\
                onload=\"var F=jQuery('#"+frame+"');F.find('#"+loading+"').hide();F.animate({height:515},"+shortDelay+",function(){F.find('iframe').fadeIn()})\">\
          Please Enable iFrames.\
        </iframe>\
        <img id='"+loading+"' src='"+http+"images/animation-big.gif'>\
      </div>\
    </div>")
    $('#'+bg).fadeIn(longDelay)
  }

  function destroyFrame () {
    $('#'+bg).fadeOut(longDelay)
    setTimeout(function () { $('#'+bg).remove() }, longDelay)
  }

  function main (jQuery) {
    $ = jQuery
    loadCss()
    $('#'+frame).length === 0 ? createFrame() : destroyFrame()
    $('#'+bg+', #'+bg+' #'+close).click(destroyFrame)
  }

  if (typeof W.jQuery === 'undefined' || W.jQuery.fn.jquery < '1.7.0') {
    var s = D.createElement('script')
    s.type = 'text/javascript'
    s.onload = function () {
      jQuery.noConflict()
      main(jQuery)
    }
    s.src ='//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'
    D.body.appendChild(s)
  } else {
    main(jQuery)
  }
})(window, document)