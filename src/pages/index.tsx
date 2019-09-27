import React from 'react';
import { Input, Button, Form, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
// @ts-ignore
import G6 from '@antv/g6';
import { MySqlLexer } from '@/languages/MySqlLexer';
import { MySqlParser } from '@/languages/MySqlParser';
import { RuleContext } from 'antlr4ts';
import TreeGraph from './TreeGraph';
import { parse } from '../utils';
import styles from './index.css';

const { TextArea } = Input;
const { Option } = Select;

let graph: G6.TreeGraph;

class Display extends React.Component<FormComponentProps, {
  context: RuleContext | null;
}> {
  readonly state = {
    context: null
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          context: parse(values.text, MySqlLexer, MySqlParser, 'sqlStatement'),
        });
      }
    });
  }

  handleGraphCreatd = (g: G6.TreeGraph) => {
    graph = g;
  }

  handleExportImage = () => {
    if (graph) {
      graph.downloadImage();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 18,
          offset: 6,
        },
      },
    };

    return (
    <>
      <Form {...formItemLayout} className={styles.form} onSubmit={this.handleSubmit}>
        <Form.Item label="Choose language">
          {getFieldDecorator('language', {
            initialValue: 'MySQL'
          })(
            <Select>
              <Option value="MySQL">MySQL</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Raw text">
          {getFieldDecorator('text', {
            initialValue: 'SELECT * FROM myTable;',
          })(<TextArea />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Display
          </Button>
          <Button onClick={this.handleExportImage}>
          Export as SVG
          </Button>
        </Form.Item>
      </Form>
      <TreeGraph context={this.state.context} onGraphCreated={this.handleGraphCreatd}/>
    </>
    );
  }
}

export default Form.create()(Display);
