import Vapi from '@vapi-ai/web'
console.log(process.env.NEXT_PUBLIC_VAPI_KEY)
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY!)