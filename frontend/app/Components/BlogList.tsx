'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

type Blog = {
  id: number;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  imageUrl?: string | null;
  link?: string | null;
};

const BlogList = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      // Relative path handled by Nginx proxy
      const res = await fetch('/api/feeds');
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to load blogs');
      }

      setData(result.data || []);
    } catch (err: any) {
      console.error('Failed to load blogs', err);
      setError('Could not connect to API server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      // Relative path handled by Nginx proxy
      const res = await fetch(`/api/feeds/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete post');
      }

      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error deleting post');
    }
  };

  const filteredData = searchQuery.trim()
    ? data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data;

  return (
    <div>
      <div className="container bg-light p-4 rounded" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && filteredData.length === 0 && (
          <p className="text-muted text-center my-4">No blog posts found.</p>
        )}

        <div className="row">
          {filteredData.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    className="card-img-top"
                    alt={item.title}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                ) : null}

                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">
                    {item.description && item.description.length > 80
                      ? `${item.description.substring(0, 80)}...`
                      : item.description}
                  </p>

                  <div className="mb-3">
                    <p className="m-0 small text-dark fw-bold">Posted by {item.author}</p>
                    <small className="text-muted">
                      {new Date(item.createdAt).toLocaleString()}
                    </small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <Link href={`/blog/${item.id}`}>
                      <button className="btn btn-primary btn-sm">Read more</button>
                    </Link>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;