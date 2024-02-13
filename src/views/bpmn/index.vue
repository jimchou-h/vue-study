<script lang="ts" setup name="bpmn-index">
import { ref, onMounted } from 'vue'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import '@bpmn-io/properties-panel/assets/properties-panel.css'

const xmlRef = ref(`<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_0ausrna" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="16.4.0">
  <bpmn:process id="Process_0a4swh0" isExecutable="false">
    <bpmn:startEvent id="StartEvent_0wa3r46" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0a4swh0">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_0wa3r46">
        <dc:Bounds x="156" y="82" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`)

onMounted(async () => {
  const viewer = new BpmnModeler({
    container: '#js-canvas',
    propertiesPanel: {
      parent: '#js-properties-panel',
    },
    additionalModules: [BpmnPropertiesPanelModule, BpmnPropertiesProviderModule],
    height: 600,
  })
  const { warnings } = await viewer.importXML(xmlRef.value)
})
</script>

<template>
  <div>
    <div id="js-drop-zone" class="content with-diagram">
      <div class="message intro">
        <div class="note">
          Drop BPMN diagram from your desktop or
          <a id="js-create-diagram" href>create a new diagram</a> to get started.
        </div>
      </div>

      <div class="message error">
        <div class="note">
          <p>Ooops, we could not display the BPMN 2.0 diagram.</p>

          <div class="details">
            <span>Import Error Details</span>
            <pre></pre>
          </div>
        </div>
      </div>

      <div id="js-canvas" class="canvas"></div>
      <div id="js-properties-panel" class="properties-panel-parent"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

#js-properties-panel {
  width: 400px;
}

a:link {
  text-decoration: none;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;

  > .message {
    width: 100%;
    height: 100%;
    text-align: center;
    display: table;

    font-size: 16px;
    color: #111;

    .note {
      vertical-align: middle;
      text-align: center;
      display: table-cell;
    }

    &.error {
      .details {
        max-width: 500px;
        font-size: 12px;
        margin: 20px auto;
        text-align: left;
        color: #bd2828;
      }

      pre {
        border: solid 1px #bd2828;
        background: #fefafa;
        padding: 10px;
        color: #bd2828;
      }
    }
  }
  &:not(.with-error) .error,
  &.with-error .intro,
  &.with-diagram .intro {
    display: none;
  }

  .canvas {
    width: 100%;
  }

  .canvas,
  .properties-panel-parent {
    display: none;
  }

  &.with-diagram {
    .canvas,
    .properties-panel-parent {
      display: block;
    }
  }
}

.buttons {
  position: fixed;
  bottom: 20px;
  left: 20px;

  padding: 0;
  margin: 0;
  list-style: none;

  > li {
    display: inline-block;
    margin-right: 10px;

    > a {
      background: #ddd;
      border: solid 1px #666;
      display: inline-block;
      padding: 5px;
    }
  }

  a {
    opacity: 0.3;
  }

  a.active {
    opacity: 1;
  }
}

.properties-panel-parent {
  border-left: 1px solid #ccc;
  overflow: auto;
  &:empty {
    display: none;
  }
  > .djs-properties-panel {
    padding-bottom: 70px;
    min-height: 100%;
  }
}
</style>
