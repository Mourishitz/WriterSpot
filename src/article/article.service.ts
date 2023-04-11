import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ArticleEntity } from "./article.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { UserEntity } from "@app/user/user.entity";
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import slugify from "slugify";
import { PersistArticleDto } from "./dto/persistArticle.dto";

@Injectable()
export class ArticleService{
    constructor(
        @InjectRepository(ArticleEntity) 
        private readonly articleRepository: Repository<ArticleEntity>,
    ) {}
    
    async createArticle(currentUser: UserEntity, createArticleDto: PersistArticleDto): Promise<ArticleEntity>{
        
        const article = new ArticleEntity();
        Object.assign(article, createArticleDto);
        
        if(!article.tagList){
            article.tagList = [];
        }

        article.slug = this.getSlug(createArticleDto.title);
        article.author = currentUser;

        return await this.articleRepository.save(article);
    }

    async findBySlug(slug: string): Promise<ArticleEntity> {
        const article = await this.articleRepository.findOne({ where : { slug } });
    
        if (!article){
            throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
        }

        return article;
    }

    async updateArticle(
        slug: string,
        updateArticleDto: PersistArticleDto,
        currentUserId: number
    ): Promise<ArticleEntity>{

        const article = await this.findBySlug(slug);

        if (!article){
            throw new HttpException('Article not found', HttpStatus.NOT_FOUND)
        }

        if(article.author.id !== currentUserId){
            throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
        }

        Object.assign(article, updateArticleDto);

        return await this.articleRepository.save(article);
    }

    async deleteArticle(slug: string, currentUserId: number): Promise<DeleteResult> {
        const article = await this.findBySlug(slug);

        if (!article){
            throw new HttpException('Article not found', HttpStatus.NOT_FOUND)
        }

        if(article.author.id !== currentUserId){
            throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
        }

        return await this.articleRepository.delete({ slug });
    }


    buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
        return { article };
    }

    private getSlug(title: string): string {
        return slugify(title, { lower: true }) 
        + '-' 
        + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    }
}