$(document).ready(function () {
	"use strict";

	function e() {
		document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.msRequestFullscreen ? document.documentElement.msRequestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
	}
	var n = 100,
		t = !0,
		s = !1,
		i = !1,
		l = !1,
		a = $("body"),
		o = ($(".page-header"), $(".page-sidebar"), $(".page-content"), function () {
			s === !0 && $(".page-container").addClass("container")
		}),
		c = function () {
			$(".page-sidebar-inner").slimScroll({
				height: "100%"
			}).mouseover();
			var e = function () {
					a.hasClass("page-sidebar-fixed") && i === !1 && (i = !0), i === !0 && (a.addClass("page-sidebar-fixed"), $("#fixed-sidebar-toggle-button").removeClass("icon-radio_button_unchecked"), $("#fixed-sidebar-toggle-button").addClass("icon-radio_button_checked"));
					var e = function () {
						a.toggleClass("page-sidebar-fixed"), i = a.hasClass("page-sidebar-fixed") ? !0 : !1
					};
					$("#fixed-sidebar-toggle-button").on("click", function () {
						return e(), $(this).toggleClass("icon-radio_button_unchecked"), $(this).toggleClass("icon-radio_button_checked"), !1
					})
				},
				n = function () {
					l === !0 && a.addClass("page-sidebar-collapsed");
					var e = function () {
						a.toggleClass("page-sidebar-collapsed"), l = a.hasClass("page-sidebar-collapsed") ? !0 : !1, $(".page-sidebar-collapsed .page-sidebar .accordion-menu").on({
							mouseenter: function () {
								$(".page-sidebar").addClass("fixed-sidebar-scroll")
							},
							mouseleave: function () {
								$(".page-sidebar").removeClass("fixed-sidebar-scroll")
							}
						}, "li")
					};
					$(".page-sidebar-collapsed .page-sidebar .accordion-menu").on({
						mouseenter: function () {
							$(".page-sidebar").addClass("fixed-sidebar-scroll")
						},
						mouseleave: function () {
							$(".page-sidebar").removeClass("fixed-sidebar-scroll")
						}
					}, "li"), $("#collapsed-sidebar-toggle-button").on("click", function () {
						return e(), !1
					})
				},
				t = function () {
					$(window).width() < 768 && $("#fixed-sidebar-toggle-button").hasClass("icon-radio_button_unchecked") && $("#fixed-sidebar-toggle-button").click(), $(window).on("resize", function () {
						$(window).width() < 768 && $("#fixed-sidebar-toggle-button").hasClass("icon-radio_button_unchecked") && $("#fixed-sidebar-toggle-button").click()
					}), $("#sidebar-toggle-button").on("click", function () {
						return a.toggleClass("page-sidebar-visible"), !1
					}), $("#sidebar-toggle-button-close").on("click", function () {
						return a.toggleClass("page-sidebar-visible"), !1
					})
				};
			e(), n(), t()
		},
		u = function () {
			var e = $(".page-sidebar li:not(.open) .sub-menu"),
				s = $(".page-sidebar li.active-page > a");
			e.hide(), t === !1 && $(".sub-menu li").each(function (e) {
				$(this).addClass("animation")
			}), $(".accordion-menu").on("click", "a", function () {
				var e = $(this).next(".sub-menu"),
					s = $(this).parent("li"),
					i = $(".accordion-menu > li.open"),
					l = function () {
						e.slideDown(n), s.addClass("open"), t === !0 && $(".open .sub-menu li").each(function (e) {
							var n = $(this);
							setTimeout(function () {
								n.addClass("animation")
							}, 15 * (e + 1))
						})
					},
					o = function () {
						t === !0 && $(".open .sub-menu li").each(function (e) {
							var n = $(this);
							setTimeout(function () {
								n.removeClass("animation")
							}, 5 * (e + 1))
						}), e.slideUp(n), s.removeClass("open")
					},
					c = function () {
						$(".accordion-menu > li.open > .sub-menu").slideUp(n), i.removeClass("open")
					};
				return e.length && !a.hasClass("page-sidebar-collapsed") ? (s.hasClass("open") ? o() : (i.length && c(), l()), !1) : e.length && a.hasClass("page-sidebar-collapsed") ? !1 : void 0
			}), $(".active-page > .sub-menu").length && s.click()
		},
		r = function () {
			$("#toggle-fullscreen").on("click", function () {
				return e(), !1
			}), $("#search-button").on("click", function () {
				a.toggleClass("search-open"), a.hasClass("search-open") && $(".search-form input").focus()
			}), $("#close-search").on("click", function () {
				a.toggleClass("search-open")
			})
		},
		d = function () {
			$(".right-sidebar-toggle").on("click", function () {
				var e = $(this).data("sidebar-id");
				$("#" + e).toggleClass("visible")
			});
			var e = function () {
				$(".chat-write form input").on("keypress", function (e) {
					if (13 === e.which && 0 === !$(this).val().length) $(".right-sidebar-chat .chat-bubbles .chat-bubble:last-child").hasClass("me") ? $('<span class="chat-bubble-text">' + $(this).val() + "</span>").insertAfter(".right-sidebar-chat .chat-bubbles .chat-bubble:last-child span:last-child") : $('<div class="chat-bubble me"><div class="chat-bubble-text-container"><span class="chat-bubble-text">' + $(this).val() + "</span></div></div>").insertAfter(".right-sidebar-chat .chat-bubbles .chat-bubble:last-child"), $(this).val("");
					else if (13 === e.which) return;
					var n = $(".right-sidebar-chat").prop("scrollHeight") + "px";
					$(".right-sidebar-chat").slimscroll({
						allowPageScroll: !0,
						scrollTo: n
					})
				})
			};
			e()
		},
		b = function () {
			$(".slimscroll").slimScroll();
			var e = $("input[type=checkbox]:not(.js-switch), input[type=radio]:not(.no-uniform)");
			e.length > 0 && e.each(function () {
				$(this).uniform()
			});
			var n = Array.prototype.slice.call(document.querySelectorAll(".js-switch"));
			n.forEach(function (e) {
				new Switchery(e, {
					size: "small",
					color: "#637282"
				})
			})
		};
	c(), o(), u(), r(), d(), b()
});