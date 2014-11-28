/*!CK:2286788409!*//*1416196071,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["tWYRo"]); }

__d("StickyController",["CSS","Event","Style","Vector","queryThenMutateDOM"],function(a,b,c,d,e,f,g,h,i,j,k){function l(m,n,o,p){"use strict";this._element=m;this._marginTop=n;this._onchange=o;this._proxy=p||m.parentNode;this._boundQueryOnScroll=this.shouldFix.bind(this);this._boundMutateOnScroll=this._mutateOnScroll.bind(this);}l.prototype.handleScroll=function(){"use strict";k(this._boundQueryOnScroll,this._boundMutateOnScroll);};l.prototype.shouldFix=function(){"use strict";return j.getElementPosition(this._proxy,'viewport').y<=this._marginTop;};l.prototype._mutateOnScroll=function(){"use strict";var m=this.shouldFix();if(this.isFixed()!==m){i.set(this._element,'top',m?this._marginTop+'px':'');g.conditionClass(this._element,'fixed_elem',m);this._onchange&&this._onchange(m);}};l.prototype.start=function(){"use strict";if(this._event)return;this._event=h.listen(window,'scroll',this.handleScroll.bind(this));setTimeout(this.handleScroll.bind(this),0);};l.prototype.stop=function(){"use strict";this._event&&this._event.remove();this._event=null;};l.prototype.isFixed=function(){"use strict";return g.hasClass(this._element,'fixed_elem');};e.exports=l;},null);
__d("OGCollectionAddCuration",["AsyncRequest","DataStore","DOM","copyProperties","tidyEvent"],function(a,b,c,d,e,f,g,h,i,j,k){var l='OGCollectionAddCuration';function m(n,o,p,q,r,s){this._container=n;this._control=o;this._itemID=p;this._surface=r;this._display=s.display;if(o)k([o.subscribe('reload',this.reloadControl.bind(this))]);if(q)h.set(String(q),l,this);if(p)h.set(String(p),l,this);}j(m,{handleDeleteAction:function(n){var o=h.get(String(n),l);if(o)o.reloadControl();},handleAddItemSuccess:function(n,o,p){var q=h.get(String(n),l);h.set(String(o),l,q);q.insertMenuIntoDialog(p);},hideControl:function(n){var o=h.get(String(n),l);o.hideControl();},insertControl:function(n,o){var p=h.get(String(n),l);p.replaceControl(o);},reloadControl:function(n){var o=h.get(String(n),l);if(o)o.reloadControl();}});j(m.prototype,{hideControl:function(){this._control.hide();},reloadControl:function(){var n=new g('/ajax/collections/add_curation').setData({itemid:this._itemID,surface:this._surface,forceedit:true,display:this._display}).setHandler(this._handleAddCurationResponse.bind(this));n.send();},insertMenuIntoDialog:function(n){this._control.insertMenuIntoDialog(n);},replaceControl:function(n){i.replace(this._container,n);},getMenuControl:function(){return this._control;},_handleAddCurationResponse:function(n){this._control.destroy();i.replace(this._container,n.payload);}});e.exports=m;},null);
__d("OGCollectionAddObject",["AsyncRequest","CSS","DOM","DOMQuery","Form","JSLogger","Parent","TidyArbiterMixin","TimelineSection","copyProperties","csx","cx","ge"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var t=l.create('og_collection_add_object'),u=p({ADD_PLACEHOLDER:'OGCollectionAddObject/addPlaceholder',NEW_ITEM:'OGCollectionAddObject/newItem',PLACEHOLDER:'OGCollectionAddObject/placeholder',REMOVE_PLACEHOLDER:'OGCollectionAddObject/removePlaceholder',init:function(v,w,x,y,z){o.callWithSection(z,function(aa){this.initImpl(v,w,x,y,aa.getNode(),z,aa.id);}.bind(this));},initInReport:function(v,w,x,y){var z=m.byClass(y,"_w8_");this.initImpl(v,w,x,y,z,null,null);},initImpl:function(v,w,x,y,z,aa,ba){var ca=j.scry(z,"._620")[0];if(!ca){t.error('grid_not_found',{collection_id:aa,section:ba,csx:'.public/fbTimelineCollectionGrid/root'});return;}w.subscribe('select',function(da,ea){if(!ea.selected.uid||ea.selected.type.indexOf('disabled')!=-1)return;u.inform(u.ADD_PLACEHOLDER,aa);var fa=ca.nextSibling,ga=null;if(fa&&h.hasClass(fa,"_3t3")){h.hide(ca.lastChild);ga=ca.lastChild;}var ha=i.prependContent(ca,x.cloneNode(true))[0];u.inform(u.PLACEHOLDER,{grid:ca});var ia=p({action:'add',mechanism:'typeahead'},k.serialize(y));ha.setAttribute('data-item',ia.item_id);new g().setURI(v).setData(ia).setRelativeTo(ca).setErrorHandler(function(ja){i.remove(ha);u.inform(u.REMOVE_PLACEHOLDER,aa);ga&&h.show(ga);}).setHandler(function(ja){ga&&i.remove(ga);}).setFinallyHandler(function(ja){u.inform(u.PLACEHOLDER,{grid:ca});}).send();});},replaceItem:function(v,w,x){var y=i.scry(v,'div[data-obj="'+w+'"]')[0];if(y){var z=m.byClass(y,"_30f");if(z)u.inform(u.REMOVE_PLACEHOLDER,z.id);i.remove(y.parentNode);}var aa=i.find(v,'[data-item="'+w+'"]'+"._2804");i.replace(aa,x);this.inform(u.NEW_ITEM,{grid:v,newItem:x});},prependItem:function(v,w){var x=j.scry(s(v),"._620")[0];i.prependContent(x,w);this.inform(u.NEW_ITEM,{grid:x,newItem:w});}},n);e.exports=u;},null);
__d("OGCollectionBatchAddCuration",["AsyncRequest","Event","OGCollectionAddCuration","Parent","Run"],function(a,b,c,d,e,f,g,h,i,j,k){var l={},m;function n(p){for(var q=0;q<l[p].listeners.length;q++)l[p].listeners[q].remove();l[p]=null;}var o={loadControls:function(p,q,r){if(!q||!Array.isArray(q))return;l[r]=l[r]||{tokens:[],listeners:[]};l[r].tokens=l[r].tokens.concat(q);var s=j.byClass(p,'fbTimelineUnit');l[r].listeners.push(h.listen(s,'mouseenter',function(){new g('/ajax/collections/batch_add_curation').setData({collectionitemtokens:l[r].tokens.join(),surface:r}).send();n(r);}));if(!m){m=true;k.onLeave(function(){for(var t in l)l[t]&&n(t);l={};m=null;});}},attachControls:function(p,q){for(var r=0;r<p.length;r++)i.insertControl(p[r],q[r]);}};e.exports=o;},null);
__d("ProfileInfoRequestNoteFlyout",["CSS","csx","DOM","Event","LayerDestroyOnHide","tidyEvent"],function(a,b,c,d,e,f,g,h,i,j,k,l){function m(n,o){"use strict";this.$ProfileInfoRequestNoteFlyout0=o;this.$ProfileInfoRequestNoteFlyout1=i.scry(this.$ProfileInfoRequestNoteFlyout0.getContentRoot(),"._958")[0];l(j.listen(n,'click',this.$ProfileInfoRequestNoteFlyout2.bind(this)));l(this.$ProfileInfoRequestNoteFlyout0.subscribe('success',this.$ProfileInfoRequestNoteFlyout3.bind(this)));l(this.$ProfileInfoRequestNoteFlyout0.subscribe('hide',this.$ProfileInfoRequestNoteFlyout4.bind(this)));l(this.$ProfileInfoRequestNoteFlyout0.subscribe('error',this.$ProfileInfoRequestNoteFlyout5.bind(this)));}m.prototype.$ProfileInfoRequestNoteFlyout2=function(n){"use strict";this.$ProfileInfoRequestNoteFlyout0.show();n.kill();};m.prototype.$ProfileInfoRequestNoteFlyout5=function(n,o){"use strict";i.setContent(this.$ProfileInfoRequestNoteFlyout1,o.response.errorDescription);g.show(this.$ProfileInfoRequestNoteFlyout1);return false;};m.prototype.$ProfileInfoRequestNoteFlyout4=function(){"use strict";g.hide(this.$ProfileInfoRequestNoteFlyout1);};m.prototype.$ProfileInfoRequestNoteFlyout3=function(){"use strict";this.$ProfileInfoRequestNoteFlyout0.enableBehavior(k);this.$ProfileInfoRequestNoteFlyout0.hide();};e.exports=m;},null);
__d("ProfileInfoRequestSuggestion",["CSS","Event","tidyEvent"],function(a,b,c,d,e,f,g,h,i){var j={listenThinker:function(k,l,m){m=m||'hidden_elem';i(h.listen(k,'click',g.removeClass.bind(g,l,m)));}};e.exports=j;},null);
__d("TimelineSideAds",["AdsMouseStateStore","Animation","Arbiter","CSS","DOM","EgoAdsObjectSet","Event","StickyController","TimelineAdsConfig","TimelineConstants","TimelineController","UIPagelet","URI","Vector","csx","cx","debounce","ge"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x){var y=75,z='data-height',aa=g.STATES,ba=30000,ca=0,da=false,ea,fa,ga,ha,ia,ja,ka=new l(),la,ma,na=false,oa,pa=Infinity,qa=false,ra=5,sa,ta,ua,va,wa,xa,ya,za,ab,bb,cb,db,eb,fb=false,gb=[],hb;function ib(hc,ic,jc){var kc=0;if(ic)kc+=ic.getHeight();if(!nb()&&!kc)return;hc-=kc;var lc=0;for(var mc=0;mc<jc;mc++)lc+=wb(mc);if(ic)if(hc<lc){hc+=ic.fold(lc-hc);}else if(hc>lc)hc-=ic.unfold(hc-lc);return hc;}function jb(){var hc=fa.cloneNode(true);hc.id='';var ic=new l();ic.init(k.scry(hc,'div.ego_unit'));var jc=true;ic.forEach(function(kc){if(jc){jc=false;}else k.remove(kc);});j.addClass(hc,'fixed_elem');return hc;}function kb(){ja=(void 0);if(!q.pageHasScrubber(la)){ob(ra);rb();}else if(xa){pb(fa,false);var hc=ya;ya&&k.remove(ya);ya=jb();if(hc)cc();ob(q.sidebarInitialized()&&na?va:ua);rb();if(!oa){var ic=q.getCurrentScrubber();if(ic)bc(ic.getRoot(),ic.getOffset());}oa&&oa.start();}else gc.adjustAdsToFit();}function lb(){if(ya){k.remove(ya);ya=null;}if(oa){oa.stop();oa=null;}if(nb()){j.conditionClass(fa,'fixed_elem',!xa);j.conditionClass(fa,"_22s",!q.pageHasScrubber(la));}else j.conditionClass(fa,'fixed_elem',!xa&&q.pageHasScrubber(la));}function mb(hc){var ic=t.getViewportDimensions().y,jc=q.getCurrentScrubber(),kc=jc?jc.getOffset():p.SCRUBBER_DEFAULT_OFFSET,lc=ic-kc-y;if(jc||nb())return ib(lc,jc,hc);}function nb(){return q.fixedAds();}function ob(hc){ia=Math.min(hc,ka.getCount());ka.forEach(function(ic,jc){pb(ic,jc>=ia);});pb(fa,ia===0);}function pb(hc,ic){j.conditionClass(hc,"_22r",ic);hc.setAttribute('aria-hidden',ic?'true':'false');}function qb(hc){var ic=k.find(ka.getUnit(hc),"div._4u8"),jc=ic.getAttribute('data-ad');return JSON.parse(jc).adid;}function rb(){tb();sb();}function sb(){var hc;if(ja!==(void 0)){hc=ka.getHoldoutAdIDsForSpace(ja,xb);}else hc=ka.getHoldoutAdIDsForNumAds(ia);if(hc)hc.forEach(ub);}function tb(){if(!za)return;for(var hc=ia-1;hc>=0;--hc){if(oa&&oa.isFixed()&&((hc!==0)||(ya&&!j.shown(ya))))continue;var ic=qb(hc);if(!za[ic])return;ub(ic);}}function ub(hc){if(!za[hc])return;var ic=k.create('iframe',{src:s('/ai.php').addQueryData({aed:za[hc]}),width:0,height:0,frameborder:0,scrolling:'no',className:'fbEmuTracking'});ic.setAttribute('aria-hidden','true');k.appendContent(fa,ic);delete za[hc];}function vb(hc){var ic=0;while(hc>0&&ic<ra){hc-=wb(ic);if(hc>=0)ic++;}return ic;}function wb(hc){var ic=ka.getUnit(hc);if(!ic)return 0;return xb(ic);}function xb(hc){if(!hc.getAttribute(z))yb(hc);return parseInt(hc.getAttribute(z),10);}function yb(hc){hc.setAttribute(z,hc.offsetHeight);}function zb(){for(var hc=0;hc<ka.getCount();hc++){var ic=ka.getUnit(hc);if(!ic)continue;yb(ic);}}function ac(){var hc=k.scry(fa,'div.ego_unit');ka.init(hc);var ic=hc.length;if(!ic)return;j.addClass(ka.getUnit(0),'ego_unit_no_top_border');kb();setTimeout(function(){hc.forEach(yb);gc.adjustAdsToFit();pa=Date.now();},0);}function bc(hc,ic){oa=new n(hc,ic,function(jc){if(jc){cc();}else{k.remove(ya);rb();}});if(ya)oa.start();}function cc(){k.insertAfter(fa,ya);dc();}function dc(){j.conditionShow(ya,wb(0)<=mb(1)&&!j.hasClass(document.documentElement,'tinyViewport'));}function ec(){if(ma){var hc=x(ga);k.find(hc,'.ego_column').appendChild(ma);}if(o.fade)(new h(x(ga))).from('opacity',0).to('opacity',1).duration(600).go();}function fc(hc){return !!k.scry(hc,'div.fbEmuHidePoll')[0];}var gc={init:function(hc,ic,jc){if(da)return;ra=jc.max_ads;ea=jc.refresh_delay;ba=jc.refresh_threshold;sa=jc.min_ads;ta=jc.min_ads_wide;ua=jc.min_ads_short;va=jc.min_ads_short_wide;da=true;ha=ic;fa=hc;g.updateRhcID(k.getID(fa));gc.adjustAdsType(q.shouldShowWideAds());ab=i.subscribe(['UFI/CommentAddedActive','UFI/CommentDeletedActive','UFI/LikeActive','Curation/Action','ProfileBrowser/LoadMoreContent','Ads/NewContentDisplayed'],gc.loadAdsIfEnoughTimePassed);bb=i.subscribe('TimelineSideAds/refresh',gc.forceReloadAds);cb=i.subscribe('ProfileQuestionAnswered',gc.forceReloadAdsWithCallback);db=i.subscribe('Ads/displayPoll',gc.displayAdsPoll);eb=i.subscribe('Ads/hidePoll',gc.hideAdsPoll);hb=w(gc.loadAdsIfEnoughTimePassed,ea,this,true);if(jc.mouse_move){gb.push(m.listen(window,'mousemove',hb));gb.push(m.listen(window,'scroll',hb));gb.push(m.listen(window,'resize',hb));gb.push(m.listen(fa,'mouseenter',function(){qa=true;}));gb.push(m.listen(fa,'mouseleave',function(){qa=false;}));}q.register(q.ADS,gc);},setShortMode:function(hc){xa=hc;},start:function(hc){za=hc;wa=null;ac();},updateCurrentKey:function(hc){if(hc==la)return;la=hc;lb();},loadAds:function(hc){if(wa)return;pa=Infinity;wa=r.loadFromEndpoint('WebEgoPane',fa.id,{pid:33,data:[ha,'timeline_'+hc,xa?va:ra,++ca,false]},{crossPage:true,bundle:false,handler:ec});},registerScrubber:function(hc){if(xa)bc(hc.getRoot(),hc.getOffset());!wa&&gc.adjustAdsToFit();},intentShown:function(){if(!o.stateRefresh)return false;switch(g.getState()){case aa.HOVER:case aa.INTENT:default:return true;case aa.NO_INTENT:return false;case aa.STATIONARY:return !o.refreshOnStationary;}},loadAdsIfEnoughTimePassed:function(){if(ba&&(Date.now()-pa>=ba)&&!j.hasClass(document.documentElement,'tinyViewport')&&(!oa||oa.isFixed())&&(!za||!za[qb(0)])&&!gc.intentShown()&&!qa)gc.loadAds(la);gc.adjustAdsToFit();},forceReloadAdsWithCallback:function(hc,ic){ma=ic;ga=k.getID(fa);gc.loadAds(la);},forceReloadAds:function(){gc.loadAds(la);},adjustAdsType:function(hc){if(hc!=na){j.conditionClass(fa,"_22q",!hc);j.conditionClass(fa,"_35q",!hc);ya&&j.conditionClass(ya,"_22q",!hc);ya&&j.conditionClass(ya,"_35q",!hc);na=hc;zb();gc.adjustAdsToFit();var ic=x('rightColContent');if(ic)j.conditionClass(ic,'fbTimelineWideRightCol',hc);}},displayAdsPoll:function(){var hc=-1;for(var ic=0;ic<ka.getCount();ic++){var jc=ka.getUnit(ic);if(!jc)continue;if(hc===-1&&fc(jc))hc=ic;yb(jc);}gc.adjustAdsToFit();if(hc===ia&&hc>0){pb(ka.getUnit(hc-1),true);pb(ka.getUnit(hc),false);}},hideAdsPoll:function(){zb();gc.adjustAdsToFit();},adjustAdsToFit:function(){if(!fa||fb)return;fb=true;var hc;if(xa){hc=na?va:ua;if(oa&&ya){oa.handleScroll();if(oa.isFixed()){j.conditionShow(ya,wb(0)<=mb(1)&&!j.hasClass(document.documentElement,'tinyViewport'));}else ob(hc);rb();}}else{hc=na?ta:sa;var ic=mb(hc);if(typeof ic!=='undefined'){ja=ic;ob(vb(ic));rb();}}fb=false;},reset:function(){oa&&oa.stop();wa&&wa.cancel();ka=new l();na=false;fa=null;oa=null;wa=null;ca=0;xa=null;ya=null;la=null;pa=Infinity;da=false;ab&&i.unsubscribe(ab);ab=null;bb&&i.unsubscribe(bb);bb=null;cb&&i.unsubscribe(cb);db&&i.unsubscribe(db);eb&&i.unsubscribe(eb);cb=null;qa=false;gb.forEach(function(hc){hc.remove();});gb=[];hb&&hb.reset();}};e.exports=a.TimelineSideAds||gc;},null);
__d("TimelineStickyHeader",["Animation","Arbiter","Bootloader","CSS","DOM","Style","TimelineController","TimelineURI","Vector","ViewportBounds","csx","ge","queryThenMutateDOM"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var t=200,u=false,v=false,w,x,y,z,aa,ba,ca={},da={VISIBLE:'TimelineStickyHeader/visible',ADJUST_WIDTH:'TimelineStickyHeader/adjustWidth',init:function(ea){if(u)return;u=true;w=ea;x=k.find(ea,'div.name');y=k.find(ea,'div.actions');v=j.hasClass(ea,'fbTimelineStickyHeaderVisible');var fa=k.find(document,"div._4f7n"),ga,ha=false;s(function(){if(fa.offsetTop&&!r('page_admin_panel')&&m.getCurrentKey()!==n.TIMELINE_KEY){ga=o.tElementDimensions(fa).y;ha=true;}},function(){if(ha){i.loadModules(["StickyController"],function(ia){new ia(ea,ga).start();});}else j.addClass(ea,'fixed_elem');s(function(){aa=ea.offsetTop;ba=ea.scrollHeight;},function(){z=p.addTop(function(){return v?aa+ba:0;});},'TimelineStickyHeader/init');m.register(m.STICKY_HEADER,da);},'TimelineStickyHeader/init');},reset:function(){u=false;v=false;w=null;x=null;y=null;ca={};z.remove();z=null;},toggle:function(ea){if(ea!==v){var fa=ea?aa-ba:aa,ga=ea?aa:aa-ba;l.set(w,'top',fa+'px');j.addClass(w,'fbTimelineStickyHeaderAnimating');var ha=k.getID(w);ca[ha]&&ca[ha].stop();ca[ha]=new g(w).from('top',fa).to('top',ga).duration(t).ondone(function(){ca[ha]=null;j.conditionClass(w,'fbTimelineStickyHeaderHidden',!ea);w.setAttribute('aria-hidden',ea?'false':'true');j.removeClass(w,'fbTimelineStickyHeaderAnimating');l.set(w,'top','');h.inform(da.VISIBLE,ea);}).go();v=ea;if(v)da.adjustWidth();}},adjustWidth:function(){h.inform(da.ADJUST_WIDTH,x,h.BEHAVIOR_STATE);},getRoot:function(){return w;},setActions:function(ea){if(u&&ea){k.setContent(y,ea);y=ea;}}};e.exports=a.TimelineStickyHeader||da;},null);
__d("ButtonGroup",["CSS","DataStore","Parent","copyProperties","createArrayFromMixed"],function(a,b,c,d,e,f,g,h,i,j,k){var l='firstItem',m='lastItem';function n(s,t){var u=i.byClass(s,t);if(!u)throw new Error('invalid use case');return u;}function o(s){return g.shown(s)&&k(s.childNodes).some(g.shown);}function p(s){var t,u,v;k(s.childNodes).forEach(function(w){v=o(w);g.removeClass(w,l);g.removeClass(w,m);g.conditionShow(w,v);if(v){t=t||w;u=w;}});t&&g.addClass(t,l);u&&g.addClass(u,m);g.conditionShow(s,t);}function q(s,t){var u=n(t,'uiButtonGroupItem');s(u);p(u.parentNode);}function r(s){"use strict";this._root=n(s,'uiButtonGroup');h.set(this._root,'ButtonGroup',this);p(this._root);}r.getInstance=function(s){"use strict";var t=n(s,'uiButtonGroup'),u=h.get(t,'ButtonGroup');return u||new r(t);};j(r.prototype,{hideItem:q.bind(null,g.hide),showItem:q.bind(null,g.show),toggleItem:q.bind(null,g.toggle)});e.exports=r;},null);
__d("TimelineStickyHeaderNav",["Arbiter","ButtonGroup","CSS","DataStore","DOM","Event","Parent","SelectorDeprecated","Style","SubscriptionsHandler","TimelineConstants","TimelineController","TimelineLegacySections","URI","Vector","csx","fbt"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){var x=false,y,z,aa,ba,ca,da,ea,fa,ga,ha,ia,ja={},ka={},la=[],ma=false,na=[],oa=[],pa,qa=["\u0e21\u0e01\u0e23\u0e32\u0e04\u0e21","\u0e01\u0e38\u0e21\u0e20\u0e32\u0e1e\u0e31\u0e19\u0e18\u0e4c","\u0e21\u0e35\u0e19\u0e32\u0e04\u0e21","\u0e40\u0e21\u0e29\u0e32\u0e22\u0e19","\u0e1e\u0e24\u0e29\u0e20\u0e32\u0e04\u0e21","\u0e21\u0e34\u0e16\u0e38\u0e19\u0e32\u0e22\u0e19","\u0e01\u0e23\u0e01\u0e0e\u0e32\u0e04\u0e21","\u0e2a\u0e34\u0e07\u0e2b\u0e32\u0e04\u0e21","\u0e01\u0e31\u0e19\u0e22\u0e32\u0e22\u0e19","\u0e15\u0e38\u0e25\u0e32\u0e04\u0e21","\u0e1e\u0e24\u0e28\u0e08\u0e34\u0e01\u0e32\u0e22\u0e19","\u0e18\u0e31\u0e19\u0e27\u0e32\u0e04\u0e21"];function ra(){var eb=n.getSelectorMenu(ca);pa.addSubscriptions(l.listen(eb,'click',sa),g.subscribe(q.SECTION_REGISTERED,wa));}function sa(event){var eb=m.byTag(event.getTarget(),'a'),fb=eb&&j.get(eb,'key');if(fb){r.stickyHeaderNavWasClicked(fb);r.navigateToSection(fb);event.prevent();}}function ta(eb,fb){var gb=n.getValue(fb);if(gb==='allStories')s.get(eb).expandSubSections();if(gb!=='activityLog')ua(fb);}function ua(eb){cb(eb,'highlights');cb(eb,'allStories');var fb=k.find(eb,'li.separator');i.conditionShow(fb,fb.previousSibling);}function va(eb){if(ha===eb&&fa[eb]&&!z.custom_subsection_menu){ab(eb);}else xa();r.adjustStickyHeaderWidth();}function wa(eb,fb){var gb=fb.period,hb=gb.parentKey;if(!hb)return;var ib=za(hb),jb=r.getCurrentScrubber(),kb=gb.scrubberKey,lb=jb?jb.getLabelForSubnav(hb,kb):lb=ya(kb);if(lb){fa[hb]=true;bb(ib,{key:kb,label:lb});va(hb);}}function xa(){aa.hideItem(da);}function ya(eb){var fb=eb.split('_');return qa[fb.pop()-1];}function za(eb){var fb=ea[eb];if(!fb){fb=ea[eb]=da.cloneNode(true);var gb=k.scry(fb,'li.activityLog a')[0];if(gb)gb.href=t(gb.href).addQueryData({key:eb});pa.addSubscriptions(n.listen(fb,'change',ta.bind(null,eb,fb)),l.listen(fb,'click',sa));}return fb;}function ab(eb){var fb=za(eb);k.insertAfter(da,fb);i.hide(da);for(var gb in ea){var hb=ea[gb];i.conditionShow(hb,hb===fb);}aa.showItem(da);}function bb(eb,fb){var gb=k.create('a',{href:'#',rel:'ignore',className:'itemAnchor',tabIndex:0},k.create('span',{className:'itemLabel fsm'},fb.label));gb.setAttribute('data-key',fb.key);gb.setAttribute('aria-checked',false);var hb=k.create('li',{className:'uiMenuItem uiMenuItemRadio uiSelectorOption'},gb);hb.setAttribute('data-label',fb.label);var ib=k.find(eb,'ul.uiMenuInner'),jb=k.create('option',{value:fb.key},fb.label),kb=k.find(eb,'select');if(fb.key==='recent'){k.prependContent(ib,hb);k.insertAfter(kb.options[0],jb);}else{k.appendContent(ib,hb);k.appendContent(kb,jb);}}function cb(eb,fb){var gb=k.scry(eb,'li.uiMenuItem');if(!gb)return;for(var hb=0;hb<gb.length;hb++){var ib=gb[hb];if(i.hasClass(ib,fb)||ib.firstChild.getAttribute('data-key')==fb){k.remove(ib);break;}}var jb=k.find(eb,'select'),kb=k.scry(jb,'option');for(hb=0;hb<kb.length;hb++)if(kb[hb].value===fb){k.remove(kb[hb]);return;}}var db={init:function(eb,fb){if(x)return;x=true;y=eb;z=fb||{};ba=k.find(y,'div.pageMenu');ca=k.find(y,'div.sectionMenu');da=k.find(y,'div.subsectionMenu');ia=k.find(ba,'li.uiMenuSeparator');aa=h.getInstance(ba);pa=new p();ea={};fa={};ga={};db.adjustMenuHeights();ra();r.register(r.STICKY_HEADER_NAV,db);oa.forEach(function(gb){gb();});},reset:function(){x=false;z={};la=[];ja={};ka={};ma=false;na=[];y=null;ba=null;ca=null;da=null;ia=null;ea={};fa={};ga={};pa.release();},addTimePeriod:function(eb){var fb=r.getCurrentScrubber();if(!fb)return;var gb=fb.getLabelForNav(eb);if(!gb)return;bb(ca,{key:eb,label:gb});var hb=k.find(ca,'ul.uiMenuInner');if(eb==='recent'||hb.children.length<2)n.setSelected(ca,eb,true);},updateSection:function(eb,fb){if(fb){var gb=za(eb);n.setSelected(gb,fb);ua(gb);}else ga[eb]=true;ha=eb;n.setSelected(ca,eb,true);va(eb);},adjustMenuHeights:function(){[ba,ca].forEach(function(eb){var fb='';if(!i.hasClass(document.documentElement,'tinyViewport')){fb=u.getViewportDimensions().y-u.getElementDimensions(k.scry(document,"div._4f7n")[0]).y-80;fb+='px';}o.set(k.find(eb,'ul.uiMenuInner'),'maxHeight',fb);});},initPageMenu:function(eb,fb){if(!x){oa.push(db.initPageMenu.bind(null,eb,fb));return;}function gb(hb,ib){hb.forEach(function(jb){var kb=ka[jb]=k.create('li');i.hide(kb);ib?k.insertBefore(ia,kb):k.appendContent(k.find(ba,'ul.uiMenuInner'),kb);});}gb(eb,true);gb(fb,false);ja.info=k.scry(ba,'li')[0];la=fb;ma=true;if(na.length)na.forEach(function(hb){db.registerPageMenuItem(hb.key,hb.item);});},registerPageMenuItem:function(eb,fb){if(!ma){na.push({key:eb,item:fb});return;}if(ka[eb]){k.replace(ka[eb],fb);ja[eb]=fb;delete ka[eb];if(la.indexOf(eb)>=0)i.show(ia);}},removeTimePeriod:function(eb){cb(ca,eb);},hideSectionMenu:function(){x&&i.hide(ca);}};e.exports=db;},null);
__d("TimelineOGCollectionReportGrid",["CSS","OGCollectionAddObject"],function(a,b,c,d,e,f,g,h){var i={init:function(j,k){h.subscribe([h.NEW_ITEM,h.PLACEHOLDER],i.hideOverflowNodes.bind(null,j,k));},hideOverflowNodes:function(j,k,l,m){if(m.grid!=j)return;for(var n=0;n<j.childNodes.length;n++)g.conditionShow(j.childNodes[n],n<k);}};e.exports=i;},null);
__d("TimelineScrubber",["CSS","DOM","Event","Focus","Keys","Parent","TimelineController","Vector","copyProperties","getElementText"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){function q(r){"use strict";this._root=r;this._navKeys={};this._subNavKeys={};this._rollups={};this._rolledup={};var s=r.childNodes;this._currentNav=s[0];for(var t=0;t<s.length;t++){var u=s[t].getAttribute('data-key');this._navKeys[u]=s[t];var v=h.scry(s[t],'ul');this._subNavKeys[u]={};if(v.length){var w=v[0].childNodes;for(var x=0;x<w.length;x++)this._subNavKeys[u][w[x].getAttribute('data-key')]=w[x];}var y=s[t].getAttribute('data-rollup');if(y){this._rollups[y]=this._rollups[y]||[];this._rollups[y].push(s[t]);}}this._clickListener=i.listen(this._root,'click',this._handleScrub.bind(this));this._focusHandler=i.listen(this._root,'keydown',this._moveFocus.bind(this));this._tabbableElement=h.scry(this._root,'a')[0];g.show(this._root);var z=n.getViewportDimensions().y-this.SCRUBBER_NO_ADS_VERTICAL_BUFFER,aa=this.getHeight();if(aa>z)this.fold(aa-z);m.register(m.SCRUBBER,this);m.scrubberHasLoaded(this);}q.prototype.reset=function(){"use strict";this._root=null;this._navKeys={};this._subNavKeys={};this._rollups={};this._rolledup={};};q.prototype.getRoot=function(){"use strict";return this._root;};q.prototype.getNav=function(r){"use strict";return this._navKeys[r];};q.prototype.getSubnav=function(r,s){"use strict";var t=this._subNavKeys[r];return t&&t[s];};q.prototype.getHeight=function(){"use strict";return this._root.offsetHeight;};q.prototype.getLabelForNav=function(r){"use strict";var s=this.getNav(r);return s&&p(h.scry(s,'a')[0]);};q.prototype.getLabelForSubnav=function(r,s){"use strict";var t=this.getSubnav(r,s);return t&&p(h.scry(t,'a')[0]);};q.prototype.fold=function(r){"use strict";return this._adjustFolding(r,true);};q.prototype.unfold=function(r){"use strict";return this._adjustFolding(r,false);};q.prototype.getOffset=function(){"use strict";return this.OFFSET+(g.hasClass(document.body,'hasVoiceBar')?26:0)+(g.hasClass('rightColContent','pagesTimelineRightColumn')?48:0);};q.prototype.updateSection=function(r,s){"use strict";if(!this._navKeys[r])return;var t=this._navKeys[r].getAttribute('data-rollup');if(this._currentRollup&&this._currentRollup!=t){g.removeClass(this._currentRollup,'selected');g.removeClass(h.scry(this._currentRollup,'ul')[0],'loaded');delete this._currentRollup;}if(t&&this._rolledup[t]){var u=this._rolledup[t];if(u.getAttribute('data-rollup')){this._currentRollup=u;g.addClass(this._currentRollup,'selected');g.addClass(h.scry(this._currentRollup,'ul')[0],'loaded');}}this._currentNav&&g.removeClass(this._currentNav,'selected');this._currentSubNav&&g.removeClass(this._currentSubNav,'selected');this._currentNav=null;this._currentSubNav=null;if(this._navKeys[r]){this._currentNav=this._navKeys[r];g.addClass(this._currentNav,'selected');if(this.decadesAreSelectable&&this._navKeys[s]){this._currentSubNav=this._navKeys[s];g.addClass(this._currentSubNav,'selected');}else if(s&&this._subNavKeys[r][s]){this._currentSubNav=this._subNavKeys[r][s];g.addClass(this._currentSubNav,'selected');}}};q.prototype._getRollupSize=function(r){"use strict";var s=this._currentNav,t=s&&s.getAttribute('data-rollup'),u=this.KEY_HEIGHT*(this._rollups[r].length-1);if(r==t){u+=this.SUBKEY_HEIGHT*h.scry(s,'li').length;u-=this.SUBKEY_HEIGHT*(this._rollups[r].length-1);}return u;};q.prototype._adjustFolding=function(r,s){"use strict";var t=r,u=Object.keys(this._rollups);while(r>0&&u.length){var v=u[s?'pop':'shift']();if(!s==!this._rolledup[v])continue;var w=this._getRollupSize(v);if(w<=0)continue;if(!s&&w>r)break;this[s?'_collapseRollup':'_expandRollup'](v);r-=w;}return t-r;};q.prototype._collapseRollup=function(r){"use strict";var s=this._rollups[r];if(!s||s.length<2||this._rolledup[r])return;var t=s[0].previousSibling,u=s[0],v=h.create('a',{href:u.firstChild.href,rel:'ignore',tabindex:'-1'},[r]),w=h.create('ul',{className:'clearfix'});for(var x=0;x<s.length;x++)w.appendChild(s[x]);var y=h.create('li',null,[v,w]);if(this.decadesAreSelectable){var z=s[s.length-1],aa=u.getAttribute('data-key')+z.getAttribute('data-key');y.setAttribute('data-start',z.getAttribute('data-start'));y.setAttribute('data-end',u.getAttribute('data-end'));y.setAttribute('data-key',aa);this._navKeys[aa]=y;}else y.setAttribute('data-key',u.getAttribute('data-key'));y.setAttribute('data-rollup',r);if(t){h.insertAfter(t,y);}else h.prependContent(this._root,y);this._rolledup[r]=y;this._checkSelection();this._ensureFocusableElementIsVisible();};q.prototype._expandRollup=function(r){"use strict";if(!this._rolledup[r])return;var s=this._rolledup[r],t=h.scry(s,'ul')[0],u=document.createDocumentFragment();while(t.childNodes.length)u.appendChild(t.firstChild);h.replace(s,u);this._rolledup[r]=false;this._checkSelection();};q.prototype._checkSelection=function(){"use strict";if(this._currentNav){var r=this._currentSubNav&&this._currentSubNav.getAttribute('data-key');this.updateSection(this._currentNav.getAttribute('data-key'),r);}};q.prototype._handleScrub=function(event){"use strict";var r=event.getModifiers();if(event.isMiddleClick()||r.access||r.meta)return true;var s=l.byTag(event.getTarget(),'a'),t=s&&l.byAttribute(s,'data-key');if(t){m.scrubberWasClicked(t.getAttribute('data-key'));m.navigateToSection(t.getAttribute('data-key'));return event.prevent();}};q.prototype._ensureFocusableElementIsVisible=function(){"use strict";while(!(this._tabbableElement.offsetHeight||this._tabbableElement.offsetWidth)){this._tabbableElement.tabIndex=-1;var r=l.byTag(l.byTag(this._tabbableElement,'li'),'li');this._tabbableElement=h.scry(r,'a')[0];this._tabbableElement.tabIndex=0;}};q.prototype._moveFocus=function(event){"use strict";if(event.getModifiers().any)return;var r=i.getKeyCode(event);if(r===k.UP||r===k.DOWN){var s=h.scry(this._root,'a').filter(function(v){return v.offsetHeight||v.offsetWidth;}),t=s.indexOf(this._tabbableElement);if(t!=-1){var u=s[t+(r===k.UP?-1:1)];if(u){u.tabindex=0;j.set(u);this._tabbableElement.tabindex=-1;this._tabbableElement=u;event.prevent();}}}};o(q.prototype,{KEY_HEIGHT:23,SUBKEY_HEIGHT:16,OFFSET:38,SCRUBBER_NO_ADS_VERTICAL_BUFFER:125});e.exports=q;},null);
__d("TimelineMainScrubber",["Arbiter","CSS","DOMQuery","TimelineConstants","TimelineController","TimelineScrubber"],function(a,b,c,d,e,f,g,h,i,j,k,l){for(var m in l)if(l.hasOwnProperty(m))o[m]=l[m];var n=l===null?null:l.prototype;o.prototype=Object.create(n);o.prototype.constructor=o;o.__superConstructor__=l;function o(p){"use strict";l.call(this,p);this._subscribe=g.subscribe(j.SECTION_LOADED,function(q,r){var s=this._navKeys[r.key],t=s&&i.scry(s,'ul')[0];if(t){h.addClass(t,'loaded');k.scrubberHasChangedState();if(r.hideSubSections)h.hide(t);}}.bind(this));}o.prototype.reset=function(){"use strict";n.reset.call(this);this._subscribe&&this._subscribe.unsubscribe();};e.exports=o;},null);
__d("ButtonGroupMonitor",["ContextualDialog","ContextualLayer","CSS","Layer","Parent","SelectorDeprecated","DataStore"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){function n(o,p){var q=k.byClass(o,'bg_stat_elem')||k.byClass(o,'uiButtonGroup');if(!q&&p)q=m.get(p,'toggleElement',null);if(q){p&&m.set(p,'toggleElement',q);i.toggleClass(q,'uiButtonGroupActive');}}j.subscribe(['hide','show'],function(o,p){if(p instanceof h||p instanceof g)n(p.getCausalElement(),p);});l.subscribe(['close','open'],function(o,p){n(p.selector);});},null);