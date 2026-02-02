import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import camelcase from 'camelcase';

@Catch(QueryFailedError)
export class MysqlErrFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionMessage = exception.message;
    console.error(exceptionMessage);

    let statusCode = 400;
    const message: { status: string; message: string } = {
      status: 'fail',
      message: 'mySQL Query 오류입니다.',
    };

    const errorMap: Map<string, (msg: string) => string> = new Map([
      [
        "doesn't have a default value",
        (msg: string) => {
          const field = msg.match(/Field '([^']+)'/)?.[1] || '';
          return `${camelcase(field)} 값을 입력해주세요`;
        },
      ],
      [
        'Duplicate entry',
        (msg: string) => {
          const value = msg.match(/Duplicate entry '([^']+)'/)?.[1] || '';
          return `${value}은(는) 이미 존재하는 값입니다.`; // 들어온 값을 내보내는거라 카멜케이스 안씀
        },
      ],
      [
        'Data too long for column',
        (msg: string) => {
          const field =
            msg.match(/Data too long for column '([^']+)'/)?.[1] || '';
          return `${camelcase(field)}의 입력값이 길어 저장할 수 없습니다.`;
        },
      ],
      [
        'Cannot add or update a child row: a foreign key constraint fails',
        (msg: string) => {
          const field = msg.match(/FOREIGN KEY \(`([^`]+)`/)?.[1] || '';
          const table = msg.match(/REFERENCES `([^`]+)`/)?.[1] || '';
          statusCode = 404;
          return `연결하려는 부모 데이터가 존재하지 않습니다. ${camelcase(field)} 값을 확인해주세요.`;
        },
      ],
    ]);

    const [_, handler] =
      [...errorMap].find(([key]) => exceptionMessage.includes(key)) || [];

    message.message = handler
      ? handler(exceptionMessage)
      : 'mySQL Query 오류입니다.';

    response.status(statusCode).json(message);
  }
}
