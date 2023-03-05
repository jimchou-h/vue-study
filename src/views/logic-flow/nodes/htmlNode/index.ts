import { createApp } from 'vue'
import { HtmlNodeModel, HtmlNode } from '@logicflow/core'
import HtmlNodeComp from './html-node-comp.vue'

const htmlStyle = `
  width: 100%;
  height: 100%;
  border: 1px solid #bbb;
`

class TestHtmlNodeModel extends HtmlNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data)
  }
  setAttributes() {
    const width = 100
    const height = 100
    this.width = width
    this.height = height
  }
}
class TestHtmlNode extends HtmlNode {
  setHtml(rootEl: HTMLElement) {
    rootEl.innerHTML = ''
    const app = createApp(HtmlNodeComp)
    const div = document.createElement('div')
    app.mount(div)
    rootEl.appendChild(div)
  }
}

const htmlNodeBox = {
  type: 'htmlNode',
  view: TestHtmlNode,
  model: TestHtmlNodeModel,
}

export default htmlNodeBox
