import { headers } from 'next/headers'

export const getDeviceType = async () => {
  const headersList = headers();
  const userAgent = (await headersList).get('user-agent');

  const isMobile = userAgent!.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);

  return {
    isMobile: isMobile
  } 

}