import {loadConfig} from "./loadConfig";
import _ from "lodash";
import {Silenzio} from "../default.config";


type NestedKeyOf<ObjectType extends object> =
  {[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
  }[keyof ObjectType & (string | number)];

type DeepKeys<T> = T extends object
  ? {
    [K in keyof T]-?: K extends string | number
      ? `${K}` | `${K}.${DeepKeys<T[K]>}`
      : never;
  }[keyof T]
  : never;

type NestedKeyOfConfig = DeepKeys<Silenzio.Config>;
export default function speak(path: NestedKeyOfConfig): any  {

  const config = loadConfig();

  return _.property(path)(config)  as any;
}