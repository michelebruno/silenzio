import { loadConfig, requiredConfigPaths } from './loadConfig';
import _ from 'lodash';

export default function speak<T extends Silenzio.NestedKeyOfConfig>(
  path: T
): Silenzio.ExtractConfigPropertyFromPath<T> {
  const config = loadConfig();

  const property = _.property(path)(config) as never;

  if (!property && requiredConfigPaths.includes(path))
    throw new Error(`Required config property ${path} is null or undefined.`);

  return property;
}
