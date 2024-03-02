import { useState } from "react";
import React from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../styles/Page.css';
import {auth} from '../firebase'
import '../styles/Page.css';
import {Link, useNavigate} from 'react-router-dom'

export const Open = () => {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [verb, setVerb] = useState("");
  const [result, setresult] = useState("");
  const [resultTopic, setResultTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sagar, setSagar] = useState("");
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCjXs-KbOFOet_14DqHqX03xCdeEU-34q4"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleVerbChange = (e) => {
    setVerb(e.target.value);
  };

  async function callOpenAIAPI(e) {
    e.preventDefault();

    try {
      console.log("Calling API");

      const prompt = "lesion planning i am student"+{grade}+"subject"+{subject}+ "and topic programming ,verb"+{verb}+ "give the reliable solution";
      // console.log(prompt);
      // console.log(grade);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setSagar(text);
    
    } catch (error) {
      console.log("here is error: " + error);
    }
  }
  const handleShareWhatsApp = () => {};

  const handleCopyText = () => {
    navigator.clipboard
      // eslint-disable-next-line no-undef
      .writeText(result)
      .then(() => {})
      .catch((err) => console.error("Could not copy text: ", err));
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await auth.signOut();
        window.alert('You have been logged out');
        // Redirect to the homepage after logout
        navigate('/');
    } catch (error) {
        console.error('Error logging out:', error.message);
    }
};

  return (
    <>
      <div className=" flex flex-col justify-center items-center gap-8 py-10 bg-opacity-80 w-screen " id="ai">
        <h1 className=" text-xl sm:text-2xl lg:text-4xl font-bold uppercase text-slate-100 ">
          Lesson Planning Assistant
        </h1>

        <form className=" w-4/5 h-full md:w-4/5 mx-auto bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 ">
          <div className=" text-base">
            <label
              htmlFor="grade"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Grade:
            </label>
            <select
              id="grade"
              value={grade}
              onChange={handleGradeChange}
              className="w-5/6 md:w-full border border-gray-300 bg-slate-100 rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Grade</option>
              <option value="graduation">Graduation</option>
              <option value="master_degree">Post-Graduation</option>
              {/* Add more options for grades */}
            </select>
          </div>

          {/* subject section */}
          <div className="mb-6 mt-6">
            <label
              htmlFor="subject"
              className="block text-lg text-gray-700 font-bold mb-2"
            >
              Subject:
            </label>
            <select
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              className="w-full border border-gray-300 bg-slate-100 rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Subject</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="topic"
              className="block text-gray-700 font-bold mb-2 text-lg"
            >
              Topic:
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              placeholder="Enter topic for the chosen subject"
              onChange={handleTopicChange}
              className="w-full border border-gray-300 bg-slate-100 rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="verb"
              className="block text-gray-700  font-bold mb-2 text-lg"
            >
              Bloom Verb Selection:
            </label>
            <select
              id="verb"
              value={verb}
              onChange={handleVerbChange}
              className="w-full border border-gray-300 bg-slate-100 rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Verb</option>
              <option value="Learn">Learn</option>
              {/* <option value="Explore">Explore</option> */}
              {/* <option value="Study">Study</option> */}
            </select>
          </div>
        </form>

        <div className=" text-slate-100 w-full flex flex-col items-center">
          {isLoading ? ( // Display loading status while isLoading is true
            <img
              src="https://i.pinimg.com/originals/62/26/43/6226435516042edfe1a4514a44e2023a.gif"
              alt="Picture of the author"
              className=" mix-blend-screen"
              width={350}
              height={350}
            />
          ) : (
            <pre
              className="w-full lg:w-5/6 px-8 py-3 overflow-ellipsis whitespace-pre-wrap bg-slate-800 mt-5 rounded-lg text-xl tracking-wider text-slate-300"
              style={{ wordBreak: "break-word", fontFamily: "Roboto" }}
            >
              <div className="flex  flex-col-reverse md:justify-between md:flex-row-reverse  md:items-center px-8 rounded-lg my-1">
                <div
                  className="flex justify-center gap-3 items-center tracking-wide"
                  style={{ fontFamily: "sans-serif" }}
                >
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 text-sm md:text-base rounded focus:outline-none focus:shadow-outline"
                    onClick={handleCopyText}
                  >
                    Copy Text
                  </button>{" "}
                  <button
                    className="bg-green-500 text-base hover:bg-green-700 h-fit text-white font-semibold  flex justify-center items-center p-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleShareWhatsApp}
                  >
                    {/* <FaWhatsapp className='mr-2 ' /> */}
                    Share
                  </button>
                  <button className="bg-red-500 text-base hover:bg-red-700 h-fit text-white font-semibold  flex justify-center items-center p-2 rounded focus:outline-none focus:shadow-outline" onClick={handleLogout}>
                    Logout
                </button>
                </div>

                <h1
                  className=" text-xl text-center md:text-2xl font-bold uppercase"
                  style={{ fontFamily: "Roboto"}}
                >
                  Topic: {resultTopic}{" "}
                </h1>
              </div>

              {result}
            </pre>
          )}
        </div>
        <button
          onClick={callOpenAIAPI}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Generate Lesson Plan
        </button>

        <div className="output">{sagar}</div>
      </div>
    </>
  );
};

export default Open;
