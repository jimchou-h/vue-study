<script lang="ts" name="d3-index">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import * as d3 from 'd3'

export default defineComponent({
  name: 'ForceGraph',
  setup() {
    let svg: any = null
    let nodes: any = null
    let links: any = null
    let simulation: any = null

    const data = {
      nodes: [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }],
      links: [
        { source: 'A', target: 'B' },
        { source: 'B', target: 'C' },
        { source: 'C', target: 'D' },
        { source: 'D', target: 'E' },
      ],
    }

    const width = 600
    const height = 400

    const createGraph = () => {
      svg = d3.select('#chart').append('svg').attr('width', width).attr('height', height)

      links = svg
        .append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(data.links)
        .enter()
        .append('line')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 1)

      nodes = svg
        .append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(data.nodes)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('fill', '#69b3a2')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)

      simulation = d3
        .forceSimulation(data.nodes as any)
        .force(
          'link',
          d3
            .forceLink()
            .links(data.links)
            .id((d: any) => d.id)
        )
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2))

      simulation.on('tick', () => {
        links
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y)

        nodes.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
      })
    }

    onMounted(() => {
      createGraph()
    })

    onUnmounted(() => {
      simulation.stop()
    })

    return {
      svg,
    }
  },
})
</script>

<template>
  <div id="chart"></div>
</template>

<style scoped>
.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>
