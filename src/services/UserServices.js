//Thư viện request
import * as httpRequest from '~/utils/httpRequest';

// handle axios
export const getSuggested = async ({ page, perPage }) => {
  try {
    const res = await httpRequest.get('users/suggested', {
      params: {
        page,
        per_page: perPage,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
