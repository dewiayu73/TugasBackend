const db = require('../config/Db');

// Menampilkan semua notes
exports.getAllNotes = (req, res) => {
    db.query('SELECT * FROM notes', (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, data: results });
    });
};

// Menampilkan satu note berdasarkan ID
exports.getNoteById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM notes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        if (results.length === 0) return res.status(404).json({ success: false, message: 'Note not found.' });
        res.json({ success: true, data: results[0] });
    });
};

// Membuat note baru
exports.createNote = (req, res) => {
    const { title, datetime, note } = req.body;
    if (!title || !datetime || !note) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    db.query('INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)', [title, datetime, note], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.status(201).json({ success: true, message: 'Note created successfully.' });
    });
};

// Mengupdate note
exports.updateNote = (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    db.query(
        'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?',
        [title, datetime, note, id],
        (err, results) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            if (results.affectedRows === 0) return res.status(404).json({ success: false, message: 'Note not found.' });
            res.json({ success: true, message: 'Note updated successfully.' });
        }
    );
};

// Menghapus note
exports.deleteNote = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM notes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ success: false, message: 'Note not found.' });
        res.json({ success: true, message: 'Note deleted successfully.' });
    });
};
