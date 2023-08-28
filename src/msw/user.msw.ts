import { rest } from 'msw'
import HttpStatusCode from '@/constants/httpStatusCode.enum'
import { access_token_1s } from '@/msw/auth.msw'

const meResponse = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '64cccdd33be576dd53d29f05',
    roles: ['User'],
    email: 'kixi@mailinator.com',
    createdAt: '2023-08-04T10:07:15.934Z',
    updatedAt: '2023-08-23T02:57:20.910Z',
    address: 'Viet Nam',
    date_of_birth: '2000-02-15T00:00:00.000Z',
    name: 'hello',
    phone: '0987654321',
    avatar: 'ed8fb6e9-e95a-4361-b086-a40418ad40b1.jpg',
  },
}

const meRequest = rest.get(`${import.meta.env.VITE_SERVER_URL}/me`, (req, res, ctx) => {
  const access_token = req.headers.get('authorization')
  console.log(access_token === access_token_1s)
  if (access_token === access_token_1s) {
    return res(
      ctx.status(HttpStatusCode.Unauthorized),
      ctx.json({
        message: 'Lỗi',
        data: {
          message: 'Token hết hạn',
          name: 'EXPIRED_TOKEN',
        },
      })
    )
  }
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(meResponse))
})

const userRequests = [meRequest]

export default userRequests
