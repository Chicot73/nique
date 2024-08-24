"use strict";function _typeof(o){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o})(o)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.ScrollToPlugin=void 0;var gsap,_coreInitted,_window,_docEl,_body,_toArray,_config,ScrollTrigger,_windowExists=function(){return"undefined"!=typeof window},_getGSAP=function(){return gsap||_windowExists()&&(gsap=window.gsap)&&gsap.registerPlugin&&gsap},_isString=function(o){return"string"==typeof o},_isFunction=function(o){return"function"==typeof o},_max=function(o,t){var e="x"===t?"Width":"Height",r="scroll"+e,l="client"+e;return o===_window||o===_docEl||o===_body?Math.max(_docEl[r],_body[r])-(_window["inner"+e]||_docEl[l]||_body[l]):o[r]-o["offset"+e]},_buildGetter=function(o,t){var e="scroll"+("x"===t?"Left":"Top");return o===_window&&(null!=o.pageXOffset?e="page"+t.toUpperCase()+"Offset":o=null!=_docEl[e]?_docEl:_body),function(){return o[e]}},_clean=function(o,t,e,r){if(_isFunction(o)&&(o=o(t,e,r)),"object"!==_typeof(o))return _isString(o)&&"max"!==o&&"="!==o.charAt(1)?{x:o,y:o}:{y:o};if(o.nodeType)return{y:o,x:o};var l,n={};for(l in o)n[l]="onAutoKill"!==l&&_isFunction(o[l])?o[l](t,e,r):o[l];return n},_getOffset=function(o,t){if(!(o=_toArray(o)[0])||!o.getBoundingClientRect)return console.warn("scrollTo target doesn't exist. Using 0")||{x:0,y:0};var e=o.getBoundingClientRect(),r=!t||t===_window||t===_body,l=r?{top:_docEl.clientTop-(_window.pageYOffset||_docEl.scrollTop||_body.scrollTop||0),left:_docEl.clientLeft-(_window.pageXOffset||_docEl.scrollLeft||_body.scrollLeft||0)}:t.getBoundingClientRect(),n={x:e.left-l.left,y:e.top-l.top};return!r&&t&&(n.x+=_buildGetter(t,"x")(),n.y+=_buildGetter(t,"y")()),n},_parseVal=function(o,t,e,r,l){return isNaN(o)||"object"===_typeof(o)?_isString(o)&&"="===o.charAt(1)?parseFloat(o.substr(2))*("-"===o.charAt(0)?-1:1)+r-l:"max"===o?_max(t,e)-l:Math.min(_max(t,e),_getOffset(o,t)[e]-l):parseFloat(o)-l},_initCore=function(){gsap=_getGSAP(),_windowExists()&&gsap&&"undefined"!=typeof document&&document.body&&(_window=window,_body=document.body,_docEl=document.documentElement,_toArray=gsap.utils.toArray,gsap.config({autoKillThreshold:7}),_config=gsap.config(),_coreInitted=1)},ScrollToPlugin=exports.default=exports.ScrollToPlugin={version:"3.12.5",name:"scrollTo",rawVars:1,register:function(o){gsap=o,_initCore()},init:function(o,t,e,r,l){_coreInitted||_initCore();var n=this,i=gsap.getProperty(o,"scrollSnapType");n.isWin=o===_window,n.target=o,n.tween=e,t=_clean(t,r,o,l),n.vars=t,n.autoKill=!!t.autoKill,n.getX=_buildGetter(o,"x"),n.getY=_buildGetter(o,"y"),n.x=n.xPrev=n.getX(),n.y=n.yPrev=n.getY(),ScrollTrigger||(ScrollTrigger=gsap.core.globals().ScrollTrigger),"smooth"===gsap.getProperty(o,"scrollBehavior")&&gsap.set(o,{scrollBehavior:"auto"}),i&&"none"!==i&&(n.snap=1,n.snapInline=o.style.scrollSnapType,o.style.scrollSnapType="none"),null!=t.x?(n.add(n,"x",n.x,_parseVal(t.x,o,"x",n.x,t.offsetX||0),r,l),n._props.push("scrollTo_x")):n.skipX=1,null!=t.y?(n.add(n,"y",n.y,_parseVal(t.y,o,"y",n.y,t.offsetY||0),r,l),n._props.push("scrollTo_y")):n.skipY=1},render:function(o,t){for(var e,r,l,n,i,s=t._pt,p=t.target,c=t.tween,a=t.autoKill,u=t.xPrev,_=t.yPrev,f=t.isWin,g=t.snap,d=t.snapInline;s;)s.r(o,s.d),s=s._next;e=f||!t.skipX?t.getX():u,l=(r=f||!t.skipY?t.getY():_)-_,n=e-u,i=_config.autoKillThreshold,t.x<0&&(t.x=0),t.y<0&&(t.y=0),a&&(!t.skipX&&(i<n||n<-i)&&e<_max(p,"x")&&(t.skipX=1),!t.skipY&&(i<l||l<-i)&&r<_max(p,"y")&&(t.skipY=1),t.skipX&&t.skipY&&(c.kill(),t.vars.onAutoKill&&t.vars.onAutoKill.apply(c,t.vars.onAutoKillParams||[]))),f?_window.scrollTo(t.skipX?e:t.x,t.skipY?r:t.y):(t.skipY||(p.scrollTop=t.y),t.skipX||(p.scrollLeft=t.x)),!g||1!==o&&0!==o||(r=p.scrollTop,e=p.scrollLeft,d?p.style.scrollSnapType=d:p.style.removeProperty("scroll-snap-type"),p.scrollTop=r+1,p.scrollLeft=e+1,p.scrollTop=r,p.scrollLeft=e),t.xPrev=t.x,t.yPrev=t.y,ScrollTrigger&&ScrollTrigger.update()},kill:function(o){var t="scrollTo"===o,e=this._props.indexOf(o);return(t||"scrollTo_x"===o)&&(this.skipX=1),(t||"scrollTo_y"===o)&&(this.skipY=1),-1<e&&this._props.splice(e,1),!this._props.length}};ScrollToPlugin.max=_max,ScrollToPlugin.getOffset=_getOffset,ScrollToPlugin.buildGetter=_buildGetter,_getGSAP()&&gsap.registerPlugin(ScrollToPlugin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcm9sbFRvUGx1Z2luLmpzIl0sIm5hbWVzIjpbImdzYXAiLCJfY29yZUluaXR0ZWQiLCJfd2luZG93IiwiX2RvY0VsIiwiX2JvZHkiLCJfdG9BcnJheSIsIl9jb25maWciLCJTY3JvbGxUcmlnZ2VyIiwiX3dpbmRvd0V4aXN0cyIsIndpbmRvdyIsIl9nZXRHU0FQIiwicmVnaXN0ZXJQbHVnaW4iLCJfaXNTdHJpbmciLCJ2YWx1ZSIsIl9pc0Z1bmN0aW9uIiwiX21heCIsImVsZW1lbnQiLCJheGlzIiwiZGltIiwic2Nyb2xsIiwiTWF0aCIsIm1heCIsImNsaWVudCIsIl9idWlsZEdldHRlciIsImUiLCJ0b1VwcGVyQ2FzZSIsInAiLCJfY2xlYW4iLCJ0YXJnZXQiLCJ0YXJnZXRzIiwiaW5kZXgiLCJjaGFyQXQiLCJ4IiwieSIsIm5vZGVUeXBlIiwicmVzdWx0IiwiX2dldE9mZnNldCIsImNvbnRhaW5lciIsInBhZ2VYT2Zmc2V0IiwiY29uc29sZSIsIndhcm4iLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaXNSb290IiwiY1JlY3QiLCJ0b3AiLCJjbGllbnRUb3AiLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvcCIsImxlZnQiLCJjbGllbnRMZWZ0Iiwic2Nyb2xsTGVmdCIsIm9mZnNldHMiLCJfdHlwZW9mIiwiX3BhcnNlVmFsIiwiY3VycmVudFZhbCIsIm9mZnNldCIsImlzTmFOIiwicGFyc2VGbG9hdCIsInN1YnN0ciIsIm1pbiIsIl9pbml0Q29yZSIsImRvY3VtZW50IiwiYm9keSIsImRvY3VtZW50RWxlbWVudCIsInV0aWxzIiwidG9BcnJheSIsImNvbmZpZyIsIlNjcm9sbFRvUGx1Z2luIiwiZXhwb3J0cyIsInZlcnNpb24iLCJuYW1lIiwicmF3VmFycyIsInJlZ2lzdGVyIiwiaW5pdCIsInR3ZWVuIiwiZGF0YSIsInRoaXMiLCJzbmFwVHlwZSIsImdldFByb3BlcnR5IiwiaXNXaW4iLCJ2YXJzIiwiYXV0b0tpbGwiLCJnZXRZIiwieVByZXYiLCJjb3JlIiwiZ2xvYmFscyIsInNldCIsInNjcm9sbEJlaGF2aW9yIiwic25hcElubGluZSIsInN0eWxlIiwic2Nyb2xsU25hcFR5cGUiLCJhZGQiLCJvZmZzZXRYIiwiX3Byb3BzIiwicHVzaCIsInNraXBYIiwib2Zmc2V0WSIsInJlbmRlciIsInlEaWYiLCJ4RGlmIiwidGhyZXNob2xkIiwieFByZXYiLCJzbmFwIiwicHQiLCJkIiwiX25leHQiLCJnZXRYIiwic2tpcFkiLCJvbkF1dG9LaWxsIiwiYXBwbHkiLCJvbkF1dG9LaWxsUGFyYW1zIiwicmF0aW8iLCJyZW1vdmVQcm9wZXJ0eSIsImtpbGwiLCJpIiwic3BsaWNlIiwibGVuZ3RoIiwiYnVpbGRHZXR0ZXIiXSwibWFwcGluZ3MiOiJtV0FJQSxJQUFBQSxLQUFBQyxhQUFBQyxRQUFBQyxPQUFBQyxNQUFBQyxTQUFBQyxRQUFBQyxjQUNBQyxjQUFBLFdBQUEsTUFBQSxvQkFBQUMsUUFDQUMsU0FBQSxXQUFBLE9BQUFWLE1BQUFRLGtCQUFBUixLQUFBUyxPQUFBVCxPQUFBQSxLQUFBVyxnQkFBQVgsTUFDQVksVUFBQSxTQUFBQyxHQUFBLE1BQUEsaUJBQUFBLEdBQ0FDLFlBQUEsU0FBQUQsR0FBQSxNQUFBLG1CQUFBQSxHQUNBRSxLQUFBLFNBQUFDLEVBQUFDLEdBUUUsSUFBSUMsRUFBZ0IsTUFBVEQsRUFBZ0IsUUFBVSxTQU52Q0UsRUFBUSxTQUFBRCxFQUFFakIsRUFBQUEsU0FBWWlCLEVBQUVoQixPQUFPYyxJQUFBZCxTQUFBYyxJQUFBYixRQUFBYSxJQUFBWixNQUFBZ0IsS0FBQUMsSUFBQWxCLE9BQUFnQixHQUFBZixNQUFBZSxLQUFBakIsUUFBQSxRQUFBZ0IsSUFBQWYsT0FBQW1CLElBQUFsQixNQUFBa0IsSUFBQU4sRUFBQUcsR0FBQUgsRUFBQSxTQUFBRSxJQVc5QkssYUFYNkMsU0FBQUMsRUFBQVAsR0FBRVosSUFBQUEsRUFBUSxVQUFBLE1BQUFZLEVBQUEsT0FBQSxPQUUwQyxPQUZ4Q1gsSUFBT0osVUFBZSxNQUFiSyxFQUFB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KiFcbiAqIFNjcm9sbFRvUGx1Z2luIDMuMTIuNVxuICogaHR0cHM6Ly9nc2FwLmNvbVxuICpcbiAqIEBsaWNlbnNlIENvcHlyaWdodCAyMDA4LTIwMjQsIEdyZWVuU29jay4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHBzOi8vZ3NhcC5jb20vc3RhbmRhcmQtbGljZW5zZSBvciBmb3JcbiAqIENsdWIgR1NBUCBtZW1iZXJzLCB0aGUgYWdyZWVtZW50IGlzc3VlZCB3aXRoIHRoYXQgbWVtYmVyc2hpcC5cbiAqIEBhdXRob3I6IEphY2sgRG95bGUsIGphY2tAZ3JlZW5zb2NrLmNvbVxuKi9cbi8qIGVzbGludC1kaXNhYmxlICovXG5cbmxldCBnc2FwLCBfY29yZUluaXR0ZWQsIF93aW5kb3csIF9kb2NFbCwgX2JvZHksIF90b0FycmF5LCBfY29uZmlnLCBTY3JvbGxUcmlnZ2VyLFxuXHRfd2luZG93RXhpc3RzID0gKCkgPT4gdHlwZW9mKHdpbmRvdykgIT09IFwidW5kZWZpbmVkXCIsXG5cdF9nZXRHU0FQID0gKCkgPT4gZ3NhcCB8fCAoX3dpbmRvd0V4aXN0cygpICYmIChnc2FwID0gd2luZG93LmdzYXApICYmIGdzYXAucmVnaXN0ZXJQbHVnaW4gJiYgZ3NhcCksXG5cdF9pc1N0cmluZyA9IHZhbHVlID0+IHR5cGVvZih2YWx1ZSkgPT09IFwic3RyaW5nXCIsXG5cdF9pc0Z1bmN0aW9uID0gdmFsdWUgPT4gdHlwZW9mKHZhbHVlKSA9PT0gXCJmdW5jdGlvblwiLFxuXHRfbWF4ID0gKGVsZW1lbnQsIGF4aXMpID0+IHtcblx0XHRsZXQgZGltID0gKGF4aXMgPT09IFwieFwiKSA/IFwiV2lkdGhcIiA6IFwiSGVpZ2h0XCIsXG5cdFx0XHRzY3JvbGwgPSBcInNjcm9sbFwiICsgZGltLFxuXHRcdFx0Y2xpZW50ID0gXCJjbGllbnRcIiArIGRpbTtcblx0XHRyZXR1cm4gKGVsZW1lbnQgPT09IF93aW5kb3cgfHwgZWxlbWVudCA9PT0gX2RvY0VsIHx8IGVsZW1lbnQgPT09IF9ib2R5KSA/IE1hdGgubWF4KF9kb2NFbFtzY3JvbGxdLCBfYm9keVtzY3JvbGxdKSAtIChfd2luZG93W1wiaW5uZXJcIiArIGRpbV0gfHwgX2RvY0VsW2NsaWVudF0gfHwgX2JvZHlbY2xpZW50XSkgOiBlbGVtZW50W3Njcm9sbF0gLSBlbGVtZW50W1wib2Zmc2V0XCIgKyBkaW1dO1xuXHR9LFxuXHRfYnVpbGRHZXR0ZXIgPSAoZSwgYXhpcykgPT4geyAvL3Bhc3MgaW4gYW4gZWxlbWVudCBhbmQgYW4gYXhpcyAoXCJ4XCIgb3IgXCJ5XCIpIGFuZCBpdCdsbCByZXR1cm4gYSBnZXR0ZXIgZnVuY3Rpb24gZm9yIHRoZSBzY3JvbGwgcG9zaXRpb24gb2YgdGhhdCBlbGVtZW50IChsaWtlIHNjcm9sbFRvcCBvciBzY3JvbGxMZWZ0LCBhbHRob3VnaCBpZiB0aGUgZWxlbWVudCBpcyB0aGUgd2luZG93LCBpdCdsbCB1c2UgdGhlIHBhZ2VYT2Zmc2V0L3BhZ2VZT2Zmc2V0IG9yIHRoZSBkb2N1bWVudEVsZW1lbnQncyBzY3JvbGxUb3Avc2Nyb2xsTGVmdCBvciBkb2N1bWVudC5ib2R5J3MuIEJhc2ljYWxseSB0aGlzIHN0cmVhbWxpbmVzIHRoaW5ncyBhbmQgbWFrZXMgYSB2ZXJ5IGZhc3QgZ2V0dGVyIGFjcm9zcyBicm93c2Vycy5cblx0XHRsZXQgcCA9IFwic2Nyb2xsXCIgKyAoKGF4aXMgPT09IFwieFwiKSA/IFwiTGVmdFwiIDogXCJUb3BcIik7XG5cdFx0aWYgKGUgPT09IF93aW5kb3cpIHtcblx0XHRcdGlmIChlLnBhZ2VYT2Zmc2V0ICE9IG51bGwpIHtcblx0XHRcdFx0cCA9IFwicGFnZVwiICsgYXhpcy50b1VwcGVyQ2FzZSgpICsgXCJPZmZzZXRcIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGUgPSBfZG9jRWxbcF0gIT0gbnVsbCA/IF9kb2NFbCA6IF9ib2R5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gKCkgPT4gZVtwXTtcblx0fSxcblx0X2NsZWFuID0gKHZhbHVlLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKSA9PiB7XG5cdFx0X2lzRnVuY3Rpb24odmFsdWUpICYmICh2YWx1ZSA9IHZhbHVlKGluZGV4LCB0YXJnZXQsIHRhcmdldHMpKTtcblx0XHRpZiAodHlwZW9mKHZhbHVlKSAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0cmV0dXJuIF9pc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUgIT09IFwibWF4XCIgJiYgdmFsdWUuY2hhckF0KDEpICE9PSBcIj1cIiA/IHt4OiB2YWx1ZSwgeTogdmFsdWV9IDoge3k6IHZhbHVlfTsgLy9pZiB3ZSBkb24ndCByZWNlaXZlIGFuIG9iamVjdCBhcyB0aGUgcGFyYW1ldGVyLCBhc3N1bWUgdGhlIHVzZXIgaW50ZW5kcyBcInlcIi5cblx0XHR9IGVsc2UgaWYgKHZhbHVlLm5vZGVUeXBlKSB7XG5cdFx0XHRyZXR1cm4ge3k6IHZhbHVlLCB4OiB2YWx1ZX07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCByZXN1bHQgPSB7fSwgcDtcblx0XHRcdGZvciAocCBpbiB2YWx1ZSkge1xuXHRcdFx0XHRyZXN1bHRbcF0gPSBwICE9PSBcIm9uQXV0b0tpbGxcIiAmJiBfaXNGdW5jdGlvbih2YWx1ZVtwXSkgPyB2YWx1ZVtwXShpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKSA6IHZhbHVlW3BdO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdH0sXG5cdF9nZXRPZmZzZXQgPSAoZWxlbWVudCwgY29udGFpbmVyKSA9PiB7XG5cdFx0ZWxlbWVudCA9IF90b0FycmF5KGVsZW1lbnQpWzBdO1xuXHRcdGlmICghZWxlbWVudCB8fCAhZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcblx0XHRcdHJldHVybiBjb25zb2xlLndhcm4oXCJzY3JvbGxUbyB0YXJnZXQgZG9lc24ndCBleGlzdC4gVXNpbmcgMFwiKSB8fCB7eDowLCB5OjB9O1xuXHRcdH1cblx0XHRsZXQgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHRpc1Jvb3QgPSAoIWNvbnRhaW5lciB8fCBjb250YWluZXIgPT09IF93aW5kb3cgfHwgY29udGFpbmVyID09PSBfYm9keSksXG5cdFx0XHRjUmVjdCA9IGlzUm9vdCA/IHt0b3A6X2RvY0VsLmNsaWVudFRvcCAtIChfd2luZG93LnBhZ2VZT2Zmc2V0IHx8IF9kb2NFbC5zY3JvbGxUb3AgfHwgX2JvZHkuc2Nyb2xsVG9wIHx8IDApLCBsZWZ0Ol9kb2NFbC5jbGllbnRMZWZ0IC0gKF93aW5kb3cucGFnZVhPZmZzZXQgfHwgX2RvY0VsLnNjcm9sbExlZnQgfHwgX2JvZHkuc2Nyb2xsTGVmdCB8fCAwKX0gOiBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHRvZmZzZXRzID0ge3g6IHJlY3QubGVmdCAtIGNSZWN0LmxlZnQsIHk6IHJlY3QudG9wIC0gY1JlY3QudG9wfTtcblx0XHRpZiAoIWlzUm9vdCAmJiBjb250YWluZXIpIHsgLy9vbmx5IGFkZCB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gaWYgaXQncyBub3QgdGhlIHdpbmRvdy9ib2R5LlxuXHRcdFx0b2Zmc2V0cy54ICs9IF9idWlsZEdldHRlcihjb250YWluZXIsIFwieFwiKSgpO1xuXHRcdFx0b2Zmc2V0cy55ICs9IF9idWlsZEdldHRlcihjb250YWluZXIsIFwieVwiKSgpO1xuXHRcdH1cblx0XHRyZXR1cm4gb2Zmc2V0cztcblx0fSxcblx0X3BhcnNlVmFsID0gKHZhbHVlLCB0YXJnZXQsIGF4aXMsIGN1cnJlbnRWYWwsIG9mZnNldCkgPT4gIWlzTmFOKHZhbHVlKSAmJiB0eXBlb2YodmFsdWUpICE9PSBcIm9iamVjdFwiID8gcGFyc2VGbG9hdCh2YWx1ZSkgLSBvZmZzZXQgOiAoX2lzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS5jaGFyQXQoMSkgPT09IFwiPVwiKSA/IHBhcnNlRmxvYXQodmFsdWUuc3Vic3RyKDIpKSAqICh2YWx1ZS5jaGFyQXQoMCkgPT09IFwiLVwiID8gLTEgOiAxKSArIGN1cnJlbnRWYWwgLSBvZmZzZXQgOiAodmFsdWUgPT09IFwibWF4XCIpID8gX21heCh0YXJnZXQsIGF4aXMpIC0gb2Zmc2V0IDogTWF0aC5taW4oX21heCh0YXJnZXQsIGF4aXMpLCBfZ2V0T2Zmc2V0KHZhbHVlLCB0YXJnZXQpW2F4aXNdIC0gb2Zmc2V0KSxcblx0X2luaXRDb3JlID0gKCkgPT4ge1xuXHRcdGdzYXAgPSBfZ2V0R1NBUCgpO1xuXHRcdGlmIChfd2luZG93RXhpc3RzKCkgJiYgZ3NhcCAmJiB0eXBlb2YoZG9jdW1lbnQpICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LmJvZHkpIHtcblx0XHRcdF93aW5kb3cgPSB3aW5kb3c7XG5cdFx0XHRfYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cdFx0XHRfZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0XHRfdG9BcnJheSA9IGdzYXAudXRpbHMudG9BcnJheTtcblx0XHRcdGdzYXAuY29uZmlnKHthdXRvS2lsbFRocmVzaG9sZDo3fSk7XG5cdFx0XHRfY29uZmlnID0gZ3NhcC5jb25maWcoKTtcblx0XHRcdF9jb3JlSW5pdHRlZCA9IDE7XG5cdFx0fVxuXHR9O1xuXG5cbmV4cG9ydCBjb25zdCBTY3JvbGxUb1BsdWdpbiA9IHtcblx0dmVyc2lvbjogXCIzLjEyLjVcIixcblx0bmFtZTogXCJzY3JvbGxUb1wiLFxuXHRyYXdWYXJzOiAxLFxuXHRyZWdpc3Rlcihjb3JlKSB7XG5cdFx0Z3NhcCA9IGNvcmU7XG5cdFx0X2luaXRDb3JlKCk7XG5cdH0sXG5cdGluaXQodGFyZ2V0LCB2YWx1ZSwgdHdlZW4sIGluZGV4LCB0YXJnZXRzKSB7XG5cdFx0X2NvcmVJbml0dGVkIHx8IF9pbml0Q29yZSgpO1xuXHRcdGxldCBkYXRhID0gdGhpcyxcblx0XHRcdHNuYXBUeXBlID0gZ3NhcC5nZXRQcm9wZXJ0eSh0YXJnZXQsIFwic2Nyb2xsU25hcFR5cGVcIik7XG5cdFx0ZGF0YS5pc1dpbiA9ICh0YXJnZXQgPT09IF93aW5kb3cpO1xuXHRcdGRhdGEudGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdGRhdGEudHdlZW4gPSB0d2Vlbjtcblx0XHR2YWx1ZSA9IF9jbGVhbih2YWx1ZSwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cyk7XG5cdFx0ZGF0YS52YXJzID0gdmFsdWU7XG5cdFx0ZGF0YS5hdXRvS2lsbCA9ICEhdmFsdWUuYXV0b0tpbGw7XG5cdFx0ZGF0YS5nZXRYID0gX2J1aWxkR2V0dGVyKHRhcmdldCwgXCJ4XCIpO1xuXHRcdGRhdGEuZ2V0WSA9IF9idWlsZEdldHRlcih0YXJnZXQsIFwieVwiKTtcblx0XHRkYXRhLnggPSBkYXRhLnhQcmV2ID0gZGF0YS5nZXRYKCk7XG5cdFx0ZGF0YS55ID0gZGF0YS55UHJldiA9IGRhdGEuZ2V0WSgpO1xuXHRcdFNjcm9sbFRyaWdnZXIgfHwgKFNjcm9sbFRyaWdnZXIgPSBnc2FwLmNvcmUuZ2xvYmFscygpLlNjcm9sbFRyaWdnZXIpO1xuXHRcdGdzYXAuZ2V0UHJvcGVydHkodGFyZ2V0LCBcInNjcm9sbEJlaGF2aW9yXCIpID09PSBcInNtb290aFwiICYmIGdzYXAuc2V0KHRhcmdldCwge3Njcm9sbEJlaGF2aW9yOiBcImF1dG9cIn0pO1xuXHRcdGlmIChzbmFwVHlwZSAmJiBzbmFwVHlwZSAhPT0gXCJub25lXCIpIHsgLy8gZGlzYWJsZSBzY3JvbGwgc25hcHBpbmcgdG8gYXZvaWQgc3RyYW5nZSBiZWhhdmlvclxuXHRcdFx0ZGF0YS5zbmFwID0gMTtcblx0XHRcdGRhdGEuc25hcElubGluZSA9IHRhcmdldC5zdHlsZS5zY3JvbGxTbmFwVHlwZTtcblx0XHRcdHRhcmdldC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9IFwibm9uZVwiO1xuXHRcdH1cblx0XHRpZiAodmFsdWUueCAhPSBudWxsKSB7XG5cdFx0XHRkYXRhLmFkZChkYXRhLCBcInhcIiwgZGF0YS54LCBfcGFyc2VWYWwodmFsdWUueCwgdGFyZ2V0LCBcInhcIiwgZGF0YS54LCB2YWx1ZS5vZmZzZXRYIHx8IDApLCBpbmRleCwgdGFyZ2V0cyk7XG5cdFx0XHRkYXRhLl9wcm9wcy5wdXNoKFwic2Nyb2xsVG9feFwiKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YS5za2lwWCA9IDE7XG5cdFx0fVxuXHRcdGlmICh2YWx1ZS55ICE9IG51bGwpIHtcblx0XHRcdGRhdGEuYWRkKGRhdGEsIFwieVwiLCBkYXRhLnksIF9wYXJzZVZhbCh2YWx1ZS55LCB0YXJnZXQsIFwieVwiLCBkYXRhLnksIHZhbHVlLm9mZnNldFkgfHwgMCksIGluZGV4LCB0YXJnZXRzKTtcblx0XHRcdGRhdGEuX3Byb3BzLnB1c2goXCJzY3JvbGxUb195XCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhLnNraXBZID0gMTtcblx0XHR9XG5cdH0sXG5cdHJlbmRlcihyYXRpbywgZGF0YSkge1xuXHRcdGxldCBwdCA9IGRhdGEuX3B0LFxuXHRcdFx0eyB0YXJnZXQsIHR3ZWVuLCBhdXRvS2lsbCwgeFByZXYsIHlQcmV2LCBpc1dpbiwgc25hcCwgc25hcElubGluZSB9ID0gZGF0YSxcblx0XHRcdHgsIHksIHlEaWYsIHhEaWYsIHRocmVzaG9sZDtcblx0XHR3aGlsZSAocHQpIHtcblx0XHRcdHB0LnIocmF0aW8sIHB0LmQpO1xuXHRcdFx0cHQgPSBwdC5fbmV4dDtcblx0XHR9XG5cdFx0eCA9IChpc1dpbiB8fCAhZGF0YS5za2lwWCkgPyBkYXRhLmdldFgoKSA6IHhQcmV2O1xuXHRcdHkgPSAoaXNXaW4gfHwgIWRhdGEuc2tpcFkpID8gZGF0YS5nZXRZKCkgOiB5UHJldjtcblx0XHR5RGlmID0geSAtIHlQcmV2O1xuXHRcdHhEaWYgPSB4IC0geFByZXY7XG5cdFx0dGhyZXNob2xkID0gX2NvbmZpZy5hdXRvS2lsbFRocmVzaG9sZDtcblx0XHRpZiAoZGF0YS54IDwgMCkgeyAvL2Nhbid0IHNjcm9sbCB0byBhIHBvc2l0aW9uIGxlc3MgdGhhbiAwISBNaWdodCBoYXBwZW4gaWYgc29tZW9uZSB1c2VzIGEgQmFjay5lYXNlT3V0IG9yIEVsYXN0aWMuZWFzZU91dCB3aGVuIHNjcm9sbGluZyBiYWNrIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UgKGZvciBleGFtcGxlKVxuXHRcdFx0ZGF0YS54ID0gMDtcblx0XHR9XG5cdFx0aWYgKGRhdGEueSA8IDApIHtcblx0XHRcdGRhdGEueSA9IDA7XG5cdFx0fVxuXHRcdGlmIChhdXRvS2lsbCkge1xuXHRcdFx0Ly9ub3RlOiBpT1MgaGFzIGEgYnVnIHRoYXQgdGhyb3dzIG9mZiB0aGUgc2Nyb2xsIGJ5IHNldmVyYWwgcGl4ZWxzLCBzbyB3ZSBuZWVkIHRvIGNoZWNrIGlmIGl0J3Mgd2l0aGluIDcgcGl4ZWxzIG9mIHRoZSBwcmV2aW91cyBvbmUgdGhhdCB3ZSBzZXQgaW5zdGVhZCBvZiBqdXN0IGxvb2tpbmcgZm9yIGFuIGV4YWN0IG1hdGNoLlxuXHRcdFx0aWYgKCFkYXRhLnNraXBYICYmICh4RGlmID4gdGhyZXNob2xkIHx8IHhEaWYgPCAtdGhyZXNob2xkKSAmJiB4IDwgX21heCh0YXJnZXQsIFwieFwiKSkge1xuXHRcdFx0XHRkYXRhLnNraXBYID0gMTsgLy9pZiB0aGUgdXNlciBzY3JvbGxzIHNlcGFyYXRlbHksIHdlIHNob3VsZCBzdG9wIHR3ZWVuaW5nIVxuXHRcdFx0fVxuXHRcdFx0aWYgKCFkYXRhLnNraXBZICYmICh5RGlmID4gdGhyZXNob2xkIHx8IHlEaWYgPCAtdGhyZXNob2xkKSAmJiB5IDwgX21heCh0YXJnZXQsIFwieVwiKSkge1xuXHRcdFx0XHRkYXRhLnNraXBZID0gMTsgLy9pZiB0aGUgdXNlciBzY3JvbGxzIHNlcGFyYXRlbHksIHdlIHNob3VsZCBzdG9wIHR3ZWVuaW5nIVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRhdGEuc2tpcFggJiYgZGF0YS5za2lwWSkge1xuXHRcdFx0XHR0d2Vlbi5raWxsKCk7XG5cdFx0XHRcdGRhdGEudmFycy5vbkF1dG9LaWxsICYmIGRhdGEudmFycy5vbkF1dG9LaWxsLmFwcGx5KHR3ZWVuLCBkYXRhLnZhcnMub25BdXRvS2lsbFBhcmFtcyB8fCBbXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChpc1dpbikge1xuXHRcdFx0X3dpbmRvdy5zY3JvbGxUbygoIWRhdGEuc2tpcFgpID8gZGF0YS54IDogeCwgKCFkYXRhLnNraXBZKSA/IGRhdGEueSA6IHkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhLnNraXBZIHx8ICh0YXJnZXQuc2Nyb2xsVG9wID0gZGF0YS55KTtcblx0XHRcdGRhdGEuc2tpcFggfHwgKHRhcmdldC5zY3JvbGxMZWZ0ID0gZGF0YS54KTtcblx0XHR9XG5cdFx0aWYgKHNuYXAgJiYgKHJhdGlvID09PSAxIHx8IHJhdGlvID09PSAwKSkge1xuXHRcdFx0eSA9IHRhcmdldC5zY3JvbGxUb3A7XG5cdFx0XHR4ID0gdGFyZ2V0LnNjcm9sbExlZnQ7XG5cdFx0XHRzbmFwSW5saW5lID8gKHRhcmdldC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9IHNuYXBJbmxpbmUpIDogdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwic2Nyb2xsLXNuYXAtdHlwZVwiKTtcblx0XHRcdHRhcmdldC5zY3JvbGxUb3AgPSB5ICsgMTsgLy8gYnVnIGluIFNhZmFyaSBjYXVzZXMgdGhlIGVsZW1lbnQgdG8gdG90YWxseSByZXNldCBpdHMgc2Nyb2xsIHBvc2l0aW9uIHdoZW4gc2Nyb2xsLXNuYXAtdHlwZSBjaGFuZ2VzLCBzbyB3ZSBuZWVkIHRvIHNldCBpdCB0byBhIHNsaWdodGx5IGRpZmZlcmVudCB2YWx1ZSBhbmQgdGhlbiBiYWNrIGFnYWluIHRvIHdvcmsgYXJvdW5kIHRoaXMgYnVnLlxuXHRcdFx0dGFyZ2V0LnNjcm9sbExlZnQgPSB4ICsgMTtcblx0XHRcdHRhcmdldC5zY3JvbGxUb3AgPSB5O1xuXHRcdFx0dGFyZ2V0LnNjcm9sbExlZnQgPSB4O1xuXHRcdH1cblx0XHRkYXRhLnhQcmV2ID0gZGF0YS54O1xuXHRcdGRhdGEueVByZXYgPSBkYXRhLnk7XG5cdFx0U2Nyb2xsVHJpZ2dlciAmJiBTY3JvbGxUcmlnZ2VyLnVwZGF0ZSgpO1xuXHR9LFxuXHRraWxsKHByb3BlcnR5KSB7XG5cdFx0bGV0IGJvdGggPSAocHJvcGVydHkgPT09IFwic2Nyb2xsVG9cIiksXG5cdFx0XHRpID0gdGhpcy5fcHJvcHMuaW5kZXhPZihwcm9wZXJ0eSk7XG5cdFx0aWYgKGJvdGggfHwgcHJvcGVydHkgPT09IFwic2Nyb2xsVG9feFwiKSB7XG5cdFx0XHR0aGlzLnNraXBYID0gMTtcblx0XHR9XG5cdFx0aWYgKGJvdGggfHwgcHJvcGVydHkgPT09IFwic2Nyb2xsVG9feVwiKSB7XG5cdFx0XHR0aGlzLnNraXBZID0gMTtcblx0XHR9XG5cdFx0aSA+IC0xICYmIHRoaXMuX3Byb3BzLnNwbGljZShpLCAxKTtcblx0XHRyZXR1cm4gIXRoaXMuX3Byb3BzLmxlbmd0aDtcblx0fVxufTtcblxuU2Nyb2xsVG9QbHVnaW4ubWF4ID0gX21heDtcblNjcm9sbFRvUGx1Z2luLmdldE9mZnNldCA9IF9nZXRPZmZzZXQ7XG5TY3JvbGxUb1BsdWdpbi5idWlsZEdldHRlciA9IF9idWlsZEdldHRlcjtcblxuX2dldEdTQVAoKSAmJiBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRvUGx1Z2luKTtcblxuZXhwb3J0IHsgU2Nyb2xsVG9QbHVnaW4gYXMgZGVmYXVsdCB9OyJdfQ==