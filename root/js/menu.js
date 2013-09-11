


function getCode($item){
	var finalCode = '';
	var code = '';
	while (code = $item.attr('code')) {
		if (code) {
			finalCode = code + (finalCode? '-': '') + finalCode;
			$item = $item.parent();
		} else {
			break;
		}
	}
	return finalCode;
}


function goMenu(code){
	var $nav = $('#main-nav');
	// the current
	var $current = global.$menu.find('#' + code).parents().eq(-3);	// level-2
	$nav.find('.current').removeClass('current');
	$nav.find('#' + code.replace(/[^-]+$/, 'A')).addClass('current');
	startMenu(code);
	makeTabs($current);
	startTabs(code);
}

function startMenu(code){
		$("#main-nav li ul").hide(); // Hide all sub menus
		$("#main-nav a.current").closest("ul").slideToggle("slow");
		var $all = $('#main-nav a[href]');
		var $the = $all.filter('#' + code);
		if ($the.length) {
			$all.removeClass('current');
			$the.addClass('current');
		}
		$('#main-nav').show();
}



function makeMenu(onLoad){
	$.get('xml/menu.xml'+'?_r='+Math.random(), function(doc){
		var $menuData = $(doc).find('menu');
		var $nav = $('#main-nav').hide().empty();
		$menuData.children('item').each(function(i, topitem){
			var $topitem = $(topitem);
			var role = $topitem.attr('role'),
				title = $topitem.attr('title'),
				href = $topitem.attr('href');
			if (title === '退出登录') {
				if (href) {
					$('#a-logout').attr('href', href);
				}
			} else {
				var $a = $('<a class="nav-top-item">'+ title +'</a>');
				var $li = $('<li>').append($a);
				var $subitems = $topitem.children('item');
				if ($subitems.length) {
					var $ul = $('<ul>');
					$subitems.each(function(i, subitem){
						var $subitem = $(subitem);
						var title2 = $subitem.attr('title');
						var href2 = $subitem.attr('href');
						var $a2 = $('<a class="nav-sub-item">'+ title2 +'</a>');
						$a2.attr('href', href2 || 'null');
						if (href2) {
							var code2 = getCode($subitem);
							$subitem.attr('id', code2);
							$a2.attr('id', code2);
						}
						var $li2 = $('<li>').append($a2);
						var $tabitems = $subitem.children('item');
						if ($tabitems.length) {
							$li2.data('tabitems', $tabitems);
							
							$tabitems.eachRight(function(i, tabitem){
								var $tabitem = $(tabitem);
								var href3 = $tabitem.attr('href');
								if (href3) {
									$a2.attr('href', href3);
									
									var code3 = getCode($tabitem);
									$tabitem.attr('id', code3);
									$a2.attr('id', code3);
								}
							});
						}
						$ul.append($li2);
					});
					
					$li.append($ul);
				} else {
					$li.children('a').addClass('no-submenu');
				}
				$nav.append($li);
			}
			// global.$menu
			global.$menu = $menuData;
		});
		
		$('body').delegate("#main-nav li a.nav-top-item", 'click', // When a top menu item is clicked...
			function () {
				$(this).parent().siblings().find("ul").stop().slideUp("normal"); // Slide up all sub menus except the one clicked
				$(this).next().stop().slideToggle("normal"); // Slide down the clicked sub menu
				return false;
			}
		);
		$("#main-nav li .nav-top-item").hover( 
			function () {
				$(this).stop().animate({ paddingRight: "25px" }, 200);
			}, 
			function () {
				$(this).stop().animate({ paddingRight: "15px" });
			}
		);
		onLoad();
	});
	
}



function makeTabs($current){
	$('.content-box-tabs').remove();
	var $header = $('.content-box-header');
	var $h3 = $header.children('h3').text($current.attr('title'));
	var $tabitems = $current.children();
	
	if ($tabitems && $tabitems.length) {
		var $tab_list = $('<ul class="content-box-tabs">');
		$tabitems.each(function(i, tabitem){
			var $tabitem = $(tabitem);
			var title = $tabitem.attr('title');
			var href = $tabitem.attr('href');
			var $a = $('<a>'+ title +'</a>');
			if (href) {
				$a.attr('href', href);
				$a.attr('id', getCode($tabitem));
			}
			$('<li>').append($a).appendTo($tab_list);
		});
		$h3.after($tab_list);
	}
}

function startTabs(code){
	$('.content-box .content-box-content div.tab-content').hide(); // Hide the content divs
	
	//$('ul.content-box-tabs li a.default-tab').addClass('current'); // Add the class "current" to the default tab
	
	$as = $('ul.content-box-tabs li a');
	$as.removeClass('current').filter('#' + code).addClass('current'); // Add the class "current" to the default tab
	
	
	$(".close").click(
		function () {
			$(this).parent().fadeTo(400, 0, function () { // Links with the class "close" will close parent
				$(this).slideUp(400);
			});
			return false;
		}
	);
}




