export = stringd;

declare namespace stringd {
  export interface ParsedString<T> extends String { }
}

/**
 * Parse a template, replace parts with specified values
 * @param template Template to be parsed
 * @param object Object containing the object parts with replaceable values
 * @param skip Part of the object to skip when checking
 */
declare function stringd<T = {}>(template: string, object: T): stringd.ParsedString<T>;
declare function stringd<T = {}>(template: string, object: T, skip: string[]): stringd.ParsedString<T>;
