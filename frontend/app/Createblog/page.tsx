'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Createblog = () => {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    
    // Status tracking for API interaction
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

    const addData = async () => {
        if (!title || !author || !description) {
            setMessage({ type: 'danger', text: 'Please fill in Title, Author, and Description.' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('/api/feeds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    author,
                    title,
                    description,
                    imageUrl: imageUrl.trim() === "" ? null : imageUrl,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit post.');
            }

            setMessage({ type: 'success', text: 'Blog post saved to database successfully!' });
            setAuthor('');
            setTitle('');
            setDescription('');
            setImageUrl('');
        } catch (error: any) {
            setMessage({ type: 'danger', text: error.message || 'Error connecting to database.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="container bg-light p-4 rounded" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
                <div className="row">
                    <div className="col">
                        <h2 className="mb-3">Create New Blog Post</h2>

                        {message && (
                            <div className={`alert alert-${message.type} mb-3`} role="alert">
                                {message.text}
                            </div>
                        )}

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Author *"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Title *"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="form-control mb-2"
                            rows={4}
                            placeholder="Description *"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Image URL (Optional)"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                        <button 
                            onClick={addData} 
                            disabled={loading}
                            className="btn btn-primary mb-2"
                        >
                            {loading ? 'Saving to Database...' : 'Add Data'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Createblog;