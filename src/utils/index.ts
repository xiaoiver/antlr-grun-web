import { ANTLRInputStream, CommonTokenStream, Lexer, Parser, Token, RuleContext } from 'antlr4ts';

class CaseInsensitiveStream extends ANTLRInputStream {
  LA(offset: number) {
    const result = super.LA(offset);

    switch (result) {
    case 0:
    case Token.EOF:
      return result;
    default:
      return String.fromCharCode(result)
      .toUpperCase()
      .charCodeAt(0);
    }
  }
}

export function parse(
  input: string,
  LexerClazz: (new (...args: any[]) => Lexer),
  ParserClazz: (new (...args: any[]) => Parser),
  entry: string,
): { context: RuleContext; parser: Parser } {
  const chars = new CaseInsensitiveStream(input);
  const lexer = new LexerClazz(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new ParserClazz(tokens);

  // @ts-ignore
  if (!parser[entry]) {
    throw new Error('Unknown rule in parser.');
  }

  return {
    // @ts-ignore
    context: parser[entry](),
    parser,
  };
}
