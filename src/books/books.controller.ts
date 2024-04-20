import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guardianes/auth.guard';
import { RoleGuard } from 'src/guardianes/role.guard';
import { Roles } from 'src/guardianes/roles.decorador';
import { QueryDto } from './dto/query.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles('admin', 'write')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(RoleGuard)
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @Roles('admin', 'read', 'write')
  @UseGuards(RoleGuard)
  findAll(@Query() queryDto: QueryDto) {
    const { page, limit } = queryDto; // Obtén la página y el límite de la consulta
    return this.booksService.findAll(page, limit);
  }

  @Roles('admin', 'read', 'write')
  @Get(':id')
  @UseGuards(RoleGuard)
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Roles('admin', 'write')
  @Patch(':id')
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Roles('admin', 'write', 'delete')
  @Delete(':id')
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
