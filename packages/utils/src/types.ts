export type ValueOf<
  ObjectType extends object,
  ValueType extends keyof ObjectType = keyof ObjectType
> = ObjectType[ValueType]
