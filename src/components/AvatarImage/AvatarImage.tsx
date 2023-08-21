import { useContext, useMemo } from 'react'
import classNames from 'classnames'
import { AppContext } from '@/contexts/app.context'
import { getAvatarUrl } from '@/utils/utils'

interface Props {
  file?: File
}

export default function AvatarImage({ file }: Props) {
  const { user } = useContext(AppContext)

  const imagePreview = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  return (
    <img
      src={imagePreview || getAvatarUrl(user?.avatar)}
      alt={user?.email || 'default avatar'}
      className={classNames('h-full w-full', {
        'object-cover': user?.avatar,
        'invert-[0.75]': !user?.avatar,
      })}
    />
  )
}
