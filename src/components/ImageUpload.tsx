import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useLang } from '@/lib/LanguageContext';
import { getIcon } from '@/lib/icons';

export default function ImageUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const { t } = useLang();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const UploadIcon = getIcon('Save');
  const TrashIcon = getIcon('Trash2');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError(t('请选择图片文件', 'Please select an image file'));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError(t('图片大小不能超过5MB', 'Image must be under 5MB'));
      return;
    }

    setError(null);
    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file);

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    onChange(urlData.publicUrl);
    setUploading(false);
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div>
      <label className="block text-slatey-600 text-sm font-medium mb-1.5">{label}</label>

      {/* Preview */}
      {value && (
        <div className="mb-3 relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-xl border border-slatey-200"
          />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors"
            title={t('删除图片', 'Remove image')}
          >
            <TrashIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2.5 bg-navy-50 hover:bg-navy-100 disabled:opacity-50 text-navy-700 font-medium text-sm rounded-lg transition-all"
        >
          <UploadIcon className="w-4 h-4" />
          {uploading
            ? t('上传中...', 'Uploading...')
            : value
              ? t('更换图片', 'Replace Image')
              : t('上传图片', 'Upload Image')}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}

      {/* Also allow manual URL input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('或粘贴图片链接', 'Or paste image URL')}
        className="w-full mt-2 px-3 py-2.5 bg-slatey-50 border border-slatey-200 rounded-lg text-slatey-800 text-sm focus:outline-none focus:border-navy-400 focus:bg-white transition-all"
      />
    </div>
  );
}
