import { plainToClass, Type } from "class-transformer";
import { ArrayMinSize, IsArray, isArray, IsNotEmpty, isNotEmpty, Max, Min, validate } from "class-validator";
import BaseEntity from "./BaseEntity";

export default class Movie extends BaseEntity {
  @IsNotEmpty({message: '电影名称不能为空'})
  @Type(() => String) // 利用装饰器，使“类型约束”在运行时生效
  public name: string;

  @IsNotEmpty({message: '电影类型不能为空'})
  @ArrayMinSize(1, {message: '电影类型至少有一个'})
  @IsArray({message: '电影类型必须为数组'})
  @Type(() => String) // 利用装饰器，使“类型约束”在运行时生效(class-transformer库建议：如果是一个数组，则直接返回数组的每一项的类型即可。然后配合上述class-validator提供的装饰器@IsArray进行使用)
  public types: string[];

  @IsNotEmpty({message: '上映地区不能为空'})
  @ArrayMinSize(1, {message: '上映地区至少有一个'})
  @IsArray({message: '上映地区必须为数组'})
  @Type(() => String)
  public areas: string[];

  @IsNotEmpty({message: '电影时长不能为空'})
  @Min(30, {message: '电影时长最短为30分钟'})
  @Max(300, {message: '电影时长最长为300分钟'})
  @Type(() => Number)
  public duration: number;

  @IsNotEmpty({message: '“是否即将上映”不能为空'})
  @Type(() => Boolean)
  public isComing: boolean = false;

  @IsNotEmpty({message: '“是否热映”不能为空'})
  @Type(() => Boolean)
  public isHot: boolean = false;

  @IsNotEmpty({message: '“是否为经典”不能为空'})
  @Type(() => Boolean)
  public isClassic: boolean = false;

  @Type(() => String)
  public desc?: string;

  @Type(() => String)
  public poster?: string;

  /** 将一个平面对象转换为Movie对象 */
  public static transform(plainObject: object): Movie {
    return super.BaseTransform(Movie, plainObject);
  }
}
