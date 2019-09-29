import React from 'react';
import { Input, Button, Form, Select, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
// @ts-ignore
import G6 from '@antv/g6';
import { RuleContext } from 'antlr4ts';
import languages, { ILanguage } from '@/languages';
import TreeGraph from './TreeGraph';
import { parse } from '../utils';
import styles from './index.css';

const { TextArea } = Input;
const { Option } = Select;

const defaultLanguage = languages[0];
let graph: G6.TreeGraph;

class Display extends React.Component<FormComponentProps, {
  context: RuleContext | null;
  ruleNames: string[];
}> {
  readonly state = {
    context: null,
    ruleNames: [],
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const targetLanguage = languages.find((l: ILanguage) => l.displayName === values.language);
        if (targetLanguage) {
          const { lexer: lexerClazz, parser: parserClazz, entry } = targetLanguage;

          try {
            const { parser, context } = parse(values.text, lexerClazz, parserClazz, values.entry || entry);
            this.setState({
              context,
              ruleNames: parser.ruleNames,
            });
          } catch (e) {
            message.error(e.message);
          }
        }
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
            initialValue: defaultLanguage.displayName,
          })(
            <Select>
              {languages.map(l => <Option key={l.displayName} value={l.displayName}>{l.displayName}</Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Entry rule">
          {getFieldDecorator('entry', {
            initialValue: defaultLanguage.entry,
          })(<Input />)}
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
      <TreeGraph
        context={this.state.context}
        ruleNames={this.state.ruleNames}
        onGraphCreated={this.handleGraphCreatd}
      />
    </>
    );
  }
}

export default Form.create()(Display);
