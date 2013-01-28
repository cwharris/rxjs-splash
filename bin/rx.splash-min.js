(function(){var n,e,t,r={}.hasOwnProperty,i=function(n,e){for(var t in e){if(r.call(e,t))n[t]=e[t]}function i(){this.constructor=n}i.prototype=e.prototype;n.prototype=new i;n.__super__=e.prototype;return n};t=window.sx={utils:{},internal:{},binders:{}};e=function(){};n={dispose:e};t.utils.bind=function(n,e){if(n.subscribe){return n.subscribe(e)}return e(n)};t.utils.parseBindingOptions=function(n,e){var t,r;if(e==null){e={}}if(typeof n==="function"||n.onNext||n.subscribe){e.source=n;return e}for(t in n){r=n[t];e[t]=r}return e};t.utils.unwrap=function(n){if(n.value&&n.subscribe){return n.value}return n};t.utils.wrap=function(n){if(n.value&&n.subscribe){return n}return new Rx.BehaviorSubject(n)};t.bind=function(n,e){e=$(e||window.document.body);return t.internal.bind(e,{vm:n,vmRoot:n,vmParent:void 0})};t.computed=function(n){var e,r,i,o,s,u;r=[];s=[];u=n.params;for(e in u){o=u[e];r.push(e);s.push(t.utils.wrap(o))}i=t.utils.combineLatest(s).select(function(n){var t,i,o,s;i={};for(t=o=0,s=r.length;o<s;t=++o){e=r[t];i[e]=n[t]}return i});return Rx.Observable.create(function(e){return i.select(n.read).subscribe(e)})};t.internal.bind=function(n,e){var r,i,o,s;i=t.internal.parseBindings(n,e);o=new Rx.CompositeDisposable;for(r in i){s=i[r];o.add(t.binders[r](n,e,s))}n.children().each(function(){return o.add(t.internal.bind($(this),e))});return o};t.internal.parseBindings=function(n,e){var t,r,i,o,s,u;t=n.attr("data-splash");if(!t){return null}i=["$data","$root","$parent"];s=[e.vm,e.vmRoot,e.vmParent];u=e.vm;for(r in u){o=u[r];i.push(r);s.push(o)}return new Function(i,"return { "+t+" };").apply(null,s)};t.ObservableArray=function(n){i(e,n);function e(n){var t,r,i;if(n==null){n=[]}e.__super__.constructor.apply(this,arguments);this.values=[];this.lifetimes=[];for(r=0,i=n.length;r<i;r++){t=n[r];this.push(t)}}e.prototype.push=function(n){var e;this.values.push(n);this.lifetimes.push(e=new Rx.BehaviorSubject(n));this.onNext(e);return n};e.prototype.remove=function(n){var e;e=this.values.indexOf(n);if(e===-1){console.log(e)}return this.splice(e,1)};e.prototype.splice=function(){var n,e,t,r,i;Array.prototype.splice.apply(this.values,arguments);e=Array.prototype.splice.apply(this.lifetimes,arguments);i=[];for(t=0,r=e.length;t<r;t++){n=e[t];i.push(n.onCompleted())}return i};e.prototype.subscribe=function(n){var t,r,i,o,s;r=e.__super__.subscribe.apply(this,arguments);this.purge();n=arguments.length>1||typeof n==="function"?n:n.onNext;s=this.lifetimes;for(i=0,o=s.length;i<o;i++){t=s[i];n(t)}return r};e.prototype.purge=function(){var n,e,t,r,i;r=this.lifetimes;i=[];for(e=0,t=r.length;e<t;e++){n=r[e];if(n.isCompleted){i.push(this.remove(n))}}return i};e.prototype.dispose=function(){var n,e,t,r,i;r=this.lifetimes;i=[];for(e=0,t=r.length;e<t;e++){n=r[e];i.push(n.onCompleted())}return i};return e}(Rx.Subject);t.binders.attr=function(n,e,r){var i,o,s,u,a;o=new Rx.CompositeDisposable;for(s=u=0,a=r.length;u<a;s=++u){i=r[s];o.add(t.utils.bind(s,function(e){n.attr(i,e)}))}return o};t.binders.click=function(n,e,r){return t.binders.event(n,e,r,"click")};t.binders.css=function(n,e,r){var i,o,s,u,a;o=new Rx.CompositeDisposable;for(s=u=0,a=r.length;u<a;s=++u){i=r[s];o.add(t.utils.bind(s,function(e){n.css(i,e)}))}return o};t.binders.foreach=function(n,r,i){var o,s;s=n.html().trim();n.empty();o=new Rx.CompositeDisposable({dispose:function(){return n.empty().append(s)}});setTimeout(function(){o.add(i.subscribe(function(i){var u,a,c,l,f;a=$(s).appendTo(n);o.add(u=t.internal.bind(a,{vm:i.value,vmRoot:r.vmRoot,vmParent:r.vm}));c=function(){a.remove();o.remove(u);o.remove(f);o.remove(l)};o.add(l={dispose:c});o.add(f=i.subscribe(e,c,c))}))});return o};t.binders.event=function(n,e,t,r){var i;if(r==null){r=t.type}i=$(n).onAsObservable(r);if(typeof t==="function"){return i.subscribe(function(r){t({target:n,context:e,e:r})})}return i.subscribe(function(r){t.onNext({target:n,context:e,e:r})})};t.binders.html=function(n,e,r){return t.utils.bind(r,function(e){n.html(e)})};t.binders.text=function(n,e,r){return t.utils.bind(r,function(e){n.text(e)})};t.binders.value=function(n,e,r){var i,o,s,u,a;if(r.onNext){u=r;s=n.onAsObservable("change").select(function(){return n.val()}).subscribe(function(n){u.onNext(n)})}if(r.subscribe){o=n.onAsObservable("focus");i=n.onAsObservable("blur");r=r.takeUntil(o).concat(i.take(1)).repeat()}a=t.utils.bind(r,function(e){n.val(e)});return new Rx.CompositeDisposable(s,a)};t.binders.value=function(n,e,r){var i,o,s,u,a,c;r=t.utils.parseBindingOptions(r);if(r.on&&r.on.indexOf("after")===0){r.on=r.on.slice(5);r.delay=true}if(r.source.onNext){a=r.source;u=n.onAsObservable("change "+r.on);if(r.delay){u=u.delay(0)}s=u.select(function(){return n.val()}).doAction(function(n){return console.log(n)}).subscribe(function(n){a.onNext(n)})}if(r.source.subscribe){o=n.onAsObservable("focus");i=n.onAsObservable("blur");r.source=r.source.takeUntil(o).concat(i.take(1)).repeat()}c=t.utils.bind(r.source,function(e){n.val(e)});return new Rx.CompositeDisposable(s,c)};t.binders.visible=function(n,e,r){return t.utils.bind(obsOrValue,function(e){n.css(e?"":"none")})}}).call(this);