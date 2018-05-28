jQuery(function(){
	///////////////////////////////////////////////////
	///////////////// START VARIABLES /////////////////
	///////////////////////////////////////////////////

	var elements = {};
  var backgroundOpacityElem;
  function resizeBg(event){
    //console.log('resize');
    backgroundOpacityElem.width('0px');
    backgroundOpacityElem.width(dtcWinScreenWidth());
    backgroundOpacityElem.height('0px');
    backgroundOpacityElem.height(dtcWinScreenHeight());
  }
  function createOpacityBg(){
    //console.log('bg on');
    //console.log(jQuery('div#fin-slider-menu-background-opacity'));
    //if (!jQuery('div#fin-slider-menu-background-opacity')){
      //console.log('bg on');
      jQuery('body').append('<div id="fin-slider-menu-background-opacity"></div>');

      backgroundOpacityElem = jQuery('div#fin-slider-menu-background-opacity');
      //console.log(backgroundOpacityElem);

      backgroundOpacityElem.css({
        position: 'absolute',
        zIndex: 100,
        top: 0,
        left:0,
        backgroundColor: '#333',
        opacity: 0,
        display: 'block',
        cursor: 'pointer'
      });

      backgroundOpacityElem.width(dtcWinScreenWidth());
      backgroundOpacityElem.height(dtcWinScreenHeight());

      backgroundOpacityElem.animate({
        opacity: 0.6
      }, elements.menuBlock.animation.time.openMenuBlock, function(){
        window.addEventListener('resize', resizeBg);
        backgroundOpacityElem.bind('click', function(event){
          jQuery( '#' + options.openButtonId ).trigger( 'click' );
        });
      });
    //}
  }

  function removeOpacityBg(){
    //console.log('bg off');
    //if (jQuery('div#fin-slider-menu-background-opacity')){
      //console.log('bg off');
      window.removeEventListener('resize', resizeBg);
      backgroundOpacityElem.unbind();
      backgroundOpacityElem.animate({
        opacity: 0
      }, elements.menuBlock.animation.time.openMenuBlock, function(){
        backgroundOpacityElem.remove();
      });
    //}
  }
  // полупрозрачный фон при открытии меню
  jQuery('body').append('<div id="fin-slider-menu-background-opacity"></div>');
  var backgroundOpacityElem = jQuery('div#fin-slider-menu-background-opacity');
  

  /*backgroundOpacityElem.width(dtcWinScreenWidth());
  backgroundOpacityElem.height(dtcWinScreenHeight());*/

  backgroundOpacityElem.on('click', function(event){
    jQuery( '#' + options.openButtonId ).trigger( "click" );
  });
  
  backgroundOpacityElem.css({
    position: 'absolute',
    zIndex: 5000,
    top: 0,
    left:0,
    backgroundColor: '#333',
    opacity: '0'
  });



	var options = {
		sectionId: 'finSliderMenu-menuBlock',
		contentId: 'finSliderMenu-menuContentBlock',
		openButtonId: 'finSliderMenu-menuOpenButton',
		closeButtonId: 'finSliderMenu-menuCloseButton',
		menuOpenClass: 'finSliderMenu-open',
        disabledButtonClass: 'finSliderMenu-disabled-btn',
		//openAnimationTime: 500,
		//closeAnimationTime: 500,

        /* ----- bootstrapBreackPoint ----- */
        bootstrapBreackPoint:{
            xs: 768, // число, при котором произойдёт смена на sm
            sm: 992, // число, при котором произойдёт смена на md
            md: 1200 // число, при котором произойдёт смена на lg
        },

        /* ----- default Animation Time ----- */
        defaultOpenBlockMenuAnimationTime: 400,
        defaultOpenContentAnimationTime: 200,
        defaultCloseBlockMenuAnimationTime: 400,
        defaultCloseContentAnimationTime: 200,

        /* ----- default Position ----- */
        position:{
            xs: 'right',
            sm: 'right',
            md: 'right',
            lg: 'right'
        },

        /* ----- default Size ----- */
        size:{
            xs: 100,
            sm: 100,
            md: 80,
            lg: 60
        },

		htmlAttr: ['positionLg', 'positionMd', 'positionSm', 'positionXs', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXs',
            'openBlockMenuAnimationTime', 'openContentAnimationTime', 'closeBlockMenuAnimationTime', 'closeContentAnimationTime']
	};





	///////////////////////////////////////////////////
	//////////////////// MAIN CODE ////////////////////
	///////////////////////////////////////////////////

	/* --------------- onLoad --------------- */
	setUserValue(options.sectionId, options.contentId, options.openButtonId, options.closeButtonId);
	//elements.menuBlock.state //'open', 'close'
	//console.log(elements);



	//elements.menuBlock.element.style = "block";

	setMenuBlockWidth(dtcMenuWidth(dtcWinScreenClientWidth(), dtcBreakPoint(dtcWinScreenClientWidth())));
	setMenuBlockHeight(dtcMenuHeight(dtcWinScreenHeight()));
	setContentElementWidth(elements.menuBlock.element.style.width);
	setMenuPosition(dtcMenuPosition(dtcWinScreenClientWidth(), dtcMenuWidth(dtcWinScreenClientWidth(), dtcBreakPoint(dtcWinScreenClientWidth())), dtcBreakPoint(dtcWinScreenClientWidth())));


	//Create fantom div
    /*var backgroundDiv = document.createElement('div');
    backgroundDiv.id = "fin-slider-menu-background-div";
    backgroundDiv.style.zIndex = "100";
    backgroundDiv.style.backgroundColor = "#333";
    backgroundDiv.style.opacity = "0.3";

    insertAfter(backgroundDiv, elements.menuBlock.element);*/


	//setContentBlockHeight(dtcWinScreenClientHeight());
	setScroll();
	//elements.menuBlock.element.style.display = 'none';
	/*
	setMenuBlockWidth(dtcMenuWidth(dtcWinScreenClientWidth(), dtcBreakPoint(dtcWinScreenClientWidth())));
	setMenuBlockHeight(dtcMenuHeight(dtcWinScreenHeight()));
	setContentElementWidth(elements.menuBlock.element.style.width);
	setMenuPosition(dtcMenuPosition(dtcWinScreenClientWidth(), dtcMenuWidth(dtcWinScreenClientWidth(), dtcBreakPoint(dtcWinScreenClientWidth())), dtcBreakPoint(dtcWinScreenClientWidth())));
	*/

	elements.menuBlock.element.style.display = "none";



	/* --------------- onResize --------------- */
	window.addEventListener("resize",
		function(){
			//console.log('resize');
	        elements.menuBlock.element.height = '0px';
			//console.log(dtcMenuWidth(dtcWinScreenClientWidth()));
			setMenuBlockWidth(dtcMenuWidth(dtcWinScreenClientWidth(), dtcBreakPoint(dtcWinScreenClientWidth())));
			setMenuBlockHeight(dtcMenuHeight(dtcWinScreenHeight()));
			setContentElementWidth(elements.menuBlock.element.style.width);
			setMenuPosition(dtcMenuPosition(dtcWinScreenClientWidth(), dtcMenuWidth(dtcWinScreenClientWidth(), dtcBreakPoint(dtcWinScreenClientWidth())), dtcBreakPoint(dtcWinScreenClientWidth())));
			//setContentBlockHeight(dtcWinScreenClientHeight());
			setScroll();
			//elements.menuBlock.element.style.left =
			//console.log(elements.menuBlock.element.style.width);

            //тест получения координат:
            var footer = document.getElementsByTagName('footer');
            //console.log(footer[0]);
            //console.log(getCoords(footer[0]));
            function pageFooterHeaghtToTop(footer){
                //console.log(getCoords(footer[0])+ parseFloat(jQuery('footer').css('height')));
                elements.menuBlock.element.style.height = (getCoords(footer[0])+ parseFloat(jQuery('footer').css('height'))) + 'px';
                return getCoords(footer[0]).top + parseFloat(footer.height);
            };
            pageFooterHeaghtToTop(footer);
		});
	/* --------------- onClick --------------- */
	elements.menuBlock.openButtonElem.addEventListener('click', animationController);
	elements.menuBlock.closeButtonElem.addEventListener('click', animationController);





	///////////////////////////////////////////////////
	//////////////////// FUNCTIONS ////////////////////
	///////////////////////////////////////////////////

	/* --------------- VIEWS --------------- */
	// Написать функцию для применения стилей!
	function setMenuBlockWidth(menuWidth){
		elements.menuBlock.element.style.width = menuWidth + 'px';
		//console.log('Ширина экрана:' + menuWidth + 'px');
	};

	function setMenuBlockHeight(menuHeight){
		elements.menuBlock.element.style.height = menuHeight + 'px';
	};

	function setContentElementWidth(menuBlockWidth){
		elements.menuBlock.contentElement.style.width = menuBlockWidth;
	};

	function setMenuPosition(menuPosition){
   		elements.menuBlock.element.style.left = menuPosition +'px';
   	};

   	function setContentBlockHeight(screenHeight){
   		elements.menuBlock.contentElement.style.height = screenHeight + 'px';
   		//console.log('Высота экрана:' + screenHeight + 'px');
   	};

   	function openMenuBlock(){
   		//console.log('open');
   		//elements.menuBlock.state == 'open';
   		//получить позицию меню
   		//console.log(elements.menuBlock.element.style.left);

      createOpacityBg();
   		//var start = elements.menuBlock.element.style.left;
   		//var end = elements.menuBlock.element.style.left = parseFloat(dtcWinScreenClientWidth()) - parseFloat(elements.menuBlock.element.style.width); //+ 'px';
   		var end;
      elements.menuBlock.element.style.display = "block";
   		switch(elements.menuBlock.position['lg']){
   			case 'left':
   				end = 0;
   				//console.log(elements.menuBlock.element.style.width);
   				//console.log(end);
   			break;
   			case 'right':
   				end = elements.menuBlock.element.style.left = parseFloat(dtcWinScreenClientWidth()) - parseFloat(elements.menuBlock.element.style.width);
   			break;

   		};
   		jQuery(elements.menuBlock.element).animate({
		    //opacity: 0.25,
		    left: end
		  }, elements.menuBlock.animation.time.openMenuBlock, function() {
		    // Animation complete.
		    jQuery(elements.menuBlock.contentElement).fadeIn(elements.menuBlock.animation.time.openContent, function(){
		    	//навешиваем слушатель
	   			elements.menuBlock.openButtonElem.addEventListener('click', animationController);
	   			elements.menuBlock.closeButtonElem.addEventListener('click', animationController);
	   			//удаляем класс с кнопок
                addOrDelClass(elements.menuBlock.openButtonElem, options.disabledButtonClass);
                addOrDelClass(elements.menuBlock.closeButtonElem, options.disabledButtonClass);
		    });
		});
   		//dtcMenuPosition(dtcWinScreenClientWidth(), dtcMenuWidth(dtcWinScreenClientWidth(), dtcBreakPoint(dtcWinScreenClientWidth())), dtcBreakPoint(dtcWinScreenClientWidth())) - dtcWinScreenClientWidth() + 'px';
   		//console.log('ширина экрана: ' + dtcWinScreenClientWidth());
   		//console.log('ширина блока: ' + elements.menuBlock.element.style.width);
   		//console.log('ширина контента: ' + elements.menuBlock.contentElement.style.width);

   		//console.log('на сколько подвинулось: ' + elements.menuBlock.element.style.left);
   		//console.log('на сколько должно подвинуться: ' + (parseFloat(dtcWinScreenClientWidth()) - parseFloat(elements.menuBlock.element.style.width)));
   	};

   	function closeMenuBlock(){
   		//console.log('closeMenu');
      removeOpacityBg();
   		var end;
   		switch(elements.menuBlock.position['lg']){
   			case 'left':
   				end = parseFloat(elements.menuBlock.element.style.width)*(-1);
   				//console.log(end);
   			break;
   			case 'right':
   				end = elements.menuBlock.element.style.left = parseFloat(dtcWinScreenClientWidth()) + parseFloat(elements.menuBlock.element.style.width);
   			break;

   		};

		jQuery(elements.menuBlock.contentElement).fadeOut(elements.menuBlock.animation.time.closeContent, function(){
			jQuery(elements.menuBlock.element).animate({
		    //opacity: 0.25,
		    left: end}, elements.menuBlock.animation.time.closeMenuBlock, function(){
		    	//
			    //навешиваем слушатель
	   			elements.menuBlock.openButtonElem.addEventListener('click', animationController);
	   			elements.menuBlock.closeButtonElem.addEventListener('click', animationController);
	   			//удаляем класс с кнопок
                addOrDelClass(elements.menuBlock.openButtonElem, options.disabledButtonClass);
                addOrDelClass(elements.menuBlock.closeButtonElem, options.disabledButtonClass);
          elements.menuBlock.element.style.display = "none";
		    });
		});
   	};

   	function getEndAnimatePosition(){
   		elements.menuBlock.element.style.left
   	};

   	function addOrDelDisable(elem, param){
   		elem.disabled = param;
   	};

   	function addOrDelClass(elem, clName){
   		elem.classList.toggle(clName);
   	};



	/* --------------- LOGICS --------------- */

	function setUserValue(id, contentId, openButtonId, closeButtonId){
		var element = document.getElementById(id);
		var contentElement = document.getElementById(contentId);
		var contentElementPadding = window.getComputedStyle(contentElement);
		var openButtonElem = document.getElementById(openButtonId);
		var closeButtonElem = document.getElementById(closeButtonId);
		Object.defineProperty(
				elements,
				'menuBlock',
				{
					value:
						{
							id: id,
							element: element,
							contentId: contentId,
							contentElement: contentElement,
							contentElementPadding: contentElementPadding,
							openButtonId: openButtonId,
							openButtonElem: openButtonElem,
							closeButtonId: closeButtonId,
							closeButtonElem: closeButtonElem,
							position: {
								lg: element.getAttribute(options.htmlAttr[0]) || options.position.lg,
								md: element.getAttribute(options.htmlAttr[1]) || options.position.md,
								sm: element.getAttribute(options.htmlAttr[2]) || options.position.sm,
								xs: element.getAttribute(options.htmlAttr[3]) || options.position.xs
							},
							size:{
								lg: element.getAttribute(options.htmlAttr[4]) || options.size.lg,
								md: element.getAttribute(options.htmlAttr[5]) || options.size.md,
								sm: element.getAttribute(options.htmlAttr[6]) || options.size.sm,
								xs: element.getAttribute(options.htmlAttr[7]) || options.size.xs
							},
                            animation:{
							    time:{
                                    openBlockMenu: element.getAttribute(options.htmlAttr[8]) || options.defaultOpenBlockMenuAnimationTime,
                                    openContent: element.getAttribute(options.htmlAttr[9]) || options.defaultOpenContentAnimationTime,
                                    closeBlockMenu: element.getAttribute(options.htmlAttr[10]) || options.defaultCloseBlockMenuAnimationTime,
                                    closeContent: element.getAttribute(options.htmlAttr[11]) || options.defaultCloseContentAnimationTime
                                }
                            }
							//state: 'close'
						},
					writable: true, // значение свойства можно менять
					configurable: true, // свойство можно удалять, а также менять его в дальнейшем при помощи новых вызовов defineProperty
					enumerable: true, // свойство просматривается в цикле for..in и методе Object.keys()
				});

	};

   function dtcWinScreenWidth(){
       return Math.max(
           document.body.scrollWidth, document.documentElement.scrollWidth,
           document.body.offsetWidth, document.documentElement.offsetWidth,
           document.body.clientWidth, document.documentElement.clientWidth
       );
   };

   function dtcWinScreenHeight(){
       return Math.max(
           document.body.scrollHeight, document.documentElement.scrollHeight,
           document.body.offsetHeight, document.documentElement.offsetHeight,
           document.body.clientHeight, document.documentElement.clientHeight
       );
   };

   function dtcWinScreenClientWidth(){
       return document.documentElement.clientWidth;
       //console.log("клиентская ширина: " + document.documentElement.clientWidth);
   };

   function dtcWinScreenClientHeight(){
       return document.documentElement.clientHeight;
       //console.log("клиентская высота: " + document.documentElement.clientHeight);
   };

   function dtcMenuWidth(screenWidth, breakPoint){
   			return ((screenWidth*elements.menuBlock.size[breakPoint]) / 100);
   };

   function dtcMenuHeight(screenHeight){
   		screenHeight = dtcWinScreenHeight();
   		/*if (){
			//Если при определённом размере экрана блок меню будет расположен под шапкой и сдвигать при открытии нижнее содержимое страницы понадобятся доп условия
   		}*/
   		//console.log("Высота меню: " + screenHeight);
   		return screenHeight;
   };

   function dtcMenuPosition(screenWidth, menuBlockWidth, breakPoint, state){
   		screenWidth *= 1;
   		menuBlockWidth *= 1;
   		var position;

   		if(elements.menuBlock.element.classList.contains(options.menuOpenClass)){
   			switch(elements.menuBlock.position[breakPoint]){
   			case 'top':
   				//
   			break;
   			case 'right':
   				position = screenWidth - menuBlockWidth;
   				return position;
   			break;
   			case 'bottom':
   				//
   			break;
   			case 'left':
   				position = 0;
   				return position;
   			break;
   			};
   		}else{
   			switch(elements.menuBlock.position[breakPoint]){
   			case 'top':
   				//
   			break;
   			case 'right':
   				position = screenWidth + menuBlockWidth;
   				//console.log('положение при закрытом меню: ' + position);
   				return position;
   			break;
   			case 'bottom':
   				//
   			break;
   			case 'left':
   				position = menuBlockWidth*(-1);
   				//console.log(position);
   				return position;
   			break;
   			};
   		}

   	};

   function dtcBreakPoint(screenWidth){
   		if (screenWidth < options.bootstrapBreackPoint.xs){
   			//console.log('xs');
   			return 'xs';
   		}else if(screenWidth >= options.bootstrapBreackPoint.xs && screenWidth < options.bootstrapBreackPoint.sm){
   			//console.log('sm');
   			return 'sm';
   		}else if(screenWidth >= options.bootstrapBreackPoint.sm && screenWidth < options.bootstrapBreackPoint.md){
   			//console.log('md');
   			return 'md';
   		}else{
   			//console.log('lg');
   			return 'lg';
   		};
   };

   function setScroll(){
   	//console.log("Ширина блока меню: " + elements.menuBlock.element.style.width);
   	//console.log("Ширина контента: " + document.documentElement.clientWidth);
    //console.log('menuH: ' + parseFloat(elements.menuBlock.element.style.height), 'clH: ' + document.documentElement.clientHeight);

    if (parseFloat(elements.menuBlock.element.style.height) > document.documentElement.clientHeight){
      elements.menuBlock.contentElement.style.height = document.documentElement.clientHeight + "px";
      elements.menuBlock.contentElement.style.overflowY = 'scroll';
      //console.log('добавлен скрол контента');
    }else{
      elements.menuBlock.contentElement.style.height = 'auto';
      elements.menuBlock.contentElement.style.overflowY = 'auto';
      //console.log('убран скрол контента');
    }
   	/*switch (elements.menuBlock.element.style.width){
   		case document.documentElement.clientWidth + "px":
   			elements.menuBlock.contentElement.style.height = document.documentElement.clientHeight + "px";
   			elements.menuBlock.contentElement.style.overflowY = 'scroll';
   			//console.log('добавлен скрол контента');
   			break;
   		default:
   			elements.menuBlock.contentElement.style.height = 'auto';
   			elements.menuBlock.contentElement.style.overflowY = 'auto';
   			//console.log('убран скрол контента');
   	};*/
   };

   //получение координат элемента
    function getCoords(elem) {
        // (1)
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        // (2)
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        // (3)
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        // (4)
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return top;
        /*return {
            top: top,
            left: left
        };*/
    }


	/*
		Создание элемента после другого
	 refElem - новый элемент будет добавлен после данного элемента
	 elem - новый элемент
	 */
    function insertAfter(elem, refElem) {
        var parent = refElem.parentNode;
        var next = refElem.nextSibling;
        if (next) {
            return parent.insertBefore(elem, next);
        } else {
            return parent.appendChild(elem);
        }
    };



   /* --------------- controller --------------- */
   function animationController(event){
   		//console.log('click');
   		//удаляем слушатель события с кнопок
   		elements.menuBlock.openButtonElem.removeEventListener('click', animationController);
   		elements.menuBlock.closeButtonElem.removeEventListener('click', animationController);
   		if(elements.menuBlock.element.classList.contains(options.menuOpenClass)){
   			// удаляем класс, обозначающий, что меню открыто
   			addOrDelClass(elements.menuBlock.element, options.menuOpenClass);

   			//навешиваем на кнопки класс неактивны
            addOrDelClass(elements.menuBlock.openButtonElem, options.disabledButtonClass);
            addOrDelClass(elements.menuBlock.closeButtonElem, options.disabledButtonClass);

   			//закрываем
   			closeMenuBlock();
   		}else{
   			//навешиваем на кнопки класс неактивны
            addOrDelClass(elements.menuBlock.openButtonElem, options.disabledButtonClass);
            addOrDelClass(elements.menuBlock.closeButtonElem, options.disabledButtonClass);

   			//открываем
   			openMenuBlock();

   			//добавляем класс, обозначающий, что меню открыто
   			addOrDelClass(elements.menuBlock.element, options.menuOpenClass);

   			//навешиваем слушатель
   			elements.menuBlock.openButtonElem.addEventListener('click', animationController);
   			elements.menuBlock.closeButtonElem.addEventListener('click', animationController);
   		};
   };
});
