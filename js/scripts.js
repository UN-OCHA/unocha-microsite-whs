(function () {
  'use strict';

  function addClass (item, theClass) {
    var index = item.className.indexOf(theClass);
    if (index === -1) {
      item.className += ' ' + theClass;
    }
  }

  function removeClass (item, theClass) {
    var classes = item.className.replace(' ' + theClass, '');
    item.className = classes;
  }

  function closeAll (toggles, togglesHolder) {
    for (var i=0; i < toggles.length; i++) {
      removeClass(toggles[i], 'active');
    }
    removeClass(togglesHolder, 'open');
  }

  function closeOthers (toggles) {
    for (var i=0; i < toggles.length; i++) {
      if (toggles[i].className.indexOf('active')) {
        removeClass(toggles[i], 'active');
      }
    }
  }

  function toggleIt (toggleItem, toggles, togglesHolder) {
    var index = toggleItem.className.indexOf('active');
    var parentIndex = togglesHolder.className.indexOf('open');

    if (parentIndex === -1) {
      addClass(togglesHolder, 'open');
      if (index === -1) {
        closeOthers(toggles);
        addClass(toggleItem, 'active');
      }
      return;
    }

    if (index === -1) {
      closeOthers(toggles);
      addClass(togglesHolder, 'open');
      addClass(toggleItem, 'active');
      return;
    }
    closetoggleItem(toggleItem, togglesHolder);
  }

  function closetoggleItem (toggleItem, togglesHolder) {
    removeClass(toggleItem, 'active');
    removeClass(togglesHolder, 'open');
  }

  function clickEvents (toggleItem, toggles, togglesHolder) {
    var toggleButton = toggleItem.querySelector('[data-toggle-btn]');
    var closeButton = toggleItem.querySelector('[data-toggle-close]');

    if (toggleButton) {
      toggleButton.addEventListener('click', function( event ) {  
        toggleIt(toggleItem, toggles, togglesHolder);
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', function(  ) {  
        closetoggleItem(toggleItem, togglesHolder);
      });
    }
  }

  function escapeEvent (toggles, togglesHolder) {
    document.addEventListener('keyup', function (event) {
      if (event.key === 'Escape' || event.code === 'Escape' || event.keyCode === 27) {
        closeAll(toggles, togglesHolder);
      }
    });
  }

  function initToggler (togglesHolder) {
    if (!togglesHolder) { return; }
    var toggleItems = togglesHolder.querySelectorAll('[data-toggle-item]');
    for (var i=0; i < toggleItems.length; i++) {
      clickEvents(toggleItems[i], toggleItems, togglesHolder);
    }
    escapeEvent(toggleItems, togglesHolder);
  }
  addClass(document.body, 'js');
  initToggler(document.querySelector('[data-faqs]'));
  initToggler(document.querySelector('[data-programme]'));
  
})();
