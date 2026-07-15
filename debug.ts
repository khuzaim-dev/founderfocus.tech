import { getCategoryBySlug, getCategories, getPostsByCategory } from './lib/wordpress'

async function run() {
  try {
    const categories = await getCategories();
    console.log('Categories:', categories.map(c => c.slug));
    
    const category = await getCategoryBySlug('models');
    console.log('Models category:', category);
    
    if (category) {
      const posts = await getPostsByCategory('models');
      console.log('Models posts count:', posts.posts.length);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}
run();
