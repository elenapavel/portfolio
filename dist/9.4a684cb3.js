(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{387:function(e){e.exports=JSON.parse('{"id":"architecture","logo":"/architecture/architecture_logo.png","quote":"Your daily dose of art, design and architecture curation.","categories":[{"label":"Argentina"},{"label":"China"},{"label":"Slovenia"}],"articles":[{"title":"Equestrian House","date":"29.04.2018","category":"Argentina","image":"/architecture/equestrian_house.jpg","content":["Equestrian House is a holiday residence located in Costa Esmeralda, a picturesque stretch of coastline 250 miles (400 kilometres) south of Buenos Aires.","The concrete \u2013 which is textured by the imprints of wooden boards and is a popular aesthetic in Argentina \u2013 forms the roof, floor and interior walls of the single-storey house. Meanwhile, the exterior walls are made of wood, glass and a metal structure.","Vertical concrete fins between the roof and the floor bolster the wall structure, and extend out in front of large windows placed to make the most of forested views. Blackened pine wood clads the rear to provide privacy from neighbours."],"more":"https://www.dezeen.com/2018/04/29/equestrian-house-luciano-kruk-board-marked-concrete-holiday-home-argentina-blackened-wood/","extras":{"title":"Luciano Kruk combines blackened wood with concrete","content":"Kruk designed the latest house for a couple with two children, who asked him to use less concrete than previous designs in order to build it cheaply and quickly."}},{"title":"Garden chapel","date":"09.10.2014","category":"China","image":"/architecture/garden_chapel.jpg","content":["Dark shingles cover this roof, which folds back on itself to give the square-planned building two corners that pitch sharply upwards and two that dip down.","A cross tops the 12-metre peak on the west facade, while a second low-level pitched roof nestled in the dip gives height to the church hall beneath.","Below the roof, a double-layered facade consists of solid white walls, screened behind a semi-transparent wooden skin.","\'The exterior wood strips and asphalt shingles are left in their natural colour, emphasising the importance of nature,\' said the architects."],"more":"https://www.dezeen.com/2014/10/09/nanjing-wanjing-garden-chapel-azl-architects/","extras":{"title":"This chapel features semi-transparent walls and a butterfly roof","content":"The building\'s most noticeable feature is its profile \u2013 a variation on the typical butterfly roof, an inverted structure that rises at its edges rather that at its centre."}},{"title":"Open-air chapel","date":"29.04.2018","category":"Slovenia","image":"/architecture/open_air_chapel.jpg","content":["Over recent years the village has gradually transformed from a small rural settlement into a suburb for commuters working in the nearby town.","Skorba\'s organic expansion altered the historic clustered street plan, and left the village without a defined centre or space for public meeting and events.","A decision to create a new chapel in the village prompted Skorba\'s inhabitants to consider creating a multipurpose space that could also fulfil the functions of a traditional public square."],"more":"https://www.dezeen.com/2018/04/29/sloping-concrete-volumes-enclose-social-hub-chapel-in-slovenian-village-architecture/","extras":{"title":"Sloping concrete volumes in Slovenian village","content":"The concrete structure is positioned centrally on the vacant plot and is partially embedded in a grassy bank. A narrow path extends across the grass to connect the main functional area with the adjacent road."}}]}')},415:function(e,t,r){"use strict";r.r(t);var a=r(1),n=r.n(a),o=r(2);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object(o.m)(t)?t:t.type,a=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(r,!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e);switch(r){case"selectArticleIndex":var n=t.index;a.lastSelectedArticleIndex=a.selectedArticleIndex,a.selectedArticleIndex=n,a.selectedCategoryLabel=a.articles[n].category;break;case"selectArticleByCategoryIndex":var l=t.index;a.articles.forEach((function(e,t){e.category==a.categories[l].label&&(a.lastSelectedArticleIndex=a.selectedArticleIndex,a.selectedArticleIndex=t,a.selectedCategoryLabel=a.categories[l].label)}));break;case"set":(function(e){throw new Error('"'+e+'" is read-only')})("state"),a=t.initialState;break;default:throw Error("Website: action not found.")}return a}var s=r(381),u=r(111);const d={categories_container:"P6iz9x",categories_overlay:"_1uIBq3",category:"_1rL4xx"};u.a.bind(null,d);var m=d;function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(r,!0).forEach((function(t){b(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var g=function(){var e=Object(a.useContext)(X),t=Object(a.useContext)(V),r=t.categories,o=t.selectedCategoryLabel,c=Object(s.c)({config:p({duration:700},s.b.slow),from:{width:"100%",opacity:1},to:{width:"0",opacity:.9}});return n.a.createElement("b",{className:m.categories_container},r.map((function(t,r){return n.a.createElement("b",{key:r,className:m.category,onClick:function(){t.label!=o&&e({type:"selectArticleByCategoryIndex",index:r})}},t.label)})),n.a.createElement(s.a.div,{className:m.categories_overlay,style:c}))};const h={container:"_3k4c60",to_left:"_29AA3O",to_right:"WCO-Kx",logo:"_2cpL1v",quote:"_304lNB"};u.a.bind(null,h);var y=h,w=n.a.createElement(g,null),v=function(e){var t=e.logo,r=e.quote,a=Object(s.c)({config:s.b.slow,from:{opacity:0,transform:"translateY(100%)"},to:{opacity:1,transform:"translateY(0)"}}),o=Object(s.c)({config:s.b.slow,delay:100,duration:400,from:{opacity:0,transform:"translateX(-100%)"},to:{opacity:1,transform:"translateX(0)"}});return n.a.createElement("b",{className:y.container},n.a.createElement("b",{className:y.to_left},n.a.createElement("b",{className:y.logo},n.a.createElement(s.a.div,{style:a},n.a.createElement("img",{src:t}))),n.a.createElement("b",{className:y.quote},n.a.createElement(s.a.div,{style:o},n.a.createElement("b",null,r)))),n.a.createElement("b",{className:y.to_right},w))},O=r(62);const _={content_container:"_3OMBlz",content_title:"mDmlek",content:"tCkqCL",details_section:"_2VadvA",paragraph:"_1nosow",more:"NcSDq8",category:"_1Znaal",date:"Na5Kup"};u.a.bind(null,_);var E=_,j=function(e){var t=e.title,r=e.date,a=e.category,o=e.content,c=e.more,i=(e.lastTitle,e.lastDate,e.lastContent,e.lastMore,e.lastCategory,Object(s.c)({config:s.b.slow,from:{opacity:0,transform:"translateY(3rem)"},to:{opacity:1,transform:"translateY(0)"},reset:!0})),l=Object(s.c)({config:s.b.slow,from:{opacity:0,transform:"translateY(1rem)"},to:{opacity:1,transform:"translateY(0)"},reset:!0}),u=Object(s.c)({config:s.b.slow,from:{opacity:0},to:{opacity:1},reset:!0});return n.a.createElement("b",{className:E.content_container},n.a.createElement(s.a.div,{className:E.content_title,style:i},t),n.a.createElement(s.a.div,{className:E.details_section,style:l},n.a.createElement("b",{className:E.category},a),n.a.createElement("b",{className:E.date},r)),n.a.createElement(s.a.div,{className:E.content,style:u},o.map((function(e,t){return n.a.createElement("b",{key:t,className:E.paragraph},e)})),n.a.createElement("a",{className:E.more,href:c},"Read more")))};const x={actions_container:"_3dAiBs",action:"_29NnHJ"};u.a.bind(null,x);var k=x,A=function(){var e=Object(a.useContext)(X),t=Object(a.useContext)(V),r=t.selectedArticleIndex,o=t.articles;return n.a.createElement("b",{className:k.actions_container},0==r?null:n.a.createElement("b",{className:k.action,onClick:function(){return e({type:"selectArticleIndex",index:r-1})}},"Previous"),r==o.length-1?null:n.a.createElement("b",{className:k.action,onClick:function(){return e({type:"selectArticleIndex",index:r+1})}},"Next"))};const N={to_left:"_3LThD9",progress_container:"_2BSCf4",progress_to_right:"_5Leg8B",progress_bar:"_3YUBgT",progress_bar_separator:"_2yFFHn"};u.a.bind(null,N);var I=N,S=n.a.createElement(A,null),P=function(e){var t=e.index,r=e.total,a=parseInt(t)+1<10?"0"+(parseInt(t)+1):parseInt(t)+1,o=parseInt(r)<10?"0"+parseInt(r):parseInt(r);return n.a.createElement("b",{className:I.progress_container},n.a.createElement("b",{className:I.to_left},S),n.a.createElement("b",{className:I.progress_to_right},a," / ",o,"."),n.a.createElement("b",{className:I.progress_bar},n.a.createElement("b",{className:I.progress_bar_separator,style:{width:"".concat((t+1)*(100/r),"%")}})))};const C={container:"_1FFik0",to_left:"_221Du_",to_right:"_23uvQs",image_container:"_3pPmZx",image:"_1SxB5d",extras:"_3Jb58B",image_title:"_2MYeD0",image_content:"Sg6pRH"};u.a.bind(null,C);var D=C;function q(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function B(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?q(r,!0).forEach((function(t){L(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):q(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function L(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],a=!0,n=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(r.push(c.value),!t||r.length!==t);a=!0);}catch(l){n=!0,o=l}finally{try{a||null==i.return||i.return()}finally{if(n)throw o}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var T=function(e){var t=e.image,r=e.extras,o=(e.lastImage,e.lastExtras,Y(Object(a.useState)(0),2)),c=o[0],i=o[1];Object(a.useEffect)((function(){var e=Object(O.b)(t,200);function t(){i(window.innerWidth>767)}return t(),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]);var l=Object(s.f)(t,null,{config:s.b.woobly,from:{transform:"scale(1.1)",opacity:0},enter:{transform:"scale(1)",opacity:1},leaves:{transform:"scale(0.9)",opacity:0}}),u=Object(s.c)({config:s.b.slow,from:{opacity:0},to:{opacity:1}}),d=Object(s.c)({config:s.b.slow,from:{opacity:"0",transform:"translateY(3rem)"},to:{opacity:"1",transform:"translateY(0)"},reset:!0}),m=Object(s.c)({config:s.b.slow,delay:400,duration:150,from:{opacity:"0",transform:"translateY(3rem)"},to:{opacity:"1",transform:"translateY(0)"},reset:!0});return n.a.createElement("b",{className:D.image_container},c?n.a.createElement("b",{className:D.image,style:{backgroundImage:'url("'.concat(t,'")')}}):l.map((function(e,r){var a=e.props;return n.a.createElement(s.a.div,{key:r,style:B({height:"100%",position:"absolute",width:"100%"},a)},n.a.createElement("b",{className:D.image,style:{backgroundImage:'url("'.concat(t,'")')}}))})),n.a.createElement(s.a.div,{style:u,className:D.extras},n.a.createElement(s.a.div,{style:d,className:D.image_title},r.title),n.a.createElement(s.a.div,{style:m,className:D.image_content},r.content)))};const z={container:"_18tjHl",to_left:"_1TkBKg",to_right:"_1Jkf4a"};u.a.bind(null,z);var H=z;function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],a=!0,n=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(r.push(c.value),!t||r.length!==t);a=!0);}catch(l){n=!0,o=l}finally{try{a||null==i.return||i.return()}finally{if(n)throw o}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var M=function(e){var t=e.article,r=e.lastArticle,o=e.total,c=e.currentIndex,i=e.lastIndex,l=J(Object(a.useState)(0),2),u=l[0],d=l[1];Object(a.useEffect)((function(){var e=Object(O.b)(t,200);function t(){d(window.innerWidth>1023)}return t(),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]);var m=Object(s.f)(c,null,{config:s.b.slow,duration:400,from:{opacity:0,left:"".concat(c>i?"-100%":"100%")},enter:{opacity:1,left:"0"},leave:{opacity:0,left:"".concat(c>i?"-100%":"100%")}}),f=n.a.createElement(P,{index:c,total:o});return n.a.createElement("b",{className:H.container},n.a.createElement("b",{className:H.to_left},n.a.createElement(j,{title:t.title,date:t.date,category:t.category,content:t.content,more:t.more,lastTitle:r.title,lastDate:r.date,lastCategory:r.category,lastContent:r.content,lastMore:r.more}),u?n.a.createElement(P,{index:c,total:o}):m.map((function(e,t){var r=e.props;return n.a.createElement(s.a.div,{key:t,style:r},f)}))),n.a.createElement("b",{className:H.to_right},n.a.createElement(T,{image:t.image,extras:t.extras,lastImage:r.image,lastExtras:r.extras})))},K=r(387);const F={application:"_-4mfMY",container:"_2uxkeq"};u.a.bind(null,F);var W=F;function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],a=!0,n=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(r.push(c.value),!t||r.length!==t);a=!0);}catch(l){n=!0,o=l}finally{try{a||null==i.return||i.return()}finally{if(n)throw o}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}r.d(t,"ArchitectureState",(function(){return V})),r.d(t,"ArchitectureDispatch",(function(){return X}));var V=n.a.createContext(null),X=n.a.createContext(null);t.default=function(){var e={logo:K.logo,quote:K.quote,categories:K.categories,articles:K.articles,selectedArticleIndex:0,selectedCategoryLabel:"Argentina",lastSelectedArticleIndex:null},t=R(Object(a.useReducer)(l,e),2),r=t[0],o=t[1],c=r.logo,i=r.quote,s=r.selectedArticleIndex,u=r.lastSelectedArticleIndex,d=r.articles,m=null!=u?d[u]:{title:"",content:[""],date:"",image:"",category:"",more:"",extras:{title:"",content:""}};return r?n.a.createElement(X.Provider,{value:o},n.a.createElement(V.Provider,{value:r},n.a.createElement("b",{className:W.application},n.a.createElement("b",{className:W.container},n.a.createElement(v,{logo:c,quote:i}),n.a.createElement(M,{article:d[s],lastArticle:m,lastIndex:u||0,currentIndex:s,total:d.length}))))):null}}}]);