import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsInt, IsISBN, IsUrl, IsIn, Matches } from 'class-validator';

@Schema({ timestamps: true })
export class Book extends Document {

    @Prop({ required: true, unique: true })
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @IsString({ message: 'El título debe ser una cadena de caracteres' })
    @MinLength(2, { message: 'El título debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El título no puede tener más de 100 caracteres' })
    title: string;

    @Prop({ required: true })
    @IsNotEmpty({ message: 'El autor es obligatorio' })
    @IsString({ message: 'El autor debe ser una cadena de caracteres' })
    @MinLength(2, { message: 'El autor debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El autor no puede tener más de 50 caracteres' })
    author: string;

    @Prop({ required: true })
    @IsNotEmpty({ message: 'El género es obligatorio' })
    @IsString({ message: 'El género debe ser una cadena de caracteres' })
    @MinLength(2, { message: 'El género debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El género no puede tener más de 50 caracteres' })
    genre: string;

    @Prop({ required: true })
    @IsNotEmpty({ message: 'El año de publicación es obligatorio' })
    @IsInt({ message: 'El año de publicación debe ser un número entero' })
    @Matches(/[\d]{4}/, { message: 'El año de publicación debe tener 4 dígitos' })
    year_publication: number;

    @Prop({ required: true })
    @IsNotEmpty({ message: 'El ISBN es obligatorio' })
    @IsString({ message: 'El ISBN debe ser una cadena de caracteres' })
    isbn: string;

    @Prop({ required: true })
    @IsNotEmpty({ message: 'La editorial es obligatoria' })
    @IsString({ message: 'La editorial debe ser una cadena de caracteres' })
    @MinLength(2, { message: 'La editorial debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'La editorial no puede tener más de 50 caracteres' })
    editorial: string;

    @Prop({ required: true })
    @IsNotEmpty({ message: 'El número de páginas es obligatorio' })
    @IsInt({ message: 'El número de páginas debe ser un número entero' })
    @MinLength(1, { message: 'El número de páginas debe ser al menos 1' })
    pages: number;

    @Prop({ required: true })
    @IsNotEmpty({ message: 'El idioma es obligatorio' })
    @IsString({ message: 'El idioma debe ser una cadena de caracteres' })
    @MinLength(2, { message: 'El idioma debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El idioma no puede tener más de 50 caracteres' })
    language: string;

    @Prop({ required: true })
    @IsNotEmpty({ message: 'El formato es obligatorio' })
    @IsString({ message: 'El formato debe ser una cadena de caracteres' })
    @IsIn(['papel', 'ebook', 'audiolibro'], { message: 'El formato debe ser "papel", "ebook" o "audiolibro"' })
    format: string;

    @Prop({ required: true })
    @IsNotEmpty({ message: 'El estado es obligatorio' })
    @IsString({ message: 'El estado debe ser una cadena de caracteres' })
    @IsIn(['nuevo', 'usado', 'en préstamo', 'en_préstamo', 'en_prestamo'], { message: 'El estado debe ser "nuevo", "usado" o "en préstamo"' })
    status: string;

    @Prop({ required: true })
    id:string

}
export const BookSchema = SchemaFactory.createForClass(Book);