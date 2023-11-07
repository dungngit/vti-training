import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './entities/article.entity';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: SoftDeleteModel<ArticleDocument>
  ) {}

  create(createArticleDto: CreateArticleDto) {
    const newArticle = new this.articleModel(createArticleDto);
    return newArticle.save();
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
