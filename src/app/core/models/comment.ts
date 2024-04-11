export class Comment {
  id: string;
  userId: string;
  newsId: string;
  title: string;
  content: string;
  date: Date;

  constructor(comment: Partial<Comment>) {
    this.id = comment.id || '';
    this.userId = comment.userId || '';
    this.newsId = comment.newsId || '';
    this.title = comment.title || '';
    this.content = comment.content || '';
    this.date = comment.date ? new Date(comment.date) : new Date();
  }
}
