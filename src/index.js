import React, { Component } from 'react'
import classnames from 'classnames'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'
import PropTypes from 'prop-types'

import styles from './styles.less'
const requestPrefix = 'https://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/children';

import BJData from "./BJData";
import DLData from "./DLData";
// import geoCoordMap from "./geoCoordMap";
let geoCoordMap = {};

var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name].geo;
        var toCoord = geoCoordMap[dataItem[1].name].geo;
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
            });
        }
    }
    return res;
};

var getSeries = function(data, clickMapId, geoData){
  console.log("geoData", geoData);
  var color = ['#a6c84c', '#ffa022', '#46bee9'];
var series = [];
[['北京市', data]].forEach(function (item, i) {
  console.log(" getSeries item", item);
  if(clickMapId != "1"){
    series.push(
      {
          name: '调研路线',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
              brushType: 'stroke'
          },
          label: {
              show: true,
              position: 'right',
              formatter: '{b}'
          },
          symbolSize: function (val) {
              return val[2]/5 ;
          },
          itemStyle: {
              color: color[i]
          },
          data: item[1].map(function (dataItem) {
            console.log(" getSeries dataItem", dataItem);
              return {
                  name: dataItem[1].name.concat(dataItem[1].value),
                  value: geoCoordMap[dataItem[1].name].geo.concat([dataItem[1].value])
              };
          })
      }
      );
  }else{
    series.push(
          {
            tooltip: {
              formatter: '{b}',
            },
          name: '调研路线',
          type: 'lines',
          zlevel: 1,
  
          effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: '#fff',
              symbolSize: 3
          },
          lineStyle: {
              normal: {
                  color: color[i],
                  width: 0,
                  curveness: 0.2
              }
          },
          data: convertData(item[1])
      },
      {
        tooltip: {
          formatter: '{b}',
        },
          name: '调研路线',
          type: 'lines',
          zlevel: 2,
          symbol: ['none', 'arrow'],
          symbolSize: 10,
          effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 15
          },
          lineStyle: {
              color: color[i],
              width: 1,
              opacity: 0.6,
              curveness: 0.2
          },
          data: convertData(item[1])
      },
      {
          name: '调研路线',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
              brushType: 'stroke'
          },
          label: {
              show: false,
              position: 'right',
              formatter: '{b}'
          },
          symbolSize: function (val) {
              return val[2]/5 ;
          },
          itemStyle: {
              color: color[i]
          },
          tooltip: {
            formatter: '{b}',
          },
 
          
          data: item[1].map(function (dataItem) {
            console.log("value:", dataItem[1].name, geoCoordMap[dataItem[1].name].geo.concat([dataItem[1].value]));
              return {
                // name : dataItem[1].value,
                // value: dataItem[1].value
                  name: dataItem[1].name.concat(dataItem[1].value + '次'),
                  value: geoCoordMap[dataItem[1].name].geo.concat([dataItem[1].value]),
                  info: dataItem[1].name +":"+ dataItem[1].value
              };
          })
      }
      );
  }
    // series.push(
    // // {
    // //     type: 'map',
    // //     // map: clickMapId,
    // //     // layoutCenter: ['50%', '50%'],
    // //     // zoom: 1.2,
    // //     // data: []
    // //     label: {
    // //       show: false
    // //   },
    // //   map: clickMapId,
    // //   layoutCenter: ['50%', '50%'],
    // //   zoom: 1.2,
    // //     roam: true,
    // //     itemStyle: {
    // //         areaColor: '#1b1b1b',
    // //         borderColor: 'rgba(100,149,237,1)'

    // //     },
    // //     emphasis: {
    // //         label: {
    // //             show: true
    // //         },
    // //         itemStyle: {
    // //             areaColor: '#2a333d'
    // //         }
    // //     },
    // //      data: geoData.features.map((item) => {
    // //       return {
    // //         // selected: item.properties.name === this.props.defaultSelectedAreaName,
    // //         name: item.properties.name,
    // //         id: item.properties.id || item.properties.adcode,
    // //         lastLevel: item.properties.childrenNum === 0
    // //       }
    // //     })
    // //   },
    //     {
    //     name: '调研路线',
    //     type: 'lines',
    //     zlevel: 1,

    //     effect: {
    //         show: true,
    //         period: 6,
    //         trailLength: 0.7,
    //         color: '#fff',
    //         symbolSize: 3
    //     },
    //     lineStyle: {
    //         normal: {
    //             color: color[i],
    //             width: 0,
    //             curveness: 0.2
    //         }
    //     },
    //     data: convertData(item[1])
    // },
    // {
    //     name: '调研路线',
    //     type: 'lines',
    //     zlevel: 2,
    //     symbol: ['none', 'arrow'],
    //     symbolSize: 10,
    //     effect: {
    //         show: true,
    //         period: 6,
    //         trailLength: 0,
    //         symbol: planePath,
    //         symbolSize: 15
    //     },
    //     lineStyle: {
    //         color: color[i],
    //         width: 1,
    //         opacity: 0.6,
    //         curveness: 0.2
    //     },
    //     data: convertData(item[1])
    // },
    // {
    //     name: '调研路线',
    //     type: 'effectScatter',
    //     coordinateSystem: 'geo',
    //     zlevel: 2,
    //     rippleEffect: {
    //         brushType: 'stroke'
    //     },
    //     label: {
    //         show: true,
    //         position: 'right',
    //         formatter: '{b}'
    //     },
    //     symbolSize: function (val) {
    //         return val[2]/5 ;
    //     },
    //     itemStyle: {
    //         color: color[i]
    //     },
    //     data: item[1].map(function (dataItem) {
    //         return {
    //             name: dataItem[1].name.concat(dataItem[1].value + '次'),
    //             value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
    //         };
    //     })
    // }
    // );
    debugger
});
return series;
}

export default class ChinaMap extends Component {
  static propTypes = {
    onChange: PropTypes.func, // 点击地图区域时的回调函数
    extraOption: PropTypes.object,
    style: PropTypes.object,
    defaultSelectedAreaName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    echartsClassName: PropTypes.string,
    showCallbackBtn: PropTypes.bool,
    showTips: PropTypes.bool,
    isShowIsland: PropTypes.bool
  }
  static defaultProps = {
    defaultSelectedAreaName: '',
    onChange: () => {},
    extraOption: {},
    style: {},
    wrapperClassName: '',
    echartsClassName: '',
    showCallbackBtn: true,
    showTips: true,
    isShowIsland: true
  }
  constructor(props) {
    super(props)
    this.state = {
      toastVisible: false,
      mapData: {},
      mapObject: {},
      clickItemName: [],
      clickId: '1',
      clickItemArray: []
    }
  }
  componentDidMount() {
    this.getData()
  }
  createMapOption = (data, clickMapId) => {
    console.log("clickMapId", clickMapId)
    // const defaultMapObject = {
    //   series: [
    //   {
    //     type: 'map',
    //     map: clickMapId,
    //     layoutCenter: ['50%', '50%'],
    //     zoom: 1.2,
    //     data: data.features.map((item) => {
    //       return {
    //         selected: item.properties.name === this.props.defaultSelectedAreaName,
    //         name: item.properties.name,
    //         id: item.properties.id || item.properties.adcode,
    //         lastLevel: item.properties.childrenNum === 0
    //       }
    //     })
    //   }
    // ]
    // };
    // this.nameMapper = {};
    // data.features.forEach( item => {
    //   this.nameMapper[item.properties.name] = item.properties.adcode;
    // });
    geoCoordMap = {};
    data.features.forEach( item => {
      geoCoordMap[item.properties.name] ={
        geo: item.properties.center,
        adcode: item.properties.adcode
      } 
    });
    let valueData = data.features.map((item) => {
          return [{name:'北京市'}, {name:item.properties.name,value:parseInt((Math.random() * 100).toFixed())}];
        })
    let series = [];
    
    if(clickMapId == "1"){ 
       series = getSeries(valueData, clickMapId, data);
    }else{
       series = getSeries(valueData, clickMapId, data);
    }
    
    let mapObject = {
      dataRange: {
          min : 0,
          max : 100,
          calculable : true,
          color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
          textStyle:{
              color:'#fff'
          }
      },
      backgroundColor: '#1B1B1B',
      title : {
          text: '模拟迁徙',
          subtext: '数据纯属虚构',
          left: 'center',
          textStyle: {
              color: '#fff'
          }
      },
      tooltip:{trigger:"item"},
      geo: {
          map: 'china',
          label: {
              show: false
          },
        map: clickMapId,
        id: clickMapId,
        layoutCenter: ['50%', '50%'],
        zoom: 1.2,
          roam: true,
          itemStyle: {
              areaColor: '#1b1b1b',
              borderColor: 'rgba(100,149,237,1)'
  
          },
          emphasis: {
              label: {
                  show: true
              },
              itemStyle: {
                  areaColor: '#2a333d'
              }
          }
      },
      series: series
  }
    // const mapObject = Object.assign(defaultMapObject, this.props.extraOption);
    console.log("mapObject", mapObject);
    echarts.registerMap(clickMapId, data);
    this.state.clickItemArray.push(mapObject)
    this.setState({mapData: data, clickId: clickMapId, mapObject});
  }
  getData = (id) => {
    // 没id，说明是初始化中国地图
    if (!id) {
      if (this.props.isShowIsland) {
        window.fetch(`${requestPrefix}/100000.json`).then((data) => {
          return data.text();
        }).then((res) => {
          const data = JSON.parse(res);
          // 显示南海岛屿及轮廓线
          this.createMapOption(data, 'china');
        });
      } else {
        window.fetch('./noIslandJson.json').then((data) => {
          return data.json();
        }).then((res) => {
          // 不显示南海岛屿及轮廓线
          console.log(res)
          this.createMapOption(res, '1');
        });
      }
    } else {
      window.fetch(`${requestPrefix}/${id}.json`).then((data) => {
        return data.text();
      }).then((res) => {
        const data = JSON.parse(res);
        this.createMapOption(data, id);
      });
    }
  };
  clickMap = (params) => {
    console.log("clickMap: ", params);
    // lastLevel 为true 说明是最后一级了
    if (params && params.name) {
      // const {data: {name, id, lastLevel}} = params;
      let name = params.name;
      console.log(geoCoordMap, name, geoCoordMap[name])
      let id = geoCoordMap[name].adcode;
      let lastLevel = false;
      if (!lastLevel) {
        this.getData(id);
        const len = this.state.clickItemName.length;
        if (len < 2) {
          this.state.clickItemName.push(name);
        } else {
          this.state.clickItemName[1] = name;
        }
        this.props.onChange(this.state.clickItemName);
      } else {
        this.setState({toastVisible: true}, () => {
          setTimeout(() => {
            this.setState({toastVisible: false});
          }, 1000);
        });
      }
    }
  };
  goBack = () => {
    this.state.clickItemArray.pop();
    this.state.clickItemName.pop();
    const mapObject = this.state.clickItemArray[this.state.clickItemArray.length - 1];
    this.setState({mapObject});
    this.props.onChange(this.state.clickItemName);
  }
  render() {
    const {
      clickItemArray,
      toastVisible,
      mapObject
    } = this.state;
    console.log("render id: ",  mapObject);
    let id = mapObject.geo&&mapObject.geo.id;
    console.log("render id: ", id, mapObject);
    const {
      style,
      wrapperClassName,
      echartsClassName,
      showCallbackBtn,
      showTips
    } = this.props;
    const echartsMapWrapperCls = classnames(styles.echartsMapWrapper, wrapperClassName);
    const echartsCls = classnames(styles.echartsWrapper, echartsClassName);
    const onEvents = {
      click: this.clickMap,
    };
    return (
      <div className={echartsMapWrapperCls} style={style}>
        {
          (id == "1") && <ReactEcharts className={echartsCls} onEvents={onEvents} option={this.state.mapObject} notMerge={true} />
        }
        {
          (id != "1") && <ReactEcharts className={echartsCls} onEvents={onEvents} option={this.state.mapObject} notMerge={true} />
        }
        {showTips && toastVisible ? <div className={styles.toast}>暂无下一级数据</div> : null}
        {showCallbackBtn && clickItemArray.length !== 1 ? (
          <div onClick={this.goBack} className={styles.goback}>返回</div>
        ) : null}
      </div>
    );
  }
}
