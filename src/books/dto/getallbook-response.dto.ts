// response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class BookDto {

  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  year_publication: number;

  @ApiProperty()
  isbn: string;

  @ApiProperty()
  editorial: string;

  @ApiProperty()
  pages: number;

  @ApiProperty()
  language: string;

  @ApiProperty()
  format: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class BooksResponseDto {
  @ApiProperty({ type: [BookDto] })
  books: BookDto[];

  @ApiProperty()
  totalElements: number;
}
