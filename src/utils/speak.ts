import { loadConfig } from './loadConfig';
import _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | `${K}.${DeepKeys<T[K]>}`
        : never;
    }[keyof T]
  : never;

type NestedKeyOfConfig = DeepKeys<Silenzio.Config>;

const requiredPaths: NestedKeyOfConfig[] = ['cache.secret'];

export default function speak(path: NestedKeyOfConfig): never {
  const config = loadConfig();

  const prop = _.property(path)(config) as never;

  if (!prop && requiredPaths.includes(path))
    console.warn(`Required config property ${path} is null or undefined.`);

  return prop;
}
