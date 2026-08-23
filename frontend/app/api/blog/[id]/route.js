import { NextResponse } from 'next/server';
import * as fileDb from '../../../../lib/fileDb.js';

export async function GET(request, { params }) {
  try {
    const { Blog } = await import('../../../../models/index.js');
    const blog = await Blog.findByPk(params.id);
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(blog);
  } catch (err) {
    try {
      const list = fileDb.readBlogs();
      const b = list.find(x => String(x.id) === String(params.id));
      if (!b) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(b);
    } catch (e) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const { Blog } = await import('../../../../models/index.js');
    const blog = await Blog.findByPk(params.id);
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    await blog.update(body);
    return NextResponse.json(blog);
  } catch (err) {
    try {
      const body = await request.json();
      const list = fileDb.readBlogs();
      const idx = list.findIndex(x => String(x.id) === String(params.id));
      if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      list[idx] = { ...list[idx], ...body };
      fileDb.writeBlogs(list);
      return NextResponse.json(list[idx]);
    } catch (e) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}

export async function DELETE(request, { params }) {
  try {
    const { Blog } = await import('../../../../models/index.js');
    const blog = await Blog.findByPk(params.id);
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    await blog.destroy();
    return NextResponse.json({ success: true });
  } catch (err) {
    try {
      const list = fileDb.readBlogs();
      const idx = list.findIndex(x => String(x.id) === String(params.id));
      if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      list.splice(idx, 1);
      fileDb.writeBlogs(list);
      return NextResponse.json({ success: true });
    } catch (e) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
