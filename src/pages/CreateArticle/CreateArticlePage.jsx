import React, { useState, useEffect } from 'react';
import SideBar from '../../components/side-bar';

import './createArticle.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dossierURL } from '../../data/dossier';
import { array } from 'yup';

function CreateArticlePage(props) {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [poster, setPoster] = useState('')

    const navigate = useNavigate()    
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };
    const handleSave = async () => {
        console.log(title, desc, poster)
        // const base = await convertToBase64(poster)
        const x = poster.slice(poster.indexOf(",")+1)
        console.log(x)
        const news = {
            title,
            description: desc,
            image: poster
        }
        // news/create?title=ff&description=fasf%file=fasf

        const params = {
            title: title,
            description: desc,
            file: poster
        }

        let res = await axios.post(dossierURL + 'news', news);
            console.log(res.data)

        navigate('/news')
    }
    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          try {
            const base64Image = await convertToBase64(file);
            setPoster(base64Image)
            console.log(base64Image); // Base64 representation of the image
          } catch (error) {
            console.error(error); // Handle any errors that occur during conversion
          }
        }
      };
    const handleCancel = () => {
        navigate('/news')
    }

    return ( 
        <div className="createArticlePage">

            <div className="createArticleBody">
                <div className='pageTitle'>Создание новости</div>
                <div className="inputTitle">
                    <label htmlFor="title">Введите заголовок</label>
                    <input type="text" id='title' onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <div className='inputBody'>
                    <div className="inputPoster">
                        <label htmlFor="poster">Добавьте медиа-файл</label>
                        <input type="file" name="poster" id="poster" onChange={handleFileInputChange}/>
                    </div>
                    <div className="inputDescription">
                        <label htmlFor="description">Введите описание</label>
                        <textarea name="description" id="description" onChange={(event) => setDesc(event.target.value)}></textarea>
                    </div>
                </div>
                <div className="articleSave">
                    <div>
                        <input type="button" name="save" id="saveButton" value={'Отменить'} onClick={handleCancel}/>
                        <input type="button" name="save" id="saveButton" value={'Сохранить'} onClick={handleSave}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateArticlePage;