import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModule: Model<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const firstChar = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Código ASCII para A-Z
    // Generar dos dígitos aleatorios
    const randomNumber = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, '0');
    // Combinar los tres para formar el identificador único
    const id = `${firstChar}${randomNumber}`;

    // Asignar el id al DTO
    createBookDto.id = id;
    // Verificar si el identificador ya existe en la base de datos
    const existingBook = await this.bookModule.findOne({ id });

    // Si el identificador ya existe, generar uno nuevo hasta que sea único
    if (existingBook) {
      return this.create(createBookDto); // Llamada recursiva para generar un nuevo identificador
    }

    try {
      const bookCreated = await this.bookModule.create(createBookDto);
      return bookCreated;
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.title) {
        throw new HttpException(
          'El libro ya existe, verificar información',
          HttpStatus.CONFLICT
        );
      }
      throw new HttpException(
        'Ocurrió un error al registrar el libro',
        HttpStatus.CONFLICT
      );
    }
  }

  async findAll(page: number, limit: number) {
    let libros;
    let totalElementos; // Declara la variable list fuera del bloque try
    const skip = (page - 1) * limit; // Calcula el número de documentos a omitir
    try {
      const [resultList, totalList] = await Promise.all([
        this.bookModule.find({}, '-__v -_id').skip(skip).limit(limit), // Lista paginada
        this.bookModule.countDocuments() // Total de elementos
      ]);
      libros = resultList;
      totalElementos = totalList; // Asigna el valor a list
    } catch (error) {
      throw new HttpException('Ocurrió un error al obtener los libros', HttpStatus.CONFLICT);
    }
    if (libros.length === 0) {
      throw new HttpException('No se encontraron elementos', HttpStatus.NOT_FOUND);
    }
    return { libros, totalElementos };
  }
  
  async findOne(id: string) {
    var existingBook = "";
    try {
      existingBook = await this.bookModule.findOne({ id });
     
    } catch (error) {
      throw new HttpException('Ocurrió un error al obtener el libro',HttpStatus.CONFLICT);
    }
    if (!existingBook) {
      throw new HttpException('El libro no se encontró', HttpStatus.NOT_FOUND);
    }
    return existingBook;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      const updatedBook = await this.bookModule.findOneAndUpdate({ id }, updateBookDto, { new: true });
      if (!updatedBook) {
        throw new HttpException('El libro no se encontró', HttpStatus.NOT_FOUND);
      }
      return updatedBook;
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.title) {
        throw new HttpException(
          'Ya existe un libro con ese título, verificar información',
          HttpStatus.CONFLICT
        );
      }
      throw new HttpException(
        'Ocurrió un error al actualizar el libro',
        HttpStatus.CONFLICT
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedBook = await this.bookModule.findOneAndDelete({ id });
      if (!deletedBook) {
        throw new HttpException('El libro que se intento eliminar, no existe', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException('Ocurrió un error al eliminar el libro',HttpStatus.CONFLICT);
    }
  }
}