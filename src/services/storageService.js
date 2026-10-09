import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, CONFIG } from '../config/firebase.js';

export const StorageService = {
    /**
     * Compress image using HTML5 Canvas before upload.
     */
    compressImage(file, maxWidth = CONFIG.COMPRESSION_MAX_WIDTH, quality = CONFIG.COMPRESSION_QUALITY) {
        return new Promise((resolve, reject) => {
            if (!file || !file.type.startsWith('image/')) {
                return reject(new Error('Invalid file type for image compression.'));
            }

            // GIF animations should not be drawn onto 2D canvas to preserve frames
            if (file.type === 'image/gif') {
                const reader = new FileReader();
                reader.onload = (e) => resolve({ blob: file, dataUrl: e.target.result });
                reader.onerror = (err) => reject(err);
                reader.readAsDataURL(file);
                return;
            }

            const img = new Image();
            const objectUrl = URL.createObjectURL(file);

            img.onload = () => {
                URL.revokeObjectURL(objectUrl);
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', quality);

                canvas.toBlob((blob) => {
                    if (!blob) {
                        return reject(new Error('Canvas compression to Blob failed.'));
                    }
                    resolve({ blob, dataUrl });
                }, 'image/jpeg', quality);
            };

            img.onerror = (err) => {
                URL.revokeObjectURL(objectUrl);
                reject(err);
            };

            img.src = objectUrl;
        });
    },

    /**
     * General attachment upload handling images, PDFs, documents, and files.
     */
    async uploadAttachment(file, userId) {
        const isImage = file.type.startsWith('image/');
        const fileName = file.name;
        const fileSize = file.size;
        const fileType = file.type || 'application/octet-stream';

        if (isImage) {
            try {
                const { blob, dataUrl } = await this.compressImage(file);
                try {
                    const timestamp = Date.now();
                    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
                    const path = `chat_media/${userId}/${timestamp}_${sanitizedName}`;
                    const fileRef = storageRef(storage, path);
                    
                    const snapshot = await uploadBytes(fileRef, blob, { contentType: 'image/jpeg' });
                    const downloadUrl = await getDownloadURL(snapshot.ref);
                    return { isImage: true, url: downloadUrl, fileName, fileSize, fileType };
                } catch (storageError) {
                    console.warn('Firebase Storage warning (using inline dataUrl fallback):', storageError);
                    return { isImage: true, url: dataUrl, fileName, fileSize, fileType };
                }
            } catch (err) {
                console.error('Image compression error:', err);
                throw new Error('Failed to process image attachment.');
            }
        } else {
            // Upload PDF or document raw file
            try {
                const timestamp = Date.now();
                const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
                const path = `chat_docs/${userId}/${timestamp}_${sanitizedName}`;
                const fileRef = storageRef(storage, path);

                const snapshot = await uploadBytes(fileRef, file, { contentType: fileType });
                const downloadUrl = await getDownloadURL(snapshot.ref);
                return { isImage: false, url: downloadUrl, fileName, fileSize, fileType };
            } catch (storageError) {
                console.warn('Firebase Storage document upload fallback:', storageError);
                const dataUrl = await this.readFileAsDataUrl(file);
                return { isImage: false, url: dataUrl, fileName, fileSize, fileType };
            }
        }
    },

    /**
     * Read raw file as Data URL fallback.
     */
    readFileAsDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
        });
    },

    async uploadImage(file, userId) {
        const res = await this.uploadAttachment(file, userId);
        return res.url;
    }
};
