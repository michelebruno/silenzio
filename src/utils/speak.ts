import { loadConfig } from './loadConfig';
import _ from 'lodash';
import { Config } from '../default.config';

type ExtractPropertyFromPath<
  ObjectType extends Record<string, any>,
  Path extends string,
> = Path extends `${infer FirstPart}.${infer Rest}` // Se è a.b
  ? FirstPart extends keyof Required<ObjectType>
    ? Required<ObjectType>[FirstPart] extends object
      ? ExtractPropertyFromPath<Required<ObjectType>[FirstPart], Rest>
      : Required<ObjectType>[FirstPart]
    : keyof ObjectType[FirstPart]
  : Path extends keyof Required<ObjectType>
  ? Required<ObjectType>[Path]
  : never;

type TypeToDotNotation<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | `${K}.${TypeToDotNotation<T[K]>}`
        : never;
    }[keyof T]
  : never;

type NestedKeyOfConfig = TypeToDotNotation<Config>;

const requiredPaths: NestedKeyOfConfig[] = ['cache.secret'];

export default function speak<T extends NestedKeyOfConfig>(
  path: T
): ExtractPropertyFromPath<Config, T> {
  const config = loadConfig();

  const prop = _.property(path)(config) as never;

  if (!prop && requiredPaths.includes(path))
    console.warn(`Required config property ${path} is null or undefined.`);

  return prop;
}
