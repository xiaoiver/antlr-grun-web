import { Lexer } from 'antlr4ts/Lexer';
import { Parser } from 'antlr4ts/Parser';

import { MySqlLexer } from './mysql/MySqlLexer';
import { MySqlParser } from './mysql/MySqlParser';

export interface ILanguage {
  /**
   * display name in Select component
   */
  displayName: string;
  lexer: (new (...args: any[]) => Lexer),
  parser: (new (...args: any[]) => Parser),
  /**
   * entry rule defined in parser
   */
  entry: string;
}

const languages: ILanguage[] = [
  {
    displayName: 'MySQL',
    lexer: MySqlLexer,
    parser: MySqlParser,
    entry: 'sqlStatement',
  },
];

export default languages;
