import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import editorjsHTML from 'editorjs-html';
import "../App.css";

const Viewpost = () => {
  const editorRef = useRef(null);
  const [editorData, setEditorData] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');

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
  useEffect(() => {
    if (editorData) {
      const edjsParser = editorjsHTML();
      const html = edjsParser.parse(editorData);
      setHtmlContent(html.join('')); // Join array into single HTML string
    }
  }, [editorData]);
  return (
    <div
      className="editorjs"
      style={{ minHeight: "300px", border: "1px solid #ddd", padding: "10px" }}
    >
      <div  id="editorjs" />
      <h3>HTML Output:</h3>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>

  );
};

export default Viewpost;
