import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export default class BaseEntity {
  /**
   * 验证当前对象
   * @returns 错误信息-字符串数组
   */
   public async validateThis(skipMissing: boolean = false): Promise<string[]> {
    const errors = await validate(this, {
      skipMissingProperties: skipMissing
    });
    const res = errors.map(err => Object.values(err.constraints || {}));
    return res.flat(Infinity) as string[];
  }

  /** 将一个平面对象转换为cls对象，仅供子类调用 */
  protected static BaseTransform<T>(cls: ClassConstructor<T>, plainObject: object): T {
    if(plainObject instanceof cls) {
      return plainObject;
    }
    return plainToClass(cls, plainObject);
  }
}
