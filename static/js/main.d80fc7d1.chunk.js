(this["webpackJsonpth-vkapp"]=this["webpackJsonpth-vkapp"]||[]).push([[0],{155:function(e,t,r){e.exports=r(249)},234:function(e,t,r){},249:function(e,t,r){"use strict";r.r(t);r(156),r(182),r(184),r(185),r(187),r(188),r(189),r(190),r(191),r(192),r(193),r(194),r(196),r(197),r(198),r(199),r(200),r(201),r(202),r(203),r(204),r(205),r(207),r(208),r(209),r(210),r(211),r(212),r(213),r(214),r(215),r(216),r(217),r(218),r(219),r(220),r(221),r(222),r(223),r(224);var n=r(0),a=r.n(n),c=r(24),s=r.n(c),u=r(33),i=r.n(u),o=r(20),l=r.n(o),b=r(87),p=r(48),f=r(34),m=r(35),d=r(92),v=r.n(d),h=(r(233),r(234),r(29)),k=function(e){var t=e.item,r=e.source,n=e.subscribe,c=e.unsubscribe,s=e.isSubscriptionPage,u=e.unsubscribeColor,i=e.subscribeColor;return a.a.createElement("div",{className:"subscriptions-group-item ".concat(s&&"subscription-page")},a.a.createElement("div",{className:"subscriptions-group-item__info"},a.a.createElement("p",{className:"subscriptions-group-item__title"},t.name),a.a.createElement("p",{className:"subscriptions-group-item__count"},"\u041f\u043e\u0434\u043f\u0438\u0441\u0447\u0438\u043a\u043e\u0432: ",t.count)),a.a.createElement("div",{className:"subscriptions-group-item__action-block"},t.isSubscribed?a.a.createElement("button",{"data-source":r,onClick:function(){return c(t)},style:{backgroundColor:u||""},className:"subscriptions-group-button unsubscribe-button"},"\u041e\u0442\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f"):a.a.createElement("button",{"data-source":r,onClick:function(){return n(t)},style:{backgroundColor:i||""},className:"subscriptions-group-button subscribe-button"},"\u041f\u043e\u0434\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f")))};function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function x(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(r,!0).forEach((function(t){Object(b.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var j=function(e){return e.slice(1).split("&").reduce((function(e,t){var r=t.split("="),n=Object(m.a)(r,2),a=n[0],c=n[1];return e[a]=c,e}),{})},E=function(e){return Object.entries(e).map((function(e){return e.join("=")})).join("&")},O=function(){var e=j(window.location.hash),t=j(window.location.search),r=t.vk_group_id||"",c=t.vk_user_id,s=e.s||"",u=Object(n.useState)([]),i=Object(m.a)(u,2),o=i[0],b=i[1],d=Object(n.useState)(!1),g=Object(m.a)(d,2),O=g[0],w=g[1],_=Object(n.useState)({description:"",avatar:"",name:"",unsubscribeColor:"",subscribeColor:""}),y=Object(m.a)(_,2),C=y[0],S=y[1],P=function(){var e=Object(f.a)(l.a.mark((function e(){var t,n,a,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!O){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,fetch("https://smm-n.targethunter.dev/ajax?"+E({method:"vkapp.load_info",group_id:r,user_vk_id:c}));case 5:return t=e.sent,e.next=8,t.json();case 8:if(n=e.sent,a=n.subscriptions,"ok"===(s=Object(p.a)(n,["subscriptions"])).status){e.next=13;break}throw new Error("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435");case 13:w(!0),S(x({},C,{description:s.description,avatar:s.avatar,name:s.name,subscribeColor:s.subscribe_color,unsubscribeColor:s.unsubscribe_color})),b(a),e.next=21;break;case 18:e.prev=18,e.t0=e.catch(2),w(!1);case 21:case"end":return e.stop()}}),e,null,[[2,18]])})));return function(){return e.apply(this,arguments)}}(),N=s?2:1,D=o.find((function(e){return e.id===s})),z=D?D.description||"":C.description||"",A=function(){var e=Object(f.a)(l.a.mark((function e(t){var n,a,s,u,i,f;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return G(),e.prev=1,e.next=4,fetch("https://smm-n.targethunter.dev/ajax?"+E({user_vk_id:c,method:"vkapp.subscribe_user",subscribe_id:t.id,group_id:r}));case 4:return n=e.sent,e.next=7,n.json();case 7:if(a=e.sent,s=a.status,u=Object(p.a)(a,["status"]),"ok"===s){e.next=12;break}throw new Error(u.text||"\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a. \u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u0434\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f");case 12:i=o.map((function(e){return e})),(f=i.find((function(e){return e.id===t.id}))).isSubscribed=!0,f.count=t.count+1,b(i),q(),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(1),alert(e.t0.toString());case 23:case"end":return e.stop()}}),e,null,[[1,20]])})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(f.a)(l.a.mark((function e(t){var n,a,s,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://smm-n.targethunter.dev/ajax?"+E({user_vk_id:c,method:"vkapp.unsubscribe_user",subscribe_id:t.id,group_id:r}));case 3:return n=e.sent,e.next=6,n.json();case 6:if(a=e.sent,s=a.status,u=Object(p.a)(a,["status"]),"ok"===s){e.next=11;break}throw new Error(u.text||"\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a. \u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0442\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f");case 11:return t.isSubscribed=!1,t.count=t.count-1,e.abrupt("return",t);case 16:e.prev=16,e.t0=e.catch(0),alert(e.t0.toString());case 19:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(t){return e.apply(this,arguments)}}(),J=function(){var e=Object(f.a)(l.a.mark((function e(t){var r,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return G(),r=o.map((function(e){return e})),n=r.find((function(e){return e.id===t.id})),e.next=5,I(n);case 5:b(r),F();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(f.a)(l.a.mark((function e(){var t,n,a,s,u,i,p,f,m;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return G(),e.prev=1,e.next=4,fetch("https://smm-n.targethunter.dev/ajax?"+E({user_vk_id:c,method:"vkapp.unsubscribe_all",group_id:r}));case 4:return t=e.sent,e.next=7,t.json();case 7:if("ok"===(n=e.sent).status){e.next=10;break}throw new Error(n.text||"\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a. \u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0442\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f");case 10:G(),a=o.map((function(e){return e})),s=!0,u=!1,i=void 0,e.prev=15,p=a[Symbol.iterator]();case 17:if(s=(f=p.next()).done){e.next=26;break}if((m=f.value).isSubscribed){e.next=21;break}return e.abrupt("continue",23);case 21:return e.next=23,I(m);case 23:s=!0,e.next=17;break;case 26:e.next=32;break;case 28:e.prev=28,e.t0=e.catch(15),u=!0,i=e.t0;case 32:e.prev=32,e.prev=33,s||null==p.return||p.return();case 35:if(e.prev=35,!u){e.next=38;break}throw i;case 38:return e.finish(35);case 39:return e.finish(32);case 40:b(a),F(),e.next=47;break;case 44:e.prev=44,e.t1=e.catch(1),alert(e.t1.toString());case 47:case"end":return e.stop()}}),e,null,[[1,44],[15,28,32,40],[33,,35,39]])})));return function(){return e.apply(this,arguments)}}(),W=Object(n.useState)(null),B=Object(m.a)(W,2),K=B[0],V=B[1],q=function(){V(a.a.createElement(h.a,{actions:[{title:"\u0437\u0430\u043a\u0440\u044b\u0442\u044c",autoclose:!0,style:"cancel"}],onClose:function(){return V(null)}},a.a.createElement("h2",null,"\u0412\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u043e\u0434\u043f\u0438\u0441\u0430\u043b\u0438\u0441\u044c \u043d\u0430 \u0440\u0441\u0441\u044b\u043b\u043a\u0443."),a.a.createElement("p",null,"\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u0441\u043a\u043e\u0440\u043e \u043f\u0440\u0438\u0434\u0451\u0442 \u0412\u0430\u043c \u0432 \u043b\u0438\u0447\u043d\u044b\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f."),a.a.createElement(h.c,null,a.a.createElement(h.b,{onClick:function(){return window.top.location.href="https://vk.com/im?sel=-"+r},size:"l",stretched:!0},"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f\u043c"))))},F=function(){V(a.a.createElement(h.a,{actions:[{title:"\u0437\u0430\u043a\u0440\u044b\u0442\u044c",autoclose:!0,style:"cancel"}],onClose:function(){return V(null)}},a.a.createElement("h2",null,"\u0412\u044b \u043e\u0442\u043f\u0438\u0441\u0430\u043d\u044b."),a.a.createElement("p",null,"\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u0412\u0430\u043c \u0431\u043e\u043b\u044c\u0448\u0435 \u043d\u0435 \u0431\u0443\u0434\u0435\u0442 \u043f\u0440\u0438\u0445\u043e\u0434\u0438\u0442\u044c.")))},G=function(){V(a.a.createElement(h.f,{size:"large"}))};return Object(n.useEffect)((function(){P()})),a.a.createElement(v.a,{popout:K,activePanel:"main"},a.a.createElement(h.d,{id:"main"},a.a.createElement(h.e,null,"\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439"),a.a.createElement("div",{style:{textAlign:"center"}},D&&D.banner&&a.a.createElement("img",{src:"https://scx1.b-cdn.net/csz/news/800/2019/1-nature.jpg",alt:"\u0411\u0430\u043d\u043d\u0435\u0440",style:{maxWidth:"100%"}})),a.a.createElement("div",{style:{padding:"15px"}},(!D||!D.banner)&&a.a.createElement("p",{className:"page-title"},a.a.createElement("img",{src:C.avatar,alt:"\u0410\u0432\u0430\u0442\u0430\u0440\u043a\u0430 \u043f\u0430\u0431\u043b\u0438\u043a\u0430",style:{borderRadius:"50%",marginRight:"16px"}}),C.name),a.a.createElement("p",{className:"page-description"},z),o.filter((function(e){return!s||e.id===s})).map((function(e){return a.a.createElement(k,{item:e,source:N,subscribe:A,unsubscribe:J,subscribeColor:C.subscribeColor,unsubscribeColor:C.unsubscribeColor,isSubscriptionPage:!!D,key:e.id})})),o.filter((function(e){return e.isSubscribed})).length>0&&a.a.createElement("div",{style:{textAlign:"center"}},a.a.createElement("button",{onClick:R,"data-source":"1",style:{backgroundColor:C.unsubscribeColor},className:"subscriptions-group-button unsubscribe-button unsubscribe-all",id:"unsubscribe-all"},"\u041e\u0442\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f \u043e\u0442 \u0432\u0441\u0435\u0445 \u0440\u0430\u0441\u0441\u044b\u043b\u043e\u043a")))))};i.a.send("VKWebAppInit"),s.a.render(a.a.createElement(O,null),document.getElementById("root"))}},[[155,1,2]]]);
//# sourceMappingURL=main.d80fc7d1.chunk.js.map