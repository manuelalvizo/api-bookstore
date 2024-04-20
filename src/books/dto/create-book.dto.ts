import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, MinLength, MaxLength, IsISBN, IsUrl, IsIn, Min, Max, Matches } from 'class-validator';

export class CreateBookDto {

    @ApiProperty({ description: 'Título del libro', minLength: 2, maxLength: 100 })
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @IsString({ message: 'El título debe ser una cadena de caracteres' })
    @MinLength(2, { message: 'El título debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El título no puede tener más de 100 caracteres' })
    title: string;

    @ApiProperty({ description: 'Autor del libro', minLength: 2, maxLength: 50 })
    @IsNotEmpty({ message: 'El autor es obligatorio' })
    @IsString({ message: 'El autor debe ser una cadena de caracteres' })
    @MinLength(2, { message: 'El autor debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El autor no puede tener más de 50 caracteres' })
    author: string;

    @ApiProperty({ description: 'Género del libro', minLength: 2, maxLength: 50 })
    @IsNotEmpty({ message: 'El género es obligatorio' })
    @IsString({ message: 'El género debe ser una cadena de caracteres' })
    @MinLength(2, { message: 'El género debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El género no puede tener más de 50 caracteres' })
    genre: string;

    @ApiProperty({ description: 'Año de publicación del libro', minLength: 4, maxLength: 4 })
    @IsNotEmpty({ message: 'El año de publicación es obligatorio' })
    @IsInt({ message: 'El año de publicación debe ser un número entero' })
    @Min(1111, { message: 'El año debe ser un año valido' })
    @Max(9999, { message: 'El año debe páginas debe ser un año valido' })
    year_publication: number;

    @ApiProperty({ description: 'ISBN del libro', minLength: 13, maxLength: 13 })
    @IsNotEmpty({ message: 'El ISBN es obligatorio' })
    @IsString({ message: 'El ISBN debe ser una cadena de caracteres' })
    @IsISBN(13, { message: 'El ISBN debe tener 13 dígitos' })
    isbn: string;

    @ApiProperty({ description: 'Editorial del libro', minLength: 2, maxLength: 50})
    @IsNotEmpty({ message: 'La editorial es obligatoria' })
    @IsString({ message: 'La editorial debe ser una cadena de caracteres' })
    @MinLength(2, { message: 'La editorial debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'La editorial no puede tener más de 50 caracteres' })
    editorial: string;

    @ApiProperty({ description: 'Número de páginas del libro' })
    @IsNotEmpty({ message: 'El número de páginas es obligatorio' })
    @IsInt({ message: 'El número de páginas debe ser un número entero' })
    @Min(2, { message: 'El número de páginas debe ser mayor que 1' })
    @Max(9998, { message: 'El número de páginas debe ser menor que 9999' })
    pages: number;

    @ApiProperty({ description: 'Idioma del libro', minLength: 2, maxLength: 50 })
    @IsNotEmpty({ message: 'El idioma es obligatorio' })
    @IsString({ message: 'El idioma debe ser una cadena de caracteres' })
    @MinLength(2, { message: 'El idioma debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El idioma no puede tener más de 50 caracteres' })
    language: string;

    @ApiProperty({ description: `Formato del libro: 'papel', 'ebook', 'audiolibro'` })
    @IsNotEmpty({ message: 'El formato es obligatorio' })
    @IsString({ message: 'El formato debe ser una cadena de caracteres' })
    @IsIn(['papel', 'ebook', 'audiolibro'], { message: 'El formato debe ser "papel", "ebook" o "audiolibro"' })
    format: string;

    @ApiProperty({ description: `Estado del libro: 'nuevo', 'usado', 'en préstamo'`})
    @IsNotEmpty({ message: 'El estado es obligatorio' })
    @IsString({ message: 'El estado debe ser una cadena de caracteres' })
    @IsIn(['nuevo', 'usado', 'en préstamo'], { message: 'El estado debe ser "nuevo", "usado" o "en préstamo"' })
    status: string;

    id:string

}