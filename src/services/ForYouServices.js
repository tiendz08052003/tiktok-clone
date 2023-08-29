//Thư viện request
import * as httpRequest from '~/utils/httpRequest';

// handle axios
export const GetForYou = async ({ typeValue, page }) => {
  try {
    const res = await httpRequest.get('videos', {
      params: {
        type: typeValue,
        page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
