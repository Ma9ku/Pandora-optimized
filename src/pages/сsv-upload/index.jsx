// src/components/CSVUpload.tsx
import axios from 'axios';
import React, { useRef, useState } from 'react';
import './style.css';

const CSVUpload = () => {
    const [activeForm, setActiveForm] = useState('addRelationship');
    const [file, setFile] = useState(null);
    const [relationshipType, setRelationshipType] = useState('');
    const [endpoint, setEndpoint] = useState('');
    const fileInputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleFormChange = (form) => {
        setActiveForm(form);
        setIsOpen(false);
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const url = ['add_property/person', 'add_property/company'].includes(endpoint)
                ? `http://10.202.20.92:8081/${endpoint}/`
                : `http://10.202.20.92:8081/${endpoint}/type=${relationshipType}/`;

            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Файл успешно загружен: ' + response.data.message);
        } catch (error) {
            console.error('Ошибка загрузки файла:', error);
            alert('Ошибка загрузки файла: ' + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <div className="csv-upload-main">
            <div className="dropdown">
                <button className="dropdown-button" onClick={toggleDropdown}>
                    {activeForm === 'addRelationship' ? 'Добавить связь' : 'Добавить свойство'}
                </button>
                {isOpen && (
                    <div className="dropdown-content">
                        <a onClick={() => handleFormChange('addRelationship')}>Добавить связь</a>
                        <a onClick={() => handleFormChange('addProperty')}>Добавить свойство</a>
                    </div>
                )}
            </div>

            <div className="csv-upload">
                <h2>{activeForm === 'addRelationship' ? 'Загрузите CSV файл для добавления связи' : 'Загрузите CSV файл для добавления свойства'}</h2>
                <form onSubmit={handleSubmit}>
                    <div
                        className="file-drop-area"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            required
                        />
                        {file ? (
                            <span className="file-name">{file.name}</span>
                        ) : (
                            <span className="file-message">Перетащите файл сюда или нажмите для выбора</span>
                        )}
                    </div>
                    {endpoint !== 'add_property/person' && endpoint !== 'add_property/company' && (
                        <div>
                            <input type="text" placeholder="Введите название связи" value={relationshipType} onChange={(e) => setRelationshipType(e.target.value)} required />
                        </div>
                    )}
                    <div>
                        <select value={endpoint} onChange={(e) => setEndpoint(e.target.value)} required>
                            <option value="">Выберите тип связи</option>
                            {activeForm === 'addRelationship' ? (
                                <>
                                    <option value="create_relationship/p2p">Связь между фл</option>
                                    <option value="create_relationship/p2u">Связь между фл и юл</option>
                                    <option value="create_relationship/u2u">Связь между юл</option>
                                    <option value="create_relationship/u2p">Связь между юл и фл</option>
                                </>
                            ) : (
                                <>
                                    <option value="add_property/person">Добавить свойство фл</option>
                                    <option value="add_property/company">Добавить свойство юл</option>
                                    <option value="add_property/p2p">Добавить свойство связи фл-фл</option>
                                    <option value="add_property/p2u">Добавить свойство связи между фл и юл</option>
                                    <option value="add_property/u2u">Добавить свойство связи между юл</option>
                                    <option value="add_property/u2p">Добавить свойство связи между юл и фл</option>
                                </>
                            )}
                        </select>
                    </div>
                    <button type="submit">Загрузить</button>
                </form>
            </div>
        </div>
    );
};

export default CSVUpload;
