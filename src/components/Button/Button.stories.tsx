import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      description: 'Hiển thị icon loading',
    },
    disabled: {
      description: 'Disable button',
      type: 'boolean',
      defaultValue: false,
    },
    children: {
      description: 'Nội dung button',
    },
    className: {
      description: 'class của button'
    },
  },
} as Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Login: Story = {
  args: {
    children: 'Đăng nhập',
    isLoading: false,
    disabled: false,
    className: 'mt-2 w-full rounded-sm px-2 py-4',
  },
}

export const Register: Story = {
  args: {
    children: 'Đăng ký',
    isLoading: true,
    disabled: true,
  },
}

export const Profile: Story = {
  args: {
    children: 'Lưu',
    className: 'rounded-sm px-5 py-2.5 text-base',
    type: 'submit',
  },
}
