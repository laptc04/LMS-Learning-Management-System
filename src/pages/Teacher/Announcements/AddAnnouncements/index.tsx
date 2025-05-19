import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const AddAnnouncements = ({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (data: { recipient: string; subject: string; content: string }) => void }) => {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState<string>('');

    const handleEditorChange = (content: string) => {
        setMessage(content);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (recipient && subject && message) {
            onSubmit({ recipient, subject, content: message });
            setRecipient('');
            setSubject('');
            setContent('');
            setMessage('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-4/12 relative border border-gray-300">
                <div className="flex justify-between items-center bg-gray-800 text-white rounded-t-lg p-3 mb-4">
                    <h2 className="text-2xl font-semibold px-4">Gửi thông báo mới</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-300 text-2xl font-bold">
                        X
                    </button>
                </div>
                <div className="px-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Đối tượng nhận"
                            />
                        </div>
                        <div className="mb-4">
                            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md mb-2" placeholder="Chủ đề"
                            />
                            <Editor
                                apiKey="dtg3ufww3eud22vtprd0r7rpiud2tcwf62kzq7oscu6q6qzy"
                                value={message}
                                onEditorChange={handleEditorChange}
                                init={{
                                    height: 400,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount',
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link image | table | removeformat',
                                    content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }',
                                }}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit"
                                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
                                Gửi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAnnouncements;