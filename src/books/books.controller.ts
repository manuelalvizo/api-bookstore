import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/guardianes/auth.guard';
import { RoleGuard } from 'src/guardianes/role.guard';
import { Roles } from 'src/guardianes/roles.decorador';
import { QueryDto } from './dto/query.dto';
import { BookDto, BooksResponseDto} from './dto/getallbook-response.dto';
import { ExceptionDto } from './dto/exception.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('books')
@ApiBearerAuth()
@Controller('api/v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles('admin', 'write')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 201, 
    description: 'Datos del libro creado', 
    type: BookDto,
    isArray: false 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Petición inválida', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflicto de reglas de negocio o conexión', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Recurso no encontrado', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor', 
    type: ExceptionDto 
  })
  @UseGuards(RoleGuard)
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @Roles('admin', 'read', 'write')
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de libros y numero de elementos totales', 
    type: BooksResponseDto, // Define el DTO que describe el formato de respuesta
    isArray: false // Indica que la respuesta es un arreglo si es necesario
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Petición inválida', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflicto de reglas de negocio o conexión', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Recurso no encontrado', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor', 
    type: ExceptionDto 
  })
  findAll(@Query() queryDto: QueryDto) {
    const { page, limit, filter } = queryDto; // Obtén la página y el límite de la consulta
    return this.booksService.findAll(page, limit, filter);
  }

  @Roles('admin', 'read', 'write')
  @Get(':id')
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 200, 
    description: 'Datos del libro solicitado', 
    type: BookDto,
    isArray: false 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Petición inválida', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflicto de reglas de negocio o conexión', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Recurso no encontrado', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor', 
    type: ExceptionDto 
  })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Roles('admin', 'write')
  @Patch(':id')
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ 
    status: 200, 
    description: 'Datos del libro actualizado', 
    type: BookDto,
    isArray: false 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Petición inválida', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflicto de reglas de negocio o conexión', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Recurso no encontrado', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor', 
    type: ExceptionDto 
  })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @ApiResponse({ 
    status: 204, 
    description: 'Indica que el libro se elimino correctamente', 
    isArray: false 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Petición inválida', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflicto de reglas de negocio o conexión', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Recurso no encontrado', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor', 
    type: ExceptionDto 
  })
  @Roles('admin', 'write', 'delete')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
