// response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto {
  @ApiProperty({
    description: 'Código de estado HTTP de la excepción.',
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensaje de error descriptivo.',
  })
  message: string;
}
