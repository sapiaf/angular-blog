export class News {
  id: string;
  title: string;
  author: string;
  content: string;
  date: Date;
  category: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments: string[];

  constructor(news: Partial<News>) {
    this.id = news.id || '';
    this.title = news.title || '';
    this.author = news.author || '';
    this.content = news.content || '';
    this.date = news.date ? new Date(news.date) : new Date();
    this.category = news.category || '';
    this.imageUrl = news.imageUrl || '';
    this.createdAt = news.createdAt ? new Date(news.createdAt) : new Date();
    this.updatedAt = news.updatedAt ? new Date(news.updatedAt) : new Date();
    this.comments = news.comments || [];
  }
}
