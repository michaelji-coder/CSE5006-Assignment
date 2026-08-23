// app/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the Blog type
type Blog = {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  image: string | null;
};

const BlogDetails = () => {
  const params = useParams();
  const id = params?.id as string;
  const [blogDetail, setBlogDetail] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (res.ok) {
          const obj: Blog = await res.json();
          setBlogDetail(obj);
          return;
        }
      } catch (err) {
        console.error('Failed to load blog', err);
      }
    }
    load();
  }, [id]);

  if (!blogDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container bg-light" style={{ marginTop: '5rem' }}>
      <Header />
      <div className="card mt-5">
        {blogDetail.image ? (
          <img
            src={blogDetail.image}
            style={{ maxWidth: '100%', maxHeight: '300px' }}
            className="card-img-top"
            alt="Blog"
          />
        ) : null}
        <div className="card-body">
          <h1 className="card-title">{blogDetail.title}</h1>
          <p className="card-text">{blogDetail.content}</p>
          <p className="card-text">Author: {blogDetail.author}</p>
          <p className="card-text">Date: {new Date(blogDetail.publishedAt).toLocaleString()}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetails;