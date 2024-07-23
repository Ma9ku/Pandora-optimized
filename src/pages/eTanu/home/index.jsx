import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
// import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/eTanuComponents/layout";
import { useAuth } from '../../../context/authContext';
import { useSearch } from "../../../context/searchContext";
import "./style.scss";

import getDateAndTime from "../../../utils/getDateAndTime";
import history_mock_1 from './history_mock_1.jpeg';
import history_mock_2 from './history_mock_2.jpeg';
import history_mock_3 from './history_mock_3.jpeg';
import history_mock_4 from './history_mock_4.jpg';
import homePageMock from './mockData';
import mock from './mockResponse';

function ETanu() {
  const searchContext = useSearch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [iin, setIIN] = useState('');

  const { devMode } = useAuth();
  const token = localStorage.getItem("jwtToken");
  const email = localStorage.getItem("email")
  console.log(token);
  const [authUserId, setAuthUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false); // Add state for searching
  const [history, setHistory] = useState(null);

  const handleSearch = () => {
    setSearching(true); // Set searching to true when search starts
    searchContext.setFile(file);
    searchContext.setIIN(iin);

    const search = async () => {
      const data = new FormData();
      data.append('file', file);
      data.append('email', email);
      // data.append('limit', 10);
      // data.append('auth_user_id', authUserId);
      // data.append('reload', 0);
    

      await axios.post(
        'http://10.202.20.92:8081/etan',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
      ).then((response) => {
        searchContext.setLastRequest(response.data);
        console.log(response.data);
        setSearching(false); // Set searching to false when search is complete
        navigate('/eTanu/search/result');
      }).catch((error) => {
        console.log(error);
        setSearching(false); // Set searching to false if an error occurs

        if (devMode) {
          searchContext.setLastRequest(mock);
          navigate('/eTanu/search/result');
        }
      });
    }
 
    search();
  }

  useEffect(() => {
    const storedAuthUserId = localStorage.getItem('auth_user_id');
    console.log(storedAuthUserId);
    setAuthUserId(storedAuthUserId);
  }, []);

  useEffect(() => {
    if (authUserId) {
      if (!devMode) {
        axios.post(
          'http://10.202.20.92:8081/api/v1/getUserInfo/',
          { 'auth_user_id': authUserId },
          { headers: { 'Authorization': 'Bearer ' + token } }
        ).then(res => {
          setHistory(res.data.history);
          console.log(res.data);
          setLoading(false);
        }).catch(error => {
          console.log(error);
        });
      } else {
        devModeHome();
      }
    }
  }, [authUserId, devMode, token]);

  const devModeHome = async () => {
    await new Promise(r => setTimeout(r, 2000));
    setHistory(homePageMock.history);
    setLoading(false);
  }

  return (
    <Layout>
      <div className="home-page">
        <div className="container">
          {
            history && history.length > 0
              ? (
                <div className="recent-search">
                  <div className="title">Недавние запросы</div>
                  <div className="cards">
                    {
                      !loading
                        ? (<>
                          <Search_Card history={history[0]} />
                          <Search_Card history={history[1]} />
                          <Search_Card history={history[2]} />
                        </>) : (<>
                          <div><span>Загружаем...</span></div>
                          <div><span>Загружаем...</span></div>
                          <div><span>Загружаем...</span></div>
                        </>)
                    }
                  </div>
                </div>
              ) : null
          }

          <div className="search-input">
            <div className="file-input">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  if (e.target.files.length > 0) setFile(e.target.files[0]);
                }}
              />
              {
                file !== null ? 
                  <div className="image"><img src={URL.createObjectURL(file)} alt="" /></div> 
                  : null
              }
              <div>
                {file === null ? (
                  <FiUpload className="icon" />
                ) : (
                  <FaCheckCircle className="icon check-icon" />
                )}
                <p>
                  {file === null
                    ? "Загрузите или выберите изображение для поиска"
                    : "Изображение выбрано "}
                </p>
              </div>
            </div>

            <div className="iin-input">
              <div>
                <input
                  type="text"
                  placeholder="Введите иин"
                  onChange={(e) => setIIN(e.target.value)}
                  value={iin}
                />
                <button onClick={(e) => handleSearch()}>
                  {searching ? "Поиск..." : "Поиск"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Search_Card = ({ history }) => {


  const [infoOpen, setInfoOpen] = useState(false);
  const [photo, setPhoto] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const cardRef = useRef(null);

  const { devMode } = useAuth();
  const mockImages = [history_mock_1, history_mock_2, history_mock_3, history_mock_4];

  const PHOTO_URL = 'http://10.202.20.92:8081/history/';


  useEffect(() => {
    console.log(history);

    if (devMode) {
      setPhoto(mockImages[Math.floor(Math.random() * mockImages.length)]);
    } else if (history !== undefined) {
      setPhoto(`${PHOTO_URL}${history.searchedPhoto}`);
    }

    if (history !== undefined) {
      const [_date, _time] = getDateAndTime(history.created_at);
      setDate(_date);
      setTime(_time);
    }

  }, [history, devMode, mockImages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setInfoOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (history === undefined) return null;

  return (
    <div className="card" ref={cardRef}>
      <img src={photo} alt={date} />0
      <div className="info-block">
        {/* <HiDotsVertical className="icon" 
          onMouseEnter={() => setInfoOpen(true)} 
          onMouseLeave={() => setInfoOpen(false)}
        /> */}
        {infoOpen && (
          <div className="info">
            <div>Дата поиска: </div>
            <div>{date}</div>
            <div>{time}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ETanu;
