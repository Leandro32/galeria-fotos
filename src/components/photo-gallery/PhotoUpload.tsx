import { useState, useRef, useCallback } from 'react';
import { Upload, X, ImagePlus, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PhotoUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
}

export function PhotoUpload({
  onFilesSelected,
  maxFiles = 1000,
  accept = 'image/*',
  className,
}: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback((fileList: FileList) => {
    const newFiles = Array.from(fileList);
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      return;
    }
    
    // Limit to maxFiles
    const combinedFiles = [...files, ...imageFiles].slice(0, maxFiles);
    setFiles(combinedFiles);
    onFilesSelected(combinedFiles);
    
    // Simulate upload progress for demonstration
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  }, [files, maxFiles, onFilesSelected]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  }, [files, onFilesSelected]);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400",
          "flex flex-col items-center justify-center gap-4 min-h-[250px]"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={handleFileInputChange}
        />
        
        <Upload size={40} className={cn("text-gray-400", isDragging && "text-blue-500")} />
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Arrastrar y soltar fotografías</h3>
          <p className="text-sm text-gray-500">
            O haz clic para seleccionar archivos
          </p>
          <p className="text-xs text-gray-400">
            Máximo {maxFiles} fotos (JPG, PNG, WEBP)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{files.length} {files.length === 1 ? 'archivo seleccionado' : 'archivos seleccionados'}</h4>
            
            {uploadProgress < 100 ? (
              <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 ml-4">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            ) : (
              <span className="text-green-500 flex items-center">
                <Check size={16} className="mr-1" /> Carga completa
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                    />
                  ) : (
                    <ImagePlus size={24} className="text-gray-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
                <p className="text-xs mt-1 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 