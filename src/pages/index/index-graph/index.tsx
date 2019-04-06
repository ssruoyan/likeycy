import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import F2 from "@antv/wx-f2";

import "./index.less";

interface IndexGraph {
  props: {
    data: any[]
  }
}

class IndexGraph extends Component {
  chart: any;
  constructor(...props) {
    super(...props)
  }
  initChart = (canvas, width, height) => {
    const data = [0, 0, 0, 0, 0, 0, 0].map((score, idx) => {
      return {  
        score,
        day: idx + 1
      }
    })
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data);

    chart.scale({
        day: {
            range: [0, 0.92]
        },
        score: {
            range: [0, 1]
        }
    })
    chart.axis("score", {
      label: null,
      grid: null,
      line: null,
      tickLine: null
    });
    chart.axis("day", {
      label: null,
      grid: null,
      line: null,
      tickLine: null
    });
    chart.tooltip({
      showCrosshairs: true,
      showItemMarker: false,
      snap: true,
      background: {
        radius: 6,
        fill: "#FFFFFF",
        padding: [3, 6]
      },
      tooltipMarkerStyle: {
          fill: '#FFFFFF',
          stroke: '#FFFFFF',
          width: 10,
          height: 10
      },
      crosshairsStyle: {
        stroke: '#BF5FC1',
        strokeDashArray: '0 3',
        lineWidth: 1
      },
      valueStyle: {
        fill: "#291441",
        fontSize: 12,
        fontWeight: "bold"
      },
      onShow(ev) {
        var items = ev.items;

        items[0].name = null;
        items[0].value = items[0].value;
      }
    });
    chart
      .area()
      .position(["day", "score"])
      .color("l(0) 0:#C060C2 1:#5A63FB")
      .shape("smooth");
    chart
      .line()
      .style({
        lineWidth: 3
      })
      .position(["day", "score"])
      .color("l(0) 0:#C060C2 1:#5A63FB")
      .shape("smooth");

    chart.render();
    const lastData = data[data.length - 1];
    const point = chart.getPosition(lastData);

    chart.showTooltip(point);

    return chart;
  };
  state = {
    opts: {
      onInit: this.initChart
    }
  };
  config = {
    usingComponents: {
      "ff-canvas": "../../../components/f2-canvas/f2-canvas"
    }
  };
  componentDidMount() {
    const ref = this.$scope.selectComponent('#canvas')

    setTimeout(() => {
      ref.chart.changeData(this.props.data.map((score, idx) => {
        return {  
          score,
          day: idx + 1
        }
      }))
    }, 100)
  }
  componentWillReceiveProps(nextProps) {
    const ref = this.$scope.selectComponent('#canvas')
    setTimeout(() => {
      ref.chart.changeData(nextProps.data.map((score, idx) => {
        return {  
          score,
          day: idx + 1
        }
      }))
    }, 100)
  }
  render() {
    const { opts } = this.state;

    return (
      <View className="index-graph">
        <ff-canvas opts={opts} id="canvas" canvasId="canvasId" />
      </View>
    );
  }
}

export default IndexGraph;
