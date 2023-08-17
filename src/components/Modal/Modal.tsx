import { Dispatch, SetStateAction } from 'react'

interface Props {
  ModalId: string
  setIsShowModal: Dispatch<SetStateAction<boolean>>
  handleConfirm: () => void
  quantity: number
}

export default function Modal({ ModalId, setIsShowModal, handleConfirm, quantity }: Props) {
  return (
    <div id={ModalId} className="fixed inset-0 z-50">
      <div className="h-full w-full bg-black/40">
        <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 rounded-sm bg-white shadow">
          <div className="w-[32.5rem] px-10 pb-6 pt-11">
            <p className="text font-normal text-gray-600">Bạn có muốn bỏ {quantity} sản phẩm?</p>
            <div className="mt-9 flex items-center justify-end">
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="w-[6.5rem] rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300"
                onClick={() => setIsShowModal(false)}
              >
                TRỞ LẠI
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="ml-6 w-[6.5rem] rounded-sm bg-white px-5 py-2.5 text-sm font-medium text-gray-500 outline-0 transition-all hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200"
                onClick={() => {
                  setIsShowModal(false)
                  handleConfirm()
                }}
              >
                CÓ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
