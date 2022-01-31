import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Min } from "class-validator";
import BaseEntity from "./BaseEntity";

export default class SearchCondition extends BaseEntity {
  @IsNotEmpty({message: '页码不能为空'})
  @IsInt({message: '页码必须为整数'})
  @Min(1, {message: '页码的最小值为1'})
  @Type(() => Number)
  public page: number;

  @IsNotEmpty({message: '页容量不能为空'})
  @IsInt({message: '页容量必须为整数'})
  @Min(1, {message: '页容量的最小值为1'})
  @Type(() => Number)
  public limit: number;

  @Type(() => String)
  public key: string;

  /** 将一个平面对象转换为SearchCondition对象 */
  public static transform(plainObject: object): SearchCondition {
    return super.BaseTransform(SearchCondition, plainObject);
  }
}
