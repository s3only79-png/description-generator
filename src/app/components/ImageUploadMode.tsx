import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ImageUploadModeProps {
  uploadedImage: File | null;
  onImageUpload: (file: File | null) => void;
}

export function ImageUploadMode({
  uploadedImage,
  onImageUpload
}: ImageUploadModeProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    multiple: false
  });

  const removeImage = () => {
    onImageUpload(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Upload Area */}
      <div className="flex flex-col">
        <AnimatePresence mode="wait">
          {!uploadedImage ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div
                {...getRootProps()}
                className={`
                  h-96 flex flex-col items-center justify-center
                  border-2 border-dashed rounded-xl cursor-pointer
                  transition-all duration-300
                  ${isDragActive
                    ? 'border-primary bg-primary/5 scale-[0.98]'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }
                `}
              >
                <input {...getInputProps()} />
                <motion.div
                  animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                  className="flex flex-col items-center gap-4 text-center px-8"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    {isDragActive ? (
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Upload className="w-8 h-8 text-primary" />
                      </motion.div>
                    ) : (
                      <ImageIcon className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-base font-medium text-foreground mb-1">
                      {isDragActive ? '여기에 놓으세요' : '이미지 업로드'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      와이어프레임, 스크린샷, 목업 등을 드래그하거나 클릭하여 업로드하세요
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                    PNG, JPG, GIF, WEBP 지원
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    업로드된 이미지
                  </span>
                </div>
                <button
                  onClick={removeImage}
                  className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="h-96 rounded-xl border border-border overflow-hidden bg-muted/30 p-4">
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  alt="Uploaded preview"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-3 text-xs text-muted-foreground bg-muted px-3 py-2 rounded-lg">
                {uploadedImage.name} · {(uploadedImage.size / 1024).toFixed(1)} KB
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
