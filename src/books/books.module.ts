import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/book.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/guardianes/jwt.constants';

@Module({
  imports:[
  MongooseModule.forFeature([
    {
      name: Book.name,
      schema: BookSchema
    }
  ]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '20h' },
  })
],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
