import sequelize from '../lib/db.js';
import initBlog from './blog.js';
import initCounter from './counter.js';

const Blog = initBlog(sequelize);
const Counter = initCounter(sequelize);

export { sequelize, Blog, Counter };
export default { sequelize, Blog, Counter };
