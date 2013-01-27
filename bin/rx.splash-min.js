(function(){var n,t,e,r={}.hasOwnProperty,i=function(n,t){for(var e in t){if(r.call(t,e))n[e]=t[e]}function i(){this.constructor=n}i.prototype=t.prototype;n.prototype=new i;n.__super__=t.prototype;return n};e=window.sx={utils:{},internal:{},binders:{}};t=function(){};n={dispose:t};e.utils.bind=function(n,t){if(n.subscribe){return n.subscribe(t)}return t(n)};e.utils.unwrap=function(n){if(n.value&&n.subscribe){return n.value}return n};e.utils.wrap=function(n){if(n.value&&n.subscribe){return n}return new Rx.BehaviorSubject(n)};e.bind=function(n,t){t=$(t||window.document.body);return e.internal.bind(t,{vm:n,vmRoot:n,vmParent:void 0})};e.internal.bind=function(n,t){var r,i,s;i=e.internal.parseBindings(n,t);for(r in i){s=i[r];e.binders[r](n,t,s)}return n.children().each(function(){return e.internal.bind($(this),t)})};e.internal.parseBindings=function(n,t){var e,r,i,s,o,u;e=n.attr("data-splash");if(!e){return null}i=["$data","$root","$parent"];o=[t.vm,t.vmRoot,t.vmParent];u=t.vm;for(r in u){s=u[r];i.push(r);o.push(s)}return new Function(i,"return { "+e+" };").apply(null,o)};e.ObservableArray=function(n){i(t,n);function t(n){var e,r,i;if(n==null){n=[]}t.__super__.constructor.apply(this,arguments);this.values=[];this.lifetimes=[];for(r=0,i=n.length;r<i;r++){e=n[r];this.push(e)}}t.prototype.push=function(n){var t;this.values.push(n);this.lifetimes.push(t=new Rx.BehaviorSubject(n));this.onNext(t);return n};t.prototype.remove=function(n){var t;t=this.values.indexOf(n);if(t===-1){console.log(t)}return this.splice(t,1)};t.prototype.splice=function(){var n,t,e,r,i;Array.prototype.splice.apply(this.values,arguments);t=Array.prototype.splice.apply(this.lifetimes,arguments);i=[];for(e=0,r=t.length;e<r;e++){n=t[e];i.push(n.onCompleted())}return i};t.prototype.subscribe=function(n){var e,r,i,s,o;r=t.__super__.subscribe.apply(this,arguments);this.purge();n=arguments.length>1||typeof n==="function"?n:n.onNext;o=this.lifetimes;for(i=0,s=o.length;i<s;i++){e=o[i];n(e)}return r};t.prototype.purge=function(){var n,t,e,r,i;r=this.lifetimes;i=[];for(t=0,e=r.length;t<e;t++){n=r[t];if(n.isCompleted){i.push(this.remove(n))}}return i};t.prototype.dispose=function(){var n,t,e,r,i;r=this.lifetimes;i=[];for(t=0,e=r.length;t<e;t++){n=r[t];i.push(n.onCompleted())}return i};return t}(Rx.Subject);e.binders.click=function(n,t,r){return e.binders.event(n,t,r,"click")};e.binders.css=function(n,t,r){var i,s,o,u,a;s=new Rx.CompositeDisposable;for(o=u=0,a=r.length;u<a;o=++u){i=r[o];s.add(e.utils.bind(o,function(t){n.css(i,t)}))}return s};e.binders.event=function(n,t,e,r){var i;if(r==null){r=e.type}i=$(n).onAsObservable(r);if(typeof e==="function"){return i.subscribe(function(n){e({context:t,e:n})})}return i.subscribe(function(n){e.onNext({context:t,e:n})})};e.binders.foreach=function(n,r,i){var s;s=n.html().trim();n.empty();return i.delay(0).subscribe(function(i){var o,u,a;u=$(s).appendTo(n);o=e.internal.bind(u,{vm:i.value,vmRoot:r.vmRoot,vmParent:r.vm});a=function(){u.remove();return o.dispose()};i.subscribe(t,a,a)})};e.binders.html=function(n,t,r){return e.utils.bind(r,function(t){n.html(t)})};e.binders.text=function(n,t,r){return e.utils.bind(r,function(t){n.text(t)})};e.binders.value=function(n,t,r){var i,s,o,u,a;if(r.onNext){u=r;o=n.onAsObservable("change").subscribe(function(t){u.onNext(n.val())})}if(r.subscribe){s=n.onAsObservable("focus");i=n.onAsObservable("blur");r=r.takeUntil(i).concat(i.take(1)).repeat()}a=e.utils.bind(r,function(t){n.val(t)});return new Rx.CompositeDisposable(o,a)}}).call(this);