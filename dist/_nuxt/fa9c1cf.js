(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{343:function(t,e,l){"use strict";l.r(e);var o={props:{song:{type:Object,required:!0}},computed:{getDate:function(){return this.$moment(this.song.date).format("YYYY/MM/DD")}}},c=l(12),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"w-full flex flex-col md:flex-row gap-3"},[l("iframe",{staticClass:"w-full rounded-md h-[30vh]",attrs:{src:"https://www.youtube.com/embed/"+t.song.youtubeId,title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}}),t._v(" "),l("div",{staticClass:"flex flex-col w-full justify-center gap-3"},[l("div",{staticClass:"flex flex-col p-4 w-full bg-gray-900 bg-opacity-30 rounded-md gap-3"},[l("h1",{staticClass:"flex gap-3 font-bold text-lg"},[t._v("\n        Name:\n        "),l("h1",{staticClass:"w-full"},[t._v(t._s(t.song.name))])])]),t._v(" "),l("div",{staticClass:"flex flex-col p-4 w-full bg-gray-900 bg-opacity-30 rounded-md gap-3"},[l("h1",{staticClass:"flex gap-3 font-bold text-lg"},[t._v("\n        Artist:\n        "),l("h1",{staticClass:"w-full"},[t._v(t._s(t.song.artist))])])]),t._v(" "),l("div",{staticClass:"flex flex-col p-4 w-full bg-gray-900 bg-opacity-30 rounded-md gap-3"},[l("h1",{staticClass:"flex gap-3 font-bold text-lg"},[t._v("\n        Date:\n        "),l("h1",{staticClass:"w-full"},[t._v(t._s(t.getDate))])])]),t._v(" "),l("a",{staticClass:"flex justify-center rounded-md gap-3 text-white bg-green-600 dark:bg-green-600 p-4 w-full",attrs:{target:"_blank",href:t.song.spotify}},[l("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"#ffffff"}},[l("path",{attrs:{d:"M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm4.87 17.66c-.2 0-.33-.06-.51-.18a12.03 12.03 0 0 0-6.2-1.6c-1.3 0-2.59.16-3.8.42-.19.04-.44.11-.59.11a.75.75 0 0 1-.75-.75c0-.5.29-.75.65-.82 1.48-.34 2.96-.53 4.49-.53 2.62 0 4.97.6 6.98 1.8.3.18.47.36.47.8 0 .43-.35.75-.74.75zm1.3-3.17c-.25 0-.42-.1-.6-.21a15.22 15.22 0 0 0-7.62-1.93c-1.51 0-2.83.21-3.91.5-.24.07-.37.14-.59.14a.94.94 0 0 1-.93-.95c0-.5.24-.86.74-1C6.61 10.67 8 10.4 10 10.4c3.15 0 6.18.78 8.57 2.2.4.24.55.53.55.96 0 .52-.41.94-.93.94zm1.5-3.7c-.25 0-.4-.06-.62-.18-2.18-1.3-5.55-2.02-8.8-2.02-1.63 0-3.29.16-4.8.57-.17.05-.4.14-.62.14-.64 0-1.13-.51-1.13-1.15 0-.65.4-1.02.84-1.15 1.71-.5 3.62-.74 5.7-.74 3.52 0 7.23.73 9.94 2.32.36.2.62.52.62 1.09 0 .65-.53 1.12-1.14 1.12z"}})]),t._v("\n      See on Spotify\n    ")])])])}),[],!1,null,null,null);e.default=component.exports}}]);