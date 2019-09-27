import React from 'react';
// @ts-ignore
import G6 from '@antv/g6';
import { RuleContext } from 'antlr4ts';

let graph: G6.TreeGraph;

class TreeGraph extends React.Component<{
  context: RuleContext | null;
  ruleNames: string[];
  onGraphCreated:(graph: G6.TreeGraph) => void;
}> {
  public componentDidMount() {
    graph = new G6.TreeGraph({
      container: 'mountNode',
      renderer: 'svg',
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: 2,
      defaultNode: {
        size: 0,
        anchorPoints: [[0, 0.5], [1, 0.5]]
      },
      defaultEdge: {
        shape: 'cubic-horizontal'
      },
      edgeStyle: {
        default: {
          stroke: '#A3B1BF'
        }
      },
      layout: {
        type: 'compactBox',
        direction: 'V',
        getHeight: () => 16,
        getWidth: () => 16,
        getVGap: () => 30,
        getHGap: () => 100,
      }
    });
    
    graph.node((rule: RuleContext) => {
      return {
        style: {
          fill: 'none',
          stroke: 'none'
        },
        label: this.getContextLabel(rule),
        labelCfg: {
          position: 'center',
          style: {
            fontSize: 20
          }
        }
      };
    });

    this.props.onGraphCreated(graph);
  }

  public render() {
    if (this.props.context) {
      graph.data(this.props.context);
      graph.render();
      graph.fitView();
    }

    return (
      <div id="mountNode" />
    );
  }

  private getContextLabel(rule: RuleContext): string {
    return this.props.ruleNames[rule.ruleIndex] || rule.text;
  }
}

export default TreeGraph
