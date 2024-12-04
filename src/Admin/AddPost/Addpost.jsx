import React, { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../slices/postsSlice";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import editorjsHTML from 'editorjs-html';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImage, resetUploadStatus } from "../../slices/imagesSlice";
import '../../App.css';
import DOMPurify from 'dompurify';



function Addpost() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [published, setPublished] = useState(true);
  const editorRef = useRef(null);
  const [editorData, setEditorData] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadStatus, uploading, uploadedImage } = useSelector(
    (state) => state.images
  );
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let postData = {
    title: title,
    post: htmlContent,
    slug: slug,
    author: "omprakash",
    is_published: published,
    sortDescription: description,
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadImage(selectedFile));
    }
  };
  const handleAddPost = async (e) => {
    e.preventDefault();
    dispatch(resetUploadStatus());
    try {
      const imageUrl = (await uploadedImage) ? uploadedImage.url : null;
      // console.log("fronted", imageUrl);
      if (imageUrl) {
        postData = {
          ...postData,
          image: imageUrl,
        };
      }
      if (imageUrl === null) {
        console.log("post not publish");
        toast.warn("Please upload an image");
      } else {
        await dispatch(createNewPost(postData));
        toast("Add New Post successful");
        navigate("/admin/postoerview");
      }
    } catch (error) {
      console.log("fronted", error);
    }
  };
  useEffect(() => {
    // Initialize Editor.js with data change handler
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            levels: [1, 2, 3],
            defaultLevel: 2,
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              twitter: true,
              instagram: true,
            },
          },
        },
        table: {
          class: Table,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        code: {
          class: Code,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: async (file) => {
                // Convert file to Base64
                const toBase64 = (file) => {
                  return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                  });
                };

                try {
                  const base64Image = await toBase64(file);
                  return {
                    success: 1,
                    file: {
                      url: base64Image, // Set Base64 string as the image source
                    },
                  };
                } catch (error) {
                  console.error("Image upload error:", error);
                  return { success: 0 };
                }
              },
            },
          },
        },
      },
      placeholder: 'Start writing your story...',

      // Handle editor data changes
      onChange: async () => {
        const content = await editor.save();
        setEditorData(content); // Store editor content in state
      },
    });

    // Store editor instance in ref
    editorRef.current = editor;

    // Cleanup Editor.js instance on component unmount
    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);
  // console.log("addpostediot",editorData)
  
  useEffect(() => {
    if (editorData) {
      const edjsParser = editorjsHTML();
      const html = edjsParser.parse(editorData);
      setHtmlContent(html.join('')); // Join array into single HTML string
    }
  }, [editorData]);
  return (
    <>
      <div className="container mx-auto py-4 px-4">
        <p className="mb-1 font-medium text-gray-500">Title</p>
        <div className="mb-4 flex flex-row gap-2  items-center">
          <div className=" relativeflex overflow-hidden rounded-md border-2 transition sm:w-[55%] lg:w-[61%]">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="post-title"
              className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Enter your Title"
            />
          </div>
          <div className="relativeflex overflow-hidden rounded-md border-2 transition sm:w-[15%] lg:w-[20%]">
            <input
              type="text"
              placeholder="write keywords"
              className="block   placeholder-gray-400  bg-white px-4 py-2 text-gray-700  w-full"
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <button
            onClick={handleAddPost}
            className="group flex w-[15%] cursor-pointer items-center justify-center rounded-md bg-indigo-700 px-6 py-2 text-white transition"
          >
            <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
              Publish now
            </span>
            <svg
              className="flex-0 ml-1  h-6 w-6 transition-all group-hover:ml-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
          <div>
            <div className="flex flex-col">
              <select
                id="status"
                onChange={(e) => setPublished(e.target.value === "true")}
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="true">Published</option>
                <option value="false" className="text-red-600">
                  UnPublished
                </option>
              </select>
            </div>
            <div></div>
          </div>
        </div>
        <div className="mb-4 flex flex-row gap-2  items-center ">
          <div className="sm:w-[55%] lg:w-[61%]">
            <label for="image" className="block text-sm text-gray-500 ">
              Write sort description
            </label>
            <div className=" relativeflex overflow-hidden rounded-md border-2 transition sm:w-[100%] lg:w-[100%]">
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                id="post-description"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your blog post description"
              />
            </div>
          </div>

          <div className="flex items-center">
            <div>
              
              <label for="image" className="block text-sm text-gray-500 ">
                Image
              </label>
              <input
                type="file"
                className="block w-full px-4 py-2  text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full    placeholder-gray-400/70  focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                onChange={handleFileChange}
              />
            </div>

            <button
              onClick={handleUpload}
              type="button"
              disabled={uploadStatus === "uploading"}
              className="m-2 inline-flex items-center justify-center rounded-xl border border-transparent bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              
              {uploadStatus === "uploading"
                ? "Uploading..."
                : uploadStatus === "done"
                ? "Done"
                : "Upload"}
            </button>
          </div>
        </div>
       

        <div
          className="editorjs"
          style={{
            
            minHeight: "300px",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        >
          <div id="editorjs" />
        </div>
      </div>
      
    </>
  );
}

export default Addpost;
