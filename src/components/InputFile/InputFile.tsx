import { MAX_SIZE_UPLOAD_AVATAR } from '@/constants/avatar'
import { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function onChangeFile(ev: React.ChangeEvent<HTMLInputElement>) {
    const imageFromLocal = ev.target.files?.[0]
    if (imageFromLocal && !imageFromLocal.type.includes('image')) {
      toast.error('File phải có định dạng JPEG, JPG hoặc PNG')
    } else if (imageFromLocal && imageFromLocal.size >= MAX_SIZE_UPLOAD_AVATAR) {
      toast.error('Dung lượng file tối đa là 1MB')
    } else {
      onChange && onChange(imageFromLocal)
    }
    ev.target.value = ''
  }

  return (
    <Fragment>
      <input type="file" accept=".jpg, .jpeg, .png*" className="hidden" ref={fileInputRef} onChange={onChangeFile} />
      <button
        className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-500 shadow-sm transition hover:bg-gray-50"
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}
