import api from '../js/http.js';


let eBookData;
function init() {
  //拿出來
  const userInfo = JSON.parse(localStorage.getItem('eBook'));
  const js_UserAvatar = document.querySelector('.js-userAvatar');

  // token 不對就跳轉到首頁
  if (userInfo.user.role !== "admin") {
    setTimeout(() => {
      window.location.href = `../frontendView/myBooks.html`
    }, 1000)
  }
  if (userInfo) {
    js_UserAvatar.innerHTML = `<div class="js-userAvatar w-10 rounded-full">
      <img src="${userInfo.user.avatarUrl}" />
    </div>`
  }
  axios
    .get(`${api.url}books`)
    .then(function (response) {
      eBookData = response.data;
      //console.log(eBookData);
      //renderC3();
      renderECharts();
    });
}
init();
// 把我的帳號改成登出功能 登出時也將localStorage刪除
function signOutEven() {
  const js_BackendView = document.querySelector(".js-backendView");
  const js_SignOutBtn = document.querySelector(".js-signoutBtn");
  js_BackendView.innerHTML = `<a href="../backendView/dashboard.html">後台管理</a> `
  js_SignOutBtn.innerHTML = `<a href="../index.html"
  class="btn btn-outline btn-sm mt-2 p-0 border-primary  text-primary rounded-sm hover:bg-primary1 hover:border-none hover:text-white">
  登出帳號
  </a>`;
  js_SignOutBtn.addEventListener('click', () => {
    localStorage.clear();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '88 你登出了~',
      showConfirmButton: false,
      timer: 5000
    })
  });

}
signOutEven();

// C3
// function renderC3() {
//   // 篩選 tag ，並累加數字上去
//   let totalObj = {};
//   data.forEach(function (item, index) {
//     if (totalObj[item.tag] == undefined) {
//       totalObj[item.tag] = 1;
//     } else {
//       totalObj[item.tag] += 1;
//     }
//   });


//   let newData = [];
//   let tag = Object.keys(totalObj);
//   tag.forEach(function (item, index) {
//     let ary = [];
//     ary.push(item);
//     ary.push(totalObj[item]);
//     newData.push(ary);
//   });

//   // 將 newData 丟入 c3 產生器
//   const chart = c3.generate({
//     bindto: "#chart",
//     data: {
//       columns: newData,
//       type: "donut",
//       //自訂 data 顏色
//       colors: {
//         '中文文學': '#f19066',
//         '心理勵志': '#778beb',
//         '電腦資訊': '#f5cd79',
//         '旅遊': '#e66767',
//         '居家料理': '#f78fb3',
//         '藝術設計': '#3dc1d3'
//       },

//     },
//     // 甜甜圈裡面的名字
//     donut: {
//       title: "書種分類"
//     },

//   });
// }
// // function renderList() {
// //   const list = document.querySelector('.list');
// //   let str = '';
// //   data.forEach(function (item) {
// //     str += `<li>${item.name}</li>`
// //   })
// //   list.innerHTML = str;
// // }


function renderECharts() {
  var dom = document.getElementById('chart-container');
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};

  var option;

  const colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
  const bgColor = '#192236';
  const itemStyle = {
    star5: {
      color: colors[0]
    },
    star4: {
      color: colors[1]
    },
    star3: {
      color: colors[2]
    },
    star2: {
      color: colors[3]
    }
  };
  let totalObj = {};

  const data = [
    {
      name: '書種分析',
      itemStyle: {
        color: colors[1]
      },
      children: []
    }
  ];

  // 一、以物件方式篩選書本的 tag 屬性與含有此 tag 的資料，原因是不知道有甚麼 tag
  eBookData.forEach(function (item, index) {
    if (totalObj[item.tag] == undefined) {
      totalObj[item.tag] = [{ name: item.name, rate: item.rate }];
    } else {
      totalObj[item.tag].push({ name: item.name, rate: item.rate });
    }
  });

  Object.keys(totalObj).forEach(item => {
    const rateObj = {};
    totalObj[item].forEach(bookItem => {
      if (rateObj[bookItem.rate] === undefined) {
        rateObj[bookItem.rate] = [{ name: bookItem.name }];
      } else {
        rateObj[bookItem.rate].push({ name: bookItem.name });
      }
    })
    totalObj[item] = rateObj;
  })


  Object.keys(totalObj).forEach(item => {
    const eChartObj = {
      name: item,
      children: [
        ...Object.keys(totalObj[item]).map(bookRate => {
          return {
            name: bookRate + '☆',
            children: totalObj[item][bookRate]
          }
        })
      ]
    }
    data[0].children.push(eChartObj);
  })
  for (let j = 0; j < data.length; ++j) {
    let level1 = data[j].children;
    for (let i = 0; i < level1.length; ++i) {
      let block = level1[i].children;
      let bookScore = [];
      let bookScoreId;
      for (let star = 0; star < block.length; ++star) {
        let style = (function (name) {
          switch (name) {
            case '5☆':
              bookScoreId = 0;
              return itemStyle.star5;
            case '4☆':
              bookScoreId = 1;
              return itemStyle.star4;
            case '3☆':
              bookScoreId = 2;
              return itemStyle.star3;
            case '2☆':
              bookScoreId = 3;
              return itemStyle.star2;
          }
        })(block[star].name);
        block[star].label = {
          color: style.color,
          downplay: {
            opacity: 0.5
          }
        };
        if (block[star].children) {
          style = {
            opacity: 1,
            color: style.color
          };
          block[star].children.forEach(function (book) {
            book.value = 1;
            book.itemStyle = style;
            book.label = {
              color: style.color
            };
            let value = 1;
            if (bookScoreId === 0 || bookScoreId === 3) {
              value = 5;
            }
            if (bookScore[bookScoreId]) {
              bookScore[bookScoreId].value += value;
            } else {
              bookScore[bookScoreId] = {
                color: colors[bookScoreId],
                value: value
              };
            }
          });
        }
      }
      level1[i].itemStyle = {
        color: data[j].itemStyle.color
      };
    }
  }
  option = {
    backgroundColor: bgColor,
    color: colors,
    series: [
      {
        type: 'sunburst',
        center: ['50%', '48%'],
        data: data,
        sort: function (a, b) {
          if (a.depth === 1) {
            return b.getValue() - a.getValue();
          } else {
            return a.dataIndex - b.dataIndex;
          }
        },
        label: {
          rotate: 'radial',
          color: bgColor
        },
        itemStyle: {
          borderColor: bgColor,
          borderWidth: 2
        },
        levels: [
          {},
          {
            r0: 0,
            r: 40,
            label: {
              rotate: 0
            }
          },
          {
            r0: 40,
            r: 105
          },
          {
            r0: 115,
            r: 140,
            itemStyle: {
              shadowBlur: 2,
              shadowColor: colors[2],
              color: 'transparent'
            },
            label: {
              rotate: 'tangential',
              fontSize: 10,
              color: colors[0]
            }
          },
          {
            r0: 140,
            r: 145,
            itemStyle: {
              shadowBlur: 80,
              shadowColor: colors[0]
            },
            label: {
              position: 'outside',
              textShadowBlur: 5,
              textShadowColor: '#333'
            },
            downplay: {
              label: {
                opacity: 0.8
              }
            }
          }
        ]
      }
    ]
  };

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
}
