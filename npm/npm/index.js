import { defineComponent as X, ref as w, onBeforeMount as Y, onBeforeUnmount as Z, openBlock as M, createElementBlock as W, normalizeStyle as p0, createCommentVNode as G, renderSlot as g0, onMounted as v0, withDirectives as F0, vShow as w0 } from "vue";
import C0 from "axios";
import _0 from "lottie-web";
const b0 = { key: 0 }, D0 = /* @__PURE__ */ X({
  __name: "vMiniWeather",
  props: {
    url: {
      type: String,
      default: "https://apia.aidioute.cn/weather/"
    },
    customRequest: {
      type: Function
    }
  },
  emits: ["notice"],
  setup(x, { emit: t }) {
    const y = x, i = t, o = (d) => d !== null && Object.prototype.toString.call(d) === "[object Object]", s = (d) => {
      i("notice", d);
    }, e = w(!1), g = w(""), p = w(""), B = () => {
      typeof window < "u" && window.navigator.geolocation ? window.navigator.geolocation.getCurrentPosition(
        (d) => {
          g.value = d.coords.latitude.toFixed(6), p.value = d.coords.longitude.toFixed(6);
        },
        (d) => {
          switch (d.code) {
            case 0:
              s({
                type: "warning",
                from: "window.navigator.geolocation",
                msg: "\u83B7\u53D6\u4F4D\u7F6E\u4FE1\u606F\u51FA\u9519\uFF01"
              });
              break;
            case 1:
              s({
                type: "warning",
                from: "window.navigator.geolocation",
                msg: "\u963B\u6B62\u8BE5\u9875\u9762\u83B7\u53D6\u4F4D\u7F6E\u4FE1\u606F\uFF01"
              });
              break;
            case 2:
              s({
                type: "warning",
                from: "window.navigator.geolocation",
                msg: "\u6D4F\u89C8\u5668\u65E0\u6CD5\u786E\u5B9A\u60A8\u7684\u4F4D\u7F6E\uFF01"
              });
              break;
            case 3:
              s({
                type: "warning",
                from: "window.navigator.geolocation",
                msg: "\u83B7\u53D6\u4F4D\u7F6E\u4FE1\u606F\u8D85\u65F6\uFF01"
              });
              break;
          }
        }
      ) : s({
        type: "warning",
        from: "window.navigator.geolocation",
        msg: "\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 HTML5 \u7684\u5B9A\u4F4D\u529F\u80FD\uFF01"
      });
    }, v = w(null), L = w("d00"), _ = w(null), $ = () => {
      e.value || (e.value = !0, _.value && clearInterval(_.value), j(), _.value = setInterval(() => {
        j();
      }, 30 * 60 * 1e3));
    }, j = async () => {
      const d = g.value && p.value ? `${y.url}?location_type=1&lat=${g.value}&lng=${p.value}&from=vmweather` : `${y.url}?location_type=0&from=vmweather`;
      try {
        let c;
        if (y.customRequest ? c = await y.customRequest(d) : c = await C0.get(d), (c == null ? void 0 : c.status) === 200) {
          const { data: u } = c;
          o(u) && "code" in u && "data" in u && u.code === 0 ? (o(u.data) && "location" in u.data && o(u.data.location) && "error_msg" in u.data.location && (console.log(`\u83B7\u53D6\u5B9A\u4F4D\u4FE1\u606F\u5931\u8D25; status: 200; error: ${u.data.location.error_msg}`), s({
            type: "warning",
            from: "server",
            msg: u.data.location.error_msg
          })), v.value = u.data.weather, L.value = u.data.weather.weathercode, e.value = !1) : (e.value = !1, o(u) && "msg" in u ? (console.log(`\u83B7\u53D6\u5929\u6C14\u8BF7\u6C42\u5931\u8D25; status: 200; error: ${u.msg}`), s({
            type: "error",
            from: "server",
            msg: u.msg
          })) : (console.log("\u83B7\u53D6\u5929\u6C14\u8BF7\u6C42\u5931\u8D25; status: 200; error: \u670D\u52A1\u5668\u5F02\u5E38"), s({
            type: "error",
            from: "server",
            msg: "\u670D\u52A1\u5668\u5F02\u5E38"
          })));
        } else
          e.value = !1, console.log(`\u83B7\u53D6\u5929\u6C14\u8BF7\u6C42\u5931\u8D25; status: ${c == null ? void 0 : c.status};`), s({
            type: "error",
            from: "axios.error",
            msg: "\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25"
          });
      } catch (c) {
        console.log(c), e.value = !1, console.log(`\u83B7\u53D6\u5929\u6C14\u8BF7\u6C42\u5931\u8D25; status: ${c.response.status};`), s({
          type: "error",
          from: "axios.error",
          msg: "\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25"
        });
      }
    };
    return Y(() => {
      B(), $();
    }), Z(() => {
      _.value && clearInterval(_.value);
    }), (d, c) => (M(), W("div", {
      class: "v-weather",
      onClick: $,
      style: p0(`cursor: ${e.value ? "not-allowed" : "pointer"}; user-select: none;`)
    }, [
      e.value ? (M(), W("span", b0, "\u66F4\u65B0\u4E2D...")) : G("", !0),
      e.value ? G("", !0) : g0(d.$slots, "default", {
        key: 1,
        weather: v.value,
        icon: L.value
      })
    ], 4));
  }
}), n = (x) => S0(x) && x.length === 3 && typeof x[0] == "number" && typeof x[1] == "number" && typeof x[2] == "number" && x[0] >= 0 && x[0] <= 255 && x[1] >= 0 && x[1] <= 255 && x[2] >= 0 && x[2] <= 255, k = (x) => Object.prototype.toString.call(x) === "[object Object]", S0 = (x) => Object.prototype.toString.call(x) === "[object Array]", x0 = (x, t) => Object.prototype.hasOwnProperty.call(x, t), P = (x) => t0("fill", x), B0 = (x) => t0("line", x), q = (x) => i0("fill", x), E0 = (x) => i0("line", x), t0 = (x, t) => {
  const y = x === "line" ? 20 : 24, i = t && n(t) ? [t[0] / 255, t[1] / 255, t[2] / 255, 1] : [0.984313726425, 0.749019622803, 0.141176477075, 1], o = y0(x, "big", t);
  return [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "rays",
      sr: 1,
      ks: {
        o: {
          a: 0,
          k: 100,
          ix: 11
        },
        r: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                0
              ]
            },
            {
              t: 359,
              s: [
                45
              ]
            }
          ],
          ix: 10
        },
        p: {
          a: 0,
          k: [
            256,
            256,
            0
          ],
          ix: 2
        },
        a: {
          a: 0,
          k: [
            0,
            0,
            0
          ],
          ix: 1
        },
        s: {
          a: 0,
          k: [
            80,
            80,
            80
          ],
          ix: 6
        }
      },
      ao: 0,
      shapes: [
        {
          ind: 0,
          ty: "sh",
          ix: 1,
          ks: {
            a: 0,
            k: {
              i: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              o: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              v: [
                [
                  180,
                  0
                ],
                [
                  130.345,
                  0
                ]
              ],
              c: !1
            },
            ix: 2
          },
          hd: !1
        },
        {
          ind: 1,
          ty: "sh",
          ix: 2,
          ks: {
            a: 0,
            k: {
              i: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              o: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              v: [
                [
                  -130.345,
                  0
                ],
                [
                  -180,
                  0
                ]
              ],
              c: !1
            },
            ix: 2
          },
          hd: !1
        },
        {
          ind: 2,
          ty: "sh",
          ix: 3,
          ks: {
            a: 0,
            k: {
              i: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              o: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              v: [
                [
                  127.279,
                  127.279
                ],
                [
                  92.168,
                  92.168
                ]
              ],
              c: !1
            },
            ix: 2
          },
          hd: !1
        },
        {
          ind: 3,
          ty: "sh",
          ix: 4,
          ks: {
            a: 0,
            k: {
              i: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              o: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              v: [
                [
                  -92.168,
                  -92.168
                ],
                [
                  -127.279,
                  -127.279
                ]
              ],
              c: !1
            },
            ix: 2
          },
          hd: !1
        },
        {
          ind: 4,
          ty: "sh",
          ix: 5,
          ks: {
            a: 0,
            k: {
              i: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              o: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              v: [
                [
                  -127.279,
                  127.279
                ],
                [
                  -92.168,
                  92.168
                ]
              ],
              c: !1
            },
            ix: 2
          },
          hd: !1
        },
        {
          ind: 5,
          ty: "sh",
          ix: 6,
          ks: {
            a: 0,
            k: {
              i: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              o: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              v: [
                [
                  92.168,
                  -92.168
                ],
                [
                  127.279,
                  -127.279
                ]
              ],
              c: !1
            },
            ix: 2
          },
          hd: !1
        },
        {
          ind: 6,
          ty: "sh",
          ix: 7,
          ks: {
            a: 0,
            k: {
              i: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              o: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              v: [
                [
                  0,
                  180
                ],
                [
                  0,
                  130.345
                ]
              ],
              c: !1
            },
            ix: 2
          },
          hd: !1
        },
        {
          ind: 7,
          ty: "sh",
          ix: 8,
          ks: {
            a: 0,
            k: {
              i: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              o: [
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              v: [
                [
                  0,
                  -130.345
                ],
                [
                  0,
                  -180
                ]
              ],
              c: !1
            },
            ix: 2
          },
          hd: !1
        },
        {
          ty: "st",
          c: {
            a: 0,
            k: i,
            ix: 3
          },
          o: {
            a: 0,
            k: 100,
            ix: 4
          },
          w: {
            a: 0,
            k: y,
            ix: 5
          },
          lc: 2,
          lj: 1,
          ml: 10,
          bm: 0,
          hd: !1
        }
      ],
      ip: 0,
      op: 360,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "core",
      sr: 1,
      ks: {
        o: {
          a: 0,
          k: 100,
          ix: 11
        },
        r: {
          a: 0,
          k: 0,
          ix: 10
        },
        p: {
          a: 0,
          k: [
            256,
            256,
            0
          ],
          ix: 2
        },
        a: {
          a: 0,
          k: [
            0,
            0,
            0
          ],
          ix: 1
        },
        s: {
          a: 0,
          k: [
            80,
            80,
            80
          ],
          ix: 6
        }
      },
      ao: 0,
      shapes: [
        {
          ind: 0,
          ty: "sh",
          ix: 1,
          ks: {
            a: 0,
            k: {
              i: [
                [
                  0,
                  -46.392
                ],
                [
                  46.392,
                  0
                ],
                [
                  0,
                  46.392
                ],
                [
                  -46.392,
                  0
                ]
              ],
              o: [
                [
                  0,
                  46.392
                ],
                [
                  -46.392,
                  0
                ],
                [
                  0,
                  -46.392
                ],
                [
                  46.392,
                  0
                ]
              ],
              v: [
                [
                  84,
                  0
                ],
                [
                  0,
                  84
                ],
                [
                  -84,
                  0
                ],
                [
                  0,
                  -84
                ]
              ],
              c: !0
            },
            ix: 2
          },
          hd: !1
        },
        ...o
      ],
      ip: 0,
      op: 360,
      st: 0,
      bm: 0
    }
  ];
}, E = (x, t) => ({
  ty: "st",
  c: {
    a: 0,
    k: x,
    ix: 3
  },
  o: {
    a: 0,
    k: 100,
    ix: 4
  },
  w: {
    a: 0,
    k: t,
    ix: 5
  },
  lc: 1,
  lj: 1,
  ml: 10,
  bm: 0,
  hd: !1
}), T0 = (x, t) => x === "line" ? t === "small" ? 9 : 20 : t === "small" ? 4 : 6, y0 = (x, t, y) => {
  const i = T0(x, t), o = y && n(y) ? [y[0] / 255, y[1] / 255, y[2] / 255, 1] : x === "line" ? [0.984313726425, 0.749019622803, 0.141176477075, 1] : [0.972549021244, 0.686274528503, 0.0941176489, 1];
  if (x === "line")
    return [E(o, i)];
  if (y && n(y))
    return [E(o, i), {
      ty: "fl",
      c: {
        a: 0,
        k: o,
        ix: 3
      },
      o: {
        a: 0,
        k: 100,
        ix: 4
      },
      w: {
        a: 0,
        k: 12,
        ix: 5
      },
      lc: 2,
      lj: 1,
      ml: 10,
      bm: 0,
      hd: !1
    }];
  {
    const s = t === "small" ? [-21, -35] : [-41.517, -71.871], e = t === "small" ? [19.007, 34.294] : [42.497, 73.645];
    return [E(o, i), {
      ty: "gf",
      o: {
        a: 0,
        k: 100,
        ix: 10
      },
      r: 1,
      bm: 0,
      g: {
        p: 5,
        k: {
          a: 0,
          k: [
            0,
            0.984,
            0.749,
            0.141,
            0.225,
            0.984,
            0.749,
            0.141,
            0.45,
            0.984,
            0.749,
            0.141,
            0.725,
            0.973,
            0.684,
            0.092,
            1,
            0.961,
            0.62,
            0.043
          ],
          ix: 9
        }
      },
      s: {
        a: 0,
        k: s,
        ix: 5
      },
      e: {
        a: 0,
        k: e,
        ix: 6
      },
      t: 1,
      hd: !1
    }];
  }
}, i0 = (x, t) => {
  const y = x === "line" ? 9 : 12, i = t && n(t) ? [t[0] / 255, t[1] / 255, t[2] / 255, 1] : [0.984313726425, 0.749019622803, 0.141176477075, 1], o = y0(x, "small", t), s = {
    ddd: 0,
    ind: 3,
    ty: 4,
    nm: "sun",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          154,
          207,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          154,
          207,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ind: 0,
            ty: "sh",
            ix: 1,
            ks: {
              a: 0,
              k: {
                i: [
                  [
                    0,
                    -22.091
                  ],
                  [
                    22.091,
                    0
                  ],
                  [
                    0,
                    22.091
                  ],
                  [
                    -22.091,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    22.091
                  ],
                  [
                    -22.091,
                    0
                  ],
                  [
                    0,
                    -22.091
                  ],
                  [
                    22.091,
                    0
                  ]
                ],
                v: [
                  [
                    40,
                    0
                  ],
                  [
                    0,
                    40
                  ],
                  [
                    -40,
                    0
                  ],
                  [
                    0,
                    -40
                  ]
                ],
                c: !0
              },
              ix: 2
            },
            hd: !1
          },
          ...o,
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                154,
                207
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            }
          }
        ],
        nm: "sun-core",
        np: 2,
        cix: 2,
        bm: 0,
        ix: 1,
        hd: !1
      },
      {
        ty: "gr",
        it: [
          {
            ind: 0,
            ty: "sh",
            ix: 1,
            ks: {
              a: 0,
              k: {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    92,
                    0
                  ],
                  [
                    66.621,
                    0
                  ]
                ],
                c: !1
              },
              ix: 2
            },
            hd: !1
          },
          {
            ind: 1,
            ty: "sh",
            ix: 2,
            ks: {
              a: 0,
              k: {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    -92,
                    0
                  ],
                  [
                    -66.621,
                    0
                  ]
                ],
                c: !1
              },
              ix: 2
            },
            hd: !1
          },
          {
            ind: 2,
            ty: "sh",
            ix: 3,
            ks: {
              a: 0,
              k: {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    65.054,
                    65.054
                  ],
                  [
                    47.108,
                    47.108
                  ]
                ],
                c: !1
              },
              ix: 2
            },
            hd: !1
          },
          {
            ind: 3,
            ty: "sh",
            ix: 4,
            ks: {
              a: 0,
              k: {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    -47.108,
                    -47.108
                  ],
                  [
                    -65.054,
                    -65.054
                  ]
                ],
                c: !1
              },
              ix: 2
            },
            hd: !1
          },
          {
            ind: 4,
            ty: "sh",
            ix: 5,
            ks: {
              a: 0,
              k: {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    -65.054,
                    65.054
                  ],
                  [
                    -47.108,
                    47.108
                  ]
                ],
                c: !1
              },
              ix: 2
            },
            hd: !1
          },
          {
            ind: 5,
            ty: "sh",
            ix: 6,
            ks: {
              a: 0,
              k: {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    47.108,
                    -47.108
                  ],
                  [
                    65.054,
                    -65.054
                  ]
                ],
                c: !1
              },
              ix: 2
            },
            hd: !1
          },
          {
            ind: 6,
            ty: "sh",
            ix: 7,
            ks: {
              a: 0,
              k: {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    0,
                    92
                  ],
                  [
                    0,
                    66.621
                  ]
                ],
                c: !1
              },
              ix: 2
            },
            hd: !1
          },
          {
            ind: 7,
            ty: "sh",
            ix: 8,
            ks: {
              a: 0,
              k: {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    0,
                    -66.621
                  ],
                  [
                    0,
                    -92
                  ]
                ],
                c: !1
              },
              ix: 2
            },
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: i,
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 0,
              k: y,
              ix: 5
            },
            lc: 2,
            lj: 1,
            ml: 10,
            bm: 0,
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                154,
                207
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.833
                    ],
                    y: [
                      0.833
                    ]
                  },
                  o: {
                    x: [
                      0.167
                    ],
                    y: [
                      0.167
                    ]
                  },
                  t: 0,
                  s: [
                    0
                  ]
                },
                {
                  t: 359,
                  s: [
                    45
                  ]
                }
              ],
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            }
          }
        ],
        nm: "sun-rays",
        np: 9,
        cix: 2,
        bm: 0,
        ix: 2,
        hd: !1
      }
    ],
    ip: 0,
    op: 360,
    st: 0,
    bm: 0
  };
  return x === "line" && (s.hasMask = !0, s.masksProperties = [
    {
      inv: !1,
      mode: "a",
      pt: {
        a: 1,
        k: [
          {
            i: {
              x: 0.833,
              y: 0.833
            },
            o: {
              x: 0.167,
              y: 0.167
            },
            t: 0,
            s: [
              {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    14.803,
                    -23.924
                  ],
                  [
                    10.461,
                    0
                  ],
                  [
                    0,
                    -30.928
                  ],
                  [
                    -0.484,
                    -2.963
                  ],
                  [
                    0,
                    -29.306
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    -30.201,
                    0
                  ],
                  [
                    -8.378,
                    -4.994
                  ],
                  [
                    -30.928,
                    0
                  ],
                  [
                    0,
                    3.1
                  ],
                  [
                    -27.779,
                    5.25
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    270.5,
                    147.5
                  ],
                  [
                    199.096,
                    187.415
                  ],
                  [
                    170.5,
                    179.5
                  ],
                  [
                    114.5,
                    235.5
                  ],
                  [
                    115.301,
                    244.583
                  ],
                  [
                    66.5,
                    303.5
                  ],
                  [
                    -5.5,
                    303.5
                  ],
                  [
                    -5.5,
                    -0.5
                  ],
                  [
                    270.5,
                    -0.5
                  ]
                ],
                c: !0
              }
            ]
          },
          {
            i: {
              x: 0.833,
              y: 0.833
            },
            o: {
              x: 0.167,
              y: 0.167
            },
            t: 180,
            s: [
              {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    14.803,
                    -23.924
                  ],
                  [
                    10.461,
                    0
                  ],
                  [
                    0,
                    -30.928
                  ],
                  [
                    -0.484,
                    -2.963
                  ],
                  [
                    0,
                    -29.306
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    -30.201,
                    0
                  ],
                  [
                    -8.378,
                    -4.994
                  ],
                  [
                    -30.928,
                    0
                  ],
                  [
                    0,
                    3.1
                  ],
                  [
                    -27.779,
                    5.25
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    306.5,
                    147.5
                  ],
                  [
                    235.096,
                    187.415
                  ],
                  [
                    206.5,
                    179.5
                  ],
                  [
                    150.5,
                    235.5
                  ],
                  [
                    151.301,
                    244.583
                  ],
                  [
                    102.5,
                    303.5
                  ],
                  [
                    30.5,
                    303.5
                  ],
                  [
                    30.5,
                    -0.5
                  ],
                  [
                    306.5,
                    -0.5
                  ]
                ],
                c: !0
              }
            ]
          },
          {
            t: 359,
            s: [
              {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    14.803,
                    -23.924
                  ],
                  [
                    10.461,
                    0
                  ],
                  [
                    0,
                    -30.928
                  ],
                  [
                    -0.484,
                    -2.963
                  ],
                  [
                    0,
                    -29.306
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    -30.201,
                    0
                  ],
                  [
                    -8.378,
                    -4.994
                  ],
                  [
                    -30.928,
                    0
                  ],
                  [
                    0,
                    3.1
                  ],
                  [
                    -27.779,
                    5.25
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    270.5,
                    147.5
                  ],
                  [
                    199.096,
                    187.415
                  ],
                  [
                    170.5,
                    179.5
                  ],
                  [
                    114.5,
                    235.5
                  ],
                  [
                    115.301,
                    244.583
                  ],
                  [
                    66.5,
                    303.5
                  ],
                  [
                    -5.5,
                    303.5
                  ],
                  [
                    -5.5,
                    -0.5
                  ],
                  [
                    270.5,
                    -0.5
                  ]
                ],
                c: !0
              }
            ]
          }
        ],
        ix: 1
      },
      o: {
        a: 0,
        k: 100,
        ix: 3
      },
      x: {
        a: 0,
        k: 0,
        ix: 4
      },
      nm: "Mask 1"
    }
  ]), [s];
}, I = (x, t) => [...a0(t), o0("fill", x)], A0 = (x, t) => [...a0(t), o0("line", x)], O = (x) => e0("fill", x), M0 = (x) => e0("line", x), o0 = (x, t) => {
  const y = s0(x, "big", t);
  return {
    ddd: 0,
    ind: 4,
    ty: 4,
    nm: "moon",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              -15
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 180,
            s: [
              9
            ]
          },
          {
            t: 359,
            s: [
              -15
            ]
          }
        ],
        ix: 10
      },
      p: {
        a: 0,
        k: [
          256,
          256,
          0
        ],
        ix: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1
      },
      s: {
        a: 0,
        k: [
          90,
          90,
          90
        ],
        ix: 6
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ind: 0,
            ty: "sh",
            ix: 1,
            ks: {
              a: 0,
              k: {
                i: [
                  [
                    4.989,
                    0
                  ],
                  [
                    0,
                    73.133
                  ],
                  [
                    -2.789,
                    10.632
                  ],
                  [
                    0,
                    -68.211
                  ],
                  [
                    -74.124,
                    0
                  ],
                  [
                    -14.959,
                    57.027
                  ]
                ],
                o: [
                  [
                    -74.124,
                    0
                  ],
                  [
                    0,
                    -11.492
                  ],
                  [
                    -67.179,
                    7.251
                  ],
                  [
                    0,
                    73.133
                  ],
                  [
                    62.476,
                    0
                  ],
                  [
                    -4.848,
                    0.523
                  ]
                ],
                v: [
                  [
                    117.254,
                    33.632
                  ],
                  [
                    -16.96,
                    -98.787
                  ],
                  [
                    -12.532,
                    -132
                  ],
                  [
                    -132,
                    -0.419
                  ],
                  [
                    2.214,
                    132
                  ],
                  [
                    132,
                    32.794
                  ]
                ],
                c: !0
              },
              ix: 2
            },
            hd: !1
          },
          ...y,
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            }
          }
        ],
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        hd: !1
      }
    ],
    ip: 0,
    op: 360,
    st: 0,
    bm: 0
  };
}, b = (x, t) => ({
  ty: "st",
  c: {
    a: 0,
    k: x,
    ix: 3
  },
  o: {
    a: 0,
    k: 100,
    ix: 4
  },
  w: {
    a: 0,
    k: t,
    ix: 5
  },
  lc: 2,
  lj: 2,
  bm: 0,
  hd: !1
}), W0 = (x, t) => x === "line" ? t === "small" ? 9 : 20 : t === "small" ? 4 : 6, s0 = (x, t, y) => {
  const i = W0(x, t), o = y && n(y) ? [y[0] / 255, y[1] / 255, y[2] / 255, 1] : [0.447058826685, 0.72549021244, 0.835294127464, 1];
  if (x === "line")
    return [b(o, i)];
  if (y && n(y))
    return [b(o, i), {
      ty: "fl",
      c: {
        a: 0,
        k: o,
        ix: 3
      },
      o: {
        a: 0,
        k: 100,
        ix: 4
      },
      w: {
        a: 0,
        k: 12,
        ix: 5
      },
      lc: 2,
      lj: 1,
      ml: 10,
      bm: 0,
      hd: !1
    }];
  {
    const s = t === "small" ? [-52, -68] : [-80.517, -105.871], e = t === "small" ? [32.541, 78.429] : [52.333, 124.231];
    return [b(o, i), {
      ty: "gf",
      o: {
        a: 0,
        k: 100,
        ix: 10
      },
      r: 1,
      bm: 0,
      g: {
        p: 5,
        k: {
          a: 0,
          k: [
            0,
            0.525,
            0.765,
            0.859,
            0.225,
            0.525,
            0.765,
            0.859,
            0.45,
            0.525,
            0.765,
            0.859,
            0.725,
            0.447,
            0.725,
            0.835,
            1,
            0.369,
            0.686,
            0.812
          ],
          ix: 9
        }
      },
      s: {
        a: 0,
        k: s,
        ix: 5
      },
      e: {
        a: 0,
        k: e,
        ix: 6
      },
      t: 1,
      hd: !1
    }];
  }
}, a0 = (x) => [
  {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "star-3",
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -339,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -279,
            s: [
              75
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -219,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -159,
            s: [
              75
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -99,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -39,
            s: [
              75
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 20,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 80,
            s: [
              75
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 140,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 200,
            s: [
              75
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 260,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 320,
            s: [
              75
            ]
          },
          {
            t: 379,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -339,
            s: [
              -15
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -159,
            s: [
              15
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 20,
            s: [
              -15
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 200,
            s: [
              15
            ]
          },
          {
            t: 379,
            s: [
              -15
            ]
          }
        ],
        ix: 10
      },
      p: {
        a: 0,
        k: [
          372,
          222,
          0
        ],
        ix: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1
      },
      s: {
        a: 0,
        k: [
          90,
          90,
          90
        ],
        ix: 6
      }
    },
    ao: 0,
    shapes: [
      {
        ind: 0,
        ty: "sh",
        ix: 1,
        ks: {
          a: 0,
          k: {
            i: [
              [
                -1.758,
                -0.489
              ],
              [
                0,
                0
              ],
              [
                -0.169,
                -0.608
              ],
              [
                0,
                0
              ],
              [
                -0.489,
                1.757
              ],
              [
                0,
                0
              ],
              [
                -0.608,
                0.169
              ],
              [
                0,
                0
              ],
              [
                1.758,
                0.489
              ],
              [
                0,
                0
              ],
              [
                0.169,
                0.608
              ],
              [
                0,
                0
              ],
              [
                0.489,
                -1.758
              ],
              [
                0,
                0
              ],
              [
                0.608,
                -0.169
              ],
              [
                0,
                0
              ]
            ],
            o: [
              [
                0,
                0
              ],
              [
                0.608,
                0.169
              ],
              [
                0,
                0
              ],
              [
                0.489,
                1.757
              ],
              [
                0,
                0
              ],
              [
                0.169,
                -0.608
              ],
              [
                0,
                0
              ],
              [
                1.758,
                -0.489
              ],
              [
                0,
                0
              ],
              [
                -0.608,
                -0.169
              ],
              [
                0,
                0
              ],
              [
                -0.489,
                -1.758
              ],
              [
                0,
                0
              ],
              [
                -0.169,
                0.608
              ],
              [
                0,
                0
              ],
              [
                -1.758,
                0.489
              ]
            ],
            v: [
              [
                -34.682,
                1.735
              ],
              [
                -9.884,
                8.632
              ],
              [
                -8.632,
                9.884
              ],
              [
                -1.735,
                34.682
              ],
              [
                1.735,
                34.682
              ],
              [
                8.632,
                9.884
              ],
              [
                9.884,
                8.632
              ],
              [
                34.682,
                1.735
              ],
              [
                34.682,
                -1.735
              ],
              [
                9.884,
                -8.632
              ],
              [
                8.632,
                -9.884
              ],
              [
                1.735,
                -34.682
              ],
              [
                -1.735,
                -34.682
              ],
              [
                -8.632,
                -9.884
              ],
              [
                -9.884,
                -8.632
              ],
              [
                -34.682,
                -1.735
              ]
            ],
            c: !0
          },
          ix: 2
        },
        hd: !1
      },
      ...T(3, x)
    ],
    ip: 0,
    op: 360,
    st: 0,
    bm: 0
  },
  {
    ddd: 0,
    ind: 2,
    ty: 4,
    nm: "star-2",
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -319,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -259,
            s: [
              75
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -199,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -139,
            s: [
              75
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -79,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -19,
            s: [
              75
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 40,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 100,
            s: [
              75
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 160,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 220,
            s: [
              75
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 280,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 340,
            s: [
              75
            ]
          },
          {
            t: 399,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -319,
            s: [
              -15
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: -139,
            s: [
              15
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 40,
            s: [
              -15
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 220,
            s: [
              15
            ]
          },
          {
            t: 399,
            s: [
              -15
            ]
          }
        ],
        ix: 10
      },
      p: {
        a: 0,
        k: [
          306,
          204,
          0
        ],
        ix: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1
      },
      s: {
        a: 0,
        k: [
          90,
          90,
          90
        ],
        ix: 6
      }
    },
    ao: 0,
    shapes: [
      {
        ind: 0,
        ty: "sh",
        ix: 1,
        ks: {
          a: 0,
          k: {
            i: [
              [
                -0.852,
                -0.868
              ],
              [
                0,
                0
              ],
              [
                0.105,
                -0.408
              ],
              [
                0,
                0
              ],
              [
                -0.868,
                0.852
              ],
              [
                0,
                0
              ],
              [
                -0.407,
                -0.105
              ],
              [
                0,
                0
              ],
              [
                0.852,
                0.868
              ],
              [
                0,
                0
              ],
              [
                -0.105,
                0.407
              ],
              [
                0,
                0
              ],
              [
                0.868,
                -0.852
              ],
              [
                0,
                0
              ],
              [
                0.407,
                0.105
              ],
              [
                0,
                0
              ]
            ],
            o: [
              [
                0,
                0
              ],
              [
                0.295,
                0.3
              ],
              [
                0,
                0
              ],
              [
                -0.304,
                1.178
              ],
              [
                0,
                0
              ],
              [
                0.3,
                -0.295
              ],
              [
                0,
                0
              ],
              [
                1.178,
                0.304
              ],
              [
                0,
                0
              ],
              [
                -0.295,
                -0.3
              ],
              [
                0,
                0
              ],
              [
                0.304,
                -1.177
              ],
              [
                0,
                0
              ],
              [
                -0.3,
                0.294
              ],
              [
                0,
                0
              ],
              [
                -1.178,
                -0.304
              ]
            ],
            v: [
              [
                -20.602,
                -10.559
              ],
              [
                -8.584,
                1.689
              ],
              [
                -8.278,
                2.829
              ],
              [
                -12.562,
                19.445
              ],
              [
                -10.559,
                20.602
              ],
              [
                1.689,
                8.584
              ],
              [
                2.829,
                8.278
              ],
              [
                19.445,
                12.562
              ],
              [
                20.602,
                10.559
              ],
              [
                8.584,
                -1.689
              ],
              [
                8.278,
                -2.829
              ],
              [
                12.562,
                -19.445
              ],
              [
                10.559,
                -20.602
              ],
              [
                -1.689,
                -8.584
              ],
              [
                -2.829,
                -8.278
              ],
              [
                -19.445,
                -12.562
              ]
            ],
            c: !0
          },
          ix: 2
        },
        hd: !1
      },
      ...T(2, x)
    ],
    ip: 0,
    op: 360,
    st: 0,
    bm: 0
  },
  {
    ddd: 0,
    ind: 3,
    ty: 4,
    nm: "star-1",
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 0,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 60,
            s: [
              75
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 120,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 180,
            s: [
              75
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 240,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 300,
            s: [
              75
            ]
          },
          {
            t: 359,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 0,
            s: [
              -15
            ]
          },
          {
            i: {
              x: [
                0.667
              ],
              y: [
                1
              ]
            },
            o: {
              x: [
                0.333
              ],
              y: [
                0
              ]
            },
            t: 180,
            s: [
              15
            ]
          },
          {
            t: 359,
            s: [
              -15
            ]
          }
        ],
        ix: 10
      },
      p: {
        a: 0,
        k: [
          312,
          144,
          0
        ],
        ix: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1
      },
      s: {
        a: 0,
        k: [
          90,
          90,
          90
        ],
        ix: 6
      }
    },
    ao: 0,
    shapes: [
      {
        ind: 0,
        ty: "sh",
        ix: 1,
        ks: {
          a: 0,
          k: {
            i: [
              [
                -1.767,
                0.455
              ],
              [
                0,
                0
              ],
              [
                -0.451,
                -0.442
              ],
              [
                0,
                0
              ],
              [
                0.456,
                1.767
              ],
              [
                0,
                0
              ],
              [
                -0.442,
                0.45
              ],
              [
                0,
                0
              ],
              [
                1.767,
                -0.455
              ],
              [
                0,
                0
              ],
              [
                0.451,
                0.442
              ],
              [
                0,
                0
              ],
              [
                -0.456,
                -1.766
              ],
              [
                0,
                0
              ],
              [
                0.442,
                -0.45
              ],
              [
                0,
                0
              ]
            ],
            o: [
              [
                0,
                0
              ],
              [
                0.611,
                -0.158
              ],
              [
                0,
                0
              ],
              [
                1.302,
                1.278
              ],
              [
                0,
                0
              ],
              [
                -0.158,
                -0.611
              ],
              [
                0,
                0
              ],
              [
                1.278,
                -1.302
              ],
              [
                0,
                0
              ],
              [
                -0.611,
                0.158
              ],
              [
                0,
                0
              ],
              [
                -1.302,
                -1.278
              ],
              [
                0,
                0
              ],
              [
                0.158,
                0.611
              ],
              [
                0,
                0
              ],
              [
                -1.277,
                1.302
              ]
            ],
            v: [
              [
                -29.168,
                18.844
              ],
              [
                -4.244,
                12.417
              ],
              [
                -2.533,
                12.876
              ],
              [
                15.838,
                30.903
              ],
              [
                18.843,
                29.168
              ],
              [
                12.417,
                4.244
              ],
              [
                12.875,
                2.533
              ],
              [
                30.903,
                -15.839
              ],
              [
                29.168,
                -18.844
              ],
              [
                4.244,
                -12.417
              ],
              [
                2.533,
                -12.876
              ],
              [
                -15.838,
                -30.903
              ],
              [
                -18.843,
                -29.168
              ],
              [
                -12.418,
                -4.244
              ],
              [
                -12.876,
                -2.533
              ],
              [
                -30.903,
                15.839
              ]
            ],
            c: !0
          },
          ix: 2
        },
        hd: !1
      },
      ...T(1, x)
    ],
    ip: 0,
    op: 360,
    st: 0,
    bm: 0
  }
], T = (x, t) => {
  const i = t && n(t) ? [t[0] / 255, t[1] / 255, t[2] / 255, 1] : [0.988235294819, 0.827450990677, 0.301960796118, 1];
  return t && n(t) ? [b(i, 2), {
    ty: "fl",
    c: {
      a: 0,
      k: [t[0] / 255, t[1] / 255, t[2] / 255, 1],
      ix: 3
    },
    o: {
      a: 0,
      k: 100,
      ix: 4
    },
    w: {
      a: 0,
      k: 12,
      ix: 5
    },
    lc: 2,
    lj: 1,
    ml: 10,
    bm: 0,
    hd: !1
  }] : [b(i, 2), L0(x)];
}, L0 = (x) => {
  let t, y;
  switch (x) {
    case 3: {
      t = [-16, -28], y = [15.427, 26.432];
      break;
    }
    case 2: {
      t = [-11, -19], y = [9.951, 17.288];
      break;
    }
    case 1: {
      t = [-18, -32], y = [18, 30.354];
      break;
    }
  }
  return {
    ty: "gf",
    o: {
      a: 0,
      k: 100,
      ix: 10
    },
    r: 1,
    bm: 0,
    g: {
      p: 5,
      k: {
        a: 0,
        k: [
          0,
          0.988,
          0.851,
          0.4,
          0.225,
          0.988,
          0.851,
          0.4,
          0.45,
          0.988,
          0.851,
          0.4,
          0.725,
          0.988,
          0.827,
          0.302,
          1,
          0.988,
          0.804,
          0.204
        ],
        ix: 9
      }
    },
    s: {
      a: 0,
      k: t,
      ix: 5
    },
    e: {
      a: 0,
      k: y,
      ix: 6
    },
    t: 1,
    hd: !1
  };
}, e0 = (x, t) => {
  const y = s0(x, "small", t), i = {
    ddd: 0,
    ind: 3,
    ty: 4,
    nm: "moon",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          154,
          207,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ind: 0,
            ty: "sh",
            ix: 1,
            ks: {
              a: 0,
              k: {
                i: [
                  [
                    3.175,
                    0
                  ],
                  [
                    0,
                    46.539
                  ],
                  [
                    -1.775,
                    6.766
                  ],
                  [
                    0,
                    -43.407
                  ],
                  [
                    -47.17,
                    0
                  ],
                  [
                    -9.519,
                    36.29
                  ]
                ],
                o: [
                  [
                    -47.17,
                    0
                  ],
                  [
                    0,
                    -7.313
                  ],
                  [
                    -42.75,
                    4.614
                  ],
                  [
                    0,
                    46.539
                  ],
                  [
                    39.758,
                    0
                  ],
                  [
                    -3.085,
                    0.333
                  ]
                ],
                v: [
                  [
                    74.616,
                    21.402
                  ],
                  [
                    -10.793,
                    -62.865
                  ],
                  [
                    -7.975,
                    -84
                  ],
                  [
                    -84,
                    -0.267
                  ],
                  [
                    1.409,
                    84
                  ],
                  [
                    84,
                    20.869
                  ]
                ],
                c: !0
              },
              ix: 2
            },
            hd: !1
          },
          ...y,
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.833
                    ],
                    y: [
                      0.833
                    ]
                  },
                  o: {
                    x: [
                      0.167
                    ],
                    y: [
                      0.167
                    ]
                  },
                  t: 0,
                  s: [
                    -15
                  ]
                },
                {
                  i: {
                    x: [
                      0.833
                    ],
                    y: [
                      0.833
                    ]
                  },
                  o: {
                    x: [
                      0.167
                    ],
                    y: [
                      0.167
                    ]
                  },
                  t: 180,
                  s: [
                    9
                  ]
                },
                {
                  t: 359,
                  s: [
                    -15
                  ]
                }
              ],
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            }
          }
        ],
        np: 2,
        cix: 2,
        bm: 0,
        ix: 1,
        hd: !1
      }
    ],
    ip: 0,
    op: 360,
    st: 0,
    bm: 0
  };
  return x === "line" && (i.hasMask = !0, i.masksProperties = [
    {
      inv: !1,
      mode: "a",
      pt: {
        a: 1,
        k: [
          {
            i: {
              x: 0.833,
              y: 0.833
            },
            o: {
              x: 0.167,
              y: 0.167
            },
            t: 0,
            s: [
              {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    14.803,
                    -23.924
                  ],
                  [
                    10.461,
                    0
                  ],
                  [
                    0,
                    -30.928
                  ],
                  [
                    -0.484,
                    -2.963
                  ],
                  [
                    0,
                    -29.306
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    -30.201,
                    0
                  ],
                  [
                    -8.378,
                    -4.994
                  ],
                  [
                    -30.928,
                    0
                  ],
                  [
                    0,
                    3.1
                  ],
                  [
                    -27.779,
                    5.25
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    116.5,
                    -58.5
                  ],
                  [
                    45.096,
                    -18.585
                  ],
                  [
                    16.5,
                    -26.5
                  ],
                  [
                    -39.5,
                    29.5
                  ],
                  [
                    -38.699,
                    38.583
                  ],
                  [
                    -87.5,
                    97.5
                  ],
                  [
                    -159.5,
                    97.5
                  ],
                  [
                    -159.5,
                    -206.5
                  ],
                  [
                    116.5,
                    -206.5
                  ]
                ],
                c: !0
              }
            ]
          },
          {
            i: {
              x: 0.833,
              y: 0.833
            },
            o: {
              x: 0.167,
              y: 0.167
            },
            t: 180,
            s: [
              {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    14.803,
                    -23.924
                  ],
                  [
                    10.461,
                    0
                  ],
                  [
                    0,
                    -30.928
                  ],
                  [
                    -0.484,
                    -2.963
                  ],
                  [
                    0,
                    -29.306
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    -30.201,
                    0
                  ],
                  [
                    -8.378,
                    -4.994
                  ],
                  [
                    -30.928,
                    0
                  ],
                  [
                    0,
                    3.1
                  ],
                  [
                    -27.779,
                    5.25
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    152.5,
                    -58.5
                  ],
                  [
                    81.096,
                    -18.585
                  ],
                  [
                    52.5,
                    -26.5
                  ],
                  [
                    -3.5,
                    29.5
                  ],
                  [
                    -2.699,
                    38.583
                  ],
                  [
                    -51.5,
                    97.5
                  ],
                  [
                    -123.5,
                    97.5
                  ],
                  [
                    -123.5,
                    -206.5
                  ],
                  [
                    152.5,
                    -206.5
                  ]
                ],
                c: !0
              }
            ]
          },
          {
            t: 359,
            s: [
              {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    14.803,
                    -23.924
                  ],
                  [
                    10.461,
                    0
                  ],
                  [
                    0,
                    -30.928
                  ],
                  [
                    -0.484,
                    -2.963
                  ],
                  [
                    0,
                    -29.306
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    -30.201,
                    0
                  ],
                  [
                    -8.378,
                    -4.994
                  ],
                  [
                    -30.928,
                    0
                  ],
                  [
                    0,
                    3.1
                  ],
                  [
                    -27.779,
                    5.25
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    116.5,
                    -58.5
                  ],
                  [
                    45.096,
                    -18.585
                  ],
                  [
                    16.5,
                    -26.5
                  ],
                  [
                    -39.5,
                    29.5
                  ],
                  [
                    -38.699,
                    38.583
                  ],
                  [
                    -87.5,
                    97.5
                  ],
                  [
                    -159.5,
                    97.5
                  ],
                  [
                    -159.5,
                    -206.5
                  ],
                  [
                    116.5,
                    -206.5
                  ]
                ],
                c: !0
              }
            ]
          }
        ],
        ix: 1
      },
      o: {
        a: 0,
        k: 100,
        ix: 3
      },
      x: {
        a: 0,
        k: 0,
        ix: 4
      }
    }
  ]), [i];
}, r = (x) => n0("fill", x), f = (x) => n0("line", x), C = (x, t) => l0("fill", x, t), A = (x, t) => l0("line", x, t), V = (x) => r0("fill", x), $0 = (x) => r0("line", x), n0 = (x, t) => {
  const y = x === "line" ? {
    i: [
      [
        0,
        0
      ],
      [
        0,
        30.928
      ],
      [
        30.928,
        0
      ],
      [
        0.844,
        -0.038
      ],
      [
        0,
        6.951
      ],
      [
        46.392,
        0
      ],
      [
        14.803,
        -23.924
      ],
      [
        10.461,
        0
      ],
      [
        0,
        -30.928
      ],
      [
        -0.484,
        -2.963
      ],
      [
        0,
        -29.306
      ],
      [
        -33.137,
        0
      ]
    ],
    o: [
      [
        30.928,
        0
      ],
      [
        0,
        -30.928
      ],
      [
        -0.854,
        0
      ],
      [
        1.592,
        -6.459
      ],
      [
        0,
        -46.392
      ],
      [
        -30.201,
        0
      ],
      [
        -8.378,
        -4.994
      ],
      [
        -30.928,
        0
      ],
      [
        0,
        3.1
      ],
      [
        -27.779,
        5.25
      ],
      [
        0,
        33.137
      ],
      [
        0,
        0
      ]
    ],
    v: [
      [
        116,
        108
      ],
      [
        172,
        52
      ],
      [
        116,
        -4
      ],
      [
        113.471,
        -3.873
      ],
      [
        116,
        -24
      ],
      [
        32,
        -108
      ],
      [
        -39.404,
        -68.085
      ],
      [
        -68,
        -76
      ],
      [
        -124,
        -20
      ],
      [
        -123.199,
        -10.917
      ],
      [
        -172,
        48
      ],
      [
        -112,
        108
      ]
    ],
    c: !1
  } : {
    i: [
      [
        30.928,
        0
      ],
      [
        0.844,
        -0.038
      ],
      [
        0,
        6.951
      ],
      [
        46.392,
        0
      ],
      [
        14.803,
        -23.924
      ],
      [
        10.461,
        0
      ],
      [
        0,
        -30.928
      ],
      [
        -0.484,
        -2.963
      ],
      [
        0,
        -29.306
      ],
      [
        -33.137,
        0
      ],
      [
        -1.328,
        0.088
      ],
      [
        0,
        0
      ],
      [
        0,
        0
      ],
      [
        0,
        30.928
      ]
    ],
    o: [
      [
        -0.854,
        0
      ],
      [
        1.592,
        -6.459
      ],
      [
        0,
        -46.392
      ],
      [
        -30.201,
        0
      ],
      [
        -8.378,
        -4.994
      ],
      [
        -30.928,
        0
      ],
      [
        0,
        3.1
      ],
      [
        -27.779,
        5.25
      ],
      [
        0,
        33.137
      ],
      [
        1.351,
        0
      ],
      [
        0,
        0
      ],
      [
        0,
        0
      ],
      [
        30.928,
        0
      ],
      [
        0,
        -30.928
      ]
    ],
    v: [
      [
        116,
        -8.875
      ],
      [
        113.471,
        -8.748
      ],
      [
        116,
        -28.875
      ],
      [
        32,
        -112.875
      ],
      [
        -39.404,
        -72.96
      ],
      [
        -68,
        -80.875
      ],
      [
        -124,
        -24.875
      ],
      [
        -123.199,
        -15.792
      ],
      [
        -172,
        43.125
      ],
      [
        -112,
        103.125
      ],
      [
        -108,
        102.923
      ],
      [
        -108,
        103.125
      ],
      [
        116,
        103.125
      ],
      [
        172,
        47.125
      ]
    ],
    c: !0
  }, i = j0(x, t);
  return [
    {
      ddd: 0,
      ind: 4,
      ty: 4,
      nm: "cloud",
      sr: 1,
      ks: {
        o: {
          a: 0,
          k: 100,
          ix: 11
        },
        r: {
          a: 0,
          k: 0,
          ix: 10
        },
        p: {
          a: 0,
          k: [
            256,
            226,
            0
          ],
          ix: 2,
          l: 2
        },
        a: {
          a: 0,
          k: [
            0,
            0,
            0
          ],
          ix: 1,
          l: 2
        },
        s: {
          a: 0,
          k: [
            100,
            100,
            100
          ],
          ix: 6,
          l: 2
        }
      },
      ao: 0,
      shapes: [
        {
          ind: 0,
          ty: "sh",
          ix: 1,
          ks: {
            a: 0,
            k: y,
            ix: 2
          },
          hd: !1
        },
        ...i
      ],
      ip: 0,
      op: 360,
      st: 0,
      ct: 1,
      bm: 0
    }
  ];
}, j0 = (x, t) => {
  const y = x === "line" ? 15 : 6, i = t && n(t) ? [t[0] / 255, t[1] / 255, t[2] / 255, 1] : x === "line" ? [0.886274516582, 0.909803926945, 0.941176474094, 1] : [0.901960790157, 0.937254905701, 0.988235294819, 1];
  return x === "line" ? [h(i, y)] : t && n(t) ? [h(i, y), {
    ty: "fl",
    c: {
      a: 0,
      k: i,
      ix: 3
    },
    o: {
      a: 0,
      k: 100,
      ix: 4
    },
    w: {
      a: 0,
      k: 12,
      ix: 5
    },
    lc: 2,
    lj: 1,
    ml: 10,
    bm: 0,
    hd: !1
  }] : [h(i, y), {
    ty: "gf",
    o: {
      a: 0,
      k: 100,
      ix: 10
    },
    r: 1,
    bm: 0,
    g: {
      p: 5,
      k: {
        a: 0,
        k: [
          0,
          0.953,
          0.969,
          0.996,
          0.225,
          0.953,
          0.969,
          0.996,
          0.45,
          0.953,
          0.969,
          0.996,
          0.725,
          0.912,
          0.943,
          0.99,
          1,
          0.871,
          0.918,
          0.984
        ],
        ix: 9
      }
    },
    s: {
      a: 0,
      k: [
        -75.517,
        -84.871
      ],
      ix: 5
    },
    e: {
      a: 0,
      k: [
        57.669,
        145.814
      ],
      ix: 6
    },
    t: 1,
    nm: "Gradient Fill 1",
    mn: "ADBE Vector Graphic - G-Fill",
    hd: !1
  }];
}, h = (x, t) => ({
  ty: "st",
  c: {
    a: 0,
    k: x,
    ix: 3
  },
  o: {
    a: 0,
    k: 100,
    ix: 4
  },
  w: {
    a: 0,
    k: t,
    ix: 5
  },
  lc: 1,
  lj: 1,
  bm: 0,
  hd: !1
}), l0 = (x, t, y) => {
  const i = [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "cloud",
      sr: 1,
      ks: {
        o: {
          a: 0,
          k: 100,
          ix: 11
        },
        r: {
          a: 0,
          k: 0,
          ix: 10
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                238,
                256,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 180,
              s: [
                274,
                256,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 359,
              s: [
                238,
                256,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        },
        a: {
          a: 0,
          k: [
            0,
            0,
            0
          ],
          ix: 1,
          l: 2
        },
        s: {
          a: 0,
          k: [
            100,
            100,
            100
          ],
          ix: 6,
          l: 2
        }
      },
      ao: 0,
      shapes: [
        {
          ind: 0,
          ty: "sh",
          ix: 1,
          ks: {
            a: 0,
            k: {
              i: [
                [
                  46.392,
                  0
                ],
                [
                  14.803,
                  -23.924
                ],
                [
                  10.461,
                  0
                ],
                [
                  0,
                  -30.928
                ],
                [
                  -0.484,
                  -2.963
                ],
                [
                  0,
                  -29.306
                ],
                [
                  -33.137,
                  0
                ],
                [
                  0,
                  0
                ],
                [
                  0,
                  30.928
                ],
                [
                  30.928,
                  0
                ],
                [
                  0.844,
                  -0.038
                ],
                [
                  0,
                  6.951
                ]
              ],
              o: [
                [
                  -30.201,
                  0
                ],
                [
                  -8.378,
                  -4.994
                ],
                [
                  -30.928,
                  0
                ],
                [
                  0,
                  3.1
                ],
                [
                  -27.779,
                  5.25
                ],
                [
                  0,
                  33.137
                ],
                [
                  0,
                  0
                ],
                [
                  30.928,
                  0
                ],
                [
                  0,
                  -30.928
                ],
                [
                  -0.854,
                  0
                ],
                [
                  1.592,
                  -6.459
                ],
                [
                  0,
                  -46.392
                ]
              ],
              v: [
                [
                  32,
                  -108
                ],
                [
                  -39.404,
                  -68.085
                ],
                [
                  -68,
                  -76
                ],
                [
                  -124,
                  -20
                ],
                [
                  -123.199,
                  -10.917
                ],
                [
                  -172,
                  48
                ],
                [
                  -112,
                  108
                ],
                [
                  116,
                  108
                ],
                [
                  172,
                  52
                ],
                [
                  116,
                  -4
                ],
                [
                  113.471,
                  -3.873
                ],
                [
                  116,
                  -24
                ]
              ],
              c: !0
            },
            ix: 2
          },
          hd: !1
        },
        ...G0(x, t)
      ],
      ip: 0,
      op: 360,
      st: 0,
      ct: 1,
      bm: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "dark-cloud",
      sr: 1,
      ks: {
        o: {
          a: 0,
          k: 100,
          ix: 11
        },
        r: {
          a: 0,
          k: 0,
          ix: 10
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                247,
                256,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 180,
              s: [
                265,
                256,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 359,
              s: [
                247,
                256,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        },
        a: {
          a: 0,
          k: [
            0,
            0,
            0
          ],
          ix: 1,
          l: 2
        },
        s: {
          a: 0,
          k: [
            100,
            100,
            100
          ],
          ix: 6,
          l: 2
        }
      },
      ao: 0,
      shapes: [
        {
          ind: 0,
          ty: "sh",
          ix: 1,
          ks: {
            a: 0,
            k: {
              i: [
                [
                  0,
                  -17.898
                ],
                [
                  -17.891,
                  0
                ],
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ],
                [
                  -0.781,
                  0
                ],
                [
                  0,
                  19.177
                ],
                [
                  16.07,
                  3.038
                ],
                [
                  0,
                  1.794
                ],
                [
                  17.891,
                  0
                ],
                [
                  4.847,
                  -2.89
                ],
                [
                  17.471,
                  0
                ],
                [
                  0,
                  -26.848
                ],
                [
                  -0.921,
                  -3.738
                ],
                [
                  0.494,
                  0
                ]
              ],
              o: [
                [
                  0,
                  17.898
                ],
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ],
                [
                  0.768,
                  0.051
                ],
                [
                  19.17,
                  0
                ],
                [
                  0,
                  -16.959
                ],
                [
                  0.28,
                  -1.715
                ],
                [
                  0,
                  -17.898
                ],
                [
                  -6.052,
                  0
                ],
                [
                  -8.564,
                  -13.845
                ],
                [
                  -26.837,
                  0
                ],
                [
                  0,
                  4.023
                ],
                [
                  -0.488,
                  -0.022
                ],
                [
                  -17.891,
                  0
                ]
              ],
              v: [
                [
                  1.499,
                  9.093
                ],
                [
                  33.895,
                  41.501
                ],
                [
                  163.477,
                  41.501
                ],
                [
                  163.477,
                  41.384
                ],
                [
                  165.791,
                  41.501
                ],
                [
                  200.501,
                  6.778
                ],
                [
                  172.269,
                  -27.318
                ],
                [
                  172.733,
                  -32.574
                ],
                [
                  140.337,
                  -64.982
                ],
                [
                  123.795,
                  -60.401
                ],
                [
                  82.488,
                  -83.501
                ],
                [
                  33.895,
                  -34.889
                ],
                [
                  35.358,
                  -23.241
                ],
                [
                  33.895,
                  -23.315
                ]
              ],
              c: !0
            },
            ix: 2
          },
          hd: !1
        },
        ...P0(x, y)
      ],
      ip: 0,
      op: 360,
      st: 0,
      bm: 0
    }
  ];
  return x === "line" && (i[1].hasMask = !0, i[1].masksProperties = [
    {
      inv: !1,
      mode: "a",
      pt: {
        a: 1,
        k: [
          {
            i: {
              x: 0.833,
              y: 0.833
            },
            o: {
              x: 0.167,
              y: 0.167
            },
            t: 0,
            s: [
              {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    30.928,
                    0
                  ],
                  [
                    0.844,
                    -0.038
                  ],
                  [
                    0,
                    6.951
                  ],
                  [
                    46.392,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    -30.928
                  ],
                  [
                    -0.854,
                    0
                  ],
                  [
                    1.592,
                    -6.459
                  ],
                  [
                    0,
                    -46.392
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    162.42,
                    51.5
                  ],
                  [
                    106.42,
                    -4.5
                  ],
                  [
                    103.891,
                    -4.373
                  ],
                  [
                    106.42,
                    -24.5
                  ],
                  [
                    22.42,
                    -108.5
                  ],
                  [
                    22.42,
                    -256.5
                  ],
                  [
                    258.58,
                    -256.5
                  ],
                  [
                    258.58,
                    51.5
                  ]
                ],
                c: !0
              }
            ]
          },
          {
            i: {
              x: 0.833,
              y: 0.833
            },
            o: {
              x: 0.167,
              y: 0.167
            },
            t: 180,
            s: [
              {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    30.928,
                    0
                  ],
                  [
                    0.844,
                    -0.038
                  ],
                  [
                    0,
                    6.951
                  ],
                  [
                    46.392,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    -30.928
                  ],
                  [
                    -0.854,
                    0
                  ],
                  [
                    1.592,
                    -6.459
                  ],
                  [
                    0,
                    -46.392
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    181.42,
                    51.5
                  ],
                  [
                    125.42,
                    -4.5
                  ],
                  [
                    122.891,
                    -4.373
                  ],
                  [
                    125.42,
                    -24.5
                  ],
                  [
                    41.42,
                    -108.5
                  ],
                  [
                    41.42,
                    -256.5
                  ],
                  [
                    277.58,
                    -256.5
                  ],
                  [
                    277.58,
                    51.5
                  ]
                ],
                c: !0
              }
            ]
          },
          {
            t: 359,
            s: [
              {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    30.928,
                    0
                  ],
                  [
                    0.844,
                    -0.038
                  ],
                  [
                    0,
                    6.951
                  ],
                  [
                    46.392,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    -30.928
                  ],
                  [
                    -0.854,
                    0
                  ],
                  [
                    1.592,
                    -6.459
                  ],
                  [
                    0,
                    -46.392
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    162.42,
                    51.5
                  ],
                  [
                    106.42,
                    -4.5
                  ],
                  [
                    103.891,
                    -4.373
                  ],
                  [
                    106.42,
                    -24.5
                  ],
                  [
                    22.42,
                    -108.5
                  ],
                  [
                    22.42,
                    -256.5
                  ],
                  [
                    258.58,
                    -256.5
                  ],
                  [
                    258.58,
                    51.5
                  ]
                ],
                c: !0
              }
            ]
          }
        ],
        ix: 1
      },
      o: {
        a: 0,
        k: 100,
        ix: 3
      },
      x: {
        a: 0,
        k: 0,
        ix: 4
      },
      nm: "Mask 1"
    }
  ]), i;
}, G0 = (x, t) => {
  const y = x === "line" ? 15 : 6, i = t && n(t) ? [t[0] / 255, t[1] / 255, t[2] / 255, 1] : x === "line" ? [0.886274516582, 0.909803926945, 0.941176474094, 1] : [0.901960790157, 0.937254905701, 0.988235294819, 1];
  return x === "line" ? [h(i, y)] : t && n(t) ? [h(i, y), {
    ty: "fl",
    c: {
      a: 0,
      k: i,
      ix: 3
    },
    o: {
      a: 0,
      k: 100,
      ix: 4
    },
    w: {
      a: 0,
      k: 12,
      ix: 5
    },
    lc: 2,
    lj: 1,
    ml: 10,
    bm: 0,
    hd: !1
  }] : [h(i, y), {
    ty: "gf",
    o: {
      a: 0,
      k: 100,
      ix: 10
    },
    r: 1,
    bm: 0,
    g: {
      p: 5,
      k: {
        a: 0,
        k: [
          0,
          0.953,
          0.969,
          0.996,
          0.225,
          0.953,
          0.969,
          0.996,
          0.45,
          0.953,
          0.969,
          0.996,
          0.725,
          0.912,
          0.943,
          0.99,
          1,
          0.871,
          0.918,
          0.984
        ],
        ix: 9
      }
    },
    s: {
      a: 0,
      k: [
        -76,
        -81
      ],
      ix: 5
    },
    e: {
      a: 0,
      k: [
        57.186,
        149.685
      ],
      ix: 6
    },
    t: 1,
    hd: !1
  }];
}, P0 = (x, t) => {
  const y = x === "line" ? 15 : 1, i = t && n(t) ? [t[0] / 255, t[1] / 255, t[2] / 255, 1] : x === "line" ? [0.580392181873, 0.639215707779, 0.721568644047, 1] : [0.517647087574, 0.54509806633, 0.596078455448, 1];
  return x === "line" ? [h(i, y)] : t && n(t) ? [h(i, y), {
    ty: "fl",
    c: {
      a: 0,
      k: i,
      ix: 3
    },
    o: {
      a: 0,
      k: 100,
      ix: 4
    },
    w: {
      a: 0,
      k: 12,
      ix: 5
    },
    lc: 2,
    lj: 1,
    ml: 10,
    bm: 0,
    hd: !1
  }] : [h(i, y), {
    ty: "gf",
    o: {
      a: 0,
      k: 100,
      ix: 10
    },
    r: 1,
    bm: 0,
    g: {
      p: 5,
      k: {
        a: 0,
        k: [
          0,
          0.612,
          0.639,
          0.686,
          0.225,
          0.612,
          0.639,
          0.686,
          0.45,
          0.612,
          0.639,
          0.686,
          0.725,
          0.516,
          0.543,
          0.594,
          1,
          0.42,
          0.447,
          0.502
        ],
        ix: 9
      }
    },
    s: {
      a: 0,
      k: [
        75,
        -75
      ],
      ix: 5
    },
    e: {
      a: 0,
      k: [
        155.624,
        64.645
      ],
      ix: 6
    },
    t: 1,
    hd: !1
  }];
}, r0 = (x, t) => [
  {
    ddd: 0,
    ind: 13,
    ty: 4,
    nm: "cloud",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          256,
          256,
          0
        ],
        ix: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6
      }
    },
    ao: 0,
    hasMask: !0,
    masksProperties: [
      {
        inv: !1,
        mode: "a",
        pt: {
          a: 0,
          k: {
            i: [
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ]
            ],
            o: [
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ]
            ],
            v: [
              [
                -255.5,
                -255.5
              ],
              [
                256.5,
                -255.5
              ],
              [
                -255.5,
                256.5
              ]
            ],
            c: !0
          },
          ix: 1
        },
        o: {
          a: 0,
          k: 100,
          ix: 3
        },
        x: {
          a: 0,
          k: 0,
          ix: 4
        }
      }
    ],
    shapes: [
      {
        ind: 0,
        ty: "sh",
        ix: 1,
        ks: {
          a: 0,
          k: {
            i: [
              [
                30.928,
                0
              ],
              [
                0.844,
                -0.038
              ],
              [
                0,
                6.951
              ],
              [
                46.392,
                0
              ],
              [
                14.803,
                -23.924
              ],
              [
                10.461,
                0
              ],
              [
                0,
                -30.928
              ],
              [
                -0.484,
                -2.963
              ],
              [
                0,
                -29.306
              ],
              [
                -33.137,
                0
              ],
              [
                -1.328,
                0.088
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                30.928
              ]
            ],
            o: [
              [
                -0.854,
                0
              ],
              [
                1.592,
                -6.459
              ],
              [
                0,
                -46.392
              ],
              [
                -30.201,
                0
              ],
              [
                -8.378,
                -4.994
              ],
              [
                -30.928,
                0
              ],
              [
                0,
                3.1
              ],
              [
                -27.779,
                5.25
              ],
              [
                0,
                33.137
              ],
              [
                1.351,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                30.928,
                0
              ],
              [
                0,
                -30.928
              ]
            ],
            v: [
              [
                116,
                -4
              ],
              [
                113.471,
                -3.873
              ],
              [
                116,
                -24
              ],
              [
                32,
                -108
              ],
              [
                -39.404,
                -68.085
              ],
              [
                -68,
                -76
              ],
              [
                -124,
                -20
              ],
              [
                -123.199,
                -10.917
              ],
              [
                -172,
                48
              ],
              [
                -112,
                108
              ],
              [
                -108,
                107.798
              ],
              [
                -108,
                108
              ],
              [
                116,
                108
              ],
              [
                172,
                52
              ]
            ],
            c: !0
          },
          ix: 2
        },
        hd: !1
      },
      ...q0(x, t)
    ],
    ip: 0,
    op: 360,
    st: 0,
    bm: 0
  }
], q0 = (x, t) => {
  const y = x === "line" ? 12 : 6, i = t && n(t) ? [t[0] / 255, t[1] / 255, t[2] / 255, 1] : x === "line" ? [0.901960790157, 0.937254905701, 0.988235294819, 1] : [0.901960790157, 0.937254905701, 0.988235294819, 1];
  return x === "line" ? [h(i, y)] : t && n(t) ? [h(i, y), {
    ty: "fl",
    c: {
      a: 0,
      k: i,
      ix: 3
    },
    o: {
      a: 0,
      k: 100,
      ix: 4
    },
    w: {
      a: 0,
      k: 12,
      ix: 5
    },
    lc: 2,
    lj: 1,
    ml: 10,
    bm: 0,
    hd: !1
  }] : [h(i, y), {
    ty: "gf",
    o: {
      a: 0,
      k: 100,
      ix: 10
    },
    r: 1,
    bm: 0,
    g: {
      p: 5,
      k: {
        a: 0,
        k: [
          0,
          0.953,
          0.969,
          0.996,
          0.225,
          0.953,
          0.969,
          0.996,
          0.45,
          0.953,
          0.969,
          0.996,
          0.725,
          0.912,
          0.943,
          0.99,
          1,
          0.871,
          0.918,
          0.984
        ],
        ix: 9
      }
    },
    s: {
      a: 0,
      k: [
        -76,
        -81
      ],
      ix: 5
    },
    e: {
      a: 0,
      k: [
        57.186,
        149.685
      ],
      ix: 6
    },
    t: 1,
    nm: "cloud-fill",
    mn: "ADBE Vector Graphic - G-Fill",
    hd: !1
  }];
}, m = (x, t) => {
  const y = t && n(t) ? [t[0] / 255, t[1] / 255, t[2] / 255, 1] : [0.039215687662, 0.352941185236, 0.831372559071, 1], i = {
    small: [
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 40,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 55,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 100,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 160,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 175,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 220,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 280,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 295,
              s: [
                100
              ]
            },
            {
              t: 340,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 40,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 55,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 100,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 160,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 175,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 220,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 280,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 295,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 340,
              s: [
                312,
                420,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      },
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: -40,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: -25,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                44.444
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 20,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 80,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 95,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 140,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 200,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 215,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 260,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 320,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 335,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 359,
              s: [
                46.667
              ]
            },
            {
              t: 380,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: -40,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: -25,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                256,
                366.666,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 20,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 80,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 95,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 140,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 200,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 215,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 260,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 320,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 335,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 359,
              s: [
                256,
                364,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 380,
              s: [
                256,
                420,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      },
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 15,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 60,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 120,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 135,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 180,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 240,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 255,
              s: [
                100
              ]
            },
            {
              t: 300,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 15,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 60,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 120,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 135,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 180,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 240,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 255,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 300,
              s: [
                200,
                420,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      }
    ],
    medium: [
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 9,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 21,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 40,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 48,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 68,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 80,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 100,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 108,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 128,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 140,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 160,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 168,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 188,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 200,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 220,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 228,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 248,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 260,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 280,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 288,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 308,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 320,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 340,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 348,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 368,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 380,
              s: [
                0
              ]
            },
            {
              t: 400,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                312,
                357,
                0
              ],
              to: [
                0,
                -4.235,
                0
              ],
              ti: [
                0,
                13.146,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 21,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                -16.344,
                0
              ],
              ti: [
                0,
                -5.819,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 40,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                10.5,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 80,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 100,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 140,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 160,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 200,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 220,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 260,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 280,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 320,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 340,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 380,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                20,
                0
              ]
            },
            {
              t: 400,
              s: [
                312,
                300,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      },
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: -40,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: -25,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 20,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 28,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 48,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 60,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 80,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 88,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 108,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 120,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 140,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 148,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 168,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 180,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 200,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 208,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 228,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 240,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 260,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 268,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 288,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 300,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 320,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 328,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 348,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 360,
              s: [
                0
              ]
            },
            {
              t: 380,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: -40,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: -25,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                9.899,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 20,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 60,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 80,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 120,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 140,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 180,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 200,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 240,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 260,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 300,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 320,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 360,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                20,
                0
              ]
            },
            {
              t: 380,
              s: [
                256,
                300,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      },
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 8,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 28,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 40,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 60,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 68,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 88,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 100,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 120,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 128,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 148,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 160,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 180,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 188,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 208,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 220,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 240,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 248,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 268,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 280,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 300,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 308,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 328,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 340,
              s: [
                0
              ]
            },
            {
              t: 360,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                20,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 40,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 60,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 100,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 120,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 160,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 180,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 220,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 240,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 280,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 300,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 340,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                20,
                0
              ]
            },
            {
              t: 360,
              s: [
                200,
                300,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      }
    ],
    heavy: [
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                33
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 1,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 5,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 7,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 12,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 15,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 20,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 22,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 27,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 30,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 35,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 37,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 42,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 45,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 50,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 52,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 57,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 60,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 65,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 67,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 72,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 75,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 80,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 82,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 87,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 90,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 95,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 97,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 102,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 105,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 110,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 112,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 117,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 120,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 125,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 127,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 132,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 135,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 140,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 142,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 147,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 150,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 155,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 157,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 162,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 165,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 170,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 172,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 177,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 180,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 185,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 187,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 192,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 195,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 200,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 202,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 207,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 210,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 215,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 217,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 222,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 225,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 230,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 232,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 237,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 240,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 245,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 247,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 252,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 255,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 260,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 262,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 267,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 270,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 275,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 277,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 282,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 285,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 290,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 292,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 297,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 300,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 305,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 307,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 312,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 315,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 320,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 322,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 327,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 330,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 335,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 337,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 342,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 345,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 350,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 352,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 357,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 359,
              s: [
                33
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 363,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 370,
              s: [
                0
              ]
            },
            {
              t: 380,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                312,
                408,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 1,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 5,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 15,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 20,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 30,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 35,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 45,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 50,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 60,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 65,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 75,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 80,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 90,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 95,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 105,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 110,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 120,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 125,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 135,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 140,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 150,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 155,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 165,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 170,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 180,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 185,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 195,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 200,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 210,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 215,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 225,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 230,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 240,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 245,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 255,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 260,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 270,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 275,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 285,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 290,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 300,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 305,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 315,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 320,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 330,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 335,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 345,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 350,
              s: [
                312,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 359,
              s: [
                312,
                408,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 370,
              s: [
                312,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 380,
              s: [
                312,
                300,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      },
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 2,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 6,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 10,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 12,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 17,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 20,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 25,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 27,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 32,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 35,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 40,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 42,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 47,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 50,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 55,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 57,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 62,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 65,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 70,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 72,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 77,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 80,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 85,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 87,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 92,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 95,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 100,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 102,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 107,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 110,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 115,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 117,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 122,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 125,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 130,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 132,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 137,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 140,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 145,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 147,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 152,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 155,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 160,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 162,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 167,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 170,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 175,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 177,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 182,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 185,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 190,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 192,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 197,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 200,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 205,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 207,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 212,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 215,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 220,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 222,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 227,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 230,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 235,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 237,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 242,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 245,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 250,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 252,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 257,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 260,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 265,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 267,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 272,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 275,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 280,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 282,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 287,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 290,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 295,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 297,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 302,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 305,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 310,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 312,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 317,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 320,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 325,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 327,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 332,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 335,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 340,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 342,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 347,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 350,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 355,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 357,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 359,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 362,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 365,
              s: [
                0
              ]
            },
            {
              t: 370,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                256,
                348,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 6,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 10,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 20,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 25,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 35,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 40,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 50,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 55,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 65,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 70,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 80,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 85,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 95,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 100,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 110,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 115,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 125,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 130,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 140,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 145,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 155,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 160,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 170,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 175,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 185,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 190,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 200,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 205,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 215,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 220,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 230,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 235,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 245,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 250,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 260,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 265,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 275,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 280,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 290,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 295,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 305,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 310,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 320,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 325,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 335,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 340,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 350,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 355,
              s: [
                256,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 359,
              s: [
                256,
                348.001,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 365,
              s: [
                256,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 370,
              s: [
                256,
                300,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      },
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 2,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 7,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 10,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 15,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 17,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 22,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 25,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 30,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 32,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 37,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 40,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 45,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 47,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 52,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 55,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 60,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 62,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 67,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 70,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 75,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 77,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 82,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 85,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 90,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 92,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 97,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 100,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 105,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 107,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 112,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 115,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 120,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 122,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 127,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 130,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 135,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 137,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 142,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 145,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 150,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 152,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 157,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 160,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 165,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 167,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 172,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 175,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 180,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 182,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 187,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 190,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 195,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 197,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 202,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 205,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 210,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 212,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 217,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 220,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 225,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 227,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 232,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 235,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 240,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 242,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 247,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 250,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 255,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 257,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 262,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 265,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 270,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 272,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 277,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 280,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 285,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 287,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 292,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 295,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 300,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 302,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 307,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 310,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 315,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 317,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 322,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 325,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 330,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 332,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 337,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 340,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 345,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 347,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 352,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 355,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 360,
              s: [
                0
              ]
            },
            {
              t: 364,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 10,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 15,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 25,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 30,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 40,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 45,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 55,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 60,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 70,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 75,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 85,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 90,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 100,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 105,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 115,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 120,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 130,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 135,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 145,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 150,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 160,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 165,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 175,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 180,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 190,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 195,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 205,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 210,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 220,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 225,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 235,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 240,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 250,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 255,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 265,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 270,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 280,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 285,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 295,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 300,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 310,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 315,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 325,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 330,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 340,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 345,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 355,
              s: [
                200,
                420,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 360,
              s: [
                200,
                300,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 364,
              s: [
                200,
                300,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      }
    ]
  };
  return x0(i, x) || (x = "small"), i[x].map((o, s) => ({
    ddd: 0,
    ind: s + 1,
    ty: 4,
    nm: "raindrop",
    sr: 1,
    ao: 0,
    shapes: [
      {
        ind: 0,
        ty: "sh",
        ix: 1,
        ks: {
          a: 0,
          k: {
            i: [
              [
                4.418,
                0
              ],
              [
                0,
                4.422
              ],
              [
                0,
                0
              ],
              [
                -4.418,
                0
              ],
              [
                0,
                -4.422
              ],
              [
                0,
                0
              ]
            ],
            o: [
              [
                -4.418,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                -4.422
              ],
              [
                4.418,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                4.422
              ]
            ],
            v: [
              [
                0,
                14
              ],
              [
                -8,
                6
              ],
              [
                -8,
                -6
              ],
              [
                0,
                -14
              ],
              [
                8,
                -6
              ],
              [
                8,
                6
              ]
            ],
            c: !0
          },
          ix: 2
        },
        hd: !1
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: y,
          ix: 4
        },
        o: {
          a: 0,
          k: 100,
          ix: 5
        },
        r: 1,
        bm: 0,
        hd: !1
      }
    ],
    ip: 0,
    op: 360,
    st: 0,
    ct: 1,
    bm: 0,
    ks: {
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      },
      ...o
    }
  }));
}, F = (x, t) => {
  const y = t && n(t) ? [t[0] / 255, t[1] / 255, t[2] / 255, 1] : [0.039215687662, 0.352941185236, 0.831372559071, 1], i = t && n(t) ? {
    ty: "fl",
    c: {
      a: 0,
      k: y,
      ix: 4
    },
    o: {
      a: 0,
      k: 100,
      ix: 5
    },
    r: 1,
    bm: 0,
    hd: !1
  } : {
    ty: "gf",
    o: {
      a: 0,
      k: 100,
      ix: 10
    },
    r: 1,
    bm: 0,
    g: {
      p: 5,
      k: {
        a: 0,
        k: [
          0,
          0.525,
          0.765,
          0.859,
          0.225,
          0.525,
          0.765,
          0.859,
          0.45,
          0.525,
          0.765,
          0.859,
          0.725,
          0.447,
          0.725,
          0.835,
          1,
          0.369,
          0.686,
          0.812
        ],
        ix: 9
      }
    },
    s: {
      a: 0,
      k: [
        45.483,
        83.129
      ],
      ix: 5
    },
    e: {
      a: 0,
      k: [
        66.931,
        120.278
      ],
      ix: 6
    },
    t: 1,
    hd: !1
  }, o = [360, -360, 360], s = [55, 0, -55], e = [
    [
      [
        52.961,
        106.322
      ],
      [
        50.735,
        98.125
      ],
      [
        56.011,
        95.126
      ],
      [
        59.039,
        95.928
      ],
      [
        61.265,
        104.125
      ]
    ],
    [
      [
        -3.039,
        106.322
      ],
      [
        -5.265,
        98.125
      ],
      [
        0.011,
        95.126
      ],
      [
        3.039,
        95.928
      ],
      [
        5.265,
        104.125
      ]
    ],
    [
      [
        -59.039,
        106.322
      ],
      [
        -61.265,
        98.125
      ],
      [
        -55.989,
        95.126
      ],
      [
        -52.961,
        95.928
      ],
      [
        -50.735,
        104.125
      ]
    ]
  ], g = [
    [
      [
        75.573,
        107.661
      ],
      [
        69.792,
        104.367
      ],
      [
        69.779,
        97.891
      ],
      [
        75.573,
        94.589
      ],
      [
        77.056,
        89.125
      ],
      [
        71.521,
        87.661
      ],
      [
        65.733,
        90.96
      ],
      [
        63.092,
        89.001
      ],
      [
        60.052,
        87.722
      ],
      [
        60.052,
        81.125
      ],
      [
        56,
        77.125
      ],
      [
        51.948,
        81.125
      ],
      [
        51.948,
        87.729
      ],
      [
        46.26,
        90.956
      ],
      [
        40.479,
        87.661
      ],
      [
        34.944,
        89.125
      ],
      [
        36.427,
        94.589
      ],
      [
        42.208,
        97.883
      ],
      [
        42.221,
        104.359
      ],
      [
        36.427,
        107.661
      ],
      [
        34.944,
        113.125
      ],
      [
        38.457,
        115.126
      ],
      [
        40.479,
        114.589
      ],
      [
        46.267,
        111.29
      ],
      [
        48.908,
        113.249
      ],
      [
        51.948,
        114.52
      ],
      [
        51.948,
        121.125
      ],
      [
        56,
        125.125
      ],
      [
        60.052,
        121.125
      ],
      [
        60.052,
        114.511
      ],
      [
        65.732,
        111.289
      ],
      [
        71.521,
        114.589
      ],
      [
        73.543,
        115.126
      ],
      [
        77.056,
        113.125
      ]
    ],
    [
      [
        19.573,
        107.661
      ],
      [
        13.792,
        104.367
      ],
      [
        13.779,
        97.891
      ],
      [
        19.573,
        94.589
      ],
      [
        21.056,
        89.125
      ],
      [
        15.521,
        87.661
      ],
      [
        9.733,
        90.96
      ],
      [
        7.092,
        89.001
      ],
      [
        4.052,
        87.722
      ],
      [
        4.052,
        81.125
      ],
      [
        0,
        77.125
      ],
      [
        -4.052,
        81.125
      ],
      [
        -4.052,
        87.729
      ],
      [
        -9.74,
        90.956
      ],
      [
        -15.521,
        87.661
      ],
      [
        -21.056,
        89.125
      ],
      [
        -19.573,
        94.589
      ],
      [
        -13.792,
        97.883
      ],
      [
        -13.779,
        104.359
      ],
      [
        -19.573,
        107.661
      ],
      [
        -21.056,
        113.125
      ],
      [
        -17.543,
        115.126
      ],
      [
        -15.521,
        114.589
      ],
      [
        -9.733,
        111.29
      ],
      [
        -7.092,
        113.249
      ],
      [
        -4.052,
        114.52
      ],
      [
        -4.052,
        121.125
      ],
      [
        0,
        125.125
      ],
      [
        4.052,
        121.125
      ],
      [
        4.052,
        114.511
      ],
      [
        9.732,
        111.289
      ],
      [
        15.521,
        114.589
      ],
      [
        17.543,
        115.126
      ],
      [
        21.056,
        113.125
      ]
    ],
    [
      [
        -36.427,
        107.661
      ],
      [
        -42.208,
        104.367
      ],
      [
        -42.221,
        97.891
      ],
      [
        -36.427,
        94.589
      ],
      [
        -34.944,
        89.125
      ],
      [
        -40.479,
        87.661
      ],
      [
        -46.267,
        90.96
      ],
      [
        -48.908,
        89.001
      ],
      [
        -51.948,
        87.722
      ],
      [
        -51.948,
        81.125
      ],
      [
        -56,
        77.125
      ],
      [
        -60.052,
        81.125
      ],
      [
        -60.052,
        87.729
      ],
      [
        -65.74,
        90.956
      ],
      [
        -71.521,
        87.661
      ],
      [
        -77.056,
        89.125
      ],
      [
        -75.573,
        94.589
      ],
      [
        -69.792,
        97.883
      ],
      [
        -69.779,
        104.359
      ],
      [
        -75.573,
        107.661
      ],
      [
        -77.056,
        113.125
      ],
      [
        -73.543,
        115.126
      ],
      [
        -71.521,
        114.589
      ],
      [
        -65.733,
        111.29
      ],
      [
        -63.092,
        113.249
      ],
      [
        -60.052,
        114.52
      ],
      [
        -60.052,
        121.125
      ],
      [
        -56,
        125.125
      ],
      [
        -51.948,
        121.125
      ],
      [
        -51.948,
        114.511
      ],
      [
        -46.268,
        111.289
      ],
      [
        -40.479,
        114.589
      ],
      [
        -38.457,
        115.126
      ],
      [
        -34.944,
        113.125
      ]
    ]
  ], p = {
    small: [
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 50,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 70,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 270,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 290,
              s: [
                0
              ]
            },
            {
              t: 359,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                301,
                347.8,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 50,
              s: [
                301,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 290,
              s: [
                301,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 359,
              s: [
                301,
                347.8,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      },
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: -80,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: -70,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 100,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 120,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 280,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 340,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 359,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 390,
              s: [
                100
              ]
            },
            {
              t: 400,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: -80,
              s: [
                256,
                194,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                256,
                401.6,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 100,
              s: [
                256,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 340,
              s: [
                256,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 359,
              s: [
                256,
                401.6,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 400,
              s: [
                256,
                322,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      },
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 20,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 220,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 240,
              s: [
                0
              ]
            },
            {
              t: 359,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                201,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 240,
              s: [
                201,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 359,
              s: [
                201,
                294,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      }
    ],
    medium: [
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 50,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 60,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 160,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 170,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 230,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 240,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 340,
              s: [
                100
              ]
            },
            {
              t: 350,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 50,
              s: [
                301,
                294,
                0
              ],
              to: [
                0,
                21.333,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 170,
              s: [
                301,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 230,
              s: [
                301,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                -21.333,
                0
              ]
            },
            {
              t: 350,
              s: [
                301,
                422,
                0
              ]
            }
          ],
          ix: 2
        }
      },
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: -80,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: -70,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 30,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 40,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 100,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 110,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 210,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 220,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 280,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 290,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 359,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 390,
              s: [
                100
              ]
            },
            {
              t: 400,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: -80,
              s: [
                256,
                194,
                0
              ],
              to: [
                0,
                12.316,
                0
              ],
              ti: [
                0,
                -32.255,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                256,
                379.33,
                0
              ],
              to: [
                0,
                23.614,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 40,
              s: [
                256,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 100,
              s: [
                256,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 220,
              s: [
                256,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 280,
              s: [
                256,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                -37.742,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 359,
              s: [
                256,
                378.264,
                0
              ],
              to: [
                0,
                19.406,
                0
              ],
              ti: [
                0,
                -7.244,
                0
              ]
            },
            {
              t: 400,
              s: [
                256,
                322,
                0
              ]
            }
          ],
          ix: 2
        }
      },
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 10,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 110,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 120,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 180,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 190,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 290,
              s: [
                100
              ]
            },
            {
              t: 300,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                201,
                294,
                0
              ],
              to: [
                0,
                21.333,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 120,
              s: [
                201,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 180,
              s: [
                201,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                -21.333,
                0
              ]
            },
            {
              t: 300,
              s: [
                201,
                422,
                0
              ]
            }
          ],
          ix: 2
        }
      }
    ],
    heavy: [
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 15,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 20,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 50,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 55,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 105,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 110,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 140,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 145,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 195,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 200,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 230,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 235,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 285,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 290,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 320,
              s: [
                0
              ]
            },
            {
              t: 325,
              s: [
                100
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                301,
                377.2,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 20,
              s: [
                301,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 50,
              s: [
                301,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 110,
              s: [
                301,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 140,
              s: [
                301,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 200,
              s: [
                301,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 230,
              s: [
                301,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 290,
              s: [
                301,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 320,
              s: [
                301,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 359,
              s: [
                301,
                377.2,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      },
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 10,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 15,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 65,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 70,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 100,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 105,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 155,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 160,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 190,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 195,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 245,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 250,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 280,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 285,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 335,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 340,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 359,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 370,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 395,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 400,
              s: [
                0
              ]
            },
            {
              t: 430,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                256,
                336.7,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 10,
              s: [
                256,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 70,
              s: [
                256,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 100,
              s: [
                256,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 160,
              s: [
                256,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 190,
              s: [
                256,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 250,
              s: [
                256,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 280,
              s: [
                256,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 340,
              s: [
                256,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 370,
              s: [
                256,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 400,
              s: [
                256,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 430,
              s: [
                256,
                294,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      },
      {
        o: {
          a: 1,
          k: [
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 0,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 5,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 55,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 60,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 90,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 95,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 145,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 150,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 180,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 185,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 235,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 240,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 270,
              s: [
                0
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 275,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 325,
              s: [
                100
              ]
            },
            {
              i: {
                x: [
                  0.833
                ],
                y: [
                  0.833
                ]
              },
              o: {
                x: [
                  0.167
                ],
                y: [
                  0.167
                ]
              },
              t: 330,
              s: [
                0
              ]
            },
            {
              t: 360,
              s: [
                0
              ]
            }
          ],
          ix: 11
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 0,
              s: [
                201,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 60,
              s: [
                201,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 90,
              s: [
                201,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 150,
              s: [
                201,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 180,
              s: [
                201,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 240,
              s: [
                201,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 270,
              s: [
                201,
                294,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              i: {
                x: 0.833,
                y: 0.833
              },
              o: {
                x: 0.167,
                y: 0.167
              },
              t: 330,
              s: [
                201,
                422,
                0
              ],
              to: [
                0,
                0,
                0
              ],
              ti: [
                0,
                0,
                0
              ]
            },
            {
              t: 360,
              s: [
                201,
                294,
                0
              ]
            }
          ],
          ix: 2,
          l: 2
        }
      }
    ]
  };
  return x0(p, x) || (x = "small"), p[x].map((B, v) => ({
    ddd: 0,
    ind: v + 1,
    ty: 4,
    nm: "snowflake",
    sr: 1,
    ao: 0,
    shapes: [
      {
        ind: 0,
        ty: "sh",
        ix: 1,
        ks: {
          a: 0,
          k: {
            i: [
              [
                2.905,
                1.65
              ],
              [
                -1.675,
                2.865
              ],
              [
                -2.103,
                0
              ],
              [
                -0.955,
                -0.543
              ],
              [
                1.675,
                -2.865
              ]
            ],
            o: [
              [
                -2.902,
                -1.655
              ],
              [
                1.125,
                -1.923
              ],
              [
                1.03,
                0
              ],
              [
                2.902,
                1.655
              ],
              [
                -1.677,
                2.866
              ]
            ],
            v: e[v],
            c: !0
          },
          ix: 2
        },
        hd: !1
      },
      {
        ind: 1,
        ty: "sh",
        ix: 2,
        ks: {
          a: 0,
          k: {
            i: [
              [
                1.938,
                1.104
              ],
              [
                0,
                0
              ],
              [
                0.507,
                2.103
              ],
              [
                0,
                0
              ],
              [
                1.12,
                1.913
              ],
              [
                1.942,
                -1.107
              ],
              [
                0,
                0
              ],
              [
                0.979,
                0.558
              ],
              [
                1.039,
                0.306
              ],
              [
                0,
                0
              ],
              [
                2.239,
                0
              ],
              [
                0,
                -2.21
              ],
              [
                0,
                0
              ],
              [
                1.632,
                -1.522
              ],
              [
                0,
                0
              ],
              [
                1.119,
                -1.914
              ],
              [
                -1.938,
                -1.104
              ],
              [
                0,
                0
              ],
              [
                -0.507,
                -2.103
              ],
              [
                0,
                0
              ],
              [
                -1.12,
                -1.913
              ],
              [
                -1.401,
                0
              ],
              [
                -0.638,
                0.365
              ],
              [
                0,
                0
              ],
              [
                -0.979,
                -0.558
              ],
              [
                -1.038,
                -0.306
              ],
              [
                0,
                0
              ],
              [
                -2.239,
                0
              ],
              [
                0,
                2.21
              ],
              [
                0,
                0
              ],
              [
                -1.631,
                1.52
              ],
              [
                0,
                0
              ],
              [
                -0.687,
                0
              ],
              [
                -0.751,
                1.284
              ]
            ],
            o: [
              [
                0,
                0
              ],
              [
                0.519,
                -2.156
              ],
              [
                0,
                0
              ],
              [
                1.938,
                -1.104
              ],
              [
                -1.119,
                -1.914
              ],
              [
                0,
                0
              ],
              [
                -0.788,
                -0.735
              ],
              [
                -0.979,
                -0.558
              ],
              [
                0,
                0
              ],
              [
                0,
                -2.21
              ],
              [
                -2.239,
                0
              ],
              [
                0,
                0
              ],
              [
                -2.098,
                0.618
              ],
              [
                0,
                0
              ],
              [
                -1.939,
                -1.107
              ],
              [
                -1.12,
                1.913
              ],
              [
                0,
                0
              ],
              [
                -0.519,
                2.156
              ],
              [
                0,
                0
              ],
              [
                -1.938,
                1.104
              ],
              [
                0.751,
                1.284
              ],
              [
                0.687,
                0
              ],
              [
                0,
                0
              ],
              [
                0.788,
                0.735
              ],
              [
                0.979,
                0.558
              ],
              [
                0,
                0
              ],
              [
                0,
                2.21
              ],
              [
                2.239,
                0
              ],
              [
                0,
                0
              ],
              [
                2.096,
                -0.618
              ],
              [
                0,
                0
              ],
              [
                0.638,
                0.365
              ],
              [
                1.401,
                0
              ],
              [
                1.12,
                -1.913
              ]
            ],
            v: g[v],
            c: !0
          },
          ix: 2
        },
        hd: !1
      },
      {
        ty: "st",
        c: {
          a: 0,
          k: y,
          ix: 3
        },
        o: {
          a: 0,
          k: 100,
          ix: 4
        },
        w: {
          a: 0,
          k: 1,
          ix: 5
        },
        lc: 1,
        lj: 1,
        ml: 10,
        bm: 0,
        hd: !1
      },
      i
    ],
    ip: 0,
    op: 360,
    st: 0,
    bm: 0,
    ks: {
      r: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 359,
            s: [
              o[v]
            ]
          }
        ],
        ix: 10
      },
      a: {
        a: 0,
        k: [
          s[v],
          100,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6
      },
      ...B
    }
  }));
}, D = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : [0.964705884457, 0.658823549747, 0.137254908681, 1], y = x && n(x) ? {
    ty: "fl",
    c: {
      a: 0,
      k: t,
      ix: 3
    },
    o: {
      a: 0,
      k: 100,
      ix: 4
    },
    w: {
      a: 0,
      k: 6,
      ix: 5
    },
    lc: 1,
    lj: 1,
    ml: 10,
    bm: 0,
    hd: !1
  } : {
    ty: "gf",
    o: {
      a: 0,
      k: 100,
      ix: 10
    },
    r: 1,
    bm: 0,
    g: {
      p: 5,
      k: {
        a: 0,
        k: [
          0,
          0.969,
          0.698,
          0.231,
          0.225,
          0.969,
          0.698,
          0.231,
          0.45,
          0.969,
          0.698,
          0.231,
          0.725,
          0.965,
          0.659,
          0.137,
          1,
          0.961,
          0.62,
          0.043
        ],
        ix: 9
      }
    },
    s: {
      a: 0,
      k: [
        -42.556,
        -73.372
      ],
      ix: 5
    },
    e: {
      a: 0,
      k: [
        29.654,
        51.699
      ],
      ix: 6
    },
    t: 1,
    hd: !1
  };
  return {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "lightning-bolt",
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 30,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 40,
            s: [
              0
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 50,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 60,
            s: [
              0
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 70,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 75,
            s: [
              0
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 80,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 120,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 150,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 160,
            s: [
              0
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 170,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 180,
            s: [
              0
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 190,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 195,
            s: [
              0
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 200,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 240,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 270,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 280,
            s: [
              0
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 290,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 300,
            s: [
              0
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 310,
            s: [
              100
            ]
          },
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 315,
            s: [
              0
            ]
          },
          {
            t: 320,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          256.556,
          351.372,
          0
        ],
        ix: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ind: 0,
            ty: "sh",
            ix: 1,
            ks: {
              a: 0,
              k: {
                i: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                o: [
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ],
                  [
                    0,
                    0
                  ]
                ],
                v: [
                  [
                    -16,
                    -88
                  ],
                  [
                    -48,
                    8
                  ],
                  [
                    -16,
                    8
                  ],
                  [
                    -32,
                    88
                  ],
                  [
                    48,
                    -24
                  ],
                  [
                    0,
                    -24
                  ],
                  [
                    32,
                    -88
                  ]
                ],
                c: !0
              },
              ix: 2
            },
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: t,
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 0,
              k: 4,
              ix: 5
            },
            lc: 1,
            lj: 1,
            ml: 10,
            bm: 0,
            hd: !1
          },
          y,
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            }
          }
        ],
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        hd: !1
      }
    ],
    ip: 0,
    op: 360,
    st: 0,
    bm: 0
  };
}, z = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : [0.525490224361, 0.764705896378, 0.858823537827, 1], y = [
    {
      a: 1,
      k: [
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 15,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 20,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 40,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 50,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 75,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 80,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 100,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 110,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 135,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 140,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 160,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 170,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 195,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 200,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 220,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 230,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 255,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 260,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 280,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 290,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 315,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 320,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 340,
          s: [
            100
          ]
        },
        {
          t: 350,
          s: [
            0
          ]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: -30,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: -25,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: -5,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 0,
          s: [
            50
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 5,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 30,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 55,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 65,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 90,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 95,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 115,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 125,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 150,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 155,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 175,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 185,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 210,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 215,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 235,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 245,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 270,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 275,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 295,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 305,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 330,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 335,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 355,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 359,
          s: [
            60
          ]
        },
        {
          t: 365,
          s: [
            0
          ]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 0,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 5,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 25,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 35,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 60,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 65,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 85,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 95,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 120,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 125,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 145,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 155,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 180,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 185,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 205,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 215,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 240,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 245,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 265,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 275,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 300,
          s: [
            0
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 305,
          s: [
            100
          ]
        },
        {
          i: {
            x: [
              0.833
            ],
            y: [
              0.833
            ]
          },
          o: {
            x: [
              0.167
            ],
            y: [
              0.167
            ]
          },
          t: 325,
          s: [
            100
          ]
        },
        {
          t: 335,
          s: [
            0
          ]
        }
      ],
      ix: 11
    }
  ], i = [
    {
      a: 1,
      k: [
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 15,
          s: [
            256,
            180,
            0
          ],
          to: [
            0,
            22,
            0
          ],
          ti: [
            -1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 40,
          s: [
            256,
            312,
            0
          ],
          to: [
            1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 50,
          s: [
            264,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 75,
          s: [
            256,
            180,
            0
          ],
          to: [
            -1.333,
            2,
            0
          ],
          ti: [
            -1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 100,
          s: [
            256,
            312,
            0
          ],
          to: [
            1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 110,
          s: [
            264,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 135,
          s: [
            256,
            180,
            0
          ],
          to: [
            -1.333,
            2,
            0
          ],
          ti: [
            -1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 160,
          s: [
            256,
            312,
            0
          ],
          to: [
            1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 170,
          s: [
            264,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 195,
          s: [
            256,
            180,
            0
          ],
          to: [
            -1.333,
            2,
            0
          ],
          ti: [
            -1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 220,
          s: [
            256,
            312,
            0
          ],
          to: [
            1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 230,
          s: [
            264,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 255,
          s: [
            256,
            180,
            0
          ],
          to: [
            -1.333,
            2,
            0
          ],
          ti: [
            -1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 280,
          s: [
            256,
            312,
            0
          ],
          to: [
            1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 290,
          s: [
            264,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 315,
          s: [
            256,
            180,
            0
          ],
          to: [
            -1.333,
            2,
            0
          ],
          ti: [
            -1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 340,
          s: [
            256,
            312,
            0
          ],
          to: [
            1.333,
            20,
            0
          ],
          ti: [
            -1.333,
            2,
            0
          ]
        },
        {
          t: 350,
          s: [
            264,
            300,
            0
          ]
        }
      ],
      ix: 2,
      l: 2
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: -30,
          s: [
            256,
            180,
            0
          ],
          to: [
            0,
            22,
            0
          ],
          ti: [
            -1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: -5,
          s: [
            256,
            312,
            0
          ],
          to: [
            0.875,
            13.125,
            0
          ],
          ti: [
            -2.077,
            7.628,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 0,
          s: [
            262.124,
            317.702,
            0
          ],
          to: [
            1.088,
            -3.995,
            0
          ],
          ti: [
            0,
            7.562,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 5,
          s: [
            264,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 30,
          s: [
            256,
            180,
            0
          ],
          to: [
            -1.333,
            2,
            0
          ],
          ti: [
            0,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 55,
          s: [
            256,
            312,
            0
          ],
          to: [
            0,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 65,
          s: [
            256,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            0,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 90,
          s: [
            256,
            180,
            0
          ],
          to: [
            0,
            2,
            0
          ],
          ti: [
            -1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 115,
          s: [
            256,
            312,
            0
          ],
          to: [
            1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 125,
          s: [
            264,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 150,
          s: [
            256,
            180,
            0
          ],
          to: [
            -1.333,
            2,
            0
          ],
          ti: [
            -1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 175,
          s: [
            256,
            312,
            0
          ],
          to: [
            1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 185,
          s: [
            264,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 210,
          s: [
            256,
            180,
            0
          ],
          to: [
            -1.333,
            2,
            0
          ],
          ti: [
            -1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 235,
          s: [
            256,
            312,
            0
          ],
          to: [
            1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 245,
          s: [
            264,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 270,
          s: [
            256,
            180,
            0
          ],
          to: [
            -1.333,
            2,
            0
          ],
          ti: [
            -1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 295,
          s: [
            256,
            312,
            0
          ],
          to: [
            1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 305,
          s: [
            264,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 330,
          s: [
            256,
            180,
            0
          ],
          to: [
            -1.333,
            2,
            0
          ],
          ti: [
            -1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 355,
          s: [
            256,
            312,
            0
          ],
          to: [
            0.597,
            8.962,
            0
          ],
          ti: [
            -1.484,
            4.099,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 359,
          s: [
            259.482,
            315.785,
            0
          ],
          to: [
            1.828,
            -5.049,
            0
          ],
          ti: [
            -0.736,
            1.104,
            0
          ]
        },
        {
          t: 365,
          s: [
            264,
            300,
            0
          ]
        }
      ],
      ix: 2,
      l: 2
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 0,
          s: [
            256,
            180,
            0
          ],
          to: [
            0,
            22,
            0
          ],
          ti: [
            1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 25,
          s: [
            256,
            312,
            0
          ],
          to: [
            -1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 35,
          s: [
            248,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            -1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 60,
          s: [
            256,
            180,
            0
          ],
          to: [
            1.333,
            2,
            0
          ],
          ti: [
            1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 85,
          s: [
            256,
            312,
            0
          ],
          to: [
            -1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 95,
          s: [
            248,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            -1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 120,
          s: [
            256,
            180,
            0
          ],
          to: [
            1.333,
            2,
            0
          ],
          ti: [
            1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 145,
          s: [
            256,
            312,
            0
          ],
          to: [
            -1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 155,
          s: [
            248,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            -1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 180,
          s: [
            256,
            180,
            0
          ],
          to: [
            1.333,
            2,
            0
          ],
          ti: [
            1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 205,
          s: [
            256,
            312,
            0
          ],
          to: [
            -1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 215,
          s: [
            248,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            -1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 240,
          s: [
            256,
            180,
            0
          ],
          to: [
            1.333,
            2,
            0
          ],
          ti: [
            1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 265,
          s: [
            256,
            312,
            0
          ],
          to: [
            -1.333,
            20,
            0
          ],
          ti: [
            0,
            22,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 275,
          s: [
            248,
            300,
            0
          ],
          to: [
            0,
            -22,
            0
          ],
          ti: [
            -1.333,
            -2,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 300,
          s: [
            256,
            180,
            0
          ],
          to: [
            1.333,
            2,
            0
          ],
          ti: [
            1.333,
            -20,
            0
          ]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 325,
          s: [
            256,
            312,
            0
          ],
          to: [
            -1.333,
            20,
            0
          ],
          ti: [
            1.333,
            2,
            0
          ]
        },
        {
          t: 335,
          s: [
            248,
            300,
            0
          ]
        }
      ],
      ix: 2,
      l: 2
    }
  ], o = [
    [
      [
        -56,
        92.125
      ],
      [
        -68,
        104.125
      ],
      [
        -56,
        116.125
      ],
      [
        -44,
        104.125
      ],
      [
        -56,
        92.125
      ]
    ],
    [
      [
        0,
        92.125
      ],
      [
        -12,
        104.125
      ],
      [
        0,
        116.125
      ],
      [
        12,
        104.125
      ],
      [
        0,
        92.125
      ]
    ],
    [
      [
        56,
        92.125
      ],
      [
        44,
        104.125
      ],
      [
        56,
        116.125
      ],
      [
        68,
        104.125
      ],
      [
        56,
        92.125
      ]
    ]
  ];
  return y.map((s, e) => ({
    ddd: 0,
    ind: e + 1,
    ty: 4,
    nm: "ice-pellet",
    sr: 1,
    ks: {
      o: s,
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: i[e],
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ind: 0,
        ty: "sh",
        ix: 1,
        ks: {
          a: 0,
          k: {
            i: [
              [
                0,
                0
              ],
              [
                0,
                -6.627
              ],
              [
                -6.627,
                0
              ],
              [
                0,
                6.627
              ],
              [
                6.627,
                0
              ]
            ],
            o: [
              [
                -6.627,
                0
              ],
              [
                0,
                6.627
              ],
              [
                6.627,
                0
              ],
              [
                0,
                -6.627
              ],
              [
                0,
                0
              ]
            ],
            v: o[e],
            c: !0
          },
          ix: 2
        },
        hd: !1
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: t,
          ix: 4
        },
        o: {
          a: 0,
          k: 100,
          ix: 5
        },
        r: 1,
        bm: 0,
        hd: !1
      }
    ],
    ip: 0,
    op: 360,
    st: 0,
    ct: 1,
    bm: 0
  }));
}, k0 = (x, t) => t ? {
  ty: "st",
  c: {
    a: 0,
    k: t,
    ix: 3
  },
  o: {
    a: 0,
    k: 100,
    ix: 4
  },
  w: {
    a: 0,
    k: 20,
    ix: 5
  },
  lc: 2,
  lj: 1,
  ml: 10,
  bm: 0,
  hd: !1
} : x === "line" ? {
  ty: "st",
  c: {
    a: 0,
    k: [
      0.886274516582,
      0.909803926945,
      0.941176474094,
      1
    ],
    ix: 3
  },
  o: {
    a: 0,
    k: 100,
    ix: 4
  },
  w: {
    a: 0,
    k: 18,
    ix: 5
  },
  lc: 2,
  lj: 1,
  ml: 10,
  bm: 0,
  d: [
    {
      n: "d",
      nm: "\u865A\u7EBF",
      v: {
        a: 0,
        k: 42,
        ix: 1
      }
    },
    {
      n: "g",
      nm: "\u95F4\u9699",
      v: {
        a: 0,
        k: 60,
        ix: 2
      }
    }
  ],
  nm: "Stroke 1",
  mn: "ADBE Vector Graphic - Stroke",
  hd: !1
} : {
  ty: "gs",
  o: {
    a: 0,
    k: 100,
    ix: 9
  },
  w: {
    a: 0,
    k: 24,
    ix: 10
  },
  g: {
    p: 5,
    k: {
      a: 0,
      k: [
        0,
        0.831,
        0.843,
        0.867,
        0.225,
        0.831,
        0.843,
        0.867,
        0.45,
        0.831,
        0.843,
        0.867,
        0.725,
        0.788,
        0.8,
        0.822,
        1,
        0.745,
        0.757,
        0.776
      ],
      ix: 8
    }
  },
  s: {
    a: 0,
    k: [
      -37,
      -63
    ],
    ix: 4
  },
  e: {
    a: 0,
    k: [
      35,
      61.708
    ],
    ix: 5
  },
  t: 1,
  lc: 2,
  lj: 1,
  ml: 10,
  ml2: {
    a: 0,
    k: 10,
    ix: 13
  },
  bm: 0,
  d: [
    {
      n: "d",
      nm: "dash",
      v: {
        a: 0,
        k: 42,
        ix: 1
      }
    },
    {
      n: "g",
      nm: "gap",
      v: {
        a: 0,
        k: 60,
        ix: 2
      }
    }
  ],
  hd: !1
}, u0 = (x) => [
  {
    a: 1,
    k: [
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 0,
        s: [
          232,
          384,
          0
        ],
        to: [
          8,
          0,
          0
        ],
        ti: [
          0,
          0,
          0
        ]
      },
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 180,
        s: [
          280,
          384,
          0
        ],
        to: [
          0,
          0,
          0
        ],
        ti: [
          8,
          0,
          0
        ]
      },
      {
        t: 359,
        s: [
          232,
          384,
          0
        ]
      }
    ],
    ix: 2
  },
  {
    a: 1,
    k: [
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 0,
        s: [
          280,
          432,
          0
        ],
        to: [
          -8,
          0,
          0
        ],
        ti: [
          0,
          0,
          0
        ]
      },
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 180,
        s: [
          232,
          432,
          0
        ],
        to: [
          0,
          0,
          0
        ],
        ti: [
          -8,
          0,
          0
        ]
      },
      {
        t: 359,
        s: [
          280,
          432,
          0
        ]
      }
    ],
    ix: 2
  }
].map((y, i) => ({
  ddd: 0,
  ind: i + 1,
  ty: 4,
  nm: "haze",
  sr: 1,
  ks: {
    o: {
      a: 0,
      k: 100,
      ix: 11
    },
    r: {
      a: 0,
      k: 0,
      ix: 10
    },
    p: y,
    a: {
      a: 0,
      k: [
        0,
        0,
        0
      ],
      ix: 1
    },
    s: {
      a: 0,
      k: [
        100,
        100,
        100
      ],
      ix: 6
    }
  },
  ao: 0,
  shapes: [
    {
      ind: 0,
      ty: "sh",
      ix: 1,
      ks: {
        a: 0,
        k: {
          i: [
            [
              0,
              0
            ],
            [
              0,
              0
            ]
          ],
          o: [
            [
              0,
              0
            ],
            [
              0,
              0
            ]
          ],
          v: [
            [
              -120,
              0
            ],
            [
              120,
              0
            ]
          ],
          c: !1
        },
        ix: 2
      },
      nm: "Path 1",
      mn: "ADBE Vector Shape - Group",
      hd: !1
    },
    x
  ],
  ip: 0,
  op: 360,
  st: 0,
  bm: 0
})), R = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : null;
  return u0(k0("fill", t));
}, I0 = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : null;
  return u0(k0("line", t));
}, S = (x, t) => t ? {
  ty: "st",
  c: {
    a: 0,
    k: t,
    ix: 3
  },
  o: {
    a: 0,
    k: 100,
    ix: 4
  },
  w: {
    a: 0,
    k: 20,
    ix: 5
  },
  lc: 2,
  lj: 1,
  ml: 10,
  bm: 0,
  hd: !1
} : x === "line" ? {
  ty: "st",
  c: {
    a: 0,
    k: [
      0.886274516582,
      0.909803926945,
      0.941176474094,
      1
    ],
    ix: 3
  },
  o: {
    a: 0,
    k: 100,
    ix: 4
  },
  w: {
    a: 0,
    k: 18,
    ix: 5
  },
  lc: 2,
  lj: 1,
  ml: 10,
  bm: 0,
  nm: "Stroke 1",
  mn: "ADBE Vector Graphic - Stroke",
  hd: !1
} : {
  ty: "gs",
  o: {
    a: 0,
    k: 100,
    ix: 9
  },
  w: {
    a: 0,
    k: 24,
    ix: 10
  },
  g: {
    p: 5,
    k: {
      a: 0,
      k: [
        0,
        0.831,
        0.843,
        0.867,
        0.225,
        0.831,
        0.843,
        0.867,
        0.45,
        0.831,
        0.843,
        0.867,
        0.725,
        0.788,
        0.8,
        0.822,
        1,
        0.745,
        0.757,
        0.776
      ],
      ix: 8
    }
  },
  s: {
    a: 0,
    k: [
      -37,
      -63
    ],
    ix: 4
  },
  e: {
    a: 0,
    k: [
      35,
      61.708
    ],
    ix: 5
  },
  t: 1,
  lc: 2,
  lj: 1,
  ml: 10,
  ml2: {
    a: 0,
    k: 10,
    ix: 13
  },
  bm: 0,
  hd: !1
}, d0 = (x) => [
  {
    a: 1,
    k: [
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 0,
        s: [
          232,
          384,
          0
        ],
        to: [
          8,
          0,
          0
        ],
        ti: [
          0,
          0,
          0
        ]
      },
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 180,
        s: [
          280,
          384,
          0
        ],
        to: [
          0,
          0,
          0
        ],
        ti: [
          8,
          0,
          0
        ]
      },
      {
        t: 359,
        s: [
          232,
          384,
          0
        ]
      }
    ],
    ix: 2
  },
  {
    a: 1,
    k: [
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 0,
        s: [
          280,
          432,
          0
        ],
        to: [
          -8,
          0,
          0
        ],
        ti: [
          0,
          0,
          0
        ]
      },
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 180,
        s: [
          232,
          432,
          0
        ],
        to: [
          0,
          0,
          0
        ],
        ti: [
          -8,
          0,
          0
        ]
      },
      {
        t: 359,
        s: [
          280,
          432,
          0
        ]
      }
    ],
    ix: 2
  }
].map((y, i) => ({
  ddd: 0,
  ind: i + 1,
  ty: 4,
  nm: "fog",
  sr: 1,
  ks: {
    o: {
      a: 0,
      k: 100,
      ix: 11
    },
    r: {
      a: 0,
      k: 0,
      ix: 10
    },
    p: y,
    a: {
      a: 0,
      k: [
        0,
        0,
        0
      ],
      ix: 1
    },
    s: {
      a: 0,
      k: [
        100,
        100,
        100
      ],
      ix: 6
    }
  },
  ao: 0,
  shapes: [
    {
      ind: 0,
      ty: "sh",
      ix: 1,
      ks: {
        a: 0,
        k: {
          i: [
            [
              0,
              0
            ],
            [
              0,
              0
            ]
          ],
          o: [
            [
              0,
              0
            ],
            [
              0,
              0
            ]
          ],
          v: [
            [
              -120,
              0
            ],
            [
              120,
              0
            ]
          ],
          c: !1
        },
        ix: 2
      },
      nm: "Path 1",
      mn: "ADBE Vector Shape - Group",
      hd: !1
    },
    x
  ],
  ip: 0,
  op: 360,
  st: 0,
  bm: 0
})), c0 = (x) => [
  {
    a: 1,
    k: [
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 0,
        s: [
          304,
          312,
          0
        ],
        to: [
          0,
          0,
          0
        ],
        ti: [
          0,
          0,
          0
        ]
      },
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 180,
        s: [
          208,
          312,
          0
        ],
        to: [
          0,
          0,
          0
        ],
        ti: [
          0,
          0,
          0
        ]
      },
      {
        t: 359,
        s: [
          304,
          312,
          0
        ]
      }
    ],
    ix: 2
  },
  {
    a: 1,
    k: [
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 0,
        s: [
          256,
          256,
          0
        ],
        to: [
          0,
          0,
          0
        ],
        ti: [
          0,
          0,
          0
        ]
      },
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 90,
        s: [
          208,
          256,
          0
        ],
        to: [
          0,
          0,
          0
        ],
        ti: [
          0,
          0,
          0
        ]
      },
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 270,
        s: [
          304,
          256,
          0
        ],
        to: [
          0,
          0,
          0
        ],
        ti: [
          0,
          0,
          0
        ]
      },
      {
        t: 359,
        s: [
          256,
          256,
          0
        ]
      }
    ],
    ix: 2
  },
  {
    a: 1,
    k: [
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 0,
        s: [
          208,
          200,
          0
        ],
        to: [
          0,
          0,
          0
        ],
        ti: [
          0,
          0,
          0
        ]
      },
      {
        i: {
          x: 0.833,
          y: 0.833
        },
        o: {
          x: 0.167,
          y: 0.167
        },
        t: 180,
        s: [
          304,
          200,
          0
        ],
        to: [
          0,
          0,
          0
        ],
        ti: [
          0,
          0,
          0
        ]
      },
      {
        t: 359,
        s: [
          208,
          200,
          0
        ]
      }
    ],
    ix: 2
  }
].map((y, i) => ({
  ddd: 0,
  ind: i + 1,
  ty: 4,
  nm: "layer",
  sr: 1,
  ks: {
    o: {
      a: 0,
      k: 100,
      ix: 11
    },
    r: {
      a: 0,
      k: 0,
      ix: 10
    },
    p: y,
    a: {
      a: 0,
      k: [
        0,
        0,
        0
      ],
      ix: 1
    },
    s: {
      a: 0,
      k: [
        100,
        100,
        100
      ],
      ix: 6
    }
  },
  ao: 0,
  shapes: [
    {
      ind: 0,
      ty: "sh",
      ix: 1,
      ks: {
        a: 0,
        k: {
          i: [
            [
              0,
              0
            ],
            [
              0,
              0
            ]
          ],
          o: [
            [
              0,
              0
            ],
            [
              0,
              0
            ]
          ],
          v: [
            [
              -120,
              0
            ],
            [
              120,
              0
            ]
          ],
          c: !1
        },
        ix: 2
      },
      nm: "Path 1",
      mn: "ADBE Vector Shape - Group",
      hd: !1
    },
    x
  ],
  ip: 0,
  op: 360,
  st: 0,
  bm: 0
})), K = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : null;
  return c0(S("fill", t));
}, O0 = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : null;
  return c0(S("line", t));
}, N = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : null;
  return d0(S("fill", t));
}, V0 = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : null;
  return d0(S("line", t));
}, m0 = (x) => x ? {
  ty: "fl",
  c: {
    a: 0,
    k: x,
    ix: 3
  },
  o: {
    a: 0,
    k: 100,
    ix: 4
  },
  w: {
    a: 0,
    k: 20,
    ix: 5
  },
  lc: 2,
  lj: 1,
  ml: 10,
  bm: 0,
  hd: !1
} : {
  ty: "gf",
  o: {
    a: 0,
    k: 100,
    ix: 10
  },
  r: 1,
  bm: 0,
  g: {
    p: 5,
    k: {
      a: 0,
      k: [
        0,
        0.992,
        0.902,
        0.541,
        0.225,
        0.992,
        0.902,
        0.541,
        0.45,
        0.992,
        0.902,
        0.541,
        0.725,
        0.992,
        0.892,
        0.492,
        1,
        0.992,
        0.882,
        0.443
      ],
      ix: 9
    }
  },
  s: {
    a: 0,
    k: [-7, -11],
    ix: 5
  },
  e: {
    a: 0,
    k: [5.002, 9.788],
    ix: 6
  },
  t: 1,
  hd: !1
}, U = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : null, y = m0(t), i = [
    [424, 194, 0],
    [364, 194, 0],
    [392, 226, 0],
    [332, 226, 0],
    [360, 262, 0],
    [300, 262, 0],
    [328, 294, 0],
    [268, 294, 0],
    [296, 330, 0],
    [236, 330, 0],
    [264, 362, 0],
    [204, 362, 0]
  ], o = [
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [61]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 15,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 35,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 55,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 75,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 95,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 115,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 135,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 155,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 175,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 195,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 215,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 235,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 255,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 275,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 295,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 315,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 335,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 355,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 359,
          s: [60.526]
        },
        {
          t: 374,
          s: [100]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [74]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 10,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 30,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 50,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 70,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 90,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 110,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 130,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 150,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 170,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 190,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 210,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 230,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 250,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 270,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 290,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 310,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 330,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 350,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 359,
          s: [73.684]
        },
        {
          t: 369,
          s: [100]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [87]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 5,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 25,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 45,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 65,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 85,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 105,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 125,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 145,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 165,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 185,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 205,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 225,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 245,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 265,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 285,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 305,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 325,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 345,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 359,
          s: [86.842]
        },
        {
          t: 364,
          s: [100]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 20,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 40,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 60,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 80,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 100,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 120,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 140,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 160,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 180,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 200,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 220,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 240,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 260,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 280,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 300,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 320,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 340,
          s: [50]
        },
        {
          t: 359,
          s: [100]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [61]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 15,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 35,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 55,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 75,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 95,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 115,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 135,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 155,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 175,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 195,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 215,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 235,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 255,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 275,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 295,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 315,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 335,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 355,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 359,
          s: [60.526]
        },
        {
          t: 374,
          s: [100]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [74]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 10,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 30,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 50,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 70,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 90,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 110,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 130,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 150,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 170,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 190,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 210,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 230,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 250,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 270,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 290,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 310,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 330,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 350,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 359,
          s: [73.684]
        },
        {
          t: 369,
          s: [100]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [87]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 5,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 25,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 45,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 65,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 85,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 105,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 125,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 145,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 165,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 185,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 205,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 225,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 245,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 265,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 285,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 305,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 325,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 345,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 359,
          s: [86.842]
        },
        {
          t: 364,
          s: [100]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 20,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 40,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 60,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 80,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 100,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 120,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 140,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 160,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 180,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 200,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 220,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 240,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 260,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 280,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 300,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 320,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 340,
          s: [50]
        },
        {
          t: 359,
          s: [100]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [61]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 15,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 35,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 55,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 75,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 95,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 115,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 135,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 155,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 175,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 195,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 215,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 235,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 255,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 275,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 295,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 315,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 335,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 355,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 359,
          s: [60.526]
        },
        {
          t: 374,
          s: [100]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [74]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 10,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 30,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 50,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 70,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 90,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 110,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 130,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 150,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 170,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 190,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 210,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 230,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 250,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 270,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 290,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 310,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 330,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 350,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 359,
          s: [73.684]
        },
        {
          t: 369,
          s: [100]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [87]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 5,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 25,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 45,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 65,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 85,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 105,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 125,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 145,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 165,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 185,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 205,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 225,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 245,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 265,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 285,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 305,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 325,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 345,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 359,
          s: [86.842]
        },
        {
          t: 364,
          s: [100]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 20,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 40,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 60,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 80,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 100,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 120,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 140,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 160,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 180,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 200,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 220,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 240,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 260,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 280,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 300,
          s: [50]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 320,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 340,
          s: [50]
        },
        {
          t: 359,
          s: [100]
        }
      ],
      ix: 11
    }
  ];
  return i.map((s, e) => ({
    ddd: 0,
    ind: e + 1,
    ty: 4,
    nm: "dust",
    sr: 1,
    ks: {
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: s,
        ix: 2
      },
      a: {
        a: 0,
        k: [0, 0, 0],
        ix: 1
      },
      s: {
        a: 0,
        k: [100, 100, 100],
        ix: 6
      },
      o: o[e]
    },
    ao: 0,
    shapes: [
      {
        ind: 0,
        ty: "sh",
        ix: 1,
        ks: {
          a: 0,
          k: {
            i: [
              [0, -6.627],
              [6.627, 0],
              [0, 6.627],
              [-6.627, 0]
            ],
            o: [
              [0, 6.627],
              [-6.627, 0],
              [0, -6.627],
              [6.627, 0]
            ],
            v: [
              [12, 0],
              [0, 12],
              [-12, 0],
              [0, -12]
            ],
            c: !0
          },
          ix: 2
        },
        nm: "Path 1",
        mn: "ADBE Vector Shape - Group",
        hd: !1
      },
      y
    ],
    ip: 0,
    op: 360,
    st: 0,
    bm: 0
  }));
}, H = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : null, y = m0(t), i = [
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 5,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 15,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 45,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 55,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 125,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 135,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 165,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 175,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 245,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 255,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 285,
          s: [100]
        },
        {
          t: 295,
          s: [0]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 35,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 45,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 75,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 85,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 155,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 165,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 195,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 205,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 275,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 285,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 315,
          s: [100]
        },
        {
          t: 325,
          s: [0]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 65,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 75,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 105,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 115,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 185,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 195,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 225,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 235,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 305,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 315,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 345,
          s: [100]
        },
        {
          t: 355,
          s: [0]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 10,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 20,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 50,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 60,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 130,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 140,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 170,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 180,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 250,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 260,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 290,
          s: [100]
        },
        {
          t: 300,
          s: [0]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 40,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 50,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 80,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 90,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 160,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 170,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 200,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 210,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 280,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 290,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 320,
          s: [100]
        },
        {
          t: 330,
          s: [0]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 70,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 80,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 110,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 120,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 190,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 200,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 230,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 240,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 310,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 320,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 350,
          s: [100]
        },
        {
          t: 359,
          s: [0]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 0,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 10,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 40,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 50,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 120,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 130,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 160,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 170,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 240,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 250,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 280,
          s: [100]
        },
        {
          t: 290,
          s: [0]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 30,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 40,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 70,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 80,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 150,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 160,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 190,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 200,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 270,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 280,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 310,
          s: [100]
        },
        {
          t: 320,
          s: [0]
        }
      ],
      ix: 11
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 60,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 70,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 100,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 110,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 180,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 190,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 220,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 230,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 300,
          s: [0]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 310,
          s: [100]
        },
        {
          i: {
            x: [0.833],
            y: [0.833]
          },
          o: {
            x: [0.167],
            y: [0.167]
          },
          t: 340,
          s: [100]
        },
        {
          t: 350,
          s: [0]
        }
      ],
      ix: 11
    }
  ], o = [
    {
      a: 1,
      k: [
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 5,
          s: [316, 316, 0],
          to: [8, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 55,
          s: [364, 316, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 125,
          s: [316, 316, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 175,
          s: [364, 316, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 245,
          s: [316, 316, 0],
          to: [0, 0, 0],
          ti: [-8, 0, 0]
        },
        {
          t: 295,
          s: [364, 316, 0]
        }
      ],
      ix: 2
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 35,
          s: [232, 316, 0],
          to: [8, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 85,
          s: [280, 316, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 155,
          s: [232, 316, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 205,
          s: [280, 316, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 275,
          s: [232, 316, 0],
          to: [0, 0, 0],
          ti: [-8, 0, 0]
        },
        {
          t: 325,
          s: [280, 316, 0]
        }
      ],
      ix: 2
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 65,
          s: [158, 316, 0],
          to: [8, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 115,
          s: [206, 316, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 185,
          s: [158, 316, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 235,
          s: [206, 316, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 305,
          s: [158, 316, 0],
          to: [0, 0, 0],
          ti: [-8, 0, 0]
        },
        {
          t: 355,
          s: [206, 316, 0]
        }
      ],
      ix: 2
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 10,
          s: [364, 256, 0],
          to: [8, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 60,
          s: [412, 256, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 130,
          s: [364, 256, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 180,
          s: [412, 256, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 250,
          s: [364, 256, 0],
          to: [0, 0, 0],
          ti: [-8, 0, 0]
        },
        {
          t: 300,
          s: [412, 256, 0]
        }
      ],
      ix: 2
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 40,
          s: [282, 256, 0],
          to: [8, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 90,
          s: [330, 256, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 160,
          s: [282, 256, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 210,
          s: [330, 256, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 280,
          s: [282, 256, 0],
          to: [0, 0, 0],
          ti: [-8, 0, 0]
        },
        {
          t: 330,
          s: [330, 256, 0]
        }
      ],
      ix: 2
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 70,
          s: [198, 256, 0],
          to: [8, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 120,
          s: [246, 256, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 190,
          s: [198, 256, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 240,
          s: [246, 256, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 310,
          s: [198, 256, 0],
          to: [0, 0, 0],
          ti: [-8, 0, 0]
        },
        {
          t: 359,
          s: [246, 256, 0]
        }
      ],
      ix: 2
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 0,
          s: [240, 196, 0],
          to: [8, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 50,
          s: [288, 196, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 120,
          s: [240, 196, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 170,
          s: [288, 196, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 240,
          s: [240, 196, 0],
          to: [0, 0, 0],
          ti: [-8, 0, 0]
        },
        {
          t: 290,
          s: [288, 196, 0]
        }
      ],
      ix: 2
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 30,
          s: [156, 196, 0],
          to: [8, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 80,
          s: [204, 196, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 150,
          s: [156, 196, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 200,
          s: [204, 196, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 270,
          s: [156, 196, 0],
          to: [0, 0, 0],
          ti: [-8, 0, 0]
        },
        {
          t: 320,
          s: [204, 196, 0]
        }
      ],
      ix: 2
    },
    {
      a: 1,
      k: [
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 60,
          s: [72, 196, 0],
          to: [8, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 110,
          s: [120, 196, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 180,
          s: [72, 196, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 230,
          s: [120, 196, 0],
          to: [0, 0, 0],
          ti: [0, 0, 0]
        },
        {
          i: {
            x: 0.833,
            y: 0.833
          },
          o: {
            x: 0.167,
            y: 0.167
          },
          t: 300,
          s: [72, 196, 0],
          to: [0, 0, 0],
          ti: [-8, 0, 0]
        },
        {
          t: 350,
          s: [120, 196, 0]
        }
      ],
      ix: 2
    }
  ];
  return i.map((s, e) => ({
    ddd: 0,
    ind: e + 1,
    ty: 4,
    nm: "dust",
    sr: 1,
    ks: {
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      a: {
        a: 0,
        k: [0, 0, 0],
        ix: 1
      },
      s: {
        a: 0,
        k: [100, 100, 100],
        ix: 6
      },
      o: s,
      p: o[e]
    },
    ao: 0,
    shapes: [
      {
        ind: 0,
        ty: "sh",
        ix: 1,
        ks: {
          a: 0,
          k: {
            i: [
              [0, -6.627],
              [6.627, 0],
              [0, 6.627],
              [-6.627, 0]
            ],
            o: [
              [0, 6.627],
              [-6.627, 0],
              [0, -6.627],
              [6.627, 0]
            ],
            v: [
              [12, 0],
              [0, 12],
              [-12, 0],
              [0, -12]
            ],
            c: !0
          },
          ix: 2
        },
        nm: "Path 1",
        mn: "ADBE Vector Shape - Group",
        hd: !1
      },
      y
    ],
    ip: 0,
    op: 360,
    st: 0,
    bm: 0
  }));
}, J = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : null;
  return f0(h0("fill", t));
}, z0 = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : null;
  return f0(h0("line", t));
}, h0 = (x, t) => t ? {
  ty: "st",
  c: {
    a: 0,
    k: t,
    ix: 3
  },
  o: {
    a: 0,
    k: 100,
    ix: 4
  },
  w: {
    a: 0,
    k: 20,
    ix: 5
  },
  lc: 2,
  lj: 1,
  ml: 10,
  bm: 0,
  hd: !1
} : x === "line" ? {
  ty: "st",
  c: {
    a: 0,
    k: [
      0.886274516582,
      0.909803926945,
      0.941176474094,
      1
    ],
    ix: 3
  },
  o: {
    a: 0,
    k: 100,
    ix: 4
  },
  w: {
    a: 0,
    k: 18,
    ix: 5
  },
  lc: 2,
  lj: 1,
  ml: 10,
  bm: 0,
  d: [
    {
      n: "d",
      nm: "\u865A\u7EBF",
      v: {
        a: 0,
        k: 148,
        ix: 1
      }
    },
    {
      n: "o",
      nm: "\u504F\u79FB",
      v: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 359,
            s: [
              2960
            ]
          }
        ],
        ix: 7
      }
    }
  ],
  hd: !1
} : {
  ty: "gs",
  o: {
    a: 0,
    k: 100,
    ix: 9
  },
  w: {
    a: 0,
    k: 24,
    ix: 10
  },
  g: {
    p: 5,
    k: {
      a: 0,
      k: [
        0,
        0.831,
        0.843,
        0.867,
        0.225,
        0.831,
        0.843,
        0.867,
        0.45,
        0.831,
        0.843,
        0.867,
        0.725,
        0.788,
        0.8,
        0.822,
        1,
        0.745,
        0.757,
        0.776
      ],
      ix: 8
    }
  },
  s: {
    a: 0,
    k: [
      -34.517,
      -46.871
    ],
    ix: 4
  },
  e: {
    a: 0,
    k: [
      51.166,
      101.536
    ],
    ix: 5
  },
  t: 1,
  lc: 2,
  lj: 1,
  ml: 10,
  ml2: {
    a: 0,
    k: 10,
    ix: 13
  },
  bm: 0,
  d: [
    {
      n: "d",
      nm: "dash",
      v: {
        a: 0,
        k: 148,
        ix: 1
      }
    },
    {
      n: "o",
      nm: "offset",
      v: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 359,
            s: [
              2960
            ]
          }
        ],
        ix: 7
      }
    }
  ],
  hd: !1
}, f0 = (x) => {
  const t = [
    [256, 188, 0],
    [198, 324, 0]
  ], y = [
    {
      i: [
        [
          0,
          0
        ],
        [
          -11.333,
          0
        ],
        [
          0,
          -22.091
        ],
        [
          22.091,
          0
        ],
        [
          0,
          0
        ],
        [
          0,
          0
        ]
      ],
      o: [
        [
          7.278,
          -7.573
        ],
        [
          22.091,
          0
        ],
        [
          0,
          22.091
        ],
        [
          0,
          0
        ],
        [
          0,
          0
        ],
        [
          0,
          0
        ]
      ],
      v: [
        [
          93.157,
          -27.714
        ],
        [
          122,
          -40
        ],
        [
          162,
          0
        ],
        [
          122,
          40
        ],
        [
          102,
          40
        ],
        [
          -162,
          40
        ]
      ],
      c: !1
    },
    {
      i: [
        [
          0,
          0
        ],
        [
          -11.333,
          0
        ],
        [
          0,
          22.091
        ],
        [
          22.091,
          0
        ],
        [
          0,
          0
        ],
        [
          0,
          0
        ]
      ],
      o: [
        [
          7.278,
          7.573
        ],
        [
          22.091,
          0
        ],
        [
          0,
          -22.091
        ],
        [
          0,
          0
        ],
        [
          0,
          0
        ],
        [
          0,
          0
        ]
      ],
      v: [
        [
          35.157,
          27.714
        ],
        [
          64,
          40
        ],
        [
          104,
          0
        ],
        [
          64,
          -40
        ],
        [
          44,
          -40
        ],
        [
          -104,
          -40
        ]
      ],
      c: !1
    }
  ];
  return t.map((i, o) => ({
    ddd: 0,
    ind: o + 1,
    ty: 4,
    nm: "blow",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: i,
        ix: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6
      }
    },
    ao: 0,
    shapes: [
      {
        ind: 0,
        ty: "sh",
        ix: 1,
        ks: {
          a: 0,
          k: y[o],
          ix: 2
        },
        hd: !1
      },
      x
    ],
    ip: 0,
    op: 360,
    st: 0,
    bm: 0
  }));
}, Q = (x) => {
  const t = x && n(x) ? [x[0] / 255, x[1] / 255, x[2] / 255, 1] : [0.215686276555, 0.258823543787, 0.317647069693, 1];
  return {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "N/A",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          256,
          266,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ind: 0,
        ty: "sh",
        ix: 1,
        ks: {
          a: 0,
          k: {
            i: [
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ]
            ],
            o: [
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ]
            ],
            v: [
              [
                -81.447,
                8.744
              ],
              [
                -81.447,
                -53.646
              ],
              [
                -53.719,
                -53.646
              ],
              [
                -53.719,
                53.646
              ],
              [
                -81.9,
                53.646
              ],
              [
                -119.119,
                -8.437
              ],
              [
                -119.119,
                53.646
              ],
              [
                -147,
                53.646
              ],
              [
                -147,
                -53.646
              ],
              [
                -119.119,
                -53.646
              ]
            ],
            c: !0
          },
          ix: 2
        },
        hd: !1
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: t,
          ix: 4
        },
        o: {
          a: 0,
          k: 100,
          ix: 5
        },
        r: 1,
        bm: 0,
        hd: !1
      },
      {
        ind: 2,
        ty: "sh",
        ix: 3,
        ks: {
          a: 0,
          k: {
            i: [
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ]
            ],
            o: [
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ]
            ],
            v: [
              [
                -12.582,
                53.646
              ],
              [
                -39.702,
                53.646
              ],
              [
                4.899,
                -53.646
              ],
              [
                32.026,
                -53.646
              ]
            ],
            c: !0
          },
          ix: 2
        },
        hd: !1
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: t,
          ix: 4
        },
        o: {
          a: 0,
          k: 100,
          ix: 5
        },
        r: 1,
        bm: 0,
        hd: !1
      },
      {
        ind: 4,
        ty: "sh",
        ix: 5,
        ks: {
          a: 0,
          k: {
            i: [
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ]
            ],
            o: [
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ]
            ],
            v: [
              [
                86.726,
                0
              ],
              [
                81.9,
                14.618
              ],
              [
                104.655,
                14.618
              ],
              [
                99.835,
                0
              ],
              [
                93.201,
                -22.454
              ]
            ],
            c: !0
          },
          ix: 2
        },
        hd: !1
      },
      {
        ind: 5,
        ty: "sh",
        ix: 6,
        ks: {
          a: 0,
          k: {
            i: [
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ]
            ],
            o: [
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ],
              [
                0,
                0
              ]
            ],
            v: [
              [
                147,
                53.646
              ],
              [
                117.311,
                53.646
              ],
              [
                111.283,
                35.263
              ],
              [
                75.119,
                35.263
              ],
              [
                69.091,
                53.646
              ],
              [
                39.555,
                53.646
              ],
              [
                78.736,
                -53.646
              ],
              [
                108.426,
                -53.646
              ]
            ],
            c: !0
          },
          ix: 2
        },
        hd: !1
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: t,
          ix: 4
        },
        o: {
          a: 0,
          k: 100,
          ix: 5
        },
        r: 1,
        bm: 0,
        hd: !1
      }
    ],
    ip: 0,
    op: 360,
    st: 0,
    ct: 1,
    bm: 0
  };
}, a = (x) => ({
  v: "5.9.6",
  meta: {
    g: "LottieFiles AE 1.0.0",
    a: "Bas Milius",
    k: "Meteocons, Weather icons, Icon set",
    d: "Rain - Meteocons.com",
    tc: ""
  },
  fr: 60,
  ip: 0,
  op: 360,
  w: 512,
  h: 512,
  nm: "\u6A21\u677F",
  ddd: 0,
  assets: [],
  layers: [...x],
  markers: []
}), l = {
  d00: (x) => {
    if (k(x)) {
      const { sun: t, type: y } = x;
      return a([...(y === "line" ? B0 : P)(t)]);
    } else
      return a([...P()]);
  },
  n00: (x) => {
    if (k(x)) {
      const { moon: t, star: y, type: i } = x;
      return a([...(i === "line" ? A0 : I)(t, y)]);
    } else
      return a([...I()]);
  },
  d01: (x) => {
    if (k(x)) {
      const { light: t, dark: y, sun: i, type: o } = x, s = o === "line" ? A : C, e = o === "line" ? E0 : q;
      return a([...s(t, y), ...e(i)]);
    } else
      return a([...C(), ...q()]);
  },
  n01: (x) => {
    if (k(x)) {
      const { light: t, dark: y, moon: i, type: o } = x, s = o === "line" ? A : C, e = o === "line" ? M0 : O;
      return a([...s(t, y), ...e(i)]);
    } else
      return a([...C(), ...O()]);
  },
  "02": (x) => {
    if (k(x)) {
      const { light: t, dark: y, type: i } = x;
      return a([...(i === "line" ? A : C)(t, y)]);
    } else
      return a([...C()]);
  },
  "07": (x) => {
    if (k(x)) {
      const { rain: t, cloud: y, type: i } = x, o = i === "line" ? f : r;
      return a([...m("small", t), ...o(y)]);
    } else
      return a([...m("small"), ...r()]);
  },
  "03": (x) => {
    if (k(x)) {
      const { rain: t, cloud: y, type: i } = x, o = i === "line" ? f : r;
      return a([...m("medium", t), ...o(y)]);
    } else
      return a([...m("medium"), ...r()]);
  },
  "09": (x) => {
    if (k(x)) {
      const { rain: t, cloud: y, type: i } = x, o = i === "line" ? f : r;
      return a([...m("heavy", t), ...o(y)]);
    } else
      return a([...m("heavy"), ...r()]);
  },
  14: (x) => {
    if (k(x)) {
      const { snow: t, cloud: y, type: i } = x, o = i === "line" ? f : r;
      return a([...F("small", t), ...o(y)]);
    } else
      return a([...F("small"), ...r()]);
  },
  13: (x) => {
    if (k(x)) {
      const { snow: t, cloud: y, type: i } = x, o = i === "line" ? f : r;
      return a([...F("medium", t), ...o(y)]);
    } else
      return a([...F("medium"), ...r()]);
  },
  16: (x) => {
    if (k(x)) {
      const { snow: t, cloud: y, type: i } = x, o = i === "line" ? f : r;
      return a([...F("heavy", t), ...o(y)]);
    } else
      return a([...F("heavy"), ...r()]);
  },
  "06": (x) => {
    if (k(x)) {
      const { cloud: t, rain: y, snow: i, type: o } = x, s = o === "line" ? f : r;
      return a([...m("medium", y), ...F("medium", i), ...s(t)]);
    } else
      return a([...m("medium"), ...F("medium"), ...r()]);
  },
  "04": (x) => {
    if (k(x)) {
      const { cloud: t, rain: y, lightning: i, type: o } = x, s = o === "line" ? f : r;
      return a([D(i), ...m("medium", y), ...s(t)]);
    } else
      return a([D(), ...m("medium"), ...r()]);
  },
  "05": (x) => {
    if (k(x)) {
      const { cloud: t, rain: y, lightning: i, hail: o, type: s } = x, e = s === "line" ? f : r;
      return a([...m("medium", y), ...z(o), D(i), ...e(t)]);
    } else
      return a([...m("medium"), ...z(), D(), ...r()]);
  },
  18: (x) => {
    if (k(x)) {
      const { fog: t, cloud: y, type: i } = x, o = i === "line" ? V0 : N, s = i === "line" ? f : r;
      return a([...o(t), ...s(y)]);
    } else
      return a([...N(), ...r()]);
  },
  32: (x) => {
    if (k(x)) {
      const { fog: t, type: y } = x;
      return a([...(y === "line" ? O0 : K)(t)]);
    } else
      return a([...K()]);
  },
  53: (x) => {
    if (k(x)) {
      const { haze: t, cloud: y, type: i } = x, o = i === "line" ? I0 : R, s = i === "line" ? f : r;
      return a([...o(t), ...s(y)]);
    } else
      return a([...R(), ...r()]);
  },
  29: (x) => {
    if (k(x)) {
      const { dust: t, cloud: y, type: i } = x, o = i === "line" ? $0 : V;
      return a([...U(t), ...o(y)]);
    } else
      return a([...U(), ...V()]);
  },
  20: (x) => {
    if (k(x)) {
      const { wind: t, dust: y, type: i } = x, o = i === "line" ? z0 : J;
      return a([...H(y), ...o(t)]);
    } else
      return a([...H(), ...J()]);
  },
  99: (x) => {
    if (k(x)) {
      const { text: t } = x;
      return a([Q(t)]);
    } else
      return a([Q()]);
  },
  "08": (x) => l["03"](x),
  10: (x) => l["09"](x),
  11: (x) => l["09"](x),
  12: (x) => l["09"](x),
  15: (x) => l[13](x),
  17: (x) => l[16](x),
  19: (x) => l["03"](x),
  21: (x) => l["07"](x),
  22: (x) => l["03"](x),
  23: (x) => l["09"](x),
  24: (x) => l["09"](x),
  25: (x) => l["09"](x),
  26: (x) => l[14](x),
  27: (x) => l[13](x),
  28: (x) => l[16](x),
  30: (x) => l[20](x),
  31: (x) => l[20](x),
  49: (x) => l[32](x),
  54: (x) => l[53](x),
  55: (x) => l[53](x),
  56: (x) => l[53](x),
  57: (x) => l[32](x),
  58: (x) => l[32](x),
  d301: (x) => l["03"](x),
  d302: (x) => l[13](x)
}, R0 = ["id"], K0 = /* @__PURE__ */ X({
  __name: "vMiniWeatherIcon",
  props: {
    icon: {
      type: String,
      default: "d00"
    },
    type: {
      type: String,
      default: "fill"
    }
  },
  setup(x) {
    const t = x, y = w(""), i = w(null), o = () => {
      let s = "";
      i.value && i.value.destroy(), t.icon in l ? s = t.icon : (/^\d+$/.test(t.icon) && (s = "d" + t.icon), /^[dn]\d+$/.test(t.icon) && (s = t.icon.slice(1))), s in l || (s = "99"), i.value = _0.loadAnimation({
        container: document.getElementById(y.value),
        renderer: "svg",
        loop: !0,
        autoplay: !0,
        animationData: l[s]({ type: t.type })
      });
    };
    return Y(() => {
      const e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
      let g = "";
      for (let p = 0; p < 16; p++)
        g += e[Math.round(Math.random() * e.length)];
      y.value = `v-mini-weather-icon-${g}`;
    }), v0(() => {
      o();
    }), Z(() => {
      i.value && i.value.destroy();
    }), (s, e) => F0((M(), W("div", {
      id: y.value,
      class: "v-mini-weather-icon"
    }, null, 8, R0)), [
      [w0, x.icon]
    ]);
  }
}), J0 = (x) => {
  x.component("vMiniWeather", D0), x.component("vMiniWeatherIcon", K0);
};
console.log("weather install ts...");
export {
  J0 as default,
  D0 as vMiniWeather,
  K0 as vMiniWeatherIcon
};
