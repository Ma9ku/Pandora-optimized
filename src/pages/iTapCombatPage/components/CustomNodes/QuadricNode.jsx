import React, { memo, useEffect, useState, useCallback } from "react";
import { Handle, Position } from "reactflow";

import editIcon from "../../images/editIcon.svg";
import plusIcon from "../../images/plucIcon.svg";
import trashIcon from "../../images/trashIcon.svg";
import ImageIcon from "../../images/addimgIcon.svg";

import "./quadricNode.scss";

function QuadricNode({ id, data }) {
    const [EditImage, setEditImage] = useState(null);
    const [showUploadButton, setShowUploadButton] = useState(true);
    const [onlyPhoto, setOnlyPhoto] = useState(false);
    const handleDragOver = (e) => {
        e.preventDefault();
      };
    
      const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
      };
      const handleImageUploadInEdit = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64String = e.target.result.replace(
              /^data:image\/[a-z]+;base64,/,
              ""
            );
            setEditImage(base64String);
            setOnlyPhoto(true);
            setShowUploadButton(false);
          };
          reader.readAsDataURL(file);
        }
      }, []);
    
  const { onDeleteNode, createNodeAndConnect, setZoomOnScroll, color, type } =
    data;
  const [renderedLabel, setRenderedLabel] = useState(
    type == "person"
      ? data.FIO
        ? data.FIO
        : data.Familia + " " + data.Name + " " + data.Otchestvo
      : type == "company"
      ? data.Name
        ? data.Name
        : data.FullNameIP
      : type == "address"
      ? data.Adress
      : type == "created"
      ? data.Name
      : "address"
  );

  const [propertiesMAP, setPropertiesMAP] = useState(
    type == "person"
      ? personDictionary
      : type == "company"
      ? companyDictionary
      : propertiesDictionary
  );
  const [isKey, setIsKey] = useState(false);
  const [colorBasedOnType, setColorBasedOnType] = useState(
    color
      ? color
      : type == "company"
      ? "#0A84C3"
      : type == "person"
      ? "#97C30A"
      : type == "address"
      ? "#F5A623"
      : "#0A84C3"
  );
  const [keys, setKeys] = useState(Object.keys(data));
  const [visibleKeys, setVisibleKeys] = useState(
    type == "person"
      ? ["IIN", "FIO", "Data_Rozhdenya"]
      : type == "company"
      ? ["FullNameNatLanguage", "IINBIN"]
      : type == "created"
      ? []
      : ["PKA", "Adress"]
  );
  const [judge, setJudge] = useState(false);
  useEffect(() => {
    // console.log(data)
    if (data.key == true) {
      setIsKey(true);
      setColorBasedOnType("#1b376f");
    }
    if (
      data.STATUS_OPG != null ||
      data.STATYA_ERDR != null ||
      data.ORGAN_REGISTER != null ||
      data.Status_neplatejasposobnosti != null ||
      data.Bankrot != null ||
      data.BEZDEYSTVIA_UL != null ||
      data.ERDR != null ||
      data.FPG != null ||
      data.Organ_pravanarushenya != null ||
      data.Pristavanie != null ||
      data.Doljnik != null ||
      data.Doljnik_po_alimentam != null ||
      data.Status_neplatejasposobnosti != null ||
      data.Razmer_Shtrafa != null ||
      data.Status_KUIS != null ||
      data.Status_Minzdrav != null ||
      data.Statya != null ||
      data.V_Roziske != null ||
      data.Sud_ispolnitel != null ||
      data.Med_org != null ||
      data.StoppedBySud != null ||
      data.PDL != null ||
      data.SroppedByOrgan != null ||
      data.ERDR != null ||
      data.Propal != null ||
      data.Rozisk != null ||
      data.StatusPFR != null ||
      data.DeadlinePassed != null ||
      data.Doljnik != null ||
      data.Rozisk != null
    ) {
      setJudge(true);
    }
  }, []);
  const [hoverState, setHoverState] = useState("");

  const [newLabel, setNewLabel] = useState("");
  const [newColor, setNewColor] = useState("");

  const [additionalText, setAdditionalText] = useState([]);

  const addNewText = () => {
    setAdditionalText((currentArray) => [...currentArray, "Текст"]);
  };

  const updateArrayItem = (index, newValue) => {
    if (newValue != "") {
      setAdditionalText((currentArray) =>
        currentArray.map((item, currentIndex) =>
          currentIndex === index ? newValue : item
        )
      );
    } else {
      setAdditionalText((currentArray) => {
        return [
          ...currentArray.slice(0, index),
          ...currentArray.slice(index + 1),
        ];
      });
    }
  };

  const handlePropertyChange = (x) => {
    setVisibleKeys((prevKeys) => {
      if (prevKeys.includes(x)) {
        // Remove x from the array
        return prevKeys.filter((y) => y !== x);
      } else {
        // Add x to the array
        return [...prevKeys, x];
      }
    });
  };
  const handleStyle = {
    width: "6px", // Increase the width
    height: "6px", // Increase the height
    background: "#555",
    zIndex: 10, // Ensure the handle is above other elements for interaction
  };

  return (
    <div
      className="quadric-node"
      style={{
        backgroundColor: colorBasedOnType,
        border: judge ? "10px solid red" : "none",
      }}
    >
      <Handle
        type="source"
        position={Position.Top}
        style={handleStyle} // Apply the custom style
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      {data.photo ? (
        <div className="node-header-with-photo">
          <img src={"data:image/jpeg;base64," + data.photo} alt="" />
          <textarea
            className="rendered-label-input"
            style={{ fontSize: type === "created" ? "12px" : "16px" }}
            value={renderedLabel}
            onInput={(e) => {
              setRenderedLabel(e.target.value);
              // Reset height to 'auto' to ensure the content dictates the size
              e.target.style.height = "auto";
              // Set height to scrollHeight to accommodate all content
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            spellCheck="false" // Disables the spellcheck feature
            rows={
              renderedLabel.length > 20
                ? Math.ceil(renderedLabel.length / 20)
                : 1
            } // Ensures it starts with a single line
          />
        </div>
      ) : (
        <div className="node-header">
          <textarea
            className="rendered-label-input"
            style={{ fontSize: type === "created" ? "12px" : "16px" }}
            value={renderedLabel}
            onInput={(e) => {
              setRenderedLabel(e.target.value);
              // Reset height to 'auto' to ensure the content dictates the size
              e.target.style.height = "auto";
              // Set height to scrollHeight to accommodate all content
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            spellCheck="false" // Disables the spellcheck feature
            rows={
              renderedLabel.length > 20
                ? Math.ceil(renderedLabel.length / 19)
                : 1
            } // Ensures it starts with a single line
          />
        </div>
      )}

      <div className="node-body">
        {visibleKeys.map((x) => {
          if (propertiesMAP[x]) {
            if (data[x] || data[x] != "") {
              return (
                <a style={{ fontSize: type == "created" ? "11px" : "15px" }}>
                  {propertiesMAP[x]}: {data[x]}
                </a>
              );
            }
          }
        })}
        {additionalText.map((x) => {
          if (x != "") {
            return (
              <a style={{ fontSize: type == "created" ? "11px" : "15px" }}>
                {x}
              </a>
            );
          }
        })}
      </div>
      <Handle
        type="target"
        position={Position.Bottom}
        id="a"
        style={handleStyle} // Apply the custom style
      />
      <div className="node-tools-bar">
        {hoverState == "" ? (
          <>
            <img
              src={editIcon}
              alt="edit"
              onClick={() => {
                setZoomOnScroll(false);
                setHoverState("edit");
              }}
            />
            <img
              src={plusIcon}
              alt="add"
              onClick={() => setHoverState("add")}
            />
            <img
              className="image-icon"
              src={ImageIcon}
              alt="add"
              onClick={() => setHoverState("addImg")}
            />
            <img
              src={trashIcon}
              alt="delete"
              onClick={() => onDeleteNode(id)}
            />
          </>
        ) : hoverState == "edit" ? (
          <div
            className="edit-node-properties"
            onMouseLeave={() => {
              setZoomOnScroll(true);
              setHoverState("");
            }}
          >
            <h1>Показать поля</h1>
            <div className="list-of-properties">
              {keys
                .filter(
                  (x) =>
                    ![
                      "createNodeAndConnect",
                      "setZoomOnScroll",
                      "color",
                      "type",
                      "onDeleteNode",
                    ].includes(x)
                )
                .map((x) => {
                  if (propertiesMAP[x] && data[x]) {
                    return (
                      <div className="prop-vision">
                        <input
                          type="checkbox"
                          onChange={() => handlePropertyChange(x)}
                          name=""
                          id=""
                          checked={visibleKeys.includes(x)}
                        />
                        <a>{propertiesMAP[x]}</a>
                      </div>
                    );
                  }
                })}
            </div>
            <div className="edit-node-additional">
              {additionalText.map((x, index) => {
                return (
                  <input
                    value={x}
                    onChange={(e) => updateArrayItem(index, e.target.value)}
                  />
                );
              })}
            </div>
            <div onClick={() => addNewText()} className="edit-node-footer">
              <img src={plusIcon} alt="+" />
              <a>Добавить текст</a>
            </div>
          </div>
        ) : hoverState == "add" ? (
          <div className="edit-node-properties">
            <h1>Добавить связь</h1>
            <div className="inputs-for-node-create">
              <div className="input-line">
                <input
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  name=""
                  id=""
                />
                <label htmlFor="">Выберите цвет</label>
              </div>
              <div className="input-line">
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  name=""
                  id=""
                />
                <label htmlFor="">Текст</label>
              </div>
            </div>
            <div className="edit-node-footer">
              <button
                onClick={() => createNodeAndConnect(id, newLabel, newColor)}
              >
                <a>Сохранить</a>
              </button>
              <button onClick={() => setHoverState("")}>
                <a>Отменить</a>
              </button>
            </div>
          </div>
        ) : hoverState == "addImg" ? (
          <div className="addImageContainer">
            <div
              className="addImage"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <h1>Добавить изображение</h1>
              <div className="inputImage">
                <input type="file" onChange={handleImageUploadInEdit} />
              </div>
              <div className="saveButton">
                <button
                  onClick={() =>
                    createNodeAndConnect(
                      id,
                      newLabel,
                      newColor,
                      EditImage,
                      onlyPhoto
                    )
                  }
                >
                  <a>Сохранить</a>
                </button>
                <button onClick={() => setHoverState("")}>
                  <a>Отменить</a>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const personDictionary = {
  Nation: "Нация",
  Death_Status: "Статус смерти",
  Buhgalter: "Бухгалтер",
  StatusPFR: "Статус ПФР",
  Place_of_Birth: "Место рождения",
  Pristavanie: "Приставание в общественных местах",
  Notarius: "Нотариус",
  Name: "Имя",
  Data_Rozhdenya: "Дата рождения",
  Propal: "Пропавший",
  Autditor: "Аудитор",
  PDL: "ПДЛ",
  SroppedByOrgan: "Прекращено органом",
  Status: "Статус",
  CHSI: "ЧСИ",
  StoppedBySud: "Прекращено судом",
  Rozisk: "В розыске",
  Amoral: "Аморальное",
  dismissal: "Уволенные по отрицательным мотивам",
  Citizenship: "Гражданство",
  Status_Minzdrav: "Статус Минздрав",
  FIO: "ФИО",
  IIN: "ИИН",
  Doljnik: "Должник",
  Family: "Фамилия",
  Otchestvo: "Отчество",
  DeadlinePassed: "Просрочка",
};
const companyDictionary = {
  Status: "Статус",
  IINBIN: "БИН",
  Buhgalter: "Бухгалтер",
  StatusPFR: "Статус ПФР",
  License: "Лицензия",
  BLOCK_ESF: "Блокировка ЭСФ",
  RegisterEndDate: "Дата окончании регистрации",
  Name: "Название",
  Type: "ТИП",
  RegisterStartDate: "Дата начала регистрации",
  BEZDEYSTVIA_UL: "Бездействующий ЮЛ",
  FullNameNatLanguage: "Название на кз.",
  Bankrot: "Банкрот",
  ERDR: "Статус ЕРДР",
  DateRegisterAction: "Дата регистрационного действия",
  FPG: "ФПГ",
  DeadlinePassed: "Просрочка",
  FullNameIP: "Полное наим. ИП",
};

const propertiesDictionary = {
  Stroenie: "Строение",
  PKA: "РКА",
  Oblast: "Область",
  Rayon: "Район",
  Gorod: "Город",
  Kvartira: "Квартира",
  Ulica: "Улица",
  Korpus: "Корпус",
  Adress_propiski: "Адрес прописки",
  Adress: "Точный адрес",
};

export default memo(QuadricNode);
