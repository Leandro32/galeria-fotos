import { useState } from 'react';
import { PhotoUpload } from '../components/photo-gallery/PhotoUpload';

export default function PhotoUploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    console.log('Files selected:', files);
    
    // In a real application, here you would:
    // 1. Prepare files for upload (compression, metadata extraction)
    // 2. Send to the server using FormData and fetch/axios
    // 3. Handle progress, success, and errors
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Subida de Fotografías</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Subir Nuevas Fotografías</h2>
          
          <div className="mb-6">
            <PhotoUpload 
              onFilesSelected={handleFilesSelected}
              maxFiles={1000}
            />
          </div>
          
          {selectedFiles.length > 0 && (
            <div className="mt-8 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium mb-2">Información de Carga</h3>
              <p className="text-sm text-gray-600 mb-2">
                {selectedFiles.length} {selectedFiles.length === 1 ? 'fotografía seleccionada' : 'fotografías seleccionadas'} 
                ({(selectedFiles.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(2)} MB)
              </p>
              
              <button 
                type="button"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => {
                  // In a real application, this would trigger the actual upload to the server
                  alert(`${selectedFiles.length} fotografías listas para subir al servidor.`);
                }}
              >
                Completar Subida al Servidor
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 