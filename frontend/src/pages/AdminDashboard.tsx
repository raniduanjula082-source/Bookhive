import { useState, useEffect } from 'react';
import BookService from '../services/book.service';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminDashboard = () => {
    const [books, setBooks] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        publisher: '',
        isFeatured: false,
        isRecommended: false
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState('');

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        BookService.getAllBooks().then(res => setBooks(res.data)).catch(err => console.error(err));
    };

    const handleChange = (e: any) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await BookService.updateBook(editId, formData);
            } else {
                await BookService.createBook(formData);
            }
            // Reset
            setFormData({ title: '', author: '', description: '', price: 0, category: '', imageUrl: '', publisher: '', isFeatured: false, isRecommended: false });
            setIsEditing(false);
            setEditId('');
            loadBooks();
        } catch (error) {
            console.error("Error saving book", error);
            alert("Failed to save book");
        }
    };

    const handleEdit = (book: any) => {
        setFormData({
            title: book.title,
            author: book.author,
            description: book.description,
            price: book.price,
            category: book.category,
            imageUrl: book.imageUrl,
            publisher: book.publisher || '',
            isFeatured: book.isFeatured || false,
            isRecommended: book.isRecommended || false
        });
        setIsEditing(true);
        setEditId(book.id);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure?")) {
            await BookService.deleteBook(id);
            loadBooks();
        }
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '50px 0' }}>
            <h2 className="section-title">Admin Dashboard</h2>

            <div className="card" style={{ marginBottom: '50px' }}>
                <h3>{isEditing ? 'Edit Book' : 'Add New Book'}</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label>Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Author</label>
                        <input name="author" value={formData.author} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '10px' }}>
                            <option value="">Select Category</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Children">Children's Books</option>
                            <option value="Novels">Novels</option>
                            <option value="Translations">Translations</option>
                            <option value="Short Story">Short Story</option>
                            <option value="Education">Educational</option>
                            <option value="Young Adult">Young Adult</option>
                            <option value="Downloads">Downloads</option>
                        </select>
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Publisher</label>
                        <select name="publisher" value={formData.publisher} onChange={handleChange} style={{ width: '100%', padding: '10px' }}>
                            <option value="">Select Publisher</option>
                            <option value="Sarasavi">Sarasavi</option>
                            <option value="Sumitha">Sumitha</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
                            Featured
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" name="isRecommended" checked={formData.isRecommended} onChange={handleChange} />
                            Recommended
                        </label>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 2' }}>
                        {isEditing ? 'Update Book' : <><FaPlus /> Add Book</>}
                    </button>
                    {isEditing && (
                        <button type="button" className="btn btn-outline" style={{ gridColumn: 'span 2' }} onClick={() => {
                            setIsEditing(false);
                            setFormData({ title: '', author: '', description: '', price: 0, category: '', imageUrl: '', publisher: '', isFeatured: false, isRecommended: false });
                        }}>Cancel</button>
                    )}
                </form>
            </div>

            <div className="book-list">
                <h3>Manage Books</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                            <th style={{ padding: '10px' }}>Title</th>
                            <th style={{ padding: '10px' }}>Author</th>
                            <th style={{ padding: '10px' }}>Price</th>
                            <th style={{ padding: '10px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px' }}>{book.title}</td>
                                <td style={{ padding: '10px' }}>{book.author}</td>
                                <td style={{ padding: '10px' }}>${book.price}</td>
                                <td style={{ padding: '10px' }}>
                                    <button className="btn" style={{ color: 'blue' }} onClick={() => handleEdit(book)}>
                                        <FaEdit />
                                    </button>
                                    <button className="btn" style={{ color: 'red' }} onClick={() => handleDelete(book.id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
