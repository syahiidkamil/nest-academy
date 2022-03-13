import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    const { length: errorsLength } = errors;
    if (errorsLength > 0) {
      this.handleErrors(errors);
    }
    return value;
  }

  private handleErrors(errors: ValidationError[]){
    const { length: errorsLength } = errors;
    if (errorsLength > 0) {
      const errorMessages = errors.reduce(
        (stringAccumulator, errorObject, index) => {
          const key = Object.keys(errorObject.constraints)[0];
          const errorMessageArray = errorObject.constraints[key].split(' ');
          const firstWord = errorMessageArray[0];
          errorMessageArray[0] = this.camelToSnakeCase(firstWord);
          const prefix = index === 0 ? '' : ' ';
          const suffix = index === (errorsLength - 1) ? '.': ',';
          return stringAccumulator += `${prefix}${errorMessageArray.join(' ')}${suffix}`;
        },
        ''
      );

      throw new BadRequestException(errorMessages);
    }
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private camelToSnakeCase(str){
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
}
