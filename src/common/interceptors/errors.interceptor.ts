import { HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ValidationError } from 'sequelize';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(_, call$: Observable<any>): Observable<any> {
    return call$.pipe(
      // tslint:disable-next-line:no-console
      catchError(err => {
        return throwError(
          err instanceof ValidationError
            ? new HttpException(
                this.adjustSequelizeValidationError(err),
                HttpStatus.UNPROCESSABLE_ENTITY
              )
            : err
        );
      })
    );
  }

  private adjustSequelizeValidationError(error: any): ValidationError {
    const name = 'ValidationError';
    const errors = error.errors.map(err => {
      delete err.instance;
      delete err.__raw;
      delete err.origin;
      delete err.validatorKey;
      delete err.validatorName;
      delete err.validatorArgs;

      return err;
    });
    const e = new ValidationError(name, errors);

    return e;
  }
}
