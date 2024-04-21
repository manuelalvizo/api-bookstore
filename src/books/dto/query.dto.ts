import { IsOptional, IsNumber, Min } from 'class-validator';

export class QueryDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  filter?: string;
}
