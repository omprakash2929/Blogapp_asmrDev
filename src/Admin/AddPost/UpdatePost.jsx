import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { fetchPostBySlug, updatePost } from "../../slices/postsSlice";
import { uploadImage, resetUploadStatus } from "../../slices/imagesSlice";
import editorjsHTML from 'editorjs-html'; // Ensure this is imported at the top
import '../../App.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const UpdatePost = () => {
  const { id } = useParams(); // Post ID
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentPost, status, error } = useSelector((state) => state.posts);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [published, setPublished] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editorInstance, setEditorInstance] = useState(null);
  const { uploadStatus, uploadedImage } = useSelector((state) => state.images);
  const [htmlContent, setHtmlContent] = useState("");
  // Convert HTML to Editor.js blocks
  const htmlToEditorBlocks = (html) => {
    const parser = new DOMParser();
    const document = parser.parseFromString(html, "text/html");
    const blocks = [];

    // Convert headers
    document.querySelectorAll("h1, h2, h3").forEach((header) => {
      blocks.push({
        type: "header",
        data: {
          text: header.textContent,
          level: parseInt(header.tagName[1], 10),
        },
      });
    });

    // Convert paragraphs
    document.querySelectorAll("p").forEach((paragraph) => {
      blocks.push({
        type: "paragraph",
        data: {
          text: paragraph.innerHTML,
        },
      });
    });

    // Convert lists
    document.querySelectorAll("ul, ol").forEach((list) => {
      const items = Array.from(list.querySelectorAll("li")).map((li) => li.innerHTML);
      blocks.push({
        type: "list",
        data: {
          style: list.tagName === "UL" ? "unordered" : "ordered",
          items,
        },
      });
    });

    // Convert images
    document.querySelectorAll("img").forEach((img) => {
      blocks.push({
        type: "image",
        data: {
          file: { url: img.src },
          caption: img.alt || "",
          withBorder: false,
          withBackground: false,
          stretched: false,
        },
      });
    });

    return blocks;
  };

  useEffect(() => {
    dispatch(fetchPostBySlug(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setDescription(currentPost.sortDescription);
      setSlug(currentPost.slug);
      setPublished(currentPost.is_published);

      // Initialize Editor.js with data converted from HTML
      const blocks = htmlToEditorBlocks(currentPost.post || "");
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: { placeholder: "Enter a heading", levels: [1, 2, 3], defaultLevel: 2 },
          },
          list: { class: List, inlineToolbar: true },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: (file) =>
                  new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      resolve({ success: 1, file: { url: reader.result } });
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                  }),
              },
            },
          },
        },
        data: { blocks },
        placeholder: "Start editing your post...",
      });
      setEditorInstance(editor);

      return () => {
        if (editor) {
          editor.isReady
            .then(() => editor.destroy())
            .catch((err) => console.error("Error destroying Editor.js instance:", err));
        }
      };
    }
  }, [currentPost]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadImage(selectedFile));
    }
  };



  const handleUpdatePost = async (e) => {
    e.preventDefault();
    dispatch(resetUploadStatus());

    try {
      const content = await editorInstance.save();
      console.log("content",content)
      // Convert Editor.js content to HTML
      const edjsParser = editorjsHTML();
      const htmlOutput = edjsParser.parse(content).join(""); // Join parsed blocks to form the full HTML content
  
      setHtmlContent(htmlOutput); 
      const imageUrl = selectedFile ? uploadedImage.url : currentPost.image;
      // const editorData = await editorInstance.save();

      const updatedPost = {
        title,
        post: htmlOutput, // Save Editor.js data as JSON
        slug,
        author: "prakash",
        is_published: published,
        sortDescription: description,
        image: imageUrl,
      };

      await dispatch(updatePost({ id, updatedPost })).unwrap();
      toast.success("Post updated successfully!");
      navigate("/admin/list-update-post");
    } catch (error) {
      toast.error("Failed to update the post.");
      console.error("Error updating post:", error);
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
   

    {/* Updatepost  */}
    <div className="container mx-auto py-4 px-4">
        <p className="mb-1 font-medium text-gray-500">Title</p>
        <div className="mb-4 flex flex-row gap-2  items-center">
          <div className=" relativeflex overflow-hidden rounded-md border-2 transition sm:w-[55%] lg:w-[61%]">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              value={title}
              id="post-title"
              className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Enter your Title"
            />
          </div>
          <div className="relativeflex overflow-hidden rounded-md border-2 transition sm:w-[15%] lg:w-[20%]">
            <input
              type="text"
              placeholder="write keywords"
              value={slug}
              className="block   placeholder-gray-400  bg-white px-4 py-2 text-gray-700  w-full"
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <button
            onClick={handleUpdatePost}
            className="group flex w-[15%] cursor-pointer items-center justify-center rounded-md bg-indigo-700 px-6 py-2 text-white transition"
          >
            <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
              Update Post
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
                value={published}
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
                value={description}
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
};

export default UpdatePost;
