export = stringd;

declare namespace stringd {
  export interface ParsedString<T> extends String { }

  export interface DataObject {
    args: string[],
    matched: {
      [key: string]: string;
    }
  }
  
  export interface PropSchema {
    [key: string]: string | ((object: this, data?: DataObject) => any);
  }
}

/**
 * Parse a template, replacing variable sections with flexibly defined values
 * @param tmp String template template to be parsed
 * @param props Object containing the properties for variables to be replaced with
 * @param ignore Tags within a snippet of a string to be ignored. (used specifically to avoid tag repetition/recursion)
 */
declare function stringd<T = stringd.PropSchema>(tmp: string, props: T): stringd.ParsedString<T>;
declare function stringd<T = stringd.PropSchema>(tmp: string, props: T, ignore: string[]): stringd.ParsedString<T>;
