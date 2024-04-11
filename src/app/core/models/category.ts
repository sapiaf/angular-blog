export class Category {
  id: string;
  name: string;
  posts: string[];

  constructor(category: Partial<Category>) {
    this.id = category.id || '';
    this.name = category.name || '';
    this.posts = category.posts || [];
  }
}
