import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineHeart, AiOutlineRight, AiOutlineCopy } from "react-icons/ai";
//BsTrash
//RxCross2
import { RxCross2 } from "react-icons/rx";
import { BsTrash, BsTranslate } from "react-icons/bs";
import { motion, useAnimation } from "framer-motion";
function App() {
  const [translatedWord, setTranslatedWord] = useState("Translation");
  const [target, setTarget] = useState("en");
  const [source, setSource] = useState("ja");
  const [inputText, setInputText] = useState("");
  const changeTarget = (e) => {
    setTarget(e.target.value);
  };
  const changeSource = (e) => {
    setSource(e.target.value);

  };
 

  const callGoogleTranslateApi = async () => {
    setTranslatedWord("Loading...");
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", source);
    encodedParams.set("target_language", target);
    encodedParams.set("text", inputText);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "3569ccc133msh887f92596500bc5p1fcb57jsne8303a7c1fe4",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setTranslatedWord(response.data.data.translatedText);
    } catch (error) {
      console.error(error);
      toast.error("There's a problem in translating!");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputText == "") toast.error("The input text is empty!")
    console.log(inputText);
    if (inputText != "") {
      console.log(inputText);
      callGoogleTranslateApi();
    }
  
  };
  return (
    <>
      <div className="fixed p-7 flex justify-between w-full">
        <motion.h1
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="font-black text-2xl text-white inline-block"
        >
          <BsTranslate className="inline-block" color="#78C1F3"/> Lingo
          <span className="text-[#78C1F3]">Leap</span>
        </motion.h1>
      </div>
      {/* padding: 0.8rem;
  border: none;
  background-color: #dcdcdc;
  border-radius: 10px; */}
      <div className="fixed p-10 flex justify-between w-full top-8 px-12">
        <select
          name="sortBy"
          id="sortBy"
          className="p-3 border-none bg-white rounded-2xl"
          onChange={changeSource}
        >
          <option value="ja">Japanese</option>
          <option value="en">English</option>
          <option value="tl">Filipino</option>
          <option value="ko">Korean</option>
          <option value="ru">Russian</option>
          <option value="de">German</option>
        </select>
        <select
          name="sortBy"
          id="sortBy"
          className="p-3 border-none bg-white rounded-2xl"
          onChange={changeTarget}
        >
          <option value="en">English</option>
          <option value="ja">Japanese</option>
          <option value="tl">Filipino</option>
          <option value="ko">Korean</option>
          <option value="ru">Russian</option>
          <option value="de">German</option>
        </select>
      </div>
      <div className="flex w-full h-screen font-['Raleway']">
        <div className="bg-[#FFD89C] h-screen basis-[50%] flex flex-col justify-center items-start">
          <div className="ml-8">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="flex flex-col gap-3"
            >
              <textarea
                type="text"
                autoFocus
                value={inputText}
                placeholder="Enter text"
                className="pb-[203px] pt-[20px] px-5 w-[500px] bg-white mx-4 rounded-[2rem] shadow-2xl focus:outline-[#78C1F3] outline-4 text-[#85A389] overflow-y-auto resize-none relative"
                onChange={(e) => setInputText(e.target.value)}
              />
              {inputText != "" && (<button
              onClick={() => {
                setInputText("")
              }}
              className="absolute top-[150px] left-[500px] z-10"><RxCross2 size={25} color="#85A389"/></button>)}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-14 bg-[#78C1F3] w-24 text-white font-bold rounded-2xl mx-4"
              >
                Translate
              </motion.button>
            </motion.form>
          </div>
        </div>
        <div 
          className="bg-[#78C1F3] h-screen basis-[50%] flex flex-col justify-center items-center">
          <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="h-[280px] w-[537px] pb-[230px] bg-white mx-4 rounded-[2rem] shadow-2xl pt-[20px] px-5 text-[#85A389] relative mb-[60px]">
            <p className="text-[#85A389]">{translatedWord}</p>
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Copy"
              onClick={() => {
                navigator.clipboard.writeText(translatedWord);
                toast.success("Text Copied!");
              }}
              className="absolute bottom-6 rounded-full border-[#85A389] border p-2"
            >
              <AiOutlineCopy size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>
      <div className="fixed p-7 bottom-2 w-full">
        <p className="inline text-white font-black">
          Made with 💜 by Harvey Taningco
        </p>{" "}
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
