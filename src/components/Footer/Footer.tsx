export default function Footer() {
  return (
    <footer className="bg-secondary py-16">
      {/* Container */}
      <div className="mx-auto max-w-7xl px-4">
        {/* Top Footer */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <p className="text-xs lg:col-span-1">© 2023 Shopee. Tất cả các quyền được bảo lưu.</p>
          <p className="text-xs lg:col-span-2">
            Quốc gia & Khu vực: Singapore | Indonesia | Đài Loan | Thái Lan | Malaysia | Việt Nam | Philippines | Brazil
            | México | Colombia | Chile
          </p>
        </div>
        {/* End Top Footer */}
        {/* Bottom Footer */}
        <div className="mt-10 text-center text-sm">
          <p>Công ty TNHH Shopee</p>
          <p className="mt-8">
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </p>
          <p className="mt-2">
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </p>
          <p className="mt-2">
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </p>
          <p className="mt-2">© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
        </div>
        {/* EndBottom Footer */}
      </div>
      {/* End Container */}
    </footer>
  )
}
