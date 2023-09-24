import { loadConfig, requiredConfigPaths } from './loadConfig';
import _ from 'lodash';
import { Config } from '../default.config';

export default function speak<T extends NestedKeyOfConfig>(
  path: T
): ExtractPropertyFromPath<Config, T> {
  const config = loadConfig();

  const property = _.property(path)(config) as never;

  if (!property && requiredConfigPaths.includes(path))
    throw new Error(`Required config property ${path} is null or undefined.`);

  return property;
}

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

export type NestedKeyOfConfig = TypeToDotNotation<Config>;
