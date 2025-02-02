'use client';
import { useState } from "react";
export default function uploadPage(){
    const [file,setFile]=useState<File | null>(null);
    const [publicUrl,setPublicUrl]=useState<string | null>(null);
    const [error, setError]=useState<string | null>(null);
    
    const handleFileChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setFile(e.target.files[0]);
        }
    };

    const handleUpload=async()=>{
        if(!file){
            setError("Please select a file to upload");
            return;
        }

        const formData=new FormData();
        formData.append('file',file);
        formData.append('fileName',file.name);

        try{
            const res=await fetch('/server/editor/upload',{
                method:'POST',
                body:formData,
            });

            const result = await res.json();
      if (res.ok) {
        setPublicUrl(result.publicUrl);
      } else {
        setError(result.error || 'Something went wrong');
      }  
        }
        catch(err){
            setError('Failed to upload file');
        }
    };
    return(
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Upload File</h1>
            <input type="file" onChange={handleFileChange} className="mb-4" />
                <button
                    onClick={handleUpload}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Upload
                </button>
                {publicUrl && (
        <p className="mt-4">
          File uploaded successfully! <a href={publicUrl} target="_blank" rel="noopener noreferrer">View File</a>
        </p>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}