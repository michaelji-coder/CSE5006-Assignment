import { NextResponse } from 'next/server';
import * as fileDb from '../../../lib/fileDb.js';

export async function GET(request) {
  try {
    const { Blog } = await import('../../../models/index.js');
    const blogs = await Blog.findAll({ order: [['publishedAt', 'DESC']] });
    return NextResponse.json(blogs);
  } catch (err) {
    // fallback to file-backed storage
    try {
      const list = fileDb.readBlogs();
      return NextResponse.json(list);
    } catch (e) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}

export async function POST(request) {
  try {
    const { Blog, Counter } = await import('../../../models/index.js');
    const body = await request.json();
    const created = await Blog.create({
      title: body.title,
      author: body.author || 'Anonymous',
      content: body.content || '',
      image: body.image || null,
      link: body.link || null,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    });

    // increment counter
    await Counter.increment('value', { where: { name: 'requests' } });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    // fallback to file-backed storage
    try {
      const body = await request.json();
      const list = fileDb.readBlogs();
      const id = (list.length ? Math.max(...list.map(b => b.id || 0)) : 0) + 1;
      const newBlog = {
        id,
        title: body.title,
        author: body.author || 'Anonymous',
        content: body.content || '',
        image: body.image || null,
        link: body.link || null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt).toISOString() : new Date().toISOString(),
      };
      list.unshift(newBlog);
      fileDb.writeBlogs(list);
      const counter = fileDb.readCounter();
      counter.requests = (counter.requests || 0) + 1;
      fileDb.writeCounter(counter);
      return NextResponse.json(newBlog, { status: 201 });
    } catch (e) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
