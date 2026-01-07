const Contact = () => {
    return (
        <div className="container animate-fade-in" style={{ padding: '50px 0' }}>
            <h2 className="section-title">Contact Us</h2>
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" style={{ width: '100%' }} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" style={{ width: '100%' }} />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea rows={5} style={{ width: '100%' }}></textarea>
                    </div>
                    <button className="btn btn-primary">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
