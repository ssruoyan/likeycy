import Taro, { Component } from '@tarojs/taro'
import { Canvas } from '@tarojs/components'

class IndexGraph extends Component {
    canvas: any
    
    componentDidMount() {
        this.canvas = Taro.createCanvasContext('index-graph', this)


        console.log(this.canvas)
    }

    render() {
        return <Canvas style="width: 654px; height: 306px" canvasId="index-graph" />   
    }
}

export default IndexGraph