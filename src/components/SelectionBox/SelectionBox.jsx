import { useEffect, useState } from "react";
import {BottomBox} from "./BottomBox/BottomBox";
import TopBox from "./TopBox/TopBox";
import s from "./style.module.css";
import { DataAPI } from "../../api/data";
import Input from "./Input/Input";

function SelectionBox({ defaultSelectedData, textPlaceHolder }) {
  const [dataItems, setDataItems] = useState([]);
  const [buttonText, setButtonText] = useState("Select all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(
    defaultSelectedData
      ? defaultSelectedData.map((item) => ({
          ...item,
          enable: false,
          type: "defaultData",
        }))
      : []
  );

  // Filter the data based on search term given in the input and fill the top box
    useEffect(() => {
    const updatedItems =
      setSearchTerm && searchTerm.trim()
        ? dataItems
            .filter(
              (item) =>
                !selectedItems.some((removeItem) => removeItem.id === item.id)
            )
            .filter((item) => {
              const containItems = item.name
                .trim()
                .toLowerCase()
                .includes(searchTerm.trim().toLowerCase());
              return containItems;
            })
        : [];
    setFilteredItems(updatedItems);
  }, [searchTerm,dataItems,selectedItems]);

  // Get the data from API source
  // Add enable field to say button enabled or disabled
  // Add type field to say data is from api or default
  async function fetchData() {
    const dataList = await DataAPI.getAllData();
    if (dataList.length > 0) {
      const updatedDataList = dataList.map((item) => ({
        ...item,
        enable: false,
        type: "apiData",
      }));
      setDataItems(updatedDataList);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  //Move the clicked item from the bottom box to top box with item enabled.
  const onBottomListItemClick = (item) => {
    setSelectedItems(
      [
        ...selectedItems,
        { id: item.id, name: item.name, enable: true, type: item.type },
      ].sort((a, b) => b.enable - a.enable)
    );
    setFilteredItems(filteredItems.filter((s) => s.id !== item.id));
  };

  const onTopListItemClick = (item) => {
    if (item.enable === true) {
      const updatedItems = selectedItems.map((selectedItem) => {
        if (selectedItem.id === item.id) {
          return { ...selectedItem, enable: false };
        }
        return selectedItem;
      });

      if (item.type === "defaultData") {
        updatedItems.filter((s) => s.id !== item.id);
      }
      setSelectedItems(updatedItems.sort((a, b) => b.enable - a.enable));
      if (item.type === "apiData") {
        setSelectedItems(selectedItems.filter((s) => s.id !== item.id));
        const updatedItem = { ...item, enable: false };
        setFilteredItems([...filteredItems, updatedItem]);
      }
    } else {
      const updatedItems = selectedItems.map((selectedItem) => {
        if (selectedItem.id === item.id) {
          return { ...selectedItem, enable: true };
        }
        return selectedItem;
      });

      setSelectedItems(updatedItems.sort((a, b) => b.enable - a.enable));
    }
  };

  const handleClick = () => {
    if (buttonText === "Select all") {
      const updatedItems = selectedItems.map((item) => {
        return {
          ...item,
          enable: true,
        };
      });
      setSelectedItems(updatedItems);
      setButtonText("Deselect all");
    } else {
      const updatedSelectedItems = selectedItems
        .filter((item) => item.type === "defaultData")
        .map((item) => {
          return {
            ...item,
            enable: false,
          };
        });
      const updatedFilteredItems = selectedItems
        .filter((item) => item.type === "apiData")
        .map((item) => {
          return {
            ...item,
            enable: false,
          };
        });
      setFilteredItems([...filteredItems, ...updatedFilteredItems]);
      setSelectedItems(updatedSelectedItems);
      setButtonText("Select all");
    }
  };
  useEffect(() => {
    if (selectedItems.every((item) => item.enable)) {
      setButtonText("Deselect all");
    } else {
      setButtonText("Select all");
    }
  }, [selectedItems]);

  return (
    <div className={s.container}>
      {selectedItems.length > 0 && (
        <button className={s.btn} onClick={handleClick}>
          {buttonText}
        </button>
      )}
      <div className={s.topBoxGroup}>
        {selectedItems.length > 0 && (
          <TopBox
            onTopListItemClick={onTopListItemClick}
            dataItems={selectedItems}
          ></TopBox>
        )}
        <Input
          onTextChange={setSearchTerm}
          textPlaceHolder={textPlaceHolder}
        ></Input>
      </div>
      {filteredItems.length > 0 && (
        <BottomBox
          onBottomListItemClick={onBottomListItemClick}
          dataItems={filteredItems}
        ></BottomBox>
      )}
    </div>
  );
}
export default SelectionBox;
